import React from 'react';
import { educationList } from '../data/portfolioData';

export default function Education() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-eyebrow">Academic Background</div>
        <h2 className="section-heading">Education</h2>
        
        <div className="education-grid">
          {educationList.map((edu, idx) => (
            <div key={idx} className="card edu-card">
              <div className="edu-top-row">
                <h3 className="edu-degree">{edu.degree}</h3>
                <span className="edu-year font-mono">{edu.year}</span>
              </div>
              <div className="edu-school">
                <span>{edu.institution}</span>
                <span className="sep">•</span>
                <span className="edu-loc">{edu.location}</span>
              </div>
              <p className="edu-focus">{edu.focus}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .education-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        @media (max-width: 680px) {
          .education-grid {
            grid-template-columns: 1fr;
          }
        }

        .edu-card {
          padding: 22px;
        }

        .edu-top-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 4px;
        }

        .edu-degree {
          font-size: 1.05rem;
          color: #fff;
          font-weight: 600;
        }

        .edu-year {
          font-size: 0.78rem;
          color: var(--accent-blue);
        }

        .edu-school {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }

        .edu-focus {
          font-size: 0.88rem;
          color: var(--text-body);
          line-height: 1.5;
        }

        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
