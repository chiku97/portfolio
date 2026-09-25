import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ExternalLink,
  Check
} from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = () => {
    playSuccess();
    setDownloadSuccess(true);

    // Direct browser file download for the official PDF
    const link = document.createElement('a');
    link.href = './Uttam_Kumar_Mahto_Resume.pdf';
    link.download = 'Uttam_Kumar_Mahto_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  const handlePrint = () => {
    playClick();
    window.open('./Uttam_Kumar_Mahto_Resume.pdf', '_blank');
  };

  return (
    <div className="modal-backdrop resume-backdrop" onClick={onClose}>
      <div 
        className="resume-viewer-container" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Document Control Header */}
        <div className="resume-toolbar">
          <div className="toolbar-left">
            <div className="doc-icon-badge">
              <FileText size={16} />
            </div>
            <div className="doc-info">
              <span className="doc-title font-mono">Uttam_Kumar_Mahto_Resume.pdf</span>
              <span className="doc-meta font-mono">Official 2-Page CV • Verified</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="toolbar-right">
            <button 
              onClick={handleDownloadPDF} 
              className="btn btn-solid btn-sm btn-download-pdf font-mono"
              title="Download official PDF copy"
            >
              {downloadSuccess ? <Check size={14} className="text-emerald" /> : <Download size={14} />}
              <span>{downloadSuccess ? "Downloaded!" : "Download PDF"}</span>
            </button>

            <a 
              href="./Uttam_Kumar_Mahto_Resume.pdf" 
              target="_blank" 
              rel="noreferrer"
              onClick={playClick}
              className="btn btn-subtle btn-sm font-mono doc-newtab-btn"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink size={13} />
              <span>New Tab ↗</span>
            </a>

            <button 
              onClick={handlePrint} 
              className="btn btn-subtle btn-sm font-mono"
              title="Print PDF document"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button 
              onClick={() => { playClick(); onClose(); }} 
              className="modal-close-icon-btn" 
              aria-label="Close resume viewer"
              title="Close viewer (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer Viewport */}
        <div className="resume-pdf-viewport">
          <object
            data="./Uttam_Kumar_Mahto_Resume.pdf#view=FitH"
            type="application/pdf"
            className="resume-pdf-object"
          >
            <iframe
              src="./Uttam_Kumar_Mahto_Resume.pdf#view=FitH"
              className="resume-pdf-iframe"
              title="Uttam Kumar Mahto Resume"
            >
              <div className="pdf-fallback-msg font-mono">
                <FileText size={32} className="text-cyan" />
                <p>Your browser doesn't have an inline PDF plugin.</p>
                <a 
                  href="./Uttam_Kumar_Mahto_Resume.pdf" 
                  download="Uttam_Kumar_Mahto_Resume.pdf"
                  className="btn btn-primary"
                >
                  Download PDF to View
                </a>
              </div>
            </iframe>
          </object>
        </div>
      </div>

      <style>{`
        .resume-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 100000 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .resume-viewer-container {
          background: #090d18;
          border: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: var(--radius-md);
          box-shadow: 
            0 25px 80px rgba(0, 0, 0, 0.95), 
            0 0 35px rgba(56, 189, 248, 0.15);
          width: 96vw;
          max-width: 980px;
          height: 92vh;
          max-height: 92vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: resumeModalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes resumeModalPop {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .resume-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: #0d1322;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          gap: 12px;
          flex-shrink: 0;
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
          flex-shrink: 0;
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

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-download-pdf {
          background: linear-gradient(135deg, #0284c7, #2563eb);
          border: 1px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.35);
          color: #fff;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .btn-download-pdf:hover {
          background: linear-gradient(135deg, #0369a1, #1d4ed8);
        }

        .doc-newtab-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
        }

        .modal-close-icon-btn {
          width: 30px;
          height: 30px;
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

        /* PDF Viewport */
        .resume-pdf-viewport {
          flex: 1;
          width: 100%;
          height: 100%;
          background: #1e293b;
          overflow: hidden;
          position: relative;
        }

        .resume-pdf-object,
        .resume-pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }

        .pdf-fallback-msg {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 12px;
          color: #94a3b8;
          text-align: center;
          padding: 20px;
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
