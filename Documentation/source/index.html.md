---
title: Trading Economics API

language_tabs:
  - python : Python
  - shell : Excel
  - r : R
  - jsonnet : jQuery
  - javascript : NodeJS
  - csharp : C#
  - java : Java
  - php : PHP

toc_footers:
 - <a target = '_blank' href=" https://tradingeconomics.com/contact.aspx?subject=api">Support</a>

search: true
---

# Introduction

The Trading Economics Application Programming Interface (API) provides direct access to 300.000 economic indicators, exchange rates, stock market indexes, government bond yields and commodity prices. It allows you to download millions of rows of historical data, to query our real-time economic calendar and to subscribe to updates. 
Providing several request methods to query our databases, with samples available in different programming languages, it is the best way to export data in XML, CSV or JSON format. 
The API can be used to feed a custom developed application, a public website or just off-the-shelf software like Microsoft Excel. More at <a target = '_blank' href="https://tradingeconomics.com/analytics/api.aspx">Trading Economics</a>.

<blockquote class="lang-specific python">
  <p>You can get Python from: <a target = '_blank' href="https://www.python.org/downloads/">https://www.python.org/downloads/</a>   
    <br>
    We support Python 2.7.
    Then you need to install the tradingeconomics package. You can do so in a variety of ways.    
  </p>
<br>
<p>Install the tradingeconomics package using pip, a package management system used to install and manage software packages written in Python.
   In Windows Command Prompt or Linux bash type:</p>
</blockquote>     
```python
pip install tradingeconomics
```

<blockquote class="lang-specific shell">
<p>
  Download the <a target = '_blank' href=" https://github.com/ieconomics/open-api/raw/master/Excel/All_Releases/ExcelAddInDeploy_latest.msi">Trading Economics Excel Add In</a> installer, launch it and follow the instructions.<br>    
We support Excel 2010, 2013, 2016 (32bit and 64bit). 
</p>
<br>
<p>After installing the Trading Economics Excel Add In click on TE tab and than click on login button and follow instructions.</p>
</blockquote>


<blockquote class="lang-specific r">
<p>You can get R from the official website: <a target = '_blank' href="https://cran.r-project.org/">https://cran.r-project.org/</a>     
Then you need to install the tradingeconomics package. At this moment our package is available to download from the <a target = '_blank' href="https://github.com/ieconomics/open-api/tree/master/R">GitHub</a> repository.    
See below how to install a package that’s sitting on GitHub.</p>
<br>
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

<blockquote class="lang-specific r">
<p>To start using the Trading Economics R package, type in command window:</p>
</blockquote> 
```r
library(tradingeconomics)
```

<blockquote class="lang-specific r">
<p>If you already have an APIkey then type: </p>
</blockquote> 
```r
login('Your_Key:Your_Secret')
```
<blockquote class="lang-specific r">
<p>If you don’t have an APIkey and just want to try a demo of our API:</p>
</blockquote> 
```r
login()
```

<blockquote class="lang-specific python">
<p>To start using the Trading Economics Python package, open the python command line, and type:</p>
</blockquote>
```python
import tradingeconomics as te
```
<blockquote class="lang-specific python">
<p>If you already have an APIkey then type:</p>
</blockquote>
```python
te.login('Your_Key:Your_Secret')
```
<blockquote class="lang-specific python">
<p>If you don’t have an APIkey and just want to try a demo of our API:</p>
</blockquote>
```python
te.login()
```

Before proceeding select your language tab on the right. 

<blockquote class="lang-specific jsonnet">
<p>
  <strong>Multiple Parameters</strong>
   <br>

    <br>      
   Almost all of the Trading Economics WEB API methods support multiple parameters.  
   <br>   
   Whenever a method requires a country name or indicator name to be specified, you can provide more than one of each, separated by commas.
   <br> 
   Here is a practical example:
   <br>
   <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency?c=guest:guest">historical/country/portugal,brazil,russia/indicator/gdp,currency</a> </p>
</blockquote>

<blockquote class="lang-specific javascript">
<p>
  <strong>Multiple Parameters</strong>
   <br>
   
    <br>      
   Almost all of the Trading Economics WEB API methods support multiple parameters.  
   <br>   
   Whenever a method requires a country name or indicator name to be specified, you can provide more than one of each, separated by commas.
   <br> 
   Here is a practical example:
   <br>
   <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency?c=guest:guest">historical/country/portugal,brazil,russia/indicator/gdp,currency</a> </p>
</blockquote>

<blockquote class="lang-specific csharp">
<p>
  <strong>Multiple Parameters</strong>
   <br>
   
    <br>      
   Almost all of the Trading Economics WEB API methods support multiple parameters.  
   <br>   
   Whenever a method requires a country name or indicator name to be specified, you can provide more than one of each, separated by commas.
   <br> 
   Here is a practical example:
   <br>
   <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency?c=guest:guest">historical/country/portugal,brazil,russia/indicator/gdp,currency</a> </p>
