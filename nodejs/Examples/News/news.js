// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#news

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const NewsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get the latest news
    // You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data = await te.getNews();
    const data1 = await te.getNews(start_date = "2021-02-02",end_date = "2021-03-03");

    // Get a list of news by country, indicator
    // You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data2 = await te.getNews(country = "china");
    const data3 = await te.getNews(indicator = "imports",start_date = "2021-01-01",end_date = "2021-02-02");
    const data4 = await te.getNews(country = "china",indicator = "imports");

    // Get a paginated news list
    const data5 = await te.getNews(limit = "4", start = "2");

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

NewsExample();
