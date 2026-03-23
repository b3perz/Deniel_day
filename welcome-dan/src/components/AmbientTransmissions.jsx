import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TRANSMISSIONS = [
  'INCOMING: Gerald has entered the proposal review queue. Estimated turnaround: faster than you expect.',
  'ALERT: An engineer has marked a resume update request as "read." Status: unchanged.',
  'NOTICE: The P: drive has been backed up. None of the photos were tagged during the process.',
  'UPDATE: A sub-consultant has replied to your email from 4 days ago. They attached the wrong resume.',
  'INTEL: Leif has forwarded you an RFP. Subject line: "Quick one." It is not quick.',
  'STATUS: Your InDesign file has 0 errors. This feeling will not last.',
  'FIELD REPORT: Someone in Abbotsford just used the phrase "mass timber company." A correction has been issued.',
  'REMINDER: "Adopt or get left behind." \u2014 You, apparently.',
  'NOTICE: Someone on the BD team built this website. They want you to know they could have been finishing a proposal instead.',
  'INCOMING: Ben has shared a few completed proposals in Notion for your review.',
];

export default function AmbientTransmissions() {
  const [current, setCurrent] = useState(null);
  const startTime = useRef(Date.now());
  const shownTime = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Check if 20 min elapsed for the special message
      const elapsed = Math.round((Date.now() - startTime.current) / 60000);
      if (elapsed >= 20 && !shownTime.current) {
        shownTime.current = true;
        setCurrent(`OBSERVATION: You've been browsing this website for ${elapsed} minutes. Your first proposal won't write itself. (Just kidding. Explore away.)`);
        setTimeout(() => setCurrent(null), 6000);
        return;
      }

      // Random transmission
      if (Math.random() < 0.4) {
        const msg = TRANSMISSIONS[Math.floor(Math.random() * TRANSMISSIONS.length)];
        setCurrent(msg);
        setTimeout(() => setCurrent(null), 5000);
      }
    }, 200000); // ~3.3 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          initial={{ opacity: 0, y: 30, x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-14 left-4 z-40 max-w-sm"
        >
          <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg p-3 shadow-xl">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">Incoming Transmission</span>
              <button onClick={() => setCurrent(null)} className="text-slate-600 hover:text-slate-400 text-xs leading-none">&times;</button>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed font-mono">{current}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
