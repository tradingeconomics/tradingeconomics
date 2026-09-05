// src/components/CountryControls.js
import React from 'react';
import { Calendar } from 'lucide-react';
import ApiService from '../services/apiService';

const CountryControls = ({ 
  countries, 
  selectedCountry, 
  setSelectedCountry, 
  addCountry, 
  removeCountry, 
  getCountryColor,
  gdpData 
}) => {
  const availableCountries = ApiService.getAvailableCountries();

  const getLatestGDP = (country) => {
    const countryData = gdpData[country];
    if (!countryData || countryData.length === 0) return null;
    return countryData[countryData.length - 1];
  };

  return (
    <>
      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Country to Compare
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a country...</option>
              {availableCountries
                .filter(country => !countries.includes(country))
                .map(country => (
                  <option key={country} value={country}>
                    {country.charAt(0).toUpperCase() + country.slice(1)}
                  </option>
                ))}
            </select>
          </div>
          <button
            onClick={addCountry}
            disabled={!selectedCountry || countries.length >= 4}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors mt-6"
          >
            Add Country
          </button>
        </div>

        {/* Selected Countries */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Countries:</h3>
          <div className="flex flex-wrap gap-3">
            {countries.map((country, index) => (
              <div
                key={country}
                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all hover:shadow-md"
                style={{ borderColor: getCountryColor(country, index) }}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getCountryColor(country, index) }}
                ></span>
                <span className="font-medium capitalize">{country}</span>
                {countries.length > 1 && (
                  <button
                    onClick={() => removeCountry(country)}
                    className="text-red-500 hover:text-red-700 ml-2 font-bold"
                    title="Remove country"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Current GDP Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {countries.map((country, index) => {
          const latestData = getLatestGDP(country);
          return (
            <div key={country} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: getCountryColor(country, index) }}
                ></div>
                <h3 className="font-semibold capitalize text-gray-800">{country}</h3>
              </div>
              {latestData ? (
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {ApiService.formatValue(latestData.value)}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4" />
                    {latestData.date}
                  </p>
                </div>
              ) : (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CountryControls;