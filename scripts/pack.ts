import fs from 'fs';
import path from 'path';
import * as archiverModule from 'archiver';

const archiver = (archiverModule as any).default || archiverModule;

const outputDir = path.resolve('public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'omninumber-app.zip');
const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Zip archive successfully created: ${archive.pointer()} total bytes at ${outputPath}`);
});

archive.on('error', (err: any) => {
  throw err;
});

archive.pipe(output);

archive.glob('**/*', {
  cwd: process.cwd(),
  ignore: ['node_modules/**', 'dist/**', '.git/**', '*.zip', '*.tar.gz', 'public/omninumber-app.zip'],
  dot: true,
});

archive.finalize();
