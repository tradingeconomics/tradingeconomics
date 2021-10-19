// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#federal-reserve

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get all US states

te.getFred()
  .then((data) => {
    console.log("List of US states", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get all counties per US state

te.getFred(counties = 'arkansas')
  .then((data) => {
    console.log("Counties list", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get data of Federal Reserve by symbol, county, state or URL

te.getFred(symbol = 'AGEXMAK2A647NCEN')
  .then((data) => {
    console.log("Data by symbol", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getFred(county = 'arkansas')
  .then((data) => {
   console.log("Data by county", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


  te.getFred(state = 'tennessee')
  .then((data) => {
   console.log("Data by state", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getFred(URL = '/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html')
  .then((data) => {
    console.log("Data by URL", "\n", data, "\n");
   })
   .catch((err) => console.log(err));


//===============================================================================================================
// Get historical data of Federal Reserve by symbol/symbols and dates
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getFred(historical_symbol = ['RACEDISPARITY005007','2020RATIO002013'])
  .then((data) => {
    console.log("Historical data by symbol", "\n", data, "\n");
   })
   .catch((err) => console.log(err));


te.getFred(historical_symbol = 'RACEDISPARITY005007', start_date = '2017-05-01', end_date = '2018-12-31')
   .then((data) => {
    console.log("Historical data by symbol and dates", "\n", data, "\n");
   })
   .catch((err) => console.log(err));