import React, { useState, useEffect } from 'react';
import CountrySelector from './components/CountrySelector';
import IndicatorSelector from './components/IndicatorSelector';
import ChartDisplay from './components/ChartDisplay';
import DataTable from './components/DataTable';
import ViewSwitch from './components/ViewSwitch';
import axios from 'axios';

const App: React.FC = () => {
  const countries = ['Sweden', 'Mexico', 'New Zealand', 'Thailand']; // free countries only
  const indicators = ['GDP', 'Inflation Rate', 'Unemployment Rate', 'Interest Rate'];

  const [selectedCountry, setSelectedCountry] = useState('Sweden');
  const [selectedIndicator, setSelectedIndicator] = useState('GDP');
  const [chartData, setChartData] = useState<any[]>([]);
  const [view, setView] = useState<'chart' | 'table'>('chart');

  useEffect(() => {
    if (selectedCountry && selectedIndicator) {
      axios
        .get('http://localhost:3001/api/economic-data', {
          params: {
            country: selectedCountry,
            indicator: selectedIndicator,
          },
        })
        .then((res) => {
          const sortedData = res.data
            .filter((d: any) => d.Value !== null)
            .sort((a: any, b: any) => new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime());
          setChartData(sortedData);
        })
        .catch((error) => {
          console.error('Error fetching economic data:', error);
        });
    }
  }, [selectedCountry, selectedIndicator]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '10px 16px', boxSizing: 'border-box' }}>
      <div
        style={{
          maxWidth: '80%',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          height: '90vh',       // Fix total container height relative to viewport
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: '700',
            color: '#2563eb',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Trading Economics Viewer
        </h1>
  
        {/* Controls: Country, Indicator and ViewSwitch */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,    // Prevent controls from shrinking
          }}
        >
          <CountrySelector
            countries={countries}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
          <IndicatorSelector
            indicators={indicators}
            selectedIndicator={selectedIndicator}
            onSelectIndicator={setSelectedIndicator}
          />
          <ViewSwitch view={view} onToggle={setView} />
        </div>
  
        {/* Content - Chart or Table */}
        <div
          style={{
            flexGrow: 1,            // Take remaining vertical space
            overflowY: 'auto',      // Scroll vertically if content is taller
            padding: 10,
          }}
        >
          {view === 'chart' ? (
            <ChartDisplay data={chartData} />
          ) : (
            <DataTable data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
