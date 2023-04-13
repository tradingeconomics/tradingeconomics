// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#markets

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const MarketsExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get Market Lists by: Commodity, Currency, Index, Bond or crypto
    const data = await te.getMarketSnap(marketsField = 'commodities')

    //Currency Crosses, pass a currency to see the crosses
    const data1 = await te.getMarketSnap(cross = 'eur')

    //Get a specific market or markets, for multiple markets use symbols = ['indu:ind','aapl:us']
    const data2 = await te.getMarketSnap(symbol = 'aapl:us')

    //Get market peers and components
    const data3 = await te.getMarketSnap(peers_symbol = 'aapl:us')
    const data4 = await te.getMarketSnap(components_symbol = 'psi20:ind')

    //List markets by country
    const data5 = await te.getMarketSnap(country = 'japan')

    //Search
    const data6 = await te.getMarketSnap(search_term = 'united states', category = 'index')

    //Get stock description by one or more symbols
    const data7 = await te.getMarketStockDescriptions(symbol = 'aapl:us')

    //Get stock description by country
    const data8 = await te.getMarketStockDescriptions(country = 'china')

    //Get stock symbology by symbol
    const data9 = await te.getSymbology(symbol = 'aapl:us')

    //Get stock symbology by ticker
    const data10 = await te.getSymbology(ticker = 'aapl')

    //Get stock symbology by ISIN
    const data11 = await te.getSymbology(isin = 'US0378331005')


    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

MarketsExample();
