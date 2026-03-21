import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { CHAMELEON_COLORS } from '../data/constants';
import { CLASSIFIED_UNLOCKS } from '../data/expansion';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activePage, setActivePage] = useState('dossier');
  const [unlocks, setUnlocks] = useState({});
  const [rfpCount, setRfpCount] = useState(0);
  const audioCtxRef = useRef(null);

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback((frequency, duration, type = 'sine', volume = 0.1) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency;
      gain.gain.value = volume;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* ignore audio errors */ }
  }, [soundEnabled, getAudioCtx]);

  const playTick = useCallback(() => playTone(800, 0.05, 'square', 0.03), [playTone]);
  const playThunk = useCallback(() => playTone(120, 0.15, 'sine', 0.15), [playTone]);
  const playChime = useCallback(() => playTone(880, 0.3, 'sine', 0.1), [playTone]);
  const playBuzz = useCallback(() => playTone(150, 0.25, 'sawtooth', 0.08), [playTone]);
  const playHoverTick = useCallback(() => playTone(1200, 0.02, 'sine', 0.02), [playTone]);

  const getAccentColor = useCallback((sectionIndex = 0) => {
    if (selectedClass === 'chameleon') {
      return CHAMELEON_COLORS[sectionIndex % CHAMELEON_COLORS.length];
    }
    return '#2dd4bf';
  }, [selectedClass]);

  const unlock = useCallback((id) => {
    setUnlocks(prev => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  const isUnlocked = useCallback((id) => !!unlocks[id], [unlocks]);
  const unlockCount = Object.keys(unlocks).length;

  const trackRfp = useCallback(() => {
    setRfpCount(c => {
      const next = c + 1;
      if (next >= 5) unlock('rfp-x5');
      return next;
    });
  }, [unlock]);

  return (
    <AppContext.Provider value={{
      selectedClass,
      setSelectedClass,
      soundEnabled,
      setSoundEnabled,
      activePage,
      setActivePage,
      unlocks,
      unlock,
      isUnlocked,
      unlockCount,
      rfpCount,
      trackRfp,
      playTick,
      playThunk,
      playChime,
      playBuzz,
      playHoverTick,
      getAccentColor,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
