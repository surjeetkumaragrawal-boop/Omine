import React, { useState } from 'react';
import { ShieldCheck, Layers, GitBranch, ArrowLeftRight, CheckCircle2, Sparkles } from 'lucide-react';
import { NumberAnalysis } from '../utils/numberAnalysis';

interface PrimeDivisorSectionProps {
  analysis: NumberAnalysis;
  onSelectNumber: (n: string) => void;
}

export const PrimeDivisorSection: React.FC<PrimeDivisorSectionProps> = ({ analysis, onSelectNumber }) => {
  const [showAllDivisors, setShowAllDivisors] = useState(false);

  if (!analysis.isInteger || analysis.parsedNumber <= 0) {
    return (
      <section id="factors" className="rounded-2xl border-2 border-emerald-900/60 bg-gradient-to-br from-slate-950 to-emerald-950/30 p-6 md:p-8">
        <h2 className="text-xl font-serif font-bold text-emerald-300 mb-2">Prime & Divisor Analysis</h2>
        <p className="text-sm text-slate-400">
          Prime factorization, divisors, and aliquot sums are defined for positive natural integers (n ≥ 1).
        </p>
      </section>
    );
  }

  const displayedDivisors = showAllDivisors ? analysis.divisors : analysis.divisors.slice(0, 36);

  // Compute factor pairs
  const factorPairs: [number, number][] = [];
  for (let i = 0; i < analysis.divisors.length; i++) {
    const d1 = analysis.divisors[i];
    const d2 = analysis.parsedNumber / d1;
    if (d1 <= d2) {
      factorPairs.push([d1, d2]);
    }
  }

  return (
    <section id="factors" className="space-y-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-6 md:p-8 shadow-2xl shadow-emerald-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
            Divisors, Prime Architecture & Figurate Geometry
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fundamental theorem of arithmetic decomposition, factor lattices, and aliquot sums.
          </p>
        </div>

        {/* Unboxed Status */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold">
          <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-300">
            {analysis.isPrime ? '★ PRIME' : 'COMPOSITE'}
          </span>
          <span className="px-2.5 py-1 rounded bg-teal-950 border border-teal-500/50 text-teal-300">
            {analysis.divisorCount} DIVISORS
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-950 border border-amber-500/50 text-amber-300">
            {analysis.divisorClassification}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1: Primality & Prime Factorization */}
        <div className="space-y-5 bg-gradient-to-b from-emerald-950/50 to-slate-950 p-5 rounded-xl border border-emerald-500/30 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Primality Invariant</span>
            {analysis.isPrime ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prime
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-300 bg-teal-900/60 px-2 py-0.5 rounded border border-teal-500">
                Composite
              </span>
            )}
          </div>

          <div>
            <div className="text-xs text-slate-400 mb-1 font-mono uppercase tracking-wider">Prime Factorization:</div>
            <div className="p-3.5 bg-slate-900/90 border border-emerald-500/40 rounded-xl font-mono text-base font-bold text-emerald-300 shadow-inner">
              {analysis.parsedNumber} = {analysis.primeFactorizationFormula}
            </div>
          </div>

          {analysis.primeFactors.length > 0 && (
            <div>
              <span className="text-xs text-slate-400 block mb-2 font-mono">Distinct Prime Factors:</span>
              <div className="flex flex-wrap gap-2">
                {analysis.primeFactors.map((pf) => (
                  <button
                    key={pf.factor}
                    onClick={() => onSelectNumber(String(pf.factor))}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-900/40 hover:bg-emerald-800/60 border border-emerald-500/50 rounded-lg text-xs font-mono text-emerald-200 transition-all active:scale-95 shadow-sm"
                    title={`Inspect prime factor ${pf.factor}`}
                  >
                    <span className="font-bold text-emerald-300">{pf.factor}</span>
                    {pf.power > 1 && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-[10px] text-amber-300 font-bold">
                        ^{pf.power}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {analysis.isPrime && analysis.primeIndex && (
            <div className="text-xs text-emerald-200 bg-emerald-950/70 p-3 rounded-lg border border-emerald-500/40">
              Ranked as the <strong className="text-amber-300 font-mono">{analysis.primeIndex.toLocaleString()}-th prime</strong> in the sequence of primes.
            </div>
          )}

          {/* Adjacent Primes */}
          <div className="pt-2 border-t border-emerald-900/60 flex items-center justify-between text-xs font-mono font-bold">
            {analysis.prevPrime ? (
              <button
                onClick={() => onSelectNumber(String(analysis.prevPrime))}
                className="text-teal-400 hover:text-teal-200 transition-colors text-left"
              >
                ← Prev Prime ({analysis.prevPrime})
              </button>
            ) : <span />}
            {analysis.nextPrime && (
              <button
                onClick={() => onSelectNumber(String(analysis.nextPrime))}
                className="text-teal-400 hover:text-teal-200 transition-colors text-right"
              >
                Next Prime ({analysis.nextPrime}) →
              </button>
            )}
          </div>
        </div>

        {/* Col 2: Divisor Metrics & Aliquot Sum */}
        <div className="space-y-5 bg-gradient-to-b from-cyan-950/40 to-slate-950 p-5 rounded-xl border border-cyan-500/30 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold block">Divisor Characteristics</span>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30">
              <span className="text-slate-400 block mb-1">Divisor Count d(n)</span>
              <span className="text-lg font-bold text-cyan-300">{analysis.divisorCount}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30">
              <span className="text-slate-400 block mb-1">Divisor Sum σ₁(n)</span>
              <span className="text-lg font-bold text-cyan-300">{analysis.divisorSum.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30">
              <span className="text-slate-400 block mb-1">Aliquot Sum s(n)</span>
              <span className="text-lg font-bold text-amber-400">{analysis.aliquotSum.toLocaleString()}</span>
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl border border-cyan-500/30">
              <span className="text-slate-400 block mb-1">Abundance Index</span>
              <span className="text-lg font-bold text-teal-300">{analysis.abundanceIndex ?? 'N/A'}</span>
            </div>
          </div>

          {/* Divisors List */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-semibold text-cyan-300">All Divisors ({analysis.divisors.length}):</span>
              {analysis.divisors.length > 36 && (
                <button
                  onClick={() => setShowAllDivisors(!showAllDivisors)}
                  className="text-amber-400 hover:underline text-[11px] font-bold"
                >
                  {showAllDivisors ? 'Show Less' : `Show All (${analysis.divisors.length})`}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
              {displayedDivisors.map((d) => (
                <button
                  key={d}
                  onClick={() => onSelectNumber(String(d))}
                  className="px-2.5 py-1 bg-slate-900 hover:bg-cyan-900/80 hover:text-cyan-200 border border-cyan-800/40 rounded-lg font-mono text-xs text-slate-200 transition-colors"
                  title={`Inspect divisor ${d}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-300 pt-2 border-t border-cyan-900/60 leading-relaxed">
            {analysis.divisorClassification === 'Perfect' && (
              <span className="text-amber-300 font-semibold">
                ✨ Perfect Number! Equal to the sum of its proper positive divisors (e.g. 6, 28, 496).
              </span>
            )}
            {analysis.divisorClassification === 'Abundant' && (
              <span>
                Abundant number: Proper divisors sum to <strong className="text-amber-300">{analysis.aliquotSum}</strong>, exceeding the number by {analysis.aliquotSum - analysis.parsedNumber}.
              </span>
            )}
            {analysis.divisorClassification === 'Deficient' && (
              <span>
                Deficient number: Proper divisors sum to <strong className="text-cyan-300">{analysis.aliquotSum}</strong>, falling short by {analysis.parsedNumber - analysis.aliquotSum}.
              </span>
            )}
          </div>
        </div>

        {/* Col 3: Figurate & Polygonal Geometry */}
        <div className="space-y-4 bg-gradient-to-b from-purple-950/40 to-slate-950 p-5 rounded-xl border border-purple-500/30 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold block">Figurate & Sequence Memberships</span>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Triangular Number (Tₖ)</span>
              <span className={`font-mono font-bold ${analysis.isTriangular ? 'text-amber-300' : 'text-slate-500'}`}>
                {analysis.isTriangular ? `Yes (k = ${analysis.triangularRoot})` : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Square Number (k²)</span>
              <span className={`font-mono font-bold ${analysis.isSquare ? 'text-purple-300' : 'text-slate-500'}`}>
                {analysis.isSquare ? `Yes (${analysis.squareRoot}²)` : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Cube Number (k³)</span>
              <span className={`font-mono font-bold ${analysis.isCube ? 'text-pink-300' : 'text-slate-500'}`}>
                {analysis.isCube ? `Yes (${analysis.cubeRoot}³)` : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Pentagonal Number</span>
              <span className={`font-mono font-bold ${analysis.isPentagonal ? 'text-teal-300' : 'text-slate-500'}`}>
                {analysis.isPentagonal ? 'Yes' : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Fibonacci Sequence</span>
              <span className={`font-mono font-bold ${analysis.isFibonacci ? 'text-yellow-300' : 'text-slate-500'}`}>
                {analysis.isFibonacci ? `Yes (F_${analysis.fibonacciIndex})` : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Power of 2 (2ᵏ)</span>
              <span className={`font-mono font-bold ${analysis.isPowerOfTwo ? 'text-cyan-300' : 'text-slate-500'}`}>
                {analysis.isPowerOfTwo ? `Yes (2^${analysis.powerOfTwoExponent})` : 'No'}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/90 border border-purple-800/40">
              <span className="text-slate-300">Factorial Number (k!)</span>
              <span className={`font-mono font-bold ${analysis.isFactorial ? 'text-rose-300' : 'text-slate-500'}`}>
                {analysis.isFactorial ? `Yes (${analysis.factorialBase}!)` : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Factor Pairs Rectangular Formations */}
      {factorPairs.length > 0 && (
        <div className="pt-4 border-t border-emerald-900/60">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-3">
            Factor Pair Geometry ({factorPairs.length} rectangle formations)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {factorPairs.map(([a, b], idx) => (
              <div
                key={`${a}x${b}`}
                className="p-3 bg-slate-900/90 border border-emerald-500/40 rounded-xl text-center font-mono text-xs shadow-md"
              >
                <span className="text-emerald-300 font-bold text-sm">{a}</span>
                <span className="text-slate-500 mx-1.5">×</span>
                <span className="text-cyan-300 font-bold text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
