// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#financials

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const FinancialsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Gets a list of financials companies
    const data = await te.getFinancialsData()

    // Get a list of financials companies by country/countries or symbol/symbols
    const data1 = await te.getFinancialsData(country = 'united states')
    const data2 = await te.getFinancialsData(symbol = 'aapl:us')
    
    // Get financials historical data by symbol and category
    const data3 = await te.getFinancialsHistorical(symbol = 'aapl:us', category = 'assets')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

FinancialsExample();


//===============================================================================================================
//Example using our methods: Get a forecast for the stock with the highest Earnings Per Share (max 5 symbols)
/*
async function getForecastForHighestEPS(...symbols) {
  try {
    //Get financials data for the selected symbols
    const financialData = await te.getFinancialsData((symbol = symbols))
    //Filter for EPS
    const eps = financialData.filter((item) => item.financialSymbol.toLowerCase() == 'eps')
    //Find stock with the highest EPS
    const highestEPS = eps.reduce((stock1, stock2) =>stock1.last > stock2.last ? stock1 : stock2)
    console.log('Stock with the highest EPS:', '\n', highestEPS)
    //Get a forecast for this stock
    const forecast = await te.getMarketsForecast((symbol = highestEPS.stock))
    console.log('Forecast for stock with the highest EPS:', '\n', forecast)
  } catch (error) {
    console.log(error)
  }
}
getForecastForHighestEPS('aapl:us', 'fb:us', 'tsla:us', 'orcl:us', 'msft:us')*/
