// src/utils/api.js
// Client API adapter for Uttam's Portfolio Backend

const API_BASE = import.meta.env.VITE_API_URL || (
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : ''
);

/**
 * Helper to execute safe API requests with timeout and fallback
 */
async function fetchApi(endpoint, options = {}, timeoutMs = 8000) {
  // Only bypass on static GitHub Pages when no external backend API is configured
  const isStaticGitHubPages = typeof window !== 'undefined' && 
    window.location.hostname.endsWith('github.io') && 
    !import.meta.env.VITE_API_URL;

  if (isStaticGitHubPages) {
    return null;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const url = API_BASE ? `${API_BASE}${endpoint}` : endpoint;
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    });

    clearTimeout(timer);
    if (!res.ok) {
      throw new Error(`API error ${res.status}: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    clearTimeout(timer);
    console.warn(`[Backend API] Request to ${endpoint} failed:`, err.message);
    return null;
  }
}

/**
 * 1. AI Assistant Chatbot
 */
export async function sendChatMessage(query, honestMode = false, history = []) {
  const result = await fetchApi('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ query, honestMode, history })
  });

  return result?.data || null;
}

/**
 * 2. Contact Message Submission
 */
export async function submitContactForm({ name, email, message }) {
  return await fetchApi('/api/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message })
  });
}

/**
 * 3. Portfolio Telemetry & Live Likes
 */
export async function getPortfolioStats() {
  const result = await fetchApi('/api/stats');
  return result?.data || null;
}

export async function likeProjectApi(projectId) {
  const result = await fetchApi(`/api/stats/projects/${projectId}/like`, {
    method: 'POST'
  });
  return result?.data || null;
}

export async function recordPageViewApi() {
  return await fetchApi('/api/stats/view', { method: 'POST' });
}

export async function recordTerminalCommandApi(command) {
  return await fetchApi('/api/stats/terminal', {
    method: 'POST',
    body: JSON.stringify({ command })
  });
}

/**
 * 4. Computational Simulations
 */
export async function runBackendSqlExplain(mode = 'optimized') {
  const result = await fetchApi('/api/simulations/sql-explain', {
    method: 'POST',
    body: JSON.stringify({ mode })
  });
  return result?.data || null;
}

export async function runBackendChaos(scenario = 'redis_oom') {
  const result = await fetchApi('/api/simulations/chaos-test', {
    method: 'POST',
    body: JSON.stringify({ scenario })
  });
  return result?.data || null;
}

export async function runBackendRag(query = '', scenarioId = 'fuzzy') {
  const result = await fetchApi('/api/simulations/rag-query', {
    method: 'POST',
    body: JSON.stringify({ query, scenarioId })
  });
  return result?.data || null;
}
