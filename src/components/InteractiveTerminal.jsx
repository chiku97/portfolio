import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playClick, playKeypress, playSuccess, playAlarm } from '../utils/audio';

export default function InteractiveTerminal({ onShowToast, onOpenFridayDeploy }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `🚀 Production Node Shell v3.4.1 (x86_64-cloud-linux)\nType "help" or click any suggested commands below to explore.`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const commandDatabase = {
    help: `Available commands:
  • bio           - Who am I? (The quick rundown)
  • skills        - Core technical superpowers
  • why-hire      - 5 brutally honest reasons to hire me
  • rag-demo      - How my RAG + pgvector pipeline works
  • git-blame     - Inspect the last 2 AM commit
  • coffee        - Check current caffeine levels
  • deploy-prod   - Attempt a dangerous Friday 5:00 PM deploy
  • sudo hire     - Trigger recruitment fast-track & celebration
  • clear         - Clear the terminal screen`,

    bio: `========================================================
UTTAM KUMAR MAHTO - Full Stack & Backend Systems Engineer
========================================================
📍 Location: Bangalore, Karnataka, India
💼 Current: Sanpbizz CloudTech Pvt. Ltd. (Full Stack Developer)
🎓 Education: MCA (2022, Reva University) | B.Sc IT (2019)
⚡ Speciality: Scalable Node/React backends, Multi-tenancy,
             pgvector RAG pipelines, Elasticsearch fuzzy search.
☕ Philosophy: If it's not tested and automated, it doesn't exist.`,

    skills: `[TECH ARSENAL]
Languages : JavaScript (ES6+), TypeScript, Ruby, SQL
Backend   : Node.js, Express.js, Ruby on Rails, REST APIs, RBAC
AI & RAG  : pgvector, Elasticsearch, Hybrid Rerank, OpenAI/Gemini
Databases : PostgreSQL, MySQL, Redis, MongoDB
DevOps    : Docker, AWS (EC2/S3), Drone CI, Jenkins, Nginx
Testing   : Cypress, Mocha, Chai, Jest, Postman
Monitoring: Grafana, New Relic`,

    "why-hire": `[5 REASONS TO HIRE ME]
1. Doesn't write 'SELECT *' on tables with 10 million rows.
2. Built RAG pipelines that actually work in production (hybrid search with pgvector & Elasticsearch).
3. Handled 10k+ concurrent examinees without server meltdown.
4. Understands the full stack: from React UI down to SQL queries and Docker containers.
5. Has great humor, zero ego, and actually documents code.`,

    "rag-demo": `[RAG PIPELINE FLOW: INVOICE & PRODUCT SEARCH]
User Query: "Find invoices with misspellings or semantic SKU matches"
 ├── Step 1: Lexical Search -> Elasticsearch (fuzzy matching, fuzziness: AUTO)
 ├── Step 2: Semantic Search -> pgvector cosine similarity via embeddings
 ├── Step 3: Fusion -> Reciprocal Rank Fusion (RRF) reranker
 ├── Step 4: Grounding -> Context injected into OpenAI / Gemini prompt
 └── Output -> 100% grounded response with exact citations & 0 hallucination.`,

    "git-blame": `commit a7f903e1c2b5d4 (HEAD -> main)
Author: Uttam Kumar Mahto <uttamkumar9708@gmail.com>
Date:   Thu 02:47:19 +0530
    "fix: resolved race condition in inventory lock that only appeared during flash sales"
Status: Verified by 42 passing unit tests.`,

    coffee: `[CAFFEINE MONITOR]
Status: OPERATIONAL (87% capacity)
Refill Rate: 2 espressos / sprint
Warning: Do not approach if caffeine drops below 15%.`,

    "deploy-prod": `⚠️ WARNING: INITIATING PRODUCTION DEPLOYMENT AT 5:00 PM ON A FRIDAY...
[SYSTEM] Checking CI/CD pipeline...
[SYSTEM] Running Cypress E2E test suite... [PASS]
[SYSTEM] Running Mocha/Chai backend unit tests... [PASS]
[SYSTEM] Rolling update started with zero downtime...
[RESULT] Production updated safely! (Because I write automated tests.)`,

    "sudo hire": `🎉 PERMISSION GRANTED!
Initializing VIP candidate onboarding sequence...
Direct Email: uttamkumar9708@gmail.com
Phone: +91-8147747120
LinkedIn: https://linkedin.com/in/uttam-kumar-mahto-2b476717a
Confetti cannon fired!`
  };

  const runCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;

    playKeypress();
    const lower = raw.toLowerCase();
    const newEntry = { type: 'user', command: raw };
    const updatedHistory = [...history, newEntry];

    if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'sudo hire' || lower === 'hire') {
      playSuccess();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      onShowToast("🎉 Excellent choice! Connecting to me...");
      updatedHistory.push({
        type: 'output',
        text: commandDatabase["sudo hire"]
      });
    } else if (lower === 'deploy-prod') {
      playAlarm();
      updatedHistory.push({
        type: 'output',
        text: commandDatabase["deploy-prod"]
      });
      if (onOpenFridayDeploy) {
        setTimeout(onOpenFridayDeploy, 600);
      }
    } else if (commandDatabase[lower]) {
      playSuccess();
      updatedHistory.push({
        type: 'output',
        text: commandDatabase[lower]
      });
    } else {
      updatedHistory.push({
        type: 'error',
        text: `bash: command not found: "${raw}". Type "help" or click any suggestion chip.`
      });
    }

    setHistory(updatedHistory);
    setInputVal('');
  };

  const suggestions = [
    { label: "help", cmd: "help" },
    { label: "bio", cmd: "bio" },
    { label: "why-hire", cmd: "why-hire" },
    { label: "rag-demo", cmd: "rag-demo" },
    { label: "git-blame", cmd: "git-blame" },
    { label: "coffee", cmd: "coffee" },
    { label: "deploy-prod", cmd: "deploy-prod", alert: true },
    { label: "sudo hire", cmd: "sudo hire", special: true },
  ];

  return (
    <section id="terminal" className="section">
      <div className="container">
        <div className="section-eyebrow">Interactive Shell</div>
        <h2 className="section-heading">Developer <span className="gradient-title">CLI Terminal</span></h2>
        <p className="section-subtext">
          Recruiters browse graphical UI. Engineers test the CLI. Run real commands to inspect system design philosophies, caffeine levels, and architecture proofs.
        </p>

        <div id="terminal-window-card" className="terminal-window glass-card">
          {/* Header */}
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="terminal-title font-mono">
              <TerminalIcon size={13} className="text-cyan" />
              <span>uttam@production-node: ~/portfolio (main)</span>
            </div>
            <button 
              onClick={() => { playClick(); setHistory([]); }} 
              className="terminal-clear font-mono"
              title="Clear Terminal"
            >
              <Trash2 size={12} />
              <span>clear</span>
            </button>
          </div>

          {/* Terminal Body */}
          <div className="terminal-body" ref={terminalBodyRef} onClick={() => inputRef.current?.focus()}>
            {history.map((item, index) => (
              <div key={index} className="terminal-line">
                {item.type === 'system' && (
                  <div className="terminal-sys-msg font-mono">{item.text}</div>
                )}
                {item.type === 'user' && (
                  <div className="terminal-cmd font-mono">
                    <span className="prompt-user">uttam@node</span>
                    <span className="prompt-sep">:</span>
                    <span className="prompt-path">~</span>
                    <span className="prompt-char">$</span>
                    <span className="prompt-txt">{item.command}</span>
                  </div>
                )}
                {item.type === 'output' && (
                  <pre className="terminal-out font-mono">{item.text}</pre>
                )}
                {item.type === 'error' && (
                  <div className="terminal-err font-mono">{item.text}</div>
                )}
              </div>
            ))}

            {/* Active input line */}
            <div className="terminal-active-line font-mono">
              <span className="prompt-user">uttam@node</span>
              <span className="prompt-sep">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-char">$</span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  playKeypress();
                  if (e.key === 'Enter') runCommand(inputVal);
                }}
                placeholder="type a command (e.g. why-hire, bio, sudo hire)..."
                autoComplete="off"
                spellCheck="false"
              />
              <button onClick={() => runCommand(inputVal)} className="terminal-enter-btn">
                <CornerDownLeft size={13} />
              </button>
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="terminal-footer">
            <span className="footer-tag font-mono">Execute:</span>
            <div className="footer-chips">
              {suggestions.map((s) => (
                <button
                  key={s.cmd}
                  onClick={() => { playClick(); runCommand(s.cmd); }}
                  className={`chip-btn font-mono ${s.special ? 'chip-special' : ''} ${s.alert ? 'chip-alert' : ''}`}
                >
                  {s.special && <Sparkles size={11} />}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .terminal-window {
          padding: 0;
          overflow: hidden;
          background: #090e1c;
          border-color: rgba(56, 189, 248, 0.25);
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.1);
          scroll-margin-top: 85px;
        }

        .terminal-header {
          background: #0f162c;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
        }

        .terminal-dots {
          display: flex;
          gap: 7px;
        }

        .dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .terminal-clear {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          font-size: 0.72rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .terminal-clear:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
        }

        .terminal-body {
          padding: 20px 24px;
          min-height: 280px;
          max-height: 420px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.86rem;
          cursor: text;
        }

        .terminal-sys-msg {
          color: #38bdf8;
          white-space: pre-line;
          border-bottom: 1px dashed rgba(56, 189, 248, 0.2);
          padding-bottom: 12px;
          line-height: 1.5;
        }

        .terminal-cmd {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }

        .prompt-user { color: #34d399; font-weight: 700; }
        .prompt-sep { color: #94a3b8; }
        .prompt-path { color: #818cf8; font-weight: 600; }
        .prompt-char { color: var(--accent-cyan); font-weight: 700; margin-right: 4px; }
        .prompt-txt { color: #fff; font-weight: 600; }

        .terminal-out {
          color: #cbd5e1;
          white-space: pre-wrap;
          font-size: 0.83rem;
          background: rgba(0, 0, 0, 0.25);
          padding: 10px 14px;
          border-radius: var(--radius-xs);
          border-left: 2px solid var(--accent-cyan);
          line-height: 1.5;
        }

        .terminal-err {
          color: #fb7185;
          background: rgba(244, 63, 94, 0.1);
          padding: 8px 12px;
          border-radius: var(--radius-xs);
          border-left: 2px solid #f43f5e;
        }

        .terminal-active-line {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.88rem;
          outline: none;
          padding: 4px 6px;
        }

        .terminal-input::placeholder {
          color: #475569;
        }

        .terminal-enter-btn {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: var(--accent-cyan);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          cursor: pointer;
        }

        .terminal-footer {
          background: #0b1122;
          border-top: 1px solid var(--border-subtle);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .footer-tag {
          font-size: 0.74rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .footer-chips {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .chip-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          font-size: 0.76rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          transition: all 0.15s ease;
        }

        .chip-btn:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: var(--accent-cyan);
          color: #fff;
          transform: translateY(-1px);
        }

        .chip-special {
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.4);
          color: #fbbf24;
        }

        .chip-special:hover {
          background: rgba(245, 158, 11, 0.3);
          border-color: #fbbf24;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.3);
        }

        .chip-alert {
          background: rgba(244, 63, 94, 0.12);
          border-color: rgba(244, 63, 94, 0.3);
          color: #fb7185;
        }

        .chip-alert:hover {
          background: rgba(244, 63, 94, 0.25);
          border-color: #f43f5e;
          box-shadow: 0 0 12px rgba(244, 63, 94, 0.3);
        }

        .text-cyan { color: var(--accent-cyan); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
