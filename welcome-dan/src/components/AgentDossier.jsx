import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOSSIER_FIELDS, NAME_MISSPELLINGS, CHARACTER_CLASSES } from '../data/constants';
import { INTERCEPTED_COMMS, TRAITS_DATA, MULTICLASS_SUBCLASSES } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

function NameGenerator() {
  const [available, setAvailable] = useState([...NAME_MISSPELLINGS]);
  const [currentName, setCurrentName] = useState(null);
  const [count, setCount] = useState(0);
  const { playThunk } = useApp();

  const generate = useCallback(() => {
    let pool = available;
    if (pool.length === 0) {
      pool = [...NAME_MISSPELLINGS];
    }
    const idx = Math.floor(Math.random() * pool.length);
    const name = pool[idx];
    const next = pool.filter((_, i) => i !== idx);
    setAvailable(next);
    setCurrentName(name);
    setCount(c => c + 1);
    playThunk();
  }, [available, playThunk]);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={generate}
        className="px-8 py-3 bg-slate-700 border-2 border-slate-500 text-offwhite font-mono text-sm uppercase tracking-wider hover:bg-slate-600 hover:border-teal-400 transition-all duration-200 active:scale-95"
      >
        Generate Misspelling
      </button>

      {currentName && (
        <motion.div
          key={currentName + count}
          initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: Math.random() * 4 - 2 }}
          className="mt-4 inline-block bg-amber-50 text-slate-900 px-6 py-2 font-mono text-lg border border-amber-200 shadow-md"
        >
          {currentName}
        </motion.div>
      )}

      <p className="mt-3 text-slate-500 text-sm font-mono">
        SC will get your name right approximately 34% of the time.
      </p>
    </div>
  );
}

