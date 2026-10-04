import React, { useState } from 'react';
import { Copy, Check, Binary, Palette, Hash } from 'lucide-react';
import { NumberAnalysis } from '../utils/numberAnalysis';

interface NumeralSystemsSectionProps {
  analysis: NumberAnalysis;
}

export const NumeralSystemsSection: React.FC<NumeralSystemsSectionProps> = ({ analysis }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyVal = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const bitArray = analysis.binary !== 'N/A' ? analysis.binary.split('') : [];

  return (
    <section id="systems" className="space-y-6 rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 md:p-8 shadow-2xl shadow-cyan-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-900/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            Numeral Systems & Digital Encoding
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Positional notation bases, active bit matrices, hexadecimal color previews, and scientific orders.
          </p>
        </div>
      </div>

      {/* Colourful Bases Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Binary in Electric Cyan */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/70 to-slate-950 border border-cyan-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs text-cyan-400 font-mono font-bold mb-1">
              <span>BASE 2 (BINARY)</span>
              <span className="text-cyan-300">{analysis.hammingWeight ?? 0} set bits</span>
            </div>
            <div className="font-mono text-sm sm:text-base text-cyan-200 break-all select-all font-bold">
              {analysis.binary}
            </div>
          </div>
          <button
            onClick={() => copyVal('bin', analysis.binary)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-900/40 border border-cyan-600/40 text-[11px] font-mono font-semibold text-cyan-300 hover:bg-cyan-800 transition-colors"
          >
            {copiedKey === 'bin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'bin' ? 'Copied!' : 'Copy Binary'}</span>
          </button>
        </div>

        {/* Hexadecimal in Electric Fuchsia */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-fuchsia-950/70 to-slate-950 border border-fuchsia-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs text-fuchsia-400 font-mono font-bold mb-1">
              <span>BASE 16 (HEXADECIMAL)</span>
              {analysis.hexColor && (
                <span className="flex items-center gap-1.5 text-xs text-fuchsia-300">
                  <span
                    className="inline-block w-4 h-4 rounded-md border border-white/60 shadow-md shadow-fuchsia-500/40"
                    style={{ backgroundColor: analysis.hexColor }}
                  />
                  <span className="font-bold">{analysis.hexColor}</span>
                </span>
              )}
            </div>
            <div className="font-mono text-base text-fuchsia-200 font-bold break-all select-all">
              {analysis.hexadecimal}
            </div>
          </div>
          <button
            onClick={() => copyVal('hex', analysis.hexadecimal)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-fuchsia-900/40 border border-fuchsia-600/40 text-[11px] font-mono font-semibold text-fuchsia-300 hover:bg-fuchsia-800 transition-colors"
          >
            {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'hex' ? 'Copied!' : 'Copy Hex'}</span>
          </button>
        </div>

        {/* Octal in Sky Blue */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-sky-950/70 to-slate-950 border border-sky-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="text-xs text-sky-400 font-mono font-bold mb-1">BASE 8 (OCTAL)</div>
            <div className="font-mono text-base text-sky-200 font-bold break-all select-all">
              {analysis.octal}
            </div>
          </div>
          <button
            onClick={() => copyVal('oct', analysis.octal)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-900/40 border border-sky-600/40 text-[11px] font-mono font-semibold text-sky-300 hover:bg-sky-800 transition-colors"
          >
            {copiedKey === 'oct' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'oct' ? 'Copied!' : 'Copy Octal'}</span>
          </button>
        </div>

        {/* Base 36 in Vivid Violet */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-950/70 to-slate-950 border border-violet-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="text-xs text-violet-400 font-mono font-bold mb-1">BASE 36 (ALPHANUMERIC)</div>
            <div className="font-mono text-base text-violet-200 font-bold break-all select-all">
              {analysis.base36}
            </div>
          </div>
          <button
            onClick={() => copyVal('b36', analysis.base36)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-violet-900/40 border border-violet-600/40 text-[11px] font-mono font-semibold text-violet-300 hover:bg-violet-800 transition-colors"
          >
            {copiedKey === 'b36' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'b36' ? 'Copied!' : 'Copy Base 36'}</span>
          </button>
        </div>

        {/* Scientific Notation in Emerald */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/70 to-slate-950 border border-emerald-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="text-xs text-emerald-400 font-mono font-bold mb-1">SCIENTIFIC NOTATION</div>
            <div className="font-mono text-base text-emerald-200 font-bold break-all select-all">
              {analysis.scientificNotation}
            </div>
          </div>
          <button
            onClick={() => copyVal('sci', analysis.scientificNotation)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/40 border border-emerald-600/40 text-[11px] font-mono font-semibold text-emerald-300 hover:bg-emerald-800 transition-colors"
          >
            {copiedKey === 'sci' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'sci' ? 'Copied!' : 'Copy Scientific'}</span>
          </button>
        </div>

        {/* Engineering Notation in Warm Amber */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/70 to-slate-950 border border-amber-500/50 flex flex-col justify-between space-y-3 shadow-md">
          <div>
            <div className="text-xs text-amber-400 font-mono font-bold mb-1">ENGINEERING NOTATION (10^3k)</div>
            <div className="font-mono text-base text-amber-200 font-bold break-all select-all">
              {analysis.engineeringNotation}
            </div>
          </div>
          <button
            onClick={() => copyVal('eng', analysis.engineeringNotation)}
            className="self-end flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-900/40 border border-amber-600/40 text-[11px] font-mono font-semibold text-amber-300 hover:bg-amber-800 transition-colors"
          >
            {copiedKey === 'eng' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'eng' ? 'Copied!' : 'Copy Engineering'}</span>
          </button>
        </div>
      </div>

      {/* Colorful Interactive Bit Cell Topology */}
      {bitArray.length > 0 && bitArray.length <= 64 && (
        <div className="bg-slate-950/90 p-5 rounded-2xl border border-cyan-800/50 space-y-3 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
            <span className="uppercase tracking-wider font-bold">Bit Cell Memory Topology ({bitArray.length} bits)</span>
            <span className="text-slate-400">MSB (high order) → LSB (low order)</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {bitArray.map((bit, idx) => {
              const bitPos = bitArray.length - 1 - idx;
              const isOne = bit === '1';
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center w-8 sm:w-9 h-11 rounded-lg border font-mono transition-all ${
                    isOne
                      ? 'bg-gradient-to-b from-cyan-500/30 to-blue-600/30 border-cyan-400 text-cyan-200 font-black shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-900/80 border-slate-800 text-slate-600'
                  }`}
                  title={`Bit 2^${bitPos} = ${isOne ? Math.pow(2, bitPos).toLocaleString() : '0'}`}
                >
                  <span className="text-xs sm:text-sm">{bit}</span>
                  <span className="text-[9px] text-slate-500">{bitPos}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
