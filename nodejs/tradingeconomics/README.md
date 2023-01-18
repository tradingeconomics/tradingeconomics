## Description
Node package on how to access Trading Economics API data.

## Documentation
https://docs.tradingeconomics.com/?javascript#introduction

## QuickStart
First install the package:

```javascript
npm install tradingeconomics
```

## Usage
  

 - First import the package and start using it. 

```javascript
const te = require('tradingeconomics');
```

 - Login if you have a client key or leave it blank and sample of data will be provided.

**Note:** You can get your key here: http://developer.tradingeconomics.com 

```javascript
te.login();
```
or
```javascript
te.login('Client Key Here');
```

 - Use the functions to get data from Markets, Indicators, Economic Calendar, Forecasts, World Bank, Comtrade, Federal Reserve, and even the latest news.


### Know more about other methods on our [docs](https://docs.tradingeconomics.com/?javascript#introduction)
