const cron = require('node-cron');
const User = require('./models/User');
const providers = {
  codeforces: require('./providers/codeforces'),
  leetcode: require('./providers/leetcode'),
  codechef: require('./providers/codechef')
};

const checkContestsAndRecommend = async () => {
  try {
    const users = await User.find().limit(50).lean();
    for (const u of users) {
      console.log(`Reminder check for ${u.username} (weakTopics: ${JSON.stringify(u.weakTopics || [])})`);
      // For each configured provider, attempt to fetch latest profile/stats
      const tasks = [];
      if (u.providers) {
        if (u.providers.codeforces) tasks.push(providers.codeforces.getUser(u.providers.codeforces));
        if (u.providers.leetcode) tasks.push(providers.leetcode.getUser(u.providers.leetcode));
        if (u.providers.codechef) tasks.push(providers.codechef.getUser(u.providers.codechef));
      }
      const results = await Promise.all(tasks);
      console.log('Provider fetch results for', u.username, results);

      // TODO: analyze results, compute weak topics, schedule reminders and send notifications
    }
  } catch (err) {
    console.error('Scheduler error', err);
  }
};

module.exports = {
  start: () => {
    cron.schedule('*/5 * * * *', checkContestsAndRecommend);
    console.log('Scheduler started (every 5 minutes)');
  },
  checkContestsAndRecommend
};
