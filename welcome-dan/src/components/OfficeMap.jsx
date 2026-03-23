import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ZONES = [
  { id: 'dan', x: 45, y: 55, w: 12, h: 10, label: "Dan's Desk", color: '#2dd4bf',
    desc: "Your new home base. Close enough to Leif to ask questions. Close enough to Scott to feel his gaze on your layouts." },
  { id: 'leif', x: 30, y: 45, w: 14, h: 12, label: "Leif's Office", color: '#3b82f6',
    desc: "THE OPERATOR's lair. Door is usually open. Knock anyway." },
  { id: 'scott', x: 60, y: 40, w: 14, h: 12, label: "Scott's Area", color: '#a855f7',
    desc: "Approach with clean layouts. Leave with better ones." },
  { id: 'kitchen', x: 75, y: 20, w: 18, h: 15, label: 'Kitchen', color: '#f59e0b',
    desc: "Where proposals are discussed over coffee. Also where you'll learn who actually reads the RFPs (everyone) and who just reads the executive summary (also everyone, but they won't admit it)." },
  { id: 'conf', x: 10, y: 20, w: 20, h: 18, label: 'Conference Room', color: '#22c55e',
    desc: "Shortlist presentations are rehearsed here. You will stand in this room and present SC's work to architects who designed buildings you've walked through. Prepare accordingly." },
  { id: 'printer', x: 48, y: 25, w: 10, h: 8, label: 'The Printer', color: '#ef4444',
    desc: "You will develop a relationship with this machine. It will not be a good relationship. Hard copy submissions require hard copies. Hard copies require the printer to cooperate." },
  { id: 'window', x: 5, y: 70, w: 90, h: 8, label: 'Windows \u2192 Puget Sound', color: '#64748b',
    desc: "On a clear day you can see the Olympic Mountains across Puget Sound. On a deadline day you won't look up from InDesign long enough to notice." },
];

export default function OfficeMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h3 className="text-lg font-semibold text-white uppercase tracking-widest mb-2 text-center">Seattle Office</h3>
      <p className="text-center text-slate-500 text-xs font-mono mb-6">Click a zone to inspect</p>

      <div className="relative bg-slate-900 border border-slate-700 rounded-lg overflow-hidden" style={{ aspectRatio: '16/10' }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#1e293b" strokeWidth="0.3" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#1e293b" strokeWidth="0.3" />
          ))}
        </svg>

        {/* Zones */}
        {ZONES.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelected(selected?.id === zone.id ? null : zone)}
            className="absolute transition-all duration-200 hover:scale-105 group"
            style={{
              left: `${zone.x}%`, top: `${zone.y}%`,
              width: `${zone.w}%`, height: `${zone.h}%`,
            }}
          >
            <div className="w-full h-full rounded border-2 flex items-center justify-center"
              style={{
                borderColor: zone.color + '60',
                backgroundColor: zone.color + '10',
                boxShadow: `0 0 15px ${zone.color}20`,
              }}>
              <span className="text-[7px] md:text-[9px] font-mono leading-tight text-center px-1" style={{ color: zone.color }}>
                {zone.label}
              </span>
            </div>
            {/* Pulse dot */}
            <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: zone.color }} />
          </button>
        ))}
      </div>

      {/* Selected zone popup */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-slate-800 border rounded-lg"
            style={{ borderColor: selected.color + '40' }}
          >
            <h4 className="font-semibold text-sm mb-2" style={{ color: selected.color }}>{selected.label}</h4>
            <p className="text-slate-300 text-xs leading-relaxed">{selected.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
