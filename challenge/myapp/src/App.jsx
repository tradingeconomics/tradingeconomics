import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import teLogo from "./assets/tradingeconomics.svg";
import { mexico_gdp_pop_data } from "./data";
import "./App.css";

function App() {
  const [country, setCountry] = useState("Mexico");

  let countryData = [];
  countryData = getCountryInformation(country);

  function getCountryInformation(country) {
    let mergedData = [];
    for (let i = 1; i < mexico_gdp_pop_data.length; i = i + 2) {
      let objGDP = mexico_gdp_pop_data[i - 1];
      let objPOP = mexico_gdp_pop_data[i];
      if (objGDP.DateTime == objPOP.DateTime) {
        const objMerged = {
          date: objGDP.DateTime.slice(0, 4),
          gdp: objGDP.Value,
          pop: objPOP.Value,
        };
        mergedData.push(objMerged);
      }
    }
    return mergedData;
  }

  countryData.map((yearData) => {
    const perCapitaGDP = yearData.gdp / yearData.pop;
    yearData["GDPperCapita"] = Number(perCapitaGDP).toFixed(2);
    return yearData;
  });

  const CustomizedAxisTick = (...args) => {
    const { x, y, stroke, payload } = args[0];
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const renderGDPPopChart = (
    <LineChart
      width={1400}
      height={700}
      data={countryData}
      margin={{ top: 5, right: 20, bottom: 55, left: 0 }}
    >
      <Line type="monotone" dataKey="gdp" stroke="#8884d8" />
      <Line type="monotone" dataKey="pop" stroke="#cccccc" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );

  const renderGDPPerCapitaChart = (
    <LineChart
      width={1400}
      height={700}
      data={countryData}
      margin={{ top: 5, right: 20, bottom: 55, left: 0 }}
    >
      <Line type="monotone" dataKey="GDPperCapita" stroke="#d2d2d2" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" tick={<CustomizedAxisTick />} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
  return (
    <div className="App">
      <div className="card">
        <h3>
          Comparision of the growth of GDP and population for{" "}
          <code>{country}</code> since 1960.
        </h3>
        <p className="submission-note">
          Trading Economics challenge submission from Vinay Gahlawat.
        </p>
      </div>
      <div>
        <h2>GDP vs. Population Growth</h2>
        <span>{renderGDPPopChart}</span>
        <h2>GDP per Capita</h2>
        <span>{renderGDPPerCapitaChart}</span>
      </div>
      <div>
        <h3>Powered by:</h3>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tradingeconomics.com" target="_blank">
          <img src={teLogo} className="logo te" alt="TE logo" />
        </a>
      </div>
    </div>
  );
}

export default App;
