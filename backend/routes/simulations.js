// backend/routes/simulations.js
import express from 'express';
import { 
  runSqlOptimizationSimulation, 
  runChaosSimulation, 
  runRagRrfSimulation 
} from '../services/simulations.js';

const router = express.Router();

// POST /api/simulations/sql-explain
router.post('/sql-explain', (req, res) => {
  try {
    const { mode = 'optimized', rows = 10000000 } = req.body || {};
    const result = runSqlOptimizationSimulation({ mode, rows: Number(rows) });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/simulations/chaos-test
router.post('/chaos-test', (req, res) => {
  try {
    const { scenario = 'redis_oom', baselineQps = 8450 } = req.body || {};
    const result = runChaosSimulation({ scenario, baselineQps: Number(baselineQps) });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/simulations/rag-query
router.post('/rag-query', (req, res) => {
  try {
    const { query = '', scenarioId = 'fuzzy' } = req.body || {};
    const result = runRagRrfSimulation({ query, scenarioId });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
