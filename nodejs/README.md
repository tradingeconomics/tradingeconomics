## Trading Economics for NodeJS

![version](https://img.shields.io/badge/version-2.1.0-green.svg)

The Trading Economics NPM package provides direct access to our data. It allows you to request millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. 

#

## Documentation
https://docs.tradingeconomics.com/?javascript#introduction

#

## Installation
* Make sure you have Nodejs installed, if not you can download it here: https://nodejs.org/en/download/
* Clone our repo and install dependencies

```bash

git clone https://github.com/tradingeconomics/tradingeconomics.git
cd tradingeconomics/nodejs
npm i

```

#

## Usage
1. Install and Import the package on your node project

```bash
npm install tradingeconomics
```

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
te.login('Client Key Here');
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


4. Output example: 

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
  }
]


````

#

## More examples

https://github.com/tradingeconomics/tradingeconomics/tree/master/nodejs/Examples

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx



