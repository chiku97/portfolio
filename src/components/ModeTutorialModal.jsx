import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Briefcase, 
  Coffee, 
  Sparkles, 
  Check, 
  ArrowRight,
  HelpCircle,
  Flame,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess } from '../utils/audio';

export default function ModeTutorialModal({ 
  isOpen, 
  onClose, 
  honestMode, 
  setHonestMode, 
  onShowToast 
}) {
  if (!isOpen) return null;

  const handleSelectMode = (mode) => {
    playSuccess();
    setHonestMode(mode);
    if (mode) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
      if (onShowToast) onShowToast("☕ Honest Dev Mode activated!");
    } else {
      if (onShowToast) onShowToast("👔 Recruiter Safe Mode activated!");
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <motion.div 
        className="modal-box tutorial-modal-box"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className="tutorial-header">
          <div className="tutorial-badge-pill font-mono">
            <Sparkles size={13} className="text-cyan" />
            <span>PORTFOLIO FEATURE GUIDE</span>
          </div>
          <button onClick={onClose} className="tutorial-close-btn" aria-label="Close tutorial">
            <X size={18} />
          </button>
        </div>

        <h2 className="tutorial-title">
          Two Portfolios in One: <span className="gradient-title">Safe vs. Honest</span>
        </h2>
        <p className="tutorial-sub">
          We built this portfolio with a built-in perspective switcher. You can toggle it anytime from the top navigation bar dock to change the tone of every section, project, and work experience on the page.
        </p>

        {/* Dual Mode Comparison Grid */}
        <div className="modes-comparison-grid">
          {/* Recruiter Safe Card */}
          <div 
            className={`mode-card ${!honestMode ? 'mode-card-active' : ''}`}
            onClick={() => handleSelectMode(false)}
          >
            <div className="mode-card-top">
              <div className="mode-icon-circle icon-safe">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="mode-name">👔 Recruiter Safe Mode</h3>
                <span className="mode-tagline font-mono">Official Corporate View</span>
              </div>
            </div>

            <ul className="mode-features-list">
              <li><Check size={14} className="text-emerald" /> <span>Sanitized, HR-approved bullet points</span></li>
              <li><Check size={14} className="text-emerald" /> <span>Formal metrics, SLA compliance & tech stacks</span></li>
              <li><Check size={14} className="text-emerald" /> <span>Perfect for initial hiring manager screenings</span></li>
            </ul>

            <button 
              className={`btn btn-sm w-full ${!honestMode ? 'btn-solid' : 'btn-subtle'}`}
              onClick={(e) => { e.stopPropagation(); handleSelectMode(false); }}
            >
              {!honestMode ? "Currently Active ✓" : "Switch to Safe Mode"}
            </button>
          </div>

          {/* Honest Dev Mode Card */}
          <div 
            className={`mode-card ${honestMode ? 'mode-card-active' : ''}`}
            onClick={() => handleSelectMode(true)}
          >
            <div className="mode-card-top">
              <div className="mode-icon-circle icon-honest">
                <Coffee size={20} />
              </div>
              <div>
                <h3 className="mode-name">☕ Honest Dev Mode</h3>
                <span className="mode-tagline font-mono">Unfiltered Engineering Truths</span>
              </div>
            </div>

            <ul className="mode-features-list">
              <li><Flame size={14} className="text-amber" /> <span>Real production war stories & battle scars</span></li>
              <li><Flame size={14} className="text-amber" /> <span>Sarcastic dev commentary & meme-level truths</span></li>
              <li><Flame size={14} className="text-amber" /> <span>Proof of real-world troubleshooting experience</span></li>
            </ul>

            <button 
              className={`btn btn-sm w-full ${honestMode ? 'btn-solid' : 'btn-subtle'}`}
              onClick={(e) => { e.stopPropagation(); handleSelectMode(true); }}
            >
              {honestMode ? "Currently Active ✓" : "Switch to Honest Mode (Recommended)"}
            </button>
          </div>
        </div>

        {/* Floating Instruction Callout */}
        <div className="tutorial-tip-box font-mono">
          <span className="tip-marker">💡 HOW TO TOGGLE:</span>
          <span>Look at the top-right of the floating menu dock: click <strong>[ 👔 Safe | ☕ Honest ]</strong> anytime!</span>
        </div>

        {/* Footer */}
        <div className="tutorial-footer">
          <button onClick={onClose} className="btn btn-solid w-full">
            <span>Got it, explore portfolio</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>

      <style>{`
        .tutorial-modal-box {
          max-width: 680px;
          background: #0b0f1a;
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.15);
          padding: 28px;
        }

        .tutorial-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .tutorial-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          font-size: 0.74rem;
          color: var(--accent-blue);
        }

        .tutorial-close-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
          color: var(--text-muted);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tutorial-close-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .tutorial-title {
          font-size: 1.45rem;
          margin-bottom: 8px;
        }

        .tutorial-sub {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .modes-comparison-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 640px) {
          .modes-comparison-grid {
            grid-template-columns: 1fr;
          }
        }

        .mode-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 18px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mode-card:hover {
          border-color: rgba(56, 189, 248, 0.4);
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.05);
        }

        .mode-card-active {
          border-color: var(--accent-blue);
          background: rgba(56, 189, 248, 0.06);
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.12);
        }

        .mode-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .mode-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-safe {
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: var(--accent-blue);
        }

        .icon-honest {
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: var(--accent-amber);
        }

        .mode-name {
          font-size: 0.95rem;
          color: #fff;
          font-weight: 700;
        }

        .mode-tagline {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .mode-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-bottom: 18px;
        }

        .mode-features-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-body);
          line-height: 1.45;
        }

        .tutorial-tip-box {
          background: #080c16;
          border: 1px dashed rgba(56, 189, 248, 0.3);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 0.78rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .tip-marker {
          color: var(--accent-blue);
          font-weight: 700;
        }

        .tutorial-footer {
          display: flex;
        }

        .text-cyan { color: var(--accent-blue); }
        .text-emerald { color: var(--accent-emerald); }
        .text-amber { color: var(--accent-amber); }
        .w-full { width: 100%; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
