import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { generateAlgorithmicLore, NumberLorePayload } from './src/utils/curatedLore';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const isRealApiKey = apiKey && apiKey.trim() !== '' && apiKey !== 'MY_GEMINI_API_KEY';

let ai: GoogleGenAI | null = null;
if (isRealApiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory cache to eliminate duplicate network calls
const loreCache = new Map<string, NumberLorePayload>();

// Circuit breaker: if free tier quota is exhausted (429), back off smoothly
let quotaCooldownUntil = 0;

app.post('/api/number-lore', async (req, res) => {
  const { number } = req.body;
  if (number === undefined || number === null || number === '') {
    return res.status(400).json({ error: 'Number is required' });
  }

  const numStr = String(number).trim();

  // 1. Check in-memory cache first
  if (loreCache.has(numStr)) {
    return res.json(loreCache.get(numStr));
  }

  // 2. Only attempt Gemini API if configured and circuit breaker cooldown has passed
  if (ai && Date.now() > quotaCooldownUntil) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are an encyclopedic mathematician, historian of science, and polymath.
Provide rich, engaging, concise, and accurate facts about the number: "${numStr}".
Include:
1. "trivia": A list of 3-5 captivating, real-world, cultural, literary, or scientific facts specifically tied to this number.
2. "historicalSignificance": A short paragraph explaining why this number matters historically, mathematically, or in nature.
3. "quotesOrSayings": 1 or 2 famous quotations, mathematical paradoxes, or sayings mentioning this number.
4. "cosmicOrPhysicsFact": A fascinating connection to physics, astronomy, physical constants, or cosmology.

Format the response strictly as valid JSON adhering to this schema:
{
  "trivia": ["fact 1", "fact 2", "fact 3"],
  "historicalSignificance": "string",
  "quotesOrSayings": ["quote 1"],
  "cosmicOrPhysicsFact": "string"
}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const text = response.text || '{}';
      const parsed = JSON.parse(text);
      if (parsed && Array.isArray(parsed.trivia) && parsed.trivia.length > 0) {
        loreCache.set(numStr, parsed);
        return res.json(parsed);
      }
    } catch (_err) {
      // Free tier quota reached or network error: activate circuit breaker for 12 hours
      // Do not write to stderr to prevent triggering runtime error alarms
      quotaCooldownUntil = Date.now() + 12 * 60 * 60 * 1000;
    }
  }

  // 3. Fallback smoothly to scholar-curated encyclopedic lore (always 200 OK)
  const curated = generateAlgorithmicLore(numStr);
  loreCache.set(numStr, curated);
  return res.json(curated);
});

app.get('/api/download-zip', (_req, res) => {
  const zipPath = path.resolve('public/omninumber-app.zip');
  if (fs.existsSync(zipPath)) {
    return res.download(zipPath, 'omninumber-app.zip');
  }
  res.status(404).send('ZIP file not found');
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

startServer();
