/* Created by Siva Kumar Aketi */
import React from 'react';

interface ViewSwitchProps {
  view: 'chart' | 'table';
  onToggle: (view: 'chart' | 'table') => void;
}

const ViewSwitch: React.FC<ViewSwitchProps> = ({ view, onToggle }) => {
  const buttonBaseStyle: React.CSSProperties = {
    padding: '8px 16px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    flex: 1,
  };

  const chartButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    backgroundColor: view === 'chart' ? '#2563eb' : '#6b7280', // blue or gray
  };

  const tableButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: view === 'table' ? '#2563eb' : '#6b7280', // blue or gray
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
       height: 40,
        width: 200, // fix width so buttons sit side by side nicely
      }}
    >
      <button style={chartButtonStyle} onClick={() => onToggle('chart')}>
        Chart
      </button>
      <button style={tableButtonStyle} onClick={() => onToggle('table')}>
        Table
      </button>
    </div>
  );
};

export default ViewSwitch;
