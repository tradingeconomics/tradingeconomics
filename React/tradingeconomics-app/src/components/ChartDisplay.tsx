/* Created by Siva Kumar Aketi */
/* Created by Siva Kumar Aketi */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DataPoint {
  DateTime: string;
  Value: number;
}

interface ChartDisplayProps {
  data: DataPoint[];
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data }) => {
  return (
    <div
      style={{
        display: 'flex',
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 16,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        flexDirection: 'column',
        height: '100%',           // Take full height of parent container
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#1f2937', // gray-800 equivalent
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        Indicator Chart
      </h2>

      {data.length === 0 ? (
        <p style={{ color: '#4b5563', fontSize: 16, flexGrow: 1, margin: 0 }}>
          No data available. Please select a country and indicator.
        </p>
      ) : (
        <div style={{ flexGrow: 1, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="DateTime" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="Value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ChartDisplay;
