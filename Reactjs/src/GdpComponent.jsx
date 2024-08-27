
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'chartjs-adapter-date-fns';
import DataTable from 'datatables.net-dt';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, TimeScale
} from 'chart.js';

import moment from "moment";
import './GdpComponentStyle.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, TimeScale
);

const GdpComponent = () => {
  const [dataTable, setDataTable] = useState(null);
  const [gdpData, setGdpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tableRef = useRef(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = '74fb3f403baa48d:4n4jk9gdi4x6r5x'
        const response = await axios.get(
          `https://api.tradingeconomics.com/historical/country/mexico,sweden/indicator/gdp?c=${api_key}`, 
          {   
            headers: {
              'Accept': 'Application/xml',
              'Access-Control-Allow-Origin':'http://localhost:3000'
            }
          }
      );
        // console.table(response.data);
        setGdpData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch GDP data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (gdpData && tableRef.current) {
      // If a DataTable instance already exists, destroy it
      if (dataTable) {
        dataTable.destroy();
      } 
      // Create a new DataTable instance 
      const newDataTable = $(tableRef.current).DataTable({
        dom: '<"#table-top.row"<"col-sm-6"i><"col-sm-6"f>>rt<"bottom"lp>',
          language: {
              search: "_INPUT_",
              searchPlaceholder: "Search..."
              // paginate: {
              //     previous: '‹',
              //     next: '›'
              // },
              // info: "Page _PAGE_ of _PAGES_"              
          },
        data: gdpData,
        columnDefs: [ {targets: 2,render: $.fn.dataTable.render.date('YYYY/MM/DD')}, ],
        columns: [{ data: 'Country' },{ data: 'Category' },{ data: 'DateTime' },{ data: 'Value' },{ data: 'Frequency' },{ data: 'HistoricalDataSymbol'} ,{ data: 'LastUpdate'}]
      });
  
      // Store the new DataTable instance
      setDataTable(newDataTable);
    }
  
    // Cleanup function to destroy DataTable when component unmounts
    return () => {
      if (dataTable) {
        dataTable.destroy();
      }
    };
  }, [gdpData]);

  const chartData = {
    labels: gdpData ? [...new Set(gdpData.map(item => item.DateTime))] : [],
    datasets: [
      {
        label: 'Mexico GDP',
        data: gdpData ? gdpData
          .filter(item => item.Country === 'Mexico')
          .map(item => ({ x: item.DateTime, y: item.Value }))
          .sort((a, b) => new Date(moment(a.x).utc().format('YYYY-MM-DD')) - new Date(moment(b.x).utc().format('YYYY-MM-DD'))) : [],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        tension: 0.1
      },
      {
        label: 'Sweden GDP',
        data: gdpData ? gdpData
          .filter(item => item.Country === 'Sweden')
          .map(item => ({ x: item.DateTime, y: item.Value }))
          .sort((a, b) => new Date(moment(a.x).utc().format('YYYY-MM-DD')) - new Date(moment(b.x).utc().format('YYYY-MM-DD'))) : [],
        fill: false,
        backgroundColor: 'rgb(192, 75, 75)',
        borderColor: 'rgba(192, 75, 75, 0.8)',
        tension: 0.1
      }
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'GDP Comparison: Mexico vs Sweden',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'year'
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'GDP Value (USD Billion)'
        },
        beginAtZero: false
      }
    },
  };  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="flex justify-center items-center" key="MainDiv" id="MainDiv">    

<div className="flex justify-center items-center" style={{ height: '400px', width: '80%' }}   id="gdpGraph" key="gdpGraph" >  
        <Line options={chartOptions} data={chartData} />
      </div>

      <div id="table-container" key="table-container">
        <div id="table-top" key="table-top">
          <div id="pagination-info" key="pagination-info"></div>
          <div id="search-container" key="search-container"></div>
        </div>
      <table ref={tableRef} id="gdpTable" key="gdpTable" className="display">
        <thead>
          <tr>
            <th>Country</th>
            <th>Category</th>  
            <th>DateTime</th> 
            <th>Value</th> 
            <th>Frequency</th>
            <th>HistoricalDataSymbol</th>   
            <th>LastUpdate</th>  


          </tr>
        </thead>
      </table></div>
    </div>
  );
};

export default GdpComponent; 


