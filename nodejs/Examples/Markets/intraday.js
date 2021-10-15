// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#intraday

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get markets intraday data by market symbol 
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd) and an interval (1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h)

te.getMarketsIntraday(symbol = 'aapl:us')
  .then((data) => {
    console.log("Intraday by symbol:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getHistoricalMarkets(symbol = 'aapl:us', start_date = '2018-02-02', end_date = '2019-02-02', agr = '5d')
  .then((data) => {
    console.log("Intraday by symbol, dates and interval", "\n", data, "\n");
  })
  .catch((err) => console.log(err));
