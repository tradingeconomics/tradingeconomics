// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#historical

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// To get a list of Historical data for specific country/countries and indicator, or you can specify a start date, or even start and end date (date format is yyyy-mm-dd).

te.getHistoricalData(country = "united states", indicator = "gdp")
  .then((result) => {
    console.log("List of Historical by country and indicator","\n",result,"\n");
  }).catch((err) => console.log(err));

/*
te.getHistoricalData(country = "united states",indicator = "gdp", start_date = "2013-01-01", end_date = "2019-02-02")
.then(data => {
  console.log("List of Historical by country, indicator and dates","\n",data,"\n");
}).catch((err) => console.log(err));
*/

//===============================================================================================================
//You can specify a ticker, and a start date (date format is yyy-mm-dd).

te.getHistoricalData(ticker = "usurtot", start_date = "2018-02-02")
  .then(data => {
    console.log("List of Historical by ticker","\n",data,"\n");
  }).catch((err) => console.log(err));


//===============================================================================================================
//Get all discontinued series or pass country parameter to get discontinued series by country/countries

te.getDiscontinuedIndicators()
.then(data => {
  console.log("List of all discontinued series","\n",data,"\n");
}).catch((err) => console.log(err));

/*
te.getDiscontinuedIndicators(country = ["united states", "china"])
  .then(data => {
    console.log("List of discontinued series by country","\n",data,"\n");
  }).catch((err) => console.log(err));
*/