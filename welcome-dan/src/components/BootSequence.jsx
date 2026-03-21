import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_LINES } from '../data/constants';
import { useApp } from '../contexts/AppContext';

export default function BootSequence({ onComplete }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const containerRef = useRef(null);
  const { playTick } = useApp();

  const skipToEnd = useCallback(() => {
    if (isComplete || skipped) return;
    setSkipped(true);
    setDisplayedLines(BOOT_LINES.map(l => l.text));
    setCurrentLineIdx(BOOT_LINES.length);
    setIsComplete(true);
  }, [isComplete, skipped]);

  // Typing effect
  useEffect(() => {
    if (skipped || currentLineIdx >= BOOT_LINES.length) return;

    const line = BOOT_LINES[currentLineIdx];
    const text = line.text;

    if (currentCharIdx <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[currentLineIdx] = text.slice(0, currentCharIdx);
          return next;
        });
        if (currentCharIdx < text.length) {
          playTick();
        }
        setCurrentCharIdx(c => c + 1);
      }, line.delay);

      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next
      const nextDelay = currentLineIdx === BOOT_LINES.length - 1 ? 1500 : 200;
      const timeout = setTimeout(() => {
        if (currentLineIdx === BOOT_LINES.length - 1) {
          setIsComplete(true);
        } else {
          setCurrentLineIdx(i => i + 1);
          setCurrentCharIdx(0);
          setDisplayedLines(prev => [...prev, '']);
        }
      }, nextDelay);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIdx, currentCharIdx, skipped, playTick]);

  // Handle collapse after completion
  useEffect(() => {
    if (isComplete && !isCollapsing) {
      const timer = setTimeout(() => {
        setIsCollapsing(true);
        setTimeout(() => onComplete?.(), 800);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isCollapsing, onComplete]);

  // Skip on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isComplete) skipToEnd();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isComplete, skipToEnd]);

  // Initialize first line
  useEffect(() => {
    setDisplayedLines(['']);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
      animate={isCollapsing ? {
        scale: 0.02,
        opacity: 0,
        borderRadius: '8px',
      } : {}}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="font-mono text-sm md:text-base leading-relaxed">
          {displayedLines.map((line, i) => (
            <div key={i} className="text-emerald-400 mb-1">
              {line}
              {i === currentLineIdx && !isComplete && (
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          ))}
        </div>
      </div>

      {!isComplete && (
        <button
          onClick={skipToEnd}
          className="absolute bottom-8 right-8 text-slate-600 text-sm font-mono hover:text-slate-400 transition-colors"
        >
          [SKIP]
        </button>
      )}
    </motion.section>
  );
}
