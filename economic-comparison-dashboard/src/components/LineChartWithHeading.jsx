'use client';
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartWithHeading = ({ chartData, chartOptions, heading }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">{heading}</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChartWithHeading;
