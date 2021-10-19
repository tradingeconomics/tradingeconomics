## EXAMPLES

This folder has examples on how you can get data about Markets, Historical data, Indicators, Calendar, World Bank, Federal Reserve, Comtrade, Forecasts and News, using nodejs.

[Documentation](https://docs.tradingeconomics.com/?javascript#introduction)


## Installation
Make sure you have Nodejs installed, if not you can download here: https://nodejs.org/en/download/

You need to install the package:

```javascript
npm install tradingeconomics
```

## Usage
1. Import the package on your node project

```javascript
const te = require('tradingeconomics');
```

2. Login to get our data

**Note:** If you don't have a client key leave it blank and a sample of data will be provided or you can get your free key here: http://developer.tradingeconomics.com 

```javascript
te.login();
```
or
```javascript
te.login('thisIsAFakeKey:thisIsAFakeKey');
```

3. Use our methods to get data

**Note:** For more information about our methods and data, check our documentation [here](https://docs.tradingeconomics.com/?javascript#introduction)

```javascript
te.getEarnings(symbol = 'aapl:us', start_date = '2016-01-01', end_date = '2017-12-31')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
```


- Output example: 

 ```javascript
[
  {
    Date: '2016-01-26T00:00:00',
    Symbol: 'AAPL:US',
    Type: 'Earnings',
    Name: 'Apple',
    Actual: '3.28',
    Forecast: null,
    FiscalTag: 'FY2016Q1',
    FiscalReference: 'Q1/16',
    CalendarReference: '2015/12',
    Country: 'United States',
    Currency: 'USD',
    Importance: 3,
    Session: 21,
    LastUpdate: '2017-08-03T21:30:00'
  },
  {
    Date: '2016-04-26T00:00:00',
    Symbol: 'AAPL:US',
    Type: 'Earnings',
    Name: 'Apple',
    Actual: '1.9',
    Forecast: null,
    FiscalTag: 'FY2016Q2',
    FiscalReference: 'Q2/16',
    CalendarReference: '2016/3',
    Country: 'United States',
    Currency: 'USD',
    Importance: 3,
    Session: 21,
    LastUpdate: '2017-08-03T21:02:00'
  },
  {
    Date: '2016-07-26T00:00:00',
    Symbol: 'AAPL:US',
    Type: 'Earnings',
    Name: 'Apple',
    Actual: '1.42',
    Forecast: null,
    FiscalTag: 'FY2016Q3',
    FiscalReference: 'Q3/16',
    CalendarReference: '2016/6',
    Country: 'United States',
    Currency: 'USD',
    Importance: 3,
    Session: 21,
    LastUpdate: '2017-08-03T16:37:00'
  },


````



