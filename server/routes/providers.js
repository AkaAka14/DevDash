const express = require('express');
const router = express.Router();
const cf = require('../providers/codeforces');
const lc = require('../providers/leetcode');
const cc = require('../providers/codechef');

router.get('/:provider/:username', async (req, res) => {
  const { provider, username } = req.params;
  try {
    if (provider === 'codeforces') return res.json(await cf.getUser(username));
    if (provider === 'leetcode') return res.json(await lc.getUser(username));
    if (provider === 'codechef') return res.json(await cc.getUser(username));
    return res.status(404).json({ error: 'Unknown provider' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/aggregate/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const [codeforces, leetcode, codechef] = await Promise.all([
      cf.getUser(username),
      lc.getUser(username),
      cc.getUser(username)
    ]);
    res.json({ codeforces, leetcode, codechef });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
