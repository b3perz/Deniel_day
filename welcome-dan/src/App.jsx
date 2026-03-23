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
import FakeInbox from './components/FakeInbox';
import Intel from './components/Intel';
import Classified from './components/Classified';
import WhyYou from './components/WhyYou';
import WelcomeSection from './components/WelcomeSection';
import NewsTicker from './components/NewsTicker';
import SoundToggle from './components/SoundToggle';
import InterceptedQuote from './components/InterceptedQuote';
import AmbientTransmissions from './components/AmbientTransmissions';
import AchievementToast from './components/AchievementToast';
import GeraldNotification from './components/GeraldNotification';
import OfficeMap from './components/OfficeMap';
import { useKonamiCode, KonamiDesktop } from './components/KonamiDesktop';
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
    case 'inbox': return <FakeInbox />;
    case 'intel': return (
      <>
        <Intel />
        <OfficeMap />
      </>
    );
    case 'classified': return <Classified />;
    default: return <AgentDossier />;
  }
}

function AppContent() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showKaterra, setShowKaterra] = useState(false);
  const { activePage, selectedClass, soundEnabled } = useApp();

  const {
    showLogoEasterEgg, setShowLogoEasterEgg, handleLogoClick,
  } = useLogoClickEasterEgg();
  const { redlineActive, setRedlineActive } = useRedlineMode();
  const { konamiActive, setKonamiActive } = useKonamiCode();

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
  }, []);

  // Cursor class based on page and settings
  const cursorClass = !soundEnabled ? ''
    : activePage === 'classified' ? 'cursor-key'
    : 'cursor-crosshair';

  // Class-specific styling
  const classStyle = selectedClass === 'renaissance' ? 'font-class-renaissance' : '';

  return (
    <div className={`min-h-screen ${cursorClass} ${classStyle}`} style={{ backgroundColor: '#0f1219' }}>
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

            {activePage === 'dossier' && <WhyYou />}
            <WelcomeSection />

            <footer className="py-6 px-4 text-center bg-slate-950">
              <p className="text-slate-600 text-xs">
                &copy; 2026 <SCFooterText /> &mdash; Onboarding Division
              </p>
            </footer>
          </main>

          <NewsTicker />
          <InterceptedQuote pageId={activePage} />
          <AmbientTransmissions />
          <AchievementToast />
          <GeraldNotification />
        </>
      )}

      {/* Easter Egg Overlays */}
      <AnimatePresence>
        <LogoEasterEgg show={showLogoEasterEgg} onClose={() => setShowLogoEasterEgg(false)} />
      </AnimatePresence>

      <RedlineOverlay active={redlineActive} onClose={() => setRedlineActive(false)} />

      <AnimatePresence>
        <KaterraMemorial show={showKaterra} onClose={() => setShowKaterra(false)} />
      </AnimatePresence>

      <AnimatePresence>
        <KonamiDesktop active={konamiActive} onClose={() => setKonamiActive(false)} />
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
