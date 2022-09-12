// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#financials

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
// Gets a list of financials companies

te.getFinancialsData()
  .then((data) => {
    console.log('Financials companies:', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get a list of financials companies by country/countries or symbol/symbols
// For multiple countries/symbols use: country = ['china', 'united states']

te.getFinancialsData((country = 'united states'))
  .then((data) => {
    console.log('Financials companies by country', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

te.getFinancialsData((symbol = 'aapl:us'))
  .then((data) => {
    console.log('Financials companies by country', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get financials historical data by symbol and category

te.getFinancialsHistorical((symbol = 'aapl:us'), (category = 'assets'))
  .then((data) => {
    console.log('Financials historical', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get a forecast for the stock with the highest Earnings Per Share (max 5 symbols)

async function getForecastForHighestEPS(...symbols) {
  try {
    //Get financials data for the selected symbols
    const financialData = await te.getFinancialsData((symbol = symbols))
    //Filter for EPS
    const eps = financialData.filter(
      (item) => item.financialSymbol.toLowerCase() == 'eps'
    )
    //Find stock with the highest EPS
    const highestEPS = eps.reduce((stock1, stock2) =>
      stock1.last > stock2.last ? stock1 : stock2
    )
    console.log('Stock with the highest EPS:', '\n', highestEPS)
    //Get a forecast for this stock
    const forecast = await te.getMarketsForecast((symbol = highestEPS.stock))
    console.log('Forecast for stock with the highest EPS:', '\n', forecast)
  } catch (error) {
    console.log(error)
  }
}
getForecastForHighestEPS('aapl:us', 'fb:us', 'tsla:us', 'orcl:us', 'msft:us')