</blockquote>

<blockquote class="lang-specific java">
<p>
  <strong>Multiple Parameters</strong>
   <br>
   
    <br>      
   Almost all of the Trading Economics WEB API methods support multiple parameters.  
   <br>   
   Whenever a method requires a country name or indicator name to be specified, you can provide more than one of each, separated by commas.
   <br> 
   Here is a practical example:
   <br>
   <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency?c=guest:guest">historical/country/portugal,brazil,russia/indicator/gdp,currency</a> </p>
</blockquote>

<blockquote class="lang-specific php">
<p>
  <strong>Multiple Parameters</strong>
   <br>
   
    <br>      
   Almost all of the Trading Economics WEB API methods support multiple parameters.  
   <br>   
   Whenever a method requires a country name or indicator name to be specified, you can provide more than one of each, separated by commas.
   <br> 
   Here is a practical example:
   <br>
   <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/portugal,brazil,russia/indicator/gdp,currency?c=guest:guest">historical/country/portugal,brazil,russia/indicator/gdp,currency</a> </p>
</blockquote>

### Data Types  

You can request data in several formats:<br>
  
  * json   
  <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=json">https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=json</a>

  * xml    
  <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=xml">https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=xml</a>

  * csv    
  <a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=csv">https://api.tradingeconomics.com/historical/country/united%20states/indicator/gdp?c=guest:guest&format=csv</a>

### Authentication

The API provides different methods of authorization. Each request made against API must be supplied with authentication credentials.



Authorization parameters must be provided in the URL query or in the Request Reader. 

Using URL auth:    
`curl -i "https://api.tradingeconomics.com/country/united%20states/?client=guest:guest"`    
Using Headers auth:     
`curl -i "https://api.tradingeconomics.com/country/united%20states/" -H "Authorization: Client guest:guest"`

Without APIkeys all requests will return the default sample data.


# Historical
    
<blockquote class="lang-specific r">
<p>For example, to get historical data of imports in United Kingdom type:</p>
</blockquote>  
```r
getHistoricalData(country = 'united kingdom', indicator = 'imports')
```
<blockquote class="lang-specific r">
<p>To get historical data for several countries and indicators:</p>
</blockquote>  
```r
getHistoricalData(country = c('united states','china'), indicator = c('gdp','population'),
                  initDate = '2006-01-01', endDate = '2016-12-31',
                  outType = 'df')
```

<blockquote class="lang-specific python">
<p>In some cases (getCalendarData and getHistoricalData), the start date (initDate) and end date (endDate) of the results can be specified.</p>
</blockquote>  
```python
In [2]: te.getHistoricalData(country = 'united kingdom', indicator = 'gdp', endDate= '2015-01-01')

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
<p> <strong>Note:</strong> Making request for one country and one indicator, without putting country name and indicator name in square brackets, will return pandas.DataFrame type(example above).</p>
</blockquote> 

<blockquote class="lang-specific python">
<p>Putting country name or indicator name in square brackets will return a dictionary type.
For several countries and indicators</p>
</blockquote> 
```python
te.getHistoricalData(country = ['united states', 'china'], indicator = ['exports','imports', 'gdp'], 
                     initDate= '1990-01-01', endDate= '2015-01-01')
```

<blockquote class="lang-specific shell">
<p>Click Historical button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEHistorical( "andorra", "gdp per capita", "2010-01-01", "2017-10-29", "Country,Category,DateTime,Value,Frequency,HistoricalDataSymbol,LastUpdate", B2)
```

```javascript
var http = require('https');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/historical/country/{put country name here}/indicator/{put indicator name here}',
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

```jsonnet
var url = 'https://api.tradingeconomics.com/historical/country/{put country name here}/indicator/{put indicator name here}?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("https://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/historical/country/{put country name here}/indicator/{put indicator name here}");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```

```java
String uri = "https://api.tradingeconomics.com//historical/country/{put country name here}/indicator/{put indicator name here}";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```

```php
<?php
$url = 'https://api.tradingeconomics.com/country';
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
//parse your data to satisfy your needs....
?>
```

Here you can get historical information for specific a country and indicator.
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

### Methods

<span class="methods">

* Specific country and indicator  
<a target = '_blank'  href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    
You can specify only a start date for your historical data    
<a target = '_blank'  href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp/2013-01-01?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}</a>   
or you can specify a start date and end date    
<a target = '_blank'  href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp/2015-01-01/2015-12-31?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

* Multiple indicators for specific country    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp,population?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp,population/2013-01-01?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states/indicator/gdp,population/2015-01-01/2016-12-31?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

* Specific indicator for multiple countries    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp/2013-01-01?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp/2015-01-01/2015-12-31?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

