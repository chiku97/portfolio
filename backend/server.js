// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import chatRoutes from './routes/chat.js';
import statsRoutes from './routes/stats.js';
import contactRoutes from './routes/contact.js';
import simulationsRoutes from './routes/simulations.js';
import { getStats } from './services/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve origins
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,https://chiku97.github.io')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.github.io') || origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in dev to avoid CORS friction
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health & telemetry check
app.get(['/', '/health', '/api/health'], async (req, res) => {
  const stats = await getStats().catch(() => ({}));
  res.json({
    status: 'online',
    service: "Uttam Kumar Mahto's Portfolio API Backend",
    version: '1.0.0',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024),
    statsOverview: {
      pageViews: stats.pageViews || 0,
      totalLikes: Object.values(stats.projectLikes || {}).reduce((a, b) => a + b, 0),
      aiChats: stats.aiChatsHandled || 0
    }
  });
});

// Mount Routes
app.use('/api/chat', chatRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/simulations', simulationsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    availableEndpoints: [
      'POST /api/chat',
      'GET  /api/stats',
      'POST /api/stats/view',
      'POST /api/stats/terminal',
      'POST /api/stats/projects/:id/like',
      'POST /api/stats/endorse/:skillId',
      'POST /api/contact',
      'GET  /api/contact',
      'POST /api/simulations/sql-explain',
      'POST /api/simulations/chaos-test',
      'POST /api/simulations/rag-query'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Only start standalone listener when not running in Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log('====================================================');
    console.log(`🚀 Uttam's Portfolio Backend running on port ${PORT}`);
    console.log(`📡 Local Health Check: http://localhost:${PORT}/health`);
    console.log(`🤖 AI Chat & RAG Engine ready on /api/chat`);
    console.log(`💾 Persistent DB Store active in backend/data/store.json`);
    console.log('====================================================');
  });
}

export default app;
