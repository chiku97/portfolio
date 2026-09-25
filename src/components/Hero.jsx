import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  ArrowRight, 
  CornerDownRight, 
  Sparkles, 
  Terminal, 
  Flame,
  Bot,
  HelpCircle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import HeroFace from './HeroFace';
import { playClick, playSuccess } from '../utils/audio';

export default function Hero({ honestMode, onOpenResume, onOpenWalkthrough, onShowToast }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);

  const honestRoles = [
    "Begging Node.js garbage collection to actually collect garbage",
    "Explaining why SELECT * on 10M rows makes servers weep openly",
    "Adding 14 Redis caches because someone put a SQL query inside a loop",
    "Whispering sweet nothings to pgvector so it doesn't hallucinate invoices",
    "Never merging to main on Friday after 3:30 PM (I enjoy weekend sleep)",
    "Translating 'quick 5-minute task' into 3 sprints of technical debt",
    "Arguing with CSS flexbox because the div refuses to center itself"
  ];

  const proRoles = [
    "Full Stack & Backend Systems Engineer",
    "pgvector & Production RAG Architect",
    "High-Concurrency Platforms (10k+ Users)",
    "Multi-Tenant Retail Core (IRCTC & Axis Bank)"
  ];

  const rotatingRoles = honestMode ? honestRoles : proRoles;

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % rotatingRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [rotatingRoles.length]);

  const copyEmail = () => {
    playSuccess();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 }
    });
    onShowToast(`Copied ${personalInfo.email}`);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="section section-first hero-section">
      <div className="container">
        {/* AI Disclaimer & Interactive Walkthrough Callout */}
        <div id="hero-ai-badge" className="hero-top-announcement">
          <div className="ai-disclaimer-tag font-mono">
            <Bot size={13} className="text-cyan animate-pulse" />
            <span>🤖 Made with AI styling — judge my <strong>production SQL &amp; 10k QPS backend code</strong> instead!</span>
          </div>

          <button 
            onClick={() => { playClick(); onOpenWalkthrough(); }}
            className="walkthrough-btn-pill font-mono"
            title="Start interactive guided walkthrough of portfolio features"
          >
            <Sparkles size={12} className="text-amber" />
            <span>Portfolio Walkthrough</span>
            <ArrowRight size={12} className="pill-arrow" />
          </button>
        </div>

        {/* Split Layout: Content + Three.js 3D Viewport */}
        <div className="hero-split">
          <motion.div 
            className="hero-left"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Status Indicator */}
            <motion.div 
              className="status-indicator"
              whileHover={{ scale: 1.02 }}
            >
              <span className="live-dot"></span>
              <span className="status-label font-mono">
                {honestMode ? personalInfo.status.honest : personalInfo.status.pro}
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="hero-name">
              {personalInfo.name}
            </h1>

            {/* Animated Rotating Subtitle */}
            <div className="role-rotator-wrapper">
              <span className="role-prefix font-mono">&gt; </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${honestMode}-${roleIdx}`}
                  className="role-text font-mono"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {rotatingRoles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Bio */}
            <div className="hero-bio">
              <p>
                {honestMode ? personalInfo.bio.honest : personalInfo.bio.pro}
              </p>
            </div>

            {/* Production Rule / Dev Aside */}
            <motion.div 
              className="honest-banner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <CornerDownRight size={17} className="dev-aside-icon text-amber" />
              <div>
                <strong>{honestMode ? "☕ Dev Reality Check:" : "💡 Engineering Philosophy:"}</strong>{" "}
                {honestMode ? personalInfo.engineeringTruth.honest : personalInfo.engineeringTruth.pro}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="hero-actions">
              <motion.a 
                href="#projects" 
                onClick={playClick}
                className="btn btn-cyan btn-glow"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore Engineering Work</span>
                <ArrowRight size={14} />
              </motion.a>

              <motion.a 
                href="#rag-architecture" 
                onClick={playClick}
                className="btn btn-subtle"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles size={14} className="text-cyan" />
                <span>RAG Architecture Sandbox</span>
              </motion.a>

              <motion.button 
                onClick={copyEmail} 
                className="btn btn-subtle"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {copiedEmail ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copiedEmail ? "Copied Email!" : "Copy Email"}</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Interactive 3D Developer Avatar Face Showcase */}
          <motion.div 
            className="hero-right"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroFace honestMode={honestMode} onShowToast={onShowToast} />
          </motion.div>
        </div>

        {/* Live Metric Cards Grid with Hover Lift */}
        <div className="stats-strip">
          {personalInfo.stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="stat-card glass-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: "rgba(56, 189, 248, 0.45)" }}
            >
              <div className="stat-val font-mono gradient-title">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-detail">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 24px;
          padding-bottom: 60px;
        }

        .hero-top-announcement {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
          scroll-margin-top: 85px;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(56, 189, 248, 0.18);
          border-radius: var(--radius-full);
          padding: 6px 8px 6px 14px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
        }

        @media (max-width: 768px) {
          .hero-top-announcement {
            border-radius: var(--radius-md);
            padding: 10px 12px;
          }
        }

        .ai-disclaimer-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.77rem;
          color: #94a3b8;
          line-height: 1.4;
        }

        .ai-disclaimer-tag strong {
          color: #38bdf8;
          font-weight: 600;
        }

        .walkthrough-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.32);
          padding: 5px 12px;
          border-radius: var(--radius-full);
          color: #fef08a;
          font-size: 0.74rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .walkthrough-btn-pill:hover {
          background: rgba(245, 158, 11, 0.22);
          border-color: rgba(245, 158, 11, 0.6);
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.2);
        }

        .walkthrough-btn-pill:hover .pill-arrow {
          transform: translateX(2px);
        }

        .pill-arrow {
          transition: transform 0.15s ease;
        }

        .hero-split {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 36px;
          align-items: center;
          margin-bottom: 48px;
        }

        @media (max-width: 960px) {
          .hero-split {
            grid-template-columns: 1fr;
          }
        }

        .status-indicator {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          margin-bottom: 20px;
          cursor: default;
        }

        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-emerald);
          display: inline-block;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
          animation: pulseBeacon 2s infinite;
        }

        @keyframes pulseBeacon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }

        .status-label {
          font-size: 0.78rem;
          color: #a7f3d0;
          letter-spacing: 0.02em;
        }

        .hero-name {
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          line-height: 1.08;
          color: #fff;
          margin-bottom: 10px;
          font-weight: 800;
          letter-spacing: -0.035em;
        }

        .role-rotator-wrapper {
          display: flex;
          align-items: center;
          gap: 6px;
          min-height: 28px;
          margin-bottom: 20px;
        }

        .role-prefix {
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 1.05rem;
        }

        .role-text {
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .hero-bio {
          display: flex;
          flex-direction: column;
          gap: 12px;
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 620px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 26px;
        }

        .btn-glow {
          box-shadow: 0 0 25px rgba(56, 189, 248, 0.35);
        }

        .hero-right {
          width: 100%;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding-top: 32px;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 820px) {
          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-strip {
            grid-template-columns: 1fr;
          }
        }

        .stat-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-val {
          font-size: 2rem;
          font-weight: 800;
          line-height: 1.1;
        }

        .stat-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .stat-detail {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .text-amber { color: var(--accent-amber); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
