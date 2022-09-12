// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#world-bank

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
// Get the categories available to use on Worldbank

te.getWorldBank()
  .then((data) => {
    console.log('Worldbank categories', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get world bank data by category, series code, country or by URL

te.getWorldBank((category = 'education'))
  .then((data) => {
    console.log('Worldbank by category', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

te.getWorldBank((series_code = 'fr.inr.rinr'))
  .then((data) => {
    console.log('Worldbank by series code', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

te.getWorldBank((country = 'united states'))
  .then((data) => {
    console.log('Worldbank by country', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

te.getWorldBank(
  (URL = '/united-states/real-interest-rate-percent-wb-data.html')
)
  .then((data) => {
    console.log('Worldbank by URL', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
// Get worldbank historical data

te.getWorldBankHistorical((series_code = 'usa.fr.inr.rinr'))
  .then((data) => {
    console.log('Worldbank historical data', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//get World Bank data for a specific indicator and country by using series code

async function getWBDataByCountryIndic(seriesCode) {
  try {
    const data = await te.getWorldBank((series_code = seriesCode))
    console.log(
      'World Bank data for the specified country and indicator by series code:',
      '\n',
      data
    )
  } catch (error) {
    console.log(error)
  }
}
getWBDataByCountryIndic('USA.FR.INR.RINR')

//===============================================================================================================
//Get historical data for a specific indicator

async function getHistoricalDataByIndicator(targetCountry, indicator) {
  try {
    const data = await te.getWorldBank((country = targetCountry))
    //Get the series code for the indicator
    const seriesCode = data.find(
      (entry) => entry.description.toLowerCase() == indicator.toLowerCase()
    ).symbol
    console.log('The series code: ', seriesCode)
    //Now, use the series code to get historical data
    const historicalData = await te.getWorldBankHistorical(
      (series_code = seriesCode)
    )
    console.log(
      `Historical data for ${indicator} for ${targetCountry}:`,
      '\n',
      historicalData
    )
  } catch (error) {
    console.log(error)
  }
}
getHistoricalDataByIndicator('Chile', 'Cereal yield (kg per hectare)')
