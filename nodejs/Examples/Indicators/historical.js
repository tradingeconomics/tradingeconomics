// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#historical

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

   // To get a list of Historical data for specific country/countries and indicator, or you can specify a start date, or even start and end date (date format is yyyy-mm-dd).
    const data = await te.getHistoricalData(country = 'mexico', indicator = 'gdp')

    //You can specify a ticker, and a start date (date format is yyy-mm-dd).
    const data1 = await te.getHistoricalData(ticker = 'usurtot', start_date = '2018-02-02')

    // Get historical latest updates
    const data2 = await te.getHistoricalUpdates()

    //Get all discontinued series or pass country parameter to get discontinued series by country/countries
    const data3 = await te.getDiscontinuedIndicators()
    const data4 = await te.getDiscontinuedIndicators(country = ['mexico', 'sweden'])

    //Get multiple indicators for a specific country
    const data5 = await te.getHistoricalData(country = ['mexico', 'sweden'],indicator = ['gdp', 'population'])

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();
