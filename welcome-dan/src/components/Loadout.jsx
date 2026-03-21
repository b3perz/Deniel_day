import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADOUT_CARDS, RENAISSANCE_SUBTITLES, DEFAULT_SUBTITLES } from '../data/constants';
import { PDRIVE_GAME, NOTION_PAGES, TOOLKIT_COMPARISON } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

function StatBar({ label, value, accentColor, visible }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-slate-400 w-44 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: visible ? `${value * 10}%` : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      <span className="text-slate-500 font-mono w-8 text-right">{value}/10</span>
    </div>
  );
}

function PDriveSearch() {
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setResult(null);
    setTimeout(() => {
      setSearching(false);
      setResult('0 results found. Try asking Scott.');
    }, 8000);
  };

  return (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search P: Drive..." disabled={searching}
          className="flex-1 bg-slate-900 border border-slate-600 rounded px-3 py-1.5 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-teal-400" />
        <button type="submit" disabled={searching}
          className="px-3 py-1.5 bg-slate-700 text-slate-300 text-xs font-mono rounded hover:bg-slate-600 transition-colors disabled:opacity-50">Search</button>
      </form>
      {searching && (
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 font-mono">
          <div className="w-3 h-3 border-2 border-slate-500 border-t-teal-400 rounded-full animate-spin" />Searching...
        </div>
      )}
      {result && (
        <div className="mt-2 text-xs text-red-400 font-mono">
          {result}
          <button onClick={() => { setQuery(''); setResult(null); }} className="ml-2 text-slate-500 hover:text-slate-300 underline">Reset</button>
        </div>
      )}
    </div>
  );
}

