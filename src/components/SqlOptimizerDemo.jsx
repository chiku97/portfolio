import React, { useState } from 'react';
import { 
  Database, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ArrowRight, 
  Layers, 
  Code2, 
  Check 
} from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';

export default function SqlOptimizerDemo() {
  const [isOptimized, setIsOptimized] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [runTime, setRunTime] = useState(3.2);

  const handleToggle = (optimized) => {
    playClick();
    setIsOptimized(optimized);
    setRunTime(optimized ? 3.2 : 1842.6);
  };

  const handleExecute = () => {
    playClick();
    setIsRunning(true);
    const targetTime = isOptimized ? 3.2 : 1842.6;
    
    // Animate query execution
    setTimeout(() => {
      setIsRunning(false);
      setRunTime(targetTime);
      playSuccess();
    }, isOptimized ? 300 : 1200);
  };

  const unoptimizedSql = `-- NAIVE QUERY (Sequential Scan across 10,000,000 rows)
SELECT 
  merchant_id, 
  COUNT(*) AS total_orders, 
  SUM(amount) AS total_revenue
FROM retail_transactions
WHERE merchant_id = 'MCH-88219' 
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY merchant_id;`;

  const optimizedSql = `-- OPTIMIZED QUERY (Index-Only Scan via Covering B-Tree Index)
-- Index: CREATE INDEX CONCURRENTLY idx_tx_merchant_created_incl
--        ON retail_transactions (merchant_id, created_at DESC) 
--        INCLUDE (amount);

SELECT 
  merchant_id, 
  COUNT(*) AS total_orders, 
  SUM(amount) AS total_revenue
FROM retail_transactions
WHERE merchant_id = 'MCH-88219' 
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY merchant_id;`;

  return (
    <section id="sql-optimizer-section" className="section sql-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge font-mono">
            <Database size={12} className="text-cyan" />
            <span>DATABASE BENCHMARK • 10M ROWS</span>
          </div>
          <h2 className="section-title">PostgreSQL Query Optimizer &amp; EXPLAIN ANALYZE</h2>
          <p className="section-subtitle">
            Demonstrating how I tune mission-critical retail transactions tables at scale. Toggle between naive sequential scans vs. covering composite index-only scans:
          </p>
        </div>

        {/* Interactive Console */}
        <div className="sql-card-wrapper">
          {/* Top Bar Switcher */}
          <div className="sql-top-bar">
            <div className="sql-tab-buttons">
              <button
                onClick={() => handleToggle(false)}
                className={`sql-tab font-mono ${!isOptimized ? 'tab-active-naive' : ''}`}
              >
                <AlertTriangle size={13} className="text-amber" />
                <span>1. Unindexed Naive Query (Seq Scan)</span>
              </button>

              <button
                onClick={() => handleToggle(true)}
                className={`sql-tab font-mono ${isOptimized ? 'tab-active-tuned' : ''}`}
              >
                <Zap size={13} className="text-cyan" />
                <span>2. Production Tuned (Covering Index • 575x)</span>
              </button>
            </div>

            <button
              onClick={handleExecute}
              disabled={isRunning}
              className="btn btn-sm btn-primary run-query-btn font-mono"
            >
              <Play size={13} />
              <span>{isRunning ? "Executing EXPLAIN..." : "Run Query Plan"}</span>
            </button>
          </div>

          {/* Code & Plan Split View */}
          <div className="sql-split-view">
            {/* Left Column: SQL Code */}
            <div className="sql-code-panel">
              <div className="panel-title-bar font-mono">
                <span>SQL QUERY DEFINITION</span>
                <span className="dataset-tag">TABLE: 10,000,000 ROWS</span>
              </div>
              <pre className="sql-code font-mono">
                {isOptimized ? optimizedSql : unoptimizedSql}
              </pre>
            </div>

            {/* Right Column: Execution Plan Telemetry */}
            <div className="sql-plan-panel">
              <div className="panel-title-bar font-mono">
                <span>EXPLAIN ANALYZE TELEMETRY</span>
                <span className={`status-pill font-mono ${isOptimized ? 'pill-optimal' : 'pill-bottleneck'}`}>
                  {isOptimized ? 'INDEX ONLY SCAN' : 'PARALLEL SEQ SCAN'}
                </span>
              </div>

              {/* Metric Cards Grid */}
              <div className="sql-metrics-grid">
                <div className="metric-box">
                  <span className="metric-title font-mono">EXECUTION TIME</span>
                  <div className="metric-value-row">
                    <span className={`metric-big font-mono ${isOptimized ? 'text-emerald' : 'text-rose'}`}>
                      {runTime} ms
                    </span>
                    {isOptimized && <span className="speedup-badge font-mono">575x FASTER</span>}
                  </div>
                </div>

                <div className="metric-box">
                  <span className="metric-title font-mono">BUFFER CACHE VS DISK</span>
                  <span className="metric-val-text font-mono">
                    {isOptimized ? '14 blocks (Buffer Cache Hit)' : '124,500 blocks (1.02 GB Disk Read)'}
                  </span>
                </div>

                <div className="metric-box">
                  <span className="metric-title font-mono">POSTGRES ENGINE COST</span>
                  <span className="metric-val-text font-mono">
                    {isOptimized ? 'cost=0.43..12.85' : 'cost=0.00..184,200.45'}
                  </span>
                </div>

                <div className="metric-box">
                  <span className="metric-title font-mono">CONCURRENT QPS CAPACITY</span>
                  <span className={`metric-val-text font-mono ${isOptimized ? 'text-cyan' : 'text-amber'}`}>
                    {isOptimized ? '~12,000 req/sec' : '~22 req/sec (I/O Bottleneck)'}
                  </span>
                </div>
              </div>

              {/* Execution Plan Tree Box */}
              <div className="plan-tree-box font-mono">
                <div className="plan-line">
                  {isOptimized ? (
                    <>
                      <span className="text-cyan">➔ Index Only Scan</span> using <span className="text-amber">idx_tx_merchant_created_incl</span> on retail_transactions
                      <div className="plan-subline text-muted">
                        Index Cond: (merchant_id = 'MCH-88219' AND created_at &gt;= '2026-08-25')
                      </div>
                      <div className="plan-subline text-emerald">
                        Heap Fetches: 0 • Filter: None • Rows: 1,420
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-rose">➔ Gather (3 Workers)</span> on retail_transactions
                      <div className="plan-subline text-muted">
                        ➔ Parallel Seq Scan on retail_transactions (Filter: merchant_id = 'MCH-88219')
                      </div>
                      <div className="plan-subline text-amber">
                        Rows Removed by Filter: 9,998,580 • Loops: 3
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .sql-section {
          padding: 80px 0;
          position: relative;
        }

        .sql-card-wrapper {
          background: rgba(11, 16, 30, 0.7);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-md);
          overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .sql-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.02);
          flex-wrap: wrap;
          gap: 12px;
        }

        .sql-tab-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sql-tab {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          border: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.03);
          color: #cbd5e1;
          font-size: 0.76rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tab-active-naive {
          border-color: rgba(245, 158, 11, 0.5) !important;
          background: rgba(245, 158, 11, 0.12) !important;
          color: #fbbf24 !important;
        }

        .tab-active-tuned {
          border-color: rgba(56, 189, 248, 0.5) !important;
          background: rgba(56, 189, 248, 0.12) !important;
          color: #38bdf8 !important;
        }

        .run-query-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
        }

        .sql-split-view {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
        }

        @media (max-width: 820px) {
          .sql-split-view {
            grid-template-columns: 1fr;
          }
        }

        .sql-code-panel {
          border-right: 1px solid var(--border-hairline);
          display: flex;
          flex-direction: column;
        }

        .panel-title-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(0, 0, 0, 0.25);
          font-size: 0.7rem;
          color: #94a3b8;
        }

        .dataset-tag {
          color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.08);
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          border: 1px solid rgba(56, 189, 248, 0.2);
        }

        .sql-code {
          padding: 16px;
          margin: 0;
          font-size: 0.78rem;
          color: #cbd5e1;
          line-height: 1.55;
          background: #070a12;
          flex: 1;
          overflow-x: auto;
        }

        .sql-plan-panel {
          padding: 0;
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.15);
        }

        .status-pill {
          font-size: 0.64rem;
          padding: 2px 6px;
          border-radius: var(--radius-xs);
          font-weight: 700;
        }

        .pill-optimal {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .pill-bottleneck {
          background: rgba(244, 63, 94, 0.2);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.4);
        }

        .sql-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          padding: 16px;
        }

        .metric-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .metric-title {
          font-size: 0.65rem;
          color: #64748b;
        }

        .metric-value-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .metric-big {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .speedup-badge {
          font-size: 0.64rem;
          background: rgba(16, 185, 129, 0.18);
          color: #34d399;
          padding: 2px 6px;
          border-radius: 9999px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-weight: 700;
        }

        .metric-val-text {
          font-size: 0.76rem;
          color: #e2e8f0;
        }

        .plan-tree-box {
          margin: 0 16px 16px;
          background: #060911;
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 12px 14px;
          font-size: 0.74rem;
          line-height: 1.5;
        }

        .plan-subline {
          font-size: 0.68rem;
          margin-top: 3px;
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: #34d399; }
        .text-rose { color: #f43f5e; }
        .text-amber { color: var(--accent-amber); }
        .text-muted { color: #64748b; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
