// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#indicators

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    
    //Get a list of all countries
    const data = await te.getAllCountries()

    // Get a list of all indicators
    const data1 = await te.getIndicatorData()

    // Get an indicators list by country/countries, you can pass group to get more specific data
    const data2 = await te.getIndicatorData(country = ['mexico', 'sweden'])
    const data3 = await te.getIndicatorData(country = 'mexico', group = 'gdp')

    // Get specific indicator for all countries
    const data4 = await te.getIndicatorData(indicator = 'gdp')

    // Get a list of indicators by ticker
    const data5 = await te.getIndicatorData(ticker = 'usurtot')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();




//===============================================================================================================
//Example combining methods to get data by country and group
/*
async function getCountryGroupData(targetCountry, targetIndicator) {
  try {
    const allIndicators = await te.getIndicatorData()
    //We want to find out which category group 'targetIndicator' belongs to
    const categoryGroup = allIndicators.find(
      (indicator) =>
        indicator.Category.toLowerCase() == targetIndicator.toLowerCase()
    ).CategoryGroup
    console.log('Category group: ' + categoryGroup)
    //Now we can get more information about other indicators from this group
    const indicatorsByGroup = await te.getIndicatorData(
      (country = targetCountry),
      (group = categoryGroup)
    )
    console.log(
      'List of all indicators from the group:',
      '\n',
      indicatorsByGroup
    )
  } catch (error) {
    console.log(error)
  }
}
getCountryGroupData('Belgium', 'Credit Rating')*/
