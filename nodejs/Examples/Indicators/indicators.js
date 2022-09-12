// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#indicators

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
// Get a list of all indicators

te.getIndicatorData()
  .then((all) => {
    console.log('List of all Indicators', '\n', all, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get an indicators list by country/countries, you can pass group to get more specific data

te.getIndicatorData((country = ['united states', 'china']))
  .then((country) => {
    console.log('List of indicators by country', '\n', country, '\n')
  })
  .catch((err) => console.log(err))

te.getIndicatorData((country = 'china'), (group = 'housing'))
  .then((countryGroup) => {
    console.log('List of indicators by country', '\n', countryGroup, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get specific indicator for all countries

te.getIndicatorData((indicator = 'gdp'))
  .then((indicator) => {
    console.log('List of a specific indicator', '\n', indicator, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get a list of indicators by ticker

te.getIndicatorData((ticker = 'usurtot'))
  .then((ticker) => {
    console.log('List of indicators by ticker', '\n', ticker, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get a list of all countries

async function getAllCountries() {
  try {
    const countries = await te.getAllCountries()
    console.log('List of all countries', '\n', countries)
  } catch (error) {
    console.log(error)
  }
}
getAllCountries()

//===============================================================================================================
//Combine methods to get data by country and group

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
getCountryGroupData('Belgium', 'Credit Rating')
