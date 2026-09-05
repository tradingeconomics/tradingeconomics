// src/components/GDPChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Search } from 'lucide-react';
import ApiService from '../services/apiService';

const GDPChart = ({ chartData, countries, getCountryColor }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Year: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {`${entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: ${ApiService.formatValue(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">GDP Comparison Chart</h2>
        </div>
        <div className="h-96 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Loading GDP data for comparison...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">GDP Comparison Chart</h2>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="year" 
              stroke="#666"
              fontSize={12}
            />
            <YAxis 
              stroke="#666"
              fontSize={12}
              tickFormatter={ApiService.formatValue}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {countries.map((country, index) => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={getCountryColor(country, index)}
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name={country.charAt(0).toUpperCase() + country.slice(1)}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          📊 <strong>Chart shows:</strong> GDP trends over the last 10 years
        </p>
        <p className="text-sm text-gray-600 mt-1">
          💡 <strong>Note:</strong> Data from Trading Economics API with fallback mock data for demonstration
        </p>
      </div>
    </div>
  );
};

export default GDPChart;