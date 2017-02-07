---
title: API TradingEconomics

language_tabs:
  - shell : Excel
  - python : Python
  - r : R
  - jsonnet : jQuery
  - javascript : NodeJS
  - csharp : C#
  - java : JAVA
  - php : PHP


search: true

toc_footers:
  - <a href='http://ueconomics.com/'>UECONOMICS</a>
  - <a href='https://ieconomics.com/'>IECONOMICS</a>
  - <a href='http://www.tradingeconomics.com/alerts/'>ALERTS</a>
---

# Introduction

The Trading Economics Application Programming Interface (API) provides direct access to 300.000 economic indicators, exchange rates, stock market indexes, government bond yields and commodity prices. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. 
Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. 
The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. More at [Trading Economics](http://www.tradingeconomics.com/analytics/api.aspx).
# Installation
**R**

<blockquote class="lang-specific r">
<p>Install the devtools package. You can do this from CRAN. Invoke R and then type:</p>
</blockquote> 
```r
install.packages("devtools")
```

<blockquote class="lang-specific r">
<p>Load the devtools package.</p>
</blockquote> 
```r
library(devtools)
```

<blockquote class="lang-specific r">
<p>Install the tradingeconomics package.</p>
</blockquote> 
```r
install_github("ieconomics/open-api/R/tradingeconomics")
```

<blockquote class="lang-specific python">
<p>Install the tradingeconomics package using pip, a package management system used to install and manage software packages written in Python.
   In Windows Command Prompt or Linux bash type:</p>
</blockquote> 
```python
pip install tradingeconomics
```

<blockquote class="lang-specific python">
<p>Install using easy_install:</p>
</blockquote> 
```python
easy_install https://pypi.python.org/packages/67/ef/fce59528d5f772c8ecf8ae21f119a976c3c7aa740646a4eb4d536b3e4442/tradingeconomics-0.2.4.zip
```

<blockquote class="lang-specific python">
<p>Install directly from GitHub by downloading <https://github.com/ieconomics/open-api/archive/v0.2.4.zip> and run:</p>
</blockquote> 
```python
python setup.py install
```

You can get R from official website:    
<https://cran.r-project.org/>

Then you need to install the tradingeconomics package. At this moment our package available to download from [GitHub](https://github.com/ieconomics/open-api/tree/master/R) repository.

How to install a package that’s sitting on GitHub?

**Python**

You can get Python from:    
<https://www.python.org/downloads/>    
We support Python 2.7

Then you need to install the tradingeconomics package. You can do so in a variety of ways.    
See the installation instructions on the right.

**Excel**

Download the [Trading Economics Excel Add In](https://github.com/ieconomics/excel-addin/raw/master/ExcelAddInDeploy.msi) installer, launch it and follow instructions. 

We support Excel 2010, 2013, 2016 (32bit and 64bit). 

# Getting started

```r
  library(tradingeconomics)
  login('users APIkey')
```
<blockquote class="lang-specific r">
<p>If you don't have APIkey just type:</p>
</blockquote> 
```r
  login()
```

```python
  import tradingeconomics as te
  te.login('APIkey')
```
<blockquote class="lang-specific python">
<p>If you don't have APIkey just type:</p>
</blockquote>
```python
  te.login()
```

For **R** and **Python** in command window type:

<blockquote class="lang-specific shell">
<p>Click on TE tab and than click on login button and follow instructions.</p>
</blockquote>
For **Excel**:
<aside class="notice">
Without APIkey data sets will default to returning sample data.
</aside>

# Examples

For **R** results are available in data frame or list format.

For **Python** results are available in different formats, such as : JSON, pandas.DataFrame or dictionary.

<aside class="warning">
<strong>Excel:</strong> To be able to deleate cell/row/column  after getting data first change <strong>"RunAutomatically = 1"</strong> to <strong>"RunAutomatically = 0"</strong> in your formula!!!
</aside>
## Get Forecast Data

<blockquote class="lang-specific r">
<p>Next code will provide a list with forecasted values of all indicators of Portugal </p>
</blockquote> 
  ```r
     getForecastData(country ='portugal')
  ``` 

<blockquote class="lang-specific r">
<p>To get data in data frame format type:</p>
</blockquote> 
  ```r
    getForecastData(country ='portugal', outType = 'df')
  ```  

<blockquote class="lang-specific python">
<p>Forecasted values for specific country, in this case Portugal. </p>
</blockquote>
```python
te.getForecastData(country = 'Portugal', output_type = 'df')
```

<blockquote class="lang-specific shell">
<p>Click Forecasts button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEForecasts( "Andorra", "GDP", "RunAutomatically = 1")
```

```javascript
var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/forecast/country/country_name',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // your code here if you want to use the results !
});
}
  
