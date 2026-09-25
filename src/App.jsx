import React, { useState } from 'react';
import SpotlightCursor from './components/SpotlightCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Experience from './components/Experience';
import Projects from './components/Projects';
import RagArchitectureDemo from './components/RagArchitectureDemo';
import SkillsMatrix from './components/SkillsMatrix';
import InteractiveTerminal from './components/InteractiveTerminal';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import FridayDeployModal from './components/FridayDeployModal';
import GitHubDeployGuideModal from './components/GitHubDeployGuideModal';
import PortfolioWalkthrough from './components/PortfolioWalkthrough';
import MobileWarningModal from './components/MobileWarningModal';

export default function App() {
  const [honestMode, setHonestMode] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isFridayDeployOpen, setIsFridayDeployOpen] = useState(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState(false);
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [isMobileWarningOpen, setIsMobileWarningOpen] = useState(false);

  // Auto-detect mobile devices on load and display the humorous workstation recommendation modal
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const isSmallScreen = window.innerWidth <= 768;
    const isMobileAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
    const alreadyDismissed = sessionStorage.getItem('mobile_desktop_notice_dismissed');

    if ((isSmallScreen || isMobileAgent) && !alreadyDismissed) {
      const timer = setTimeout(() => {
        setIsMobileWarningOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <div className="app-wrapper">
      {/* Dynamic Animated Cyber Ambience */}
      <div className="page-bg-mesh">
        <div className="mesh-orb orb-cyan"></div>
        <div className="mesh-orb orb-violet"></div>
        <div className="mesh-orb orb-emerald"></div>
      </div>
      <div className="cyber-grid"></div>

      {/* Mouse Tracking Spotlight */}
      <SpotlightCursor />

      {/* Top Header Navigation */}
      <Navbar
        honestMode={honestMode}
        setHonestMode={setHonestMode}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenFridayDeploy={() => setIsFridayDeployOpen(true)}
        onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
        onShowToast={showToast}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          honestMode={honestMode}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenWalkthrough={() => setIsWalkthroughOpen(true)}
          onShowToast={showToast}
        />

        {/* Infinite Scrolling Tech Marquee */}
        <TechMarquee />

        <Experience 
          honestMode={honestMode} 
        />

        <Projects 
          honestMode={honestMode} 
        />

        <RagArchitectureDemo />

        <SkillsMatrix />

        <InteractiveTerminal
          onShowToast={showToast}
          onOpenFridayDeploy={() => setIsFridayDeployOpen(true)}
        />

        <Education />

        <Contact
          onShowToast={showToast}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <FridayDeployModal
        isOpen={isFridayDeployOpen}
        onClose={() => setIsFridayDeployOpen(false)}
      />

      <GitHubDeployGuideModal
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
        onShowToast={showToast}
      />

      <PortfolioWalkthrough
        isOpen={isWalkthroughOpen}
        onClose={() => setIsWalkthroughOpen(false)}
        honestMode={honestMode}
        setHonestMode={setHonestMode}
        onOpenResume={() => {
          setIsWalkthroughOpen(false);
          setIsResumeOpen(true);
        }}
      />

      <MobileWarningModal
        isOpen={isMobileWarningOpen}
        onClose={() => setIsMobileWarningOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
