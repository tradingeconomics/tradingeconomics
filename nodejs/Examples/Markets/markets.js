// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#markets

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
//Get Market Lists by:
// - Commodity, Currency, Index or Bond ( Just needs to pass one of these on marketsFields parameter)

te.getMarketSnap((marketsField = 'commodities'))
  .then((data) => {
    console.log('Markets lists:', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Currency Crosses, pass a currency to see the crosses

te.getMarketSnap((cross = 'eur'))
  .then((data) => {
    console.log('Currency crosses', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get a specific market or markets, for multiple markets use symbols = ['indu:ind','aapl:us']

te.getMarketSnap((symbol = 'aapl:us'))
  .then((data) => {
    console.log('Market', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get market peers and components

te.getMarketSnap((peers_symbol = 'aapl:us'))
  .then((data) => {
    console.log('Market peers', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

te.getMarketSnap((components_symbol = 'psi20:ind'))
  .then((data) => {
    console.log('Market Components', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//List markets by country

te.getMarketSnap((country = 'japan'))
  .then((data) => {
    console.log('List markets of a country', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Search

te.getMarketSnap((search_term = 'united states'), (category = 'index'))
  .then((data) => {
    console.log('Results of market search', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Get cryptocurrency market info

async function getCrypto() {
  try {
    const data = await te.getMarketSnap((marketsField = 'crypto'))
    console.log('Cryptocurrency market info:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getCrypto()

//===============================================================================================================
//Get stock description by one or more symbols

async function getStockDescrBySymbol(...symbols) {
  try {
    const data = await te.getMarketStockDescriptions((symbol = symbols))
    console.log('Stock description:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getStockDescrBySymbol('aapl:us', 'fb:us')

//===============================================================================================================
//Get stock description by country

async function getStockDescrByCountry(targetCountry) {
  try {
    const data = await te.getMarketStockDescriptions((country = targetCountry))
    console.log('Stock description:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getStockDescrByCountry('china')

//===============================================================================================================
//Get stock symbology by symbol

async function getSymbologyBySymbol(targetSymbol) {
  try {
    const data = await te.getSymbology((symbol = targetSymbol))
    console.log('Stock symbology:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getSymbologyBySymbol('aapl:us')

//===============================================================================================================
//Get stock symbology by ticker

async function getSymbologyByTicker(targetTicker) {
  try {
    const data = await te.getSymbology((ticker = targetTicker))
    console.log('Stock symbology:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getSymbologyByTicker('aapl')

//===============================================================================================================
//Get stock symbology by ISIN

async function getSymbologyByISIN(targetISIN) {
  try {
    const data = await te.getSymbology((isin = targetISIN))
    console.log('Stock symbology:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getSymbologyByISIN('US0378331005')
