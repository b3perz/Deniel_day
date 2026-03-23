import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HAZARD_CARDS, QUIZ_QUESTIONS, QUIZ_RESULTS,
  RFP_PAGE_LIMITS, RFP_REQUIREMENTS, RFP_DEADLINES,
  BINGO_GRID, RENAISSANCE_SUBTITLES, DEFAULT_SUBTITLES,
} from '../data/constants';
import { useApp } from '../contexts/AppContext';
import { DeadlineDash, ExpandedQuiz, NameThatProject, ProposalMadLibs } from './MiniGames';

// ==================== HAZARDS TAB ====================
function HazardCard({ hazard, accentColor }) {
  const [flipped, setFlipped] = useState(false);
  const { playHoverTick, unlock } = useApp();
  const [massTimbered, setMassTimbered] = useState(false);

  return (
    <div
      className="perspective cursor-pointer"
      style={{ minHeight: '200px' }}
      onClick={() => { setFlipped(!flipped); playHoverTick(); }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        className="preserve-3d relative w-full h-full"
        style={{ minHeight: '200px' }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 bg-slate-800 border border-slate-700 rounded-lg p-5 flex flex-col justify-center">
          <div className="text-2xl mb-3 text-center">&#9888;&#65039;</div>
          <h4 className="text-white font-semibold text-sm text-center mb-2">{hazard.title}</h4>
          <p className="text-slate-400 text-xs text-center">{hazard.front}</p>
        </div>

        {/* Back */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 border rounded-lg p-5 flex flex-col justify-center" style={{ backgroundColor: '#1e293b', borderColor: accentColor + '40' }}>
          <h4 className="font-semibold text-sm text-center mb-3" style={{ color: accentColor }}>
            Survival Strategy
          </h4>
          <p className="text-slate-300 text-xs text-center leading-relaxed">
            {hazard.hasMassTimberEasterEgg ? (
              <>
                SC is a{' '}
                <span
                  onMouseEnter={() => { setMassTimbered(true); unlock('mass-timber'); }}
                  onMouseLeave={() => setMassTimbered(false)}
                  className="relative inline"
                >
                  <span className={`transition-all duration-300 ${massTimbered ? 'line-through text-red-400' : ''}`}>
                    structural engineering and engineer-build
                  </span>
                </span>
                {' '}firm. Gerald chose "Structure" not "Timber." Override your Katerra wiring.
                {massTimbered && (
                  <span className="text-teal-400 ml-1 animate-pulse">
                    structural engineering and engineer-build
                  </span>
                )}
              </>
            ) : hazard.back}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function HazardsTab({ accentColor }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {HAZARD_CARDS.map((hazard) => (
        <HazardCard key={hazard.title} hazard={hazard} accentColor={accentColor} />
      ))}
    </div>
  );
}

// ==================== QUIZ TAB ====================
function QuizTab({ accentColor }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const { playChime, playBuzz, unlock } = useApp();

  const handleAnswer = (idx) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const correct = idx === QUIZ_QUESTIONS[currentQ].correct;
    if (correct) {
      setScore(s => s + 1);
      playChime();
    } else {
      playBuzz();
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
    }
  };

  useEffect(() => {
    if (finished && score === QUIZ_QUESTIONS.length) {
      unlock('quiz-perfect');
    }
  }, [finished, score, unlock]);

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="text-6xl font-bold text-white mb-4">{score}/{QUIZ_QUESTIONS.length}</div>
        <p className="text-lg" style={{ color: accentColor }}>
          {QUIZ_RESULTS[score]}
        </p>
        <button
          onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setShowFeedback(false); setFinished(false); }}
          className="mt-6 px-6 py-2 font-mono text-sm border rounded hover:bg-slate-700 transition-colors"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          Retry
        </button>
      </motion.div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQ];
  const isCorrect = selected === q.correct;

  return (
    <motion.div
      key={currentQ}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-xl mx-auto"
    >
      <div className="text-xs font-mono text-slate-500 mb-4">
        Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
      </div>
      <p className="text-white text-sm leading-relaxed mb-6">{q.question}</p>

      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <button
            key={opt}
            onClick={() => handleAnswer(idx)}
            disabled={showFeedback}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-all duration-200 ${
              showFeedback && idx === q.correct
                ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
                : showFeedback && idx === selected && idx !== q.correct
                  ? 'border-red-400 bg-red-400/10 text-red-400'
                  : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <p className={`text-sm mb-4 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
            {isCorrect ? q.rightFeedback : q.wrongFeedback}
          </p>
          <button
            onClick={nextQuestion}
            className="px-6 py-2 font-mono text-sm border rounded hover:bg-slate-700 transition-colors"
            style={{ borderColor: accentColor, color: accentColor }}
          >
            {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next' : 'See Results'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================== RFP GENERATOR TAB ====================
function RFPColumn({ items, spinning, result }) {
  const itemHeight = 96; // h-24 = 96px
  const totalHeight = items.length * itemHeight;

  return (
    <div className="flex-1 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden relative" style={{ height: itemHeight }}>
      {spinning ? (
        <div
          className="absolute inset-x-0"
          style={{
            animation: `rfp-spin 0.8s linear infinite`,
          }}
        >
          <style>{`@keyframes rfp-spin { 0% { transform: translateY(0); } 100% { transform: translateY(-${totalHeight}px); } }`}</style>
          {[...items, ...items].map((item, i) => (
            <div key={i} className="flex items-center justify-center px-3 text-xs text-slate-300 text-center" style={{ height: itemHeight }}>
              {item}
            </div>
          ))}
        </div>
      ) : result !== null ? (
        <motion.div
          key={`result-${result}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="h-full flex items-center justify-center px-3 text-xs text-white text-center font-medium"
        >
          {items[result]}
        </motion.div>
      ) : (
        <div className="h-full flex items-center justify-center px-3 text-xs text-slate-600 text-center font-mono">
          ???
        </div>
      )}
    </div>
  );
}

