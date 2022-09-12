// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#intraday

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

// Login with client key or leave it blank, you can get your free key here: http://developer.tradingeconomics.com
// Note: without a client key only a small sample of data will be given.
te.login()

//===============================================================================================================
// Get markets intraday data by market symbol
// You can pass dates parameters to get a specific data (start_date / end_date with date format yyyy/mm/dd)

te.getMarketsIntraday((symbol = 'aapl:us'))
  .then((data) => {
    console.log('Intraday by symbol:', '\n', data, '\n')
  })
  .catch((err) => console.log(err))

//===============================================================================================================
//Aggregate intraday prices by interval - allowed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h

async function getAggrPrices(targetSymbol, startDate, endDate, aggrInterval) {
  try {
    const data = await te.getMarketsIntraday(
      (symbol = targetSymbol),
      (start_date = startDate),
      (end_date = endDate),
      (agr = aggrInterval)
    )
    console.log('Aggregate intraday prices by interval:', '\n', data)
  } catch (error) {
    console.log(error)
  }
}
getAggrPrices('aapl:us', '2022-09-01', '2022-09-08', '5m')
