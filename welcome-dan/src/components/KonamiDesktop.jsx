import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonamiCode() {
  const [active, setActive] = useState(false);
  const seqRef = useRef([]);

  useEffect(() => {
    const handler = (e) => {
      if (active) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const next = [...seqRef.current, key].slice(-10);
      seqRef.current = next;
      if (next.length === 10 && next.every((k, i) => k === KONAMI[i])) {
        setActive(true);
        seqRef.current = [];
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  return { konamiActive: active, setKonamiActive: setActive };
}

const DESKTOP_ICONS = [
  {
    id: 'recycle',
    label: 'Katerra Stock\nCertificates',
    icon: '\uD83D\uDDD1\uFE0F',
    content: 'This bin has been emptied.',
  },
  {
    id: 'proposal',
    label: 'proposal_final_FINAL\n_v3_REVISED.indd',
    icon: '\uD83D\uDCC4',
    content: 'This file has 47 artboards. 12 of them are blank. 3 contain content from a different project. Welcome to InDesign archaeology.',
  },
  {
    id: 'pdrive',
    label: 'P_Drive_Shortcut',
    icon: '\uD83D\uDCC1',
    content: 'Connecting to VPN... Connecting... Connecting... Connection timed out. Try again in 15 minutes. Or ask Scott.',
  },
  {
    id: 'readme',
    label: 'README_for_Dan.txt',
    icon: '\uD83D\uDCDD',
    content: 'If you\'re reading this, you found the secret desktop. There\'s nothing actually useful here. But we appreciate your thoroughness. That\'s exactly the kind of energy we need. Now close this and go explore the rest of the site. \u2014 The BD Team',
  },
  {
    id: 'mystery',
    label: 'mystery_folder',
    icon: '\uD83D\uDCC2',
    content: null,
    subfolder: {
      label: 'dan_welcome_website\n_planning_notes.md',
      icon: '\uD83D\uDD12',
      content: 'ACCESS DENIED. Nice try. Some things are classified even from you.',
    },
  },
];

export function KonamiDesktop({ active, onClose }) {
  const [openWindow, setOpenWindow] = useState(null);
  const [inSubfolder, setInSubfolder] = useState(false);

  useEffect(() => {
    if (!active) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active, onClose]);

  if (!active) return null;

  const handleIconClick = (icon) => {
    if (icon.id === 'mystery' && !inSubfolder) {
      setInSubfolder(true);
      setOpenWindow(null);
    } else if (icon.subfolder && inSubfolder) {
      setOpenWindow({ title: icon.subfolder.label.replace('\n', ''), content: icon.subfolder.content });
    } else {
      setOpenWindow({ title: icon.label.replace('\n', ''), content: icon.content });
      setInSubfolder(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ backgroundColor: '#0a0e17' }}
    >
      {/* Taskbar */}
      <div className="flex items-center justify-between px-4 h-8 bg-slate-900 border-b border-slate-700 shrink-0">
        <span className="text-[10px] font-mono text-teal-400">STRUCTURECRAFT OS v1.0</span>
        <button onClick={() => { onClose(); setOpenWindow(null); setInSubfolder(false); }}
          className="text-slate-400 hover:text-white text-xs font-mono px-2">[X] EXIT</button>
      </div>

      {/* Desktop */}
      <div className="flex-1 p-6 relative">
        {/* Icons */}
        <div className="flex flex-wrap gap-6">
          {!inSubfolder ? DESKTOP_ICONS.map((icon) => (
            <button key={icon.id} onClick={() => handleIconClick(icon)}
              className="flex flex-col items-center gap-1 w-20 text-center hover:bg-white/5 p-2 rounded transition-colors group">
              <span className="text-3xl group-hover:scale-110 transition-transform">{icon.icon}</span>
              <span className="text-[9px] text-slate-400 leading-tight whitespace-pre-line">{icon.label}</span>
            </button>
          )) : (
            <>
              <button onClick={() => setInSubfolder(false)}
                className="flex flex-col items-center gap-1 w-20 text-center hover:bg-white/5 p-2 rounded transition-colors">
                <span className="text-3xl">\u2B05\uFE0F</span>
                <span className="text-[9px] text-slate-400">.. (back)</span>
              </button>
              <button onClick={() => handleIconClick({ subfolder: DESKTOP_ICONS[4].subfolder })}
                className="flex flex-col items-center gap-1 w-20 text-center hover:bg-white/5 p-2 rounded transition-colors group">
                <span className="text-3xl group-hover:scale-110 transition-transform">{DESKTOP_ICONS[4].subfolder.icon}</span>
                <span className="text-[9px] text-slate-400 leading-tight whitespace-pre-line">{DESKTOP_ICONS[4].subfolder.label}</span>
              </button>
            </>
          )}
        </div>

        {/* Open window */}
        <AnimatePresence>
          {openWindow && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-slate-900 border border-slate-600 rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-b border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 truncate">{openWindow.title}</span>
                <button onClick={() => setOpenWindow(null)} className="text-slate-500 hover:text-white text-xs ml-2">&times;</button>
              </div>
              <div className="p-4">
                <p className="text-slate-300 text-sm leading-relaxed font-mono">{openWindow.content}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop hint */}
      <div className="absolute bottom-10 right-6 text-[9px] text-slate-700 font-mono">
        Press Escape to exit
      </div>
    </motion.div>
  );
}
