import React from 'react';

const technologies = [
  { name: "Node.js", tag: "Runtime" },
  { name: "Express.js", tag: "API Framework" },
  { name: "PostgreSQL", tag: "Relational DB" },
  { name: "pgvector", tag: "Vector Search" },
  { name: "Elasticsearch", tag: "Fuzzy / BM25" },
  { name: "Redis", tag: "Cache & Locks" },
  { name: "React.js", tag: "Frontend" },
  { name: "Ruby on Rails", tag: "Enterprise Backend" },
  { name: "Docker", tag: "Containerization" },
  { name: "AWS (EC2/S3)", tag: "Cloud" },
  { name: "Drone CI", tag: "Pipelines" },
  { name: "Cypress", tag: "E2E Testing" },
  { name: "OpenAI & Gemini APIs", tag: "RAG & LLM" },
  { name: "Prisma ORM", tag: "Data Modeling" },
  { name: "TypeScript", tag: "Type Safety" },
];

export default function TechMarquee() {
  return (
    <div className="marquee-wrapper">
      <div className="marquee-fade-left"></div>
      <div className="marquee-fade-right"></div>
      
      <div className="marquee-track">
        {/* Render twice for continuous loop */}
        {[...technologies, ...technologies].map((tech, idx) => (
          <div key={idx} className="marquee-item font-mono">
            <span className="marquee-dot"></span>
            <span className="marquee-name">{tech.name}</span>
            <span className="marquee-tag">{tech.tag}</span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 16px 0;
          background: rgba(17, 20, 28, 0.4);
          border-top: 1px solid var(--border-hairline);
          border-bottom: 1px solid var(--border-hairline);
        }

        .marquee-fade-left, .marquee-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-fade-left {
          left: 0;
          background: linear-gradient(90deg, var(--bg-body) 0%, transparent 100%);
        }

        .marquee-fade-right {
          right: 0;
          background: linear-gradient(270deg, var(--bg-body) 0%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 16px;
          width: max-content;
          animation: marqueeScroll 36s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          white-space: nowrap;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .marquee-item:hover {
          border-color: rgba(56, 189, 248, 0.4);
          background: rgba(56, 189, 248, 0.06);
        }

        .marquee-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--accent-blue);
        }

        .marquee-name {
          color: #f1f5f9;
          font-weight: 600;
        }

        .marquee-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 1px 6px;
          border-radius: var(--radius-xs);
        }

        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
