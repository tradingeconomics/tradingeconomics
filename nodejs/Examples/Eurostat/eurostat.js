// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#eurostat

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get the countries and categories available to use on filtering

te.getEurostatData(lists = 'countries')
  .then((data) => {
    console.log("Available countries", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getEurostatData(lists = 'categories')
  .then((data) => {
    console.log("Available categories", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get the countries and categories data

te.getEurostatData(country = 'Denmark')
  .then((data) => {
    console.log("Get eurostat country data", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getEurostatData(category = 'People at risk of income poverty after social transfers')
  .then((data) => {
    console.log("Get eurostat data by category", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get Eurostat data by category group and country

te.getEurostatData(category_group = 'Poverty')
  .then((data) => {
    console.log("Eurostat data by category group", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


  te.getEurostatData(country = 'Denmark', category_group = 'Poverty')
  .then((data) => {
    console.log("Eurostat data by category group and country", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get Eurostat historical data by id 
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getEurostatHistorical(id = '24804')
  .then((data) => {
    console.log("Historical data by ID", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getEurostatHistorical(id = '24804', start_date = '2017-01-01', end_date = '2020-05-05')
  .then((data) => {
    console.log("Historical data by ID and Dates", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



