// src/App.js
import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import ApiService from './services/apiService';
import CountryControls from './components/countryControls';
import GDPChart from './components/GDPChart';

const App = () => {
  const [countries, setCountries] = useState(['united states', 'china']);
  const [gdpData, setGdpData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [chartData, setChartData] = useState([]);

  const fetchGDPData = async (country) => {
    try {
      setLoading(true);
      setError('');
      
      const data = await ApiService.fetchGDPData(country);
      
      setGdpData(prev => ({
        ...prev,
        [country]: data
      }));
      
      console.log(`✅ Successfully loaded GDP data for ${country}`, data);
      
    } catch (err) {
      const errorMsg = `Error loading data for ${country}: ${err.message}`;
      setError(errorMsg);
      console.error('❌', errorMsg, err);
    } finally {
      setLoading(false);
    }
  };

  const combineChartData = () => {
    const allYears = new Set();
    
    // Collect all unique years
    Object.values(gdpData).forEach(countryData => {
      countryData.forEach(item => allYears.add(item.date));
    });
    
    const sortedYears = Array.from(allYears).sort((a, b) => a - b);
    
    // Create combined data structure
    const combined = sortedYears.map(year => {
      const dataPoint = { year };
      
      countries.forEach(country => {
        if (gdpData[country]) {
          const yearData = gdpData[country].find(item => item.date === year);
          if (yearData) {
            dataPoint[country] = yearData.value;
          }
        }
      });
      
      return dataPoint;
    }).filter(dataPoint => 
      // Only include years where we have data for at least one country
      Object.keys(dataPoint).length > 1
    );
    
    setChartData(combined);
  };

  const addCountry = () => {
    if (selectedCountry && !countries.includes(selectedCountry) && countries.length < 4) {
      const newCountries = [...countries, selectedCountry];
      setCountries(newCountries);
      fetchGDPData(selectedCountry);
      setSelectedCountry('');
    }
  };

  const removeCountry = (countryToRemove) => {
    if (countries.length > 1) {
      const newCountries = countries.filter(c => c !== countryToRemove);
      setCountries(newCountries);
      
      const newGdpData = { ...gdpData };
      delete newGdpData[countryToRemove];
      setGdpData(newGdpData);
    }
  };

  const getCountryColor = (country, index) => {
    const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6'];
    return colors[index % colors.length];
  };

  // Load initial data
  useEffect(() => {
    console.log('🚀 Loading initial GDP data...');
    countries.forEach(country => {
      fetchGDPData(country);
    });
  }, []); // Empty dependency array - only run once

  // Update chart when data changes
  useEffect(() => {
    combineChartData();
  }, [gdpData, countries]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Globe className="text-blue-600" />
            GDP Comparison Tool
          </h1>
          <p className="text-gray-600">Built with ❤️ by piyush-khanna-qmb</p>
          <p className="text-sm text-gray-500 mt-2">
            Trading Economics Developer Challenge • Built with React
          </p>
        </div>

        {/* Country Controls & Stats */}
        <CountryControls
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          addCountry={addCountry}
          removeCountry={removeCountry}
          getCountryColor={getCountryColor}
          gdpData={gdpData}
        />

        {/* Error Display */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-yellow-600 mr-2">⚠️</span>
              <div>
                <p className="font-medium">Notice</p>
                <p className="text-sm">{error}</p>
                <p className="text-sm mt-1">Using demonstration data instead.</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center py-4 mb-6">
            <div className="inline-flex items-center gap-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">Loading GDP data...</p>
            </div>
          </div>
        )}

        {/* Chart */}
        <GDPChart 
          chartData={chartData}
          countries={countries}
          getCountryColor={getCountryColor}
        />

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <div className="bg-white rounded-lg p-4 shadow">
            <p className="text-sm font-medium mb-2">
              📈 Data Source: Trading Economics API
            </p>
            <p className="text-xs text-gray-500">
              Built for TradingEconomics Developer Challenge | 
              GitHub: https://github.com/piyush-khanna-qmb/tradingeconomics 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;