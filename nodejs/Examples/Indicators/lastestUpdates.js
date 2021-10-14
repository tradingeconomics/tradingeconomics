// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#latest-updates

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
//Get latest updates

te.getLatestUpdates()
  .then((data) => {
    console.log("Latest updates:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

//===============================================================================================================
//Get lastest updates by country or starting date (date format is yyyy/mm/dd)

te.getLatestUpdates(start_date = '2018-02-02')
  .then((data) => {
    console.log("Latest updates with starting date:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));

te.getLatestUpdates(country = 'portugal')
  .then((data) => {
    console.log("Latest updates by specific country:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));  

te.getLatestUpdates(country = 'portugal', start_date = '2018-02-02')
  .then((data) => {
    console.log("Latest updates by specific country and starting date:", "\n", data, "\n");
  })
  .catch((err) => console.log(err));  


