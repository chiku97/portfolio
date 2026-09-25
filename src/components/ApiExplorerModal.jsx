import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Copy,
  Check,
  X,
  ExternalLink,
  Clock,
  HardDrive,
  ChevronRight,
  Server,
  Layers,
  Send
} from 'lucide-react';
import { API_BASE } from '../utils/api';
import { playClick, playSuccess } from '../utils/audio';

const ENDPOINTS = [
  {
    id: 'chat-rag',
    name: 'Natural Language RAG Query',
    category: 'AI & Vector Engine',
    method: 'POST',
    path: '/api/chat',
    description: 'Queries in-memory cosine vector store with resume embeddings, grounded with Gemini 1.5 Flash.',
    headers: { 'Content-Type': 'application/json' },
    defaultBody: JSON.stringify({
      query: "Explain Uttam's sub-20ms hybrid RAG pipeline at SnapBizz across 100,000+ SKUs",
      honestMode: false
    }, null, 2),
    presets: [
      {
        label: 'SnapBizz 100k SKU RAG',
        body: { query: "Explain Uttam's sub-20ms hybrid RAG pipeline at SnapBizz across 100,000+ SKUs", honestMode: false }
      },
      {
        label: 'Notice Period & Availability',
        body: { query: "What is Uttam's notice period and current company status?", honestMode: false }
      },
      {
        label: 'IRCTC Catering Billing Core',
        body: { query: "What did Uttam architect for the IRCTC Catering Billing and Management Dashboard?", honestMode: false }
      },
      {
        label: 'Brutally Honest Mode ☕',
        body: { query: "Why should we hire Uttam over other backend candidates?", honestMode: true }
      }
    ]
  },
  {
    id: 'stats-telemetry',
    name: 'Global Portfolio Telemetry',
    category: 'Zero-DB Telemetry',
    method: 'GET',
    path: '/api/stats',
    description: 'Retrieves live page views, atomic project likes, dev thought syncs, and skill endorsements from high-availability CountAPI mesh.',
    headers: { 'Accept': 'application/json' },
    defaultBody: '',
    presets: []
  },
  {
    id: 'thought-sync',
    name: 'Atomic Dev Thought Sync',
    category: 'Zero-DB Telemetry',
    method: 'POST',
    path: '/api/stats/thought-sync',
    description: 'Atomically increments and retrieves the global developer thought sync counter with zero-database persistence.',
    headers: { 'Content-Type': 'application/json' },
    defaultBody: '{}',
    presets: [
      { label: 'Sync Thought Counter', body: {} }
    ]
  },
  {
    id: 'project-like',
    name: 'Atomic Project Like Mutation',
    category: 'Zero-DB Telemetry',
    method: 'POST',
    path: '/api/stats/projects/rag-analytics-chatbot/like',
    description: 'Atomically increments and persists the thumbs-up like counter for a specific featured project.',
    headers: { 'Content-Type': 'application/json' },
    defaultBody: '{}',
    presets: [
      { label: 'Like: RAG Chatbot', path: '/api/stats/projects/rag-analytics-chatbot/like', body: {} },
      { label: 'Like: Coding Sandbox', path: '/api/stats/projects/coding-assessment-platform/like', body: {} },
      { label: 'Like: Retail Engine', path: '/api/stats/projects/multi-tenant-retail-engine/like', body: {} }
    ]
  },
  {
    id: 'sql-explain',
    name: 'PostgreSQL EXPLAIN ANALYZE',
    category: 'Database & Chaos Engine',
    method: 'POST',
    path: '/api/simulations/sql-explain',
    description: 'Executes simulated query planner comparing B-Tree composite index scans (14ms) vs. unindexed sequential table scans (380ms).',
    headers: { 'Content-Type': 'application/json' },
    defaultBody: JSON.stringify({ mode: 'optimized' }, null, 2),
    presets: [
      { label: 'B-Tree Composite Index (14ms)', body: { mode: 'optimized' } },
      { label: 'Unindexed Seq Scan (380ms)', body: { mode: 'unindexed' } }
    ]
  },
  {
    id: 'chaos-test',
    name: 'Microservices Chaos Simulator',
    category: 'Database & Chaos Engine',
    method: 'POST',
    path: '/api/simulations/chaos-test',
    description: 'Simulates production failure recovery: Redis cache OOM, warehouse network partition, or sandbox runaway execution.',
    headers: { 'Content-Type': 'application/json' },
    defaultBody: JSON.stringify({ scenario: 'redis_oom' }, null, 2),
    presets: [
      { label: 'Redis Cache OOM Crash', body: { scenario: 'redis_oom' } },
      { label: 'Erratic Warehouse WiFi Drop', body: { scenario: 'network_partition' } },
      { label: 'Docker Sandbox Fork Bomb', body: { scenario: 'sandbox_escape' } }
    ]
  },
  {
    id: 'server-health',
    name: 'Server Health & Memory RSS',
    category: 'System & Infra',
    method: 'GET',
    path: '/health',
    description: 'Inspects Vercel serverless container health, Node.js V8 runtime version, process memory usage (RSS MB), and uptime.',
    headers: { 'Accept': 'application/json' },
    defaultBody: '',
    presets: []
  }
];

