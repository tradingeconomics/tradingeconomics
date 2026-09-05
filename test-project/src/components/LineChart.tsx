import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale'; 

type Props = {
  country: string;
  rawData: {
    Country: string;
    DateTime: string;
    Value: number;
  }[];
};

Chart.register();

const LineChartForCountry = ({ country, rawData }: Props) => {
  // Filter rawData based on the specified country
  const filteredData = rawData.filter((item) => item.Country === country);

  if (filteredData.length === 0) {
    return <div className="absolute top-1/2 left-1/2">Click compare to load data for {country}</div>;
  }

  // Prepare labels and data values for the chart
  const chartLabels = filteredData.map((item) => {
    const date = new Date(item.DateTime);
    return date.getFullYear(); // Extract and return only the year part
  });
  const chartDataValues = filteredData.map((item) => item.Value);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: country,
        data: chartDataValues,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>

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
              text: `GDP Data for ${country}`,
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

export default LineChartForCountry;
