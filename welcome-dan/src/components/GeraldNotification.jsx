import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GeraldNotification() {
  const [phase, setPhase] = useState('waiting'); // waiting | showing | punchline | done
  const triggered = useRef(false);

  useEffect(() => {
    // Trigger once after 5 minutes
    const timer = setTimeout(() => {
      if (!triggered.current) {
        triggered.current = true;
        setPhase('showing');
        setTimeout(() => setPhase('punchline'), 3000);
        setTimeout(() => setPhase('done'), 5500);
      }
    }, 300000); // 5 minutes
    return () => clearTimeout(timer);
  }, []);

  if (phase === 'waiting' || phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        className="fixed top-14 left-1/2 -translate-x-1/2 z-[60]"
      >
        <div className={`px-6 py-3 rounded-lg border backdrop-blur-sm shadow-lg font-mono text-sm ${
          phase === 'showing'
            ? 'bg-red-950/90 border-red-500/50 text-red-400'
            : 'bg-slate-800/90 border-slate-600 text-slate-400'
        }`}
          style={phase === 'showing' ? { animation: 'glitch-flicker 1.5s infinite' } : {}}
        >
          {phase === 'showing'
            ? '\u26A0\uFE0F Gerald Epp is reviewing this page...'
            : 'False alarm. For now.'}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
