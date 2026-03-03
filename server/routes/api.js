const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

router.get('/health', (req, res) => res.json({ ok: true }));

// get current user (requires auth)
router.get('/me', requireAuth, (req, res) => {
  res.json({ id: req.user._id, username: req.user.username });
});

// stub upcoming contests
router.get('/contests', (req, res) => {
  const upcoming = [
    { id: 1, provider: 'Codeforces', name: 'CF Round #1000', start: '2026-03-10T14:00:00Z' },
    { id: 2, provider: 'CodeChef', name: 'CC COOKOFF MARCH', start: '2026-03-12T06:00:00Z' },
    { id: 3, provider: 'LeetCode', name: 'Weekly Contest 300', start: '2026-03-14T18:00:00Z' }
  ];
  res.json({ upcoming });
});

router.post('/users', async (req, res) => {
  try {
    const { username, providers, weakTopics } = req.body;
    const user = new User({ username, providers, weakTopics });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).end();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
