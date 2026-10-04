import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, RefreshCw, Quote, Landmark, Orbit } from 'lucide-react';
import { generateAlgorithmicLore, NumberLorePayload } from '../utils/curatedLore';

interface GeminiLoreSectionProps {
  numberString: string;
}

export const GeminiLoreSection: React.FC<GeminiLoreSectionProps> = ({ numberString }) => {
  const [lore, setLore] = useState<NumberLorePayload>(() => generateAlgorithmicLore(numberString || '42'));
  const [loading, setLoading] = useState(false);

  const fetchLore = async () => {
    if (!numberString) return;
    setLoading(true);
    try {
      const res = await fetch('/api/number-lore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: numberString }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.trivia) && data.trivia.length > 0) {
          setLore(data);
          return;
        }
      }
      setLore(generateAlgorithmicLore(numberString));
    } catch {
      setLore(generateAlgorithmicLore(numberString));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLore(generateAlgorithmicLore(numberString || '42'));
    fetchLore();
  }, [numberString]);

  return (
    <section id="lore" className="space-y-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 p-6 md:p-8 shadow-2xl shadow-amber-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-900/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-200">
              Encyclopedic Lore, Cultural History & Trivia
            </h2>
            <span className="text-xs font-mono text-amber-300 font-bold px-2.5 py-0.5 bg-amber-950 border border-amber-500/50 rounded-full shadow-sm">
              AI Deep Insights
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Curated historical curiosities, literary folklore, philosophical quotes, and cosmological facts for {numberString}.
          </p>
        </div>

        <button
          onClick={fetchLore}
          disabled={loading}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 rounded-xl shadow-md shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
          title="Refresh encyclopedic lore"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Consulting Lore...' : 'Regenerate'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trivia Bullets (Col 1 & 2) in Warm Gold */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/50 to-slate-950 border border-amber-500/40 space-y-3 shadow-lg">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
              Fascinating Real-World & Cultural Facts
            </span>
            <ul className="space-y-3">
              {lore.trivia.map((item, index) => (
                <li key={index} className="flex items-start gap-3.5 text-sm text-slate-200 leading-relaxed">
                  <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/60 font-serif font-black text-amber-300 text-sm shadow-sm">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {lore.historicalSignificance && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/50 to-slate-950 border border-purple-500/40 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-wider font-bold">
                <Landmark className="w-4 h-4 text-purple-400" />
                <span>Historical & Scientific Milestones</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {lore.historicalSignificance}
              </p>
            </div>
          )}
        </div>

        {/* Quotes and Cosmic Fact (Col 3) in Sapphire & Rose */}
        <div className="space-y-4">
          {lore.cosmicOrPhysicsFact && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/50 to-slate-950 border border-cyan-500/40 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold">
                <Orbit className="w-4 h-4 text-cyan-400" />
                <span>Cosmic & Physics Dimension</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {lore.cosmicOrPhysicsFact}
              </p>
            </div>
          )}

          {lore.quotesOrSayings && lore.quotesOrSayings.length > 0 && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-950/50 to-slate-950 border border-rose-500/40 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-300 uppercase tracking-wider font-bold">
                <Quote className="w-4 h-4 text-rose-400" />
                <span>Famous Sayings & Quotations</span>
              </div>
              {lore.quotesOrSayings.map((q, idx) => (
                <blockquote key={idx} className="font-serif italic text-xs sm:text-sm text-rose-200 pl-3 border-l-2 border-rose-500/60 leading-relaxed">
                  "{q}"
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
