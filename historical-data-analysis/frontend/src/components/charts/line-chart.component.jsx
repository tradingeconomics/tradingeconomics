import React from "react";
import './line-chart.styles.css';

import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
);

const LineCharts = ({ indicatorName, labels, data, indicatorName2, className}) => {


    const options = {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
          title: {
              display: true,
              text: indicatorName, 
          },
      },
  };

    const chartData = {
        labels,
        datasets: [
          {
            label: indicatorName2,
            data,
            borderColor: '#198754',
            backgroundColor: '#1aa36487',
          },
        ],
      };

    return (
        <div 
          className={`chart-container ${className}`}>
            <Line
                options={options}
                data={chartData}
            />
        </div>
    )
}

export default LineCharts;