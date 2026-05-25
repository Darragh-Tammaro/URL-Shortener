const express = require('express');
const crypto = require('crypto');
const pool = require('./db');

const router = express.Router();

function generateCode() {
  return Math.random().toString(36).slice(2, 8);
}

router.post('/shorten', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const code = generateCode();

  try {
    await pool.query(
      'INSERT INTO urls (code, original_url) VALUES ($1, $2)',
      [code, url]
    );
    res.json({ shortUrl: `http://localhost:3000/${code}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(
      'SELECT original_url FROM urls WHERE code = $1',
      [code]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    res.redirect(result.rows[0].original_url);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