// ==================== P: DRIVE GAME ====================
function PDriveGame({ onClose }) {
  const [path, setPath] = useState(['Projects']);
  const [clicks, setClicks] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [wrongMsg, setWrongMsg] = useState(null);
  const { unlock } = useApp();

  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => setElapsed(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  useEffect(() => {
    if ((elapsed >= 60 || clicks >= 10) && !gameOver) {
      setGameOver(true);
      unlock('pdrive-game');
    }
  }, [elapsed, clicks, gameOver, unlock]);

  const files = PDRIVE_GAME.folders.Projects['2019'].T3_Minneapolis.Photos.Site;
  const currentLevel = path.length;
  const folderTree = {
    1: ['2019', '2020', '2021', '2022', '2023', '2024'],
    2: ['T3_Minneapolis', 'Bloomberg_Center', 'Assembly_Atlanta', 'Apple_Raleigh'],
    3: ['Photos', 'Drawings', 'Correspondence', 'Submittals'],
    4: ['Site', 'Aerial', 'Detail', 'Progress', 'Marketing'],
  };

  const handleFolderClick = (folder) => {
    if (currentLevel === 5) return;
    setPath([...path, folder]);
  };

  const handleFileClick = () => {
    const c = clicks + 1;
    setClicks(c);
    setWrongMsg(PDRIVE_GAME.wrongMessages[Math.floor(Math.random() * PDRIVE_GAME.wrongMessages.length)]);
    setTimeout(() => setWrongMsg(null), 2500);
  };

  const goUp = () => {
    if (path.length > 1) setPath(path.slice(0, -1));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="max-w-2xl mx-auto">
        <button onClick={onClose} className="text-slate-500 hover:text-white font-mono text-sm mb-4 block">&larr; Back to Arsenal</button>

        <h2 className="text-xl font-bold text-white mb-2">P: DRIVE EXPEDITION</h2>
        <p className="text-amber-400 text-xs font-mono mb-4">{PDRIVE_GAME.target}</p>

        <div className="flex gap-4 mb-4 text-xs font-mono">
          <span className="text-slate-400">Time: <span className={elapsed >= 50 ? 'text-red-400' : 'text-white'}>{elapsed}s</span></span>
          <span className="text-slate-400">Clicks: <span className={clicks >= 8 ? 'text-red-400' : 'text-white'}>{clicks}/10</span></span>
        </div>

        {!gameOver ? (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 mb-3 flex-wrap">
              {path.map((p, i) => (
                <span key={i}>{i > 0 && ' > '}{p}</span>
              ))}
            </div>

            {path.length > 1 && (
              <button onClick={goUp} className="text-teal-400 text-xs font-mono mb-2 hover:underline">&larr; ..</button>
            )}

            <div className="max-h-60 overflow-y-auto space-y-0.5">
              {currentLevel <= 4 ? (
                (folderTree[currentLevel] || []).map((f) => (
                  <button key={f} onClick={() => handleFolderClick(f)}
                    className="w-full text-left px-2 py-1 text-xs font-mono text-slate-300 hover:bg-slate-800 rounded flex items-center gap-2">
                    <span className="text-amber-400">&#128193;</span> {f}
                  </button>
                ))
              ) : (
                files.slice(0, 30).map((f) => (
                  <button key={f} onClick={handleFileClick}
                    className="w-full text-left px-2 py-1 text-xs font-mono text-slate-400 hover:bg-slate-800 rounded flex items-center gap-2">
                    <span className="text-slate-600">&#128444;&#65039;</span> {f}
                  </button>
                ))
              )}
            </div>

            <AnimatePresence>
              {wrongMsg && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono">
                  {wrongMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-red-400 text-sm font-mono mb-4">{PDRIVE_GAME.failMessage}</p>
            <div className="bg-slate-900 rounded p-3 inline-block mb-4">
              <p className="text-teal-400 text-xs font-mono">{PDRIVE_GAME.scottMessage}</p>
              <p className="text-slate-500 text-[10px] font-mono mt-1">{PDRIVE_GAME.scottTime}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPath(['Projects']); setClicks(0); setElapsed(0); setGameOver(false); }}
                className="px-4 py-2 text-xs font-mono border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">Play Again</button>
              <button onClick={onClose}
                className="px-4 py-2 text-xs font-mono border border-slate-600 text-slate-400 rounded hover:bg-slate-700">Accept Defeat</button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ==================== NOTION SIMULATOR ====================
function NotionSimulator({ onClose }) {
  const [activePage, setActivePage] = useState('Project Sheets');
  const [selectedItem, setSelectedItem] = useState(null);
  const { unlock } = useApp();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item.lastEdited && item.lastEdited.includes('2023')) {
      unlock('notion-2023');
    }
  };

  const pages = Object.keys(NOTION_PAGES);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="max-w-4xl mx-auto">
        <button onClick={onClose} className="text-slate-500 hover:text-white font-mono text-sm mb-4 block">&larr; Back to Arsenal</button>

        <div className="flex gap-4 h-[70vh]">
          {/* Sidebar */}
          <div className="w-48 shrink-0 bg-slate-900 border border-slate-700 rounded-lg p-3 overflow-y-auto">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-3">SC Content Library</div>
            {pages.map((page) => (
              <button key={page} onClick={() => { setActivePage(page); setSelectedItem(null); }}
                className={`w-full text-left px-2 py-1.5 text-xs rounded mb-0.5 transition-colors ${
                  activePage === page ? 'bg-teal-400/10 text-teal-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}>
                {page}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-y-auto">
            <h3 className="text-white font-semibold mb-4">{activePage}</h3>

            {activePage === 'Project Sheets' && (
              <div className="space-y-1">
                {NOTION_PAGES['Project Sheets'].map((p) => (
                  <button key={p.name} onClick={() => handleItemClick(p)}
                    className={`w-full text-left px-3 py-2 rounded text-xs flex justify-between items-center ${
                      selectedItem?.name === p.name ? 'bg-slate-800 border border-slate-600' : 'hover:bg-slate-800'
                    }`}>
                    <span className="text-slate-300">{p.name}</span>
                    <span className={`font-mono text-[10px] ${
                      p.lastEdited.includes('2023') ? 'text-amber-400' : 'text-slate-500'
                    }`}>{p.lastEdited}</span>
                  </button>
                ))}
                {selectedItem && (
                  <div className="mt-3 p-3 bg-slate-800 border border-slate-700 rounded text-xs">
                    <div className="text-white font-medium mb-2">{selectedItem.name}</div>
                    <div className="text-slate-400">Status: <span className={selectedItem.status.includes('NEEDS') ? 'text-amber-400' : 'text-slate-300'}>{selectedItem.status}</span></div>
                    <div className="text-slate-500 mt-1">Last edited: {selectedItem.lastEdited}</div>
                    {selectedItem.lastEdited.includes('2023') && (
                      <div className="mt-2 text-amber-400 font-mono text-[10px]">[NEEDS UPDATE &mdash; last edited {selectedItem.lastEdited}]</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activePage === 'Resumes' && (
              <div className="space-y-1">
                {NOTION_PAGES['Resumes'].map((r) => (
                  <div key={r.name} className="px-3 py-2 hover:bg-slate-800 rounded text-xs">
                    <div className="text-slate-300">{r.name}</div>
                    {r.note && <div className="text-amber-400 font-mono text-[10px] mt-1">{r.note}</div>}
                  </div>
                ))}
              </div>
            )}

            {activePage === 'Boilerplate' && (
              <div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  {NOTION_PAGES['Boilerplate'].text}
                </p>
                <div className="mt-4 space-y-2">
                  {NOTION_PAGES['Boilerplate'].tracked.map((t, i) => (
                    <div key={i} className="text-[10px] font-mono">
                      <span className="text-red-400 line-through">{t.original}</span>
                      <span className="text-emerald-400 ml-2">{t.replacement}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-amber-400 font-mono text-[10px]">{NOTION_PAGES['Boilerplate'].note}</div>
              </div>
            )}

            {activePage === 'Pursuit Tracker' && (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-slate-500 font-mono text-[10px] uppercase border-b border-slate-700">
                      <th className="text-left p-2">Pursuit</th>
                      <th className="text-left p-2">Client</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Due</th>
                      <th className="text-left p-2">Lead</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NOTION_PAGES['Pursuit Tracker'].map((p) => (
                      <tr key={p.pursuit} className="border-b border-slate-800 hover:bg-slate-800">
                        <td className="p-2 text-slate-300">{p.pursuit}</td>
                        <td className="p-2 text-slate-400">{p.client}</td>
                        <td className={`p-2 font-mono ${p.status === '???' ? 'text-amber-400' : 'text-slate-400'}`}>{p.status}</td>
                        <td className="p-2 text-slate-500">{p.dueDate}</td>
                        <td className="p-2 text-slate-500">{p.lead}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== TOOLKIT COMPARISON ====================
function ToolkitComparison() {
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-6 text-center">
        Dan's Toolkit vs. SC's Toolkit
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs max-w-3xl mx-auto">
          <thead>
            <tr className="text-slate-500 font-mono text-[10px] uppercase border-b border-slate-700">
              <th className="text-left p-2">Tool</th>
              <th className="text-left p-2">Dan Knows</th>
              <th className="text-left p-2">SC Uses</th>
              <th className="text-left p-2">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {TOOLKIT_COMPARISON.map((row) => (
              <tr key={row.tool} className="border-b border-slate-800">
                <td className="p-2 text-white font-medium">{row.tool}</td>
                <td className="p-2">
                  <span className={row.danKnows === 'yes' ? 'text-emerald-400' : row.danKnows === 'warn' ? 'text-amber-400' : 'text-red-400'}>
                    {row.danKnows === 'yes' ? '\u2705' : row.danKnows === 'warn' ? '\u26A0\uFE0F' : '\u274C'}
                  </span>
                  <span className="text-slate-400 ml-2">{row.danLabel}</span>
                </td>
                <td className="p-2">
                  <span className={row.scUses === 'yes' ? 'text-emerald-400' : 'text-red-400'}>
                    {row.scUses === 'yes' ? '\u2705' : '\u274C'}
                  </span>
                  <span className="text-slate-400 ml-2">{row.scLabel}</span>
                </td>
                <td className="p-2 text-teal-400 font-mono text-[10px]">{row.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OctopusTentacle() {
  return (
    <svg className="absolute -bottom-1 -right-1 w-8 h-8 text-teal-400/20" viewBox="0 0 32 32" fill="currentColor">
      <path d="M28 28c-2-3-1-8-4-10s-6 1-8-2c-2-2 1-6-1-9s-6-4-9-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 30c-1-4 0-7-3-9s-5 0-7-2c-1-2 1-5-1-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function LoadoutCard({ card, accentColor, showOctopus, onOpenGame }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick } = useApp();

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => { setHovered(true); playHoverTick(); }}
      onMouseLeave={() => setHovered(false)}
      className="bg-slate-800 border border-slate-700 rounded-lg p-5 cursor-pointer hover:border-slate-500 transition-all duration-200 relative overflow-hidden"
      whileHover={{ y: -4 }}
    >
      <div className={`absolute top-3 right-3 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${card.rarityBg} ${card.rarityText}`}
        style={card.cursed ? { animation: 'glitch-flicker 2s infinite' } : card.shimmer ? {
          background: 'linear-gradient(90deg, #a855f7, #f59e0b, #a855f7)',
          backgroundSize: '200% auto', animation: 'shimmer 3s linear infinite',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        } : {}}>
        {card.rarity}
      </div>

      <h4 className="text-white font-semibold mb-1 pr-20">{card.name}</h4>
      <p className="text-slate-400 text-xs mb-4">{card.oneLiner}</p>

      <div className="space-y-2">
        {card.stats.map((stat) => (
          <StatBar key={stat.label} label={stat.label} value={stat.value}
            accentColor={accentColor} visible={hovered || expanded} />
        ))}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <p className="mt-4 pt-4 border-t border-slate-700 text-slate-300 text-xs leading-relaxed">{card.detail}</p>
            {card.hasSearch && <PDriveSearch />}
            {(card.name === 'P: Drive' || card.name === 'Notion') && (
              <button
                onClick={(e) => { e.stopPropagation(); onOpenGame(card.name); }}
                className="mt-3 text-[10px] font-mono uppercase tracking-wider px-3 py-1 border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10 transition-colors"
              >
                {card.name === 'P: Drive' ? 'Launch P: Drive Expedition' : 'Open Notion Simulator'} &rarr;
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {showOctopus && <OctopusTentacle />}
    </motion.div>
  );
}

export default function Loadout() {
  const { selectedClass, getAccentColor } = useApp();
  const accentColor = getAccentColor(2);
  const subtitle = selectedClass === 'renaissance'
    ? RENAISSANCE_SUBTITLES.loadout : DEFAULT_SUBTITLES.loadout;
  const [openGame, setOpenGame] = useState(null);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-16 px-4 md:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">YOUR ARSENAL</h2>
          <p className="text-center font-mono text-sm mb-10" style={{ color: accentColor }}>{subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOADOUT_CARDS.map((card) => (
              <LoadoutCard key={card.name} card={card} accentColor={accentColor}
                showOctopus={selectedClass === 'octopus'} onOpenGame={setOpenGame} />
            ))}
          </div>

          <ToolkitComparison />
        </div>
      </motion.section>

      <AnimatePresence>
        {openGame === 'P: Drive' && <PDriveGame onClose={() => setOpenGame(null)} />}
        {openGame === 'Notion' && <NotionSimulator onClose={() => setOpenGame(null)} />}
      </AnimatePresence>
    </>
  );
}
