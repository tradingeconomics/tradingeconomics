
### TradingEconomics - NodeJS

The Trading Economics API provides you with direct access to 300.000 economic indicators, exchange rates, stock market indexes, government bond yields and commodity prices. Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel.

#

**NodeJs Package and Examples**

To integrate the Trading Economics API with NodeJs, use the official npm package and explore examples in the tradingeconomics-js repository.

- GitHub: https://github.com/tradingeconomics/tradingeconomics-js
- npm: https://www.npmjs.com/package/tradingeconomics

#


In this example app, we'll utilise the Trading Economics API to compare two countries' core inflation rates, employment rates, GDP, and unemployment rates.

Dependecies used in this project are:
<li>Expressjs for building the server</li>
<li>Axios: for sending request</li>
<li>dotenv for storing the API KEY</li>
<li>chart.js for displaying the chart bar to the user.</li>

#
The app has three endpoints
On **"/"** the app send the html file (the UI)
On **"/api/v1/allcontries"** the app send json file of all supported country in tranding Economics
On **"/api/v1/compare?firstCountry=mexico&secondCountry=sweden"**: In this endpoint the first country and
sencond are from the req query params and the endpoint returns the data needed for comparing core inflation rates, employment rates, GDP, and unemployment rates.