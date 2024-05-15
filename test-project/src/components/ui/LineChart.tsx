import React from 'react'
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
  import { Line } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';





type Props = {
    firstCountry: string,
    secondCountry: string,
    rawData: {
        "Country":string,
        "Category": string,
        "DateTime": string,
        "Value": number,
        "Frequency": string,
        "HistoricalDataSymbol": string,
        "LastUpdate": string,
        }[]
    
}





const LineChartForProjectOne = (
    {firstCountry, secondCountry, rawData}
    : Props) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
      
      const labels = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
      
 const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
    
  if(rawData === null){
    return (    <div className="flex flex-col items-center gap-1 text-center">
    <h3 className="text-2xl font-bold tracking-tight">
      Graph will be diplayed here
    </h3>
    <p className="text-sm text-muted-foreground">
      select both countries and click compare to show graph
    </p>

  </div>)
  }
  return <Line options={options} data={data} />
}

export default LineChartForProjectOne