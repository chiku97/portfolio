import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe } from 'lucide-react';

export default function GitHubDeployGuideModal({ isOpen, onClose, onShowToast }) {
  const [copiedStep, setCopiedStep] = useState(null);

  if (!isOpen) return null;

  const copyCode = (text, stepIndex) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    onShowToast("Copied terminal command to clipboard");
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: "Create a GitHub Repository",
      desc: "Go to github.com/new and create a new repository:",
      bullets: [
        "Repository name: chiku97.github.io (will deploy to https://chiku97.github.io)",
        "Or: portfolio (will deploy to https://chiku97.github.io/portfolio)"
      ]
    },
    {
      num: 2,
      title: "Push Code to GitHub",
      desc: "Run these standard git commands in this directory:",
      command: `git add .
git commit -m "feat: launch full-stack engineer portfolio"
git branch -M main
git remote add origin https://github.com/chiku97/portfolio.git
git push -u origin main`
    },
    {
      num: 3,
      title: "Activate Free GitHub Pages",
      desc: "In your GitHub repository settings:",
      bullets: [
        "Navigate to Settings > Pages",
        "Under 'Build and deployment' > Source, select 'GitHub Actions'",
        "The pre-configured workflow (.github/workflows/deploy.yml) will trigger immediately and host your portfolio for free!"
      ]
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content deploy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="deploy-header">
          <div>
            <h3 className="deploy-title">Deploy Free to GitHub Pages</h3>
            <p className="deploy-subtitle font-mono">Automated CI/CD via GitHub Actions</p>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="steps-list">
          {steps.map((st, idx) => (
            <div key={st.num} className="step-card">
              <div className="step-header">
                <span className="step-tag font-mono">Step {st.num}</span>
                <span className="step-name">{st.title}</span>
              </div>
              <p className="step-text">{st.desc}</p>

              {st.bullets && (
                <ul className="step-bullets">
                  {st.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {st.command && (
                <div className="step-code">
                  <pre>{st.command}</pre>
                  <button 
                    onClick={() => copyCode(st.command, idx)} 
                    className="btn btn-subtle btn-sm copy-code-btn"
                  >
                    {copiedStep === idx ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                    <span>{copiedStep === idx ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="note-box">
            <Globe size={16} className="text-blue" />
            <span>
              <strong>Base URL Ready:</strong> <code>vite.config.js</code> has already been configured with <code>base: './'</code> so assets resolve properly whether deployed at the root domain or a repository subpath.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .deploy-modal {
          max-width: 640px;
        }

        .deploy-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-hairline);
          margin-bottom: 20px;
        }

        .deploy-title {
          font-size: 1.15rem;
          color: #fff;
          font-weight: 700;
        }

        .deploy-subtitle {
          font-size: 0.78rem;
          color: var(--accent-blue);
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 16px;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .step-tag {
          font-size: 0.72rem;
          color: var(--accent-blue);
          background: var(--accent-blue-subtle);
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          font-weight: 600;
        }

        .step-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
        }

        .step-text {
          font-size: 0.85rem;
          color: var(--text-body);
          margin-bottom: 8px;
        }

        .step-bullets {
          margin-left: 18px;
          font-size: 0.82rem;
          color: #cbd5e1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .step-code {
          position: relative;
          background: #07090e;
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 12px 14px;
          margin-top: 8px;
        }

        .step-code pre {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .copy-code-btn {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .note-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(56, 189, 248, 0.05);
          border: 1px solid rgba(56, 189, 248, 0.2);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 0.82rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .note-box code {
          font-family: var(--font-mono);
          color: var(--accent-blue);
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 5px;
          border-radius: var(--radius-xs);
        }

        .text-blue { color: var(--accent-blue); }
        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
