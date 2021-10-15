// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#financials

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Gets a list of financials companies

te.getFinancialsData()
  .then((data) => {
    console.log("Financials companies:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get a list of financials companies by country/countries or symbol/symbols
// For multiple countries/symbols use: country = ['china', 'united states']

te.getFinancialsData(country = 'united states')
  .then((data) => {
    console.log("Financials companies by country", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getFinancialsData(symbol = 'aapl:us')
  .then((data) => {
    console.log("Financials companies by country", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get financials historical data by symbol and category

te.getFinancialsHistoricalData(symbol = 'aapl:us', category = 'assets' )
  .then((data) => {
    console.log("Financials historical", "\n", data, "\n");
  })
  .catch((err) => console.log(err));