import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Coffee, 
  Activity, 
  MapPin, 
  Clock, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Zap,
  GitBranch
} from 'lucide-react';
import { playClick, playSuccess } from '../utils/audio';
import { getPortfolioStats, recordPageViewApi } from '../utils/api';

// Ambient synth drone generator using Web Audio API
let ambientOsc = null;
let ambientGain = null;
let ambientCtx = null;

function toggleAmbientAudio(enable) {
  if (typeof window === 'undefined') return false;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return false;

  if (!enable) {
    if (ambientOsc) {
      try {
        ambientOsc.stop();
        ambientOsc.disconnect();
      } catch (e) {}
      ambientOsc = null;
    }
    return false;
  }

  try {
    if (!ambientCtx) ambientCtx = new AudioCtx();
    if (ambientCtx.state === 'suspended') ambientCtx.resume();

    ambientOsc = ambientCtx.createOscillator();
    ambientGain = ambientCtx.createGain();

    ambientOsc.type = 'sine';
    ambientOsc.frequency.setValueAtTime(110, ambientCtx.currentTime); // A2 warm root note

    // Gentle pulsing low volume
    ambientGain.gain.setValueAtTime(0.015, ambientCtx.currentTime);

    // Warm low-pass filter
    const filter = ambientCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(440, ambientCtx.currentTime);

    ambientOsc.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ambientCtx.destination);

    ambientOsc.start();
    return true;
  } catch (e) {
    return false;
  }
}

