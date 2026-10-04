/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { NumberInputBar } from './components/NumberInputBar';
import { OverviewHero } from './components/OverviewHero';
import { PrimeDivisorSection } from './components/PrimeDivisorSection';
import { CollatzVisualizer } from './components/CollatzVisualizer';
import { NumeralSystemsSection } from './components/NumeralSystemsSection';
import { ScienceAndUnitsSection } from './components/ScienceAndUnitsSection';
import { DynamicSequencesSection } from './components/DynamicSequencesSection';
import { GeminiLoreSection } from './components/GeminiLoreSection';
import { analyzeNumber } from './utils/numberAnalysis';

const FAMOUS_POOL = [
  '0', '1', '2', '3', '5', '7', '12', '13', '17', '23', '28', '42', '55', '73', '89',
  '108', '137', '144', '256', '360', '496', '666', '720', '1024', '1729', '6174', '2026',
  '3.14159', '1.61803', '2.71828'
];

export default function App() {
  const [inputVal, setInputVal] = useState('42');
  const [activeNumber, setActiveNumber] = useState('42');
  const [recentNumbers, setRecentNumbers] = useState<string[]>(['42', '7', '1729', '2026']);

  // Live real-time analysis
  useEffect(() => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const timer = setTimeout(() => {
      setActiveNumber(trimmed);
      setRecentNumbers(prev => {
        if (!prev.includes(trimmed)) {
          return [trimmed, ...prev.slice(0, 11)];
        }
        return prev;
      });
    }, 180);

    return () => clearTimeout(timer);
  }, [inputVal]);

  const analysis = useMemo(() => {
    return analyzeNumber(activeNumber);
  }, [activeNumber]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputVal.trim()) {
      const trimmed = inputVal.trim();
      setActiveNumber(trimmed);
      setRecentNumbers(prev => {
        if (!prev.includes(trimmed)) {
          return [trimmed, ...prev.slice(0, 11)];
        }
        return prev;
      });
    }
  };

  const handleSelectNumber = (numStr: string) => {
    setInputVal(numStr);
    setActiveNumber(numStr);
    setRecentNumbers(prev => {
      if (!prev.includes(numStr)) {
        return [numStr, ...prev.slice(0, 11)];
      }
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleIncrement = (delta: number) => {
    const num = Number(analysis.parsedNumber);
    if (!isNaN(num)) {
      const next = (num + delta).toString();
      handleSelectNumber(next);
    }
  };

  const handleMultiply = (factor: number) => {
    const num = Number(analysis.parsedNumber);
    if (!isNaN(num)) {
      const next = (num * factor).toString();
      handleSelectNumber(next);
    }
  };

  const handleSquare = () => {
    const num = Number(analysis.parsedNumber);
    if (!isNaN(num)) {
      const next = (num * num).toString();
      handleSelectNumber(next);
    }
  };

  const handleSqrt = () => {
    const num = Number(analysis.parsedNumber);
    if (!isNaN(num) && num >= 0) {
      const root = Math.sqrt(num);
      const next = Number.isInteger(root) ? root.toString() : root.toFixed(4);
      handleSelectNumber(next);
    }
  };

  const handleRandomNumber = () => {
    const isSpecial = Math.random() < 0.5;
    let chosen: string;
    if (isSpecial) {
      chosen = FAMOUS_POOL[Math.floor(Math.random() * FAMOUS_POOL.length)];
    } else {
      chosen = String(Math.floor(Math.random() * 999) + 1);
    }
    handleSelectNumber(chosen);
  };

  const handleReset = () => {
    handleSelectNumber('42');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500/30 selection:text-pink-200 relative overflow-x-hidden">
      {/* Radiant Multicolored Atmosphere Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-gradient-to-br from-pink-500/10 via-purple-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 via-blue-600/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-10 w-[600px] h-[500px] bg-gradient-to-br from-amber-500/10 via-orange-600/10 to-transparent rounded-full blur-[140px]" />
      </div>

      {/* Top Bar Header */}
      <Header
        onRandomNumber={handleRandomNumber}
        onReset={handleReset}
        onSelectPreset={handleSelectNumber}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Fill Out Your Custom Number & Keypad Bar */}
        <NumberInputBar
          inputValue={inputVal}
          onChangeInput={setInputVal}
          onSubmit={handleSubmit}
          onIncrement={handleIncrement}
          onMultiply={handleMultiply}
          onSquare={handleSquare}
          onSqrt={handleSqrt}
          onSelectPreset={handleSelectNumber}
          recentNumbers={recentNumbers}
        />

        {/* Overview Hero & Arithmetic Identity */}
        <OverviewHero analysis={analysis} />

        {/* Factors, Prime Architecture & Figurate Geometry */}
        <PrimeDivisorSection
          analysis={analysis}
          onSelectNumber={handleSelectNumber}
        />

        {/* Collatz Conjecture (3n + 1) Orbit Graph */}
        <CollatzVisualizer
          collatz={analysis.collatz}
          currentNumber={analysis.parsedNumber}
        />

        {/* Numeral Systems & Digital Architecture */}
        <NumeralSystemsSection analysis={analysis} />

        {/* Physical Dimensions, Chemistry & Chronology */}
        <ScienceAndUnitsSection
          analysis={analysis}
          onSelectNumber={handleSelectNumber}
        />

        {/* Recreational Math & Dynamic Sequences */}
        <DynamicSequencesSection
          analysis={analysis}
          onSelectNumber={handleSelectNumber}
        />

        {/* Gemini AI Encyclopedic Lore & Cultural Trivia */}
        <GeminiLoreSection numberString={activeNumber} />
      </main>

      {/* Editorial Colourful Footer */}
      <footer className="relative z-10 mt-16 border-t border-slate-900 bg-slate-950/90 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 font-semibold text-sm">
            "God created the integers, all else is the work of man." — Leopold Kronecker
          </div>
          <div className="flex items-center gap-4 text-slate-500 font-mono">
            <span>OmniNumber Real-Time Explorer</span>
            <span aria-hidden="true">·</span>
            <a
              href="/api/download-zip"
              download="omninumber-app.zip"
              className="text-pink-400 hover:text-pink-300 underline font-semibold transition-colors"
            >
              Download Project Source (.zip)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
