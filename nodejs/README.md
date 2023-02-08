## Trading Economics for NodeJS

![version](https://img.shields.io/badge/version-2.2.2-green.svg)

The Trading Economics NPM package provides direct access to our data. It allows you to request millions of rows of economic historical data, to query our real-time economic calendar and to subscribe to updates. 


#

## Installation

Using NPM

```bash
npm install -g tradingeconomics
```

Using GitHub

```bash

git clone https://github.com/tradingeconomics/tradingeconomics.git
cd tradingeconomics/nodejs
npm i
```

#

## Requirements

```javascript
const te = require('tradingeconomics');
```

#

## Authentication

Authentication using Environment Variable (more secure)

```javascript
apikey="key:secret" node app.js
```

Authentication using inline code

```javascript
te.login('guest:guest'); # replace with your key
```

#

## Examples

```javascript
te.getHistoricalData(country = 'mexico', indicator = 'gdp').then(function(data){
  console.log(data)       
});
```

```javascript
te.getCalendar().then(function(data){
    console.log(data)       
});
```

```javascript
te.getEarnings(symbol = 'aapl:us', start_date = '2016-01-01', end_date = '2017-12-31')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));
```

#

## More examples

https://github.com/tradingeconomics/tradingeconomics/tree/master/nodejs/Examples

#

## Docker

Please set apikey with your credetials

```javascript
docker run --rm -it --init --name te-nodejs -e apikey='guest:guest' tradingeconomics/nodejs:latest sh
```

```javascript
node Calendar/events.js
node Indicators/historical.js
node Markets/marketForecast.js
ls # to view for more examples
```
#

## Documentation
https://docs.tradingeconomics.com/?javascript#introduction

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx



