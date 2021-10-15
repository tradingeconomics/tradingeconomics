// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#earnings

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get default earning calendar

te.getEarnings()
  .then((data) => {
    console.log("Default earning calendar:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


//===============================================================================================================
// Get filtered earnings
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getEarnings(symbol = 'msft:us', start_date = '2016-01-01', end_date = '2017-12-31')
  .then((data) => {
    console.log("Filtered earnings", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


//===============================================================================================================
// Get filtered earnings by country

te.getEarnings(country = 'united states')
  .then((data) => {
    console.log("Filtered earnings", "\n", data, "\n");
  })
  .catch((err) => console.log(err));