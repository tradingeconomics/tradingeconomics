// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#eurostat

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const EurostatExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get the countries and categories available to use on filtering
    const data = await te.getEurostatData(lists = 'countries')

    // Get the countries and categories data
    const data1 = await te.getEurostatData(country = 'Denmark')
    const data2 = await te.getEurostatData(category = 'People at risk of income poverty after social transfers')

    // Get Eurostat data by category group and country
    const data3 = await te.getEurostatData(category_group = 'Poverty')
    const data4 = await te.getEurostatData(country = 'Denmark', category_group = 'Poverty')

    // Get Eurostat historical data by id. You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)
    const data5 = await te.getEurostatHistorical(id = '24804')
    const data6 = await te.getEurostatHistorical(id = '24804', start_date = '2017-01-01',end_date = '2020-05-05')

    //Get Eurostat data by country and category
    const data7 = await te.getEurostatData(country = 'Latvia', category = 'Electricity prices: Medium size households')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

EurostatExample();


//Example using our methods to compare a country with the EU average
/*
async function compareWithEUAverage(targetCountry, targetCategory) {
  try {
    const data = await te.getEurostatData((category = targetCategory))
    const targetCountryData = data.find(
      (entry) => entry.Country.toLowerCase() == targetCountry.toLowerCase()
    )
    const euAverageData = data.find(
      (entry) => entry.Country.toLowerCase() == 'european union'
    )
    console.log(`The EU average for ${targetCategory}:`, '\n', euAverageData)
    console.log(
      `${targetCategory} for ${targetCountry}:`,
      '\n',
      targetCountryData
    )
  } catch (error) {
    console.log(error)
  }
}
compareWithEUAverage('Slovakia', 'Real GDP per capita')*/
