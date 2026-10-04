import React from 'react';
import { Atom, Clock, HardDrive, Compass, Calendar, Globe } from 'lucide-react';
import { NumberAnalysis } from '../utils/numberAnalysis';

interface ScienceAndUnitsSectionProps {
  analysis: NumberAnalysis;
  onSelectNumber: (n: string) => void;
}

export const ScienceAndUnitsSection: React.FC<ScienceAndUnitsSectionProps> = ({ analysis, onSelectNumber }) => {
  return (
    <section id="science" className="space-y-6 rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 md:p-8 shadow-2xl shadow-indigo-500/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-900/60 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
            Physical Dimensions, Chemistry & Chronology
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-world dimensional scales, periodic elements, astronomical distances, and historical epochs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Chemical Element if Z <= 118 */}
        {analysis.element ? (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/70 to-slate-950 border border-blue-500/50 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-300 font-bold">
                Periodic Table Element (Atomic Number Z = {analysis.element.number})
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                {analysis.element.category}
              </span>
            </div>

            <div className="flex items-center gap-5">
              {/* Element Symbol Box with Radiant Gold & Azure Glow */}
              <div className="flex flex-col items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 border-2 border-amber-400/80 shadow-xl shadow-blue-500/30">
                <span className="text-xs font-mono font-bold text-blue-200">{analysis.element.number}</span>
                <span className="text-4xl font-serif font-black text-amber-300 drop-shadow">{analysis.element.symbol}</span>
                <span className="text-[10px] font-mono text-cyan-200 font-semibold">{analysis.element.atomicMass}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-white">{analysis.element.name}</h3>
                <div className="text-xs font-mono text-blue-300 space-x-2 font-bold">
                  <span>Group {analysis.element.group}</span>
                  <span aria-hidden="true" className="text-slate-500">·</span>
                  <span>Period {analysis.element.period}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Electrons: <span className="text-cyan-300">{analysis.element.electronicConfiguration}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-2 border-t border-blue-900/60">
              {analysis.element.summary}
            </p>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              <span>Periodic Table Element</span>
              <span className="text-slate-500">Z &gt; 118 or Non-Integer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standard chemical elements on the IUPAC periodic table range from Hydrogen (Z = 1) to Oganesson (Z = 118). Hypothesized superheavy elements beyond 118 belong to the theoretical 'Island of Stability'.
            </p>
          </div>
        )}

        {/* Right: Chronology, Calendar Day & Historical Year */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-950/40 to-slate-950 border border-pink-500/30 space-y-4 shadow-lg">
          <span className="text-xs font-mono uppercase tracking-wider text-pink-400 font-bold block">
            Calendar & Historical Epochs
          </span>

          <div className="space-y-3">
            {analysis.calendarDay && (
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-pink-500/30 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-pink-400 font-semibold block">Day of the Year (out of 365/366)</span>
                  <span className="text-lg font-serif font-bold text-white">
                    {analysis.calendarDay.month} {analysis.calendarDay.day}
                  </span>
                  {analysis.calendarDay.note && (
                    <span className="block text-xs text-amber-300 mt-1 font-bold">
                      ★ {analysis.calendarDay.note}
                    </span>
                  )}
                </div>
                <Calendar className="w-6 h-6 text-pink-400 shrink-0" />
              </div>
            )}

            {analysis.yearHistoricalNote && (
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-purple-500/30 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-purple-400 font-semibold block">Year {analysis.parsedNumber} in Human History</span>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {analysis.yearHistoricalNote}
                  </p>
                </div>
                <Globe className="w-6 h-6 text-purple-400 shrink-0" />
              </div>
            )}

            {/* Trigonometric Interpretation */}
            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-indigo-500/30">
              <span className="text-[11px] font-mono text-indigo-300 font-semibold block mb-1">
                Geometric Circle Angle ({analysis.parsedNumber}° Degrees)
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Radians</span>
                  <span className="text-cyan-300 font-bold">{analysis.angleRadians.toFixed(4)} rad</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Sine</span>
                  <span className="text-emerald-300 font-bold">{analysis.angleSin}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Cosine</span>
                  <span className="text-pink-300 font-bold">{analysis.angleCos}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scale Dimensions: Multi-Colored Units */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/60 to-slate-950 border border-amber-500/40 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>TIME DURATION</span>
          </div>
          <div className="text-base font-bold font-mono text-amber-200">
            {analysis.asSecondsFormatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Assuming {analysis.parsedNumber} seconds</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/60 to-slate-950 border border-purple-500/40 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold mb-1">
            <HardDrive className="w-4 h-4 text-purple-400" />
            <span>DATA STORAGE</span>
          </div>
          <div className="text-base font-bold font-mono text-purple-200">
            {analysis.asBytesFormatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Assuming {analysis.parsedNumber} bytes</span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border border-cyan-500/40 shadow-md">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold mb-1">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>SPATIAL SCALE</span>
          </div>
          <div className="text-base font-bold font-mono text-cyan-200">
            {analysis.asMetersFormatted}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Assuming {analysis.parsedNumber} meters</span>
        </div>
      </div>
    </section>
  );
};
