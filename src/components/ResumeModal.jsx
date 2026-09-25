import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Check,
  ExternalLink
} from 'lucide-react';
import { personalInfo, experiences, projects, educationList } from '../data/portfolioData';
import { playClick, playSuccess } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    playClick();
    const originalTitle = document.title;
    document.title = "Uttam_Kumar_Mahto_Resume";
    window.print();
    document.title = originalTitle;
  };

  const handleDownloadPDF = () => {
    playSuccess();
    setDownloadSuccess(true);
    const originalTitle = document.title;
    document.title = "Uttam_Kumar_Mahto_Resume.pdf";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
      setDownloadSuccess(false);
    }, 3000);
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 1.3));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.75));
  const resetZoom = () => setZoomLevel(1);

  return (
    <div className="modal-backdrop resume-backdrop" onClick={onClose}>
      <div 
        className="resume-viewer-container" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Document Control Header */}
        <div className="resume-toolbar no-print">
          <div className="toolbar-left">
            <div className="doc-icon-badge">
              <FileText size={16} />
            </div>
            <div className="doc-info">
              <span className="doc-title font-mono">Uttam_Kumar_Mahto_Resume.pdf</span>
              <span className="doc-meta font-mono">A4 Format • Updated 2026</span>
            </div>
          </div>

          {/* Center Zoom Controls */}
          <div className="toolbar-center">
            <button 
              onClick={zoomOut} 
              className="tool-btn" 
              title="Zoom out"
              disabled={zoomLevel <= 0.75}
            >
              <ZoomOut size={14} />
            </button>
            <span className="zoom-indicator font-mono">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button 
              onClick={zoomIn} 
              className="tool-btn" 
              title="Zoom in"
              disabled={zoomLevel >= 1.3}
            >
              <ZoomIn size={14} />
            </button>
            <button 
              onClick={resetZoom} 
              className="tool-btn" 
              title="Reset Zoom (100%)"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="toolbar-right">
            <button 
              onClick={handleDownloadPDF} 
              className="btn btn-solid btn-sm btn-download-pdf"
              title="Download official PDF copy"
            >
              {downloadSuccess ? <Check size={14} /> : <Download size={14} />}
              <span>{downloadSuccess ? "Ready!" : "Download PDF"}</span>
            </button>

            <button 
              onClick={handlePrint} 
              className="btn btn-subtle btn-sm"
              title="Print document"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button 
              onClick={onClose} 
              className="modal-close-icon-btn" 
              aria-label="Close resume viewer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Document Canvas Wrapper */}
        <div className="resume-canvas-scroll">
          <div 
            className="resume-sheet-wrapper"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          >
            <div className="resume-sheet">
              {/* Header */}
              <div className="sheet-header">
                <h1 className="sheet-name">{personalInfo.name}</h1>
                <div className="sheet-title">{personalInfo.role}</div>
                <div className="sheet-contacts">
                  <span>{personalInfo.location}</span>
                  <span>•</span>
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  <span>•</span>
                  <span>{personalInfo.phone}</span>
                  <span>•</span>
                  <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                    linkedin.com/in/uttam-b160bb197
                  </a>
                  <span>•</span>
                  <a href={personalInfo.github} target="_blank" rel="noreferrer">
                    github.com/chiku97
                  </a>
                </div>
              </div>

              <div className="sheet-divider"></div>

              {/* Professional Summary */}
              <div className="sheet-section">
                <h2 className="sheet-section-title">PROFESSIONAL SUMMARY</h2>
                <p className="sheet-text">{personalInfo.bio?.pro || personalInfo.bio}</p>
              </div>

              {/* Technical Skills */}
              <div className="sheet-section">
                <h2 className="sheet-section-title">TECHNICAL SKILLS</h2>
                <div className="skills-resume-grid">
                  <div><strong>Programming Languages:</strong> JavaScript (ES6+), TypeScript, Ruby, SQL</div>
                  <div><strong>Frontend:</strong> React.js, Next.js, Redux Toolkit, React Query, Tailwind CSS, HTML5, CSS3</div>
                  <div><strong>Backend & Microservices:</strong> Node.js, Express.js, Ruby on Rails, REST APIs, RBAC, Multi-Tenant Architecture</div>
                  <div><strong>Databases & Caching:</strong> PostgreSQL, MySQL, Redis, MongoDB</div>
                  <div><strong>Search & Retrieval:</strong> Elasticsearch, Full-Text Search, Fuzzy SKU Matching (fuzziness: AUTO), Vector Search</div>
                  <div><strong>AI & LLMs:</strong> LLMs, RAG, pgvector, Vector Databases, Prompt Engineering, OpenAI API, Gemini API</div>
                  <div><strong>Cloud & DevOps:</strong> AWS (EC2, S3), Docker, Jenkins, Drone CI, Nginx, CI/CD Automation</div>
                  <div><strong>Testing & Observability:</strong> Cypress, Jest, Mocha, Chai, Postman, Grafana, New Relic</div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="sheet-section">
                <h2 className="sheet-section-title">PROFESSIONAL EXPERIENCE</h2>
                {experiences.map((exp) => (
                  <div key={exp.id} className="sheet-exp-item">
                    <div className="sheet-exp-header">
                      <div>
                        <strong className="sheet-exp-role">{exp.role}</strong> — <span>{exp.company}</span>
                      </div>
                      <span className="sheet-exp-date">{exp.period}</span>
                    </div>
                    <div className="sheet-exp-platform">
                      <em>{exp.platform}</em> | {exp.location}
                    </div>
                    <ul className="sheet-bullets">
                      {exp.bulletPoints.map((pt, idx) => (
                        <li key={idx}>{typeof pt === 'object' ? pt.pro : pt}</li>
                      ))}
                    </ul>
                    <div className="sheet-env-line">
                      <strong>Environment:</strong> {exp.techStack.join(', ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects */}
              <div className="sheet-section">
                <h2 className="sheet-section-title">FEATURED PROJECTS</h2>
                {projects.map((proj) => (
                  <div key={proj.id} className="sheet-proj-item">
                    <div className="sheet-proj-header">
                      <strong className="sheet-proj-name">{proj.title}</strong>
                      <span className="sheet-proj-stack">{proj.techStack.slice(0, 5).join(', ')}</span>
                    </div>
                    <p className="sheet-proj-desc">{typeof proj.summary === 'object' ? proj.summary.pro : proj.summary}</p>
                    <div className="sheet-proj-steps">
                      <strong>Architecture:</strong> {proj.architectureSteps.map(s => s.step).join(' → ')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="sheet-section">
                <h2 className="sheet-section-title">EDUCATION</h2>
                {educationList.map((edu, idx) => (
                  <div key={idx} className="sheet-edu-item">
                    <div>
                      <strong>{edu.degree}</strong> — {edu.institution} ({edu.location})
                    </div>
                    <span className="sheet-edu-year">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .resume-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 6, 14, 0.88);
          backdrop-filter: blur(14px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        /* Container that fits comfortably in browser */
        .resume-viewer-container {
          background: #090d18;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-md);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.08);
          width: 95vw;
          max-width: 920px;
          height: 92vh;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Top Toolbar */
        .resume-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #0e1424;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
          flex-wrap: wrap;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doc-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-xs);
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: var(--accent-blue);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doc-info {
          display: flex;
          flex-direction: column;
        }

        .doc-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #f8fafc;
        }

        .doc-meta {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .toolbar-center {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 6px;
          border-radius: var(--radius-sm);
        }

        @media (max-width: 680px) {
          .toolbar-center { display: none; }
        }

        .tool-btn {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          border-radius: var(--radius-xs);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tool-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .tool-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .zoom-indicator {
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 0 6px;
          min-width: 44px;
          text-align: center;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-download-pdf {
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
        }

        .modal-close-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-xs);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .modal-close-icon-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Scrollable Canvas */
        .resume-canvas-scroll {
          flex: 1;
          overflow-y: auto;
          overflow-x: auto;
          padding: 30px 16px;
          display: flex;
          justify-content: center;
          background: #05070e;
        }

        .resume-sheet-wrapper {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          max-width: 820px;
          display: flex;
          justify-content: center;
        }

        /* Real Sheet of Paper */
        .resume-sheet {
          background: #ffffff;
          color: #0f172a;
          padding: 44px 48px;
          border-radius: 4px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7);
          width: 100%;
          max-width: 800px;
        }

        @media (max-width: 768px) {
          .resume-sheet {
            padding: 24px 20px;
          }
        }

        .sheet-header {
          text-align: center;
          margin-bottom: 12px;
        }

        .sheet-name {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 2px;
          letter-spacing: -0.02em;
        }

        .sheet-title {
          font-size: 0.96rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 6px;
        }

        .sheet-contacts {
          font-size: 0.82rem;
          color: #475569;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .sheet-contacts a {
          color: #0284c7;
          text-decoration: none;
        }

        .sheet-divider {
          border-bottom: 1.5px solid #cbd5e1;
          margin: 12px 0 16px;
        }

        .sheet-section {
          margin-bottom: 16px;
        }

        .sheet-section-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0f172a;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 3px;
          margin-bottom: 7px;
          letter-spacing: 0.05em;
        }

        .sheet-text {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.55;
        }

        .skills-resume-grid {
          font-size: 0.83rem;
          display: flex;
          flex-direction: column;
          gap: 4px;
          color: #334155;
        }

        .sheet-exp-item, .sheet-proj-item {
          margin-bottom: 13px;
        }

        .sheet-exp-header, .sheet-proj-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.87rem;
        }

        .sheet-exp-role, .sheet-proj-name {
          color: #0f172a;
        }

        .sheet-exp-date, .sheet-proj-stack {
          font-size: 0.79rem;
          color: #64748b;
          font-weight: 500;
        }

        .sheet-exp-platform {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 3px;
        }

        .sheet-bullets {
          margin-left: 16px;
          font-size: 0.83rem;
          color: #334155;
          display: flex;
          flex-direction: column;
          gap: 2.5px;
        }

        .sheet-env-line {
          font-size: 0.79rem;
          color: #64748b;
          margin-top: 3px;
        }

        .sheet-proj-desc {
          font-size: 0.83rem;
          color: #334155;
          margin-bottom: 3px;
        }

        .sheet-proj-steps {
          font-size: 0.79rem;
          color: #64748b;
        }

        .sheet-edu-item {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          color: #334155;
          margin-bottom: 3px;
        }

        .sheet-edu-year {
          color: #64748b;
        }

        /* Clean Print Mode */
        @media print {
          .no-print {
            display: none !important;
          }
          body, html {
            background: #ffffff !important;
            color: #000000 !important;
            height: auto !important;
            overflow: visible !important;
          }
          .modal-backdrop {
            position: static !important;
            background: none !important;
            padding: 0 !important;
          }
          .resume-viewer-container {
            box-shadow: none !important;
            border: none !important;
            background: transparent !important;
            max-width: 100% !important;
            width: 100% !important;
            height: auto !important;
            max-height: none !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          .resume-canvas-scroll {
            padding: 0 !important;
            background: transparent !important;
            overflow: visible !important;
          }
          .resume-sheet-wrapper {
            transform: none !important;
            max-width: 100% !important;
          }
          .resume-sheet {
            box-shadow: none !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
