import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale'; 

type Props = {
  country1: string;
  country2: string;
  rawData: {
    Country: string;
    DateTime: string;
    Value: number;
  }[];
};

Chart.register();

const LineChartForCountryComparison = ({ country1, country2, rawData }: Props) => {
  // Filter rawData for both countries
  const filteredDataCountry1 = rawData.filter((item) => item.Country === country1);
  const filteredDataCountry2 = rawData.filter((item) => item.Country === country2);

  // Extract labels (years) and data values for each country
  const chartLabelsCountry1 = filteredDataCountry1.map((item) => {
    const date = new Date(item.DateTime);
    return date.getFullYear(); // Extract and return only the year part
  });
  const chartDataValuesCountry1 = filteredDataCountry1.map((item) => item.Value);

  const chartLabelsCountry2 = filteredDataCountry2.map((item) => {
    const date = new Date(item.DateTime);
    return date.getFullYear(); // Extract and return only the year part
  });
  const chartDataValuesCountry2 = filteredDataCountry2.map((item) => item.Value);

  const chartData = {
    labels: chartLabelsCountry1, // Use labels from the first country (assuming same years for comparison)
    datasets: [
      {
        label: country1,
        data: chartDataValuesCountry1,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: country2,
        data: chartDataValuesCountry2,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}
    >
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: `GDP Data Comparison: ${country1} vs ${country2}`,
            },
          },
          scales: {
            x: {
              type: "linear", // Use linear scale for numerical x-axis (years)
              title: {
                display: true,
                text: "Year",
              },
              ticks: {
                stepSize: 1, // Ensure ticks are shown for every year
                callback: function (value, index, values) {
                  return value.toString(); // Convert value to string (no formatting)
                },
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "GDP Value",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChartForCountryComparison;
