// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#historical11

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
//Get Historical data from markets by symbol, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getHistoricalMarkets(symbol = 'aapl:us')
  .then((data) => {
    console.log("Historical by symbol:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getHistoricalMarkets(symbol = 'aapl:us', start_date = '2018-02-02', end_date = '2019-02-02')
  .then((data) => {
    console.log("Historical by symbol and dates", "\n", data, "\n");
  })
  .catch((err) => console.log(err));
