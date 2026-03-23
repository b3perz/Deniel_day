import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

// ==================== DEADLINE DASH ====================
const TYPING_TEXT = 'StructureCraft is a vertically integrated structural engineering and engineer-build firm specializing in complex structures across timber, steel, glass, concrete, and hybrid systems. With offices in Abbotsford, Vancouver, Seattle, and Trento, we partner with world-renowned architects and developers to engineer and construct structures that are elegant in their own right and serve the greater good of their communities.';

function getTypingResult(seconds) {
  if (seconds < 60) return 'Gerald is impressed. Gerald is never impressed.';
  if (seconds < 90) return 'Acceptable. The RFP deadline has been met.';
  if (seconds < 120) return 'The proposal shipped. Barely. The printer jammed twice.';
  return 'The deadline has passed. The architect has selected another firm.';
}

export function DeadlineDash() {
  const [state, setState] = useState('ready'); // ready | typing | done
  const [typed, setTyped] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (state !== 'typing') return;
    const timer = setInterval(() => setElapsed(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, [state]);

  const handleInput = (e) => {
    const val = e.target.value;
    if (state === 'ready') setState('typing');

    // Count errors
    let errs = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== TYPING_TEXT[i]) errs++;
    }
    setErrors(errs);
    setTyped(val);

    if (val.length >= TYPING_TEXT.length) {
      setState('done');
    }
  };

  const reset = () => {
    setState('ready');
    setTyped('');
    setElapsed(0);
    setErrors(0);
  };

  const progress = Math.min(100, (typed.length / TYPING_TEXT.length) * 100);

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-white font-semibold text-center mb-2">DEADLINE DASH</h3>
      <p className="text-slate-500 text-xs text-center font-mono mb-6">Proposal Production Simulation</p>

      {state === 'done' ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
          <div className="text-4xl font-bold text-white mb-2">{elapsed}s</div>
          <p className="text-teal-400 text-sm mb-2">{getTypingResult(elapsed)}</p>
          <p className="text-slate-500 text-xs font-mono mb-4">Errors: {errors}</p>
          <button onClick={reset} className="px-6 py-2 text-xs font-mono border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
            Try Again
          </button>
        </motion.div>
      ) : (
        <>
          <div className="flex justify-between text-xs font-mono mb-2">
            <span className="text-slate-400">Time: <span className="text-white">{elapsed}s</span></span>
            <span className="text-slate-400">Progress: <span className="text-white">{Math.round(progress)}%</span></span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full mb-4 overflow-hidden">
            <div className="h-full bg-teal-400 rounded-full transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>

          {/* Target text */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-4 text-sm leading-relaxed select-none">
            {TYPING_TEXT.split('').map((char, i) => (
              <span key={i} className={
                i < typed.length
                  ? typed[i] === char ? 'text-emerald-400' : 'text-red-400 bg-red-400/20'
                  : i === typed.length ? 'text-white bg-teal-400/30' : 'text-slate-500'
              }>{char}</span>
            ))}
          </div>

          {/* Input */}
          <textarea
            ref={inputRef}
            value={typed}
            onChange={handleInput}
            placeholder={state === 'ready' ? 'Start typing to begin...' : ''}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-mono focus:outline-none focus:border-teal-400 resize-none h-32"
            autoFocus
          />
        </>
      )}
    </div>
  );
}

