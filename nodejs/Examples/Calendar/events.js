// DOCUMENTATION:
// http://docs.tradingeconomics.com/?javascript#events

// Pacakge Installation: npm install tradingeconomics
const te = require('tradingeconomics')

const CalendarExample = async () => {
  try {
    // Login with client key or leave it blank and a sample of data will be provided, you can get your free key here: http://developer.tradingeconomics.com
    await te.login();

    //Get all calendar events (You can pass importance parameter or date parameters (yyyy-mm-dd) for specific data )
    const data = await te.getCalendar()
    const data1 = await te.getCalendar(start_date = '2016-12-02',end_date = '2016-12-03',importance = '3')

    //Get all calendar events for specific country (You can pass importance parameter or date parameters (yyyy-mm-dd) for specific data )
    const data2 = await te.getCalendar((country = 'united states'))

    //Get all calendar events for specific indicator (You can pass importance parameter or date parameters (yyyy-mm-dd) for specific data)
    const data3 = await te.getCalendar((indicator = 'inflation rate'))

    //Get all calendar events for specific indicator and country (You can pass date parameters (yyyy-mm-dd) for specific data)
    const data4 = await te.getCalendar(country = 'united states',indicator = 'initial jobless claims',start_date = '2016-12-01',end_date = '2017-02-25')

    //Get all events for specific calendar ID
    const data5 = await te.getCalendar(id = ['174108', '160025', '160030'])

    //Get all events for specific ticker/tickers (You can pass date parameters (yyyy-mm-dd) for specific data)
    const data6 = await te.getCalendar(ticker = ['IJCUSA', 'SPAINFACORD', 'BAHRAININFNRATE'])

    
    console.log(data); //Place one of the variables to test
  } catch (e) {
    console.log(`Error: ${e}`);
  }
};

CalendarExample();
