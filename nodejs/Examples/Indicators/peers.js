// DOCUMENTATION:
// Coming Soon

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
//Get peers by ticker

getPeers(ticker ='CPI YOY')
  .then((data) => {
    console.log("Peers by ticker:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
//Get peers by country

getPeers(country ='united states')
  .then((data) => {
    console.log("Peers by country:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
//Get peers by country and category

getPeers(country ='united states', category ='money')
.then((data) => {
  console.log("Peers by country and category:", "\n", data, "\n");
})
.catch((err) => console.log(err));   