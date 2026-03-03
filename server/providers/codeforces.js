const axios = require('axios');
const BASE = 'https://codeforces.com/api';

async function getUser(handle) {
  try {
    const info = await axios.get(`${BASE}/user.info`, { params: { handles: handle } });
    const status = info.data;
    if (status.status !== 'OK') return { error: 'Codeforces API error', details: status };
    const user = status.result[0];

   
    let rating = null;
    try {
      const r = await axios.get(`${BASE}/user.rating`, { params: { handle } });
      if (r.data.status === 'OK') rating = r.data.result;
    } catch (e) {
      
    }

    return { provider: 'codeforces', username: handle, profile: user, ratingHistory: rating };
  } catch (err) {
    return { provider: 'codeforces', error: err.message };
  }
}

module.exports = { getUser };
