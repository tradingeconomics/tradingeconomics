// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#marketForecast

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
// Get markets forecasts by category
// Category can be: index, currency, commodity and bond

te.getMarketsForecast((category = 'index'))
  .then((data) => {
    console.log('Markets forecast by category:', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get markets forecasts by symbol/symbols
// For multiple symbols use: symbol = ['aapl:us', 'indu:ind']

te.getMarketsForecast((symbol = 'aapl:us'))
  .then((data) => {
    console.log('Markets forecast by symbol', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get a forecast for the government bonds by specific country

async function getBondForecastByCountry(targetCountry) {
  try {
    const bondForecast = await te.getMarketsForecast((category = 'bond'))
    const bondsTargetCountry = bondForecast.filter(
      (country) => country.Country.toLowerCase() == targetCountry.toLowerCase()
    )
    console.log(
      "Forecast for the selected country's government bonds:",
      '\n',
      bondsTargetCountry
    )
  } catch (error) {
    console.log(error)
  }
}
getBondForecastByCountry('united states')
