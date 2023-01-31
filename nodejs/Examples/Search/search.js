// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#search

// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const SearchExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    // Get the categories available to use on search
    const data = await te.getSearch();

    // Search for a term or keyword in a category
    const data1 = await te.getSearch(term = "japan", category = "markets");

    // Search for a term or keyword in all categories available
    const data2 = await te.getSearch(term = "gold");

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

SearchExample();
