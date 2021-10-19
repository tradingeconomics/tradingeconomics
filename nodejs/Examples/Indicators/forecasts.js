// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#forecast

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
//Get forecasts by country/countries.

te.getForecasts(country = "united states")
  .then((data) => {
    console.log("Forecasts by country/countries", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get forecasts by indicator/indicators

te.getForecasts(indicator = ["gdp", "population"])
  .then((data) => {
    console.log("Forecasts by indicator/indicators", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get forecasts by ticker/tickers

te.getForecasts(ticker = ["usurtot", "wgdpchin"])
  .then((data) => {
    console.log("Forecasts by indicator/indicators", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get forecasts by country/countries and indicator/indicators.

data = te
  .getForecasts(country = "united states", indicator = ["gdp","interest rate"])
  .then((data) => {
    console.log("Forecasts by country/countries and indicator/indicators", "\n", data, "\n");
  });
