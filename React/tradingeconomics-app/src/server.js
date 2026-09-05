// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const { CLIENT_KEY, CLIENT_SECRET } = process.env;
const BASE_URL = 'https://api.tradingeconomics.com';

app.get('/api/historical', async (req, res) => {
  try {
    const { country, indicator } = req.query;
    const { data } = await axios.get(`${BASE_URL}/historical/country/${country}/indicator/${indicator}`, {
      params: { c: `${CLIENT_KEY}:${CLIENT_SECRET}` }
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('Proxy running on port 3001'));