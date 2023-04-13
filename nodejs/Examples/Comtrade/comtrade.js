// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#comtrade

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const ComtradeExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get detailed information about Comtrade. Can be: categories, updates or countries
    const data = await te.getComtrade(category = 'categories')

    // Get data about trading of one country or between two countries
    const data1 = await te.getComtrade(country = 'china')
    const data2 = await te.getComtrade(country = 'united states', country1 = 'china')

    // Get information about one country or between two countries with a specific type of trade
    const data3 = await te.getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import')
    const data4 = await te.getCmtCountryFilterByType(country1 = 'United States', type = 'export')

    // Get information about one country or between two countries with a specific type of trade
    const data5 = await te.getCmtCountryByCategory(country = 'United States', type = 'export', category = 'live animals')

    // Get Total trade information by type and country. Type cna be Import or Export
    const data6 = await te.getComtradeTotalByType(country = 'Portugal', type = 'import')

   // Get historical data by symbol
   const data7 = await te.getComtrade(symbol = 'PRTESP24031')

  //Get total imports by category
  const data8 = await te.getComtradeTotalByType(country = 'Portugal', type = 'import')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

ComtradeExample();

//===============================================================================================================
//Example that uses some of the methods to get top export markets and import sources
/*
async function getTopTradingPartners(targetCountry) {
  try {
    //Get exports
    const exports = await te.getComtradeTotalByType(
      (country = targetCountry),
      (type = 'export')
    )
    //Get imports
    const imports = await te.getComtradeTotalByType(
      (country = targetCountry),
      (type = 'import')
    )
    const exportCountries = exports.filter(
      (entry) => entry.country2.toLowerCase() != 'world'
    )
    const importCountries = imports.filter(
      (entry) => entry.country2.toLowerCase() != 'world'
    )
    //Top 5 export markets
    const top5Export = exportCountries
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    //Top 5 import sources
    const top5Import = importCountries
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
    console.log('Top 5 export markets:', '\n', top5Export)
    console.log('Top 5 import sources:', '\n', top5Import)
  } catch (error) {
    console.log(error)
  }
}
getTopTradingPartners('peru')*/
