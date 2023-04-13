// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#credit-rating

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get credit ratings for all countries
    const data = await te.getRatings()

    //Get credit ratings for a specific country/countries
    const data1 = await te.getRatings(country = ['mexico', 'sweden'])

    //Get all historical ratings by country/countries, you can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data2 = await te.getRatings(historical = ['mexico', 'sweden'])
    const data3 = await te.getRatings(historical = 'mexico',start_date = '2013-01-01',end_date = '2014-01-01')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();