* Multiple indicators for multiple countries    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp,population?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp,population/2015-01-01?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp,population/2016-01-01/2016-12-31?c=guest:guest">/historical/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|     **Country**     |                                                           Country name                                                          |
|     **Category**    |                                                      Indicator Category Name                                                    |
|   **Date Time**     |                                                   Release time and date in UTC                                                  |
|      **Close**      |                                                           Value                                                 |
|    **Frequency**    |                                           Frequency of the indicator                                          |
|**HistoricalDataSymbol**|                               Unique symbol used by TradingEconomics                                                         |
|    **LastUpdate**   |                                            Time when new data was inserted or changed                                           |

# Calendar
   
<blockquote class="lang-specific r">
<p>Shown next is how to get a data frame with information about calendar events for the United Kingdom</p>
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
<blockquote class="lang-specific r">
<p>Shown next is how to get a data frame with information about calendar events for several countries and indicators</p>
</blockquote>       
```r
getCalendarData(country = c('united states','china'), indicator = c('gdp growth rate','inflation rate'),
                initDate = '2006-01-01', endDate = '2016-12-31',
                outType = 'df')
```

<blockquote class="lang-specific python">
<p>To get calendar data for a specific country, in data frame format, run:</p>
</blockquote>    
```python
In [1]: te.getCalendarData(country = 'italy', output_type = 'df')
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
<blockquote class="lang-specific python">
<p>For several countries and indicators, in data frame format, run:</p>
</blockquote>  
```python
te.getCalendarData(country = ['united states', 'china'], category = ['imports','exports'],
                   initDate = '2017-06-07', endDate = '2017-12-31',
                   output_type = 'df')
```
<blockquote class="lang-specific shell">
<p>Click Calendar button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TECalendar( "germany", "services pmi", "2017-03-24", "2017-06-24", "Date,Category,Actual,Previous,Forecast,TEForecast,Importance,LastUpdate", B2)
```

```javascript
var http = require('https');
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

```jsonnet
var url = 'https://api.tradingeconomics.com/calendar?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("https://api.tradingeconomics.com/");
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

```java
String uri = "https://api.tradingeconomics.com//calendar";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```

```php
<?php
$url = 'https://api.tradingeconomics.com/country';
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
?>
```

Here you can get calendar events. 
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

### Methods


<span class="methods">

* All calendar events    
<a target = '_blank' href="https://api.tradingeconomics.com/calendar?c=guest:guest">/calendar</a>

* Filter Calendar Events by date    
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/All/2016-12-02/2016-12-03?c=guest:guest">/calendar/country/All/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

* Calendar events for specific country    
  <a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states?c=guest:guest">/calendar/country/{countries}</a>    
  <a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states/2016-02-01/2016-02-10?c=guest:guest">/calendar/country/{countries}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>    

* Calendar events for a specific indicator category    
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/indicator/inflation rate?c=guest:guest">/calendar/indicator/{indicators}</a>      
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/indicator/inflation rate/2016-03-01/2016-03-03?c=guest:guest">/calendar/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a>

* All calendar events for multiple countries   
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states,china?c=guest:guest">/calendar/country/{countries}</a>     
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states,china/2016-02-10/2016-02-11?c=guest:guest">/calendar/country/{countries}/{yyyy-mm-dd}/{yyyy-mm-dd}</a> 

* Calendar events for a specific country and specific indicator category   
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states/indicator/initial jobless claims?c=guest:guest">/calendar/country/{countries}/indicator/{indicators}</a>     
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/country/united states/indicator/initial jobless claims/2016-12-01/2017-02-25?c=guest:guest">/calendar/country/{countries}/indicator/{indicators}/{yyyy-mm-dd}/{yyyy-mm-dd}</a> 

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|       **Date**      |                                                   Release time and date in UTC                                                  |
|     **Country**     |                                                           Country name                                                          |
|     **Category**    |                                                     Indicator Category Name                                                     |
|      **Event**      |                                                Specific event name in the calendar                                              |
|    **Reference**    |                                           The period for which released data refers to                                          |
|      **Source**     |                                                          Source of data                                                         |
|      **Actual**     |                                                      Latest released value                                                      |
|     **Previous**    |                           Value for the previous period after the revision (if revision is applicable)                          |
|     **Revised**     |               Value reported in the previous period before revision (if there is no revision field remains empty)               |
|     **Forecast**    |                                   Average forecast among a representative group of economists                                   |
|    **TEForecast**   |                                                        TE own projections                                                       |
|       **URL**       |                                               Indicator Hyperlink at Trading Economics                                          |
|    **Importance**   |                                                   1 = low, 2 = medium, 3 = high                                                 |
|    **LastUpdate**   |                                            Time when new data was inserted or changed                                           |

# Indicators

