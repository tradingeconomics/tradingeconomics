// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#comtrade

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get detailed information about Comtrade categories, updates and countries

te.getComtrade(category = 'categories')
  .then((data) => {
    console.log("Comtrade categories", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getComtrade(category = 'updates')
  .then((data) => {
    console.log("Comtrade updates", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getComtrade(category = 'countries')
  .then((data) => {
    console.log("Comtrade countries", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get data about trading of one country or between two countries 

te.getComtrade(country = 'china')
  .then((data) => {
    console.log("Get trade information for one country", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

  
te.getComtrade(country = 'united states', country1 = 'china')
  .then((data) => {
    console.log("Get trade information between two countries", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get information about one country or between two countries with a specific type of trade

getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import')
  .then((data) => {
    console.log("Get information between two countries and a specific trade type", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


getCmtCountryFilterByType(country1 = 'United States', type = 'export')
  .then((data) => {
    console.log("Get information about one country and a specific trade type", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get information about one country or between two countries with a specific type of trade

getCmtCountryByCategory(country = 'United States', type = 'export', category = 'live animals')
  .then((data) => {
    console.log("Get information between two countries and a specific trade type", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


getCmtCountryByCategory(country = 'Brazil', type = 'import', category = 'Swine, live')
  .then((data) => {
    console.log("Get information between two countries and a specific trade type", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get Total trade information by type and country. Type cna be Import or Export

getComtradeTotalByType(country = 'Portugal', type = 'import')
  .then((data) => {
   console.log("Get Totals", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


  
//===============================================================================================================
// Get historical data by symbol

te.getComtrade(symbol = 'PRTESP24031')
  .then((data) => {
    console.log("Get historical data by symbol", "\n", data, "\n");
  })
  .catch((err) => console.log(err));