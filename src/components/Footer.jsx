import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onOpenDeployGuide }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <div className="footer-name">{personalInfo.name}</div>
          <div className="footer-desc">
            Full Stack & Backend Systems Engineer • Bangalore, India
          </div>
        </div>

        <div className="footer-center">
          <button onClick={onOpenDeployGuide} className="deploy-guide-btn font-mono" title="Deploy this portfolio template for yourself">
            <span>Fork &amp; Deploy Your Own Portfolio</span>
            <ArrowUpRight size={12} />
          </button>
        </div>

        <div className="footer-links">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="footer-icon-link" title="GitHub">
            <GithubIcon size={16} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="footer-icon-link" title="LinkedIn">
            <LinkedinIcon size={16} />
          </a>
          <a href={`mailto:${personalInfo.email}`} className="footer-icon-link" title="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .footer {
          border-top: 1px solid var(--border-hairline);
          padding: 40px 0;
          background: #08090e;
        }

        .footer-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-name {
          font-weight: 600;
          font-size: 0.92rem;
          color: #fff;
          margin-bottom: 2px;
        }

        .footer-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .deploy-guide-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: 1px solid var(--border-hairline);
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: var(--radius-xs);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .deploy-guide-btn:hover {
          color: var(--text-heading);
          border-color: var(--border-muted);
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-icon-link {
          color: var(--text-muted);
          transition: color 0.15s ease;
        }

        .footer-icon-link:hover {
          color: #fff;
        }

        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </footer>
  );
}
