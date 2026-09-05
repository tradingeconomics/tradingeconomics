'use client';

import React, { useEffect, useState } from 'react';
import InputSelect from './InputSelect';
import { fetchCountries } from '../services/countryService';
import { fetchIndicators } from '../services/indicatorService';
import axios from 'axios';
import { search } from '../services/searchService';

const databases = [
  { label: 'World Bank', value: 'wb' },
  { label: 'FRED', value: 'fred' },
  { label: 'Comtrade', value: 'comtrade' },
];

export default function SearchPanel({ onResults, setLoading }) {
  const [database, setDatabase] = useState('');
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [indicator, setIndicator] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    (async () => {
      const c = await fetchCountries();
      const i = await fetchIndicators();
      setCountries(c);
      setIndicators(i);
    })();
  }, []);

  const handleSearch = async () => {
    if (!selectedCountry && !indicator) return;
    const searchTerm = `${selectedCountry} ${indicator}`.trim();

    try {
      setLoading(0);
      const res = await search(`${database || 'wb,fred,comtrade'}`)
      onResults(res.data?.hits || []);
      setLoading(1);
    } catch (err) {
      console.error('Search failed:', err);
      onResults([]);
      setLoading(1);
    }
  };


  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row items-stretch md:items-end gap-4 mb-6">

      <div className="w-full md:w-52">
        <InputSelect
          label="🌍 Country"
          value={selectedCountry}
          onChange={setSelectedCountry}
          options={countries}
        />
      </div>

      <div className="w-full md:w-52">
        <InputSelect
          label="📚 Database"
          value={database}
          onChange={setDatabase}
          options={databases.map((c) => c.value).sort()}
        />
      </div>


      <button
        onClick={handleSearch}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        🔄 Search
      </button>
    </div>
  );
}
