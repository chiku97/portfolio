// backend/routes/stats.js
import express from 'express';
import { 
  getStats, 
  recordPageView, 
  recordTerminalRun, 
  likeProject, 
  endorseSkill 
} from '../services/db.js';

const router = express.Router();

// GET /api/stats - Global portfolio telemetry
router.get('/', async (req, res) => {
  try {
    const stats = await getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stats/view - Record a page view
router.post('/view', async (req, res) => {
  try {
    const count = await recordPageView();
    res.json({ success: true, pageViews: count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stats/terminal - Record a terminal command executed
router.post('/terminal', async (req, res) => {
  try {
    const { command } = req.body || {};
    const count = await recordTerminalRun(command);
    res.json({ success: true, terminalCommandsRun: count });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stats/projects/:id/like - Real persistent project like
router.post('/projects/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await likeProject(id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/stats/endorse/:skillId - Real skill endorsement
router.post('/endorse/:skillId', async (req, res) => {
  try {
    const { skillId } = req.params;
    const result = await endorseSkill(skillId);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
