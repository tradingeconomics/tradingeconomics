const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors('*'))
app.use(express.json())
const api_key = 'e52ee1d7108443b:waozi4fd4e3ochp'

async function fetchData() {
    const url = 'https://api.tradingeconomics.com/country/mexico';
    const headers = { 'Authorization': api_key };
  
    try {
        const response = await fetch(url, { method: 'GET', headers });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function searchCountry(country) {
    const url = `https://api.tradingeconomics.com/country/${country}`;
    const headers = { 
        'Authorization': `Client ${api_key}`,  // Changed auth header format
        'Accept': 'application/json'
    };
  
    try {
        const response = await fetch(url, { method: 'GET', headers });
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (parseError) {
            throw new Error(`Invalid JSON response: ${text}`);
        }
    } catch (error) {
        console.error('Search country error:', error.message);
        throw error;
    }
}

async function compareCountries(country1, country2, indicators = ['gdp', 'gdp per capita']) {
    try {
        const data1 = await searchCountry(country1);
        const data2 = await searchCountry(country2);

        if (!Array.isArray(data1) || !Array.isArray(data2)) {
            throw new Error('Invalid API response format');
        }

        const comparison = {
            country1: {
                name: country1,
                indicators: {}
            },
            country2: {
                name: country2,
                indicators: {}
            }
        };

        indicators.forEach(indicator => {
            comparison.country1.indicators[indicator] = data1.find(d => 
                d.Category?.toLowerCase().includes(indicator.toLowerCase())
            ) || null;
            comparison.country2.indicators[indicator] = data2.find(d => 
                d.Category?.toLowerCase().includes(indicator.toLowerCase())
            ) || null;
        });

        return comparison;
    } catch (error) {
        console.error('Compare countries error:', error.message);
        throw error;
    }
}


app.get('/', async (req, res) => {
    try {
        const data = await fetchData();
        res.send(data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.post('/search', async (req, res) => {
    try {
        const { country } = req.body;
        
        if (!country) {
            return res.status(400).json({ error: 'Country parameter is required' });
        }

        const data = await searchCountry(country);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error searching country data' });
    }
});

app.post('/compare', async (req, res) => {
    try {
        const { country1, country2, indicators } = req.body;
        
        if (!country1 || !country2) {
            return res.status(400).json({ 
                error: 'Both country1 and country2 parameters are required' 
            });
        }

        const data = await compareCountries(country1, country2, indicators);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error comparing countries' });
    }
});

app.get('/compare/:country1/:country2', async (req, res) => {
    try {
        const { country1, country2 } = req.params;
        const indicators = req.query.indicators ? req.query.indicators.split(',') : ['gdp', 'gdp per capita'];

        if (!country1 || !country2) {
            return res.status(400).json({ 
                error: 'Both country1 and country2 parameters are required' 
            });
        }

        const data = await compareCountries(country1, country2, indicators);
        
        // Add metadata to response
        const response = {
            timestamp: new Date().toISOString(),
            comparison: data,
            metadata: {
                countries: [country1, country2],
                indicators: indicators
            }
        };

        res.json(response);
    } catch (error) {
        console.error('GET comparison error:', error.message);
        res.status(500).json({ 
            error: 'Error comparing countries',
            message: error.message 
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});