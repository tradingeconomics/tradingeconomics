import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto';

interface DataItem {
  Country: string;
  DateTime: string;
  Value: number;
  Frequency: string;
}

interface Props {
  country: string;
  rawData: DataItem[];
}
Chart.register()
const LineChartForCountryIndicatorPair: React.FC<Props> = ({ country, rawData }) => {
  // Filter rawData based on the specified country and frequency (assuming only one frequency type exists)
  const filteredData = rawData.filter((item) => item.Country === country);

  if (filteredData.length === 0) {
    return <div className="absolute top-1/2 left-1/2">Click compare to load data for {country}</div>;
  }

  // Determine the frequency (assuming all data has the same frequency type)
  const frequency = filteredData[0].Frequency;

  // Preprocess data based on the determined frequency
  const chartLabels: string[] = [];
  const chartDataValues: number[] = [];

  filteredData.forEach((item) => {
    const date = new Date(item.DateTime);
    const formattedDate = date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    const value = item.Value;

    chartLabels.push(formattedDate);
    chartDataValues.push(value);
  });

  // Chart configuration
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: `${country} (${frequency})`,
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
              text: `Indicator Data for ${country}`,
            },
          },
          scales: {
            x: {
              type: "category", // Use category scale for custom labels
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Value",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChartForCountryIndicatorPair;
