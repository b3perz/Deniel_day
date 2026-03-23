import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CAREER_TIMELINE, RENAISSANCE_SUBTITLES, DEFAULT_SUBTITLES } from '../data/constants';
import { KATERRA_EXPANDED, KOVA_EXPANDED } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

function KaterraDeepDive({ onClose }) {
  const k = KATERRA_EXPANDED;
  const ir = k.incidentReport;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/90 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-w-3xl mx-auto">
        <button onClick={onClose} className="text-slate-500 hover:text-white font-mono text-sm mb-6 block">&larr; Back to Timeline</button>

        <h2 className="text-2xl font-bold text-white mb-8">KATERRA &mdash; DEEP FILE</h2>

        <div className="space-y-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-3">What Katerra Actually Was</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{k.whatItWas}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-3">Dan's Actual Role</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{k.dansRole}</p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-3">The Mass Timber Connection</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{k.massTimberConnection}</p>
          </div>

          {/* Incident Report */}
          <div className="paper-texture bg-slate-800 border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-red-500/40 font-mono text-[10px] font-bold">{ir.classification}</div>
            <div className="text-red-400 font-mono text-xs uppercase tracking-wider mb-4">{ir.title}</div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex gap-3"><span className="text-slate-500 w-28 shrink-0">Case:</span><span className="text-slate-300">{ir.caseNumber}</span></div>
              <div className="flex gap-3"><span className="text-slate-500 w-28 shrink-0">Subject:</span><span className="text-slate-300">{ir.subject}</span></div>
              <div className="flex gap-3"><span className="text-slate-500 w-28 shrink-0">Date:</span><span className="text-slate-300">{ir.date}</span></div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-slate-500 font-mono text-[10px] uppercase mb-2">Summary</div>
              <p className="text-slate-300 text-xs leading-relaxed">{ir.summary}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-slate-500 font-mono text-[10px] uppercase mb-2">Personnel Impact</div>
              <p className="text-amber-400 text-xs leading-relaxed">{ir.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KovaDeepDive({ onClose }) {
  const k = KOVA_EXPANDED;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/90 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-w-3xl mx-auto">
        <button onClick={onClose} className="text-slate-500 hover:text-white font-mono text-sm mb-6 block">&larr; Back to Timeline</button>

        <h2 className="text-2xl font-bold text-white mb-8">KOVA / MODWALL / AIIR &mdash; DEEP FILE</h2>

        <div className="space-y-8">
          {/* VC Web Diagram */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-6">The VC Web</h3>
            <div className="flex flex-col items-center gap-3">
              <div className="px-4 py-2 border border-slate-600 rounded text-white text-sm font-medium">{k.vcWeb.top}</div>
              <div className="w-px h-6 bg-slate-600" />
              <div className="px-4 py-2 border border-slate-600 rounded text-slate-300 text-xs">{k.vcWeb.middle}</div>
              <div className="w-px h-6 bg-slate-600" />
              <div className="flex gap-4">
                {k.vcWeb.branches.map((b) => (
                  <div key={b} className="px-3 py-1.5 border border-slate-600 rounded text-slate-400 text-xs">{b}</div>
                ))}
              </div>
              <div className="w-px h-6 bg-teal-400/50" />
              <div className="px-4 py-2 border-2 border-teal-400 rounded text-teal-400 font-mono text-sm font-bold">{k.vcWeb.center}</div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-3">What He Actually Built</h3>
            <ul className="space-y-2">
              {k.whatHeBuilt.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm leading-relaxed flex gap-2">
                  <span className="text-teal-400 shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-teal-400 font-mono text-sm uppercase tracking-wider mb-3">Why He Left</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{k.whyHeLeft}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCard({ item, accentColor, onKaterraClick, onDeepDive }) {
  const [expanded, setExpanded] = useState(false);
  const { playHoverTick } = useApp();

  const hasDeepDive = item.id === 'katerra' || item.id === 'kova';

  if (item.centerLine) {
    return (
      <div className="min-w-[280px] md:min-w-[320px] snap-center flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-sm font-mono mb-2" style={{ color: accentColor }}>{item.years}</div>
          <div className="text-xl text-white mb-1">{item.icon}</div>
          <div className="text-xl md:text-2xl font-semibold text-white">{item.centerLine}</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-w-[280px] md:min-w-[320px] max-w-[340px] snap-center px-2">
      <motion.div
        onMouseEnter={playHoverTick}
        onClick={() => setExpanded(!expanded)}
        className="bg-slate-800 border border-slate-700 rounded-lg p-5 cursor-pointer hover:border-slate-500 transition-all duration-200 h-full relative"
        whileHover={{ y: -4 }}
      >
        <div className="text-xs font-mono mb-2" style={{ color: accentColor }}>{item.years}</div>
        <div className="text-2xl mb-2">{item.icon}</div>
        <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
        <p className="text-slate-400 text-xs leading-relaxed">{item.short}</p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-slate-700">
                <p className="text-slate-300 text-xs leading-relaxed">{item.expanded}</p>
                {item.subtext && (
                  <p className="mt-2 text-xs font-mono" style={{ color: accentColor }}>{item.subtext}</p>
                )}
                {hasDeepDive && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDeepDive(item.id); }}
                    className="mt-3 text-[10px] font-mono uppercase tracking-wider px-3 py-1 border rounded hover:bg-slate-700 transition-colors"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    Open Deep File &rarr;
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {item.easterEgg && (
          <button
            onClick={(e) => { e.stopPropagation(); onKaterraClick(); }}
            className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-600 hover:text-amber-400 transition-colors px-1.5 py-0.5 border border-slate-700 rounded hover:border-amber-400"
          >
            {item.easterEgg}
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default function CareerDossier({ onKaterraClick }) {
  const scrollRef = useRef(null);
  const { selectedClass, getAccentColor } = useApp();
  const accentColor = getAccentColor(1);
  const subtitle = selectedClass === 'renaissance'
    ? RENAISSANCE_SUBTITLES.career
    : DEFAULT_SUBTITLES.career;
  const [deepDive, setDeepDive] = useState(null);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-16"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
            CAREER TRAJECTORY
          </h2>
          <p className="text-center font-mono text-sm mb-10" style={{ color: accentColor }}>
            {subtitle}
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 px-4 md:px-8 pb-4 snap-x snap-mandatory"
          style={{ scrollbarColor: '#2a3040 #0f1219' }}
        >
          <div className="min-w-[20px] shrink-0" />
          {CAREER_TIMELINE.map((item) => (
            <TimelineCard
              key={item.id}
              item={item}
              accentColor={accentColor}
              onKaterraClick={onKaterraClick}
              onDeepDive={setDeepDive}
            />
          ))}
          <div className="min-w-[20px] shrink-0" />
        </div>

        <div className="text-center mt-4">
          <span className="text-slate-600 text-xs font-mono">&larr; scroll &rarr;</span>
        </div>
      </motion.section>

      <AnimatePresence>
        {deepDive === 'katerra' && <KaterraDeepDive onClose={() => setDeepDive(null)} />}
        {deepDive === 'kova' && <KovaDeepDive onClose={() => setDeepDive(null)} />}
      </AnimatePresence>
    </>
  );
}
