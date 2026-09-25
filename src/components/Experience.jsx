import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, ChevronRight, Check, Flame } from 'lucide-react';
import { experiences } from '../data/portfolioData';
import { playClick } from '../utils/audio';

export default function Experience({ honestMode }) {
  const [activeCompany, setActiveCompany] = useState(experiences[0].id);

  const selectedExp = experiences.find((e) => e.id === activeCompany) || experiences[0];

  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-eyebrow">Work History</div>
        <h2 className="section-heading">Production Experience</h2>
        <p className="section-subtext">
          3+ years building and scaling backend microservices, database architectures, and search systems across RetailTech, EdTech, and Healthcare.
        </p>

        {honestMode && (
          <div className="honest-banner">
            <Flame size={18} className="text-amber" />
            <span><strong>☕ Brutally Honest Mode:</strong> Where the scars of production were earned and zero-downtime deploys became second nature.</span>
          </div>
        )}

        <div className="exp-layout">
          {/* Company Picker */}
          <div className="company-list">
            {experiences.map((exp) => (
              <motion.button
                key={exp.id}
                onClick={() => { playClick(); setActiveCompany(exp.id); }}
                className={`company-tab ${activeCompany === exp.id ? 'company-tab-active' : ''}`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="tab-left">
                  <span className="tab-name">{exp.company}</span>
                  <span className="tab-role-line font-mono">{exp.role}</span>
                </div>
                <span className="tab-period-badge font-mono">{exp.period.split('–')[0].trim()}</span>
              </motion.button>
            ))}
          </div>

          {/* Details Card with Smooth Framer Motion Switch */}
          <div className="glass-card exp-detail-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCompany}-${honestMode}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <div className="exp-header">
                  <div>
                    <div className="exp-title-row">
                      <h3 className="exp-role">{selectedExp.role}</h3>
                      <span className="badge-badge font-mono">{selectedExp.badge}</span>
                    </div>
                    <div className="exp-company-sub">
                      <span className="company-name">{selectedExp.company}</span>
                      <span className="sep">•</span>
                      <span className="company-loc font-mono">{selectedExp.location}</span>
                    </div>
                  </div>

                  <div className="exp-time-badge font-mono">
                    {selectedExp.period}
                  </div>
                </div>

                <p className="exp-overview">
                  {selectedExp.overview[honestMode ? 'honest' : 'pro']}
                </p>

                <div className="bullets-container">
                  <span className="bullets-title font-mono">
                    {honestMode ? "Behind The Scenes Deliverables:" : "Key Engineering Deliverables:"}
                  </span>
                  <ul className="bullets-list">
                    {selectedExp.bulletPoints.map((pt, idx) => (
                      <motion.li 
                        key={idx} 
                        className="bullet-row"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.3 }}
                      >
                        <span className="bullet-marker font-mono">▹</span>
                        <span className="bullet-text">
                          {typeof pt === 'object' ? pt[honestMode ? 'honest' : 'pro'] : pt}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="exp-stack">
                  <span className="stack-label font-mono">Environment & Technologies:</span>
                  <div className="stack-tags">
                    {selectedExp.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .exp-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: flex-start;
        }

        @media (max-width: 880px) {
          .exp-layout {
            grid-template-columns: 1fr;
          }
        }

        .company-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 880px) {
          .company-list {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
          }
        }

        .company-tab {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: rgba(14, 20, 38, 0.7);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          text-align: left;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        @media (max-width: 880px) {
          .company-tab {
            min-width: 240px;
          }
        }

        .company-tab:hover {
          border-color: rgba(0, 240, 255, 0.3);
          background: rgba(20, 28, 54, 0.9);
        }

        .company-tab-active {
          border-color: var(--accent-cyan);
          background: rgba(20, 28, 54, 0.95);
          border-left: 3px solid var(--accent-cyan);
          box-shadow: 0 4px 20px rgba(0, 240, 255, 0.15);
        }

        .tab-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .tab-name {
          font-size: 0.92rem;
          font-weight: 700;
          color: #fff;
        }

        .tab-role-line {
          font-size: 0.76rem;
          color: var(--accent-cyan);
        }

        .tab-period-badge {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .exp-detail-card {
          padding: 32px;
          min-height: 420px;
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 18px;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .exp-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .exp-role {
          font-size: 1.35rem;
          color: #fff;
          font-weight: 700;
        }

        .badge-badge {
          font-size: 0.72rem;
          color: var(--accent-emerald);
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 2px 8px;
          border-radius: var(--radius-full);
        }

        .exp-company-sub {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .company-name {
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .exp-time-badge {
          font-size: 0.78rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
        }

        .exp-overview {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.68;
          margin-bottom: 24px;
        }

        .bullets-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 26px;
        }

        .bullets-title {
          font-size: 0.76rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .bullets-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .bullet-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.92rem;
          line-height: 1.55;
          color: #e2e8f0;
        }

        .bullet-marker {
          color: var(--accent-cyan);
          font-size: 0.82rem;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .exp-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 20px;
          border-top: 1px solid var(--border-subtle);
        }

        .stack-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .text-amber { color: var(--accent-amber); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
