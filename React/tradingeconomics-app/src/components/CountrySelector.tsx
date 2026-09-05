/* Created by Siva Kumar Aketi */
import React from 'react';

interface CountrySelectorProps {
  countries: string[];
  selectedCountry: string;
  onSelectCountry: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, selectedCountry, onSelectCountry }) => {
  return (
    <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column' }}>
      <label
        htmlFor="country-select"
        style={{
          marginBottom: 8,
          fontSize: 18,
          fontWeight: 600,
          color: '#374151', // gray-700 equivalent
        }}
      >
        Select a Country
      </label>

      <select
        id="country-select"
        value={selectedCountry}
        onChange={(e) => onSelectCountry(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          border: '1px solid #d1d5db', // gray-300 equivalent
          borderRadius: 6,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          fontSize: 16,
          outline: 'none',
          transition: 'box-shadow 0.2s ease-in-out',
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = '0 0 0 3px #60a5fa'; // blue-400 ring effect
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }}
      >
        <option value="">-- Choose Country --</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
