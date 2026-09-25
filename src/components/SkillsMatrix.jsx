import React from 'react';
import { skillGroups } from '../data/portfolioData';

export default function SkillsMatrix() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <div className="section-eyebrow">Skills & Tooling</div>
        <h2 className="section-heading">Technical Stack</h2>
        <p className="section-subtext">
          Languages, frameworks, databases, and infrastructure I work with daily in production environments.
        </p>

        <div className="stack-grid">
          {skillGroups.map((grp) => (
            <div key={grp.group} className="card stack-card">
              <h3 className="stack-group-title font-mono">{grp.group}</h3>
              <div className="stack-pill-list">
                {grp.skills.map((skill) => (
                  <span key={skill} className="stack-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        @media (max-width: 820px) {
          .stack-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 520px) {
          .stack-grid {
            grid-template-columns: 1fr;
          }
        }

        .stack-card {
          padding: 22px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .stack-group-title {
          font-size: 0.85rem;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .stack-pill-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .stack-pill {
          font-size: 0.82rem;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-hairline);
          padding: 4px 10px;
          border-radius: var(--radius-xs);
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .stack-pill:hover {
          border-color: var(--border-muted);
          background: rgba(255, 255, 255, 0.07);
        }

        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
