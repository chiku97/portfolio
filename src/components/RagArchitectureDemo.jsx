import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Cpu, ArrowRight, CheckCircle2, CornerDownRight, Play, RefreshCw, Zap } from 'lucide-react';

export default function RagArchitectureDemo() {
  const scenarios = [
    {
      id: "fuzzy",
      title: "1. Typo & Misspelled SKU",
      query: "Show inventory for paracetmol 50mg and dolo in Bangalore central warehouse",
      esResult: {
        score: "0.95 (BM25)",
        correction: "Typo resolved: 'paracetmol 50mg' → 'Paracetamol 500mg' & 'Dolo 650mg'",
        latency: "18ms",
        status: "Index Match"
      },
      vectorResult: {
        score: "0.88 (Cosine similarity)",
        detail: "Identified semantic embedding cluster: Antipyretics / Fever Medication",
        latency: "34ms",
        status: "Vector Scanned"
      },
      rrfScore: "0.93 (Weighted Rank #1)",
      response: "Found 1,420 units of Paracetamol 500mg and 890 units of Dolo 650mg in Bangalore Central Warehouse (Rack B-14). Reorder threshold is 500 units; current stock level is Healthy.",
      notes: "Elasticsearch with fuzziness: AUTO resolves common pharmacist/cashier misspellings instantly without burdening the LLM with prompt spelling corrections."
    },
    {
      id: "semantic",
      title: "2. Conceptual Analytical Query",
      query: "Which perishable FMCG goods had highest return rates over the last 30 days?",
      esResult: {
        score: "0.68 (BM25)",
        correction: "Keyword matches for 'FMCG' and 'return'",
        latency: "15ms",
        status: "Lexical Fallback"
      },
      vectorResult: {
        score: "0.96 (Cosine similarity)",
        detail: "Semantic clustering retrieved short-expiry dairy & baked goods SKU categories",
        latency: "42ms",
        status: "High Affinity"
      },
      rrfScore: "0.92 (Weighted Rank #1)",
      response: "Analysis of 4,820 return invoices indicates Dairy Products (Amul Toned Milk 500ml) accounted for 42% of total returns due to cold-chain transit delays in the Whitefield corridor.",
      notes: "pgvector vectors in Postgres find conceptual correlations that pure SQL full-text search misses, without requiring an expensive secondary vector database."
    },
    {
      id: "multitenant",
      title: "3. Multi-Tenant Boundary Audit",
      query: "Flag invoice totals > ₹50,000 without GST tax breakdown in Axis retail channel",
      esResult: {
        score: "0.91 (Filter + BM25)",
        correction: "Filter enforced: tenant_id = 'AXIS_RETAIL' AND invoice_total > 50000",
        latency: "14ms",
        status: "Tenant Locked"
      },
      vectorResult: {
        score: "0.85 (Cosine similarity)",
        detail: "Context audit for tax compliance anomalies",
        latency: "38ms",
        status: "Audited"
      },
      rrfScore: "0.94 (Strict tenant boundary)",
      response: "3 anomaly invoices detected in Axis Retail Channel for February 2026: INV-8841 (₹64,200), INV-8890 (₹58,400), and INV-9012 (₹71,000). All 3 entries lacked valid HSN tax splits.",
      notes: "Row-level tenant isolation is injected at the database query level. IRCTC and Axis Bank data are strictly partitioned at the schema layer."
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const activeScenario = scenarios[activeIdx];

  const handleSelectScenario = (idx) => {
    setActiveIdx(idx);
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 500);
  };

  return (
    <section id="rag-architecture" className="section">
      <div className="container">
        <div className="section-eyebrow">Interactive System Demo</div>
        <h2 className="section-heading">Hybrid RAG & Vector Search Pipeline</h2>
        <p className="section-subtext">
          A live simulation of the production architecture I built at SnapBizz CloudTech. 
          Fusing Elasticsearch BM25 for typo tolerance with PostgreSQL pgvector for semantic search via Reciprocal Rank Fusion (RRF), this system achieved sub-20ms latency across 100,000+ SKUs.
        </p>

        {/* Sandbox Panel */}
        <div id="rag-interactive-sandbox" className="card rag-container">
          {/* Query Selector Tabs */}
          <div className="scenario-nav">
            <span className="scenario-label font-mono">Select Trace Scenario:</span>
            <div className="scenario-btns">
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(idx)}
                  className={`btn btn-sm ${activeIdx === idx ? 'btn-solid' : 'btn-subtle'}`}
                >
                  <span>{sc.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Incoming Query Box */}
          <div className="query-box">
            <div className="query-bar-label font-mono">
              <span className="query-tag">LIVE_PROMPT_INPUT</span>
              <span className="pulse-tag">
                <span className="mini-pulse-dot"></span>
                <span>Active Query Stream</span>
              </span>
            </div>
            <div className="query-text font-mono">
              "{activeScenario.query}"
            </div>
          </div>

          {/* Parallel Execution Inspector */}
          <div className="pipeline-grid">
            {/* Path 1: Lexical */}
            <motion.div 
              className="pipeline-lane"
              animate={isSimulating ? { scale: [0.99, 1.01, 1], borderColor: "rgba(56, 189, 248, 0.5)" } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="lane-header">
                <Search size={15} className="text-blue" />
                <span className="lane-title">Elasticsearch (BM25 + Fuzzy)</span>
                <span className="lane-badge font-mono">{activeScenario.esResult.latency}</span>
              </div>
              <div className="lane-body">
                <div className="lane-stat">
                  <span className="stat-name">Match Score:</span>
                  <span className="stat-val font-mono">{activeScenario.esResult.score}</span>
                  <span className="tag-status font-mono">{activeScenario.esResult.status}</span>
                </div>
                <div className="lane-detail">
                  {activeScenario.esResult.correction}
                </div>
              </div>
            </motion.div>

            {/* Path 2: Semantic */}
            <motion.div 
              className="pipeline-lane"
              animate={isSimulating ? { scale: [0.99, 1.01, 1], borderColor: "rgba(16, 185, 129, 0.5)" } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="lane-header">
                <Database size={15} className="text-emerald" />
                <span className="lane-title">PostgreSQL pgvector (Cosine)</span>
                <span className="lane-badge font-mono">{activeScenario.vectorResult.latency}</span>
              </div>
              <div className="lane-body">
                <div className="lane-stat">
                  <span className="stat-name">Cosine Distance:</span>
                  <span className="stat-val font-mono text-emerald">{activeScenario.vectorResult.score}</span>
                  <span className="tag-status font-mono">{activeScenario.vectorResult.status}</span>
                </div>
                <div className="lane-detail">
                  {activeScenario.vectorResult.detail}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Fusion & LLM Grounded Synthesis */}
          <motion.div 
            className="synthesis-card"
            animate={isSimulating ? { opacity: [0.7, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <div className="synthesis-header">
              <div className="synthesis-title-row">
                <CheckCircle2 size={16} className="text-emerald" />
                <span className="synthesis-title">Grounded LLM Context Synthesis (OpenAI / Gemini)</span>
              </div>
              <span className="tag-rrf font-mono">Reciprocal Rank Fusion Score: {activeScenario.rrfScore}</span>
            </div>
            <div className="synthesis-content">
              <p>{activeScenario.response}</p>
            </div>
          </motion.div>

          {/* Engineering Trade-off Footnote */}
          <div className="dev-aside">
            <CornerDownRight size={16} className="dev-aside-icon" />
            <div>
              <strong>Engineering Rationale:</strong> {activeScenario.notes}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .rag-container {
          padding: 28px;
          scroll-margin-top: 85px;
        }

        .scenario-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .scenario-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .scenario-btns {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .query-box {
          background: #07090e;
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          margin-bottom: 20px;
        }

        .query-bar-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          margin-bottom: 8px;
        }

        .query-tag {
          color: var(--accent-blue);
          font-weight: 700;
        }

        .pulse-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
        }

        .mini-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-emerald);
          box-shadow: 0 0 6px var(--accent-emerald);
        }

        .query-text {
          font-size: 1rem;
          color: #f8fafc;
          font-weight: 500;
        }

        .pipeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        @media (max-width: 720px) {
          .pipeline-grid {
            grid-template-columns: 1fr;
          }
        }

        .pipeline-lane {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 18px;
          transition: border-color 0.2s ease;
        }

        .lane-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .lane-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #e2e8f0;
          flex: 1;
        }

        .lane-badge {
          font-size: 0.72rem;
          color: var(--accent-blue);
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 2px 7px;
          border-radius: var(--radius-xs);
        }

        .lane-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .lane-stat {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          flex-wrap: wrap;
        }

        .stat-name {
          color: var(--text-muted);
        }

        .stat-val {
          color: var(--accent-blue);
          font-weight: 600;
        }

        .tag-status {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 1px 6px;
          border-radius: var(--radius-xs);
          margin-left: auto;
        }

        .lane-detail {
          font-size: 0.84rem;
          color: #cbd5e1;
          line-height: 1.5;
        }

        .synthesis-card {
          background: #07090e;
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: var(--radius-sm);
          padding: 20px;
          margin-bottom: 16px;
        }

        .synthesis-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .synthesis-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .synthesis-title {
          font-size: 0.92rem;
          font-weight: 600;
          color: #fff;
        }

        .tag-rrf {
          font-size: 0.75rem;
          color: #34d399;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 3px 8px;
          border-radius: var(--radius-xs);
        }

        .synthesis-content p {
          font-size: 0.94rem;
          color: #e2e8f0;
          line-height: 1.65;
        }

        .text-blue { color: var(--accent-blue); }
        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
