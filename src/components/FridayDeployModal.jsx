import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, X, Flame, ShieldAlert, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playAlarm, playSuccess, playClick } from '../utils/audio';

export default function FridayDeployModal({ isOpen, onClose }) {
  const [phase, setPhase] = useState('idle'); // 'idle' | 'deploying' | 'saved'
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setPhase('idle');
      setLogs([]);
    }
  }, [isOpen]);

  const startEmergencyDeploy = () => {
    playAlarm();
    setPhase('deploying');
    setLogs(["[17:00:01] ⚠️ Initiating high-risk deploy on Friday at 5:00 PM..."]);

    const sequence = [
      { delay: 600, text: "[17:00:02] Building Docker image 'backend-api:v2.4.1'..." },
      { delay: 1200, text: "[17:00:03] Incoming peak shopping traffic surge detected on AWS clusters!" },
      { delay: 1800, text: "[17:00:04] Automated CI/CD gates intercepted deployment (Drone CI)..." },
      { delay: 2400, text: "[17:00:05] Running Mocha & Chai backend regression suite... 142/142 PASSED" },
      { delay: 3000, text: "[17:00:06] Running Cypress end-to-end integration tests... ALL PASSED" },
      { delay: 3600, text: "[17:00:07] Zero-downtime rolling deployment initialized on AWS EC2..." },
      { delay: 4200, text: "[17:00:08] Nginx reverse proxy routes traffic. Health check: 200 OK." },
      { delay: 4800, text: "🎉 PRODUCTION STABLE! 0 downtime, 0 dropped sessions, 0 panic." }
    ];

    sequence.forEach(({ delay, text }) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, text]);
      }, delay);
    });

    setTimeout(() => {
      setPhase('saved');
      playSuccess();
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    }, 5000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className={`modal-box friday-modal ${phase === 'deploying' ? 'shake-modal' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="friday-header">
          <div className="friday-title-group">
            <div className={`danger-icon-box ${phase === 'saved' ? 'box-saved' : ''}`}>
              {phase === 'saved' ? <CheckCircle size={22} /> : <AlertTriangle size={22} />}
            </div>
            <div>
              <h3 className="friday-modal-title">
                {phase === 'saved' ? "Production Is 100% Safe!" : "⚠️ Friday 5:00 PM Deploy Simulator"}
              </h3>
              <p className="friday-modal-sub font-mono">
                {phase === 'saved' 
                  ? "Automated test suites & CI/CD saved the weekend." 
                  : "Every software engineer's worst nightmare... or is it?"}
              </p>
            </div>
          </div>
          <button onClick={() => { playClick(); onClose(); }} className="friday-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="friday-body">
          {phase === 'idle' && (
            <div className="idle-state">
              <div className="warning-banner">
                <ShieldAlert size={18} />
                <span>WARNING: The weekend starts in 10 minutes. Management asked for a 'quick small hotfix'.</span>
              </div>
              <p className="idle-text">
                Most developers panic at Friday deployments. But Uttam builds systems with 
                <strong> automated CI/CD pipelines, Cypress E2E tests, Mocha unit tests, and Docker containerization</strong>.
              </p>
              <button onClick={startEmergencyDeploy} className="btn btn-danger-glow w-full btn-lg">
                <Flame size={17} />
                <span>Trigger Friday 5 PM Deployment</span>
              </button>
            </div>
          )}

          {phase === 'deploying' && (
            <div className="deploying-state">
              <div className="terminal-log-box font-mono">
                {logs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    {log}
                  </div>
                ))}
              </div>
              <div className="deploy-loader font-mono">
                <Zap size={15} className="spin-fast text-amber" />
                <span>Verifying test gates and container healthchecks...</span>
              </div>
            </div>
          )}

          {phase === 'saved' && (
            <div className="saved-state">
              <div className="terminal-log-box font-mono">
                {logs.map((log, idx) => (
                  <div key={idx} className="log-line">
                    {log}
                  </div>
                ))}
              </div>
              <div className="saved-verdict">
                <h4>Why Hiring Uttam Is The Safe Bet:</h4>
                <p>
                  Because when you write clean architectures, automated regression suites, and Dockerized rollouts, 
                  deploying code is routine engineering, not an existential crisis.
                </p>
                <div className="saved-actions">
                  <a 
                    href="#contact" 
                    onClick={() => { playClick(); onClose(); }} 
                    className="btn btn-cyan"
                  >
                    Hire Uttam Kumar Mahto
                  </a>
                  <button 
                    onClick={() => { playClick(); setPhase('idle'); }} 
                    className="btn btn-subtle"
                  >
                    Run Test Again
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .friday-modal {
          max-width: 620px;
          border-color: rgba(244, 63, 94, 0.4);
        }

        .shake-modal {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }

        .friday-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 18px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 18px;
        }

        .friday-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .danger-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(244, 63, 94, 0.15);
          border: 1px solid rgba(244, 63, 94, 0.35);
          color: #f43f5e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .box-saved {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.35);
          color: #10b981;
        }

        .friday-modal-title {
          font-size: 1.2rem;
          color: #fff;
          font-weight: 700;
        }

        .friday-modal-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .friday-close-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .warning-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fbbf24;
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          font-size: 0.86rem;
          margin-bottom: 16px;
        }

        .idle-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .terminal-log-box {
          background: #080c18;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          padding: 14px;
          font-size: 0.8rem;
          min-height: 200px;
          max-height: 240px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #e2e8f0;
          margin-bottom: 16px;
        }

        .log-line {
          line-height: 1.45;
        }

        .deploy-loader {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #fbbf24;
        }

        .saved-verdict {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: var(--radius-sm);
          padding: 18px;
        }

        .saved-verdict h4 {
          color: #34d399;
          font-size: 1.05rem;
          margin-bottom: 6px;
        }

        .saved-verdict p {
          color: #cbd5e1;
          font-size: 0.88rem;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .saved-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-lg {
          padding: 12px 24px;
          font-size: 0.95rem;
        }
        .w-full { width: 100%; }
        .text-amber { color: #f59e0b; }
      `}</style>
    </div>
  );
}
