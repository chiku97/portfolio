// backend/routes/chat.js
import express from 'express';
import { processAiQuery } from '../services/ragEngine.js';
import { recordAiChat } from '../services/db.js';

const router = express.Router();

/**
 * POST /api/chat
 * Body: { query: string, honestMode: boolean, history?: array }
 */
router.post('/', async (req, res) => {
  try {
    const { query, honestMode = false, history = [] } = req.body;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Increment backend chat count
    await recordAiChat();

    // Process through RAG & Context Engine
    const result = await processAiQuery({
      query,
      honestMode: Boolean(honestMode),
      conversationHistory: history
    });

    return res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AI chat query',
      details: err.message
    });
  }
});

export default router;