<blockquote class="lang-specific r">
<p>For example, next code will provide information in data frame format about a number of companies in Italy that got bankrupt </p>
</blockquote>   
```r
getIndicatorData(country = 'italy', indicator = 'bankruptcies', outType = 'df')

    Country     Category              Title LatestValue     LatestValueDate Source      Unit                 URL CategoryGroup Frequency HistoricalDataSymbol PreviousValue   PreviousValueDate
  1   Italy Bankruptcies Italy Bankruptcies        3600 2016-03-31T00:00:00 Cerved Companies /italy/bankruptcies      Business Quarterly             ITALYBAN          4100 2015-12-31T00:00:00
```
<blockquote class="lang-specific r">
<p>To get several countries and indicators </p>
</blockquote>   
```r
getIndicatorData(country = c('united states','china'), indicator = c('gdp','inflation rate'), outType = 'df')
```

<blockquote class="lang-specific python">
<p>To get List of Indicators by Country: </p>
</blockquote>
```python
te.getIndicatorData(country = ['united states', 'china'])
```
<blockquote class="lang-specific python">
<p>To get Country/Indicator pair: </p>
</blockquote>
```python
te.getIndicatorData(country = 'united states', indicators = 'gdp')
```
<blockquote class="lang-specific python">
<p>To get Several Countries and Indicators: </p>
</blockquote>
```python
te.getIndicatorData(country = ['united states', 'china'], indicators = ['gdp', 'population'])
```

<blockquote class="lang-specific shell">
<p>Click Indicators button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEIndicators( "united states", "bankruptcies", "Title,LatestValue,LatestValueDate,Source,Unit,CategoryGroup,Frequency,PreviousValue,PreviousValueDate", B2)
```
```javascript
var http = require('https');
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

```jsonnet
var url = 'https://api.tradingeconomics.com/indicators?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("https://api.tradingeconomics.com/");
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

```java
String uri = "https://api.tradingeconomics.com//indicators";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```

```php
<?php
$url = 'https://api.tradingeconomics.com/country';
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
?>
```

Here you can get a list of all indicators, indicators by country or country-indicator pair.
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

### Methods


<span class="methods">

* List of all indicators  
<a target = '_blank' href="https://api.tradingeconomics.com/indicators?c=guest:guest">/indicators</a>

* List of indicators by country    
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states?c=guest:guest">/country/{country}</a> 

* List of indicators with multiple countries        
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states,china?c=guest:guest">/country/{countries}</a>

* Country/Indicator pair    
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states/gdp?c=guest:guest">/country/{country}/{indicator}</a>    

* Country/Indicator pairs with multiple indicators    
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states/gdp,population?c=guest:guest">/country/{country}/{indicators}</a>

* Several countries and indicators    
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states,china/gdp,population?c=guest:guest">/country/{countries}/{indicators}</a>    

* Specific indicator for all countries    
<a target = '_blank' href="https://api.tradingeconomics.com/country/all/gdp?c=guest:guest">/country/all/{indicator}</a>

* Credit Rating of the specific country    
<a target = '_blank' href="http://api.tradingeconomics.com/ratings/united%20states?c=guest:guest&f=json">/ratings/{country}</a>

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|     **Country**     |                                                           Country name                                                          |
|     **Category**    |                                                     Indicator Category Name                                                     |
|      **Title**      |                                                 Combination of country/category                                                 |
|      **Source**     |                                                          Source of data                                                         |
|    **Frequency**    |                                           Frequency of the indicator                                                            |
|       **URL**       |                                       Indicator Hyperlink at Trading Economicse                                                 |
|**HistoricalDataSymbol**|                               Unique symbol used by TradingEconomics                                                         |



# Forecast

<blockquote class="lang-specific r">
<p>Next code will provide a list with forecasted values of all indicators of United States </p>
</blockquote> 
```r
getForecastData(country ='united states')
``` 

<blockquote class="lang-specific r">
<p>To get data in data frame format type:</p>
</blockquote> 
```r
getForecastData(country ='united states', outType = 'df')
```  
<blockquote class="lang-specific r">
<p>To get data in data frame format type for several countries and indicators:</p>
</blockquote> 
```r
getForecastData(country =c('united states','china'), indicator = c('gdp','inflation rate'), outType = 'df')
```  


<blockquote class="lang-specific python">
<p>Forecasted values for specific a country, in this case United States. </p>
</blockquote>
```python
te.getForecastData(country = 'united states', output_type = 'df')
```
<blockquote class="lang-specific python">
<p>Forecasted values for several countries and indicators. </p>
</blockquote>
```python
te.getForecastData(country = ['united states', 'china'], indicator = ['gdp', 'population'], output_type = 'df')
```

<blockquote class="lang-specific shell">
<p>Click Forecasts button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEForecasts( "united states", "gdp", "Country,Category,LatestValue,LatestValueDate,YearEnd,YearEnd2,q1,q1_date,q4,q4_date", B2)
```

