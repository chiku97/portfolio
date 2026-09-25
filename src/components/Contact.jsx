import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    onShowToast(`Copied ${personalInfo.email}`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    onShowToast(`Copied ${personalInfo.phone}`);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Engineering Opportunity / Ingestion from ${form.name || 'Hiring Manager'}`);
    const body = encodeURIComponent(`Hi Uttam,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\nBest,\n${form.name}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    onShowToast("Opening your email client...");
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-eyebrow">Get In Touch</div>
        <h2 className="section-heading">Contact & Opportunities</h2>
        <p className="section-subtext">
          I'm currently considering full-time software engineering roles in Bangalore or remote. 
          If you have an engineering opening or want to talk distributed systems and search, feel free to reach out.
        </p>

        <div className="contact-grid">
          {/* Direct channels */}
          <div className="card direct-card">
            <h3 className="direct-title font-mono">Direct Channels</h3>
            
            <div className="direct-item">
              <div className="direct-left">
                <span className="direct-label">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="direct-val font-mono">{personalInfo.email}</a>
              </div>
              <button onClick={copyEmail} className="btn btn-subtle btn-sm" title="Copy Email">
                {copiedEmail ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                <span>{copiedEmail ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="direct-item">
              <div className="direct-left">
                <span className="direct-label">Phone / WhatsApp</span>
                <a href={`tel:${personalInfo.phone}`} className="direct-val font-mono">{personalInfo.phone}</a>
              </div>
              <button onClick={copyPhone} className="btn btn-subtle btn-sm" title="Copy Phone">
                {copiedPhone ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
                <span>{copiedPhone ? "Copied" : "Copy"}</span>
              </button>
            </div>

            <div className="direct-item">
              <div className="direct-left">
                <span className="direct-label">Location</span>
                <span className="direct-val">{personalInfo.location}</span>
              </div>
            </div>

            <div className="direct-socials">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn btn-subtle btn-sm">
                <LinkedinIcon size={14} />
                <span>LinkedIn Profile</span>
                <ArrowUpRight size={12} />
              </a>

              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn-subtle btn-sm">
                <GithubIcon size={14} />
                <span>GitHub Repos</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Quick email composer */}
          <div className="card composer-card">
            <h3 className="direct-title font-mono">Send a Direct Note</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label font-mono">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Chen"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label font-mono">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label font-mono">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about the engineering team, tech stack, or problem..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="form-input form-textarea"
                />
              </div>

              <button type="submit" className="btn btn-solid w-full">
                <Send size={14} />
                <span>Send Message to Uttam</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 780px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .direct-card, .composer-card {
          padding: 24px;
        }

        .direct-title {
          font-size: 0.82rem;
          color: var(--accent-blue);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
          padding-bottom: 8px;
          border-bottom: 1px solid var(--border-hairline);
        }

        .direct-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-hairline);
          gap: 12px;
        }

        .direct-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .direct-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-family: var(--font-mono);
          text-transform: uppercase;
        }

        .direct-val {
          font-size: 0.88rem;
          color: #f1f5f9;
          text-decoration: none;
        }

        .direct-val:hover {
          color: var(--accent-blue);
        }

        .direct-socials {
          display: flex;
          gap: 10px;
          margin-top: 20px;
          flex-wrap: wrap;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 520px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-label {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .form-input {
          background: #07090e;
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 9px 12px;
          color: #fff;
          font-size: 0.88rem;
          font-family: var(--font-sans);
          outline: none;
          transition: border-color 0.15s ease;
        }

        .form-input:focus {
          border-color: var(--accent-blue);
        }

        .form-textarea {
          resize: vertical;
          min-height: 90px;
        }

        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
        .w-full { width: 100%; }
      `}</style>
    </section>
  );
}
