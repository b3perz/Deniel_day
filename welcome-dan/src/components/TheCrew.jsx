import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREW_CARDS, RENAISSANCE_SUBTITLES, DEFAULT_SUBTITLES } from '../data/constants';
import { CREW_EXPANDED } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

function CrewProfile({ member, onClose }) {
  const expanded = CREW_EXPANDED[member.name];
  if (!expanded) return null;

  const sections = Object.entries(expanded).map(([key, value]) => {
    const labels = {
      communication: 'Communication Style',
      cares: 'What He Cares About',
      approval: 'How to Get His Approval',
      funFact: 'Fun Fact',
      workingOn: 'What He\'s Working On',
      howToWork: 'How to Work With Him',
      seattleAlly: 'Seattle Ally',
      visualStandard: 'The Visual Standard',
      impresses: 'What Impresses Him',
      interviewTechnique: 'The Interview Technique',
      linkedinVoice: 'LinkedIn Voice',
      herScope: 'Her Scope',
      yourScope: 'Your Scope',
      overlap: 'The Overlap',
    };
    return { label: labels[key] || key, text: value };
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="max-w-2xl mx-auto">
        <button onClick={onClose} className="text-slate-500 hover:text-white font-mono text-sm mb-6 block">&larr; Back to Crew</button>

        <div className="mb-8">
          <div className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-1">{member.title}</div>
          <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
          <p className="text-slate-400 text-sm italic">{member.ability}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
            <h3 className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-2">Standard Briefing</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{member.briefing}</p>
          </div>

          {sections.map((s) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-5">
              <h3 className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">{s.label}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CrewCard({ member, accentColor, showOctopus, onOpenProfile }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick } = useApp();

  return (
    <motion.div
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => { setHovered(true); playHoverTick(); }}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      className="bg-slate-800 border border-slate-700 rounded-lg p-5 cursor-pointer transition-colors duration-200 hover:border-slate-500 min-w-[220px] flex-1 relative overflow-hidden"
    >
      <div className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: accentColor }}>{member.title}</div>
      <h4 className="text-white font-semibold text-lg mb-3">{member.name}</h4>

      <AnimatePresence>
        {(hovered || expanded) && (
          <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
            className="text-xs italic mb-3" style={{ color: accentColor }}>
            {member.ability}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="pt-3 border-t border-slate-700">
              <p className="text-slate-300 text-xs leading-relaxed mb-3">{member.briefing}</p>
              {CREW_EXPANDED[member.name] && (
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenProfile(member); }}
                  className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 border rounded hover:bg-slate-700 transition-colors"
                  style={{ borderColor: accentColor, color: accentColor }}>
                  Full Profile &rarr;
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showOctopus && (
        <svg className="absolute -bottom-1 -right-1 w-6 h-6 text-teal-400/20" viewBox="0 0 32 32" fill="currentColor">
          <path d="M28 28c-2-3-1-8-4-10s-6 1-8-2c-2-2 1-6-1-9s-6-4-9-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      )}
    </motion.div>
  );
}

export default function TheCrew() {
  const { selectedClass, getAccentColor } = useApp();
  const accentColor = getAccentColor(3);
  const subtitle = selectedClass === 'renaissance' ? RENAISSANCE_SUBTITLES.crew : DEFAULT_SUBTITLES.crew;
  const [profileMember, setProfileMember] = useState(null);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-16 px-4 md:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">PERSONNEL BRIEFING</h2>
          <p className="text-center font-mono text-sm mb-10" style={{ color: accentColor }}>{subtitle}</p>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {CREW_CARDS.map((member) => (
              <CrewCard key={member.name} member={member} accentColor={accentColor}
                showOctopus={selectedClass === 'octopus'} onOpenProfile={setProfileMember} />
            ))}
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {profileMember && <CrewProfile member={profileMember} onClose={() => setProfileMember(null)} />}
      </AnimatePresence>
    </>
  );
}
