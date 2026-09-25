import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Terminal, Code2, Cpu, Coffee, Check, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playSuccess } from '../utils/audio';

export default function HeroFace({ honestMode, onShowToast }) {
  const [clickCount, setClickCount] = useState(0);
  const [thoughtIdx, setThoughtIdx] = useState(0);
  const cardRef = useRef(null);

  // 3D Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 260, damping: 24 });
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const honestThoughts = [
    "Currently wondering why the CSS is 4MB when the button is literally a rectangle...",
    "Code compiled without warnings on first try. Very suspicious. Someone call an exorcist.",
    "99 little bugs in the code. Fix one, 147 little bugs in the code.",
    "Friday 4:59 PM: 'Just a tiny one-line config change in production, what could go wrong?'",
    "Yes, I know you asked ChatGPT. No, ChatGPT doesn't know our production database credentials.",
    "The staging environment has been broken for 6 months and at this point we're all afraid to touch it.",
    "Caffeine level: 96%. Approaching the velocity required to rewrite this entire codebase in Rust."
  ];

  const proThoughts = [
    "Architecting scalable multi-tenant Node & pgvector retrieval pipelines.",
    "Optimizing database query latency from 320ms down to 18ms.",
    "Hardening microservices for 10k+ concurrent user evaluation load.",
    "Strict tenant boundary isolation across Axis Bank & IRCTC retail cores.",
    "Continuous automated testing with zero-downtime rolling deployments."
  ];

  const thoughts = honestMode ? honestThoughts : proThoughts;

  const handleFaceClick = () => {
    playSuccess();
    setClickCount((prev) => prev + 1);
    setThoughtIdx((prev) => (prev + 1) % thoughts.length);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.4 }
    });
    if (onShowToast) {
      onShowToast(honestMode ? "☕ Dev thought synced!" : "💡 Engineering thought synced!");
    }
  };

  return (
    <div 
      id="hero-chibi-card"
      className="hero-face-container"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="face-card-perspective"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Holographic Glowing Frame */}
        <div className="face-card-inner" onClick={handleFaceClick}>
          {/* Specular Interactive Glare */}
          <motion.div 
            className="card-glare"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(56, 189, 248, 0.22) 0%, transparent 65%)`
            }}
          />

          {/* Top Telemetry Bar */}
          <div className="face-telemetry-bar">
            <div className="telemetry-left">
              <span className="live-pulse-dot"></span>
              <span className="telemetry-tag font-mono">CHIBI_3D // UTTAM</span>
            </div>
            <div className="telemetry-right font-mono">
              <span className="badge-3d-indicator">3D ACTIVE</span>
              <span className="sep">•</span>
              <span className="coord-text">BANGALORE</span>
            </div>
          </div>

          {/* The Face Avatar Image */}
          <div className="avatar-image-frame">
            <img 
              src="./uttam_chibi.jpg" 
              alt="Uttam Kumar Mahto - 3D Chibi Developer Avatar"
              className="avatar-face-img"
              loading="eager"
            />
            <div className="avatar-ambient-vignette"></div>
          </div>

          {/* Floating Interactive Thought Balloon */}
          <motion.div 
            key={`${honestMode}-${thoughtIdx}`}
            className="face-thought-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="thought-header">
              <span className="thought-icon">{honestMode ? "☕" : "💡"}</span>
              <span className="thought-author font-mono">
                {honestMode ? "Uttam's Brain (Unfiltered)" : "Engineering Insight"}
              </span>
            </div>
            <p className="thought-content">
              "{thoughts[thoughtIdx]}"
            </p>
            <span className="thought-hint font-mono">[click face to cycle thoughts]</span>
          </motion.div>

          {/* Floating Technology Pills */}
          <div className="face-floating-pills">
            <motion.div 
              className="tech-badge badge-left"
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            >
              <Cpu size={12} className="badge-icon text-cyan" />
              <span>pgvector RAG</span>
            </motion.div>

            <motion.div 
              className="tech-badge badge-right"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.3 }}
            >
              <Code2 size={12} className="badge-icon text-violet" />
              <span>Full Stack Node/React</span>
            </motion.div>
          </div>

          {/* Bottom Card Footer */}
          <div className="face-card-footer font-mono">
            <div className="footer-status-pill">
              <span className="status-label">SPECIALTY:</span>
              <span className="status-val">High-Throughput Backends</span>
            </div>
            <div className="clicks-counter" title="Total clicks on Uttam's face">
              <Heart size={11} className="heart-icon text-rose" />
              <span>{clickCount}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero-face-container {
          perspective: 1200px;
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          user-select: none;
        }

        .face-card-perspective {
          position: relative;
          width: 100%;
          cursor: pointer;
        }

        .face-card-inner {
          position: relative;
          background: rgba(11, 16, 30, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: var(--radius-lg);
          padding: 16px;
          box-shadow: 
            0 24px 60px -15px rgba(0, 0, 0, 0.85), 
            0 0 30px rgba(56, 189, 248, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
          overflow: hidden;
          transform-style: preserve-3d;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .face-card-inner:hover {
          border-color: rgba(56, 189, 248, 0.55);
          box-shadow: 
            0 30px 75px -15px rgba(0, 0, 0, 0.95), 
            0 0 45px rgba(56, 189, 248, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .card-glare {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 10;
          border-radius: var(--radius-lg);
        }

        /* Telemetry Header */
        .face-telemetry-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 12px;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
          color: var(--text-secondary);
          transform: translateZ(36px);
        }

        .telemetry-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .live-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 8px var(--accent-emerald);
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .telemetry-tag {
          color: var(--accent-blue);
          font-weight: 700;
          letter-spacing: 0.04em;
        }

        .telemetry-right {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
        }

        .badge-3d-indicator {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: var(--accent-blue);
          padding: 1px 6px;
          border-radius: var(--radius-full);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .coord-text {
          color: #94a3b8;
        }

        /* Avatar Face Frame */
        .avatar-image-frame {
          position: relative;
          width: 100%;
          height: 410px;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: #060912;
          transform: translateZ(24px);
        }

        @media (max-width: 480px) {
          .avatar-image-frame {
            height: 330px;
          }
        }

        .avatar-face-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .face-card-inner:hover .avatar-face-img {
          transform: scale(1.03);
        }

        .avatar-ambient-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(11, 16, 30, 0.08) 0%,
            transparent 30%,
            transparent 65%,
            rgba(11, 16, 30, 0.8) 100%
          );
          pointer-events: none;
        }

        /* Floating Thought Bubble */
        .face-thought-bubble {
          position: absolute;
          bottom: 60px;
          left: 20px;
          right: 20px;
          background: rgba(10, 14, 26, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
          z-index: 5;
          transform: translateZ(68px);
        }

        .thought-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .thought-icon {
          font-size: 0.9rem;
        }

        .thought-author {
          font-size: 0.72rem;
          color: var(--accent-amber);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .thought-content {
          font-size: 0.82rem;
          color: #f1f5f9;
          line-height: 1.45;
          font-style: italic;
          margin-bottom: 4px;
        }

        .thought-hint {
          font-size: 0.68rem;
          color: var(--text-muted);
          display: block;
        }

        /* Floating Tech Badges */
        .face-floating-pills {
          position: absolute;
          top: 70px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
          z-index: 4;
          transform: translateZ(55px);
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(10, 15, 28, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.72rem;
          font-family: var(--font-mono);
          color: #f8fafc;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .badge-icon {
          flex-shrink: 0;
        }

        /* Footer */
        .face-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 0.72rem;
          transform: translateZ(32px);
        }

        .footer-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-label {
          color: var(--text-muted);
        }

        .status-val {
          color: var(--accent-blue);
          font-weight: 600;
        }

        .clicks-counter {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .text-cyan { color: var(--accent-blue); }
        .text-violet { color: var(--accent-violet); }
        .text-rose { color: var(--accent-rose); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