var req = http.get(options, callback).end();         
```

<blockquote class="lang-specific javascript">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```jsonnet
var url = 'http://api.tradingeconomics.com/forecast/country/country_name?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```
<blockquote class="lang-specific jsonnet">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("http://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/forecast/country/country_name");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```
<blockquote class="lang-specific csharp">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```java
String uri = "http://api.tradingeconomics.com//forecast/country/country_name";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```
<blockquote class="lang-specific java">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```php
$url = 'http://api.tradingeconomics.com/country';
$headers = array(
    "Accept: application/xml",
    "Authorization: OAuth YOUR_TOKEN_VALUE"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
    $data = curl_exec($handle);
curl_close($handle);
//parse your data to satusfy your needs....
```
<blockquote class="lang-specific php">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

Here you can get forecast values by country, by indicator, by country and indicator.

Click [here](http://api.tradingeconomics.com/forecast/country/country_name/indicator/indicator_name?c=guest:guest) and figure out what kind of data you can get. 

## Get Historical Data
    
<blockquote class="lang-specific r">
<p>For example, to get historical data of imports in United Kingdom type:</p>
</blockquote>  
  ```r
    getHistoricalData(country = 'united kingdom', indicator = 'imports')
  ```

<blockquote class="lang-specific python">
<p>In some cases(getCalendarData and getHistoricalData), the start date(initDate) and end date(endDate) of the results can be specified.</p>
</blockquote>  
```python
In [2]: te.getHistoricalData(country = 'United Kingdom', indicator = 'GDP', endDate= '2015-01-01')

Out[2]: 
                  0
2006-12-31  2588.08
2007-12-31  2969.73
2008-12-31  2793.38
2009-12-31  2314.58
2010-12-31  2403.50
2011-12-31  2594.90
2012-12-31  2630.47
2013-12-31  2712.30
2014-12-31  2990.20
```
<blockquote class="lang-specific python">
<p>**Note:** Making request for one country and one indicator, without putting country name and indicator name in square brackets, the result, by default, will be of the *pandas.DataFrame* type(example above).</p>
</blockquote> 

<blockquote class="lang-specific python">
<p>Putting country name or indicator name in square brackets the result, by default, will be of the *dictionary* type.
For several countries and indicators</p>
</blockquote> 
```python
te.getHistoricalData(country = ['United States', 'Germany'], indicator = ['Exports','Imports', 'GDP'], initDate= '1990-01-01', endDate= '2015-01-01')
```

<blockquote class="lang-specific shell">
<p>Click Historical button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEHistorical( "Andorra", "GDP Per Capita", "2010-10-04", "2017-10-29", "RunAutomatically = 1")
```

```javascript
var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/historical/country/country_name/indicator/indicator_name',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // your code here if you want to use the results !
});
}
  
var req = http.get(options, callback).end();         
```

<blockquote class="lang-specific javascript">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```jsonnet
var url = 'http://api.tradingeconomics.com/historical/country/country_name/indicator/indicator_name?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```
<blockquote class="lang-specific jsonnet">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("http://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/historical/country/country_name/indicator/indicator_name");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```
<blockquote class="lang-specific csharp">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```java
String uri = "http://api.tradingeconomics.com//historical/country/country_name/indicator/indicator_name";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```
<blockquote class="lang-specific java">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```php
$url = 'http://api.tradingeconomics.com/country';
$headers = array(
    "Accept: application/xml",
    "Authorization: OAuth YOUR_TOKEN_VALUE"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
    $data = curl_exec($handle);
curl_close($handle);
//parse your data to satusfy your needs....
```
<blockquote class="lang-specific php">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

Here you can get historical information for specific country and indicator.

Click [here](http://api.tradingeconomics.com/historical/country/country_name/indicator/indicator_name?c=guest:guest) and figure out what kind of data you can get. 

## Get Indicator Data  

<blockquote class="lang-specific r">
<p>For example, next code will provide information in data frame format about a number of companies in Italy that got bankrupt </p>
</blockquote>   
```r
  getIndicatorData(country = 'italy', indicator = 'Bancruptcies', outType = 'df')

    Country     Category              Title LatestValue     LatestValueDate Source      Unit                 URL CategoryGroup Frequency HistoricalDataSymbol PreviousValue   PreviousValueDate
  1   Italy Bankruptcies Italy Bankruptcies        3600 2016-03-31T00:00:00 Cerved Companies /italy/bankruptcies      Business Quarterly             ITALYBAN          4100 2015-12-31T00:00:00
```

<blockquote class="lang-specific python">
<p>Next code will give you Country/Indicator pair. </p>
</blockquote>
```python
te.getIndicatorData(country = 'United Kingdom', indicators = 'Imports')
```

<blockquote class="lang-specific shell">
<p>Click Indicators button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEIndicators( "United States", "Bankruptcies", "RunAutomatically = 1")
```
```javascript
var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/indicators',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // your code here if you want to use the results !
});
}
  
var req = http.get(options, callback).end();       
```

<blockquote class="lang-specific javascript">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```jsonnet
var url = 'http://api.tradingeconomics.com/indicators?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```
<blockquote class="lang-specific jsonnet">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("http://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/indicators");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```
<blockquote class="lang-specific csharp">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```java
String uri = "http://api.tradingeconomics.com//indicators";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```
<blockquote class="lang-specific java">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```php
$url = 'http://api.tradingeconomics.com/country';
$headers = array(
    "Accept: application/xml",
    "Authorization: OAuth YOUR_TOKEN_VALUE"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
    $data = curl_exec($handle);
curl_close($handle);
//parse your data to satusfy your needs....
```
<blockquote class="lang-specific php">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

Here you can get a list of all indicators, indicators by country or country-indicator pair.

Click [here](http://api.tradingeconomics.com/country/country_name/indicator_name?c=guest:guest) and figure out what kind of data you can get. 

## Get Markets Data  
   
<blockquote class="lang-specific r">
<p>To get information about commodities in data frame format type:</p>
</blockquote>   
  ```r
    getMarketsData(marketsField = 'commodity', outType = 'df')
  ``` 

<blockquote class="lang-specific python">
<p>To get stock market index just type:</p>
</blockquote>
```python
te.getMarketsData(marketsField = 'index', output_type = 'df')
```

<blockquote class="lang-specific shell">
<p>Click Markets button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEMarkets( "currency", "RunAutomatically = 1")
```

```javascript
var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/markets/commodities',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // your code here if you want to use the results !
});
}
  
var req = http.get(options, callback).end();         
```

<blockquote class="lang-specific javascript">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```jsonnet
var url = 'http://api.tradingeconomics.com/markets/commodities?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```
<blockquote class="lang-specific jsonnet">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("http://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/markets/commodities");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```
<blockquote class="lang-specific csharp">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```java
String uri = "http://api.tradingeconomics.com//markets/commodities";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```
<blockquote class="lang-specific java">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```php
$url = 'http://api.tradingeconomics.com/country';
$headers = array(
    "Accept: application/xml",
    "Authorization: OAuth YOUR_TOKEN_VALUE"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
    $data = curl_exec($handle);
curl_close($handle);
//parse your data to satusfy your needs....
```
<blockquote class="lang-specific php">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

Here you can get a list of available commodities, currencies, indexes or bonds and their latest values. 

Click [here](http://api.tradingeconomics.com/markets/commodities?c=guest:guest) and figure out what kind of data you can get. 

## Get Calendar Data  
   
<blockquote class="lang-specific r">
<p>Next code will provide a data frame with information about calendar events for United Kingdom  </p>
</blockquote>       
```r
getCalendarData(country = 'united kingdom', outType = 'df')

                  Date        Country               Category                                 Event Reference Unit                         Source Actual Previous Forecast TEForecast
1  2016-11-23T11:30:00 United Kingdom          Interest Rate                     BoE Forbes Speech                               Bank of England                                    
2  2016-11-23T11:40:00 United Kingdom          Interest Rate                       BoE Rule Speech                               Bank of England                                    
3  2016-11-23T12:30:00 United Kingdom               Calendar Philip Hammond Makes Autumn Statement                                                                                  
4  2016-11-24T09:30:00 United Kingdom               Calendar                BBA Mortgage Approvals       Oct                                               38.3K    38.8K      40.5K
5  2016-11-25T09:30:00 United Kingdom        GDP Growth Rate           GDP Growth Rate QoQ 2nd Est        Q3      Office for National Statistics            0.7%     0.5%       0.5%
6  2016-11-25T09:30:00 United Kingdom GDP Annual Growth Rate           GDP Growth Rate YoY 2nd Est        Q3      Office for National Statistics            2.1%     2.3%       2.3%
7  2016-11-25T09:30:00 United Kingdom               Calendar          Business Investment YoY Prel       Sep                                               -0.8%    -2.1%      -0.3%
8  2016-11-25T09:30:00 United Kingdom               Calendar          Business Investment QoQ Prel       Sep                                                  1%     0.6%       0.4%
9  2016-11-25T11:00:00 United Kingdom               Calendar               CBI Distributive Trades       Nov                                                  21       12         15
10 2016-11-29T09:30:00 United Kingdom               Calendar                      Mortgage Lending       Oct                                               £3.2B                    
11 2016-11-29T09:30:00 United Kingdom               Calendar        Net Lending to Individuals MoM       Oct                                               £4.7B                    
12 2016-11-29T09:30:00 United Kingdom        Consumer Credit                   BoE Consumer Credit       Oct                     Bank of England          £1405M             £ 1800M
13 2016-11-29T09:30:00 United Kingdom     Mortgage Approvals                    Mortgage Approvals       Oct                     Bank of England          62.93K              61.23K
```

<blockquote class="lang-specific python">
<p>To get calendar data for specific country, in data frame format, just type:</p>
</blockquote>    
```python
In [1]: te.getCalendarData(country = 'Italy', output_type = 'df')
Out[1]: 
                  Date Country         Category               Event Reference  \
0  2016-11-18T10:00:00   Italy  Current Account     Current Account       Sep   
1  2016-11-24T10:00:00   Italy      Wage Growth  Wage Inflation YoY       Oct   
2  2016-11-24T10:00:00   Italy      Wage Growth  Wage Inflation MoM       Oct   

  Unit                                    Source  Actual Previous Forecast  \
0                                 Banca D'italia  €2810M   €3282M            
1       National Institute of Statistics (ISTAT)             0.6%            
2       National Institute of Statistics (ISTAT)               0%            

  TEForecast  
0    € 2116M  
1       0.7%  
2       0.1%  
``` 

<blockquote class="lang-specific shell">
<p>Click Calendar button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TECalendar( "Germany", "Services PMI", "2017-02-03", "2017-02-06", "RunAutomatically = 1")
```

```javascript
var http = require('http');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/calendar',
    headers: headers
};
callback = function(response) {
    response.on('data', function (chunk) {
    buffer += chunk;
});
response.on('end', function () {
    // your code here if you want to use the results !
});
}
  
var req = http.get(options, callback).end();
```

<blockquote class="lang-specific javascript">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>


```jsonnet
var url = 'http://api.tradingeconomics.com/calendar?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```
<blockquote class="lang-specific jsonnet">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("http://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/calendar");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```
<blockquote class="lang-specific csharp">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```java
String uri = "http://api.tradingeconomics.com//calendar";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```
<blockquote class="lang-specific java">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

```php
$url = 'http://api.tradingeconomics.com/country';
$headers = array(
    "Accept: application/xml",
    "Authorization: OAuth YOUR_TOKEN_VALUE"
);
$handle = curl_init(); 
    curl_setopt($handle, CURLOPT_URL, $url);
    curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
    
    $data = curl_exec($handle);
curl_close($handle);
//parse your data to satusfy your needs....
```
<blockquote class="lang-specific php">
  <p> 
  &nbsp;You can tell the server which type of data you would like to get, specifying it in your url.<br>
  
  MIME type:<br>
      &nbsp;&nbsp;- application/json - json<br>
      &nbsp;&nbsp;- application/xml - xml<br>
      &nbsp;&nbsp;- text/csv - csv    
  </p>
  <p>
    <strong>Multiple Parameters<br> </strong> 

      &nbsp;Almost all of the Trading Economics WEB API methods supports multiple parameters. <br>
      Whenever a method requires to specify a country name or indicator name, you can provide more than one of each, separated by comma. <br>
      Here is a practical example:<br>
      http://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency
      
  </p>
</blockquote>

Here you can get calendar events. 

Click [here](http://api.tradingeconomics.com/calendar/country/all/yyyy-mm-dd/yyyy-mm-dd2?c=guest:guest) and figure out what kind of data you can get. 
