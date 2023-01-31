// Pacakge Installation: npm install tradingeconomics
const te = require("tradingeconomics");

const IndicatorsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get peers by ticker
    const data = await te.getPeers(ticker ='CPI YOY')

    //Get peers by country
    const data1 = await te.getPeers(country ='mexico')

    //Get peers by country and category
    const data2 = await te.getPeers(country ='mexico', category ='money')

    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

IndicatorsExample();
