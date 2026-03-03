const axios = require('axios');

const QUERY = `query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    profile {
      realName
      userAvatar
      ranking
      aboutMe
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
  }
}`;

async function getUser(username) {
  try {
    const res = await axios.post(
      'https://leetcode.com/graphql',
      { query: QUERY, variables: { username } },
      {
        headers: {
          'Content-Type': 'application/json',
          Referer: `https://leetcode.com/${username}/`
        },
        timeout: 10000
      }
    );

    const data = res.data && res.data.data && res.data.data.matchedUser;
    if (!data) return { provider: 'leetcode', username, error: 'No matched user' };

    const submit = data.submitStats && data.submitStats.acSubmissionNum ? data.submitStats.acSubmissionNum : [];
    const totalSolved = submit.reduce((s, item) => s + (item.count || 0), 0);

    return {
      provider: 'leetcode',
      username,
      profile: data.profile || null,
      submitStats: submit,
      totalSolved
    };
  } catch (err) {
    return { provider: 'leetcode', username, error: err.message };
  }
}

module.exports = { getUser };