```javascript
var http = require('https');
var headers = {
    'Accept': 'Application/xml',
    'Authorization': 'OAuth2 YOUR_TOKEN_VALUE'
};
var buffer = '';
var options = {
    host: 'api.tradingeconomics.com',
    port: 80,
    path: '/forecast/country/{put country name here}',
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

```jsonnet
var url = 'https://api.tradingeconomics.com/forecast/country/{put country name here}?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("https://api.tradingeconomics.com/");
    client.DefaultRequestHeaders.Clear();
    //ADD Acept Header to tell the server what data type you want
    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/xml"));
    //ADD Authorization
    AuthenticationHeaderValue auth = new AuthenticationHeaderValue("OAuth2", "YOUR_TOKEN");
    client.DefaultRequestHeaders.Authorization = auth;
    //SET Parameters
    HttpResponseMessage response = await client.GetAsync("/forecast/country/{put country name here}");
    if (response.IsSuccessStatusCode)
    {
        //Your custom response parser code
    }
}
```

```java
String uri = "https://api.tradingeconomics.com//forecast/country/{put country name here}";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```

```php
<?php
$url = 'https://api.tradingeconomics.com/country';
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
//parse your data to satisfy your needs....
?>
```

Here you can get forecast values by country, by indicator, by country and indicator.
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

### Methods

<span class="methods">

* Specific country  
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/country/united states?c=guest:guest">/forecast/country/{country}</a>   

* Multiple countries  
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/country/united states,china?c=guest:guest">/forecast/country/{countries}</a>

* Specific indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/indicator/gdp?c=guest:guest">/forecast/indicator/{indicator}</a>    

* Multiple indicators    
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/indicator/gdp,population?c=guest:guest">/forecast/indicator/{indicators}</a>

* Specific country and indicator  
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/country/united states/indicator/gdp?c=guest:guest">/forecast/country/{country}/indicator/{indicator}</a>    

* Multiple countries and indicators    
<a target = '_blank' href="https://api.tradingeconomics.com/forecast/country/united states,china/indicator/gdp,population?c=guest:guest">/forecast/country/{countries}/indicator/{indicators}</a>  

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|     **Category**    |                                                    Indicator Category Name                                                      |
|      **Title**      |                                                Combination of country/category                                                  |
|   **ForecastDate**  |                                                 Date when forecasting was done                                                  |
|  **ForecastValue**  |                                                 Forcastvalue for the ForecastDate                                               |
|  **ForecastValue1** |                                             Forecast value for year end after q4_date                                           |
|  **ForecastValue2** |                                          Forecast value for year end after ForecastValue1                                       |
|  **ForecastValue3** |                                          Forecast value for year end after ForecastValue2                                       |
| **ForecastValue1Q** |                                               Forecast value for the date in d1_date                                            |
| **ForecastValue2Q** |                                               Forecast value for the date in d2_date                                            |
| **ForecastValue3Q** |                                               Forecast value for the date in d3_date                                            |
| **ForecastValue4Q** |                                               Forecast value for the date in d4_date                                            |
|   **LatestValue**   |                                                      Last released value                                                        |
| **LatestValueDate** |                                                Date of the last released value                                                  |
|     **q1_date**     |                                                 1 quarter ahead release date                                                    |
|     **q2_date**     |                                                 2 quarters ahead release date                                                   |
|     **q3_date**     |                                                 3 quarters ahead release date                                                   |
|     **q4_date**     |                                                 4 quarters ahead release date                                                   |
|    **Frequency**    |                                                  Frequency of the indicator                                                     |
|**HistoricalDataSymbol**|                                         Unique symbol used by TradingEconomics                                               |


# Markets
   
<blockquote class="lang-specific r">
<p>To get information about commodities in data frame format type:</p>
</blockquote>   
```r
getMarketsData(marketsField = 'commodities', outType = 'df')
``` 

<blockquote class="lang-specific python">
<p>To get stock market index data:</p>
</blockquote>
```python
te.getMarketsData(marketsField = 'index', output_type = 'df')
```

<blockquote class="lang-specific shell">
<p>Click Markets button on TE ribbon and then follow the instructions in the dialog box.    
Or type in any empty cell:</p>
</blockquote>
```shell
=TEMarkets( "currency", "Symbol,Name,Date,Last,Importance,DailyChange,DailyPercentChange,WeeklyChange,WeeklyPercentChange,YTDChange,YTDPercentChange,yesterday,lastWeek,startYear", B2)
```

```javascript
var http = require('https');
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

```jsonnet
var url = 'https://api.tradingeconomics.com/markets/commodities?c=guest:guest';
$.ajax({
        url: url,
        type: "GET",
        dataType: 'json'
}).done(function (data) {
    console.log(data);
});
```