function ClassSelector() {
  const { selectedClass, setSelectedClass, playHoverTick } = useApp();

  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-6 text-center">
        Select Your Class
      </h3>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {CHARACTER_CLASSES.map((cls) => (
          <motion.button
            key={cls.id}
            onClick={() => setSelectedClass(cls.id)}
            onMouseEnter={playHoverTick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-1 max-w-[200px] mx-auto sm:mx-0 p-6 rounded-lg border-2 transition-all duration-300 text-center cursor-pointer ${
              selectedClass === cls.id
                ? 'border-teal-400 bg-teal-400/10 shadow-lg shadow-teal-400/20'
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
            } ${selectedClass && selectedClass !== cls.id ? 'opacity-40' : ''}`}
          >
            <div className="text-4xl mb-2"
              style={cls.id === 'chameleon' && selectedClass === 'chameleon'
                ? { filter: 'hue-rotate(90deg)', transition: 'filter 0.5s' }
                : {}
              }
            >
              {cls.icon}
            </div>
            <div className="text-white font-semibold text-sm">{cls.name}</div>
            <div className="text-slate-400 text-xs mt-1">{cls.description}</div>
          </motion.button>
        ))}
      </div>

      <p className="mt-6 text-slate-500 text-xs text-center leading-relaxed max-w-lg mx-auto">
        Note: TRAITS Assessment Behavioral Adaptability Score: 5.0/10. The psychometric data says you are a gecko. We are overriding the data.
      </p>
    </div>
  );
}

function MulticlassReveal() {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="mt-8 text-center">
      <button
        onClick={() => setRevealed(!revealed)}
        className="inline-flex items-center gap-2 text-slate-600 hover:text-teal-400 transition-colors text-xs font-mono"
      >
        <span className="w-5 h-5 border border-current rounded-full flex items-center justify-center text-[10px]">?</span>
        {!revealed && 'What is a Proposal Coordinator, actually?'}
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-6 bg-slate-800/50 border border-slate-700 rounded-lg text-left max-w-md mx-auto">
              <p className="text-teal-400 text-xs font-mono mb-3 uppercase tracking-wider">
                Class Update: Proposal Coordinator is a multiclass build.
              </p>
              <div className="space-y-2">
                {MULTICLASS_SUBCLASSES.map((sub) => (
                  <div key={sub.name} className="flex items-center gap-3 text-sm">
                    <span className="text-white font-medium w-24">{sub.name}</span>
                    <span className="text-slate-400 text-xs">{sub.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RedactedWord({ children }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      onClick={() => setRevealed(!revealed)}
      className={`cursor-pointer transition-all duration-300 rounded px-0.5 ${
        revealed
          ? 'bg-transparent text-slate-300'
          : 'bg-slate-300 text-transparent hover:bg-slate-400 select-none'
      }`}
    >
      {children}
    </span>
  );
}

function InterceptedCommunications() {
  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-8 text-center">
        Intercepted Communications
      </h3>

      <div className="space-y-6">
        {INTERCEPTED_COMMS.map((comm, ci) => (
          <motion.div
            key={ci}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
            className="paper-texture bg-slate-800 border border-slate-700 rounded-lg p-5 md:p-6 relative overflow-hidden"
          >
            <div
              className="absolute top-3 right-3 text-emerald-500/50 font-mono text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 px-2 py-0.5 rounded"
              style={{ transform: 'rotate(3deg)' }}
            >
              DECLASSIFIED
            </div>

            <div className="text-xs font-mono text-teal-400 mb-1">FROM: {comm.from}</div>
            <div className="text-[10px] font-mono text-slate-500 mb-4">{comm.label}</div>

            <div className="space-y-3">
              {comm.quotes.map((q, qi) => {
                const words = q.text.split(' ');
                return (
                  <p key={qi} className="text-slate-300 text-xs leading-relaxed italic">
                    "{words.map((word, wi) => (
                      <span key={wi}>
                        {q.redactWords.includes(wi)
                          ? <RedactedWord>{word}</RedactedWord>
                          : word
                        }
                        {wi < words.length - 1 ? ' ' : ''}
                      </span>
                    ))}"
                  </p>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TraitsAssessment() {
  return (
    <div className="mt-16">
      <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-8 text-center">
        TRAITS Assessment
      </h3>

      <div className="max-w-2xl mx-auto space-y-5">
        {TRAITS_DATA.map((trait, i) => (
          <motion.div
            key={trait.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-white text-sm font-medium">{trait.label}</span>
              <span className="text-slate-500 text-[10px] font-mono">{trait.tag}</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-1">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(trait.score / trait.maxScore) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.08 }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, #2dd4bf, ${trait.score >= 6 ? '#22c55e' : trait.score >= 5 ? '#f59e0b' : '#ef4444'})`,
                }}
              />
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">{trait.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AgentDossier() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Dossier Card */}
        <div
          className="paper-texture bg-slate-800 border border-slate-600 rounded-lg p-6 md:p-10 relative overflow-hidden"
          style={{ transform: 'rotate(-1deg)' }}
        >
          <div
            className="absolute top-6 right-6 md:top-8 md:right-8 text-red-500 font-mono text-3xl md:text-5xl font-bold uppercase opacity-60 select-none pointer-events-none"
            style={{ transform: 'rotate(12deg)' }}
          >
            CLASSIFIED
          </div>

          <div className="flex flex-col md:flex-row gap-8 relative z-10">
            <div className="w-full md:w-48 h-56 border-2 border-dashed border-slate-500 rounded flex items-center justify-center text-center p-4 shrink-0">
              <span className="text-slate-500 text-xs font-mono leading-relaxed">
                PHOTO PENDING{'\n'}&mdash;{'\n'}AGENT PREFERS NOT TO BE IDENTIFIED BY FULL NAME
              </span>
            </div>

            <div className="flex-1 space-y-3">
              {DOSSIER_FIELDS.map((field) => (
                <div key={field.label} className="flex flex-col sm:flex-row sm:gap-3">
                  <span className="font-mono text-xs text-teal-400 uppercase tracking-wider shrink-0 sm:w-52">
                    {field.label}:
                  </span>
                  <span className="text-slate-200 text-sm">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ transform: 'rotate(0deg)' }}>
          <NameGenerator />
        </div>

        <ClassSelector />
        <MulticlassReveal />
        <InterceptedCommunications />
        <TraitsAssessment />
      </div>
    </motion.section>
  );
}
