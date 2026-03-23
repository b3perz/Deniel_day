import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CREW_CARDS } from '../data/constants';
import { CREW_EXPANDED } from '../data/expansion';
import { useApp } from '../contexts/AppContext';

// ---------------------------------------------------------------------------
// CrewProfile -- full-screen modal (kept intact)
// ---------------------------------------------------------------------------
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-black/95 overflow-y-auto p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-white font-mono text-sm mb-6 block"
        >
          &larr; Back to Crew
        </button>

        <div className="mb-8">
          <div className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-1">
            {member.title}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
          <p className="text-slate-400 text-sm italic">{member.ability}</p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-5">
            <h3 className="text-slate-500 font-mono text-[10px] uppercase tracking-wider mb-2">
              Standard Briefing
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">{member.briefing}</p>
          </div>

          {sections.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800 border border-slate-700 rounded-lg p-5"
            >
              <h3 className="text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                {s.label}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CrewCard -- expandable card with hover lift + stagger
// ---------------------------------------------------------------------------
function CrewCard({ member, accentColor, index, onOpenProfile, variant = 'default' }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { playHoverTick } = useApp();

  const isHero = variant === 'hero';

  // Stagger delay: each card enters 0.1s after the previous
  const staggerDelay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: staggerDelay, ease: 'easeOut' }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => { setHovered(true); playHoverTick(); }}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }}
      className={[
        'relative overflow-hidden cursor-pointer rounded-lg transition-colors duration-200',
        isHero
          ? 'bg-slate-800/90 border-2 border-teal-500/70 p-8'
          : 'bg-slate-800 border border-slate-700 hover:border-slate-500 p-5',
      ].join(' ')}
    >
      {/* Accent top-bar for hero */}
      {isHero && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500" />
      )}

      {/* Title area -- always visible */}
      <div className={isHero ? 'mb-4' : 'mb-3'}>
        <div
          className={[
            'font-mono uppercase tracking-wider mb-1',
            isHero ? 'text-sm' : 'text-xs',
          ].join(' ')}
          style={{ color: isHero ? '#2dd4bf' : accentColor }}
        >
          {member.title}
        </div>

        <h4
          className={[
            'font-bold text-white',
            isHero ? 'text-3xl md:text-4xl' : 'text-lg',
          ].join(' ')}
        >
          {member.name}
        </h4>
      </div>

      {/* Ability -- always visible on hero, hover/expand on others */}
      {isHero ? (
        <p className="text-teal-300/90 italic text-base mb-2 leading-relaxed">
          {member.ability}
        </p>
      ) : (
        <AnimatePresence>
          {(hovered || expanded) && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="text-xs italic mb-3"
              style={{ color: accentColor }}
            >
              {member.ability}
            </motion.p>
          )}
        </AnimatePresence>
      )}

      {/* Hero: briefing always visible */}
      {isHero && (
        <p className="text-slate-300 text-sm leading-relaxed mt-3 mb-4">
          {member.briefing}
        </p>
      )}

      {/* Hero: Full Profile button always shown */}
      {isHero && CREW_EXPANDED[member.name] && (
        <button
          onClick={(e) => { e.stopPropagation(); onOpenProfile(member); }}
          className="text-xs font-mono uppercase tracking-wider px-4 py-2 border-2 border-teal-500/60 text-teal-400 rounded hover:bg-teal-500/10 transition-colors"
        >
          Full Profile &rarr;
        </button>
      )}

      {/* Non-hero: expandable section */}
      {!isHero && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-slate-700">
                <p className="text-slate-300 text-xs leading-relaxed mb-3">
                  {member.briefing}
                </p>
                {CREW_EXPANDED[member.name] && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenProfile(member); }}
                    className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 border rounded hover:bg-slate-700 transition-colors"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    Full Profile &rarr;
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TheCrew -- editorial staggered layout
// ---------------------------------------------------------------------------
export default function TheCrew() {
  const { getAccentColor } = useApp();
  const accentColor = getAccentColor(3);
  const [profileMember, setProfileMember] = useState(null);

  // Resolve members by name for explicit layout control
  const ben     = CREW_CARDS.find((m) => m.name === 'Ben Epp');
  const gerald  = CREW_CARDS.find((m) => m.name === 'Gerald Epp');
  const leif    = CREW_CARDS.find((m) => m.name === 'Leif Johnson');
  const scott   = CREW_CARDS.find((m) => m.name === 'Scott Crawford');
  const lucas   = CREW_CARDS.find((m) => m.name === 'Lucas Epp');
  const dina    = CREW_CARDS.find((m) => m.name === 'Dina Yousif');

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="py-16 px-4 md:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">
            PERSONNEL BRIEFING
          </h2>
          <p
            className="text-center font-mono text-sm mb-12"
            style={{ color: accentColor }}
          >
            Know your team. Do not bring Gerald a problem without a solution.
          </p>

          {/* ---- Row 1: Gerald + Leif -- 2-col, large ---- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {gerald && (
              <CrewCard
                member={gerald}
                accentColor={accentColor}
                index={0}
                onOpenProfile={setProfileMember}
              />
            )}
            {leif && (
              <CrewCard
                member={leif}
                accentColor={accentColor}
                index={1}
                onOpenProfile={setProfileMember}
              />
            )}
          </div>

          {/* ---- Row 2: Scott + Lucas -- 2-col ---- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {scott && (
              <CrewCard
                member={scott}
                accentColor={accentColor}
                index={2}
                onOpenProfile={setProfileMember}
              />
            )}
            {lucas && (
              <CrewCard
                member={lucas}
                accentColor={accentColor}
                index={3}
                onOpenProfile={setProfileMember}
              />
            )}
          </div>

          {/* ---- Row 3: Ben + Dina -- 2-col ---- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {ben && (
              <CrewCard
                member={ben}
                accentColor={accentColor}
                index={4}
                onOpenProfile={setProfileMember}
              />
            )}
            {dina && (
              <CrewCard
                member={dina}
                accentColor={accentColor}
                index={5}
                onOpenProfile={setProfileMember}
              />
            )}
          </div>
        </div>
      </motion.section>

      {/* Profile modal */}
      <AnimatePresence>
        {profileMember && (
          <CrewProfile
            member={profileMember}
            onClose={() => setProfileMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
