// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#search

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get the categories available to use on search

te.getSearch()
  .then((data) => {
    console.log("Search categories", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Search for a term or keyword in a category

te.getSearch(term = 'japan', category = 'markets')
  .then((data) => {
    console.log("Search by term and category", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Search for a term or keyword in all categories available

te.getSearch(term = 'gold')
  .then((data) => {
    console.log("Search by term", "\n", data, "\n");
  })
  .catch((err) => console.log(err));