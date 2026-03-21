import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DELIVERY_MODELS, PORTFOLIO_PROJECTS, BRAND_RULES, PROPOSAL_LIFECYCLE, GLOSSARY_TERMS } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

// ==================== DELIVERY MODELS ====================
function DeliveryModelsTab({ accentColor }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="space-y-4">
      {DELIVERY_MODELS.map((model) => (
        <motion.div key={model.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <button onClick={() => setExpanded(expanded === model.name ? null : model.name)}
            className="w-full text-left p-5">
            <h4 className="text-white font-semibold text-lg mb-1">{model.name}</h4>
            <p className="text-xs font-mono" style={{ color: accentColor }}>{model.note}</p>
          </button>

          <AnimatePresence>
            {expanded === model.name && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                className="overflow-hidden">
                <div className="px-5 pb-5 space-y-3 border-t border-slate-700 pt-4">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-slate-500 font-mono">Lead:</span> <span className="text-slate-300">{model.lead}</span></div>
                    <div><span className="text-slate-500 font-mono">Fee:</span> <span className="text-slate-300">{model.fee}</span></div>
                    <div><span className="text-slate-500 font-mono">Client:</span> <span className="text-slate-300">{model.client}</span></div>
                    <div><span className="text-slate-500 font-mono">Emphasis:</span> <span className="text-slate-300">{model.emphasis}</span></div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{model.detail}</p>
                  {model.projects && (
                    <div className="flex gap-3 flex-wrap">
                      {model.projects.map((p) => (
                        <div key={p.name} className="px-3 py-2 bg-slate-900 rounded border border-slate-700 text-xs">
                          <div className="text-white font-medium">{p.name}</div>
                          <div style={{ color: accentColor }} className="font-mono text-[10px]">{p.stat}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== PORTFOLIO ====================
function PortfolioTab({ accentColor }) {
  const [selected, setSelected] = useState(null);
  const [revealedFacts, setRevealedFacts] = useState({});

  const revealFact = (name) => {
    setRevealedFacts(prev => ({ ...prev, [name]: true }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {PORTFOLIO_PROJECTS.map((project) => (
        <motion.div key={project.name}
          onClick={() => setSelected(selected === project.name ? null : project.name)}
          whileHover={{ y: -3 }}
          className="bg-slate-800 border border-slate-700 rounded-lg p-4 cursor-pointer hover:border-slate-500 transition-all">
          <h4 className="text-white font-semibold text-sm mb-1">{project.name}</h4>
          <div className="text-slate-500 text-[10px] font-mono mb-2">{project.location}</div>
          <p className="text-slate-400 text-xs">{project.desc}</p>

          <AnimatePresence>
            {selected === project.name && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-3 pt-3 border-t border-slate-700 space-y-2 text-xs">
                  <p className="text-slate-300 leading-relaxed"><span className="text-slate-500 font-mono">Why it matters: </span>{project.why}</p>
                  <p style={{ color: accentColor }} className="font-mono text-[10px]">{project.proposalNote}</p>
                  {project.bonusFact && (
                    <div>
                      {revealedFacts[project.name] ? (
                        <p className="text-amber-400 text-[10px] leading-relaxed">{project.bonusFact}</p>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); revealFact(project.name); }}
                          className="text-[10px] font-mono text-slate-600 hover:text-amber-400 transition-colors underline">
                          [Reveal hidden fact]
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== BRAND RULES ====================
function BrandTab({ accentColor }) {
  return (
    <div className="max-w-2xl mx-auto space-y-3">
      {BRAND_RULES.map((rule, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex gap-3 items-start p-3 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs font-mono shrink-0 w-6 text-center" style={{ color: accentColor }}>{String(i + 1).padStart(2, '0')}</span>
          <p className="text-slate-300 text-sm leading-relaxed">{rule}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ==================== PROPOSAL LIFECYCLE ====================
function LifecycleTab({ accentColor }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-700" />

        <div className="space-y-2">
          {PROPOSAL_LIFECYCLE.map((step) => (
            <motion.div key={step.step}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}>
              <button onClick={() => setExpanded(expanded === step.step ? null : step.step)}
                className="w-full text-left flex items-start gap-4 p-3 hover:bg-slate-800/50 rounded-lg transition-colors relative">
                <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold shrink-0 z-10 bg-slate-900"
                  style={{ borderColor: accentColor, color: accentColor }}>
                  {step.step}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{step.title}</div>
                  <div className="text-slate-500 text-[10px] font-mono">{step.time}</div>
                </div>
              </button>

              <AnimatePresence>
                {expanded === step.step && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="ml-12 p-4 bg-slate-800 border border-slate-700 rounded-lg mb-2 space-y-2 text-xs">
                      <p className="text-slate-300 leading-relaxed">{step.detail}</p>
                      <div className="flex gap-4 text-[10px] font-mono">
                        <span className="text-slate-500">Who: <span className="text-slate-300">{step.who}</span></span>
                      </div>
                      <div className="p-2 bg-red-500/5 border border-red-500/20 rounded text-red-400 text-[10px] font-mono">
                        Pitfall: {step.pitfall}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== GLOSSARY ====================
function GlossaryTab({ accentColor }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', ...new Set(GLOSSARY_TERMS.map(t => t.category))];

  const filtered = GLOSSARY_TERMS.filter(t => {
    const matchSearch = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || t.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search glossary..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:border-teal-400 font-mono" />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2 text-xs text-slate-300 font-mono focus:outline-none focus:border-teal-400">
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-1">
        {filtered.map((term) => (
          <div key={term.term} className="flex gap-4 p-3 hover:bg-slate-800/50 rounded-lg transition-colors border-b border-slate-800/50">
            <div className="w-48 shrink-0">
              <span className="text-white font-medium text-sm">{term.term}</span>
              <span className="block text-[9px] font-mono mt-0.5" style={{ color: accentColor }}>{term.category}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">{term.definition}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-slate-500 text-sm text-center py-8 font-mono">No matches found.</p>
        )}
      </div>
    </div>
  );
}

// ==================== MAIN INTEL SECTION ====================
const TABS = [
  { id: 'models', label: 'Delivery Models' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'brand', label: 'Brand Identity' },
  { id: 'lifecycle', label: 'Proposal Lifecycle' },
  { id: 'glossary', label: 'Glossary' },
];

export default function Intel() {
  const [activeTab, setActiveTab] = useState('models');
  const { getAccentColor } = useApp();
  const accentColor = getAccentColor(1);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">INTELLIGENCE BRIEFING</h2>
        <p className="text-center font-mono text-sm text-teal-400 mb-10">Classified reference materials. 70% useful, 30% entertaining.</p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-[11px] font-mono rounded transition-all ${
                activeTab === tab.id ? 'text-white bg-teal-400/10 border-b-2 border-teal-400' : 'text-slate-500 hover:text-slate-300'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            {activeTab === 'models' && <DeliveryModelsTab accentColor={accentColor} />}
            {activeTab === 'portfolio' && <PortfolioTab accentColor={accentColor} />}
            {activeTab === 'brand' && <BrandTab accentColor={accentColor} />}
            {activeTab === 'lifecycle' && <LifecycleTab accentColor={accentColor} />}
            {activeTab === 'glossary' && <GlossaryTab accentColor={accentColor} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