function RFPGeneratorTab({ accentColor }) {
  const [spinning, setSpinning] = useState([false, false, false]);
  const [results, setResults] = useState([null, null, null]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const { playThunk, trackRfp } = useApp();

  const generate = () => {
    setSpinning([true, true, true]);
    setResults([null, null, null]);
    setHasGenerated(true);
    trackRfp();

    const r0 = Math.floor(Math.random() * RFP_PAGE_LIMITS.length);
    const r1 = Math.floor(Math.random() * RFP_REQUIREMENTS.length);
    const r2 = Math.floor(Math.random() * RFP_DEADLINES.length);

    setTimeout(() => {
      setSpinning(s => [false, s[1], s[2]]);
      setResults(r => [r0, r[1], r[2]]);
      playThunk();
    }, 1000);

    setTimeout(() => {
      setSpinning(s => [s[0], false, s[2]]);
      setResults(r => [r[0], r1, r[2]]);
      playThunk();
    }, 1500);

    setTimeout(() => {
      setSpinning([false, false, false]);
      setResults([r0, r1, r2]);
      playThunk();
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex gap-3 mb-6">
        <RFPColumn items={RFP_PAGE_LIMITS} spinning={spinning[0]} result={results[0]} />
        <RFPColumn items={RFP_REQUIREMENTS} spinning={spinning[1]} result={results[1]} />
        <RFPColumn items={RFP_DEADLINES} spinning={spinning[2]} result={results[2]} />
      </div>

      <div className="text-center">
        <button
          onClick={generate}
          disabled={spinning.some(Boolean)}
          className="px-8 py-3 font-mono text-sm uppercase tracking-wider border-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
          style={{ borderColor: accentColor, color: accentColor }}
        >
          {hasGenerated ? 'Generate Another' : 'Generate RFP'}
        </button>
      </div>

      {hasGenerated && !spinning.some(Boolean) && results.every(r => r !== null) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs text-slate-500 mt-4 font-mono"
        >
          This is not a joke. You will encounter all of these.
        </motion.p>
      )}
    </div>
  );
}

// ==================== BINGO TAB ====================
function BingoTab({ accentColor }) {
  const FREE_CELLS = [[0, 2], [2, 2]]; // "FREE:" prefix cells
  const [marked, setMarked] = useState(() => {
    const init = Array(5).fill(null).map(() => Array(5).fill(false));
    init[0][2] = true;
    init[2][2] = true;
    return init;
  });
  const [hasBingo, setHasBingo] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);
  const { playChime, unlock } = useApp();

  const checkBingo = useCallback((grid) => {
    // Check rows
    for (let r = 0; r < 5; r++) {
      if (grid[r].every(Boolean)) return true;
    }
    // Check columns
    for (let c = 0; c < 5; c++) {
      if (grid.every(row => row[c])) return true;
    }
    // Check diagonals
    if ([0,1,2,3,4].every(i => grid[i][i])) return true;
    if ([0,1,2,3,4].every(i => grid[i][4-i])) return true;
    return false;
  }, []);

  const toggleCell = (r, c) => {
    if (hasBingo) return;
    const isFree = FREE_CELLS.some(([fr, fc]) => fr === r && fc === c);
    if (isFree) return;

    const next = marked.map(row => [...row]);
    next[r][c] = !next[r][c];
    setMarked(next);

    if (checkBingo(next)) {
      setHasBingo(true);
      playChime();
      unlock('bingo-win');
      // Spawn confetti
      const pieces = Array.from({ length: 80 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: ['#2dd4bf', '#ef4444', '#f59e0b', '#22c55e', '#a855f7', '#3b82f6'][Math.floor(Math.random() * 6)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        size: 4 + Math.random() * 6,
      }));
      setConfettiPieces(pieces);
    }
  };

  return (
    <div className="max-w-2xl mx-auto relative">
      <h3 className="text-center text-white font-semibold mb-4">FIRST WEEK BINGO</h3>

      <div className="grid grid-cols-5 gap-1 md:gap-1.5">
        {BINGO_GRID.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => toggleCell(r, c)}
              className={`aspect-square p-1 md:p-2 text-[9px] md:text-[10px] leading-tight rounded border transition-all duration-200 flex items-center justify-center text-center ${
                marked[r][c]
                  ? 'border-teal-400 bg-teal-400/20 text-teal-300'
                  : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-500'
              }`}
            >
              {cell}
            </button>
          ))
        )}
      </div>

      {/* Confetti */}
      {confettiPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiPieces.map((p) => (
            <div
              key={p.id}
              className="absolute top-0"
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                animation: `confetti-fall ${p.duration}s ${p.delay}s ease-out forwards`,
              }}
            />
          ))}
        </div>
      )}

      {/* Bingo badge */}
      <AnimatePresence>
        {hasBingo && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 3 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="bg-slate-900/90 border-2 px-8 py-4 text-center rounded-lg"
              style={{ borderColor: accentColor }}
            >
              <div className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: accentColor }}>
                Level 1 Clearance
              </div>
              <div className="text-white font-bold text-lg">SURVIVED FIRST WEEK</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== SECTION WRAPPER ====================
