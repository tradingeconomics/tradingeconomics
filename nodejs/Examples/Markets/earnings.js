// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#earnings

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const EarningsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get default earning calendar
    const data = await te.getEarnings();
    const data1 = await te.getNews(start_date = "2021-02-02",end_date = "2021-03-03");

    // Get filtered earnings - Optional: dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data2 = await te.getEarnings(symbol = "msft:us",start_date = "2016-01-01",end_date = "2017-12-31");

    // Get filtered earnings by country
    const data3 = await te.getEarnings(country = "united states");

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

EarningsExample();
