// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#news

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login();

//===============================================================================================================
// Get the latest news
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getNews()
  .then((data) => {
    console.log("Latest news", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getNews(start_date = '2021-02-02', end_date = '2021-03-03')
  .then((data) => {
    console.log("Latest news", "\n", data, "\n");
  })
  .catch((err) => console.log(err));



//===============================================================================================================
// Get a list of news by country, indicator
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getNews(country = 'china')
  .then((data) => {
    console.log("News by country", "\n", data, "\n");
  })
  .catch((err) => console.log(err));


te.getNews(indicator = 'imports', start_date = '2021-01-01', end_date = '2021-02-02')
.then((data) => {
  console.log("News by indicator and date", "\n", data, "\n");
})
.catch((err) => console.log(err));


te.getNews(country = 'china', indicator = 'imports')
.then((data) => {
  console.log("News by country and indicator", "\n", data, "\n");
})
.catch((err) => console.log(err));



//===============================================================================================================
// Get a paginated news list

te.getNews(limit = '4', start = '2')
  .then((data) => {
    console.log("Paginated news list", "\n", data, "\n");
  })
  .catch((err) => console.log(err));