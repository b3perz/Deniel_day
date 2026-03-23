import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CLASSIFIED_UNLOCKS } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

export default function AchievementToast() {
  const { unlocks, playChime } = useApp();
  const [toast, setToast] = useState(null);
  const prevCount = useRef(Object.keys(unlocks).length);

  useEffect(() => {
    const currentCount = Object.keys(unlocks).length;
    if (currentCount > prevCount.current) {
      // Find newly unlocked
      const newIds = Object.keys(unlocks);
      const latest = newIds[newIds.length - 1];
      const def = CLASSIFIED_UNLOCKS.find(u => u.id === latest);
      if (def) {
        setToast(def);
        playChime();
        setTimeout(() => setToast(null), 4000);
      }
    }
    prevCount.current = currentCount;
  }, [unlocks, playChime]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-14 right-4 z-50"
        >
          <div className="bg-slate-900/95 backdrop-blur-sm border border-teal-400/50 rounded-lg p-4 shadow-xl shadow-teal-400/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{toast.icon}</span>
              <div>
                <div className="text-[9px] font-mono text-teal-400 uppercase tracking-wider mb-0.5">
                  Achievement Unlocked
                </div>
                <div className="text-white text-sm font-semibold">{toast.name}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
