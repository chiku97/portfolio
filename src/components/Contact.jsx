import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight, ExternalLink, RotateCcw } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { playClick, playSuccess } from '../utils/audio';

export default function Contact({ onShowToast }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [gmailLink, setGmailLink] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (onShowToast) onShowToast(`Copied ${personalInfo.email}`);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    if (onShowToast) onShowToast(`Copied ${personalInfo.phone}`);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccess();

    const subject = `Engineering Opportunity / Ingestion from ${form.name || 'Hiring Manager'}`;
    const body = `Hi,\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\nBest regards,\n${form.name}`;

    // 1. Copy message payload to clipboard as an immediate fail-safe
    try {
      navigator.clipboard.writeText(`To: ${personalInfo.email}\nSubject: ${subject}\n\n${body}`);
    } catch (err) {}

    // 2. Generate web-mail URLs
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodedSubject}&body=${encodedBody}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodedSubject}&body=${encodedBody}`;
    
    setGmailLink(webGmailUrl);
    setSubmitted(true);

    // 3. Attempt native mail client trigger
    try {
      const a = document.createElement('a');
      a.href = mailtoUrl;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {}

    if (onShowToast) {
      onShowToast("🚀 Message drafted! Copied to clipboard & ready in email client.");
    }
  };

  const handleReset = () => {
    playClick();
    setSubmitted(false);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-eyebrow">Get In Touch</div>
        <h2 className="section-heading">Contact &amp; Opportunities</h2>
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
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="btn btn-subtle btn-sm font-mono">
                <LinkedinIcon size={14} />
                <span>LinkedIn Profile</span>
                <ArrowUpRight size={12} />
              </a>

              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn btn-subtle btn-sm font-mono">
                <GithubIcon size={14} />
                <span>GitHub Repos</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>

          {/* Quick email composer */}
          <div className="card composer-card">
            <h3 className="direct-title font-mono">Send a Direct Note</h3>
            
            {submitted ? (
              <div className="contact-success-state">
                <div className="success-icon-box">
                  <Check size={24} className="text-emerald" />
                </div>
                <h4 className="success-title">Message Prepared &amp; Copied!</h4>
                <p className="success-desc">
                  Your note has been copied to your clipboard and drafted in your default email client. You can also open it directly in Gmail with one click:
                </p>

                <div className="success-actions">
                  <a 
                    href={gmailLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-solid btn-sm font-mono"
                    onClick={playClick}
                  >
                    <Mail size={14} />
                    <span>Open in Gmail Web ↗</span>
                  </a>

                  <button 
                    onClick={handleReset} 
                    className="btn btn-subtle btn-sm font-mono"
                  >
                    <RotateCcw size={13} />
                    <span>Send Another Note</span>
                  </button>
                </div>
              </div>
            ) : (
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
                  <span>Send Direct Message</span>
                </button>
              </form>
            )}
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

        .contact-success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 10px;
          gap: 12px;
        }

        .success-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 1.05rem;
          color: #fff;
          font-weight: 700;
        }

        .success-desc {
          font-size: 0.84rem;
          color: #94a3b8;
          line-height: 1.5;
          max-width: 360px;
        }

        .success-actions {
          display: flex;
          gap: 10px;
          margin-top: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .text-emerald { color: var(--accent-emerald); }
        .font-mono { font-family: var(--font-mono); }
        .w-full { width: 100%; }
      `}</style>
    </section>
  );
}