// ==================== EXPANDED QUIZ ====================
const EXPANDED_QUESTIONS = [
  { question: 'An owner in Singapore wants SC to design a timber pavilion. A local GC builds it. SC ships DowelLam from Abbotsford.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 0, explanation: 'SC\'s role is engineering + DowelLam supply. They\'re not managing construction on site. Consulting with product supply.' },
  { question: 'A developer in Toronto completed SD with another engineer. Wants SC to take over for DD/CD, then fabricate and install.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 2, explanation: 'SC redesigns from DD forward and builds. Another firm started the design \u2014 SC makes it better and delivers.' },
  { question: 'A university issues a public RFP for a student center. SF330 required. Engineering services only, construction is separate.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 0, explanation: 'Public sector, SF330 format, no build component. Pure consulting play.' },
  { question: 'A GC calls Gerald: "We need to bid next week. Architect specified steel but we think timber is cheaper. Can you give us a number?"', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 2, explanation: 'GC-driven. SC redesigns the steel structure in timber and prices the build. Classic value engineer-build.' },
  { question: 'An architecture firm in Italy is designing a cultural center. They want SC to engineer the timber roof and manage fabrication from Trento.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 1, explanation: 'SC\'s Italy office handles design + fabrication. Full engineer-build from the Trento office.' },
  { question: 'A Seattle developer hires SC from day one to engineer and build the timber structure for a new office tower. SC designs it and fabricates from Abbotsford.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 1, explanation: 'SC is involved from the start \u2014 engineering the structure and building it. No one else designed it. Classic engineer-build.' },
  { question: 'A museum in London wants SC to peer-review another firm\'s timber connection design. No construction role.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 0, explanation: 'Peer review is pure consulting. SC provides engineering expertise only \u2014 no fabrication, no installation.' },
  { question: 'A CM firm in Denver has a concrete parking structure design. They want SC to propose a mass timber alternative and build it if the numbers work.', options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'], correct: 2, explanation: 'The original design exists in another material. SC proposes an alternative and delivers. Value engineer-build.' },
];

function shuffleQuestions() {
  return [...EXPANDED_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 5);
}

export function ExpandedQuiz() {
  const [questions, setQuestions] = useState(shuffleQuestions);
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
    if (idx === questions[currentQ].correct) { setScore(s => s + 1); playChime(); }
    else playBuzz();
  };

  const next = () => {
    if (currentQ < 4) { setCurrentQ(q => q + 1); setSelected(null); setShowFeedback(false); }
    else setFinished(true);
  };

  useEffect(() => {
    if (finished && score === 5) unlock('quiz-perfect');
  }, [finished, score, unlock]);

  const reset = () => {
    setQuestions(shuffleQuestions());
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowFeedback(false);
    setFinished(false);
  };

  if (finished) {
    const results = ['Report to the shop.', 'Needs work.', 'Getting there.', 'Solid.', 'Impressive.', 'Gerald is cautiously optimistic.'];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
        <div className="text-5xl font-bold text-white mb-3">{score}/5</div>
        <p className="text-teal-400 text-sm">{results[score]}</p>
        <button onClick={reset}
          className="mt-6 px-6 py-2 text-xs font-mono border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
          New Round (5 random questions)
        </button>
      </motion.div>
    );
  }

  const q = questions[currentQ];
  return (
    <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-xl mx-auto">
      <div className="text-xs font-mono text-slate-500 mb-4">Question {currentQ + 1} of 5</div>
      <p className="text-white text-sm leading-relaxed mb-6">{q.question}</p>
      <div className="space-y-3">
        {q.options.map((opt, idx) => (
          <button key={opt} onClick={() => handleAnswer(idx)} disabled={showFeedback}
            className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
              showFeedback && idx === q.correct ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
              : showFeedback && idx === selected && idx !== q.correct ? 'border-red-400 bg-red-400/10 text-red-400'
              : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}>
            {opt}
          </button>
        ))}
      </div>
      {showFeedback && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
          <p className="text-slate-300 text-xs leading-relaxed mb-4 bg-slate-800/50 p-3 rounded border border-slate-700">{q.explanation}</p>
          <button onClick={next} className="px-6 py-2 font-mono text-sm border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
            {currentQ < 4 ? 'Next' : 'See Results'}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

// ==================== NAME THAT PROJECT ====================
const PROJECT_ROUNDS = [
  { desc: 'Curved intersecting dome structures, gridshell geometry, botanical setting', svg: 'M20,80 Q50,10 80,80 M30,80 Q60,20 90,70', color: '#22c55e', options: ['T3 Minneapolis', 'Taiyuan Botanical Garden', 'Barbados NPAC', 'IMTC Pavilion'], correct: 1 },
  { desc: 'Multi-story rectangular office building, exposed timber frame, urban setting', svg: 'M20,80 L20,20 L80,20 L80,80 M30,30 L30,70 M50,30 L50,70 M70,30 L70,70', color: '#3b82f6', options: ['T3 Minneapolis', 'Apple Raleigh', 'Bloomberg Center', 'Peel Regional Police'], correct: 0 },
  { desc: 'Sweeping tropical performance venue, open-air, warm climate', svg: 'M10,70 Q50,10 90,70 M20,70 Q50,25 80,70', color: '#f59e0b', options: ['Assembly Atlanta', 'Barbados National Performing Arts Centre', 'T3 Nashville', 'Gaylord Pool'], correct: 1 },
  { desc: 'Shell-like bandshell structure, bending-active DLT, event stage', svg: 'M15,80 Q30,20 50,40 Q70,60 85,20', color: '#ef4444', options: ['IMTC Pavilion', 'Taiyuan Botanical Garden', 'Assembly Atlanta', 'T3 Sterling Road'], correct: 2 },
  { desc: 'Institutional building with timber structural elements, police headquarters', svg: 'M15,80 L15,30 L50,15 L85,30 L85,80 M25,80 L25,40 M75,80 L75,40', color: '#a855f7', options: ['Apple Raleigh', 'Bloomberg Center', 'Peel Regional Police', 'T3 Atlanta'], correct: 2 },
];

export function NameThatProject() {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === PROJECT_ROUNDS[round].correct) setScore(s => s + 1);
  };

  const next = () => {
    if (round < 4) { setRound(r => r + 1); setSelected(null); }
    else setFinished(true);
  };

  if (finished) {
    const results = [
      'The faucet catalogue didn\'t have photos like these.',
      'Spend an hour on structurecraft.com this week.',
      'Spend an hour on structurecraft.com this week.',
      'Not bad for someone who hasn\'t visited a single project yet.',
      'Not bad for someone who hasn\'t visited a single project yet.',
      'You studied the portfolio before Day 1. Overachiever.',
    ];
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
        <div className="text-5xl font-bold text-white mb-3">{score}/5</div>
        <p className="text-teal-400 text-sm">{results[score]}</p>
        <button onClick={() => { setRound(0); setScore(0); setSelected(null); setFinished(false); }}
          className="mt-6 px-6 py-2 text-xs font-mono border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
          Play Again
        </button>
      </motion.div>
    );
  }

  const r = PROJECT_ROUNDS[round];
  return (
    <div className="max-w-xl mx-auto">
      <div className="text-xs font-mono text-slate-500 mb-4 text-center">Round {round + 1} of 5</div>

      {/* Abstract SVG illustration */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 mb-6 flex items-center justify-center">
        <svg viewBox="0 0 100 100" width="180" height="180">
          <path d={r.svg} fill="none" stroke={r.color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d={r.svg} fill="none" stroke={r.color} strokeWidth="1" strokeLinecap="round" opacity="0.3" strokeDasharray="4 4" transform="translate(2,2)" />
        </svg>
      </div>

      <p className="text-slate-400 text-xs text-center mb-6 italic">{r.desc}</p>

      <div className="grid grid-cols-2 gap-2">
        {r.options.map((opt, idx) => (
          <button key={opt} onClick={() => handleAnswer(idx)} disabled={selected !== null}
            className={`p-3 rounded-lg border text-xs font-medium transition-all ${
              selected !== null && idx === r.correct ? 'border-emerald-400 bg-emerald-400/10 text-emerald-400'
              : selected === idx && idx !== r.correct ? 'border-red-400 bg-red-400/10 text-red-400'
              : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500'
            }`}>
            {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4">
          <button onClick={next} className="px-6 py-2 font-mono text-xs border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
            {round < 4 ? 'Next Round' : 'See Results'}
          </button>
        </motion.div>
      )}
    </div>
  );
}

// ==================== PROPOSAL MAD LIBS ====================
const MAD_LIB_FIELDS = [
  { label: 'Enter an adjective', key: 'adj1' },
  { label: 'Enter a building type', key: 'building' },
  { label: 'Enter a city', key: 'city' },
  { label: 'Enter a number', key: 'num' },
  { label: 'Enter an emotion', key: 'emotion' },
  { label: 'Enter a material', key: 'material' },
];

export function ProposalMadLibs() {
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const allFilled = MAD_LIB_FIELDS.every(f => inputs[f.key]?.trim());

  const generate = () => {
    const { adj1, building, city, num, emotion, material } = inputs;
    setResult(
      `StructureCraft is pleased to submit our ${adj1} proposal for the ${building} in ${city}. Our team of ${num} structural engineers brings a ${emotion} commitment to engineering excellence. The proposed structure features ${material} framing with integrated connections that showcase our engineer-build delivery model. We are confident this ${adj1} approach will result in a ${building} that the community will cherish for generations. Our fee for this work is $${(parseInt(num) || 1) * 100000}, which we believe reflects the ${emotion} value we bring to every project.`
    );
    setSubmitted(false);
  };

  const reset = () => { setInputs({}); setResult(null); setSubmitted(false); };

  return (
    <div className="max-w-2xl mx-auto">
      {!result ? (
        <div className="space-y-4">
          {MAD_LIB_FIELDS.map(f => (
            <div key={f.key} className="flex items-center gap-4">
              <label className="text-slate-400 text-sm w-44 shrink-0 text-right">{f.label}:</label>
              <input type="text" value={inputs[f.key] || ''} onChange={e => setInputs(p => ({ ...p, [f.key]: e.target.value }))}
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-400" />
            </div>
          ))}
          <div className="text-center mt-6">
            <button onClick={generate} disabled={!allFilled}
              className="px-8 py-3 font-mono text-sm uppercase tracking-wider border-2 border-teal-400 text-teal-400 rounded-lg hover:bg-teal-400/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
              Generate Proposal
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
            <div className="text-[10px] font-mono text-teal-400 uppercase tracking-wider mb-4">SC PROPOSAL \u2014 CONFIDENTIAL</div>
            <p className="text-slate-200 text-sm leading-[1.8]">{result}</p>
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <button onClick={reset}
              className="px-6 py-2 text-xs font-mono border border-teal-400 text-teal-400 rounded hover:bg-teal-400/10">
              Generate Another
            </button>
            <button onClick={() => setSubmitted(true)} disabled={submitted}
              className="px-6 py-2 text-xs font-mono border border-amber-400 text-amber-400 rounded hover:bg-amber-400/10 disabled:opacity-50">
              {submitted ? 'Gerald: "See me."' : 'Submit to Gerald'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
