const axios = require('axios');
const cheerio = require('cheerio');

async function getUser(username) {
  try {
    const res = await axios.get(`https://www.codechef.com/users/${username}`, { timeout: 10000 });
    const html = res.data || '';
    const $ = cheerio.load(html);

    // Attempt to find rating using common selectors
    let rating = null;
    const selectors = ['.rating-number', '.rating', '.user-details .rating', '.rating_val', '.ratingValue'];
    for (const sel of selectors) {
      const text = $(sel).first().text().trim();
      if (text) {
        const m = text.match(/[0-9]+/);
        if (m) { rating = parseInt(m[0], 10); break; }
      }
    }

    // Fallback: search for 'Rating' label in the page text
    if (!rating) {
      const pageText = $('body').text();
      const m2 = pageText.match(/Rating\W*([0-9]{2,4})/i) || pageText.match(/rating\W*:\W*([0-9]{2,4})/i);
      if (m2) rating = parseInt(m2[1], 10);
    }

    // Try to extract problems-solved counts if present (heuristic)
    let solved = null;
    const solvedSel = $(".profile-card .problems-solved, .problems-solved").first().text().trim();
    if (solvedSel) {
      const m3 = solvedSel.match(/([0-9]+)/);
      if (m3) solved = parseInt(m3[1], 10);
    }

    return {
      provider: 'codechef',
      username,
      rating: rating || null,
      solvedCount: solved || null,
      profileHtmlSnippet: html.substring(0, 400)
    };
  } catch (err) {
    return { provider: 'codechef', username, error: err.message };
  }
}

module.exports = { getUser };
