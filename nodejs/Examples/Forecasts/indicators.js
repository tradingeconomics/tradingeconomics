// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#forecast

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get forecasts by country/countries.
    const data1 = await te.getForecasts(country = 'mexico')

    //Get forecasts by indicator/indicators
    const data2 = await te.getForecasts(indicator = ['gdp', 'population'])

    //Get forecasts by ticker/tickers
    const data3 = await te.getForecasts(ticker = ['usurtot', 'wgdpchin'])

    //Get forecasts by country/countries and indicator/indicators.
    const data4 = te.getForecasts(country = 'mexico',indicator = 'gdp')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();




//===============================================================================================================
//Example using different methods to get details about the country with the highest forecasted GDP Annual Growth Rate
/*
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
getDetailsAfterForecast()*/
