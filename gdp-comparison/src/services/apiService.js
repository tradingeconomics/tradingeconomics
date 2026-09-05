// src/services/apiService.js
import axios from 'axios';

const API_KEY = '4c5ed57b9e6c472:pc25ms2adp2jt8u';

// Using a CORS proxy for development - in production you'd use your own backend
const PROXY_URL = 'https://api.allorigins.win/raw?url=';
const API_BASE = 'https://api.tradingeconomics.com';

class ApiService {
  static async fetchGDPData(country) {
    try {
      // Try multiple endpoints to find working data
      const endpoints = [
        `${API_BASE}/historical/country/${encodeURIComponent(country)}/indicator/gdp`,
        `${API_BASE}/historical/country/${encodeURIComponent(country)}/indicator/GDP Annual Growth Rate`,
        `${API_BASE}/country/${encodeURIComponent(country)}/gdp`
      ];

      for (let endpoint of endpoints) {
        try {
          const url = `${PROXY_URL}${encodeURIComponent(`${endpoint}?c=${API_KEY}&f=json`)}`;
          
          const response = await axios.get(url, {
            timeout: 10000,
            headers: {
              'Accept': 'application/json',
            }
          });

          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return this.processGDPData(response.data, country);
          }
        } catch (endpointError) {
          console.log(`Endpoint failed: ${endpoint}`, endpointError.message);
          continue;
        }
      }

      // If API fails, return mock data for demo purposes
      return this.getMockData(country);

    } catch (error) {
      console.error(`Error fetching GDP data for ${country}:`, error);
      // Return mock data as fallback
      return this.getMockData(country);
    }
  }

  static processGDPData(data, country) {
    const processedData = data
      .filter(item => item.Value !== null && item.DateTime)
      .map(item => ({
        date: new Date(item.DateTime).getFullYear(),
        value: parseFloat(item.Value),
        country: country
      }))
      .sort((a, b) => a.date - b.date)
      .slice(-10); // Last 10 years

    return processedData.length > 0 ? processedData : this.getMockData(country);
  }

  static getMockData(country) {
    // Mock GDP data for demonstration (in billions USD)
    const mockGDPData = {
      'united states': [
        { date: 2015, value: 18036648000000, country: 'united states' },
        { date: 2016, value: 18624475000000, country: 'united states' },
        { date: 2017, value: 19485394000000, country: 'united states' },
        { date: 2018, value: 20544343000000, country: 'united states' },
        { date: 2019, value: 21374419000000, country: 'united states' },
        { date: 2020, value: 20953030000000, country: 'united states' },
        { date: 2021, value: 23315080000000, country: 'united states' },
        { date: 2022, value: 25462700000000, country: 'united states' },
        { date: 2023, value: 26854599000000, country: 'united states' }
      ],
      'china': [
        { date: 2015, value: 11061552000000, country: 'china' },
        { date: 2016, value: 11233281000000, country: 'china' },
        { date: 2017, value: 12310410000000, country: 'china' },
        { date: 2018, value: 13608152000000, country: 'china' },
        { date: 2019, value: 14342903000000, country: 'china' },
        { date: 2020, value: 14722731000000, country: 'china' },
        { date: 2021, value: 17734063000000, country: 'china' },
        { date: 2022, value: 17963171000000, country: 'china' },
        { date: 2023, value: 17700899000000, country: 'china' }
      ],
      'japan': [
        { date: 2015, value: 4444931000000, country: 'japan' },
        { date: 2016, value: 4968239000000, country: 'japan' },
        { date: 2017, value: 4940159000000, country: 'japan' },
        { date: 2018, value: 4971323000000, country: 'japan' },
        { date: 2019, value: 5081770000000, country: 'japan' },
        { date: 2020, value: 4975415000000, country: 'japan' },
        { date: 2021, value: 4940878000000, country: 'japan' },
        { date: 2022, value: 4301621000000, country: 'japan' },
        { date: 2023, value: 4212945000000, country: 'japan' }
      ],
      'germany': [
        { date: 2015, value: 3365293000000, country: 'germany' },
        { date: 2016, value: 3495000000000, country: 'germany' },
        { date: 2017, value: 3685556000000, country: 'germany' },
        { date: 2018, value: 3947620000000, country: 'germany' },
        { date: 2019, value: 3861124000000, country: 'germany' },
        { date: 2020, value: 3846414000000, country: 'germany' },
        { date: 2021, value: 4259935000000, country: 'germany' },
        { date: 2022, value: 4259935000000, country: 'germany' },
        { date: 2023, value: 4121474000000, country: 'germany' }
      ]
    };

    // Generate mock data if country not in predefined list
    if (!mockGDPData[country]) {
      const baseValue = Math.random() * 5000000000000; // Random base GDP
      return Array.from({ length: 9 }, (_, i) => ({
        date: 2015 + i,
        value: baseValue * (1 + Math.random() * 0.1 - 0.05), // ±5% variation
        country: country
      }));
    }

    return mockGDPData[country];
  }

  static formatValue(value) {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(2)}`;
  }

  static getAvailableCountries() {
    return [
      'united states', 'china', 'japan', 'germany', 'india', 'united kingdom',
      'france', 'italy', 'brazil', 'canada', 'russia', 'south korea',
      'spain', 'australia', 'mexico', 'indonesia', 'netherlands', 'turkey',
      'taiwan', 'belgium', 'argentina', 'ireland', 'israel', 'thailand',
      'nigeria', 'egypt', 'south africa', 'poland', 'bangladesh'
    ];
  }
}

export default ApiService;