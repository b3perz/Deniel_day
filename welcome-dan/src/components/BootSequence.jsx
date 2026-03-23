import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BOOT_LINES } from '../data/constants';
import { useApp } from '../contexts/AppContext';

const DIAGNOSTICS = [
  { label: 'INDESIGN PROFICIENCY', filled: 10, total: 10, status: 'VERIFIED' },
  { label: 'HUBSPOT EXPERIENCE', filled: 8, total: 10, status: 'ABOVE AVERAGE' },
  { label: 'NOTION FAMILIARITY', filled: 1, total: 10, status: 'PENDING', flash: true },
  { label: 'P: DRIVE SURVIVAL TRAINING', filled: 0, total: 10, status: 'NOT STARTED', flash: true },
  { label: 'MASS TIMBER KNOWLEDGE', filled: 3, total: 10, status: '"NOT ENOUGH" (SELF-REPORTED)' },
  { label: 'KATERRA TRAUMA PROCESSING', filled: 6, total: 10, status: 'IN PROGRESS' },
  { label: 'NAME SPELLING RESILIENCE', filled: 10, total: 10, status: 'BATTLE-HARDENED' },
];

function getTimeLine() {
  const hour = new Date().getHours();
  if (hour < 8) return '> EARLY BIRD DETECTED. BONUS CLEARANCE POINT AWARDED.';
  if (hour >= 18) return '> AFTER-HOURS ACCESS DETECTED. PROPOSAL DEADLINE MUST BE CLOSE.';
  const day = new Date().getDay();
  if (day === 0 || day === 6) return '> WEEKEND ACCESS DETECTED. THIS LEVEL OF DEDICATION IS NOTED AND APPRECIATED.';
  return null;
}

function buildAllLines() {
  const lines = [];

  // Phase 1: Boot text
  const bootLines = [...BOOT_LINES];
  const tl = getTimeLine();
  if (tl) bootLines.splice(1, 0, { text: tl, delay: 50 });
  bootLines.forEach(l => lines.push({ text: l.text, delay: l.delay, type: 'text' }));

  // Phase 2: Diagnostics header
  lines.push({ text: '> RUNNING DIAGNOSTICS...', delay: 40, type: 'text', pause: 300 });

  // Phase 2: Diagnostic bars
  DIAGNOSTICS.forEach(d => {
    const bar = d.filled > 0
      ? '\u2588'.repeat(d.filled) + '\u2591'.repeat(d.total - d.filled)
      : '\u2591'.repeat(d.total);
    const dots = '.'.repeat(Math.max(1, 28 - d.label.length));
    lines.push({
      text: `> ${d.label}${dots} ${bar} ${d.status}`,
      delay: 20,
      type: 'instant',
      pause: 350,
      flash: d.flash,
    });
  });

  // Phase 3: Result
  lines.push({ text: '>', delay: 0, type: 'instant', pause: 400 });
  lines.push({ text: '> DIAGNOSIS: READY FOR DEPLOYMENT', delay: 30, type: 'text' });
  lines.push({ text: '> ASSIGNING TO: STRUCTURECRAFT BD \u2014 SEATTLE DIVISION', delay: 30, type: 'text' });
  lines.push({ text: '> ALSO: YOUR NAME HAS BEEN PRE-MISSPELLED IN 3 INTERNAL SYSTEMS', delay: 30, type: 'text', pause: 1200, amber: true });

  return lines;
}

export default function BootSequence({ onComplete }) {
  const allLines = useMemo(buildAllLines, []);
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const { playTick } = useApp();

  const skipToEnd = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    setVisibleLines(allLines.map(l => l.text));
    setIsComplete(true);
  }, [skipped, allLines]);

  // Main animation loop
  useEffect(() => {
    if (skipped || isComplete || currentIdx >= allLines.length) return;

    const line = allLines[currentIdx];

    if (line.type === 'instant') {
      // Show whole line at once after pause
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text]);
        playTick();
        // Pause before next line
        const nextTimer = setTimeout(() => {
          setCurrentIdx(i => i + 1);
          setCurrentChar(0);
        }, line.pause || 200);
        return () => clearTimeout(nextTimer);
      }, 100);
      return () => clearTimeout(timer);
    }

    // Typing mode
    const text = line.text;
    if (currentChar <= text.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => {
          const next = [...prev];
          if (next.length <= currentIdx) next.push('');
          next[currentIdx] = text.slice(0, currentChar);
          return next;
        });
        if (currentChar < text.length) playTick();
        setCurrentChar(c => c + 1);
      }, line.delay);
      return () => clearTimeout(timer);
    } else {
      // Line done, move to next
      const isLast = currentIdx === allLines.length - 1;
      const pauseTime = line.pause || (isLast ? 1500 : 200);
      const timer = setTimeout(() => {
        if (isLast) {
          setIsComplete(true);
        } else {
          setCurrentIdx(i => i + 1);
          setCurrentChar(0);
        }
      }, pauseTime);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, currentChar, skipped, isComplete, allLines, playTick]);

  // Collapse and transition
  useEffect(() => {
    if (!isComplete || isCollapsing) return;
    const timer = setTimeout(() => {
      setIsCollapsing(true);
      setTimeout(() => onComplete?.(), 800);
    }, skipped ? 100 : 400);
    return () => clearTimeout(timer);
  }, [isComplete, isCollapsing, skipped, onComplete]);

  // Skip on scroll
  useEffect(() => {
    const handler = () => { if (!isComplete) skipToEnd(); };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isComplete, skipToEnd]);

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
      animate={isCollapsing ? { scale: 0.02, opacity: 0, borderRadius: '8px' } : {}}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-3xl px-6 py-12 overflow-y-auto max-h-screen">
        <div className="font-mono text-sm md:text-base leading-relaxed">
          {visibleLines.map((line, i) => {
            const meta = allLines[i];
            const isAmber = meta?.amber;
            const isFlash = meta?.flash;
            return (
              <div key={i} className={`mb-1 ${isAmber ? 'text-amber-400' : isFlash ? 'text-red-400' : 'text-emerald-400'}`}>
                {line}
                {i === currentIdx && !isComplete && currentChar <= (allLines[i]?.text?.length || 0) && allLines[i]?.type !== 'instant' && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!isComplete && (
        <button onClick={skipToEnd}
          className="absolute bottom-8 right-8 text-slate-600 text-sm font-mono hover:text-slate-400 transition-colors">
          [SKIP]
        </button>
      )}
    </motion.section>
  );
}
