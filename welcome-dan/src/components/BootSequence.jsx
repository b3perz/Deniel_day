import { useState, useEffect, useRef, useCallback } from 'react';
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

const CLASS_DIAGNOSTICS = {
  renaissance: { label: 'CREATIVE VISION', filled: 8, total: 10, status: 'ACTIVE' },
  chameleon: { label: 'ADAPTIVE PROTOCOL', filled: 8, total: 10, status: 'ENGAGED' },
  octopus: { label: 'MULTI-THREAD CAPACITY', filled: 8, total: 10, status: 'OPERATIONAL' },
};

function getTimeLine() {
  const hour = new Date().getHours();
  if (hour < 8) return '> EARLY BIRD DETECTED. BONUS CLEARANCE POINT AWARDED.';
  if (hour >= 18) return '> AFTER-HOURS ACCESS DETECTED. PROPOSAL DEADLINE MUST BE CLOSE.';
  const day = new Date().getDay();
  if (day === 0 || day === 6) return '> WEEKEND ACCESS DETECTED. THIS LEVEL OF DEDICATION IS NOTED AND APPRECIATED.';
  return null;
}

function ProgressBar({ filled, total, animating, flash }) {
  const blocks = Array.from({ length: total }, (_, i) => i < filled ? '\u2588' : '\u2591');
  return (
    <span className={flash && filled <= 1 ? 'animate-pulse text-red-400' : ''}>
      {animating ? blocks.join('') : '\u2591'.repeat(total)}
    </span>
  );
}

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState('typing'); // typing | diagnostics | gag | done
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [diagIndex, setDiagIndex] = useState(-1);
  const [diagAnimated, setDiagAnimated] = useState({});
  const [gagLines, setGagLines] = useState([]);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const containerRef = useRef(null);
  const { playTick, selectedClass } = useApp();

  const timeLine = useRef(getTimeLine()).current;

  const allBootLines = useRef(() => {
    const lines = [...BOOT_LINES];
    if (timeLine) lines.splice(1, 0, { text: timeLine, delay: 50 });
    return lines;
  }).current();

  const getAllText = useCallback(() => {
    const lines = allBootLines.map(l => l.text);
    lines.push('> RUNNING DIAGNOSTICS...');
    DIAGNOSTICS.forEach(d => {
      const bar = d.filled > 0 ? '\u2588'.repeat(d.filled) + '\u2591'.repeat(d.total - d.filled) : '\u2591'.repeat(d.total);
      lines.push(`> ${d.label}${'.' .repeat(Math.max(1, 28 - d.label.length))} ${bar} ${d.status}`);
    });
    if (selectedClass && CLASS_DIAGNOSTICS[selectedClass]) {
      const cd = CLASS_DIAGNOSTICS[selectedClass];
      const bar = '\u2588'.repeat(cd.filled) + '\u2591'.repeat(cd.total - cd.filled);
      lines.push(`> ${cd.label}${'.' .repeat(Math.max(1, 28 - cd.label.length))} ${bar} ${cd.status}`);
    }
    lines.push('>');
    lines.push('> DIAGNOSIS: READY FOR DEPLOYMENT');
    lines.push('> ASSIGNING TO: STRUCTURECRAFT BD \u2014 SEATTLE DIVISION');
    lines.push('> ALSO: YOUR NAME HAS BEEN PRE-MISSPELLED IN 3 INTERNAL SYSTEMS');
    return lines;
  }, [allBootLines, selectedClass]);

  const skipToEnd = useCallback(() => {
    if (skipped) return;
    setSkipped(true);
    setPhase('done');
    setDisplayedLines(getAllText());
  }, [skipped, getAllText]);

  // Phase 1: Typing
  useEffect(() => {
    if (phase !== 'typing' || skipped || currentLineIdx >= allBootLines.length) return;
    const line = allBootLines[currentLineIdx];
    const text = line.text;

    if (currentCharIdx <= text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[currentLineIdx] = text.slice(0, currentCharIdx);
          return next;
        });
        if (currentCharIdx < text.length) playTick();
        setCurrentCharIdx(c => c + 1);
      }, line.delay);
      return () => clearTimeout(timeout);
    } else {
      const isLast = currentLineIdx === allBootLines.length - 1;
      const timeout = setTimeout(() => {
        if (isLast) {
          setPhase('diagnostics');
          setDisplayedLines(prev => [...prev, '> RUNNING DIAGNOSTICS...']);
        } else {
          setCurrentLineIdx(i => i + 1);
          setCurrentCharIdx(0);
          setDisplayedLines(prev => [...prev, '']);
        }
      }, isLast ? 800 : 200);
      return () => clearTimeout(timeout);
    }
  }, [phase, currentLineIdx, currentCharIdx, skipped, allBootLines, playTick]);

  // Phase 2: Diagnostics
  useEffect(() => {
    if (phase !== 'diagnostics' || skipped) return;

    const allDiags = [...DIAGNOSTICS];
    if (selectedClass && CLASS_DIAGNOSTICS[selectedClass]) {
      allDiags.push(CLASS_DIAGNOSTICS[selectedClass]);
    }

    if (diagIndex < allDiags.length - 1) {
      const timeout = setTimeout(() => {
        const nextIdx = diagIndex + 1;
        setDiagIndex(nextIdx);
        // Animate bar fill after a moment
        setTimeout(() => {
          setDiagAnimated(prev => ({ ...prev, [nextIdx]: true }));
          playTick();
        }, 100);
      }, 500);
      return () => clearTimeout(timeout);
    } else if (diagIndex === allDiags.length - 1) {
      const timeout = setTimeout(() => setPhase('gag'), 600);
      return () => clearTimeout(timeout);
    }
  }, [phase, diagIndex, skipped, selectedClass, playTick]);

  // Phase 3: Gag lines
  useEffect(() => {
    if (phase !== 'gag' || skipped) return;
    const lines = [
      '',
      '> DIAGNOSIS: READY FOR DEPLOYMENT',
      '> ASSIGNING TO: STRUCTURECRAFT BD \u2014 SEATTLE DIVISION',
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < lines.length) {
        setGagLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(timer);
        // Pause then final gag
        setTimeout(() => {
          setGagLines(prev => [...prev, '> ALSO: YOUR NAME HAS BEEN PRE-MISSPELLED IN 3 INTERNAL SYSTEMS']);
          setTimeout(() => setPhase('done'), 1500);
        }, 1000);
      }
    }, 400);
    return () => clearInterval(timer);
  }, [phase, skipped]);

  // Done → collapse
  useEffect(() => {
    if (phase !== 'done') return;
    const timer = setTimeout(() => {
      setIsCollapsing(true);
      setTimeout(() => onComplete?.(), 800);
    }, skipped ? 200 : 500);
    return () => clearTimeout(timer);
  }, [phase, skipped, onComplete]);

  // Skip on scroll
  useEffect(() => {
    const handleScroll = () => { if (phase !== 'done') skipToEnd(); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [phase, skipToEnd]);

  // Init
  useEffect(() => { setDisplayedLines(['']); }, []);

  const allDiags = [...DIAGNOSTICS];
  if (selectedClass && CLASS_DIAGNOSTICS[selectedClass]) {
    allDiags.push(CLASS_DIAGNOSTICS[selectedClass]);
  }

  return (
    <motion.section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden"
      animate={isCollapsing ? { scale: 0.02, opacity: 0, borderRadius: '8px' } : {}}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-3xl px-6 py-12">
        <div className="font-mono text-sm md:text-base leading-relaxed">
          {/* Phase 1: Typing lines */}
          {displayedLines.map((line, i) => (
            <div key={`line-${i}`} className="text-emerald-400 mb-1">
              {line}
              {phase === 'typing' && i === currentLineIdx && !skipped && (
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          ))}

          {/* Phase 2: Diagnostics */}
          {phase === 'diagnostics' && !skipped && (
            <>
              {allDiags.slice(0, diagIndex + 1).map((d, i) => (
                <div key={`diag-${i}`} className={`mb-1 ${d.flash && !diagAnimated[i] ? 'text-red-400' : 'text-emerald-400'}`}>
                  {'> '}{d.label}{'.' .repeat(Math.max(1, 28 - d.label.length))}{' '}
                  <ProgressBar filled={d.filled} total={d.total} animating={diagAnimated[i]} flash={d.flash} />
                  {diagAnimated[i] && <span className="ml-1">{d.status}</span>}
                </div>
              ))}
            </>
          )}

          {/* Phase 3: Gag lines */}
          {(phase === 'gag' || phase === 'done') && !skipped && gagLines.map((line, i) => (
            <div key={`gag-${i}`} className={`text-emerald-400 mb-1 ${
              line.includes('PRE-MISSPELLED') ? 'text-amber-400' : ''
            }`}>
              {line}
            </div>
          ))}
        </div>
      </div>

      {phase !== 'done' && (
        <button onClick={skipToEnd}
          className="absolute bottom-8 right-8 text-slate-600 text-sm font-mono hover:text-slate-400 transition-colors">
          [SKIP]
        </button>
      )}
    </motion.section>
  );
}
