import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

export default function NavBar({ onLogoClick }) {
  const { activePage, setActivePage, unlockCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="text-slate-500 font-semibold text-sm tracking-wider hover:text-slate-300 transition-colors select-none shrink-0"
        >
          SC
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded transition-all duration-200 ${
                activePage === item.id
                  ? 'text-teal-400 bg-teal-400/10'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
            >
              {item.label}
              {item.id === 'classified' && unlockCount > 0 && (
                <span className="ml-1 text-[9px] text-amber-400">{unlockCount}/10</span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-slate-950 border-b border-slate-800"
          >
            <div className="px-4 py-2 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileOpen(false); }}
                  className={`block w-full text-left px-3 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                    activePage === item.id
                      ? 'text-teal-400 bg-teal-400/10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {item.label}
                  {item.id === 'classified' && unlockCount > 0 && (
                    <span className="ml-1 text-amber-400">{unlockCount}/10</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
