import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Coffee, 
  Briefcase,
  ArrowUpRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import { playClick, toggleSound, playSuccess } from '../utils/audio';

export default function Navbar({ 
  honestMode, 
  setHonestMode, 
  onOpenResume, 
  onOpenWalkthrough,
  onShowToast 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Architecture", href: "#rag-architecture", id: "rag-architecture" },
    { label: "Stack", href: "#stack", id: "stack" },
    { label: "Terminal", href: "#terminal", id: "terminal" },
    { label: "Contact", href: "#contact", id: "contact" }
  ];

  // Scroll listener for progress bar and active section spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Calculate total page scroll percentage
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      // Scroll-spy: Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
      if (scrollY < 180) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) playClick();
    onShowToast(newState ? "Audio effects active 🔊" : "Audio muted 🔇");
  };

  const handleToggleTone = (mode) => {
    if (mode === honestMode) return;
    playSuccess();
    setHonestMode(mode);
    if (mode) {
      confetti({ particleCount: 30, spread: 55, origin: { y: 0.1 } });
      onShowToast("☕ Honest Dev Mode: Unfiltered engineering insights enabled!");
    } else {
      onShowToast("👔 Recruiter Safe Mode: Official corporate resume view.");
    }
  };

  return (
    <header className="nav-fixed-container">
      <motion.div 
        className={`nav-dock ${scrolled ? 'nav-dock-scrolled' : ''}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Scroll Progress Hairline Indicator */}
        <div 
          className="nav-scroll-progress-line"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Left: Brand Monogram & Status */}
        <a 
          href="#" 
          className="brand-pill"
          onClick={(e) => { playClick(); }}
          title="Uttam Kumar Mahto • Scroll to top"
        >
          <div className="brand-monogram font-mono">
            <span>&lt;U/&gt;</span>
          </div>
          <span className="brand-text">Uttam</span>
          <div className="brand-beacon-wrapper" title="Open to opportunities">
            <span className="beacon-ring"></span>
            <span className="beacon-dot"></span>
          </div>
        </a>

        <div className="dock-separator"></div>

        {/* Center: Interactive Nav Items with Spring Pill Glider */}
        <nav 
          className="nav-items-track"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const isHovered = hoveredNav === item.id;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={playClick}
                onMouseEnter={() => setHoveredNav(item.id)}
                className={`nav-item-link ${isActive ? 'nav-item-active' : ''}`}
              >
                {/* Floating Glider Background */}
                {isHovered && (
                  <motion.div
                    layoutId="navHoverGlider"
                    className="nav-glider-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                {/* Active Section Dot */}
                {isActive && !isHovered && (
                  <motion.span 
                    layoutId="activeDot"
                    className="nav-active-pip"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}

                <span className="nav-label-text">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="dock-separator"></div>

        {/* Right Controls: Mode Switcher, Audio Equalizer & Resume CTA */}
        <div className="dock-actions">
          {/* Segmented Dual Tone Slider */}
          <div id="nav-tone-switch" className="tone-switch-dock">
            <button
              onClick={() => handleToggleTone(false)}
              className={`tone-opt-btn ${!honestMode ? 'tone-opt-selected' : ''}`}
              title="Recruiter Safe Mode: Professional sanitized resume view"
            >
              {!honestMode && (
                <motion.div 
                  layoutId="tonePill" 
                  className="tone-thumb-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Briefcase size={12} className="tone-icon" />
              <span className="tone-label">Safe</span>
            </button>

            <button
              onClick={() => handleToggleTone(true)}
              className={`tone-opt-btn ${honestMode ? 'tone-opt-selected' : ''}`}
              title="Honest Dev Mode: Real engineering truths and unfiltered insights"
            >
              {honestMode && (
                <motion.div 
                  layoutId="tonePill" 
                  className="tone-thumb-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <Coffee size={12} className="tone-icon" />
              <span className="tone-label">Honest</span>
            </button>
          </div>

          {/* Interactive Walkthrough Tour Trigger */}
          <button
            id="nav-tour-btn"
            onClick={() => { playClick(); onOpenWalkthrough(); }}
            className="btn-dock-tour font-mono"
            title="Interactive Portfolio Tour (Safe vs. Honest Modes, 3D Chibi, RAG Demo, Terminal, Resume)"
          >
            <Sparkles size={12} className="text-amber animate-spin-slow" />
            <span className="tour-label">Tour</span>
          </button>

          {/* Sound Equalizer Visualizer */}
          <button 
            onClick={handleToggleSound} 
            className="btn-dock-audio" 
            title={soundOn ? "Mute interactive audio feedback" : "Enable interactive audio feedback"}
          >
            {soundOn ? (
              <div className="audio-equalizer">
                <span className="eq-bar bar-1"></span>
                <span className="eq-bar bar-2"></span>
                <span className="eq-bar bar-3"></span>
              </div>
            ) : (
              <VolumeX size={14} className="text-muted" />
            )}
          </button>

          {/* Shimmer Resume Action */}
          <button 
            id="nav-resume-btn"
            onClick={() => { playClick(); onOpenResume(); }} 
            className="btn-dock-resume"
            title="Open printable resume & PDF export"
          >
            <span className="resume-text">Resume</span>
            <ArrowUpRight size={13} className="resume-arrow" />
          </button>

          {/* Mobile Menu Trigger */}
          <button 
            className="btn-dock-mobile"
            onClick={() => { playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-dock-drawer"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-links-list">
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => { playClick(); setMobileMenuOpen(false); }}
                  className="mobile-link-entry"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight size={14} className="mobile-link-arrow" />
                </a>
              ))}
            </div>

            <div className="mobile-drawer-footer">
              <div className="tone-switch-dock w-full">
                <button
                  onClick={() => handleToggleTone(false)}
                  className={`tone-opt-btn flex-1 ${!honestMode ? 'tone-opt-selected' : ''}`}
                >
                  <Briefcase size={13} />
                  <span>Recruiter Safe</span>
                </button>
                <button
                  onClick={() => handleToggleTone(true)}
                  className={`tone-opt-btn flex-1 ${honestMode ? 'tone-opt-selected' : ''}`}
                >
                  <Coffee size={13} />
                  <span>Honest Mode</span>
                </button>
              </div>

              <button 
                onClick={() => { onOpenWalkthrough(); setMobileMenuOpen(false); }} 
                className="btn btn-subtle w-full justify-center"
              >
                <Sparkles size={14} className="text-amber" />
                <span>Interactive Portfolio Tour</span>
              </button>

              <button 
                onClick={() => { onOpenResume(); setMobileMenuOpen(false); }} 
                className="btn-dock-resume w-full justify-center"
              >
                <FileText size={14} />
                <span>View Full Resume Sheet</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-fixed-container {
          position: sticky;
          top: 18px;
          left: 0;
          right: 0;
          z-index: 950;
          display: flex;
          justify-content: center;
          padding: 0 16px;
          pointer-events: none;
        }

        .nav-dock {
          pointer-events: auto;
          position: relative;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(10, 14, 25, 0.78);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          padding: 5px 10px 5px 12px;
          box-shadow: 
            0 16px 38px -12px rgba(0, 0, 0, 0.75), 
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 0 18px rgba(56, 189, 248, 0.04);
          transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          max-width: 960px;
          width: auto;
        }

        .nav-dock-scrolled {
          background: rgba(8, 12, 22, 0.92);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 
            0 20px 45px -10px rgba(0, 0, 0, 0.85), 
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            0 0 25px rgba(56, 189, 248, 0.08);
        }

        /* 1px Scroll Progress Line on bottom edge */
        .nav-scroll-progress-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
          transition: width 0.12s linear;
          pointer-events: none;
        }

        /* Brand Pill */
        .brand-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #fff;
          padding: 2px 4px 2px 2px;
          border-radius: var(--radius-full);
          transition: opacity 0.15s ease;
          flex-shrink: 0;
        }

        .brand-pill:hover {
          opacity: 0.9;
        }

        .brand-monogram {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(99, 102, 241, 0.2));
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .brand-text {
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: -0.02em;
          color: #ffffff;
          white-space: nowrap;
        }

        /* Available Beacon Dot */
        .brand-beacon-wrapper {
          position: relative;
          width: 8px;
          height: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .beacon-ring {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.4);
          animation: beaconPulse 2s infinite ease-out;
        }

        .beacon-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 6px var(--accent-emerald);
        }

        @keyframes beaconPulse {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .dock-separator {
          width: 1px;
          height: 16px;
          background: rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        @media (max-width: 840px) {
          .dock-separator { display: none; }
        }

        /* Center Nav Links Track */
        .nav-items-track {
          display: flex;
          align-items: center;
          gap: 1px;
          position: relative;
        }

        @media (max-width: 840px) {
          .nav-items-track { display: none; }
        }

        .nav-item-link {
          position: relative;
          padding: 5px 9px;
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 0.81rem;
          font-weight: 500;
          border-radius: var(--radius-full);
          transition: color 0.15s ease;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .nav-item-link:hover {
          color: #ffffff;
        }

        .nav-item-active {
          color: #ffffff;
          font-weight: 600;
        }

        .nav-label-text {
          position: relative;
          z-index: 2;
        }

        .nav-glider-pill {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: var(--radius-full);
          z-index: 1;
        }

        .nav-active-pip {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-blue);
          box-shadow: 0 0 5px var(--accent-blue);
          position: relative;
          z-index: 2;
        }

        /* Right Control Dock */
        .dock-actions {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-left: auto;
          flex-shrink: 0;
        }

        /* Segmented Mode Switcher */
        .tone-switch-dock {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-full);
          padding: 2px;
          flex-shrink: 0;
        }

        .tone-opt-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 4px 9px;
          border-radius: var(--radius-full);
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-size: 0.74rem;
          font-family: var(--font-sans);
          font-weight: 500;
          cursor: pointer;
          transition: color 0.15s ease;
          z-index: 1;
          white-space: nowrap;
        }

        .tone-opt-btn:hover {
          color: #ffffff;
        }

        .tone-opt-selected {
          color: #ffffff;
          font-weight: 600;
        }

        .tone-thumb-pill {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-full);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          z-index: -1;
        }

        .tone-icon {
          flex-shrink: 0;
        }

        /* Interactive Tour Dock Button */
        .btn-dock-tour {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.28);
          color: #fde68a;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .btn-dock-tour:hover {
          background: rgba(245, 158, 11, 0.2);
          border-color: rgba(245, 158, 11, 0.5);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .animate-spin-slow {
          animation: spinSlow 8s linear infinite;
        }

        @keyframes spinSlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Audio Equalizer Button */
        .btn-dock-audio {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }

        .btn-dock-audio:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .audio-equalizer {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 12px;
        }

        .eq-bar {
          width: 2px;
          background: var(--accent-blue);
          border-radius: 1px;
          animation: eqDance 1.2s ease-in-out infinite alternate;
        }

        .bar-1 { height: 6px; animation-delay: 0s; }
        .bar-2 { height: 11px; animation-delay: 0.25s; }
        .bar-3 { height: 8px; animation-delay: 0.45s; }

        @keyframes eqDance {
          0% { height: 4px; }
          50% { height: 12px; }
          100% { height: 6px; }
        }

        /* High-End Shimmer Resume Button */
        .btn-dock-resume {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          background: #ffffff;
          color: #080d1a;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.15);
          flex-shrink: 0;
          white-space: nowrap;
        }

        .btn-dock-resume:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.25);
        }

        .btn-dock-resume:hover .resume-arrow {
          transform: translate(1.5px, -1.5px);
        }

        .resume-arrow {
          transition: transform 0.15s ease;
        }

        /* Mobile Toggle Button */
        .btn-dock-mobile {
          display: none;
          background: transparent;
          border: none;
          color: #ffffff;
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 840px) {
          .btn-dock-mobile { display: inline-flex; }
          .tone-switch-dock { display: none; }
        }

        /* Mobile Drawer */
        .mobile-dock-drawer {
          position: absolute;
          top: 60px;
          left: 16px;
          right: 16px;
          background: rgba(10, 14, 26, 0.96);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: 18px;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
          display: flex;
          flex-direction: column;
          gap: 14px;
          pointer-events: auto;
        }

        .mobile-links-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-link-entry {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 500;
          padding: 9px 12px;
          border-radius: var(--radius-sm);
          transition: background 0.15s ease, color 0.15s ease;
        }

        .mobile-link-entry:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-link-arrow {
          color: var(--text-muted);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .text-muted { color: var(--text-muted); }
        .w-full { width: 100%; }
        .flex-1 { flex: 1; }
        .justify-center { justify-content: center; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </header>
  );
}
