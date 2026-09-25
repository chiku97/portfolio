import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isVercel = Boolean(process.env.VERCEL);
const DATA_DIR = isVercel ? '/tmp' : path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

const INITIAL_DATA = {
  pageViews: 1420,
  terminalCommandsRun: 284,
  aiChatsHandled: 156,
  devThoughtsSynced: 188,
  projectLikes: {
    'rag-analytics-chatbot': 48,
    'coding-assessment-platform': 64,
    'multi-tenant-retail-engine': 58,
    'jwt-auth-session-service': 36
  },
  endorsements: {
    'postgresql-indexing': 88,
    'distributed-systems': 95,
    'hybrid-rag-pgvector': 91,
    'node-go-microservices': 84
  },
  contactMessages: [],
  visitorAnalytics: {
    uniqueSessions: 620,
    lastActive: new Date().toISOString()
  }
};

let cache = null;
let writeQueue = Promise.resolve();

// Ensure data folder and store file exist
async function ensureDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const content = await fs.readFile(DB_FILE, 'utf-8');
      cache = JSON.parse(content);
    } catch {
      cache = { ...INITIAL_DATA };
      await fs.writeFile(DB_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error initializing database store:', err);
    cache = { ...INITIAL_DATA };
  }
}

// Safe write queue to prevent race conditions on Windows/Linux
async function saveDb() {
  writeQueue = writeQueue.then(async () => {
    try {
      await fs.writeFile(DB_FILE, JSON.stringify(cache, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to persist store to disk:', err);
    }
  });
  return writeQueue;
}

export async function getDb() {
  if (!cache) {
    await ensureDb();
  }
  return cache;
}

const COUNTER_API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const COUNTER_KEY = 'uttam_portfolio_views_chiku97';
const BASELINE_VIEWS = 1420;

// Zero-database persistent view counter reader with timeout & local fallback
async function fetchPersistentViews() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${COUNTER_API_BASE}/get/${COUNTER_KEY}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return BASELINE_VIEWS + data.value;
      }
    }
  } catch {
    // Fallback gracefully to local cache
  }
  return cache?.pageViews || BASELINE_VIEWS;
}

// Zero-database persistent view counter atomic increment
async function incrementPersistentViews() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${COUNTER_API_BASE}/hit/${COUNTER_KEY}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return BASELINE_VIEWS + data.value;
      }
    }
  } catch {
    // Fallback gracefully to local cache increment
  }
  return (cache?.pageViews || BASELINE_VIEWS) + 1;
}

const THOUGHTS_COUNTER_KEY = 'uttam_portfolio_thoughts_chiku97';
const BASELINE_THOUGHT_SYNCS = 188;

// Zero-database persistent thought sync counter reader with timeout & local fallback
async function fetchPersistentThoughtSyncs() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${COUNTER_API_BASE}/get/${THOUGHTS_COUNTER_KEY}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return BASELINE_THOUGHT_SYNCS + data.value;
      }
    }
  } catch {
    // Fallback gracefully to local cache
  }
  return cache?.devThoughtsSynced || BASELINE_THOUGHT_SYNCS;
}

// Zero-database persistent thought sync atomic increment
async function incrementPersistentThoughtSyncs() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${COUNTER_API_BASE}/hit/${THOUGHTS_COUNTER_KEY}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return BASELINE_THOUGHT_SYNCS + data.value;
      }
    }
  } catch {
    // Fallback gracefully to local cache increment
  }
  return (cache?.devThoughtsSynced || BASELINE_THOUGHT_SYNCS) + 1;
}

const BASELINE_PROJECT_LIKES = {
  'rag-analytics-chatbot': 48,
  'coding-assessment-platform': 64,
  'multi-tenant-retail-engine': 58,
  'jwt-auth-session-service': 36
};

function getProjectCounterKey(projectId) {
  const sanitized = String(projectId).replace(/[^a-zA-Z0-9_-]/g, '_');
  return `uttam_portfolio_likes_${sanitized}_chiku97`;
}

