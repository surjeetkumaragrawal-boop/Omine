import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import { NumberAnalysis } from '../utils/numberAnalysis';

interface OverviewHeroProps {
  analysis: NumberAnalysis;
}

export const OverviewHero: React.FC<OverviewHeroProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(analysis.parsedNumber));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedNum = analysis.isInteger
    ? analysis.parsedNumber.toLocaleString()
    : analysis.parsedNumber.toString();

  return (
    <section id="arithmetic" className="relative overflow-hidden rounded-2xl border-2 border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 shadow-2xl">
      {/* Radiant Glowing Background Lights */}
      <div className="absolute top-0 right-1/4 -mt-20 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-20 h-64 w-64 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -mt-20 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-4 max-w-3xl">
          {/* Multi-Colored Unboxed Metadata Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider">
            <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              {analysis.sign}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-amber-950/80 border border-amber-500/40 text-amber-300">
              {analysis.parity}
            </span>
            <span className={`px-2.5 py-1 rounded-md border ${
              analysis.isPrime
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-500/30'
                : 'bg-purple-950/80 border-purple-500/40 text-purple-300'
            }`}>
              {analysis.isInteger ? (analysis.isPrime ? '★ Prime Number' : analysis.isPrimeClassification) : 'Real / Float'}
            </span>
            {analysis.isInteger && analysis.divisorClassification !== 'N/A' && (
              <span className="px-2.5 py-1 rounded-md bg-rose-950/80 border border-rose-500/40 text-rose-300">
                {analysis.divisorClassification} Divisors
              </span>
            )}
            {analysis.isFibonacci && (
              <span className="px-2.5 py-1 rounded-md bg-yellow-950/80 border border-yellow-500/50 text-yellow-300">
                Fibonacci #{analysis.fibonacciIndex}
              </span>
            )}
          </div>

          {/* Radiant Grand Number Heading */}
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-rose-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent tabular-nums break-all drop-shadow-lg">
              {formattedNum}
            </h1>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white rounded-xl border border-slate-700 shadow-md transition-all active:scale-95"
              title="Copy number to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Spelled Out in English Prose */}
          <p className="font-serif text-xl sm:text-2xl text-slate-200 italic capitalize leading-relaxed">
            "{analysis.inWords}"
          </p>

          {/* Ordinal & Roman notation in colorful tags */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono pt-1">
            {analysis.isInteger && (
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500">Ordinal: </span>
                <span className="text-cyan-300 font-bold">{analysis.ordinal}</span>
              </div>
            )}
            {analysis.isInteger && analysis.parsedNumber > 0 && (
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500">Roman Numeral: </span>
                <span className="text-amber-300 font-bold">{analysis.romanNumeral}</span>
              </div>
            )}
            {analysis.digitCount > 0 && (
              <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500">Total Digits: </span>
                <span className="text-rose-300 font-bold">{analysis.digitCount}</span>
              </div>
            )}
          </div>
        </div>

        {/* Real Colourful Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 shrink-0 lg:w-96">
          {/* Square Status */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-purple-950/80 to-slate-950 border border-purple-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-purple-400 font-mono font-bold block mb-1">
              Square
            </span>
            <div className="text-sm font-bold font-mono text-purple-200">
              {analysis.isSquare ? `Yes (${analysis.squareRoot}²)` : `√ ≈ ${analysis.squareRoot.toFixed(3)}`}
            </div>
          </div>

          {/* Cube Root */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-pink-950/80 to-slate-950 border border-pink-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-pink-400 font-mono font-bold block mb-1">
              Cube Root
            </span>
            <div className="text-sm font-bold font-mono text-pink-200">
              {analysis.isCube ? `Yes (${analysis.cubeRoot}³)` : `∛ ≈ ${analysis.cubeRoot.toFixed(3)}`}
            </div>
          </div>

          {/* Digit Sum */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono font-bold block mb-1">
              Digit Sum
            </span>
            <div className="text-sm font-bold font-mono text-emerald-200">
              {analysis.digitSum} {analysis.isHarshad ? '✨ Harshad' : ''}
            </div>
          </div>

          {/* Binary Bit Weight */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-950/80 to-slate-950 border border-cyan-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-bold block mb-1">
              Binary Weight
            </span>
            <div className="text-sm font-bold font-mono text-cyan-200">
              {analysis.hammingWeight !== null ? `${analysis.hammingWeight} ones` : 'N/A'}
            </div>
          </div>

          {/* Happy Number */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/80 to-slate-950 border border-amber-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-amber-400 font-mono font-bold block mb-1">
              Happy Number
            </span>
            <div className="text-sm font-bold font-mono text-amber-200">
              {analysis.happyStatus.isHappy ? '☺ Happy (1)' : 'Loop Cycle'}
            </div>
          </div>

          {/* Palindromic */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-teal-950/80 to-slate-950 border border-teal-500/50 shadow-md">
            <span className="text-[11px] uppercase tracking-wider text-teal-400 font-mono font-bold block mb-1">
              Palindrome
            </span>
            <div className="text-sm font-bold font-mono text-teal-200">
              {analysis.isPalindromic10 ? '★ Base 10' : 'Non-Symmetric'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
