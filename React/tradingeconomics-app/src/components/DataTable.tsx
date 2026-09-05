/* Created by Siva Kumar Aketi */
import React, { useState } from 'react';

interface DataRow {
  DateTime: string;
  Value: number;
}

interface DataTableProps {
  data: DataRow[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  if (data.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666', marginTop: 20 }}>No data available.</p>;
  }

  return (
    <div
      style={{
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',           // Take full height of parent container
        boxSizing: 'border-box',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: '600', marginBottom: 16, color: '#333', flexShrink: 0 }}>
        Data Table
      </h2>

      {/* Scrollable table wrapper */}
      <div
        style={{
          overflowY: 'auto',
          flexGrow: 1,
          minHeight: 0, // Important for flexbox scroll to work properly
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            borderRadius: 8,
            minWidth: 300,
          }}
        >
          <thead style={{ backgroundColor: '#0070f3', color: 'white' }}>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 16px', borderRight: '1px solid #005bb5' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '12px 16px' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white',
                  cursor: 'default',
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e6f0ff')}
                onMouseLeave={e =>
                  (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#fafafa' : 'white')
                }
              >
                <td style={{ padding: '12px 16px', borderRight: '1px solid #ddd', whiteSpace: 'nowrap' }}>
                  {new Date(row.DateTime).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>{row.Value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          maxWidth: 400,
          marginLeft: 'auto',
          marginRight: 'auto',
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 1 ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#005bb5';
          }}
          onMouseLeave={e => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#0070f3';
          }}
        >
          Previous
        </button>

        <span style={{ fontWeight: '600', color: '#333' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#005bb5';
          }}
          onMouseLeave={e => {
            if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#0070f3';
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
