import React, { useState, useEffect } from 'react';
import {
  Zap,
  Activity,
  Server,
  Database,
  RefreshCw,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ArrowRight,
  HardDrive,
  Cpu,
  Flame
} from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';

export default function MicroservicesChaosDemo() {
  const [selectedNodeId, setSelectedNodeId] = useState('orders');
  const [chaosActive, setChaosActive] = useState(false);
  const [chaosScenario, setChaosScenario] = useState(null);
  const [logs, setLogs] = useState([
    { id: 1, time: '14:20:01', level: 'INFO', text: 'All 8 distributed microservices healthy. Cluster QPS: 8,420.' },
    { id: 2, time: '14:20:05', level: 'INFO', text: 'Redis Cluster hit-ratio: 94.6%. PostgreSQL P99: 11.2ms.' }
  ]);
  const [metrics, setMetrics] = useState({
    qps: 8450,
    latency: 14,
    errorRate: 0.02,
    circuitBreaker: 'CLOSED'
  });

  const nodes = [
    {
      id: 'gateway',
      name: 'Kong API Gateway',
      tech: 'Kong / Nginx Lua',
      role: 'SSL Termination, JWT validation, Token-bucket Rate Limiting',
      latency: '2.1 ms',
      status: 'healthy',
      icon: <Server size={18} className="text-cyan" />
    },
    {
      id: 'auth',
      name: 'Auth & Session Svc',
      tech: 'Go (Golang)',
      role: 'Stateless Ed25519 token signing & Redis session verification',
      latency: '3.4 ms',
      status: 'healthy',
      icon: <Cpu size={18} className="text-violet" />
    },
    {
      id: 'orders',
      name: 'Retail Orders Engine',
      tech: 'Go / Goroutines',
      role: 'Core retail transaction workflow, inventory locks, 1,000+ QPS',
      latency: '6.8 ms',
      status: 'healthy',
      icon: <Layers size={18} className="text-blue" />
    },
    {
      id: 'redis',
      name: 'Redis Cache Cluster',
      tech: 'Redis v7.2 Cluster',
      role: 'Sub-millisecond product catalogue & distributed locks (Redlock)',
      latency: '0.8 ms',
      status: chaosScenario === 'redis_crash' ? 'failed' : 'healthy',
      icon: <Zap size={18} className={chaosScenario === 'redis_crash' ? 'text-rose' : 'text-amber'} />
    },
    {
      id: 'db',
      name: 'PostgreSQL Primary',
      tech: 'Postgres 16 + pgvector',
      role: 'ACID source of truth, WAL replication, HNSW vector index',
      latency: chaosScenario === 'redis_crash' ? '28.4 ms' : '11.2 ms',
      status: chaosScenario === 'db_partition' ? 'warning' : 'healthy',
      icon: <Database size={18} className="text-cyan" />
    },
    {
      id: 'kafka',
      name: 'Kafka Event Bus',
      tech: 'Apache Kafka 3.6',
      role: 'Asynchronous event streaming, webhook decoupling, audit trail',
      latency: '4.2 ms',
      status: chaosScenario === 'kafka_lag' ? 'warning' : 'healthy',
      icon: <HardDrive size={18} className="text-emerald" />
    }
  ];

  const triggerChaos = (type) => {
    if (chaosActive) return;
    playClick();
    setChaosActive(true);
    setChaosScenario(type);

    if (type === 'redis_crash') {
      setLogs(prev => [
        { id: Date.now(), time: 'NOW', level: 'CRIT', text: '💥 CHAOS INJECTED: Redis Master node killed! Cache stampede detected.' },
        { id: Date.now() + 1, time: 'NOW+1s', level: 'WARN', text: 'Circuit Breaker tripped to OPEN. Fallback in-memory LRU engaged.' },
        ...prev.slice(0, 5)
      ]);
      setMetrics({
        qps: 6200,
        latency: 48,
        errorRate: 1.4,
        circuitBreaker: 'OPEN (FALLBACK ACTIVE)'
      });

      // Recovery sequence
      setTimeout(() => {
        setLogs(prev => [
          { id: Date.now(), time: 'NOW+3s', level: 'INFO', text: 'Auto-failover: Redis Replica promoted to Master. Cluster sync complete.' },
          { id: Date.now() + 1, time: 'NOW+4s', level: 'INFO', text: 'Circuit breaker reset to CLOSED. Latency normalized.' },
          ...prev.slice(0, 5)
        ]);
        setMetrics({
          qps: 8450,
          latency: 14,
          errorRate: 0.02,
          circuitBreaker: 'CLOSED'
        });
        setChaosActive(false);
        setChaosScenario(null);
        playSuccess();
      }, 4500);
    } else if (type === 'kafka_lag') {
      setLogs(prev => [
        { id: Date.now(), time: 'NOW', level: 'WARN', text: '⚡ CHAOS INJECTED: 10,000 incoming webhooks/sec blast into Kafka topic.' },
        { id: Date.now() + 1, time: 'NOW+1s', level: 'INFO', text: 'Horizontal Auto-scaler (KEDA) spawned +8 consumer pods in parallel.' },
        ...prev.slice(0, 5)
      ]);
      setMetrics({
        qps: 18900,
        latency: 22,
        errorRate: 0.05,
        circuitBreaker: 'AUTOSCALED (+8 PODS)'
      });

      setTimeout(() => {
        setLogs(prev => [
          { id: Date.now(), time: 'NOW+3s', level: 'INFO', text: 'Lag cleared: 100,000 events committed with zero dropped records.' },
          ...prev.slice(0, 5)
        ]);
        setMetrics({
          qps: 8450,
          latency: 14,
          errorRate: 0.02,
          circuitBreaker: 'CLOSED'
        });
        setChaosActive(false);
        setChaosScenario(null);
        playSuccess();
      }, 4000);
    }
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <section id="microservices-chaos-section" className="section chaos-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge font-mono">
            <Zap size={12} className="text-amber" />
            <span>DISTRIBUTED SYSTEMS • RESILIENCE</span>
          </div>
          <h2 className="section-title">Microservices &amp; Chaos Engineering Simulator</h2>
          <p className="section-subtitle">
            An interactive representation of the fault-tolerant architectures I engineered for high-throughput retail &amp; exam platforms. Click any node or test live circuit breakers:
          </p>
        </div>

        {/* Simulator Dashboard Container */}
        <div className="chaos-container">
          {/* Top Live Telemetry Bar */}
          <div className="chaos-telemetry-bar">
            <div className="telemetry-item">
              <span className="telemetry-label font-mono">SYSTEM THROUGHPUT</span>
              <span className="telemetry-val font-mono text-cyan">{metrics.qps.toLocaleString()} QPS</span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label font-mono">P99 LATENCY</span>
              <span className={`telemetry-val font-mono ${metrics.latency > 30 ? 'text-amber' : 'text-emerald'}`}>
                {metrics.latency} ms
              </span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label font-mono">ERROR BUDGET</span>
              <span className="telemetry-val font-mono text-emerald">{metrics.errorRate}% ERR</span>
            </div>

            <div className="telemetry-item">
              <span className="telemetry-label font-mono">CIRCUIT BREAKER</span>
              <span className={`telemetry-val font-mono ${metrics.circuitBreaker !== 'CLOSED' ? 'text-rose' : 'text-cyan'}`}>
                {metrics.circuitBreaker}
              </span>
            </div>
          </div>

          {/* Interactive Topology Graph */}
          <div className="topology-viewport">
            <div className="topology-nodes-grid">
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isFailed = node.status === 'failed';
                const isWarn = node.status === 'warning';

                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      playClick();
                      setSelectedNodeId(node.id);
                    }}
                    className={`topology-node-card ${isSelected ? 'node-selected' : ''} ${isFailed ? 'node-failed' : ''} ${isWarn ? 'node-warn' : ''}`}
                  >
                    <div className="node-card-top">
                      <div className="node-icon">{node.icon}</div>
                      <span className={`node-status-pill font-mono ${isFailed ? 'pill-fail' : isWarn ? 'pill-warn' : 'pill-ok'}`}>
                        {isFailed ? 'OFFLINE' : isWarn ? 'DEGRADED' : 'HEALTHY'}
                      </span>
                    </div>

                    <div className="node-name">{node.name}</div>
                    <div className="node-tech font-mono">{node.tech}</div>

                    <div className="node-card-footer font-mono">
                      <span>P99: {node.latency}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting arrows indicator */}
            <div className="topology-traffic-flow font-mono">
              <span className="traffic-dot animate-pulse"></span>
              <span>LIVE TRAFFIC: Client HTTPS → Kong Gateway → Go Services → Redis / Postgres / Kafka</span>
            </div>
          </div>

          {/* Bottom Control & Inspector Split View */}
          <div className="chaos-bottom-split">
            {/* Left: Node Deep Dive Inspector */}
            <div className="node-inspector-panel">
              <div className="inspector-header">
                <span className="inspector-tag font-mono">NODE TELEMETRY INSPECTOR</span>
                <h4 className="inspector-node-name">{selectedNode.name}</h4>
              </div>

              <div className="inspector-details">
                <div className="detail-row">
                  <span className="detail-label font-mono">Core Stack:</span>
                  <span className="detail-val font-mono text-cyan">{selectedNode.tech}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label font-mono">Avg Latency:</span>
                  <span className="detail-val font-mono">{selectedNode.latency}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label font-mono">System Role:</span>
                  <span className="detail-val">{selectedNode.role}</span>
                </div>
              </div>
            </div>

            {/* Right: Chaos Drills & Live Logs */}
            <div className="chaos-controls-panel">
              <div className="controls-header">
                <span className="inspector-tag font-mono">CHAOS DRILL INJECTOR</span>
                <span className="controls-status font-mono">
                  {chaosActive ? '⚠️ DRILL RUNNING...' : 'SYSTEM STABLE'}
                </span>
              </div>

              <div className="chaos-buttons-row">
                <button
                  onClick={() => triggerChaos('redis_crash')}
                  disabled={chaosActive}
                  className="btn btn-sm btn-subtle chaos-btn font-mono"
                >
                  <Flame size={14} className="text-rose" />
                  <span>Kill Redis (Stampede Drill)</span>
                </button>

                <button
                  onClick={() => triggerChaos('kafka_lag')}
                  disabled={chaosActive}
                  className="btn btn-sm btn-subtle chaos-btn font-mono"
                >
                  <Zap size={14} className="text-amber" />
                  <span>Blast 10k Webhooks/s</span>
                </button>
              </div>

              {/* Console log stream */}
              <div className="chaos-log-stream font-mono">
                {logs.map((l) => (
                  <div key={l.id} className="log-line">
                    <span className="log-time">{l.time}</span>
                    <span className={`log-badge log-${l.level.toLowerCase()}`}>{l.level}</span>
                    <span className="log-msg">{l.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chaos-section {
          padding: 80px 0;
          position: relative;
        }

        .chaos-container {
          background: rgba(11, 16, 30, 0.7);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-md);
          overflow: hidden;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .chaos-telemetry-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.02);
        }

        .telemetry-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .telemetry-label {
          font-size: 0.66rem;
          color: #64748b;
          letter-spacing: 0.04em;
        }

        .telemetry-val {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .topology-viewport {
          padding: 24px 20px;
          background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.03) 0%, transparent 70%);
          border-bottom: 1px solid var(--border-hairline);
        }

        .topology-nodes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 14px;
        }

        .topology-node-card {
          background: rgba(17, 24, 39, 0.85);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-sm);
          padding: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .topology-node-card:hover {
          transform: translateY(-2px);
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }

        .node-selected {
          border-color: var(--accent-cyan) !important;
          background: rgba(56, 189, 248, 0.08) !important;
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.2) !important;
        }

        .node-failed {
          border-color: #f43f5e !important;
          background: rgba(244, 63, 94, 0.12) !important;
          animation: nodeFlash 0.8s infinite alternate ease-in-out;
        }

        .node-warn {
          border-color: #f59e0b !important;
          background: rgba(245, 158, 11, 0.1) !important;
        }

        @keyframes nodeFlash {
          from { box-shadow: 0 0 10px rgba(244, 63, 94, 0.2); }
          to { box-shadow: 0 0 25px rgba(244, 63, 94, 0.6); }
        }

        .node-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .node-status-pill {
          font-size: 0.62rem;
          padding: 2px 6px;
          border-radius: 9999px;
          font-weight: 700;
        }

        .pill-ok {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .pill-fail {
          background: rgba(244, 63, 94, 0.2);
          color: #fb7185;
          border: 1px solid rgba(244, 63, 94, 0.4);
        }

        .pill-warn {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .node-name {
          font-size: 0.92rem;
          font-weight: 600;
          color: #f8fafc;
          margin-bottom: 2px;
        }

        .node-tech {
          font-size: 0.72rem;
          color: #94a3b8;
          margin-bottom: 10px;
        }

        .node-card-footer {
          font-size: 0.68rem;
          color: #64748b;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
          padding-top: 6px;
        }

        .topology-traffic-flow {
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.72rem;
          color: #94a3b8;
          background: rgba(0, 0, 0, 0.3);
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid var(--border-hairline);
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .traffic-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 8px var(--accent-cyan);
        }

        .chaos-bottom-split {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 0;
        }

        @media (max-width: 820px) {
          .chaos-bottom-split {
            grid-template-columns: 1fr;
          }
        }

        .node-inspector-panel {
          padding: 20px;
          border-right: 1px solid var(--border-hairline);
          background: rgba(0, 0, 0, 0.2);
        }

        .inspector-tag {
          font-size: 0.66rem;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }

        .inspector-node-name {
          font-size: 1.1rem;
          color: #fff;
          font-weight: 700;
          margin-top: 2px;
          margin-bottom: 14px;
        }

        .inspector-details {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 8px 12px;
        }

        .detail-label {
          font-size: 0.68rem;
          color: #64748b;
        }

        .detail-val {
          font-size: 0.82rem;
          color: #e2e8f0;
          line-height: 1.45;
        }

        .chaos-controls-panel {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .controls-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .controls-status {
          font-size: 0.68rem;
          color: #34d399;
        }

        .chaos-buttons-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .chaos-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-color: rgba(255, 255, 255, 0.15);
          font-size: 0.76rem;
        }

        .chaos-btn:hover:not(:disabled) {
          border-color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.1);
        }

        .chaos-log-stream {
          background: #060911;
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 10px 12px;
          font-size: 0.72rem;
          height: 110px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .log-line {
          display: flex;
          align-items: center;
          gap: 8px;
          line-height: 1.4;
        }

        .log-time {
          color: #64748b;
        }

        .log-badge {
          font-size: 0.6rem;
          padding: 1px 4px;
          border-radius: 2px;
          font-weight: 700;
        }

        .log-info { background: rgba(56, 189, 248, 0.15); color: #38bdf8; }
        .log-warn { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .log-crit { background: rgba(244, 63, 94, 0.25); color: #fb7185; }

        .log-msg {
          color: #cbd5e1;
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-violet { color: #a78bfa; }
        .text-blue { color: #60a5fa; }
        .text-amber { color: var(--accent-amber); }
        .text-rose { color: #f43f5e; }
        .text-emerald { color: #34d399; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
