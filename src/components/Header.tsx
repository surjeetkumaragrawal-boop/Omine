import React, { useState } from 'react';
import { Menu, X, Dice5, Compass, Sparkles, Hash, Download } from 'lucide-react';

interface HeaderProps {
  onRandomNumber: () => void;
  onReset: () => void;
  onSelectPreset: (n: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onRandomNumber, onReset, onSelectPreset }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Arithmetic', href: '#arithmetic', color: 'hover:text-amber-400' },
    { label: 'Factors & Primes', href: '#factors', color: 'hover:text-emerald-400' },
    { label: 'Collatz Orbit', href: '#collatz', color: 'hover:text-orange-400' },
    { label: 'Numeral Systems', href: '#systems', color: 'hover:text-cyan-400' },
    { label: 'Science & Units', href: '#science', color: 'hover:text-indigo-400' },
    { label: 'Lore & AI', href: '#lore', color: 'hover:text-pink-400' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onReset}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-amber-400 to-cyan-400 text-slate-950 font-black text-lg shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            Ω
          </div>
          <span className="font-serif text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300">
            OmniNumber
          </span>
        </button>

        {/* Zone 2: Desktop clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide uppercase text-slate-300">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`${item.color} transition-colors`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/api/download-zip"
            download="omninumber-app.zip"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-900 border border-slate-700/80 hover:border-pink-500 hover:text-pink-300 rounded-lg shadow-sm transition-all whitespace-nowrap active:scale-95"
            title="Download the complete project source code (.zip)"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline">Download ZIP</span>
            <span className="sm:hidden">ZIP</span>
          </a>

          <button
            onClick={onRandomNumber}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 rounded-lg shadow-md shadow-cyan-500/20 transition-all whitespace-nowrap active:scale-95"
            title="Generate a random interesting number"
          >
            <Dice5 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Random Number</span>
            <span className="sm:hidden">Random</span>
          </button>

          {/* Mobile / Narrow Screen Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-900">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Menu & Tools
            </span>
            <a
              href="/api/download-zip"
              download="omninumber-app.zip"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300 font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .ZIP</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800/80 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
