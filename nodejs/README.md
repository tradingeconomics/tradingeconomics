## Description
Node package on how to access Trading Economics API data.

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

 - Then you have to login, if you don't have a client key just live it blank and a sample of data will be provided.

```javascript
te.login();
```

 - Use the functions to get data from Markets, Indicators, Economic Calendar, Forecasts, World Bank, Comtrade, Federal Reserve, and even the latest news.
 
*Example of World Bank data on Education:* 

```javascript
data = te.getWorldBank(category = 'Education').then(function(data){
    console.log(data) 
})
```

 - In this case the output will be 

 ```javascript
 [ { series_code: '1.1_YOUTH.LITERACY.RATE',
    series_name: 'Literacy rate, youth total (% of people ages 15-24) UNESCO',
    category: 'Education',
    sub_category: null,
    sub_category2: null,
    sub_category3: null,
    title: 'Literacy rate, youth total (% of people ages 15-24) UNESCO',
    long_definition:
     'The number of persons aged 15 to 24 years who can both read and write with understanding a short simple statement on their everyday life, divided by the population in that age group. Generally, ‘literacy’ also encompasses ‘numeracy’, the ability to make simple arit
hmetic calculations. For further country-specific definition details please refer to the source of information, the UNESCO Institute for Statistics (UIS): www.uis.unesco.org',
    short_definition:
     'The number of persons aged 15 to 24 years who can both read and write with understanding a short simple statement on their everyday life, divided by the population in that age group. Generally, ‘literacy’ also encompasses ‘numeracy’, the ability to make simple arit
hmetic calculations. For further country-specific definition details please refer to the source of information, the UNESCO Institute for Statistics (UIS): www.uis.unesco.org',
    source: 'Global Partnership for Education',
    general_comments: null,
    aggregation_method: null,
    URL:
     '/country-list/literacy-rate-youth-total-percent-of-people-ages-15-24-unesco-wb-data.html                                                                                                                                                                  ',
    organization:
     'Source of information: UNESCO Institute for Statistics (www.uis.unesco.org). Please refer to its website for country-specific details on the specific national data sources and method used. ',
    unit: '%',
    verbose_unit: '%',
    last_update: '2017-10-16T08:40:06.803' },
````