'use client';
import ResultsTable from '@/src/components/ResultsTable';
import SearchPanel from '@/src/components/SearchPanel';
import ShimmerGrid from '@/src/components/ShimmerGrid';
import TimeSeriesModal from '@/src/components/TimeSeriesModal';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 "
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🌐 Global Economic Indicators Search
          </h1>
          <p className="text-gray-500 text-sm">
            Search economic data by keyword, select a data source, and click to explore detailed trends.
          </p>
          <br />
          <span className='mt-4'>Working Ex : Country : Sweden,  Indicator: '' </span>

        </div>

        {/* Search Panel */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <SearchPanel onResults={setResults} setLoading={setLoading} />
        </div>



        {/* Results Table */}
        {loading == 0 ? (
          <ShimmerGrid rows={10} columns={1} cellWidth="w-full" cellHeight="h-8" />
        ) : (
          results?.length > 0 && (
            <div className="bg-white shadow-md rounded-xl p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                🔍 Search Results
              </h2>
              <ResultsTable results={results} onSelect={setSelectedRow} />
            </div>
          )
        )}


        {/* Time Series Modal */}
        {/* <TimeSeriesModal
          show={!!selectedRow}
          selected={selectedRow}
          onClose={() => setSelectedRow(null)}
        /> */}
      </div>
    </div>
  );
}
