import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useApp } from './contexts/AppContext';
import BootSequence from './components/BootSequence';
import NavBar from './components/NavBar';
import AgentDossier from './components/AgentDossier';
import CareerDossier from './components/CareerDossier';
import Loadout from './components/Loadout';
import TheCrew from './components/TheCrew';
import FieldManual from './components/FieldManual';
import Intel from './components/Intel';
import Classified from './components/Classified';
import WhyYou from './components/WhyYou';
import WelcomeSection from './components/WelcomeSection';
import NewsTicker from './components/NewsTicker';
import SoundToggle from './components/SoundToggle';
import InterceptedQuote from './components/InterceptedQuote';
import {
  useLogoClickEasterEgg, LogoEasterEgg,
  useRedlineMode, RedlineOverlay,
  KaterraMemorial, SCFooterText,
} from './components/EasterEggs';

function PageContent({ onKaterraClick }) {
  const { activePage } = useApp();

  switch (activePage) {
    case 'dossier': return <AgentDossier />;
    case 'career': return <CareerDossier onKaterraClick={onKaterraClick} />;
    case 'arsenal': return <Loadout />;
    case 'crew': return <TheCrew />;
    case 'field-manual': return <FieldManual />;
    case 'intel': return <Intel />;
    case 'classified': return <Classified />;
    default: return <AgentDossier />;
  }
}

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showKaterra, setShowKaterra] = useState(false);
  const { activePage } = useApp();

  const {
    showLogoEasterEgg, setShowLogoEasterEgg, handleLogoClick,
  } = useLogoClickEasterEgg();
  const { redlineActive, setRedlineActive } = useRedlineMode();

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f1219' }}>
      {/* Boot Sequence */}
      {!bootComplete && (
        <BootSequence onComplete={handleBootComplete} />
      )}

      {/* Main Content */}
      {bootComplete && (
        <>
          <SoundToggle />
          <NavBar onLogoClick={handleLogoClick} />

          <main className="pt-12 pb-16">
            <AnimatePresence mode="wait">
              <PageContent
                key={activePage}
                onKaterraClick={() => setShowKaterra(true)}
              />
            </AnimatePresence>

            {/* Persistent footer sections on every page */}
            <WhyYou />
            <WelcomeSection />

            {/* Footer with SC acronym easter egg */}
            <footer className="py-6 px-4 text-center bg-slate-950">
              <p className="text-slate-600 text-xs">
                &copy; 2026 <SCFooterText /> &mdash; Onboarding Division
              </p>
            </footer>
          </main>

          <NewsTicker />
          <InterceptedQuote pageId={activePage} />
        </>
      )}

      {/* Easter Egg Overlays */}
      <AnimatePresence>
        <LogoEasterEgg
          show={showLogoEasterEgg}
          onClose={() => setShowLogoEasterEgg(false)}
        />
      </AnimatePresence>

      <RedlineOverlay
        active={redlineActive}
        onClose={() => setRedlineActive(false)}
      />

      <AnimatePresence>
        <KaterraMemorial
          show={showKaterra}
          onClose={() => setShowKaterra(false)}
        />
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
