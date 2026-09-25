// backend/routes/contact.js
import express from 'express';
import { saveContactMessage, getContactMessages } from '../services/db.js';

const router = express.Router();

/**
 * POST /api/contact
 * Body: { name, email, message }
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';

    // 1. Persist to server store
    const savedMsg = await saveContactMessage({ name, email, message, ip });

    // 2. Dispatch email notification if WEB3FORMS_ACCESS_KEY or RESEND_API_KEY is configured
    let emailDispatched = false;
    let dispatchMethod = 'stored_in_db';

    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const w3res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            subject: `Portfolio Message from ${name}`,
            name,
            email,
            message,
            from_name: "Uttam Portfolio Backend"
          })
        });
        if (w3res.ok) {
          emailDispatched = true;
          dispatchMethod = 'web3forms_to_gmail';
        }
      } catch (e) {
        console.warn('Web3Forms dispatch warning:', e.message);
      }
    }

    console.log(`[CONTACT RECEIVED] From: ${name} <${email}>: "${message.substring(0, 50)}..."`);

    return res.status(201).json({
      success: true,
      message: 'Message received and safely recorded in backend store.',
      data: {
        id: savedMsg.id,
        timestamp: savedMsg.timestamp,
        emailDispatched,
        dispatchMethod
      }
    });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({
      success: false,
      error: 'Internal server error while saving contact message.'
    });
  }
});

// GET /api/contact - List messages (for admin dashboard / verification)
router.get('/', async (req, res) => {
  try {
    const messages = await getContactMessages();
    return res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
