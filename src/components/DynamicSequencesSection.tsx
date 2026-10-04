import React from 'react';
import { Smile, Frown, Sparkles, Binary, Repeat } from 'lucide-react';
import { NumberAnalysis } from '../utils/numberAnalysis';

interface DynamicSequencesSectionProps {
  analysis: NumberAnalysis;
  onSelectNumber: (n: string) => void;
}

export const DynamicSequencesSection: React.FC<DynamicSequencesSectionProps> = ({
  analysis,
  onSelectNumber,
}) => {
  return (
    <section className="space-y-6 rounded-2xl border-2 border-fuchsia-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-fuchsia-950/40 p-6 md:p-8 shadow-2xl shadow-fuchsia-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-fuchsia-900/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-300 to-amber-300">
            Recreational Math, Digit Curiosities & Sequences
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Happy/unhappy cycles, digital invariants, palindromic symmetries, and narcissistic properties.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Happy Number Sequence Trace with Neon Glow */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border border-emerald-500/50 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-bold">
              Happy Number Trajectory
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border shadow-sm ${
                analysis.happyStatus.isHappy
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-emerald-500/30'
                  : 'bg-rose-950 text-rose-300 border-rose-500/40'
              }`}
            >
              {analysis.happyStatus.isHappy ? (
                <>
                  <Smile className="w-4 h-4 text-emerald-400" /> Happy (Converges to 1)
                </>
              ) : (
                <>
                  <Frown className="w-4 h-4 text-rose-400" /> Unhappy (Loop Cycle)
                </>
              )}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Repeatedly replacing the number by the sum of squares of its decimal digits:
          </p>

          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs pt-2">
            {analysis.happyStatus.path.map((val, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => onSelectNumber(String(val))}
                  className={`px-2.5 py-1 rounded-lg border font-bold transition-all active:scale-95 ${
                    val === 1
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/40'
                      : 'bg-slate-900 border-slate-700 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-950'
                  }`}
                  title={`Step ${idx}: ${val}`}
                >
                  {val}
                </button>
                {idx < analysis.happyStatus.path.length - 1 && (
                  <span className="text-emerald-500 font-bold">→</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="text-[11px] text-emerald-300 pt-1 font-mono">
            {analysis.happyStatus.isHappy
              ? `★ Successfully reached 1 in ${analysis.happyStatus.steps} iterations!`
              : 'Enters the periodic loop: {4, 16, 37, 58, 89, 145, 42, 20}.'}
          </div>
        </div>

        {/* Digit Properties Bento in Vibrant Jewels */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-slate-950 border border-purple-500/50 space-y-4 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold block">
            Digital Invariants & Symmetries
          </span>

          <div className="space-y-3 text-xs font-mono">
            {/* Harshad / Niven */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-purple-700/50">
              <div>
                <span className="text-purple-200 block font-bold text-sm">Harshad (Niven) Number</span>
                <span className="text-[11px] text-slate-400">
                  Divisible by sum of its digits ({analysis.parsedNumber} ÷ {analysis.digitSum})
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                analysis.isHarshad ? 'bg-purple-900/80 border border-purple-400 text-purple-200 shadow-sm' : 'text-slate-600'
              }`}>
                {analysis.isHarshad ? 'YES' : 'NO'}
              </span>
            </div>

            {/* Armstrong / Narcissistic */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-pink-700/50">
              <div>
                <span className="text-pink-200 block font-bold text-sm">Armstrong (Narcissistic)</span>
                <span className="text-[11px] text-slate-400">
                  Equal to sum of digits raised to power {analysis.digitCount}
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                analysis.isArmstrong ? 'bg-pink-900/80 border border-pink-400 text-pink-200 shadow-sm' : 'text-slate-600'
              }`}>
                {analysis.isArmstrong ? 'YES' : 'NO'}
              </span>
            </div>

            {/* Automorphic */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-amber-700/50">
              <div>
                <span className="text-amber-200 block font-bold text-sm">Automorphic Number</span>
                <span className="text-[11px] text-slate-400">
                  Square ends in the number itself (e.g. 5²=25, 25²=625)
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded-lg font-black text-xs ${
                analysis.isAutomorphic ? 'bg-amber-900/80 border border-amber-400 text-amber-200 shadow-sm' : 'text-slate-600'
              }`}>
                {analysis.isAutomorphic ? 'YES' : 'NO'}
              </span>
            </div>

            {/* Palindromic */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-cyan-700/50">
              <div>
                <span className="text-cyan-200 block font-bold text-sm">Palindromic Symmetry</span>
                <span className="text-[11px] text-slate-400">
                  Reads identically forwards and backwards
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  analysis.isPalindromic10 ? 'bg-cyan-900 text-cyan-200 border border-cyan-400' : 'text-slate-600'
                }`}>
                  B10: {analysis.isPalindromic10 ? 'YES' : 'NO'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  analysis.isPalindromic2 ? 'bg-cyan-900 text-cyan-200 border border-cyan-400' : 'text-slate-600'
                }`}>
                  B2: {analysis.isPalindromic2 ? 'YES' : 'NO'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
