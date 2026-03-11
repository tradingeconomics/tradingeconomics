import { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [countries, setCountries] = useState({
    c1: "mexico",
    c2: "sweden"
  });

  const [data, setData] = useState({});
  const [historicalData, setHistoricalData] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const gdp1 = historicalData[countries.c1] || [];
  const gdp2 = historicalData[countries.c2] || [];

  const chartData = {
    labels: gdp1.map(item => item.DateTime?.substring(0,4) ?? ""),
    datasets: [
      {
        label: countries.c1 + " GDP",
        data: gdp1.map(item => item.Value),
        borderColor: "blue",
        backgroundColor: "rgba(0,0,255,0.2)"
      },
      {
        label: countries.c2 + " GDP",
        data: gdp2.map(item => item.Value),
        borderColor: "red",
        backgroundColor: "rgba(255,0,0,0.2)"
      }
    ]
  };


  const handleCompare = async () => {
    setLoading(true);
    setError(null);

    try {
      const ind1 = await axios.get(
        `http://localhost:5093/api/indicators/${countries.c1}`
      );

      const hist1 = await axios.get(
        `http://localhost:5093/api/indicators/historical/${countries.c1}/gdp`
      );

      const ind2 = await axios.get(
        `http://localhost:5093/api/indicators/${countries.c2}`
      );

      const hist2 = await axios.get(
        `http://localhost:5093/api/indicators/historical/${countries.c2}/gdp`
      );

      setData({
        [countries.c1]: ind1.data,
        [countries.c2]: ind2.data
      });

      setHistoricalData({
        [countries.c1]: hist1.data,
        [countries.c2]: hist2.data
      });

    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

  const allCategories = Array.from(
    new Set([
      ...(data[countries.c1]?.map(i => i.Category) || []),
      ...(data[countries.c2]?.map(i => i.Category) || [])
    ])
  ).sort();


  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }} className="app-container">
      <h1>Country Indicator Comparison</h1>

      <input
        value={countries.c1}
        onChange={(e) =>
          setCountries({ ...countries, c1: e.target.value })
        }
        disabled={loading}
      />

      <input
        value={countries.c2}
        onChange={(e) =>
          setCountries({ ...countries, c2: e.target.value })
        }
        disabled={loading}
      />

      <button onClick={handleCompare} disabled={loading}>Compare</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div>
        <div>
          <h2>Historical Comparison of GDP</h2>
          {historicalData[countries.c1] && historicalData[countries.c2] && (
            <div style={{ width: "800px", marginTop: "20px" }} className="chart-container">
              <Line data={chartData} />
            </div>
          )}
        </div>
        <div>
          <h2>Indicator Comparison</h2>
          {data[countries.c1] && data[countries.c2] && (
            <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Indicator</th>
                  <th>{countries.c1}</th>
                  <th>{countries.c2}</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((category, index) => {
                  const val1 = data[countries.c1]?.find(i => i.Category === category)?.LatestValue ?? '-';
                  const val2 = data[countries.c2]?.find(i => i.Category === category)?.LatestValue ?? '-';

                  return (
                    <tr key={index}>
                      <td>{category}</td>
                      <td>{val1}</td>
                      <td>{val2}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;