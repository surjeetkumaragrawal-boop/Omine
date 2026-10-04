import React, { useState } from 'react';
import { Activity, TrendingUp, Info, ChevronRight, Award, Zap } from 'lucide-react';
import { CollatzResult } from '../utils/numberAnalysis';

interface CollatzVisualizerProps {
  collatz: CollatzResult | null;
  currentNumber: number;
}

export const CollatzVisualizer: React.FC<CollatzVisualizerProps> = ({ collatz, currentNumber }) => {
  const [hoveredPoint, setHoveredPoint] = useState<{ step: number; val: number } | null>(null);

  if (!collatz || currentNumber <= 0 || !Number.isInteger(currentNumber)) {
    return (
      <section id="collatz" className="rounded-2xl border-2 border-orange-900/60 bg-gradient-to-br from-slate-950 to-orange-950/30 p-6 md:p-8">
        <h2 className="text-xl font-serif font-bold text-orange-300 mb-2">Collatz Conjecture Orbit (3n + 1)</h2>
        <p className="text-sm text-slate-400">
          The Collatz sequence (hailstone orbit) is evaluated for positive natural integers (n ≥ 1).
        </p>
      </section>
    );
  }

  const { trajectory, peak, steps } = collatz;

  // SVG Chart Dimensions
  const width = 800;
  const height = 240;
  const padX = 40;
  const padY = 30;
  const plotW = width - padX * 2;
  const plotH = height - padY * 2;

  const maxVal = Math.max(...trajectory, 1);
  const minVal = 1;

  // Build SVG path
  const points = trajectory.map((val, idx) => {
    const x = padX + (idx / Math.max(trajectory.length - 1, 1)) * plotW;
    const y = padY + plotH - ((val - minVal) / Math.max(maxVal - minVal, 1)) * plotH;
    return { x, y, val, step: idx };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - padY} L ${points[0].x},${height - padY} Z`;

  return (
    <section id="collatz" className="space-y-6 rounded-2xl border-2 border-orange-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40 p-6 md:p-8 shadow-2xl shadow-orange-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-900/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              Collatz Orbit & Hailstone Dynamics
            </h2>
            <span className="text-xs font-mono text-orange-300 font-bold px-2.5 py-0.5 bg-orange-950 border border-orange-500/50 rounded-full">
              3n + 1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Even: n ↦ n/2 · Odd: n ↦ 3n + 1. Tracing the trajectory until reaching 1.
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-orange-950 border border-orange-500/40">
            <span className="text-slate-400">Stopping Time: </span>
            <span className="text-orange-300 font-bold text-sm">{steps} steps</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-500/40">
            <span className="text-slate-400">Peak Altitude: </span>
            <span className="text-rose-300 font-bold text-sm">{peak.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* SVG Colorful Trajectory Chart */}
      <div className="relative rounded-2xl border-2 border-orange-900/60 bg-slate-950 p-4 sm:p-6 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="text-amber-300 font-bold">Start: n = {currentNumber}</span>
          {hoveredPoint ? (
            <span className="text-yellow-300 font-bold bg-slate-900 px-3 py-1 rounded-full border border-yellow-500/40 animate-pulse">
              Step {hoveredPoint.step}: Value = {hoveredPoint.val.toLocaleString()}
            </span>
          ) : (
            <span className="text-slate-500">Hover over points to inspect altitude</span>
          )}
          <span className="text-emerald-400 font-bold">Terminal: 1</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-52 sm:h-64"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="collatzSunsetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="collatzLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Grid horizontal lines */}
            <line x1={padX} y1={padY} x2={width - padX} y2={padY} stroke="#334155" strokeDasharray="3 3" />
            <line x1={padX} y1={padY + plotH / 2} x2={width - padX} y2={padY + plotH / 2} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#475569" strokeWidth="1.5" />

            {/* Filled area */}
            <path d={areaD} fill="url(#collatzSunsetGrad)" />

            {/* Path line */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#collatzLineGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Interactive Circles */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint?.step === pt.step ? 7 : Math.min(plotW / points.length / 2, 3.5)}
                className="fill-amber-300 hover:fill-white cursor-pointer transition-all drop-shadow"
                onMouseEnter={() => setHoveredPoint({ step: pt.step, val: pt.val })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>
        </div>

        {/* Axis labels */}
        <div className="flex justify-between text-xs font-mono font-bold text-slate-400 pt-3 border-t border-slate-900">
          <span className="text-amber-300">Step 0 (n = {currentNumber})</span>
          <span className="text-rose-400">Peak: {peak.toLocaleString()}</span>
          <span className="text-emerald-400">Step {steps} (Ground = 1)</span>
        </div>
      </div>

      {/* Trajectory Stream Snippet with Dynamic Altitude Color Heatmap */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-2">
          Hailstone Sequence Steps (First {Math.min(trajectory.length, 30)} values):
        </span>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {trajectory.slice(0, 30).map((val, i) => {
            const ratio = val / peak;
            const badgeColor =
              val === peak
                ? 'bg-rose-950 border-rose-500 text-rose-300 font-black shadow-md shadow-rose-500/30'
                : ratio > 0.5
                ? 'bg-orange-950/80 border-orange-600/50 text-orange-300'
                : ratio > 0.1
                ? 'bg-amber-950/60 border-amber-700/40 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-300';

            return (
              <React.Fragment key={i}>
                <span
                  className={`px-2.5 py-1 rounded-lg border ${badgeColor}`}
                  title={`Step ${i}`}
                >
                  {val.toLocaleString()}
                </span>
                {i < Math.min(trajectory.length, 30) - 1 && (
                  <span className="text-slate-600">→</span>
                )}
              </React.Fragment>
            );
          })}
          {trajectory.length > 30 && (
            <span className="text-orange-400 font-semibold pl-2">
              ... (+{trajectory.length - 30} more steps to reach 1)
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
