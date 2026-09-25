import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';

export default function MobileWarningModal({ isOpen, onClose, onShowToast }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDismiss = () => {
    playClick();
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mobile_desktop_notice_dismissed', 'true');
    }
    onClose();
  };

  const handleCopyLink = () => {
    playSuccess();
    const url = typeof window !== 'undefined' ? (window.location.href) : 'https://chiku97.github.io/portfolio/';
    navigator.clipboard.writeText(url);
    setCopied(true);
    if (onShowToast) {
      onShowToast("📋 Link copied! Send it via WhatsApp or Slack to open on your desktop 🚀");
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop mobile-warning-backdrop" onClick={handleDismiss}>
      <div 
        className="modal-content mobile-warning-modal" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Animated Accent Bar */}
        <div className="mobile-accent-stripe"></div>

        {/* Modal Header */}
        <div className="mobile-warning-header">
          <div className="mobile-badge font-mono">
            <AlertTriangle size={12} className="text-amber" />
            <span>DESKTOP / PC RECOMMENDED</span>
          </div>
          <button 
            onClick={handleDismiss} 
            className="modal-close-btn" 
            aria-label="Close modal"
            title="Dismiss notice"
          >
            <X size={18} />
          </button>
        </div>

        {/* Visual Device Contrast Graphic */}
        <div className="device-graphic-row">
          <div className="device-icon-box device-phone">
            <Smartphone size={24} className="text-muted" />
            <span className="device-label font-mono">6" Mobile</span>
            <span className="device-status font-mono text-amber">LIMITED FPS</span>
          </div>

          <div className="device-vs-arrow">
            <ArrowRight size={18} className="text-cyan animate-pulse" />
          </div>

          <div className="device-icon-box device-desktop">
            <Monitor size={28} className="text-cyan" />
            <span className="device-label font-mono">PC / MacBook</span>
            <span className="device-status font-mono text-emerald">100% POWER</span>
          </div>
        </div>

        {/* Main Funny Content */}
        <div className="mobile-warning-body">
          <h3 className="mobile-warning-title">
            Whoa there, mobile warrior! 📱
          </h3>
          <p className="mobile-warning-lead">
            You just brought a pocket screen to a heavy-duty systems engineering showcase.
          </p>

          <p className="mobile-warning-sarcasm">
            While this portfolio is 100% responsive, <strong>you cannot experience its full potential on a phone</strong>. Here's what's getting squished:
          </p>

          {/* Funny Checklist */}
          <div className="missing-features-list">
            <div className="missing-item">
              <div className="missing-icon"><Cpu size={15} className="text-cyan" /></div>
              <div className="missing-text">
                <strong>3D WebGL Neural Space &amp; Mouse Parallax:</strong>
                <span>Your thumbs are physically blocking the Three.js vector particle cloud and the interactive 3D Chibi avatar tilt card.</span>
              </div>
            </div>

            <div className="missing-item">
              <div className="missing-icon"><Layers size={15} className="text-violet" /></div>
              <div className="missing-text">
                <strong>Hybrid RAG &amp; Vector Simulator:</strong>
                <span>Inspecting Elasticsearch BM25 fuzzy tokenization and PostgreSQL pgvector cosine matrices on a 400px screen is like reading SQL on a microwave display.</span>
              </div>
            </div>

            <div className="missing-item">
              <div className="missing-icon"><Terminal size={15} className="text-amber" /></div>
              <div className="missing-text">
                <strong>Interactive Developer CLI Shell:</strong>
                <span>Simulating a catastrophic Friday 5:00 PM <code>deploy-prod</code> incident without the visceral clack of mechanical keyboard keys feels spiritually incomplete.</span>
              </div>
            </div>
          </div>

          {/* Recruiter Callout */}
          <div className="recruiter-box font-mono">
            <span>👔 Recruiter on your morning commute?</span> Bookmark this link or send it to your work laptop for your afternoon screening session!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mobile-warning-actions">
          <button 
            onClick={handleCopyLink} 
            className="btn btn-primary copy-pc-btn font-mono"
          >
            {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
            <span>{copied ? "Link Copied to Clipboard!" : "Copy Link to Open on PC"}</span>
          </button>

          <button 
            onClick={handleDismiss} 
            className="btn btn-subtle continue-btn font-mono"
          >
            <span>I have fast thumbs (Explore on Mobile) →</span>
          </button>
        </div>
      </div>

      <style>{`
        .mobile-warning-backdrop {
          z-index: 100005 !important;
          background: rgba(3, 7, 18, 0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .mobile-warning-modal {
          max-width: 520px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          background: rgba(11, 16, 30, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            0 0 35px rgba(56, 189, 248, 0.18);
          border-radius: var(--radius-md);
          padding: 22px 20px;
          animation: mobileModalEnter 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes mobileModalEnter {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(15px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .mobile-accent-stripe {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #38bdf8, #818cf8, #f59e0b);
        }

        .mobile-warning-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .mobile-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          color: var(--accent-amber);
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.28);
          padding: 3px 8px;
          border-radius: 9999px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .device-graphic-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          margin-bottom: 16px;
        }

        .device-icon-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
          padding: 8px;
          border-radius: var(--radius-xs);
        }

        .device-phone {
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.12);
        }

        .device-desktop {
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.1);
        }

        .device-label {
          font-size: 0.76rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .device-status {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .device-vs-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-warning-title {
          font-size: 1.25rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 6px;
          line-height: 1.3;
        }

        .mobile-warning-lead {
          font-size: 0.88rem;
          color: var(--accent-cyan);
          margin-bottom: 10px;
          font-weight: 500;
          line-height: 1.45;
        }

        .mobile-warning-sarcasm {
          font-size: 0.82rem;
          color: var(--text-body);
          margin-bottom: 14px;
          line-height: 1.5;
        }

        .missing-features-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 16px;
        }

        .missing-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: var(--radius-xs);
          padding: 9px 12px;
        }

        .missing-icon {
          margin-top: 2px;
          flex-shrink: 0;
        }

        .missing-text {
          font-size: 0.78rem;
          line-height: 1.45;
          color: #cbd5e1;
        }

        .missing-text strong {
          display: block;
          color: #f8fafc;
          margin-bottom: 2px;
        }

        .recruiter-box {
          background: rgba(56, 189, 248, 0.06);
          border: 1px dashed rgba(56, 189, 248, 0.3);
          border-radius: var(--radius-xs);
          padding: 10px 12px;
          font-size: 0.75rem;
          color: #e2e8f0;
          line-height: 1.45;
          margin-bottom: 18px;
        }

        .recruiter-box span {
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .mobile-warning-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .copy-pc-btn {
          width: 100%;
          justify-content: center;
          padding: 11px 16px;
          font-size: 0.84rem;
          font-weight: 600;
          background: linear-gradient(135deg, #0284c7, #2563eb);
          border: 1px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }

        .copy-pc-btn:hover {
          background: linear-gradient(135deg, #0369a1, #1d4ed8);
        }

        .continue-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.78rem;
          padding: 9px 14px;
          color: #94a3b8;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .continue-btn:hover {
          color: #f8fafc;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .text-amber { color: var(--accent-amber); }
        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .text-violet { color: #a78bfa; }
        .text-muted { color: #64748b; }
      `}</style>
    </div>
  );
}
