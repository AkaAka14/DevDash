const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const User = require('../models/User');

const jwtSecret = process.env.JWT_SECRET;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, jwtSecret, { expiresIn: '7d' });
}

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: 'Username taken' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash: hash });
    await user.save();
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = user.passwordHash && await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// google oauth
router.post('/google', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) return res.status(400).json({ error: 'id_token required' });
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: id_token });
    const payload = ticket.getPayload();
    const { sub, email, name } = payload;
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      // create new
      user = new User({ username: email, googleId: sub });
      await user.save();
    }
    const token = signToken(user);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

module.exports = router;
