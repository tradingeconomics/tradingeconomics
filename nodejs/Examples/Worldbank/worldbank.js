// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#world-bank

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const WBExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get the categories available to use on Worldbank
    const data = await te.getWorldBank();

    // Get world bank data by category, series code, country or by URL
    const data1 = await te.getWorldBank(category = "education");
    const data2 = await te.getWorldBank(series_code = "fr.inr.rinr");
    const data3 = await te.getWorldBank(country = "united states");
    const data4 = await te.getWorldBank(URL = "/united-states/real-interest-rate-percent-wb-data.html");

    // Get worldbank historical data
    const data5 = await te.getWorldBankHistorical(series_code = "usa.fr.inr.rinr");

    console.log(data); //Place one of the variables to test

  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

WBExample();

//===============================================================================================================
//Example using our methods to have historical for a country and series

/*
async function getHistoricalDataByIndicator(targetCountry, indicator) {
  try {
    const data = await te.getWorldBank((country = targetCountry));
    //Get the series code for the indicator
    const seriesCode = data.find((entry) => entry.description.toLowerCase() == indicator.toLowerCase()).symbol;
    console.log("The series code: ", seriesCode);
    //Now, use the series code to get historical data
    const historicalData = await te.getWorldBankHistorical((series_code = seriesCode));
    console.log(`Historical data for ${indicator} for ${targetCountry}:`,"\n",historicalData);
  } catch (error) {
    console.log(error);
  }
}
getHistoricalDataByIndicator("Chile", "Cereal yield (kg per hectare)");*/

