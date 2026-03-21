import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INTERVIEW_QUOTES } from '../data/expansion';

export default function InterceptedQuote({ pageId }) {
  const [quote, setQuote] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
    setQuote(null);
    // 40% chance of showing a quote on page change
    if (Math.random() > 0.6) {
      const delay = 3000 + Math.random() * 5000;
      const timer = setTimeout(() => {
        setQuote(INTERVIEW_QUOTES[Math.floor(Math.random() * INTERVIEW_QUOTES.length)]);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [pageId]);

  if (dismissed || !quote) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-14 right-4 z-40 max-w-xs"
      >
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-[9px] font-mono text-amber-400 uppercase tracking-wider">
              Intercepted Transmission
            </span>
            <button
              onClick={() => setDismissed(true)}
              className="text-slate-600 hover:text-slate-400 text-xs leading-none"
            >
              &times;
            </button>
          </div>
          <p className="text-slate-300 text-xs italic leading-relaxed">
            "{quote.text}"
          </p>
          <p className="text-slate-500 text-[10px] mt-2 font-mono">
            &mdash; {quote.attr}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
