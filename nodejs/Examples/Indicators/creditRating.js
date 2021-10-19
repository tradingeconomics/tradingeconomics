// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#credit-rating

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
//Get credit ratings for all countries

te.getRatings()
  .then((data) => {
    console.log("Credit ratings list:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get credit ratings for a specific country/countries

te.getRatings(country = ['united states', 'portugal'])
  .then((data) => {
    console.log("Credit ratings:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get all historical ratings by country/countries, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getRatings(historical = ['united states','portugal'])
  .then((data) => {
    console.log("Historical rating for a country/countries", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

te.getRatings(historical = 'united states', start_date = '2011-01-01', end_date = '2012-01-01')
  .then((data) => {
    console.log("Historical rating for a country with date parameters", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

