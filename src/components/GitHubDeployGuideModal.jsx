import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, GitFork, Sparkles, Terminal, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function GitHubDeployGuideModal({ isOpen, onClose, onShowToast }) {
  const [copiedStep, setCopiedStep] = useState(null);

  if (!isOpen) return null;

  const copyCode = (text, stepIndex) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepIndex);
    if (onShowToast) {
      onShowToast("Copied terminal command to clipboard");
    }
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: "Clone or Fork This Template",
      desc: "Clone this portfolio repository to your local machine and install packages:",
      command: `git clone https://github.com/chiku97/portfolio.git my-portfolio
cd my-portfolio
npm install`,
      bullets: [
        "Or click 'Fork' at github.com/chiku97/portfolio to create a direct copy in your own GitHub account.",
        "Pre-packaged with React 19, Vite, Three.js WebGL, Lucide icons, and Canvas-Confetti."
      ]
    },
    {
      num: 2,
      title: "Personalize with Your Details (Takes 5 Mins)",
      desc: "Customize your profile without touching complex layout code:",
      bullets: [
        "Open src/data/portfolioData.js: Replace name, bio, work history, projects, skills & social URLs.",
        "Replace images: Place your profile picture at public/uttam_avatar.jpg and your 3D avatar/chibi at public/uttam_chibi.jpg.",
        "Test locally — hot module reloading reflects all changes instantly:"
      ],
      command: `npm run dev`
    },
    {
      num: 3,
      title: "Push to Your Own GitHub Repository",
      desc: "Create an empty repository at github.com/new (e.g. 'yourname.github.io' or 'portfolio'), then link and push:",
      command: `# Link your personal repository (replace with your GitHub username & repo):
git remote set-url origin https://github.com/<your-username>/<your-repo-name>.git
git branch -M main
git push -u origin main`,
      bullets: [
        "Tip: Naming your repository <your-username>.github.io will host it at the root domain https://<your-username>.github.io/"
      ]
    },
    {
      num: 4,
      title: "Activate Free Automated GitHub Pages",
      desc: "Enable GitHub Pages in your newly created repository settings:",
      bullets: [
        "In your repo, go to: Settings > Pages (in the left sidebar).",
        "Under 'Build and deployment' > Source, select 'GitHub Actions'.",
        "Done! The included workflow (.github/workflows/deploy.yml) will automatically build your Vite bundle and publish your live website in ~60 seconds."
      ]
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content deploy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="deploy-header">
          <div>
            <div className="deploy-badge font-mono">
              <Sparkles size={12} className="text-cyan" />
              <span>OPEN SOURCE PORTFOLIO TEMPLATE</span>
            </div>
            <h3 className="deploy-title">Fork, Customize &amp; Deploy to GitHub Pages</h3>
            <p className="deploy-subtitle font-mono">Free hosting on github.io with automated GitHub Actions CI/CD</p>
          </div>
          <div className="deploy-header-actions">
            <a 
              href="https://github.com/chiku97/portfolio" 
              target="_blank" 
              rel="noreferrer" 
              className="btn btn-subtle btn-sm font-mono fork-btn"
              title="Open GitHub Repository"
            >
              <GithubIcon size={14} />
              <span>Fork on GitHub ↗</span>
            </a>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close" title="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="steps-list">
          {steps.map((st, idx) => (
            <div key={st.num} className="step-card">
              <div className="step-header">
                <span className="step-tag font-mono">Step {st.num}</span>
                <span className="step-name">{st.title}</span>
              </div>
              <p className="step-text">{st.desc}</p>

              {st.command && (
                <div className="step-code">
                  <pre>{st.command}</pre>
                  <button 
                    onClick={() => copyCode(st.command, idx)} 
                    className="btn btn-subtle btn-sm copy-code-btn"
                    title="Copy command to clipboard"
                  >
                    {copiedStep === idx ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                    <span>{copiedStep === idx ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              )}

              {st.bullets && (
                <ul className="step-bullets">
                  {st.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="note-box">
            <Globe size={18} className="text-blue" />
            <div>
              <strong>100% Free Hosting &amp; Zero Config:</strong>
              <div className="note-subtext">
                <code>vite.config.js</code> comes pre-configured with <code>base: './'</code> so relative assets work seamlessly whether deployed at the root domain or inside a repository subpath. The Dual-Tone switcher, 3D interactive avatar, RAG simulation sandbox, and PDF Resume modal are all production-ready out-of-the-box!
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .deploy-modal {
          max-width: 680px;
          max-height: 88vh;
          display: flex;
          flex-direction: column;
        }

        .deploy-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.22);
          padding: 2px 8px;
          border-radius: 9999px;
          margin-bottom: 6px;
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .deploy-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-hairline);
          margin-bottom: 16px;
          gap: 16px;
        }

        .deploy-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fork-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-color: rgba(56, 189, 248, 0.3);
          color: #e2e8f0;
          padding: 5px 10px;
          font-size: 0.76rem;
        }

        .fork-btn:hover {
          border-color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.1);
          color: #fff;
        }

        .deploy-title {
          font-size: 1.18rem;
          color: #fff;
          font-weight: 700;
          margin: 2px 0 4px;
        }

        .deploy-subtitle {
          font-size: 0.76rem;
          color: var(--accent-blue);
        }

        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow-y: auto;
          padding-right: 6px;
        }

        .steps-list::-webkit-scrollbar {
          width: 5px;
        }
        .steps-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .step-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 14px 16px;
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
          padding: 2px 8px;
          border-radius: var(--radius-xs);
          font-weight: 600;
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .step-name {
          font-size: 0.94rem;
          font-weight: 600;
          color: #fff;
        }

        .step-text {
          font-size: 0.84rem;
          color: var(--text-body);
          margin-bottom: 8px;
          line-height: 1.45;
        }

        .step-bullets {
          margin-left: 18px;
          margin-top: 8px;
          font-size: 0.8rem;
          color: #cbd5e1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          line-height: 1.45;
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
          font-size: 0.78rem;
          color: #cbd5e1;
          line-height: 1.5;
          overflow-x: auto;
          padding-right: 65px;
        }

        .copy-code-btn {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .note-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(56, 189, 248, 0.05);
          border: 1px solid rgba(56, 189, 248, 0.22);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          font-size: 0.82rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .note-subtext {
          margin-top: 4px;
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .note-box code {
          font-family: var(--font-mono);
          color: var(--accent-blue);
          background: rgba(0, 0, 0, 0.4);
          padding: 2px 5px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .text-blue { color: var(--accent-blue); }
        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
