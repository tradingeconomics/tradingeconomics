/* Created by Siva Kumar Aketi */
import React from 'react';

interface IndicatorSelectorProps {
  indicators: string[];
  selectedIndicator: string;
  onSelectIndicator: (indicator: string) => void;
}

const IndicatorSelector: React.FC<IndicatorSelectorProps> = ({
  indicators,
  selectedIndicator,
  onSelectIndicator,
}) => {
  return (
    <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column' }}>
      <label
        style={{
          marginBottom: 8,
          fontSize: 18,
          fontWeight: 500,
          color: '#374151', // gray-700 equivalent
        }}
      >
        Select an Indicator
      </label>
      <select
        style={{
          width: '100%',
          padding: 12,
          border: '1px solid #D1D5DB', // gray-300 equivalent
          borderRadius: 8,
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          outline: 'none',
          fontSize: 16,
          transition: 'box-shadow 0.2s ease',
        }}
        value={selectedIndicator}
        onChange={(e) => onSelectIndicator(e.target.value)}
        onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 3px #60A5FA')}  // blue-400 ring on focus
        onBlur={(e) => (e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)')}
      >
        <option value="">-- Choose Indicator --</option>
        {indicators.map((indicator) => (
          <option key={indicator} value={indicator}>
            {indicator}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IndicatorSelector;
