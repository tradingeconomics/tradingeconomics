import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const api_key = "8c4bea4e1b1e444:4qzhx4eb8q43bgq";
  const endpoint = "https://api.tradingeconomics.com/markets/currency";

  useEffect(() => {
    const params = {
      f: "json"
    };

    const url = new URL(endpoint);
    url.search = new URLSearchParams(params);
    const full_url = `${url.toString()}&c=${api_key}`;
    
    fetch(full_url)
      .then(response => response.json())
      .then(data => {
        data.pop()
        setData(data)
      })
      .catch(error => console.log(error))
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Country</th>
          <th>Last Price</th>
          <th>DailyPercentualChange</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.Name}</td>
            <td>{item.Ticker}</td>
            <td>{item.Country}</td>
            <td>{item.Last}</td>
            <td>{item.DailyPercentualChange}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