// Zero-database persistent project like reader with timeout & local fallback
async function fetchPersistentProjectLikes(projectId) {
  const base = BASELINE_PROJECT_LIKES[projectId] || 25;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const key = getProjectCounterKey(projectId);
    const res = await fetch(`${COUNTER_API_BASE}/get/${key}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return base + data.value;
      }
    }
  } catch {
    // Fallback gracefully
  }
  return cache?.projectLikes?.[projectId] || base;
}

// Zero-database persistent project like atomic increment
async function incrementPersistentProjectLikes(projectId) {
  const base = BASELINE_PROJECT_LIKES[projectId] || 25;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const key = getProjectCounterKey(projectId);
    const res = await fetch(`${COUNTER_API_BASE}/hit/${key}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (typeof data.value === 'number') {
        return base + data.value;
      }
    }
  } catch {
    // Fallback gracefully
  }
  return (cache?.projectLikes?.[projectId] || base) + 1;
}

async function fetchAllPersistentProjectLikes() {
  const projectIds = Array.from(new Set([
    ...Object.keys(BASELINE_PROJECT_LIKES),
    ...Object.keys(cache?.projectLikes || {})
  ]));
  try {
    const entries = await Promise.all(
      projectIds.map(async (id) => [id, await fetchPersistentProjectLikes(id)])
    );
    return Object.fromEntries(entries);
  } catch {
    return cache?.projectLikes || BASELINE_PROJECT_LIKES;
  }
}

export async function getStats() {
  const db = await getDb();
  const [persistentViews, persistentLikes, persistentThoughts] = await Promise.all([
    fetchPersistentViews(),
    fetchAllPersistentProjectLikes(),
    fetchPersistentThoughtSyncs()
  ]);
  db.pageViews = persistentViews;
  db.projectLikes = { ...db.projectLikes, ...persistentLikes };
  db.devThoughtsSynced = persistentThoughts;
  return {
    pageViews: persistentViews,
    terminalCommandsRun: db.terminalCommandsRun,
    aiChatsHandled: db.aiChatsHandled,
    devThoughtsSynced: persistentThoughts,
    thoughtSyncCount: persistentThoughts,
    projectLikes: db.projectLikes,
    endorsements: db.endorsements,
    totalMessagesReceived: db.contactMessages.length,
    lastActive: db.visitorAnalytics.lastActive
  };
}

export async function recordPageView() {
  const db = await getDb();
  const newViews = await incrementPersistentViews();
  db.pageViews = newViews;
  db.visitorAnalytics.lastActive = new Date().toISOString();
  saveDb();
  return newViews;
}

export async function recordThoughtSync() {
  const db = await getDb();
  const newCount = await incrementPersistentThoughtSyncs();
  db.devThoughtsSynced = newCount;
  db.visitorAnalytics.lastActive = new Date().toISOString();
  saveDb();
  return newCount;
}

export async function recordTerminalRun(cmd = '') {
  const db = await getDb();
  db.terminalCommandsRun += 1;
  saveDb();
  return db.terminalCommandsRun;
}

export async function recordAiChat() {
  const db = await getDb();
  db.aiChatsHandled += 1;
  saveDb();
  return db.aiChatsHandled;
}

export async function likeProject(projectId) {
  const db = await getDb();
  const newLikes = await incrementPersistentProjectLikes(projectId);
  db.projectLikes[projectId] = newLikes;
  db.visitorAnalytics.lastActive = new Date().toISOString();
  saveDb();
  return {
    projectId,
    likes: newLikes
  };
}

export async function endorseSkill(skillId) {
  const db = await getDb();
  if (!db.endorsements[skillId]) {
    db.endorsements[skillId] = 1;
  } else {
    db.endorsements[skillId] += 1;
  }
  saveDb();
  return {
    skillId,
    count: db.endorsements[skillId]
  };
}

export async function saveContactMessage({ name, email, message, ip = 'unknown' }) {
  const db = await getDb();
  const newMsg = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: name?.trim() || 'Anonymous',
    email: email?.trim() || 'no-email@provided.com',
    message: message?.trim() || '',
    ip,
    timestamp: new Date().toISOString(),
    status: 'received'
  };
  db.contactMessages.unshift(newMsg);
  saveDb();
  return newMsg;
}

export async function getContactMessages() {
  const db = await getDb();
  return db.contactMessages;
}
