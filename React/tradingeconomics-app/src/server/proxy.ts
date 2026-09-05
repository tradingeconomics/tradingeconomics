import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const PORT = 3001;
const BASE_URL = 'https://api.tradingeconomics.com';

app.get('/api/economic-data', async (req, res) => {
  try {
    const { country, indicator } = req.query;

    console.log(`Fetching: country=${country}, indicator=${indicator}`);

    const clientKey = '5fedbfa057ce480:lscx7xsxgxdek2p';

    const response = await axios.get(
      `${BASE_URL}/historical/country/${country}/indicator/${indicator}`,
      {
        params: { c: clientKey },
        responseType: 'json'
      }
    );

    res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Response data:', error.response?.data);
      res.status(error.response?.status || 500).json({ error: error.response?.data || 'Internal server error' });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Unknown server error' });
    }
  }
});


app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});