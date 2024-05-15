import "./DisplayData.css";

function DisplayData(props) {
  //check if props have values
  if (!Array.isArray(props.data.length) && props.data.length === 0) {
    return <div>.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Actual</th>
            <th>ActualValue</th>
            <th>Forecast</th>
            <th>ForecastValue</th>
            <th>Previous</th>
            <th>PreviousValue</th>
            <th>Revenue</th>
            <th>RevenueValue</th>
            <th>RevenueForecast</th>
            <th>RevenueForecastValue</th>
            <th>RevenuePrevious</th>
            <th>RevenuePreviousValue</th>
            <th>MarketCapUSD</th>
            <th>FiscalTag</th>
            <th>FiscalReference</th>
            <th>CalenderReference</th>
            <th>Country</th>
            <th>Currency</th>
            <th>Importance</th>
            <th>Session</th>
            <th>MarketRelease</th>
            <th>LastUpdate</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((revenue, index) => (
            <tr key={index}>
              <td>{revenue.Date}</td>
              <td>{revenue.Symbol}</td>
              <td>{revenue.Name}</td>
              <td>{revenue.Actual}</td>
              <td>{revenue.ActualValue}</td>
              <td>{revenue.Forecast}</td>
              <td>{revenue.ForecastValue}</td>
              <td>{revenue.Previous}</td>
              <td>{revenue.PreviousValue}</td>
              <td>{revenue.Revenue}</td>
              <td>{revenue.RevenueValue}</td>
              <td>{revenue.RevenueForecast}</td>
              <td>{revenue.RevenueForecastValue}</td>
              <td>{revenue.RevenuePrevious}</td>
              <td>{revenue.RevenuePreviousValue}</td>
              <td>{revenue.MarketCapUSD}</td>
              <td>{revenue.FiscalTag}</td>
              <td>{revenue.FiscalReference}</td>
              <td>{revenue.CalendarReference}</td>
              <td>{revenue.Country}</td>
              <td>{revenue.Currency}</td>
              <td>{revenue.Importance}</td>
              <td>{revenue.Session}</td>
              <td>{revenue.MarketRelease}</td>
              <td>{revenue.LastUpdate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;
