import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Briefcase, 
  Coffee, 
  Terminal, 
  FileText, 
  Bot, 
  Cpu, 
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess } from '../utils/audio';

export default function PortfolioWalkthrough({ 
  isOpen, 
  onClose, 
  honestMode, 
  setHonestMode, 
  onOpenResume 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  const steps = [
    {
      targetId: 'nav-tone-switch',
      title: '1. Dual-Tone Switcher (Safe vs. Honest)',
      badge: 'SIGNATURE FEATURE',
      icon: <Coffee size={18} className="text-amber" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            We built <strong>two portfolios in one</strong>! You can toggle this switcher anytime in the top menu:
          </p>
          <div className="walkthrough-mode-preview">
            <div className="mode-pill-mini">
              <strong>👔 Recruiter Safe:</strong> Official corporate CV, sanitized metrics &amp; ATS-ready keywords.
            </div>
            <div className="mode-pill-mini">
              <strong>☕ Honest Dev Mode:</strong> Unfiltered engineering war stories, production facepalms &amp; sarcastic truths.
            </div>
          </div>
          <div className="walkthrough-inline-action">
            <button 
              onClick={() => { playSuccess(); setHonestMode(!honestMode); }} 
              className="btn btn-sm btn-subtle font-mono"
            >
              <span>Currently: {honestMode ? "☕ Honest Mode" : "👔 Safe Mode"} (Click to flip live)</span>
            </button>
          </div>
        </div>
      )
    },
    {
      targetId: 'hero-chibi-card',
      title: '2. 3D Interactive Chibi Developer',
      badge: '3D PERSPECTIVE',
      icon: <Sparkles size={18} className="text-cyan" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            Custom 3D Pixar-style Chibi developer avatar modeled directly from my real workplace photo.
          </p>
          <ul className="walkthrough-checklist">
            <li><strong>3D Mouse Parallax:</strong> Move your cursor over the card to tilt it in real-time 3D space with specular lighting.</li>
            <li><strong>Interactive Brain:</strong> Click on my avatar's face to cycle through thoughts and fire celebratory confetti!</li>
          </ul>
        </div>
      )
    },
    {
      targetId: 'rag-interactive-sandbox',
      title: '3. Hybrid RAG & Vector Pipeline Simulator',
      badge: 'SYSTEM ARCHITECTURE',
      icon: <Cpu size={18} className="text-cyan" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            A live simulation of the production architecture I built at Sanpbizz CloudTech:
          </p>
          <ul className="walkthrough-checklist">
            <li><strong>Elasticsearch BM25:</strong> Solves cashier typos (e.g. "paracetmol 50mg" → "Paracetamol 500mg").</li>
            <li><strong>PostgreSQL pgvector:</strong> Semantic cosine similarity for conceptual analytical questions.</li>
            <li><strong>Reciprocal Rank Fusion (RRF):</strong> Fuses both streams with zero hallucination.</li>
          </ul>
        </div>
      )
    },
    {
      targetId: 'terminal-window-card',
      title: '4. Production Developer CLI Terminal',
      badge: 'INTERACTIVE SHELL',
      icon: <Terminal size={18} className="text-cyan" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            An interactive command-line terminal shell built for technical recruiters and fellow engineers.
          </p>
          <ul className="walkthrough-checklist">
            <li>Try typing <code>why-hire</code>, <code>git-blame</code>, or <code>coffee</code>.</li>
            <li>Run <code>deploy-prod</code> to simulate a dangerous Friday 5:00 PM production deployment!</li>
            <li>Run <code>sudo hire</code> for recruitment fast-track &amp; celebration.</li>
          </ul>
        </div>
      )
    },
    {
      targetId: 'nav-resume-btn',
      title: '5. Containerized Resume & PDF Export',
      badge: '1-CLICK PDF',
      icon: <FileText size={18} className="text-cyan" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            The <strong>Resume ↗</strong> button opens a dedicated document viewer container fitted perfectly to your browser viewport.
          </p>
          <ul className="walkthrough-checklist">
            <li>Includes a direct <strong>Download PDF</strong> action and standard print export.</li>
            <li>Built-in interactive zoom controls (75% to 130%) with clean A4 print media styles.</li>
          </ul>
          <div className="walkthrough-inline-action">
            <button 
              onClick={() => { playSuccess(); onOpenResume(); }} 
              className="btn btn-sm btn-subtle font-mono"
            >
              <FileText size={13} className="text-cyan" />
              <span>Preview Resume Modal Now ↗</span>
            </button>
          </div>
        </div>
      )
    },
    {
      targetId: 'hero-ai-badge',
      title: '6. AI-Assisted Portfolio Disclaimer',
      badge: 'TRANSPARENCY',
      icon: <Bot size={18} className="text-cyan" />,
      content: (
        <div>
          <p className="walkthrough-desc">
            <strong>🤖 Made with AI:</strong> Code, distributed architecture, and data pipelines engineered by me. CSS and styling generated with LLM assistance.
          </p>
          <div className="walkthrough-quote font-mono">
            "Please don't judge the portfolio styling — judge my production SQL and 10,000 QPS backend microservices instead!"
          </div>
        </div>
      )
    }
  ];

  // Specific rule: Step 2, Step 3, and Step 4 should have less z-index than the walkthrough modal (behind the modal)
  const isLowerZIndexStep = currentStep === 1 || currentStep === 2 || currentStep === 3;
  const highlighterZIndex = isLowerZIndexStep ? 1010 : 100000;
  const modalZIndex = isLowerZIndexStep ? 99999 : 1050;

  const current = steps[currentStep];
  const isPillTarget = current.targetId === 'nav-tone-switch' || current.targetId === 'nav-resume-btn' || current.targetId === 'hero-ai-badge';

  // Dynamic spotlight calculation
  const updateTargetRect = () => {
    const step = steps[currentStep];
    if (step && step.targetId) {
      const el = document.getElementById(step.targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height
        });
        return;
      }
    }
    setTargetRect(null);
  };

  // Scroll to targeted element with proper offset
  useEffect(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    const step = steps[currentStep];
    let activeEl = null;

    if (step && step.targetId) {
      activeEl = document.getElementById(step.targetId);
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        
        // Header and top elements scroll directly to top of page (scrollY: 0)
        if (step.targetId === 'nav-tone-switch' || step.targetId === 'nav-resume-btn' || step.targetId === 'hero-ai-badge') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (rect.height > 300) {
          // Tall elements scroll with 85px top offset below navbar
          const scrollTargetY = window.scrollY + rect.top - 85;
          window.scrollTo({ top: Math.max(0, scrollTargetY), behavior: 'smooth' });
        } else {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        const highlightClass = isLowerZIndexStep ? 'walkthrough-highlighted-lower' : 'walkthrough-highlighted-element';
        activeEl.classList.add(highlightClass);
      }
    }

    const timer1 = setTimeout(updateTargetRect, 80);
    const timer2 = setTimeout(updateTargetRect, 320);
    const timer3 = setTimeout(updateTargetRect, 650);

    window.addEventListener('resize', updateTargetRect);
    window.addEventListener('scroll', updateTargetRect, { passive: true });

    return () => {
      if (activeEl) {
        activeEl.classList.remove('walkthrough-highlighted-element');
        activeEl.classList.remove('walkthrough-highlighted-lower');
      }
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', updateTargetRect);
      window.removeEventListener('scroll', updateTargetRect);
    };
  }, [currentStep, isOpen, isLowerZIndexStep]);

  // Keyboard navigation (Esc, ArrowRight, ArrowLeft)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep]);

  if (!isOpen) return null;

  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    playClick();
    if (isLast) {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      playSuccess();
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    playClick();
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Coordinates for unblurred cutout hole
  const pad = isPillTarget ? 4 : 6;
  const x1 = targetRect ? Math.max(0, Math.round(targetRect.left - pad)) : 0;
  const y1 = targetRect ? Math.max(0, Math.round(targetRect.top - pad)) : 0;
  const x2 = targetRect ? Math.min(window.innerWidth, Math.round(targetRect.left + targetRect.width + pad)) : 0;
  const y2 = targetRect ? Math.min(window.innerHeight, Math.round(targetRect.top + targetRect.height + pad)) : 0;

  const cutoutPolygon = targetRect ? 
    `polygon(0% 0%, 0% 100%, ${x1}px 100%, ${x1}px ${y1}px, ${x2}px ${y1}px, ${x2}px ${y2}px, ${x1}px ${y2}px, ${x1}px 100%, 100% 100%, 100% 0%)` 
    : 'none';

  return (
    <>
      {/* 
        LAYER 1: Backdrop & Target Highlighter 
        z-index is controlled dynamically:
        For Step 2, Step 3, and Step 4, highlighter has LESS z-index (1010) than modal (99999).
        For Step 1, Step 5, and Step 6, highlighter has GREATER z-index (100000) than modal (1050).
      */}
      <div className="walkthrough-highlighter-layer">
        {/* Dimmed & Blurred Backdrop with Cutout Hole: Target area is physically outside polygon so it is NEVER blurred */}
        <div 
          className="walkthrough-cutout-backdrop"
          onClick={onClose}
          style={{
            clipPath: cutoutPolygon,
            WebkitClipPath: cutoutPolygon
          }}
        />

        {/* Target Spotlight Frame - Positioned around the cutout */}
        {targetRect && (
          <div 
            className="walkthrough-spotlight-frame"
            style={{
              top: `${y1}px`,
              left: `${x1}px`,
              width: `${x2 - x1}px`,
              height: `${y2 - y1}px`,
              zIndex: highlighterZIndex,
              borderRadius: isPillTarget ? '9999px' : '10px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="spotlight-beacon-tag font-mono"
              style={y1 < 60 ? { top: 'calc(100% + 8px)', bottom: 'auto' } : {}}
            >
              <span className="beacon-ping"></span>
              <span>TARGET OPTION • STEP {currentStep + 1}</span>
            </div>

            {!isPillTarget && (
              <>
                <div className="reticle-corner reticle-tl"></div>
                <div className="reticle-corner reticle-tr"></div>
                <div className="reticle-corner reticle-bl"></div>
                <div className="reticle-corner reticle-br"></div>
              </>
            )}
          </div>
        )}
      </div>

      {/* 
        LAYER 2: Floating Walkthrough Modal 
        Uniformly sticks to the bottom (bottom: 24px) for all steps without jumping.
        z-index is modalZIndex (99999 for step 3 & 4; 1050 for other steps).
      */}
      <div 
        className="walkthrough-card-wrapper"
        style={{ zIndex: modalZIndex }}
      >
        <motion.div 
          className="walkthrough-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header Bar */}
          <div className="walkthrough-header">
            <div className="walkthrough-badge-row">
              <span className="step-pill font-mono">Step {currentStep + 1} of {steps.length}</span>
              <span className="type-badge font-mono">{current.badge}</span>
            </div>

            <button onClick={onClose} className="walkthrough-close-btn" aria-label="Close walkthrough" title="Close tour (Esc)">
              <X size={16} />
            </button>
          </div>

          {/* Step Title */}
          <div className="walkthrough-title-row">
            <div className="walkthrough-icon-box">
              {current.icon}
            </div>
            <h3 className="walkthrough-title">{current.title}</h3>
          </div>

          {/* Step Content */}
          <div className="walkthrough-body">
            {current.content}
          </div>

          {/* Progress Dots */}
          <div className="walkthrough-dots">
            {steps.map((_, i) => (
              <span 
                key={i} 
                onClick={() => { playClick(); setCurrentStep(i); }}
                className={`dot-pill ${i === currentStep ? 'dot-pill-active' : ''}`}
                title={`Jump to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Footer Navigation Buttons */}
          <div className="walkthrough-footer">
            <button 
              onClick={onClose} 
              className="btn btn-subtle btn-sm font-mono"
            >
              <span>Skip Walkthrough</span>
            </button>

            <div className="walkthrough-nav-btns">
              {!isFirst && (
                <button 
                  onClick={handlePrev} 
                  className="btn btn-subtle btn-sm font-mono"
                >
                  <ArrowLeft size={13} />
                  <span>Prev</span>
                </button>
              )}

              <button 
                onClick={handleNext} 
                className="btn btn-solid btn-sm font-mono"
              >
                <span>{isLast ? "Finish Tour 🎉" : "Next Option"}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        /* Target highlighter layer */
        .walkthrough-highlighter-layer {
          position: fixed;
          inset: 0;
          z-index: 1000;
          pointer-events: none;
        }

        /* The backdrop blurs and darkens everything, EXCEPT the cutout polygon hole */
        .walkthrough-cutout-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          pointer-events: auto;
          transition: clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1), -webkit-clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* For Step 1, 5, 6: target element is above modal (z-index 99990) */
        .walkthrough-highlighted-element {
          position: relative !important;
          z-index: 99990 !important;
          filter: none !important;
          -webkit-filter: none !important;
        }

        /* For Step 2, 3 & 4: target element has LESS z-index than modal (z-index 1005) */
        .walkthrough-highlighted-lower {
          position: relative !important;
          z-index: 1005 !important;
          filter: none !important;
          -webkit-filter: none !important;
        }

        /* The spotlight frame (TARGET HIGHLIGHTER) */
        .walkthrough-spotlight-frame {
          position: fixed;
          border: 2px solid var(--accent-blue);
          box-shadow: 
            0 0 25px rgba(56, 189, 248, 0.55),
            inset 0 0 15px rgba(56, 189, 248, 0.15);
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: spotlightFramePulse 2.5s infinite ease-in-out;
        }

        @keyframes spotlightFramePulse {
          0%, 100% { border-color: rgba(56, 189, 248, 0.9); box-shadow: 0 0 25px rgba(56, 189, 248, 0.55); }
          50% { border-color: rgba(99, 102, 241, 0.95); box-shadow: 0 0 35px rgba(99, 102, 241, 0.7); }
        }

        .spotlight-beacon-tag {
          position: absolute;
          top: -26px;
          left: 0;
          background: var(--accent-blue);
          color: #030712;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(56, 189, 248, 0.5);
        }

        .beacon-ping {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #030712;
          animation: pingDot 1.2s infinite ease-in-out;
        }

        @keyframes pingDot {
          0%, 100% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
        }

        .reticle-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #ffffff;
          border-style: solid;
          pointer-events: none;
        }
        .reticle-tl { top: -2px; left: -2px; border-width: 2px 0 0 2px; }
        .reticle-tr { top: -2px; right: -2px; border-width: 2px 2px 0 0; }
        .reticle-bl { bottom: -2px; left: -2px; border-width: 0 0 2px 2px; }
        .reticle-br { bottom: -2px; right: -2px; border-width: 0 2px 2px 0; }

        /* 
          WALKTHROUGH MODAL WRAPPER 
          Uniformly fixed at bottom (bottom: 24px) for all steps.
        */
        .walkthrough-card-wrapper {
          position: fixed;
          bottom: 24px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          padding: 0 20px;
          pointer-events: none;
        }

        .walkthrough-card {
          pointer-events: auto;
          background: rgba(10, 14, 26, 0.98);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(56, 189, 248, 0.18);
          border-radius: var(--radius-lg);
          padding: 24px;
          max-width: 580px;
          width: 100%;
          position: relative;
        }

        .walkthrough-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .walkthrough-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-pill {
          font-size: 0.72rem;
          color: var(--accent-blue);
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .type-badge {
          font-size: 0.68rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .walkthrough-close-btn {
          width: 28px;
          height: 28px;
          border-radius: var(--radius-xs);
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .walkthrough-close-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .walkthrough-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .walkthrough-icon-box {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .walkthrough-title {
          font-size: 1.15rem;
          color: #ffffff;
          font-weight: 700;
        }

        .walkthrough-body {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.55;
          margin-bottom: 20px;
        }

        .walkthrough-desc {
          margin-bottom: 10px;
        }

        .walkthrough-mode-preview {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin: 12px 0;
        }

        .mode-pill-mini {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          color: #cbd5e1;
        }

        .mode-pill-mini strong {
          color: #ffffff;
        }

        .walkthrough-inline-action {
          margin-top: 10px;
        }

        .walkthrough-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-left: 0;
          margin-top: 8px;
        }

        .walkthrough-checklist li {
          font-size: 0.84rem;
          color: #cbd5e1;
          padding-left: 14px;
          position: relative;
        }

        .walkthrough-checklist li::before {
          content: "•";
          color: var(--accent-blue);
          font-weight: bold;
          position: absolute;
          left: 0;
        }

        .walkthrough-checklist code {
          background: rgba(56, 189, 248, 0.1);
          color: var(--accent-blue);
          padding: 2px 5px;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .walkthrough-quote {
          background: rgba(245, 158, 11, 0.08);
          border-left: 3px solid var(--accent-amber);
          padding: 10px 14px;
          border-radius: var(--radius-xs);
          font-size: 0.82rem;
          color: #fef08a;
          line-height: 1.45;
          margin-top: 10px;
          font-style: italic;
        }

        .walkthrough-dots {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 18px;
        }

        .dot-pill {
          height: 4px;
          flex: 1;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dot-pill:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .dot-pill-active {
          background: var(--accent-blue);
          box-shadow: 0 0 8px var(--accent-blue);
        }

        .walkthrough-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
        }

        .walkthrough-nav-btns {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .text-cyan { color: var(--accent-blue); }
        .text-amber { color: var(--accent-amber); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </>
  );
}
