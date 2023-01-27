## Description
The Trading Economics NPM package provides direct access to our data. It allows you to request millions of rows of economic historical data, to query our real-time economic calendar and to subscribe to updates. 

#

## Documentation
https://docs.tradingeconomics.com/?javascript#introduction

#

## QuickStart
First install the package:

```javascript
npm install tradingeconomics
```

#

## Usage
  
 - ### Import the package. 

```javascript
const te = require('tradingeconomics');
```
 -  ### Authentication
    - Login if you have a client key or leave it blank and a sample of data will be provided.
    - Note: Get your key here: http://developer.tradingeconomics.com 

```javascript
te.login();
```
or
```javascript
te.login('key:secret');
```

  - ### Authentication using environment variable
```javascript
apikey="key:secret" node app.js
```
 - ### Request data
    - Use the functions to get data from Markets, Indicators, Economic Calendar, Forecasts, World Bank, Comtrade, Federal Reserve, and even the latest news.
    - Know more about other methods on our [docs](https://docs.tradingeconomics.com/?javascript#introduction)
```javascript
te.getCalendar().then((data) => console.log(data));
```

#

## Examples

https://github.com/tradingeconomics/tradingeconomics/tree/master/nodejs/Examples