```csharp
using (var client = new HttpClient())
{
    client.BaseAddress = new Uri("https://api.tradingeconomics.com/");
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

```java
String uri = "https://api.tradingeconomics.com//markets/commodities";
URL url = new URL(uri);
HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");
InputStream xml = connection.getInputStream();
```

```php
<?php
$url = 'https://api.tradingeconomics.com/country';
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
?>
```

Here you can get a list of available commodities, currencies, indexes or bonds and their latest values. 
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.     
**Please consider that all market-related methods are beta and under heavy development.**

### Snapshot of latest quotes

<span class="methods">

* Commodities   
<a target = '_blank' href="https://api.tradingeconomics.com/markets/commodities?c=guest:guest">/markets/commodities</a>

* Major Currencies     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/currency?c=guest:guest">/markets/currency</a> 

* Currency Crosses    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/currency?c=guest:guest&cross=EUR">/markets/currency?cross=eur</a>

* Stock Market Indexes   
<a target = '_blank' href="https://api.tradingeconomics.com/markets/index?c=guest:guest">/markets/index</a>

* Government Bonds    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/bonds?c=guest:guest">/markets/bonds</a>

* Individual Market (stock, index, currency, commodity or bond)    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest">/markets/symbol/{symbol}</a>

* Multiple Markets   
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us,indu:ind?c=guest:guest">/markets/symbol/{symbols}</a>

### Historical  

* Historical markets data by market    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest">/markets/historical/{symbol}</a>

* Historical markets data for multiple markets    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us,indu:ind?c=guest:guest">/markets/historical/{symbols}</a>

* Filter historical markets data by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest&d1=2017-08-01">/markets/historical/{symbol}?d1=yyyy-mm-dd</a>

* Filter historical markets data by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest&d1=2017-08-01&d2=2017-08-08">/markets/historical/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>

### Intraday

* Intraday prices for a single market     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest">/markets/intraday/{symbol}</a>

* Filter intraday prices by date and hour    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest&d1=2017-08-10%2015:30">/markets/intraday/{symbol}?d1=yyyy-mm-dd hh:mm</a>

* Filter intraday prices by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest&d1=2017-08-01&d2=2017-08-08">/markets/intraday/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>   

### Market Lists

* A snapshot of latest peers prices by market    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/peers/aapl:us?c=guest:guest">/markets/peers/{symbol}</a>

* Stock Market Index Components     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/components/psi20:ind?c=guest:guest">/markets/components/{symbol}</a>

### Search
* Search method    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/search/united%20states?c=guest:guest">/markets/search/{term}</a>

### JSON CSV XML
For all methods listed above, you can get data in next formats:

* JSON        
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=json">/markets/symbol/{symbol}?c=guest:guest&f=json</a>    

* CSV    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=csv">/markets/symbol/{symbol}?c=guest:guest&f=csv</a>

* XML     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=xml">/markets/symbol/{symbol}?c=guest:guest&f=xml</a>

</span> 

### Response Fields

|                 |                                                          |
|:----------------|:---------------------------------------------------------|
|     **Name**    | Commodity name                                           |
|   **Country**   | Country field of a commodity if always "Commodity"       |
|     **Date**    | Release time and date in UTC                             |
|     **Last**    | Latest value available                                   |
|    **Group**    | Group of commodity                                       |
|    **Symbol**   | Unique symbol used by TradingEconomics                   |
| **LastUpdate**  | Time when new data was inserted or changed               |

# Earnings

* Default earnings calendar     
<a target = '_blank' href="https://api.tradingeconomics.com/earnings?c=guest:guest">/earnings</a>    

* Filter earnings calendar by date    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings?c=guest:guest&d1=2017-01-01">/earnings?d1=yyyy-mm-dd</a>    

* Filter earnings calendar by market and date   
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/symbol/aapl:us?c=guest:guest&d1=2017-01-01">/earnings/symbol/{symbol}?d1=yyyy-mm-dd</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/symbol/msft:us?c=guest:guest&d1=2016-01-01&d2=2017-12-31">/earnings/symbol/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>    

* Filter earnings calendar by country    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/country/united%20states?c=guest:guest">/earnings/country/{country}</a> 

### Response Fields

|                     |                                                             |
|:--------------------|:---------------------------------------------------------   |
|     **Date**        | Release time and date in UTC                                |
|    **Symbol**       | Unique symbol used by TradingEconomics                      |
|     **Name**        | Company name                                                |
|   **Actual**        | Earnings per share                                          |
|  **Forecast**       | Average forecast among a representative group of analysts   |
|  **FiscalTag**      | Fiscal year and quarter                                     |
|**FiscalReference**  | Fiscal year and quarter in different format                 |
|**CalendarReference**| Calendar quarter for the release                            |
|   **Country**       | Country                                                     |
|  **Currency**       | Currency                                                    |
| **LastUpdate**      | Time when new data was inserted or changed                  |

# Streaming

<blockquote class="lang-specific python">
<p>
 Copy this code and execute
</p>
</blockquote>
```python
  import tradingeconomics as te
  import json

  te.login('guest:guest')

  def on_message(ws, message):
    print json.loads(message)
    #Store data to the DB
    
  te.subscribe('EURUSD')
  te.run(on_message)
```

<blockquote class="lang-specific javascript">
<p>In Windows Command Prompt or Linux bash execute next steps: <br>  
    Step 1 - Clone repository</p>
</blockquote>
```javascript
git clone https://github.com/ieconomics/open-api.git
```
<blockquote class="lang-specific javascript">
<p>Step 2</p>
</blockquote>
```javascript
cd open-api/stream/nodejs
```
<blockquote class="lang-specific javascript">
<p>Step 3 - Install dependencies</p>
</blockquote>
```javascript
npm install
```
<blockquote class="lang-specific javascript">
<p>Step 4 - In app.js file, set-up your client key/secret</p>
</blockquote>
```javascript
Client = new te_client({
  url: 'ws://stream.tradingeconomics.com/',
  key: 'API_CLIENT_KEY', // <--
  secret: 'API_CLIENT_SECRET' // <--
  //reconnect: true
});
```
<blockquote class="lang-specific javascript">
<p>Step 5 - Run it</p>
</blockquote>
```javascript
node app.js
```
<blockquote class="lang-specific javascript">
<p><a target = '_blank' href="https://github.com/ieconomics/open-api/tree/master/stream/nodejs">Check here for the complete sample code.</a></p>
</blockquote>

The Trading Economics API streaming endpoint can be used to receive live calendar releases and market data utilizing a persistent web socket connection. Streaming data from the API consists of making an Authorization request and leaving the socket open to continually receive data. You can authorize using your API client credentials (key/secret). Then you will be able to subscribe to 1 or more of our streaming channels. 

**Streaming Endpoint**    
`ws://stream.tradingeconomics.com/`

**Connecting to Stream**    
Our data is Streamed using <a target = '_blank' href="https://en.wikipedia.org/wiki/WebSocket">websocket protocol</a>. Meaning you can use programming language of your choice, as long as it supports websockets.

**Opening the connection:**    
Only Authorized users may establish a persistent real time connection with Trading Economics API Stream. In order to do so, you have to start a handshaking process. On the handshake, you have to use client key/secret in order to Authorize. These credentials must be added to the connection query:

**Client key/secret**    
`ws://stream.tradingeconomics.com/?client=YOUR_CLIENT_KEY:YOUR_CLIENT_SECRET`

**Subscribe to a Channel**    
After establishing the connection, you are able to subscribe to one or more topics. In order to subscribe to a channel, you must send a message to the stream server passing the topic name as the argument.    
Our streaming service provides live data on Economic Data, Markets and Commodities.

**Subscribe to Calendar Events:**  
`'{"topic": "subscribe", "to": "calendar"}'` 

**Response fields for the calendar subscription:**

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|       **date**      |                                                   Release time and date in UTC                                                  |
|     **country**     |                                                           Country name                                                          |
|     **category**    |                                                     Indicator Category Name                                                     |
|      **event**      |                                                Specific event name in the calendar                                              |
|    **reference**    |                                           The period for which released data refers to                                          |
|      **source**     |                                                          Source of data                                                         |
|      **actual**     |                                                      Latest released value                                                      |
|     **previous**    |                           Value for the previous period after the revision (if revision is applicable)                          |
|     **forecast**    |                                   Average forecast among a representative group of economists                                   |
|    **teforecast**   |                                                        TE own projections                                                       |
|    **importance**   |                                                   1 = low, 2 = medium, 3 = high                                                 |

**Subscribe to Markets in Bulk:**      
`'{"topic": "subscribe", "to": "currencies"}'    
'{"topic": "subscribe", "to": "indexes"}'    
'{"topic": "subscribe", "to": "commodities"}'    
'{"topic": "subscribe", "to": "bonds"}'` 

**Subscribe to Individual Markets:**    
`'{"topic": "subscribe", "to": "EURUSD"}'    
'{"topic": "subscribe", "to": "DXY"}'    
'{"topic": "subscribe", "to": "INDU"}'    
'{"topic": "subscribe", "to": "XAUUSD:CUR"}'   
'{"topic": "subscribe", "to": "AAPL:US"}' `     
Plus any indicator listed at Trading Economics.

**Response fields for the markets subscription:**

|                 |                                                                                                                                 |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------|
|      **s**      | symbol                                                                                                                          |
|     **bid**     | latest market bid price                                                                                                         |
|     **ask**     | latest maket ask price                                                                                                          |
|    **price**    | latest market price                                                                                                             |
|     **dt**      | timestamp of last market price (epoch)                                                                                          |
|    **state**    | market state (open/close)                                                                                                       |
|     **type**    | type of market (currency/indexes/commodity)                                                                                     |
|    **dhigh**    | daily high                                                                                                                      |
|    **dlow**     | daily low                                                                                                                       |
|    **pch**      | percentage change                                                                                                               |
|    **nch**      | net change                                                                                                                      |

**Check how to use it with** <a href="https://ieconomics.github.io/open-api/?python#streaming">Python</a> **or** <a href="https://ieconomics.github.io/open-api/?javascript#streaming">NodeJS (JavaScript)</a>