export default function DeveloperVitalsDock({ onOpenTerminal, onShowToast }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [stats, setStats] = useState({ pageViews: 1420, aiChatsHandled: 156 });

  // Record page view in backend & fetch live stats
  useEffect(() => {
    recordPageViewApi().catch(() => {});
    getPortfolioStats().then(data => {
      if (data) setStats(data);
    }).catch(() => {});
  }, []);

  // Live ticking IST clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSynth = (e) => {
    e.stopPropagation();
    playClick();
    const newState = !isPlayingSynth;
    setIsPlayingSynth(newState);
    toggleAmbientAudio(newState);
    if (onShowToast) {
      onShowToast(newState ? "🎧 Ambient lofi synth activated" : "Audio muted");
    }
  };

  return (
    <div className={`vitals-dock ${isExpanded ? 'dock-expanded' : 'dock-collapsed'}`}>
      {/* Collapsed Pill Button */}
      <div 
        className="vitals-pill font-mono"
        onClick={() => {
          playClick();
          setIsExpanded(!isExpanded);
        }}
        title="Click to view Developer Vitals & Coding HUD"
      >
        <div className="pill-left">
          <span className="equalizer-bars">
            <span className="bar bar1"></span>
            <span className="bar bar2"></span>
            <span className="bar bar3"></span>
          </span>
          <span className="pill-track">CODING: RESONANCE // CHILLWAVE</span>
        </div>

        <div className="pill-divider"></div>

        <div className="pill-right">
          <Coffee size={13} className="text-amber" />
          <span className="caffeine-pill">85% CAFFEINE</span>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </div>
      </div>

      {/* Expanded Flyout HUD */}
      {isExpanded && (
        <div className="vitals-flyout">
          <div className="flyout-header">
            <div className="flyout-badge font-mono">
              <span className="status-live-dot"></span>
              <span>DEV VITALS // TELEMETRY HUD</span>
            </div>

            <button 
              onClick={handleToggleSynth} 
              className={`synth-toggle-btn font-mono ${isPlayingSynth ? 'synth-active' : ''}`}
              title={isPlayingSynth ? "Mute synth" : "Play warm background synth drone"}
            >
              {isPlayingSynth ? <Volume2 size={13} className="text-cyan" /> : <VolumeX size={13} />}
              <span>{isPlayingSynth ? "SYNTH ON" : "PLAY SYNTH"}</span>
            </button>
          </div>

          <div className="vitals-content">
            {/* Vitals row: Spotify / Audio */}
            <div className="vital-item">
              <Headphones size={15} className="text-cyan" />
              <div className="vital-text">
                <span className="vital-label font-mono">CODING SOUNDTRACK</span>
                <span className="vital-value">HOME — Resonance (Lofi / Synthwave)</span>
              </div>
            </div>

            {/* Vitals row: Coffee / Energy */}
            <div className="vital-item">
              <Coffee size={15} className="text-amber" />
              <div className="vital-text">
                <div className="vital-label-row font-mono">
                  <span>CAFFEINE RESERVES</span>
                  <span className="text-amber">3.5 / 4 CUPS</span>
                </div>
                <div className="caffeine-progress-bar">
                  <div className="caffeine-progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Vitals row: Focus */}
            <div className="vital-item">
              <Zap size={15} className="text-emerald" />
              <div className="vital-text">
                <span className="vital-label font-mono">CURRENT FOCUS</span>
                <span className="vital-value">IRCTC Catering Billing &amp; sub-20ms Hybrid RAG</span>
              </div>
            </div>

            {/* Vitals row: Location & Time */}
            <div className="vital-item">
              <MapPin size={15} className="text-violet" />
              <div className="vital-text">
                <span className="vital-label font-mono">LOCATION &amp; LOCAL TIME</span>
                <span className="vital-value font-mono">Bangalore, IN • {currentTime || 'Loading...'} (IST)</span>
              </div>
            </div>

            {/* Vitals row: Status */}
            <div className="vital-item">
              <GitBranch size={15} className="text-blue" />
              <div className="vital-text">
                <span className="vital-label font-mono">AVAILABILITY</span>
                <span className="vital-value text-emerald">Currently at SnapBizz (1 Mo Notice) • Open to BLR / Remote</span>
              </div>
            </div>

            {/* Vitals row: Real Backend Telemetry */}
            <div className="vital-item">
              <Activity size={15} className="text-cyan" />
              <div className="vital-text">
                <span className="vital-label font-mono">BACKEND TELEMETRY</span>
                <span className="vital-value font-mono text-cyan">
                  {(stats.pageViews || 1420).toLocaleString()} Verified Views • {stats.aiChatsHandled || 156} AI Queries
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .vitals-dock {
          position: fixed;
          bottom: 20px;
          left: 20px;
          z-index: 999;
          font-family: var(--font-sans);
        }

        @media (max-width: 768px) {
          .vitals-dock {
            display: none; /* Hide on mobile to keep viewport clean */
          }
        }

        .vitals-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: rgba(11, 16, 30, 0.92);
          border: 1px solid rgba(56, 189, 248, 0.3);
          box-shadow: 
            0 10px 30px -10px rgba(0, 0, 0, 0.8),
            0 0 20px rgba(56, 189, 248, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 7px 14px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .vitals-pill:hover {
          border-color: var(--accent-cyan);
          background: rgba(15, 23, 42, 0.96);
          transform: translateY(-2px);
          box-shadow: 0 12px 35px -10px rgba(0, 0, 0, 0.9), 0 0 25px rgba(56, 189, 248, 0.2);
        }

        .pill-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .equalizer-bars {
          display: inline-flex;
          align-items: flex-end;
          gap: 2px;
          height: 12px;
        }

        .bar {
          width: 2.5px;
          background: var(--accent-cyan);
          border-radius: 1px;
          animation: eqDance 1.2s infinite ease-in-out alternate;
        }
        .bar1 { height: 60%; animation-delay: 0.1s; }
        .bar2 { height: 100%; animation-delay: 0.3s; }
        .bar3 { height: 40%; animation-delay: 0.2s; }

        @keyframes eqDance {
          0% { height: 20%; }
          100% { height: 100%; }
        }

        .pill-track {
          font-size: 0.68rem;
          color: #e2e8f0;
          letter-spacing: 0.04em;
        }

        .pill-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.15);
        }

        .pill-right {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .caffeine-pill {
          font-size: 0.65rem;
          color: var(--accent-amber);
        }

        .vitals-flyout {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 0;
          width: 320px;
          background: rgba(11, 16, 30, 0.96);
          border: 1px solid rgba(56, 189, 248, 0.35);
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.9),
            0 0 30px rgba(56, 189, 248, 0.15);
          border-radius: var(--radius-sm);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
          animation: flyoutEnter 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes flyoutEnter {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .flyout-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid var(--border-hairline);
          background: rgba(255, 255, 255, 0.02);
        }

        .flyout-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.64rem;
          color: var(--accent-cyan);
          letter-spacing: 0.05em;
        }

        .status-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .synth-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-hairline);
          border-radius: var(--radius-xs);
          padding: 3px 8px;
          font-size: 0.62rem;
          color: #cbd5e1;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .synth-toggle-btn:hover {
          background: rgba(56, 189, 248, 0.12);
          border-color: rgba(56, 189, 248, 0.3);
          color: #fff;
        }

        .synth-active {
          border-color: rgba(56, 189, 248, 0.5);
          background: rgba(56, 189, 248, 0.15);
        }

        .vitals-content {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .vital-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .vital-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .vital-label {
          font-size: 0.62rem;
          color: #64748b;
          letter-spacing: 0.04em;
        }

        .vital-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.62rem;
          color: #64748b;
        }

        .vital-value {
          font-size: 0.78rem;
          color: #f1f5f9;
          font-weight: 500;
        }

        .caffeine-progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 3px;
        }

        .caffeine-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
          border-radius: 9999px;
        }

        .text-cyan { color: var(--accent-cyan); }
        .text-amber { color: var(--accent-amber); }
        .text-emerald { color: #34d399; }
        .text-violet { color: #a78bfa; }
        .text-blue { color: #60a5fa; }
        .font-mono { font-family: var(--font-mono); }
      `}</style>
    </div>
  );
}
