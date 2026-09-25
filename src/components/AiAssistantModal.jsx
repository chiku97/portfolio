import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Copy,
  Check,
  RotateCcw,
  Terminal,
  Coffee,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';
import { playClick, playSuccess, playKeypress } from '../utils/audio';
import { sendChatMessage } from '../utils/api';

export default function AiAssistantModal({ isOpen, onClose, honestMode, setHonestMode, onShowToast }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: honestMode
        ? "Yo! I'm Uttam's AI — the unfiltered digital avatar of Uttam. Ask me anything about his architecture, his production battle scars, why he rewrote services in Go at 3 AM, or whether he's worth hiring. (Spoiler: He doesn't write spaghetti code)."
        : "Hello! I am Uttam's AI, Uttam's technical portfolio assistant. Feel free to ask about his system design, his hybrid RAG & vector pipelines at SnapBizz, enterprise backend scaling, or full-stack proficiencies."
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Pre-configured intelligent Q&A knowledge base
  const getAiResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes('why hire') || q.includes('hire') || q.includes('reason') || q.includes('candidate')) {
      if (honestMode) {
        return "Here's why you should hire Uttam: 1) He doesn't push untested code to prod on Friday at 4:59 PM (well, not anymore). 2) He actually knows what happens inside PostgreSQL EXPLAIN ANALYZE instead of just throwing an ORM at it. 3) He handled 10,000 concurrent examinees at INCANUS without AWS billing blowing up the company's seed round. 4) He learns any stack in 72 hours if you provide decent coffee.";
      } else {
        return "Uttam brings 4+ years of proven production experience engineering distributed backend systems, AI retrieval pipelines, and high-throughput architectures. At SnapBizz, he spearheaded the IRCTC ticketing WhatsApp integrations and enterprise vector RAG search. At INCANUS, he architected an exam engine serving 10,000+ concurrent users with zero downtime. He combines deep database optimization (pgvector, Elasticsearch, Redis) with modern React frontend agility.";
      }
    }

    if (q.includes('rag') || q.includes('vector') || q.includes('elastic') || q.includes('search') || q.includes('ai')) {
      if (honestMode) {
        return "At SnapBizz, cashiers type item names like 'paracetmol 50mg' while half-asleep. Pure vector search hallucinated random medicines, and pure SQL LIKE queries failed on typos. So Uttam built a hybrid monster: Elasticsearch BM25 handles the horrific phonetic typos, while PostgreSQL pgvector captures semantic meaning like 'painkiller'. Reciprocal Rank Fusion (RRF) merges them together. Result? Zero hallucinations and 15ms latency.";
      } else {
        return "Uttam engineered a production Hybrid RAG & Vector Search architecture at SnapBizz CloudTech. It fuses lexical BM25 token-level matching (via Elasticsearch) for typo-resilient product lookups with high-dimensional dense vector embeddings (via PostgreSQL with pgvector) for semantic query understanding. The two ranked streams are normalized using Reciprocal Rank Fusion (RRF), delivering sub-20ms retrieval accuracy across hundreds of thousands of retail SKUs.";
      }
    }

    if (q.includes('disaster') || q.includes('fail') || q.includes('horror') || q.includes('war story') || q.includes('incident')) {
      if (honestMode) {
        return "Ah, the legendary 3:00 AM Redis OOM incident! A third-party webhook started bombarding their server with 8,000 payloads per second without cache TTLs. Memory hit 99.8%, the container restarted, and the database connection pool nearly melted. Uttam woke up, implemented token-bucket rate limiting, set up exponential backoff with Redis pipelining, and recovered the cluster before morning standup. He still twitching whenever someone mentions 'unbounded cache'.";
      } else {
        return "During a massive flash promotion spike, third-party webhook traffic escalated 10x past baseline QPS. Uttam orchestrated an emergency resolution: implemented dynamic token-bucket rate limiting via Redis, optimized connection pooling in Go, tuned PostgreSQL read-replica load distribution, and instituted circuit breakers via Kong Gateway, restoring system latency from 4.2s back to 18ms with 99.99% uptime.";
      }
    }

    if (q.includes('skill') || q.includes('tech stack') || q.includes('technolog') || q.includes('languages')) {
      return "Core Technologies:\n• Backend & Systems: Node.js, Go (Golang), Express, REST & GraphQL, Microservices\n• Databases & AI: PostgreSQL, pgvector, Elasticsearch, Redis Cluster, MySQL, Vector Embeddings\n• Frontend: React 19, Vite, Three.js (WebGL), Modern CSS, TypeScript\n• DevOps & Cloud: Docker, Kubernetes, AWS (EC2, S3, RDS), Kafka, GitHub Actions CI/CD";
    }

    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('talk')) {
      return "You can reach Uttam directly at uttamkumar9708@gmail.com, or connect on LinkedIn (linkedin.com/in/uttam-kumar-mahto-2b476717a). He responds promptly!";
    }

    // Default response
    if (honestMode) {
      return `Good question! In honest terms: Uttam specializes in high-throughput backend services, intelligent RAG retrieval, and clean UI engineering. Whether you need 10,000 QPS microservices or a full-stack product shipped before your investors ask for a demo, he gets it done with clean architecture and zero fluff. Ask me about his RAG engine, work experience, or disaster recovery drills!`;
    } else {
      return `Thank you for asking! Uttam is a Full Stack & Systems Engineer based in Bangalore with deep expertise in scalable cloud architecture, database performance tuning, and AI vector workflows. Feel free to explore his interactive simulators in this portfolio or ask for specific case studies regarding his roles at SnapBizz, INCANUS, or Cerner.`;
    }
  };

  const handleSend = async (textToSend = inputVal) => {
    const q = textToSend.trim();
    if (!q || isTyping) return;

    playKeypress();
    const userMsg = { id: `u-${Date.now()}`, role: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // 1. Call Backend RAG Chat Engine
      const history = messages.slice(-4).map(m => ({ role: m.role, content: m.text }));
      const backendRes = await sendChatMessage(q, honestMode, history);

      const fullResponse = backendRes?.text || getAiResponse(q);
      const modelName = backendRes?.model || 'Uttam AI';
      let currentLength = 0;
      const responseId = `a-${Date.now()}`;

      // Insert empty response container
      setMessages(prev => [...prev, { id: responseId, role: 'assistant', text: '', model: modelName }]);

      const streamTimer = setInterval(() => {
        currentLength += 4;
        if (currentLength >= fullResponse.length) {
          setMessages(prev =>
            prev.map(m => m.id === responseId ? { ...m, text: fullResponse } : m)
          );
          setIsTyping(false);
          playSuccess();
          clearInterval(streamTimer);
        } else {
          setMessages(prev =>
            prev.map(m => m.id === responseId ? { ...m, text: fullResponse.slice(0, currentLength) } : m)
          );
        }
      }, 16);
    } catch {
      const fullResponse = getAiResponse(q);
      const responseId = `a-${Date.now()}`;
      setMessages(prev => [...prev, { id: responseId, role: 'assistant', text: fullResponse }]);
      setIsTyping(false);
      playSuccess();
    }
  };

  const copyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onShowToast) onShowToast("Copied answer to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const presetQuestions = [
    "Why hire Uttam for your engineering team?",
    "Explain his hybrid RAG pipeline at SnapBizz",
    "What is his biggest production war story?",
    "What are his core tech stack proficiencies?"
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content ai-chat-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-header-left">
            <div className="ai-avatar-pulse">
              <Bot size={20} className="text-cyan" />
              <span className="online-indicator"></span>
            </div>
            <div>
              <div className="ai-title-row">
                <h3 className="ai-title">Uttam's AI — Technical Recruiter Copilot</h3>
                <span className="ai-model-tag font-mono">LLM SIMULATOR</span>
              </div>
              <p className="ai-subtitle font-mono">
                Persona: {honestMode ? "☕ Unfiltered Honest Dev" : "👔 ATS Recruiter Safe"}
              </p>
            </div>
          </div>

          <div className="ai-header-actions">
            <button
              onClick={() => {
                playClick();
                setHonestMode(!honestMode);
                onShowToast(honestMode ? "Switched to Safe Mode" : "Switched to Honest Mode");
              }}
              className="btn btn-subtle btn-sm font-mono mode-toggle-btn"
              title="Toggle personality tone"
            >
              {honestMode ? <Coffee size={13} className="text-amber" /> : <ShieldCheck size={13} className="text-cyan" />}
              <span>{honestMode ? "Honest" : "Safe"}</span>
            </button>

            <button
              onClick={onClose}
              className="modal-close-btn"
              aria-label="Close assistant"
              title="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Preset Questions Chips */}
        <div className="preset-chips-row">
          <span className="chips-label font-mono">Prompt Ideas:</span>
          <div className="chips-scroll">
            {presetQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                disabled={isTyping}
                className="preset-chip font-mono"
              >
                <span>{q}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Log */}
        <div className="ai-chat-messages">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div key={m.id} className={`chat-bubble-row ${isUser ? 'row-user' : 'row-assistant'}`}>
                {!isUser && (
                  <div className="assistant-avatar">
                    <Bot size={14} className="text-cyan" />
                  </div>
                )}
                <div className={`chat-bubble ${isUser ? 'bubble-user' : 'bubble-assistant'}`}>
                  <div className="bubble-text">{m.text}</div>
                  {!isUser && m.text && (
                    <button
                      onClick={() => copyMessage(m.id, m.text)}
                      className="bubble-copy-btn"
                      title="Copy response"
                    >
                      {copiedId === m.id ? <Check size={11} className="text-emerald" /> : <Copy size={11} />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="chat-bubble-row row-assistant">
              <div className="assistant-avatar">
                <Bot size={14} className="text-cyan" />
              </div>
              <div className="chat-bubble bubble-assistant typing-bubble">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          className="ai-chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="ai-input font-mono"
            placeholder="Ask about microservices, pgvector, IRCTC, or hiring Uttam..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isTyping}
          />
          <button
            type="submit"
            className="ai-send-btn"
            disabled={!inputVal.trim() || isTyping}
            aria-label="Send query"
          >
            <Send size={15} />
          </button>
        </form>
      </div>

      <style>{`
        .ai-chat-modal {
          max-width: 650px;
          height: 560px;
          display: flex;
          flex-direction: column;
          background: rgba(11, 16, 30, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 
            0 25px 60px -15px rgba(0, 0, 0, 0.9),
            0 0 35px rgba(56, 189, 248, 0.18);
          border-radius: var(--radius-md);
          overflow: hidden;
          padding: 0;
        }

        .ai-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.02);
        }

        .ai-header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ai-avatar-pulse {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-xs);
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .online-indicator {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .ai-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ai-title {
          font-size: 0.96rem;
          font-weight: 700;
          color: #fff;
        }

        .ai-model-tag {
          font-size: 0.65rem;
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 1px 6px;
          border-radius: var(--radius-xs);
        }

        .ai-subtitle {
          font-size: 0.74rem;
          color: var(--accent-blue);
          margin-top: 1px;
        }

        .ai-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mode-toggle-btn {
          font-size: 0.72rem;
          padding: 4px 8px;
        }

        .preset-chips-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid var(--border-hairline);
          overflow-x: auto;
        }

        .chips-label {
          font-size: 0.68rem;
          color: #64748b;
          white-space: nowrap;
        }

        .chips-scroll {
          display: flex;
          gap: 6px;
        }

        .preset-chip {
          white-space: nowrap;
          font-size: 0.72rem;
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-hairline);
          padding: 3px 8px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .preset-chip:hover:not(:disabled) {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.35);
          color: #fff;
        }

        .preset-chip:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .ai-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-bubble-row {
          display: flex;
          gap: 8px;
          max-width: 85%;
        }

        .row-user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .row-assistant {
          align-self: flex-start;
        }

        .assistant-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: rgba(56, 189, 248, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .chat-bubble {
          position: relative;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.84rem;
          line-height: 1.5;
        }

        .bubble-user {
          background: linear-gradient(135deg, #0284c7, #2563eb);
          color: #fff;
          border-bottom-right-radius: 2px;
        }

        .bubble-assistant {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-hairline);
          color: #e2e8f0;
          border-bottom-left-radius: 2px;
        }

        .bubble-text {
          white-space: pre-line;
        }

        .bubble-copy-btn {
          position: absolute;
          bottom: 4px;
          right: 4px;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-hairline);
          border-radius: 3px;
          padding: 3px;
          color: #94a3b8;
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .chat-bubble:hover .bubble-copy-btn {
          opacity: 1;
        }

        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 12px 16px;
        }

        .typing-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-cyan);
          border-radius: 50%;
          animation: dotBounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        .ai-chat-input-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-top: 1px solid var(--border-hairline);
          background: rgba(0, 0, 0, 0.4);
        }

        .ai-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 10px 14px;
          color: #f8fafc;
          font-size: 0.84rem;
          outline: none;
        }

        .ai-input:focus {
          border-color: rgba(56, 189, 248, 0.5);
        }

        .ai-send-btn {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--accent-blue);
          border: none;
          border-radius: var(--radius-xs);
          color: #fff;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .ai-send-btn:hover:not(:disabled) {
          background: var(--accent-cyan);
          color: #0b101e;
        }

        .ai-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-amber { color: var(--accent-amber); }
        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
