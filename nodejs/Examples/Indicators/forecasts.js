// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#forecast

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
//Get forecasts by country/countries.

te.getForecasts((country = 'united states'))
  .then((data) => {
    console.log('Forecasts by country/countries', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get forecasts by indicator/indicators

te.getForecasts((indicator = ['gdp', 'population']))
  .then((data) => {
    console.log('Forecasts by indicator/indicators', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get forecasts by ticker/tickers

te.getForecasts((ticker = ['usurtot', 'wgdpchin']))
  .then((data) => {
    console.log('Forecasts by indicator/indicators', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get forecasts by country/countries and indicator/indicators.

te.getForecasts(
  (country = 'united states'),
  (indicator = ['gdp', 'interest rate'])
).then((data) => {
  console.log(
    'Forecasts by country/countries and indicator/indicators',
    '\n',
    data,
    '\n'
  )
})

//===============================================================================================================
//Get forecast for multiple countries

async function getMultipleCountriesForecast(...countries) {
  try {
    const data = await te.getForecasts((country = countries))
    console.log('Forecast for the selected countries:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getMultipleCountriesForecast('Jamaica', 'Ecuador', 'Panama')

//===============================================================================================================
//Get details about the country with the highest forecasted GDP Annual Growth Rate

async function getDetailsAfterForecast() {
  try {
    //Get GDP Annual Growth Rate forecast
    const forecast = await te.getForecasts(
      (indicator = 'GDP Annual Growth Rate')
    )
    //Now, find the country with the maximum forecasted GDP Annual Growth Rate
    const targetCountry = forecast.reduce((country1, country2) =>
      country1.q4 > country2.q4 ? country1 : country2
    ).Country
    console.log(
      'Country with max forecasted q4 annual GDP growth rate: ',
      targetCountry
    )
    //Get more info about this country
    const countryIndicators = await te.getIndicatorData(
      (country = targetCountry)
    )
    console.log(
      `All the indicators for ${targetCountry}`,
      '\n',
      countryIndicators
    )
  } catch (error) {
    console.log(error)
  }
}
getDetailsAfterForecast()
