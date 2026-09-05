'use client';
import React from 'react';

export default function ResultsTable({ results, onSelect }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Source</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{row.country || '-'}</td>
              <td className="px-4 py-2">{row.category || '-'}</td>
              <td className="px-4 py-2">{row.pretty_name || row.name}</td>
              <td className="px-4 py-2">{row.type}</td>            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
