import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KATERRA_MEMORIAL, REDLINE_ANNOTATIONS, SC_ACRONYMS } from '../data/constants';
import { useApp } from '../contexts/AppContext';

// ===== Easter Egg 1: Logo Click x5 =====
export function useLogoClickEasterEgg() {
  const [show, setShow] = useState(false);
  const [clicks, setClicks] = useState([]);
  const { unlock } = useApp();

  const handleLogoClick = useCallback(() => {
    const now = Date.now();
    const recent = [...clicks, now].filter(t => now - t < 2000);
    setClicks(recent);
    if (recent.length >= 5) {
      setShow(true);
      setClicks([]);
      unlock('logo-click');
    }
  }, [clicks, unlock]);

  return { showLogoEasterEgg: show, setShowLogoEasterEgg: setShow, handleLogoClick };
}

export function LogoEasterEgg({ show, onClose }) {
  if (!show) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }} onClick={onClose}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="text-white text-lg md:text-xl text-center px-8 max-w-lg leading-relaxed">
        You were hired because you can make complicated things legible.
      </motion.p>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="text-slate-600 text-sm mt-8 font-semibold tracking-wide">
        StructureCraft
      </motion.p>
    </motion.div>
  );
}

// ===== Easter Egg 2: Redline Mode =====
export function useRedlineMode() {
  const [active, setActive] = useState(false);
  const { unlock } = useApp();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
        e.preventDefault();
        setActive(true);
        unlock('redline');
      }
      if (e.key === 'Escape') setActive(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [unlock]);

  return { redlineActive: active, setRedlineActive: setActive };
}

export function RedlineOverlay({ active, onClose }) {
  if (!active) return null;

  const annotations = REDLINE_ANNOTATIONS.map((text) => ({
    text,
    top: 10 + Math.random() * 70,
    left: 5 + Math.random() * 80,
    rotate: -15 + Math.random() * 30,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose}
      className="fixed inset-0 z-[90] cursor-pointer overflow-hidden"
      style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
      <div className="absolute top-0 inset-x-0 bg-red-600 py-2 text-center text-white text-sm font-mono z-10">
        GERALD HAS REVIEWED YOUR WEBSITE.
      </div>
      {annotations.map((ann, i) => (
        <div key={i} className="absolute font-mono text-red-500 text-xs md:text-sm pointer-events-none select-none"
          style={{ top: `${ann.top}%`, left: `${ann.left}%`, transform: `rotate(${ann.rotate}deg)` }}>
          <span className="border border-red-500/50 px-2 py-0.5 rounded bg-red-500/5">{ann.text}</span>
        </div>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={`circle-${i}`} className="absolute border-2 border-red-500/40 rounded-full pointer-events-none"
          style={{ width: 30 + Math.random() * 40, height: 30 + Math.random() * 40,
            top: `${15 + Math.random() * 70}%`, left: `${10 + Math.random() * 75}%` }} />
      ))}
    </motion.div>
  );
}

// ===== Easter Egg 3: Katerra Memorial =====
export function KaterraMemorial({ show, onClose }) {
  const [poured, setPoured] = useState(false);
  const { unlock } = useApp();

  useEffect(() => {
    if (show) unlock('katerra');
  }, [show, unlock]);

  if (!show) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) { onClose(); setPoured(false); } }}
      className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-md">
        <div className="text-6xl mb-6" style={{ animation: 'candle-flicker 2s ease-in-out infinite' }}>
          &#x1F56F;&#xFE0F;
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-8">{KATERRA_MEMORIAL.text}</p>
        <button onClick={() => setPoured(true)}
          className="px-6 py-2 border border-slate-600 text-slate-400 font-mono text-sm rounded hover:border-slate-400 hover:text-white transition-colors">
          {KATERRA_MEMORIAL.button}
        </button>
        {poured && (
          <motion.div initial={{ rotate: 0 }} animate={{ rotate: 90 }} transition={{ duration: 0.5 }}
            className="text-4xl mt-4 inline-block origin-bottom-left">&#x2615;</motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ===== Easter Egg 4: SC Acronym Corruption =====
export function SCFooterText() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const { unlock } = useApp();

  useEffect(() => {
    if (!hovering) { setIndex(0); return; }
    unlock('acronym');
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % SC_ACRONYMS.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [hovering, unlock]);

  return (
    <span onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}
      className="cursor-default relative">
      <AnimatePresence mode="wait">
        <motion.span key={SC_ACRONYMS[index]} initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}
          className="inline-block">
          {SC_ACRONYMS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
