// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#indicators


// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");


// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();


//===============================================================================================================
// Get a list of all indicators

te.getIndicatorData()
  .then((all) => {
    console.log("List of all Indicators", "\n", all, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
// Get an indicators list by country/countries, you can pass group to get more specific data

te.getIndicatorData((country = ["united states", "china"]))
  .then((country) => {
    console.log("List of indicators by country", "\n", country, "\n");
  })
  .catch((err) => console.log(err));

/*

te.getIndicatorData(country = 'china', group = 'housing').then(countryGroup => {
  console.log('List of indicators by country', '\n', countryGroup, '\n',)       
}).catch(err => console.log(err))

*/

//===============================================================================================================
// Get specific indicator for all countries

te.getIndicatorData((indicator = "gdp"))
  .then((indicator) => {
    console.log("List of a specific indicator", "\n", indicator, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
// Get a list of indicators by ticker

te.getIndicatorData((ticker = "usurtot"))
  .then((ticker) => {
    console.log("List of indicators by ticker", "\n", ticker, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
// Get a list of indicators by ticker

te.  getHistoricalUpdates()()
  .then((all) => {
    console.log("List of historical updates", "\n", all, "\n");
  })
  .catch((err) => console.log(err));


