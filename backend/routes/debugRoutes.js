const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Simple ping to check server is up
router.get('/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Dev-only: list users (avoid enabling in production)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error('Debug users error:', err);
    res.status(500).json({ msg: 'Failed to list users' });
  }
});

module.exports = router;
