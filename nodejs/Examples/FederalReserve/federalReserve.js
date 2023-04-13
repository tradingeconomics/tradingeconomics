// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#federal-reserve

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const FEDExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get all US states
    const data = await te.getFred()

    // Get all counties per US state
    const data1 = await te.getFred(counties = 'arkansas')

    // Get data of Federal Reserve by symbol, county, state or URL
    const data2 = await te.getFred(symbol = 'ALLMARGATTN')
    const data3 = await te.getFred(county = 'arkansas')
    const data4 = await te.getFred(state = 'tennessee')
    const data5 = await te.getFred(URL ='/united-states/all-marginally-attached-workers-for-tennessee-fed-data.html')

    // Get historical data of Federal Reserve by symbol/symbols and dates. You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data6 = await te.getFred(historical_symbol = ['RACEDISPARITY005007', '2020RATIO002013'])

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

FEDExample();

