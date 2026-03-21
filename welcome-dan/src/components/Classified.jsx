import { motion } from 'framer-motion';
import { CLASSIFIED_UNLOCKS } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

export default function Classified() {
  const { unlocks, unlockCount } = useApp();
  const total = CLASSIFIED_UNLOCKS.length;
  const allUnlocked = unlockCount >= total;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">CLASSIFIED</h2>
        <p className="text-center font-mono text-sm text-amber-400 mb-8">Easter Egg Clearance Tracker</p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">CLEARANCES OBTAINED</span>
            <span className="text-teal-400">{unlockCount}/{total}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockCount / total) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"
            />
          </div>
        </div>

        {/* Unlock grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLASSIFIED_UNLOCKS.map((item, i) => {
            const isUnlocked = !!unlocks[item.id];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-teal-400/5 border-teal-400/30'
                    : 'bg-slate-800/50 border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${isUnlocked ? '' : 'grayscale opacity-30'}`}>
                    {isUnlocked ? item.icon : '\uD83D\uDD12'}
                  </div>
                  <div>
                    <div className={`font-mono text-xs font-bold uppercase tracking-wider ${
                      isUnlocked ? 'text-teal-400' : 'text-slate-600'
                    }`}>
                      {isUnlocked ? item.name : '???'}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isUnlocked ? 'text-slate-400' : 'text-slate-600'}`}>
                      {isUnlocked ? item.trigger : 'Locked'}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full clearance message */}
        {allUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center p-8 bg-teal-400/5 border-2 border-teal-400/30 rounded-lg"
          >
            <div className="text-teal-400 font-mono text-xs uppercase tracking-widest mb-3">Full Clearance Granted</div>
            <p className="text-white text-lg font-medium">
              You are now authorized to update Notion pages last edited in 2023.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
