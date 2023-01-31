// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#intraday

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const MarketsIntrExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get markets intraday data by market symbol, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data = await te.getMarketsIntraday(symbol = 'aapl:us')

    //Aggregate intraday prices by interval - allowed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h
    const data1 = await te.getMarketsIntraday(symbol = 'aapl:us',start_date = '2022-09-01',end_date = '2022-09-08',agr = '5m')
    
    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

MarketsIntrExample();