For a detailed list of available live data please <a target = '_blank' href="https://tradingeconomics.com/contact.aspx?subject=Stream%20list">contact us</a>






# News

Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

### Latest news

<span class="methods">

* Get latest news of data    
<a target = '_blank' href="https://api.tradingeconomics.com/news?c=guest:guest">/news</a>

* Get news of data by country   
<a target = '_blank' href="https://api.tradingeconomics.com/news/country/united%20states?c=guest:guest">/news/country/{countries}</a>

* Get news of data by indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/news/indicator/inflation%20rate?c=guest:guest">/news/indicator/{indicators}</a>

* Get news of data by country and indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/news/country/united%20states/inflation%20rate?c=guest:guest">/news/country/{countries}/{indicators}</a>

</span> 

### Latest articles

<span class="methods">

* Latest articles    
<a target = '_blank' href="https://api.tradingeconomics.com/articles?c=guest:guest">/articles</a>

* Paginate over articles   
<a target = '_blank' href="https://api.tradingeconomics.com/articles?c=guest:guest&skip=10&lim=10">/articles?c=guest:guest&skip=X&lim=Y</a>

* Latest articles by country    
<a target = '_blank' href="https://api.tradingeconomics.com/articles/country/united%20states?c=guest:guest">/articles/country/{countries}</a>

* Articles by country within DateTime interval    
<a target = '_blank' href="https://api.tradingeconomics.com/articles/country/united%20states/from/2016-12-01/2016-12-31?c=guest:guest">/articles/country/{countries}/from/{yyyy-mm-dd}/{yyyy-mm-dd}</a>    

* Latest articles by indicator   
<a target = '_blank' href="https://api.tradingeconomics.com/articles/indicator/interest%20rate?c=guest:guest">/articles/indicator/{indicators}</a>

* Latest articles by country and indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/articles/country/united%20states/interest%20rate?c=guest:guest">/articles/country/{countries}/{indicators}</a>    

* Article by ID    
<a target = '_blank' href="https://api.tradingeconomics.com/articles/id/20580?c=guest:guest">/articles/id/<article_id></article></a>

</span> 

### Response Fields

|                 |                                                                                                                                 |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------|
|      **Id**     | Unique ID                                                                                                                       |
|    **Title**    | Title of the event                                                                                                              |
| **Description** | Description of the event                                                                                                        |
|     **Date**    | Release time and date in UTC                                                                                                    |
|   **Country**   | Country name                                                                                                                    |
|   **Category**  | Indicator Category Name                                                                                                         |
|    **Symbol**   | Unique symbol used by TradingEconomics                                                                                          |
|     **Url**     | Indicator Hyperlink at Trading Economics                                                                                        |


# Excel



Download the <a target = '_blank' href=" https://github.com/ieconomics/open-api/raw/master/Excel/All_Releases/ExcelAddInDeploy_latest.msi">Trading Economics Excel Add In</a> installer, launch it and follow the instructions. We support Excel 2010, 2013, 2016 (32 and 64bit). After installing the Trading Economics Excel Add In click on TE tab and then click on login button, insert the access key and hit Submit button.    
<a target = '_blank' href="https://github.com/ieconomics/open-api/raw/master/Documentation/source/Trading%20Economics%20Excel%20Add%20On%20Tutorial%202017.pdf">Click here to download detailed user guide.</a>


# WorldBank Data


Main categories:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldbank/categories?c=guest:guest">http://api.tradingeconomics.com/worldbank/categories?c=guest:guest</a>


Filtering by the main categories:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/category/Education?c=guest:guest">http://api.tradingeconomics.com/worldBank/category/Education?c=guest:guest</a>

this method has pagination, because there are too many results, each page has 200 results, we can go through the pages like so:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/category/Education/2?c=guest:guest">http://api.tradingeconomics.com/worldBank/category/Education/2?c=guest:guest</a>


Using the indicators from the previous methods we can get a snap:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=fr.inr.rinr">http://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=fr.inr.rinr</a>

we can also just get for a country for example:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=usa.fr.inr.rinr">http://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=usa.fr.inr.rinr</a>


Another way to use the snap is by the trading economics url:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldbank/indicator?c=guest:guest&url=/united-states/real-interest-rate-percent-wb-data.html">http://api.tradingeconomics.com/worldbank/indicator?c=guest:guest&url=/united-states/real-interest-rate-percent-wb-data.html</a>


Filtering by country (also with pagination):    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/country/portugal/2?c=guest:guest">http://api.tradingeconomics.com/worldBank/country/portugal/2?c=guest:guest</a>


Finally, the historical can be retrieved with the symbol/ticker/indicator:    
<a target = '_blank' href="http://api.tradingeconomics.com/worldBank/historical?c=guest:guest&s=usa.fr.inr.rinr">http://api.tradingeconomics.com/worldBank/historical?c=guest:guest&s=usa.fr.inr.rinr</a>

All of this can be formatted to json by appending "&format=json"