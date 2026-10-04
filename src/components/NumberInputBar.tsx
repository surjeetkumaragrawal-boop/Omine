import React, { useState } from 'react';
import {
  Minus, Plus, X, ArrowRight, Delete, RotateCcw,
  Sparkles, Calculator, History, ChevronDown, ChevronUp
} from 'lucide-react';

interface NumberInputBarProps {
  inputValue: string;
  onChangeInput: (val: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onIncrement: (delta: number) => void;
  onMultiply: (factor: number) => void;
  onSquare: () => void;
  onSqrt: () => void;
  onSelectPreset: (n: string) => void;
  recentNumbers: string[];
}

const PRESETS = [
  { label: '0', val: '0', color: 'from-slate-500 to-slate-700' },
  { label: '1', val: '1', color: 'from-amber-500 to-yellow-600' },
  { label: '7', val: '7', color: 'from-emerald-500 to-teal-700' },
  { label: '12', val: '12', color: 'from-cyan-500 to-blue-600' },
  { label: '13', val: '13', color: 'from-purple-500 to-indigo-700' },
  { label: '42', val: '42', color: 'from-pink-500 to-rose-600' },
  { label: '73', val: '73', color: 'from-amber-400 to-orange-600' },
  { label: '108', val: '108', color: 'from-emerald-400 to-green-600' },
  { label: '137', val: '137', color: 'from-cyan-400 to-teal-600' },
  { label: '144', val: '144', color: 'from-violet-500 to-purple-700' },
  { label: '1729', val: '1729', color: 'from-fuchsia-500 to-pink-600' },
  { label: '6174', val: '6174', color: 'from-rose-500 to-red-700' },
  { label: '2026', val: '2026', color: 'from-blue-500 to-indigo-700' },
  { label: 'π', val: 'pi', color: 'from-amber-500 to-red-600' },
  { label: 'e', val: 'e', color: 'from-teal-400 to-emerald-600' },
  { label: 'φ', val: 'phi', color: 'from-yellow-400 to-amber-600' },
];

export const NumberInputBar: React.FC<NumberInputBarProps> = ({
  inputValue,
  onChangeInput,
  onSubmit,
  onIncrement,
  onMultiply,
  onSquare,
  onSqrt,
  onSelectPreset,
  recentNumbers,
}) => {
  const [showKeypad, setShowKeypad] = useState(true);

  // Keypad button press
  const handleKeypadPress = (char: string) => {
    if (char === 'C') {
      onChangeInput('');
    } else if (char === '⌫') {
      onChangeInput(inputValue.slice(0, -1));
    } else if (char === '±') {
      if (inputValue.startsWith('-')) {
        onChangeInput(inputValue.slice(1));
      } else if (inputValue) {
        onChangeInput('-' + inputValue);
      }
    } else if (char === '.') {
      if (!inputValue.includes('.')) {
        onChangeInput((inputValue || '0') + '.');
      }
    } else {
      // Numbers
      onChangeInput(inputValue === '0' ? char : inputValue + char);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Radiant Glowing Rainbow Border Input Card */}
      <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-pink-500 via-amber-400 via-emerald-400 via-cyan-400 to-violet-600 shadow-2xl shadow-cyan-500/20">
        <div className="rounded-[14px] bg-slate-950 p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              <label htmlFor="custom-number-input" className="text-sm sm:text-base font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300">
                Fill Your Custom Number
              </label>
              <span className="text-xs text-slate-400">· Live Real-Time Analysis</span>
            </div>

            <button
              type="button"
              onClick={() => setShowKeypad(!showKeypad)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-cyan-300 hover:text-cyan-200 hover:border-cyan-500/50 transition-colors w-fit"
            >
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showKeypad ? 'Hide Keypad' : 'Show Keypad'}</span>
              {showKeypad ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* Main Huge Number Input Field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2"
          >
            <div className="relative flex-1">
              <input
                id="custom-number-input"
                type="text"
                value={inputValue}
                onChange={(e) => onChangeInput(e.target.value)}
                placeholder="Type any number (e.g. 42, -99, 137, 3.14159, 22/7)..."
                className="w-full bg-slate-900/90 border-2 border-slate-700/80 focus:border-amber-400 rounded-xl px-5 py-3.5 text-xl sm:text-2xl md:text-3xl font-mono font-bold text-amber-300 placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-amber-500/20 transition-all tracking-tight"
                autoComplete="off"
                spellCheck="false"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => onChangeInput('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Clear input"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:from-amber-300 hover:to-rose-300 shadow-lg shadow-orange-500/30 transition-all active:scale-95 whitespace-nowrap"
            >
              <span>Explore Number</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Quick Operation Stepper Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/80">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">Quick Math:</span>
            <button
              type="button"
              onClick={() => onIncrement(-1)}
              className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 border border-rose-600/40 text-rose-300 font-mono text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Minus className="w-3 h-3" /> 1
            </button>
            <button
              type="button"
              onClick={() => onIncrement(1)}
              className="px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 font-mono text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3 h-3" /> 1
            </button>
            <button
              type="button"
              onClick={() => onIncrement(10)}
              className="px-3 py-1.5 rounded-lg bg-teal-950/60 hover:bg-teal-900/80 border border-teal-600/40 text-teal-300 font-mono text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Plus className="w-3 h-3" /> 10
            </button>
            <button
              type="button"
              onClick={() => onIncrement(-10)}
              className="px-3 py-1.5 rounded-lg bg-orange-950/60 hover:bg-orange-900/80 border border-orange-600/40 text-orange-300 font-mono text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <Minus className="w-3 h-3" /> 10
            </button>
            <button
              type="button"
              onClick={() => onMultiply(2)}
              className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-600/40 text-cyan-300 font-mono text-xs font-semibold transition-all"
            >
              × 2
            </button>
            <button
              type="button"
              onClick={() => onMultiply(0.5)}
              className="px-3 py-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-600/40 text-blue-300 font-mono text-xs font-semibold transition-all"
            >
              ÷ 2
            </button>
            <button
              type="button"
              onClick={onSquare}
              className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-600/40 text-purple-300 font-mono text-xs font-semibold transition-all"
            >
              x²
            </button>
            <button
              type="button"
              onClick={onSqrt}
              className="px-3 py-1.5 rounded-lg bg-fuchsia-950/60 hover:bg-fuchsia-900/80 border border-fuchsia-600/40 text-fuchsia-300 font-mono text-xs font-semibold transition-all"
            >
              √x
            </button>
          </div>

          {/* Interactive On-Screen Number Keypad */}
          {showKeypad && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-3 text-xs text-slate-400 font-mono">
                <span className="text-amber-300 font-semibold uppercase tracking-wider">Touch / Click Keypad:</span>
                <span className="text-slate-500">Instant input for mobile & desktop</span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-w-xl mx-auto">
                {['7', '8', '9', '⌫', 'C', '±',
                  '4', '5', '6', '1', '2', '3',
                  '0', '.', '00', '100'].map((btn) => (
                  <button
                    key={btn}
                    type="button"
                    onClick={() => handleKeypadPress(btn)}
                    className={`h-11 sm:h-12 rounded-xl font-mono text-base sm:text-lg font-bold transition-all active:scale-95 flex items-center justify-center shadow-md ${
                      btn === 'C'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-700/60 hover:bg-rose-900'
                        : btn === '⌫'
                        ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60 hover:bg-amber-900'
                        : btn === '±' || btn === '.'
                        ? 'bg-purple-950/80 text-purple-300 border border-purple-700/60 hover:bg-purple-900'
                        : 'bg-slate-800/90 text-slate-100 border border-slate-700 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-500/50'
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Numbers History */}
          {recentNumbers.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono flex items-center gap-1">
                <History className="w-3.5 h-3.5 text-cyan-400" />
                <span>Your Recents:</span>
              </span>
              {recentNumbers.slice(0, 10).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => onSelectPreset(r)}
                  className="px-2.5 py-1 rounded-md bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/60 text-cyan-300 font-mono font-medium transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preset Fast Selectors with Vibrant Rainbow Colors */}
      <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 sm:p-4 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span className="uppercase tracking-wider font-semibold text-slate-300">Famous Mathematical Numbers:</span>
          <span className="text-slate-500">Tap to load instantly</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.val}
              type="button"
              onClick={() => onSelectPreset(preset.val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white bg-gradient-to-r ${preset.color} hover:brightness-125 shadow-sm shadow-black/50 transition-all active:scale-95`}
              title={`Load number ${preset.label}`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
