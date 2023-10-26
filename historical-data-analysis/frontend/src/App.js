import './App.css';

import NavBar from './components/navbar/navbar.component';
import Cards from './components/cards/cards.component';
import NewTable from './components/table/table.component.jsx'
import LineCharts from './components/charts/line-chart.component';

import React, { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';


const App = () => {

  const [indicatorData, setIndicatorData] = useState();
  const [chosenYear, setChosenYear] = useState(2010);
  const [country1, setCountry1] = useState('Mexico');
  const [country2, setCountry2] = useState('Sweden');
  const [isLoading, setIsLoading] = useState(true);
  const [availableCountry, setAvailableCountry] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/getInitialData").then((response) => response.json()),
      fetch("http://localhost:8000/availableCountry").then((response) => response.json())
    ])
      .then(([data, availableCountryData]) => {
        const filteredData = Object.keys(data)
          .filter((country) => !country.startsWith("Free accounts have access to"))
          .map((country) => ({
            country,
            indicators: Object.keys(data[country]).map((key) => ({
              name: key,
              value: data[country][key],
            })),
          }));
  
        setIndicatorData(filteredData);
        setAvailableCountry(availableCountryData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);


  const getNewData = (Country1, Country2, Year) => {
    setChosenYear(Year)
    setCountry1(Country1)
    setCountry2(Country2)
    const requestData = {
      country: [Country1, Country2],
      startYear: Year
    };
    setIsLoading(true)
    fetch('http://localhost:8000/getNewData', {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const filteredData = Object.keys(data)
          .filter(country => !country.startsWith("Free accounts have access to"))
          .map(country => ({
            country,
            indicators: Object.keys(data[country]).map(key => ({
              name: key,
              value: data[country][key],
            })),
          }));
        setIndicatorData(filteredData);
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  };

  const indicatorOrder = [
    'GDP Growth Rate',
    'Interest Rate',
    'Inflation Rate',
    'Unemployment Rate',
    'Balance of Trade',
  ];


  return (
    <div className='app'>
      <NavBar 
        getNewData={getNewData}
        availableCountry={availableCountry}
      />
      {isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh'}}>
          <Spinner animation='border' variant='success' />
          <span style={{marginLeft: '10px'}}>Loading data...</span>          
        </div>
      ) : (
        <div>
          <Cards 
            title={`Economic Metrics Comparative Analysis ${chosenYear}`}
            subtitle={`Explore economic trends in ${country1} and ${country2} in ${chosenYear} for trading analysis`}
            className='customCard'
            titleClassName={'card-title2'}
            subtitleClassName={'card-subtitle'}
          > 
            <NewTable  
              headings={[
                'Country', 
                'GDP Growth Rate',
                'Interest Rate',
                'Inflation Rate',
                'Unemployment Rate',
                'Balance Of Trade',
            ]}

              rows={indicatorData.map(data => ({
                name: data.country,
                values: indicatorOrder.map(indicatorName => {
                  const indicator = data.indicators.find(indicator => indicator.name === indicatorName);
                  if (indicator) {
                    return (
                      <LineCharts 
                        className={'responsive-chart'}
                        indicatorName={`${data.country} ${indicator.name} ${chosenYear}`}
                        indicatorName2={`${indicator.name}`}
                        labels={indicator.value.date}
                        data={indicator.value.value}
                      />
                    );
                  } else {
                    return <div>Indicator Not Available</div>;
                  }
                })
              }))}

              renderCell={(row, cellIndex) => {
                if (cellIndex === 0) {
                  return row.name
                } else {
                  return row.values[cellIndex -1]
                }
              }}
            />
          </ Cards>
        </div>
      )
      }
    </div>
    
  );
}

export default App;
