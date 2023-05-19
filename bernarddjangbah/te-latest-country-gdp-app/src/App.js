import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [gdp, setGdp] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Mexico");
  const [error, setError] = useState(null);

  const api_key = "8c4bea4e1b1e444:c5hq7h99rl0vy84";
  const endpoint = `https://api.tradingeconomics.com/country/${selectedCountry}`;

  useEffect(() => {
    const params = {
      f: "json",
      group: "gdp",
      where: encodeURIComponent(`country/${selectedCountry}`),
    };

    const url = new URL(endpoint);
    url.search = new URLSearchParams(params);
    const full_url = `${url.toString()}&c=${api_key}`;
    console.log(full_url);

    fetch(full_url)
      .then((response) => response.json())
      .then((data) => {
        setGdp(data[0].LatestValue);
        setCountry(data[0].Country);
        setError(null);
      })
      .catch((error) => setError(error.message));
  }, [selectedCountry, endpoint]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <div className="container">
      <h1>Latest GDP for {country}</h1>
      {error ? <p className="error">{error}</p> : <p className="gdp">{gdp}</p>}
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option value="Sweden">Sweden</option>
        <option value="Mexico">Mexico</option>
        <option value="Thailand">Thailand</option>
        <option value="New Zealand">New Zealand</option>
      </select>
    </div>
  );
}

export default App;
