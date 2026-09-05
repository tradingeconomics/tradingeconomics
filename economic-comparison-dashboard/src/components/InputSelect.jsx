'use client';
import React, { useState, useEffect, useRef } from 'react';

const InputSelect = ({ label, value, onChange, options, icon }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (options) {
      const filtered = options.filter((option) =>
        option?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    }

  }, [query, options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setQuery(option);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (!value) setQuery('');
  }, [value]);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={`${icon || ''} ${label}`}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {showDropdown && filteredOptions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-md px-4 py-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default InputSelect;
