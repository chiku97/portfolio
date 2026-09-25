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
  projectLikes: {
    'rag-analytics-chatbot': 48,
    'coding-assessment-platform': 64,
    'multi-tenant-retail-engine': 58,
    'jwt-auth-session-service': 36,
    'irctc-retail-rag': 42,
    'snapbizz-retail-engine': 58
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

export async function getStats() {
  const db = await getDb();
  const persistentViews = await fetchPersistentViews();
  return {
    pageViews: persistentViews,
    terminalCommandsRun: db.terminalCommandsRun,
    aiChatsHandled: db.aiChatsHandled,
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
  if (!db.projectLikes[projectId]) {
    db.projectLikes[projectId] = 1;
  } else {
    db.projectLikes[projectId] += 1;
  }
  saveDb();
  return {
    projectId,
    likes: db.projectLikes[projectId]
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
