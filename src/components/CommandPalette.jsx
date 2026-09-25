import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  Command,
  FileText,
  Sparkles,
  Cpu,
  Terminal,
  AlertTriangle,
  Globe,
  Coffee,
  Database,
  Activity,
  Mail,
  ExternalLink,
  Bot,
  Zap,
  ArrowRight,
  CornerDownLeft,
  Code2
} from 'lucide-react';
import { playClick, playSuccess, playKeypress } from '../utils/audio';

export default function CommandPalette({
  isOpen,
  onClose,
  honestMode,
  setHonestMode,
  onOpenResume,
  onOpenFridayDeploy,
  onOpenWalkthrough,
  onOpenDeployGuide,
  onOpenAiAssistant,
  onOpenApiExplorer,
  onOpenChaosDemo,
  onOpenSqlDemo,
  onShowToast
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Grouped commands
  const allCommands = [
    // Quick Actions
    {
      id: 'toggle-mode',
      group: 'Quick Actions',
      title: `Toggle Mode (Currently: ${honestMode ? '☕ Honest Dev Mode' : '👔 Recruiter Safe Mode'})`,
      subtitle: 'Switch between corporate CV metrics and unfiltered engineering reality',
      icon: <Coffee size={16} className="text-amber" />,
      action: () => {
        setHonestMode(!honestMode);
        onShowToast(honestMode ? "👔 Switched to Recruiter Safe Mode" : "☕ Switched to Honest Dev Mode");
      }
    },
    {
      id: 'open-ai',
      group: 'Quick Actions',
      title: 'Chat with Chiku AI (Interactive Assistant)',
      subtitle: 'Ask technical questions about Uttam\'s experience, architecture & skills',
      icon: <Bot size={16} className="text-cyan" />,
      badge: 'AI ASSISTANT',
      action: () => onOpenAiAssistant && onOpenAiAssistant()
    },
    {
      id: 'open-resume',
      group: 'Quick Actions',
      title: 'View & Export Resume Modal',
      subtitle: 'Open viewport-fitted ATS resume with zoom & PDF export',
      icon: <FileText size={16} className="text-cyan" />,
      badge: 'PDF EXPORT',
      action: () => onOpenResume()
    },
    {
      id: 'start-walkthrough',
      group: 'Quick Actions',
      title: 'Start Portfolio Feature Walkthrough',
      subtitle: 'Guided interactive tour of dual-mode, 3D chibi avatar, and simulators',
      icon: <Sparkles size={16} className="text-cyan" />,
      action: () => onOpenWalkthrough()
    },
    {
      id: 'deploy-prod-easter-egg',
      group: 'Quick Actions',
      title: 'Trigger Friday 5:00 PM Production Deploy',
      subtitle: 'Simulate a dangerous late-afternoon deployment disaster with alarms',
      icon: <AlertTriangle size={16} className="text-amber" />,
      badge: 'CHAOS DRILL',
      action: () => onOpenFridayDeploy()
    },
    {
      id: 'fork-deploy-guide',
      group: 'Quick Actions',
      title: 'Fork & Deploy Your Own Portfolio',
      subtitle: 'Step-by-step instructions to clone, customize and host on GitHub Pages',
      icon: <Globe size={16} className="text-emerald" />,
      action: () => onOpenDeployGuide()
    },
    {
      id: 'copy-email',
      group: 'Quick Actions',
      title: 'Copy Email Address',
      subtitle: 'mahtouttamkumar01@gmail.com',
      icon: <Mail size={16} className="text-cyan" />,
      action: () => {
        navigator.clipboard.writeText('mahtouttamkumar01@gmail.com');
        onShowToast("📋 Copied mahtouttamkumar01@gmail.com to clipboard!");
      }
    },

    // Interactive Engineering Sandboxes
    {
      id: 'sandbox-chaos',
      group: 'Interactive Sandboxes',
      title: 'Distributed Microservices & Chaos Simulator',
      subtitle: 'Live topology diagram: inject Redis crash, DB failover & circuit breakers',
      icon: <Zap size={16} className="text-amber" />,
      badge: 'CHAOS SIM',
      action: () => {
        if (onOpenChaosDemo) onOpenChaosDemo();
        const el = document.getElementById('microservices-chaos-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'sandbox-sql',
      group: 'Interactive Sandboxes',
      title: 'SQL Query Optimizer & EXPLAIN ANALYZE',
      subtitle: 'Benchmark 10M row sequential scan vs. B-Tree index scan (575x speedup)',
      icon: <Database size={16} className="text-cyan" />,
      badge: 'SQL BENCHMARK',
      action: () => {
        if (onOpenSqlDemo) onOpenSqlDemo();
        const el = document.getElementById('sql-optimizer-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'sandbox-rag',
      group: 'Interactive Sandboxes',
      title: 'Hybrid RAG & Vector Search Sandbox',
      subtitle: 'Elasticsearch BM25 + PostgreSQL pgvector Reciprocal Rank Fusion simulator',
      icon: <Cpu size={16} className="text-cyan" />,
      action: () => {
        const el = document.getElementById('rag-interactive-sandbox');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'sandbox-terminal',
      group: 'Interactive Sandboxes',
      title: 'Developer CLI Console Terminal',
      subtitle: 'Type why-hire, git-blame, skills, or sudo hire in the terminal shell',
      icon: <Terminal size={16} className="text-cyan" />,
      action: () => {
        const el = document.getElementById('terminal-window-card');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'sandbox-api-explorer',
      group: 'Interactive Sandboxes',
      title: 'REST API Explorer & Swagger-Lite Sandbox',
      subtitle: 'Test live backend endpoints (/api/chat, /api/stats, /api/simulations) in-browser with cURL generator',
      icon: <Code2 size={16} className="text-emerald" />,
      badge: 'LIVE REST API',
      action: () => {
        onClose();
        if (onOpenApiExplorer) onOpenApiExplorer();
      }
    },

    // Navigation Sections
    {
      id: 'nav-experience',
      group: 'Navigate to Section',
      title: 'Work Experience & Timeline',
      subtitle: 'SnapBizz CloudTech, INCANUS Tech, Cerner (Oracle)',
      icon: <ArrowRight size={14} className="text-muted" />,
      action: () => {
        const el = document.getElementById('experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-projects',
      group: 'Navigate to Section',
      title: 'Engineering Case Studies & Projects',
      subtitle: 'IRCTC WhatsApp ticketing, High-throughput exam engine, pgvector RAG',
      icon: <ArrowRight size={14} className="text-muted" />,
      action: () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-skills',
      group: 'Navigate to Section',
      title: 'Skills Matrix & Tech Stack',
      subtitle: 'Node.js, Go, PostgreSQL, Elasticsearch, Redis, Docker, AWS',
      icon: <ArrowRight size={14} className="text-muted" />,
      action: () => {
        const el = document.getElementById('skills');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'nav-contact',
      group: 'Navigate to Section',
      title: 'Get In Touch / Contact',
      subtitle: 'Send direct message, schedule a chat or connect on LinkedIn',
      icon: <ArrowRight size={14} className="text-muted" />,
      action: () => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  // Filter commands by query
  const filteredCommands = allCommands.filter(cmd => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.group.toLowerCase().includes(q)
    );
  });

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  // Keep selection in bounds
  useEffect(() => {
    if (selectedIndex >= filteredCommands.length) {
      setSelectedIndex(Math.max(0, filteredCommands.length - 1));
    }
  }, [filteredCommands.length, selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        playKeypress();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        playKeypress();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          playSuccess();
          filteredCommands[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div
        className="palette-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="palette-search-row">
          <Search size={18} className="text-cyan search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette-input font-mono"
            placeholder="Type a command, tool, or section... (e.g. 'RAG', 'Resume', 'Chaos', 'SQL')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className="esc-badge font-mono">ESC</span>
        </div>

        {/* Results List */}
        <div className="palette-results">
          {filteredCommands.length === 0 ? (
            <div className="palette-empty font-mono">
              <span className="text-amber">No matching commands found.</span>
              <p>Try searching for "Chaos", "Resume", "SQL", "Mode", or "Terminal".</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  className={`palette-item ${isSelected ? 'palette-item-selected' : ''}`}
                  onClick={() => {
                    playSuccess();
                    cmd.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="palette-item-icon">
                    {cmd.icon}
                  </div>

                  <div className="palette-item-text">
                    <div className="palette-item-title-row">
                      <span className="palette-item-title">{cmd.title}</span>
                      {cmd.badge && (
                        <span className="palette-item-badge font-mono">{cmd.badge}</span>
                      )}
                    </div>
                    <span className="palette-item-subtitle">{cmd.subtitle}</span>
                  </div>

                  {isSelected && (
                    <div className="palette-item-enter font-mono">
                      <span>Jump</span>
                      <CornerDownLeft size={12} />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="palette-footer font-mono">
          <div className="footer-shortcuts">
            <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
            <span><kbd>↵</kbd> to select</span>
            <span><kbd>esc</kbd> to dismiss</span>
          </div>
          <div className="footer-brand">
            <span>⌘K PALETTE • UTTAM.ENGINEER</span>
          </div>
        </div>
      </div>

      <style>{`
        .palette-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100010;
          background: rgba(3, 7, 18, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 14vh;
          padding-left: 16px;
          padding-right: 16px;
        }

        .palette-container {
          width: 100%;
          max-width: 640px;
          background: rgba(11, 16, 30, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            0 0 35px rgba(56, 189, 248, 0.18);
          border-radius: var(--radius-md);
          overflow: hidden;
          animation: paletteFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes paletteFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .palette-search-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.02);
        }

        .search-icon {
          flex-shrink: 0;
        }

        .palette-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #f8fafc;
          font-size: 0.95rem;
        }

        .palette-input::placeholder {
          color: #64748b;
          font-size: 0.85rem;
        }

        .esc-badge {
          font-size: 0.68rem;
          color: #94a3b8;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--border-hairline);
          padding: 3px 6px;
          border-radius: var(--radius-xs);
        }

        .palette-results {
          max-height: 380px;
          overflow-y: auto;
          padding: 8px;
        }

        .palette-results::-webkit-scrollbar {
          width: 5px;
        }
        .palette-results::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 4px;
        }

        .palette-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1px solid transparent;
        }

        .palette-item-selected {
          background: rgba(56, 189, 248, 0.09);
          border-color: rgba(56, 189, 248, 0.25);
        }

        .palette-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          background: rgba(255, 255, 255, 0.04);
          flex-shrink: 0;
        }

        .palette-item-text {
          flex: 1;
          min-width: 0;
        }

        .palette-item-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .palette-item-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .palette-item-badge {
          font-size: 0.65rem;
          padding: 1px 6px;
          border-radius: var(--radius-xs);
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
        }

        .palette-item-subtitle {
          display: block;
          font-size: 0.76rem;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .palette-item-enter {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.7rem;
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.12);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
          flex-shrink: 0;
        }

        .palette-empty {
          text-align: center;
          padding: 32px 16px;
          font-size: 0.85rem;
          color: #94a3b8;
        }

        .palette-empty p {
          margin-top: 6px;
          font-size: 0.78rem;
          color: #64748b;
        }

        .palette-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-top: 1px solid var(--border-hairline);
          background: rgba(0, 0, 0, 0.35);
          font-size: 0.72rem;
          color: #64748b;
        }

        .footer-shortcuts {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-shortcuts kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 1px 4px;
          border-radius: 3px;
          color: #cbd5e1;
        }

        .footer-brand {
          color: var(--accent-blue);
          font-weight: 600;
        }

        .text-amber { color: var(--accent-amber); }
        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .text-muted { color: #64748b; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
