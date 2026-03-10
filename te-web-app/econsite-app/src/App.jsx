import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("mexico");
  const [searchCountry, setSearchCountry] = useState("");
  const [indicators, setIndicators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchIndicators = () => {
    setSearchCountry(country);
  };

  useEffect(() => {
    if (!searchCountry) return;

    const fetchIndicators = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `http://localhost:5093/api/indicators/${searchCountry}`
        );

        setIndicators(res.data);
      } catch (err) {
        console.error("Axios error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIndicators();
  }, [searchCountry]);

  useEffect(() => {
    
  })

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Economic Indicators</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button
          onClick={searchIndicators}
          style={{ marginLeft: "10px", padding: "5px 10px" }}
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {indicators.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Country</th>
              <th>Indicator</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {indicators.map((item, index) => (
              <tr key={index}>
                <td>{item.Country}</td>
                <td>{item.Category}</td>
                <td>{item.LatestValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;