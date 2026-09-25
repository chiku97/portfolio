import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Flame, ThumbsUp } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';
import { playClick, playSuccess } from '../utils/audio';
import { getPortfolioStats, likeProjectApi } from '../utils/api';

export default function Projects({ honestMode }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [likes, setLikes] = useState({
    'rag-analytics-chatbot': 48,
    'coding-assessment-platform': 64,
    'multi-tenant-retail-engine': 58,
    'jwt-auth-session-service': 36
  });
  const [likedMap, setLikedMap] = useState({});

  useEffect(() => {
    getPortfolioStats().then(stats => {
      if (stats?.projectLikes) {
        setLikes(prev => ({ ...prev, ...stats.projectLikes }));
      }
    }).catch(() => {});
  }, []);

  const handleLike = async (projectId) => {
    playSuccess();
    setLikedMap(prev => ({ ...prev, [projectId]: true }));
    setLikes(prev => ({ ...prev, [projectId]: (prev[projectId] || 0) + 1 }));

    try {
      const res = await likeProjectApi(projectId);
      if (res?.likes) {
        setLikes(prev => ({ ...prev, [projectId]: res.likes }));
      }
    } catch (e) {
      console.warn("Like update note:", e);
    }
  };

  const filters = ["All", "AI & Search", "Distributed Systems", "Backend Architecture"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((p) => p.category.includes(activeFilter) || activeFilter === p.category);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-eyebrow">Selected Engineering Work</div>
        <h2 className="section-heading">Featured Systems & <span className="gradient-title">Architecture</span></h2>
        <p className="section-subtext">
          Production case studies: high-concurrency sandboxes, hybrid vector search pipelines, and enterprise multi-tenant engines.
        </p>

        {honestMode && (
          <div className="honest-banner">
            <Flame size={18} className="text-amber" />
            <span><strong>☕ Brutally Honest Mode:</strong> Built to withstand massive real-world load, malicious payloads, and that one person who tests forms with emojis.</span>
          </div>
        )}

        {/* Filter bar */}
        <div className="filter-bar">
          {filters.map((f) => (
            <motion.button
              key={f}
              onClick={() => { playClick(); setActiveFilter(f); }}
              className={`btn btn-sm ${activeFilter === f ? 'btn-cyan' : 'btn-subtle'}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {f}
            </motion.button>
          ))}
        </div>

        {/* Animated Projects Stack */}
        <motion.div className="projects-stack" layout>
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <motion.div 
                key={`${p.id}-${honestMode}`} 
                className="glass-card project-item"
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, borderColor: "rgba(56, 189, 248, 0.45)" }}
              >
                <div className="project-item-top">
                  <div className="project-titles">
                    <div className="project-meta-strip">
                      <span className="project-category font-mono">{p.category}</span>
                      <span className="project-metrics font-mono">{p.metrics}</span>
                    </div>
                    <h3 className="project-name">{p.title}</h3>
                    <div className="project-sub font-mono">{p.subtitle}</div>
                  </div>

                  <div className="project-quick-links">
                    <button 
                      onClick={() => handleLike(p.id)}
                      className={`icon-tool-btn like-btn ${likedMap[p.id] ? 'liked' : ''}`}
                      title="Endorse / Like this architecture"
                    >
                      <ThumbsUp size={14} className={likedMap[p.id] ? "text-cyan" : ""} />
                      <span className="like-count font-mono">{likes[p.id] || 42}</span>
                    </button>

                    <a 
                      href={p.githubUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={playClick}
                      className="icon-tool-btn"
                      title="View GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  </div>
                </div>

                <p className="project-summary-text">
                  {typeof p.summary === 'object' ? p.summary[honestMode ? 'honest' : 'pro'] : p.summary}
                </p>

                {/* Problem & Solution Accordion */}
                <div className="project-details-box">
                  <div className="detail-section">
                    <span className="detail-title font-mono">The Engineering Challenge:</span>
                    <p className="detail-desc">{p.problemStatement}</p>
                  </div>

                  <div className="detail-section">
                    <span className="detail-title font-mono">Pipeline Architecture:</span>
                    <div className="arch-steps-grid">
                      {p.architectureSteps.map((st, i) => (
                        <div key={i} className="arch-step-col">
                          <span className="step-num font-mono">0{i + 1}</span>
                          <span className="step-heading">{st.step}</span>
                          <span className="step-body">{st.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-footer">
                  <div className="project-tags">
                    {p.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <a 
                    href={p.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={playClick}
                    className="source-code-link font-mono"
                  >
                    <span>View Repository</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .filter-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 28px;
          flex-wrap: wrap;
        }

        .projects-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .project-item {
          padding: 30px;
        }

        .project-item-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .project-meta-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
        }

        .project-category {
          font-size: 0.74rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
        }

        .project-metrics {
          font-size: 0.72rem;
          color: #34d399;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 2px 7px;
          border-radius: var(--radius-xs);
        }

        .project-name {
          font-size: 1.35rem;
          color: #fff;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .project-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .project-summary-text {
          font-size: 0.96rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 22px;
        }

        .project-details-box {
          background: #080c18;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 20px;
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .detail-title {
          font-size: 0.74rem;
          color: var(--accent-cyan);
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .detail-desc {
          font-size: 0.88rem;
          color: #cbd5e1;
          line-height: 1.55;
        }

        .arch-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        @media (max-width: 820px) {
          .arch-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .arch-steps-grid {
            grid-template-columns: 1fr;
          }
        }

        .arch-step-col {
          display: flex;
          flex-direction: column;
          gap: 4px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-xs);
          padding: 12px;
        }

        .step-num {
          font-size: 0.7rem;
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .step-heading {
          font-size: 0.84rem;
          font-weight: 600;
          color: #f1f5f9;
        }

        .step-body {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .project-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 18px;
          border-top: 1px solid var(--border-subtle);
          gap: 14px;
          flex-wrap: wrap;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          flex: 1;
        }

        .source-code-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.82rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .source-code-link:hover {
          color: var(--accent-cyan);
        }

        .icon-tool-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .icon-tool-btn:hover {
          color: #fff;
          border-color: var(--accent-cyan);
          background: rgba(56, 189, 248, 0.12);
        }

        .like-btn {
          width: auto;
          padding: 0 10px;
          gap: 6px;
          cursor: pointer;
        }

        .like-btn.liked {
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(56, 189, 248, 0.1);
        }

        .like-count {
          font-size: 0.76rem;
          color: #cbd5e1;
        }

        .like-btn.liked .like-count {
          color: var(--accent-cyan);
          font-weight: 700;
        }

        .text-amber { color: var(--accent-amber); }
        .text-cyan { color: var(--accent-cyan); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </section>
  );
}