function Section({ id, bg, children, title, subtitle }) {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 ${bg}`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
          {title}
        </h3>
        <p className="text-center text-sm text-slate-400 mb-4">
          {subtitle}
        </p>
        <div className="w-24 h-px bg-teal-500 mx-auto mb-10" />
        {children}
      </div>
    </section>
  );
}

// ==================== MAIN FIELD MANUAL (FULL SCROLL) ====================
export default function FieldManual() {
  const { selectedClass, getAccentColor } = useApp();
  const accentColor = getAccentColor(2);
  const subtitle = selectedClass === 'renaissance'
    ? RENAISSANCE_SUBTITLES.fieldManual
    : DEFAULT_SUBTITLES.fieldManual;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Master header */}
      <div className="py-16 px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
          FIELD MANUAL
        </h2>
        <p className="text-sm text-slate-400 mb-2">
          ORIENTATION EXERCISES
        </p>
        <p className="font-mono text-sm" style={{ color: accentColor }}>
          {subtitle}
        </p>
      </div>

      {/* 1. HAZARDS */}
      <Section
        id="hazards"
        bg="bg-red-950/20"
        title="HAZARDS"
        subtitle="Flip each card to reveal survival strategies for your first 90 days."
      >
        <HazardsTab accentColor={accentColor} />
      </Section>

      {/* 2. DELIVERY MODEL QUIZ */}
      <Section
        id="quiz"
        bg="bg-slate-800/50"
        title="DELIVERY MODEL QUIZ"
        subtitle="Test your knowledge of SC delivery models and project methodology."
      >
        <QuizTab accentColor={accentColor} />
      </Section>

      {/* 3. ADVANCED QUIZ */}
      <Section
        id="quiz-adv"
        bg="bg-slate-800/30"
        title="DELIVERY MODEL ROULETTE — 5 Random Questions"
        subtitle="A randomized gauntlet. No two rounds are the same."
      >
        <ExpandedQuiz />
      </Section>

      {/* 4. RFP GENERATOR */}
      <Section
        id="rfp"
        bg="bg-slate-950/60"
        title="CONTRADICTORY RFP GENERATOR"
        subtitle="Pull the lever. Marvel at what procurement departments actually request."
      >
        <RFPGeneratorTab accentColor={accentColor} />
      </Section>

      {/* 5. BINGO */}
      <Section
        id="bingo"
        bg="bg-slate-900"
        title="FIRST WEEK BINGO"
        subtitle="Mark each square as you encounter it. Diagonal counts."
      >
        <BingoTab accentColor={accentColor} />
      </Section>

      {/* 6. DEADLINE DASH */}
      <Section
        id="deadline"
        bg="bg-slate-800/40"
        title="DEADLINE DASH"
        subtitle="Race against the clock. Every second counts in AEC."
      >
        <DeadlineDash />
      </Section>

      {/* 7. NAME THAT PROJECT */}
      <Section
        id="projects"
        bg="bg-slate-900/70"
        title="NAME THAT PROJECT"
        subtitle="Can you match the codename to the real project? Prove it."
      >
        <NameThatProject />
      </Section>

      {/* 8. PROPOSAL MAD LIBS */}
      <Section
        id="madlibs"
        bg="bg-slate-800/30"
        title="PROPOSAL MAD LIBS"
        subtitle="Generate a proposal Gerald will definitely have questions about."
      >
        <ProposalMadLibs />
      </Section>
    </motion.div>
  );
}
