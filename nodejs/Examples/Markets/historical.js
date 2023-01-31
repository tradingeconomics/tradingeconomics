// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#historical11

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const MarketsHistExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get Historical data from markets by symbol, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data = await te.getHistoricalMarkets(symbol = ['aapl:us','gac:com'])
    const data1 = await te.getHistoricalMarkets(symbol = 'aapl:us',start_date = '2017-08-01',end_date = '2017-08-08')
    

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

MarketsHistExample();