export default function ApiExplorerModal({ isOpen, onClose, onShowToast }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [customPath, setCustomPath] = useState(ENDPOINTS[0].path);
  const [requestBody, setRequestBody] = useState(ENDPOINTS[0].defaultBody);
  const [activeReqTab, setActiveReqTab] = useState('body'); // 'body' | 'headers' | 'curl'
  const [activeResTab, setActiveResTab] = useState('response'); // 'response' | 'headers'
  
  const [isLoading, setIsLoading] = useState(false);
  const [responseMeta, setResponseMeta] = useState(null);
  const [responseBody, setResponseBody] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState({});
  const [copiedType, setCopiedType] = useState(null);

  // Sync selected endpoint when changed
  const handleSelectEndpoint = (ep) => {
    playClick();
    setSelectedEndpoint(ep);
    setCustomPath(ep.path);
    setRequestBody(ep.defaultBody);
    setResponseMeta(null);
    setResponseBody(null);
    setResponseHeaders({});
  };

  // Execute API Request directly against API_BASE
  const handleExecuteRequest = useCallback(async () => {
    if (isLoading) return;
    playClick();
    setIsLoading(true);
    setResponseMeta(null);
    setResponseBody(null);
    setResponseHeaders({});

    const startTime = performance.now();
    const targetUrl = `${API_BASE}${customPath}`;

    try {
      const options = {
        method: selectedEndpoint.method,
        headers: {
          ...selectedEndpoint.headers
        }
      };

      if (selectedEndpoint.method === 'POST') {
        options.body = requestBody.trim() || '{}';
      }

      const res = await fetch(targetUrl, options);
      const duration = Math.round(performance.now() - startTime);

      // Collect headers
      const headersMap = {};
      res.headers.forEach((val, key) => {
        headersMap[key] = val;
      });

      // Parse payload
      let parsedData;
      let rawText = '';
      try {
        rawText = await res.text();
        parsedData = JSON.parse(rawText);
      } catch {
        parsedData = rawText;
      }

      const sizeBytes = new TextEncoder().encode(rawText).length;

      setResponseMeta({
        status: res.status,
        statusText: res.statusText || (res.ok ? 'OK' : 'Error'),
        ok: res.ok,
        durationMs: duration,
        sizeBytes
      });
      setResponseBody(parsedData);
      setResponseHeaders(headersMap);
      playSuccess();
    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      setResponseMeta({
        status: 0,
        statusText: 'Network / CORS Error',
        ok: false,
        durationMs: duration,
        sizeBytes: 0
      });
      setResponseBody({
        error: 'Network Request Failed',
        message: err.message,
        hint: 'Check if backend server is reachable at ' + API_BASE
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, customPath, selectedEndpoint, requestBody]);

  // Keyboard shortcut listener for Esc and Ctrl+Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleExecuteRequest();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedEndpoint, customPath, requestBody, isLoading, handleExecuteRequest, onClose]);

  // Generate copyable cURL command
  const getCurlCommand = () => {
    const targetUrl = `${API_BASE}${customPath}`;
    if (selectedEndpoint.method === 'GET') {
      return `curl -X GET "${targetUrl}" \\\n  -H "Accept: application/json"`;
    }

    const cleanBody = requestBody.replace(/'/g, `'\\''`);
    return `curl -X POST "${targetUrl}" \\\n  -H "Content-Type: application/json" \\\n  -d '${cleanBody.trim() || '{}'}'`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    playClick();
    if (onShowToast) {
      onShowToast(type === 'curl' ? '📋 cURL command copied to clipboard!' : '📋 JSON response copied!');
    }
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Syntax highlighter for JSON
  const renderHighlightedJson = (data) => {
    if (data === null || data === undefined) return <span className="json-null">null</span>;
    if (typeof data !== 'object') {
      return <span>{String(data)}</span>;
    }

    const formatted = JSON.stringify(data, null, 2);
    // Tokenize JSON for aesthetic coloring
    const tokens = formatted.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );

    return <pre className="json-pre font-mono" dangerouslySetInnerHTML={{ __html: tokens }} />;
  };

  // Group endpoints by category
  const categories = Array.from(new Set(ENDPOINTS.map((e) => e.category)));

  if (!isOpen) return null;

  return (
    <div className="api-modal-backdrop" onClick={onClose}>
      <motion.div
        className="api-modal-box"
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 15 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="api-modal-header">
          <div className="header-left">
            <div className="api-icon-badge">
              <Code2 size={16} className="text-cyan" />
            </div>
            <div>
              <div className="api-title-row">
                <span className="api-title font-mono">REST API EXPLORER</span>
                <span className="api-swagger-tag font-mono">SWAGGER-LITE</span>
              </div>
              <div className="api-subtitle font-mono">
                <span className="pulse-indicator"></span>
                <span>TARGET HOST:</span>
                <a href={API_BASE} target="_blank" rel="noreferrer" className="host-link">
                  {API_BASE} <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          <div className="header-right">
            <button
              onClick={() => copyToClipboard(getCurlCommand(), 'curl')}
              className="btn-curl-copy font-mono"
              title="Copy cURL command for terminal execution"
            >
              {copiedType === 'curl' ? <Check size={13} className="text-emerald" /> : <Terminal size={13} />}
              <span>{copiedType === 'curl' ? 'cURL Copied!' : 'Copy cURL'}</span>
            </button>
            <button onClick={onClose} className="btn-close-modal" aria-label="Close API Explorer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Layout: Sidebar + Main Content */}
        <div className="api-modal-body">
          {/* Left Sidebar: Endpoints Navigation */}
          <aside className="api-sidebar">
            <div className="sidebar-header font-mono">
              <Layers size={12} className="text-muted" />
              <span>ENDPOINTS CATALOG</span>
            </div>

            <div className="endpoints-list">
              {categories.map((cat) => (
                <div key={cat} className="endpoint-group">
                  <div className="group-title font-mono">{cat}</div>
                  {ENDPOINTS.filter((e) => e.category === cat).map((ep) => {
                    const isSelected = selectedEndpoint.id === ep.id;
                    return (
                      <button
                        key={ep.id}
                        onClick={() => handleSelectEndpoint(ep)}
                        className={`endpoint-btn ${isSelected ? 'endpoint-btn-active' : ''}`}
                      >
                        <span className={`method-badge method-${ep.method.toLowerCase()} font-mono`}>
                          {ep.method}
                        </span>
                        <div className="endpoint-meta">
                          <span className="endpoint-name">{ep.name}</span>
                          <span className="endpoint-path font-mono">{ep.path}</span>
                        </div>
                        {isSelected && <ChevronRight size={14} className="endpoint-active-chevron text-cyan" />}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </aside>

          {/* Right Area: Interactive Request & Response Console */}
          <main className="api-console">
            {/* Top Interactive URL Bar */}
            <div className="api-url-bar">
              <span className={`url-method-badge method-${selectedEndpoint.method.toLowerCase()} font-mono`}>
                {selectedEndpoint.method}
              </span>
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                className="url-input font-mono"
                placeholder="/api/..."
              />
              <button
                onClick={handleExecuteRequest}
                disabled={isLoading}
                className="btn-send-request font-mono"
                title="Send Request (Ctrl + Enter)"
              >
                {isLoading ? (
                  <>
                    <span className="spinner-icon"></span>
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>EXECUTE</span>
                  </>
                )}
              </button>
            </div>

            {/* Description Banner */}
            <div className="api-desc-banner">
              <span className="desc-icon font-mono">ℹ</span>
              <span className="desc-text">{selectedEndpoint.description}</span>
            </div>

            {/* Split Grid: Request Panel & Response Panel */}
            <div className="console-split-grid">
              {/* Left Column: Request Configuration */}
              <div className="request-pane">
                <div className="pane-tabs-bar">
                  <div className="pane-tabs">
                    <button
                      onClick={() => setActiveReqTab('body')}
                      className={`pane-tab ${activeReqTab === 'body' ? 'pane-tab-active' : ''} font-mono`}
                    >
                      REQUEST BODY
                    </button>
                    <button
                      onClick={() => setActiveReqTab('headers')}
                      className={`pane-tab ${activeReqTab === 'headers' ? 'pane-tab-active' : ''} font-mono`}
                    >
                      HEADERS
                    </button>
                    <button
                      onClick={() => setActiveReqTab('curl')}
                      className={`pane-tab ${activeReqTab === 'curl' ? 'pane-tab-active' : ''} font-mono`}
                    >
                      cURL
                    </button>
                  </div>

                  {selectedEndpoint.presets.length > 0 && activeReqTab === 'body' && (
                    <span className="presets-hint font-mono">QUICK PRESETS ⚡</span>
                  )}
                </div>

                {/* Preset Chips */}
                {selectedEndpoint.presets.length > 0 && activeReqTab === 'body' && (
                  <div className="presets-row">
                    {selectedEndpoint.presets.map((preset, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          playClick();
                          if (preset.path) setCustomPath(preset.path);
                          setRequestBody(JSON.stringify(preset.body, null, 2));
                        }}
                        className="preset-chip font-mono"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Request Content */}
                <div className="pane-content">
                  {activeReqTab === 'body' && (
                    selectedEndpoint.method === 'GET' ? (
                      <div className="empty-body-message font-mono">
                        <span>GET requests carry no request body. Click <strong>EXECUTE</strong> above to inspect response.</span>
                      </div>
                    ) : (
                      <textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="code-textarea font-mono"
                        placeholder="{\n  // JSON Request Payload\n}"
                        rows={10}
                        spellCheck={false}
                      />
                    )
                  )}

                  {activeReqTab === 'headers' && (
                    <div className="headers-table font-mono">
                      <div className="header-row-item header-row-head">
                        <span>HEADER NAME</span>
                        <span>VALUE</span>
                      </div>
                      {Object.entries(selectedEndpoint.headers).map(([k, v]) => (
                        <div key={k} className="header-row-item">
                          <span className="text-cyan">{k}</span>
                          <span className="text-emerald">{v}</span>
                        </div>
                      ))}
                      <div className="header-row-item">
                        <span className="text-cyan">User-Agent</span>
                        <span className="text-muted">Portfolio-Swagger-Lite/2.0</span>
                      </div>
                    </div>
                  )}

                  {activeReqTab === 'curl' && (
                    <div className="curl-preview-box font-mono">
                      <pre>{getCurlCommand()}</pre>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Live Response View */}
              <div className="response-pane">
                {/* Response Status Bar */}
                <div className="pane-tabs-bar">
                  <div className="pane-tabs">
                    <button
                      onClick={() => setActiveResTab('response')}
                      className={`pane-tab ${activeResTab === 'response' ? 'pane-tab-active' : ''} font-mono`}
                    >
                      RESPONSE JSON
                    </button>
                    <button
                      onClick={() => setActiveResTab('headers')}
                      className={`pane-tab ${activeResTab === 'headers' ? 'pane-tab-active' : ''} font-mono`}
                    >
                      HEADERS ({Object.keys(responseHeaders).length})
                    </button>
                  </div>

                  {responseMeta && (
                    <div className="response-telemetry-pill font-mono">
                      <span className={`status-pill ${responseMeta.ok ? 'status-ok' : 'status-err'}`}>
                        {responseMeta.status} {responseMeta.statusText}
                      </span>
                      <span className="duration-pill">
                        <Clock size={11} className="text-cyan" /> {responseMeta.durationMs}ms
                      </span>
                      {responseMeta.sizeBytes > 0 && (
                        <span className="size-pill">
                          <HardDrive size={11} className="text-violet" /> {(responseMeta.sizeBytes / 1024).toFixed(1)} KB
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Response Body Console */}
                <div className="pane-content response-content-scroll">
                  {isLoading ? (
                    <div className="response-placeholder font-mono">
                      <div className="loading-orbit">
                        <div className="orbit-core"></div>
                      </div>
                      <span>DISPATCHING LIVE REQUEST TO EDGE...</span>
                    </div>
                  ) : responseBody !== null ? (
                    activeResTab === 'response' ? (
                      <div className="response-json-container">
                        <div className="copy-action-float">
                          <button
                            onClick={() => copyToClipboard(JSON.stringify(responseBody, null, 2), 'response')}
                            className="btn-copy-response font-mono"
                            title="Copy formatted response JSON"
                          >
                            {copiedType === 'response' ? <Check size={12} className="text-emerald" /> : <Copy size={12} />}
                            <span>{copiedType === 'response' ? 'Copied' : 'Copy JSON'}</span>
                          </button>
                        </div>
                        {renderHighlightedJson(responseBody)}
                      </div>
                    ) : (
                      <div className="headers-table font-mono">
                        <div className="header-row-item header-row-head">
                          <span>RESPONSE HEADER</span>
                          <span>VALUE</span>
                        </div>
                        {Object.entries(responseHeaders).map(([k, v]) => (
                          <div key={k} className="header-row-item">
                            <span className="text-violet">{k}</span>
                            <span className="text-emerald">{v}</span>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <div className="response-placeholder font-mono">
                      <Server size={28} className="text-muted" />
                      <span>Ready to execute. Click <strong>EXECUTE</strong> or press <strong>Ctrl+Enter</strong> to run.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Modal Footer Note */}
        <div className="api-modal-footer font-mono">
          <div className="footer-left">
            <span className="dot-live"></span>
            <span>REAL BACKEND CALLS // SURVIVES SERVERLESS COLD STARTS</span>
          </div>
          <div className="footer-right">
            <span>SHORTCUT: [Ctrl + Enter] to Run • [ESC] to Exit</span>
          </div>
        </div>
      </motion.div>

      <style>{`
        .api-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 7, 18, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }

        .api-modal-box {
          background: #090e1c;
          border: 1px solid rgba(56, 189, 248, 0.28);
          box-shadow: 
            0 25px 70px -15px rgba(0, 0, 0, 0.95),
            0 0 40px rgba(56, 189, 248, 0.12);
          border-radius: 14px;
          width: 100%;
          max-width: 1140px;
          height: 90vh;
          max-height: 820px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* Header */
        .api-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(13, 20, 38, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .api-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .api-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .api-title {
          font-weight: 700;
          font-size: 14px;
          color: #f1f5f9;
          letter-spacing: 0.05em;
        }

        .api-swagger-tag {
          font-size: 10px;
          background: rgba(16, 185, 129, 0.14);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .api-subtitle {
          font-size: 11px;
          color: #94a3b8;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 3px;
        }

        .pulse-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
        }

        .host-link {
          color: #38bdf8;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .host-link:hover {
          text-decoration: underline;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-curl-copy {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #cbd5e1;
          padding: 7px 12px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-curl-copy:hover {
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .btn-close-modal {
          background: transparent;
          border: none;
          color: #94a3b8;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-close-modal:hover {
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
        }

        /* Body Split */
        .api-modal-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        /* Sidebar */
        .api-sidebar {
          width: 300px;
          background: rgba(10, 15, 28, 0.95);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
        }

        .sidebar-header {
          padding: 12px 16px;
          font-size: 11px;
          color: #64748b;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.05em;
        }

        .endpoints-list {
          overflow-y: auto;
          padding: 10px;
          flex: 1;
        }

        .endpoint-group {
          margin-bottom: 14px;
        }

        .group-title {
          font-size: 10px;
          color: #475569;
          padding: 4px 8px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }

        .endpoint-btn {
          width: 100%;
          text-align: left;
          padding: 8px 10px;
          border-radius: 7px;
          background: transparent;
          border: 1px solid transparent;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          margin-bottom: 4px;
        }

        .endpoint-btn:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(255, 255, 255, 0.08);
        }

        .endpoint-btn-active {
          background: rgba(56, 189, 248, 0.1) !important;
          border-color: rgba(56, 189, 248, 0.3) !important;
        }

        .method-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        .method-get {
          background: rgba(56, 189, 248, 0.14);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .method-post {
          background: rgba(16, 185, 129, 0.14);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .endpoint-meta {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .endpoint-name {
          font-size: 12px;
          font-weight: 500;
          color: #f1f5f9;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .endpoint-path {
          font-size: 10px;
          color: #94a3b8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        /* Console Area */
        .api-console {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #080d1a;
        }

        .api-url-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(13, 20, 38, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .url-method-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .url-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 7px 12px;
          color: #f8fafc;
          font-size: 12px;
          outline: none;
          transition: border-color 0.2s;
        }

        .url-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
        }

        .btn-send-request {
          background: linear-gradient(135deg, #0284c7, #2563eb);
          color: #ffffff;
          border: none;
          padding: 7px 16px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
          transition: all 0.2s ease;
        }

        .btn-send-request:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.5);
        }

        .btn-send-request:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner-icon {
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Description banner */
        .api-desc-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          background: rgba(56, 189, 248, 0.05);
          border-bottom: 1px solid rgba(56, 189, 248, 0.12);
          font-size: 11px;
          color: #94a3b8;
        }

        .desc-icon {
          color: #38bdf8;
          font-weight: 700;
        }

        /* Split grid */
        .console-split-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          overflow: hidden;
        }

        .request-pane {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(10, 14, 26, 0.5);
        }

        .response-pane {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(6, 10, 20, 0.9);
        }

        .pane-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: rgba(13, 20, 38, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          min-height: 40px;
        }

        .pane-tabs {
          display: flex;
          gap: 6px;
        }

        .pane-tab {
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pane-tab:hover {
          color: #cbd5e1;
        }

        .pane-tab-active {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
        }

        .presets-hint {
          font-size: 10px;
          color: #64748b;
        }

        .presets-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 8px 14px;
          background: rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .preset-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .preset-chip:hover {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border-color: rgba(56, 189, 248, 0.35);
        }

        .pane-content {
          flex: 1;
          overflow-y: auto;
          padding: 14px;
          position: relative;
        }

        .code-textarea {
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          color: #e2e8f0;
          font-size: 11px;
          line-height: 1.6;
          resize: none;
          outline: none;
        }

        .empty-body-message {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #64748b;
          font-size: 11px;
          text-align: center;
          padding: 20px;
        }

        .headers-table {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
        }

        .header-row-item {
          display: grid;
          grid-template-columns: 140px 1fr;
          padding: 6px 10px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .header-row-head {
          font-size: 9px;
          color: #475569;
          font-weight: 700;
          background: transparent;
          border: none;
        }

        .curl-preview-box {
          font-size: 11px;
          line-height: 1.6;
          color: #cbd5e1;
          white-space: pre-wrap;
          word-break: break-all;
        }

        /* Response pane elements */
        .response-telemetry-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
        }

        .status-pill {
          padding: 2px 7px;
          border-radius: 4px;
          font-weight: 700;
        }

        .status-ok {
          background: rgba(16, 185, 129, 0.16);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .status-err {
          background: rgba(239, 68, 68, 0.16);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.35);
        }

        .duration-pill, .size-pill {
          color: #94a3b8;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .response-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #64748b;
          font-size: 11px;
          text-align: center;
          padding: 30px;
        }

        .loading-orbit {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid rgba(56, 189, 248, 0.2);
          border-top-color: #38bdf8;
          animation: spin 0.9s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-core {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #38bdf8;
          box-shadow: 0 0 10px #38bdf8;
        }

        .response-json-container {
          position: relative;
        }

        .copy-action-float {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 5;
        }

        .btn-copy-response {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #cbd5e1;
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.15s ease;
        }

        .btn-copy-response:hover {
          background: rgba(56, 189, 248, 0.18);
          color: #38bdf8;
        }

        .json-pre {
          font-size: 11px;
          line-height: 1.55;
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .json-key { color: #a78bfa; font-weight: 600; }
        .json-string { color: #34d399; }
        .json-number { color: #fbbf24; }
        .json-boolean { color: #f43f5e; font-weight: 700; }
        .json-null { color: #64748b; font-style: italic; }

        /* Footer */
        .api-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: rgba(10, 15, 28, 0.95);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 10px;
          color: #64748b;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #94a3b8;
        }

        .dot-live {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 6px #34d399;
        }

        @media (max-width: 900px) {
          .api-modal-box {
            height: 96vh;
          }

          .api-modal-body {
            flex-direction: column;
          }

          .api-sidebar {
            width: 100%;
            height: 140px;
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .console-split-grid {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 1fr;
          }

          .request-pane {
            border-right: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
    </div>
  );
}
