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
    We support Python 2.7 and Python 3.6.
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
We support Excel 2010, 2013, 2016 (32bit and 64bit) only for Windows. 
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

### Error codes

* 200 - OK    
* 401 - Unauthorized (The user doesn't have an access, client key missing or wrong)      
* 403 - Forbidden (The user hit the maximum limit of downloads or was blocked)    
* 400 - Bad Request (Some error with a request, like a typo, wrong parameter, etc.)    
* 409 - Conflict (Throttle, to many requests per second, beyond the API limit)    

### Notes

* All API calls have a maximum limitation of 10000 rows. This limit can be different depending on your subscription.    
* API calls for Earnings, World Bank, Comtrade and Federal Reserv data have a maximum limitation of 500 rows.


# Indicators

Here you can get a list of all indicators, indicators by country, country-indicator pair and historical information for specific country and indicator.
Click on any method below for a sample. Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.


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
te.getIndicatorData(country=['united states', 'china'], output_type='df')

Output:
           Country         ...             PreviousValueDate
0    United States         ...           2018-04-30T00:00:00
1    United States         ...           2018-06-15T00:00:00
2    United States         ...           2017-12-31T00:00:00
               ...         ...                           ...
314          China         ...           2016-12-31T00:00:00
315  United States         ...           2016-12-31T00:00:00
316  United States         ...           2018-04-30T00:00:00
317  United States         ...           2018-04-30T00:00:00

```
<blockquote class="lang-specific python">
<p>To get Country/Indicator pair: </p>
</blockquote>
```python
te.getIndicatorData(country='united states', indicators='gdp')

Output:
{'United States': 
  {'GDP': 
    [{'LatestValue': 18624.48, 'LatestValueDate': '2016-12-31T00:00:00', 'Source': 'World Bank', 
    'Unit': 'USD Billion', 'CategoryGroup': 'GDP', 'Frequency': 'Yearly', 'PreviousValue': 18120.71, 
    'PreviousValueDate': '2015-12-31T00:00:00'}]
  }
}

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

### Methods


<span class="methods">

* List of all indicators  
<a target = '_blank' href="https://api.tradingeconomics.com/indicators?c=guest:guest">/indicators</a>

* List of indicators by country    
<a target = '_blank' href="https://api.tradingeconomics.com/country/united states?c=guest:guest">/country/{country}</a>

* Specific indicator for all countries    
<a target = '_blank' href="https://api.tradingeconomics.com/country/all/gdp?c=guest:guest">/country/all/{indicator}</a>

</span>

### Response Fields

|                        |                                                  |
|:-----------------------|:-------------------------------------------------|
|     **Country**        |Country name                                      |
|     **Category**       |Category name                                    |
|     **Title**          |Combination of country/category                   |
| **LatestValueDate**    |Date of the last released value                   |
|   **LatestValue**      |Last released value                               |
|      **Source**        |Source of data                                    |
|      **Unit**          |Unit of the value                                 |
|       **URL**          |Hyperlink at Trading Economicse         |
|  **CategoryGroup**     |Category group name                           |
|   **Adjustment**       |-----                        |
|    **Frequency**       |Frequency of the indicator                        |
|**HistoricalDataSymbol**|Unique symbol used by TradingEconomics            |
|   **CreateDate**       |Release time and date in UTC                      |
|  **PreviousValue**     |Previous released value                 |
|**PreviousValueDate**   |Date of the previous released value               |


## Historical

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
In [2]: te.getHistoricalData(country='united kingdom', indicator='gdp', initDate='2015-01-01')

Out[2]: 
                  0
2006-12-31  2588.08
2007-12-31  2969.73
              ...
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
te.getHistoricalData(country=['united states', 'china'], indicator=['exports','imports'], 
                     initDate='1990-01-01', endDate='2015-01-01')

Output:
{'China': 
  {'Exports': 
    [dict_values([
    1990-01-31      28.42
    1990-02-28      32.53
                   ...
    2014-11-30    2116.33
    2014-12-31    2273.72
    Name: 0, Length: 300, dtype: float64])
    ], 
    'Imports': 
    [dict_values([
    1990-01-31      25.70
    1990-02-28      35.30
                   ...
    2014-11-30    1567.79
    2014-12-31    1775.93
    Name: 0, Length: 300, dtype: float64])]
  }, 
  'United States': 
  {'Exports': 
    [dict_values([
    1990-01-31     43315.0
    1990-02-28     43412.0
                    ...
    2014-11-30    197778.0
    2014-12-31    197411.0
    Name: 0, Length: 300, dtype: float64])], 
    'Imports': 
    [dict_values([
    1990-01-31     50769.0
    1990-02-28     48553.0
                    ...
    2014-11-30    237634.0
    2014-12-31    239840.0
    Name: 0, Length: 300, dtype: float64])]
  }
}
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

* Specific indicator for multiple countries    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    

* Multiple indicators for multiple countries    
<a target = '_blank' href="https://api.tradingeconomics.com/historical/country/united states,china/indicator/gdp,population?c=guest:guest">/historical/country/{countries}/indicator/{indicators}</a>    

* Get historical data by ticker   
<a target = '_blank' href="https://api.tradingeconomics.com/historical/ticker/USURTOT/2015-03-01?c=guest:guest">/historical/ticker/{ticker}/{yyyy-mm-dd}</a>  

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|     **Country**     |                                                           Country name                                                          |
|     **Category**    |                                                      Indicator category name                                                    |
|   **Date Time**     |                                                   Release time and date in UTC                                                  |
|      **Close**      |                                                           Value                                                 |
|    **Frequency**    |                                           Frequency of the indicator                                          |
|**HistoricalDataSymbol**|                               Unique symbol used by TradingEconomics                                                         |
|    **LastUpdate**   |                                            Time when new data was inserted or changed                                           |


## Credit Rating

### Methods

<span class="methods">

* Credit Rating of the specific country    
<a target = '_blank' href="https://api.tradingeconomics.com/ratings/united%20states?c=guest:guest">/ratings/{country}</a>    
  * Historical credit rating    
  <a target = '_blank' href="https://api.tradingeconomics.com/ratings/historical/united%20states?c=guest:guest">/ratings/historical/{country}</a>    

* Credit Rating for multiple countries    
<a target = '_blank' href="https://api.tradingeconomics.com/ratings/united%20states,portugal?c=guest:guest">/ratings/{countries}</a>    
  * Historical credit rating    
  <a target = '_blank' href="https://api.tradingeconomics.com/ratings/historical/united%20states,portugal?c=guest:guest">/ratings/historical/{countries}</a>    

</span>

### Response Fields

|                        |                                                  |
|:-----------------------|:-------------------------------------------------|
|       **TE**           |Trading Economics rating                          |
|       **Date**         |Release time and date in UTC                      |
|      **Agency**        |Rating agency                           |
|      **Rating**        |---                           |
|     **Outlook**        |---                           |
|   **TE_Outlook**       |Trading Economics outlook                      |
|       **SP**           |Standard & Poor's rating                        |
|   **SP_Outlook**       |Standard & Poor's outlook           |
|    **Moodys**          |Moody's rating           |
|  **Moodys_Outlook**    |Moody's outlook     |
|    **Fitch**           |Fitch rating       |
|  **Fitch_outlook**     |Fitch outlook      |

## Latest updates

### Methods

<span class="methods">

* Latest updates    
<a target = '_blank' href="https://api.tradingeconomics.com/updates?client=guest:guest">/updates</a>

* Updates since a specific date    
<a target = '_blank' href="https://api.tradingeconomics.com/updates/2018-01-01?client=guest:guest">/updates/{date}</a>

</span>

### Response Fields

|                         |                                           |
|:------------------------|:------------------------------------------|
|**HistoricalDataSymbol** |Unique symbol used by TradingEconomics     |
|**LastUpdate**           |Time when new data was inserted or changed |

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
te.getCalendarData(country='italy', output_type='df')

Output:
  CalendarId                 Date    ...     TEForecast Importance
0     160449  2018-06-28T09:00:00    ...           1.2%          1
1     160450  2018-06-28T09:00:00    ...           0.4%          1
2     160451  2018-06-28T09:00:00    ...           0.3%          2
3     160452  2018-06-28T09:00:00    ...           1.2%          2
4     160693  2018-06-28T09:45:00    ...                         1
5     160694  2018-06-28T09:45:00    ...                         1
6     160832  2018-07-02T07:45:00    ...           53.4          2
7     160837  2018-07-02T08:00:00    ...          10.8%          2
8     160966  2018-07-04T07:45:00    ...           53.6          2
 
``` 
<blockquote class="lang-specific python">
<p>For several countries and indicators, in data frame format, run:</p>
</blockquote>  
```python
te.getCalendarData(country=['united states', 'china'], category=['imports','exports'],
                   initDate='2017-06-07', endDate='2017-12-31',
                   output_type='df')

Output:
   CalendarId                 Date    ...     TEForecast Importance
0      133104  2017-06-08T03:00:00    ...                         3
1      133105  2017-06-08T03:00:00    ...                         3
2      134636  2017-07-06T12:30:00    ...        $191.7B          1
3      134637  2017-07-06T12:30:00    ...        $236.7B          1
4      135063  2017-07-13T03:00:00    ...                         3
5      135064  2017-07-13T03:00:00    ...                         3
6      136267  2017-08-04T12:30:00    ...          $193B          1
7      136268  2017-08-04T12:30:00    ...        $238.9B          1
8      136307  2017-08-08T03:00:00    ...                         3
9      136308  2017-08-08T03:00:00    ...                         3
10     137694  2017-09-06T12:30:00    ...          $195B          1
11     137695  2017-09-06T12:30:00    ...        $239.2B          1
12     137989  2017-09-08T02:00:00    ...                         3
13     137990  2017-09-08T02:00:00    ...                         3
14     139629  2017-10-05T12:30:00    ...                         1
15     139630  2017-10-05T12:30:00    ...                         1
16     140073  2017-10-13T02:30:00    ...                         3
17     140075  2017-10-13T02:30:00    ...                         3
18     141343  2017-11-03T12:30:00    ...          $195B          1
19     141344  2017-11-03T12:30:00    ...          $239B          1
20     141492  2017-11-08T03:00:00    ...                         3
21     141493  2017-11-08T03:00:00    ...                         3
22     143120  2017-12-05T13:30:00    ...          $195B          1
23     143121  2017-12-05T13:30:00    ...          $239B          1
24     143323  2017-12-08T03:00:00    ...                         3
25     143324  2017-12-08T03:00:00    ...                         3

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

* Filter calendar events by date    
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

* Filter calendar events by calendar ID    
<a target = '_blank' href="https://api.tradingeconomics.com/calendar/calendarid/174108,160025,160030?c=guest:guest">/calendar/calendarid/{calendarids}?c=guest:guest</a>     

</span> 

### Response Fields

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|       **Date**      |                                                   Release time and date in UTC                                                  |
|     **Country**     |                                                           Country name                                                          |
|     **Category**    |                                                     Indicator category name                                                     |
|      **Event**      |                                                Specific event name in the calendar                                              |
|    **Reference**    |                                           The period for which released data refers to                                          |
|      **Source**     |                                                          Source of data                                                         |
|      **Actual**     |                                                      Latest released value                                                      |
|     **Previous**    |                           Value for the previous period after the revision (if revision is applicable)                          |
|     **Forecast**    |                                   Average forecast among a representative group of economists                                   |
|    **TEForecast**   |                                                        TE own projections                                                       |
|       **URL**       |                                                Hyperlink at Trading Economics                                          |
|    **DateSpan**     |                                                   -----                                                 |
|    **Importance**   |                                                   1 = low, 2 = medium, 3 = high                                                 |
|     **LastUpdate**  |               Time when new data was inserted or changed               |
|     **Revised**     |               Value reported in the previous period after revision (if there is no revision field remains empty)|
|     **Currency**    |               -----              |
|     **Unit**        |               Unit of the value               |
|     **OCountry**    |    Country's original  name            |
|     **OCategory**   |      Category's original  name           |
|    **Ticker**       |                                            Unique ticker used by TradingEconomics                                           |
|    **Symbol**       |                                           Unique symbol used by TradingEconomics                                           |
|    **CalendarID**   |                                           Unique calendar ID used by TradingEconomics                                           |


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
te.getForecastData(country='united states', output_type='df')

Output:
           Country         ...                       q4_date
0    United States         ...           2019-03-31T00:00:00
1    United States         ...           2019-03-31T00:00:00
2    United States         ...           2019-03-31T00:00:00
               ...         ...                           ...
200  United States         ...           2019-03-31T00:00:00
201  United States         ...           2019-03-31T00:00:00
202  United States         ...           2019-03-31T00:00:00
```
<blockquote class="lang-specific python">
<p>Forecasted values for several countries and indicators. </p>
</blockquote>
```python
te.getForecastData(country=['united states', 'china'], indicator=['gdp', 'population'], output_type='df')

Output:
         Country    Category         ...                 q4              q4_date
0          China         GDP         ...           13100.00  2019-03-31T00:00:00
1          China  Population         ...            1407.00  2019-03-31T00:00:00
2  United States         GDP         ...           20220.00  2019-03-31T00:00:00
3  United States  Population         ...             328.49  2019-03-31T00:00:00
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
   
Here you can get a list of available commodities, currencies, indexes or bonds and their latest values. 
Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.     
**Please consider that all market-related methods are beta and under heavy development.**

## Snapshots

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
te.getMarketsData(marketsField='index', output_type='df')

Output:
           Symbol            Ticker     ...          lastYear    startYear
1     KWSEIDX:IND   KuwwaitStoarket     ...         6762.8200    6312.5200
2    SECTMIND:IND          SECTMIND     ...          399.3300     400.4300
3         BSX:IND               BSX     ...         2021.9300    2202.1900
              ...               ...     ...               ...          ...
128       SPX:IND               SPX     ...         2419.7000    2695.8100
129      SX5E:IND              SX5E     ...         3471.3300    3490.1900
130       UKX:IND               UKX     ...         7350.3200    7648.1000
```

<blockquote class="lang-specific python">
<p>To get stock market data filtered by symbol:</p>
</blockquote>
```python
te.getMarketsBySymbol(symbols='indu:ind')    

Output:    
     Symbol Ticker         ...           ISIN           LastUpdate
0  INDU:IND   INDU         ...           None  2018-06-28T14:56:00
```

<blockquote class="lang-specific python">
<p>To get stock market data filtered by symbols:</p>
</blockquote>
```python
te.getMarketsBySymbol(symbols=['aapl:us', 'indu:ind'], output_type='raw')   

Output:    
[{'Symbol': 'AAPL:US', 'Ticker': 'AAPL', 'Name': 'Apple', ..., 'LastUpdate': '2018-06-27T20:05:00'}, 
{'Symbol': 'INDU:IND', 'Ticker': 'INDU', 'Name': 'Dow Jones', 'Type': 'index', ... 'LastUpdate': '2018-06-28T11:35:00'}]

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

### Methods

**Snapshot of latest quotes**

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
<a target = '_blank' href="https://api.tradingeconomics.com/markets/bond?c=guest:guest">/markets/bond</a>

* Individual Market (stock, index, currency, commodity or bond)    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest">/markets/symbol/{symbol}</a>

* Multiple Markets   
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us,indu:ind?c=guest:guest">/markets/symbol/{symbols}</a>

</span> 

### Response Fields

|                            |                                                                                                                                 |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Symbol**                  |Unique symbol used by TradingEconomics                                                                                          |
|**Ticker**                  |Unique ticker used by TradingEconomics                                                          |
|**Name**                    |Indicator full name                                                           |
|**Country**                 |Country name                                                          |
|**Date**                    |Release time and date in UTC                                                                                                    |
|**Group**                   |Group name                                                                                                    |
|**Type**                    |Market type                                                      |
|**Decimals**                |Number of decimal places                                                      |
|**Last**                    |Latest released value                                                      |
|**Unit**                    |Unit of the value                                                  |
|**URL**                     |Hyperlink at Trading Economics                                          |
|**Importance**              |Indicator importance from 0(lowest) to 1000(highest)                                                  |
|**DailyChange**             |Difference between last close and current price                          |
|**DailyPercentualChange**   |Difference in percentage between last close and current price                                        |
|**WeeklyChange**            |Difference between last week close and current price                                              |
|**WeeklyPercentualChange**  |Difference in percentage between last week close and current price                                   |
|**MonthlyChange**           |Difference between last month close and current price                                        |
|**MonthlyPercentualChange** |Difference in percentage between last month close and current price                                 |
|**YearlyChange**            |Difference between last year close and current price                                         |
|**YearlyPercentualChange**  |Difference in percentage between last year close and current price                                           |
|**YTDChange**               |Difference between last year last close and current price                                         |
|**YTDPercentualChange**     |Difference in percentage between last year last close and current price                                          |
|**Yesterday**               |Yesterday close                                          |
|**LastWeek**                |Last week close                                          |
|**LastMonth**               |Last month close                                        |
|**LastYear**                |Last year close                                          |
|**StartYear**               |Start year close                                          |
|**LastUpdate**              |Time when new data was inserted or changed                                           |

## Historical  

<blockquote class="lang-specific python">
<p>To get historical market data for specific symbol and time range:</p>
</blockquote>  
```python
In [2]: te.fetchMarkets(symbol='indu:ind', initDate='2017-01-01', endDate='2017-06-15')

Out[2]: 
              symbol      open      high       low     close
2017-01-03  INDU:IND  19872.86  19938.53  19775.93  19881.76
2017-01-04  INDU:IND  19890.94  19956.14  19878.83  19942.16
2017-01-05  INDU:IND  19924.56  19948.60  19811.12  19899.29
...              ...       ...       ...       ...       ...
2017-06-13  INDU:IND  21256.83  21332.77  21256.83  21328.47
2017-06-14  INDU:IND  21342.71  21391.97  21294.09  21374.56
2017-06-15  INDU:IND  21291.69  21367.28  21261.87  21359.90
```

<blockquote class="lang-specific python">
<p>To get historical market data for multiple symbols and specific time range:</p>
</blockquote>  
```python
In [2]: te.fetchMarkets(symbol=['indu:ind', 'cl1:com'], initDate='2017-01-01', endDate='2017-06-15')

Out[2]: 
              symbol        open        high         low       close
2017-01-02   CL1:COM     53.9600     54.3000     53.9100     54.0200
2017-01-03   CL1:COM     54.2000     55.2400     52.1100     52.3300
2017-01-03  INDU:IND  19872.8600  19938.5300  19775.9300  19881.7600
       ...       ...         ...         ...         ...         ...
2017-06-14  INDU:IND  21342.7100  21391.9700  21294.0900  21374.5600
2017-06-15  INDU:IND  21291.6900  21367.2800  21261.8700  21359.9000
2017-06-15   CL1:COM     44.6900     44.8100     44.2200     44.4600
```

### Methods

<span class="methods">

* Historical markets data by market    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest">/markets/historical/{symbol}</a>

* Historical markets data for multiple markets    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us,indu:ind?c=guest:guest">/markets/historical/{symbols}</a>

* Filter historical markets data by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest&d1=2017-08-01">/markets/historical/{symbol}?d1=yyyy-mm-dd</a>

* Filter historical markets data by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/historical/aapl:us?c=guest:guest&d1=2017-08-01&d2=2017-08-08">/markets/historical/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>

</span> 

### Response Fields

|           |                                       |
|:----------|:--------------------------------------|
|**Symbol** |Unique symbol used by TradingEconomics |
|**Date**   |Release time and date in UTC           |
|**Open**   |Open value                             |
|**High**   |High value                             |
|**Low**    |Low value                              |
|**Close**  |Close value                            |


## Intraday

<blockquote class="lang-specific python">
<p>To get intraday market data for a specific symbol run:</p>
</blockquote>  
```python
te.getMarketsIntraday(symbols='indu:ind')

Output:
        Symbol                 Date     ...             Low       Close
0     INDU:IND  2018-04-30T08:30:00     ...      24409.2109  24409.2109
1     INDU:IND  2018-04-30T08:31:00     ...      24407.2207  24409.2109
2     INDU:IND  2018-04-30T08:32:00     ...      24410.2109  24411.2109
 ...       ...                  ...     ...             ...         ...
9997  INDU:IND  2018-05-18T15:52:00     ...      24744.1191  24755.1094
9998  INDU:IND  2018-05-18T15:53:00     ...      24749.1094  24749.1094
9999  INDU:IND  2018-05-18T15:54:00     ...      24750.1094  24754.1191
```

<blockquote class="lang-specific python">
<p>To get intraday market data for a specific symbol starting on certain date and time run:</p>
</blockquote>  
```python
te.getMarketsIntraday(symbols='indu:ind', initDate='2018-03-13 15:30')

Output:
        Symbol                 Date     ...             Low       Close
0     INDU:IND  2018-03-13T15:30:00     ...      25198.0606  25209.9609
1     INDU:IND  2018-03-13T15:31:00     ...      25201.9395  25206.9395
2     INDU:IND  2018-03-13T15:32:00     ...      25201.8809  25208.8809
 ...       ...                  ...     ...             ...         ...
9997  INDU:IND  2018-04-04T16:06:00     ...      23884.9300  23890.0200
9998  INDU:IND  2018-04-04T16:07:00     ...      23888.4000  23903.0400
9999  INDU:IND  2018-04-04T16:08:00     ...      23903.5000  23942.3900
```

### Methods

<span class="methods">

* Intraday prices for a single market     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest">/markets/intraday/{symbol}</a>

* Filter intraday prices by date and hour    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest&d1=2017-08-10%2015:30">/markets/intraday/{symbol}?d1=yyyy-mm-dd hh:mm</a>

* Filter intraday prices by date    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/intraday/aapl:us?c=guest:guest&d1=2017-08-01&d2=2017-08-08">/markets/intraday/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>   

</span> 

### Response Fields

|             |                                       |
|:------------|:--------------------------------------|
|**Symbol**   |Unique symbol used by TradingEconomics |
|**Datetime** |Release time and date in UTC           |
|**Open**     |Open value                             |
|**High**     |High value                             |
|**Low**      |Low value                              |
|**Close**    |Close value                            |

## Market Lists

<blockquote class="lang-specific python">
<p>To get closely related items of a certain symbol:</p>
</blockquote>  
```python
te.getMarketsPeers(symbols='indu:ind', output_type='df')

Output:
     Symbol Ticker         ...           ISIN           LastUpdate
0  INDU:IND   INDU         ...           None  2018-06-28T13:49:00
1   MID:IND    MID         ...           None  2018-06-28T13:49:00
2   NDX:IND    NDX         ...           None  2018-06-28T13:49:00
3   SPX:IND    SPX         ...           None  2018-06-28T13:49:00
```

<blockquote class="lang-specific python">
<p>To get closely related items of a certain group of symbols:</p>
</blockquote>  
```python
te.getMarketsPeers(symbols=['aapl:us', 'indu:ind'])

Output:
      Symbol         ...                    LastUpdate
0    AAPL:US         ...           2018-06-28T13:49:00
1     HPQ:US         ...           2018-06-28T13:49:00
2     IBM:US         ...           2018-06-28T13:49:00
         ...         ...                           ...
8     SNE:US         ...           2018-06-28T13:48:00
9    SPX:IND         ...           2018-06-28T13:49:00
10     VZ:US         ...           2018-06-28T13:49:00
```

<blockquote class="lang-specific python">
<p>To get components of the certain index:</p>
</blockquote>  
```python
te.getMarketsComponents(symbols='psi20:ind', output_type='df')

Output:
     Symbol         ...                    LastUpdate
0   ALTR:PL         ...           2018-06-28T13:45:00
1    BCP:PL         ...           2018-06-28T13:45:00
2    COR:PL         ...           2018-06-28T13:48:00
        ...         ...                           ...
15   SEM:PL         ...           2018-06-28T13:47:00
16   SON:PL         ...           2018-06-28T13:46:00
17  SONC:PL         ...           2018-06-28T11:51:00
```

<blockquote class="lang-specific python">
<p>To get components of the group of indexes:</p>
</blockquote>  
```python
te.getMarketsComponents(symbols=['indu:ind', 'psi20:ind'])

Output:
     Symbol         ...                    LastUpdate
0   AAPL:US         ...           2018-06-28T13:49:00
1   ALTR:PL         ...           2018-06-28T13:45:00
2    AXP:US         ...           2018-06-28T13:49:00
        ...         ...                           ...
45    VZ:US         ...           2018-06-28T13:49:00
46   WMT:US         ...           2018-06-28T13:49:00
47   XOM:US         ...           2018-06-28T13:49:00

```

### Methods

<span class="methods">

* A snapshot of latest peers prices by market    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/peers/aapl:us?c=guest:guest">/markets/peers/{symbol}</a>

* Stock Market Index Components     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/components/psi20:ind?c=guest:guest">/markets/components/{symbol}</a>

</span> 

### Response Fields

|                            |                                                                        |
|:---------------------------|:-----------------------------------------------------------------------|
|**Symbol**                  |Unique symbol used by TradingEconomics                                  |
|**Ticker**                  |Unique ticker used by TradingEconomics                                  |
|**Name**                    |Indicator full name                                                     |
|**Country**                 |Country name                                                            |
|**Date**                    |Release time and date in UTC                                            |
|**Type**                    |Market type                                                             |
|**Decimals**                |Number of decimal places                                                |
|**Last**                    |Latest released value                                                   |
|**MarketCap**               |Market capitalization                                                   |
|**Unit**                    |Unit of the value                                                       |
|**URL**                     |Hyperlink at Trading Economics                                          |
|**Importance**              |Indicator importance from 0(lowest) to 1000(highest)                    |
|**DailyChange**             |Difference between last close and current price                         |
|**DailyPercentualChange**   |Difference in percentage between last close and current price           |
|**WeeklyChange**            |Difference between last week close and current price                    |
|**WeeklyPercentualChange**  |Difference in percentage between last week close and current price      |
|**MonthlyChange**           |Difference between last month close and current price                   |
|**MonthlyPercentualChange** |Difference in percentage between last month close and current price     |
|**YearlyChange**            |Difference between last year close and current price                    |
|**YearlyPercentualChange**  |Difference in percentage between last year close and current price      |
|**YTDChange**               |Difference between last year last close and current price               |
|**YTDPercentualChange**     |Difference in percentage between last year last close and current price |
|**Yesterday**               |Yesterday close                                                         |
|**LastWeek**                |Last week close                                                         |
|**LastMonth**               |Last month close                                                        |
|**LastYear**                |Last year close                                                         |
|**StartYear**               |Start year close                                                        |
|**LastUpdate**              |Time when new data was inserted or changed                              |

## Search

### Methods

<span class="methods">

* Search method    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/search/united%20states?c=guest:guest">/markets/search/{term}</a>

</span> 

### Response Fields

|                            |                                                                        |
|:---------------------------|:-----------------------------------------------------------------------|
|**Symbol**                  |Unique symbol used by TradingEconomics                                  |
|**Ticker**                  |Unique ticker used by TradingEconomics                                  |
|**Name**                    |Indicator full name                                                     |
|**Country**                 |Country name                                                            |
|**Date**                    |Release time and date in UTC                                            |
|**Type**                    |Market Type                                                             |
|**Decimals**                |Number of decimal places                                                |
|**Last**                    |Latest released value                                                   |
|**Unit**                    |Unit of the value                                                       |
|**URL**                     |Hyperlink at Trading Economics                                          |
|**Importance**              |Indicator importance from 0(lowest) to 1000(highest)                    |
|**DailyChange**             |Difference between last close and current price                         |
|**DailyPercentualChange**   |Difference in percentage between last close and current price           |
|**WeeklyChange**            |Difference between last week close and current price                    |
|**WeeklyPercentualChange**  |Difference in percentage between last week close and current price      |
|**MonthlyChange**           |Difference between last month close and current price                   |
|**MonthlyPercentualChange** |Difference in percentage between last month close and current price     |
|**YearlyChange**            |Difference between last year close and current price                    |
|**YearlyPercentualChange**  |Difference in percentage between last year close and current price      |
|**YTDChange**               |Difference between last year last close and current price               |
|**YTDPercentualChange**     |Difference in percentage between last year last close and current price |
|**Yesterday**               |Yesterday close                                                         |
|**LastWeek**                |Last week close                                                         |
|**LastMonth**               |Last month close                                                        |
|**LastYear**                |Last year close                                                         |
|**StartYear**               |Start year close                                                        |
|**LastUpdate**              |Time when new data was inserted or changed                              |



### JSON CSV XML
For all methods listed above, you can get data in next formats:

<span class="methods">

* JSON        
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=json">/markets/symbol/{symbol}?c=guest:guest&f=json</a>    

* CSV    
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=csv">/markets/symbol/{symbol}?c=guest:guest&f=csv</a>

* XML     
<a target = '_blank' href="https://api.tradingeconomics.com/markets/symbol/aapl:us?c=guest:guest&f=xml">/markets/symbol/{symbol}?c=guest:guest&f=xml</a>

</span> 

# Earnings

### Earnings, IPO, Dividends    

<blockquote class="lang-specific python">
<p>To get default earnings calendar:</p>
</blockquote>  
```python
te.getEarnings()

Output:
        Symbol                            Name     Actual  ...
0         A:US                         Agilent      0.149  ...
1     ASLAN:TI                   Aslan Cimento       0.55  ...
2      2459:TT                           Audix          3  ...
3       AXW:FP                  AXWAY SOFTWARE        0.2  ...

```

<blockquote class="lang-specific python">
<p>To get earnings calendar filtered by symbol and date:</p>
</blockquote>  
```python
te.getEarnings(symbols = 'msft:us', initDate='2016-01-01', endDate='2017-12-31')

Output:
    Symbol       Name Actual  ...
0  MSFT:US  Microsoft   0.78  ...
1  MSFT:US  Microsoft   0.62  ...
2  MSFT:US  Microsoft   0.69  ...
3  MSFT:US  Microsoft   0.76  ...

```

<blockquote class="lang-specific python">
<p>To get earnings calendar by country:</p>
</blockquote>  
```python
te.getEarnings(country = 'united states')

Output:
       Symbol                                  Name  Actual  ...
0        A:US                               Agilent   0.149  ...
1    CMCSA:US                               Comcast    0.19  ...
2      DDR:US                                   DDR    0.38  ...
3      CUZ:US                    Cousins Properties   0.065  ...

```


### Methods

<span class="methods">

* Default earnings calendar     
<a target = '_blank' href="https://api.tradingeconomics.com/earnings?c=guest:guest">/earnings</a>    

* Filter earnings calendar by date    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings?c=guest:guest&d1=2017-01-01">/earnings?d1=yyyy-mm-dd</a>    

* Filter earnings calendar by market and date   
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/symbol/aapl:us?c=guest:guest&d1=2017-01-01">/earnings/symbol/{symbol}?d1=yyyy-mm-dd</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/symbol/msft:us?c=guest:guest&d1=2016-01-01&d2=2017-12-31">/earnings/symbol/{symbol}?d1=yyyy-mm-dd&d2=yyyy-mm-dd</a>    

* Filter earnings calendar by country    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings/country/united%20states?c=guest:guest">/earnings/country/{country}</a> 

* Filter earnings by type    
<a target = '_blank' href="https://api.tradingeconomics.com/earnings?type=earnings">/earnings?type=earnings</a>    

</span> 

### Response Fields

|                     |                                                             |
|:--------------------|:---------------------------------------------------------   |
|     **Date**        | Release time and date in UTC                                |
|    **Symbol**       | Unique symbol used by TradingEconomics                      |
|     **Type**        | Ernings type: earnings, ipo, dividends                      |
|     **Name**        | Company name                                                |
|   **Actual**        | Earnings per share                                          |
|  **Forecast**       | Average forecast among a representative group of analysts   |
|  **FiscalTag**      | Fiscal year and quarter                                     |
|**FiscalReference**  | Fiscal year and quarter in different format                 |
|**CalendarReference**| Calendar quarter for the release                            |
|   **Country**       | Country name                                                |
|  **Currency**       | ----                                                        |
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
    
te.subscribe('EURUSD:CUR')
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


**Response fields for the calendar subscription:**

|                     |                                                                                                                                 |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|       **date**      |                                                   Release time and date in UTC                                                  |
|     **country**     |                                                           Country name                                                          |
|     **category**    |                                                     Indicator category name                                                     |
|      **event**      |                                                Specific event name in the calendar                                              |
|    **reference**    |                                           The period for which released data refers to                                          |
|      **source**     |                                                          Source of data                                                         |
|      **actual**     |                                                      Latest released value                                                      |
|     **previous**    |                           Value for the previous period after the revision (if revision is applicable)                          |
|     **forecast**    |                                   Average forecast among a representative group of economists                                   |
|    **teforecast**   |                                                        TE own projections                                                       |
|    **importance**   |                                                   1 = low, 2 = medium, 3 = high                                                 |


**Response fields for the markets subscription:**

|                 |                                                                                                                                 |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------|
|      **s**      | Symbol                                                                                                                          |
|     **bid**     | Latest market bid price                                                                                                         |
|     **ask**     | Latest maket ask price                                                                                                          |
|    **price**    | Latest market price                                                                                                             |
|     **dt**      | Timestamp of last market price (epoch)                                                                                          |
|    **state**    | Market state (open/close)                                                                                                       |
|     **type**    | Type of market (currency/indexes/commodity)                                                                                     |
|    **dhigh**    | Daily high                                                                                                                      |
|    **dlow**     | Daily low                                                                                                                       |
|    **pch**      | Percentage change                                                                                                               |
|    **nch**      | Net change                                                                                                                      |

**Check how to use it with** <a href="https://ieconomics.github.io/open-api/?python#streaming">Python</a> **or** <a href="https://ieconomics.github.io/open-api/?javascript#streaming">NodeJS (JavaScript)</a>

For a detailed list of available live data please <a target = '_blank' href="https://tradingeconomics.com/contact.aspx?subject=Stream%20list">contact us</a>






# News

Click on any method below for a sample.
Please note the sample request is limited in scope to a few countries and indicators and responds with a maximum of 10 rows. Trading Economics live acounts have access to more than 20 million indicators for nearly 200 countries.

## Latest news

### Methods

<span class="methods">

* Get latest news    
<a target = '_blank' href="https://api.tradingeconomics.com/news?c=guest:guest">/news</a>

* Get news by country   
<a target = '_blank' href="https://api.tradingeconomics.com/news/country/united%20states?c=guest:guest">/news/country/{countries}</a>

* Get news by indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/news/indicator/inflation%20rate?c=guest:guest">/news/indicator/{indicators}</a>

* Get news by country and indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/news/country/united%20states/inflation%20rate?c=guest:guest">/news/country/{countries}/{indicators}</a>

* Paginate news list by specifying start index and list size    
<a target = '_blank' href="http://api.tradingeconomics.com/news?c=guest:guest&limit=15&start=10">/news?c=guest:guest&limit={list_size}&start={start_index}</a>

</span> 

### Response Fields

|                |                                       |
|:---------------|:--------------------------------------|
|**ID**          |Unique ID                              |
|**Title**       |Title of the event                     |
|**Description** |Description of the event               |
|**Date**        |Release time and date in UTC           |
|**Country**     |Country name                           |
|**Category**    |Category name                          |
|**Symbol**      |Unique symbol used by TradingEconomics |
|**Url**         |Hyperlink at Trading Economics         |

## Latest articles

### Methods

<span class="methods">

* Latest articles    
<a target = '_blank' href="https://api.tradingeconomics.com/articles?c=guest:guest">/articles</a>

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

* Paginate articles list by specifying start index and list size    
<a target = '_blank' href="https://api.tradingeconomics.com/articles?c=guest:guest&lim=10&start=10">/articles?c=guest:guest&lim={list_size}&start={start_index}</a>
</span> 

### Response Fields

|                |                                       |
|:---------------|:--------------------------------------|
|**ID**          |Unique ID                              |
|**Title**       |Title of the event                     |
|**Description** |Description of the event               |
|**Date**        |Release time and date in UTC           |
|**Country**     |Country name                           |
|**Category**    |Category name                          |
|**Symbol**      |Unique symbol used by TradingEconomics |
|**URL**         |Hyperlink at Trading Economics         |



# World Bank

## Category

### Methods

<span class="methods">

* Main categories    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/categories?c=guest:guest">/worldBank/categories</a>


* Filtering by the main categories    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/category/Education?c=guest:guest">/worldBank/category/{category}</a>    
Because there are too many results, this method has pagination. Each page is limited to 200 results, you can request each page separately        
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/category/Education/2?c=guest:guest">/worldBank/category/{category}/{page_number}</a>

All of this can be formatted to json by appending "&format=json"

</span>

### Response Fields

|                       |                                                                                                                                 |
|:----------------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Category**           |Category name                                                                                                                        |
|**series_code**        | ---                                                                                          |
|**series_name**        |                                                      ---                                                      |
|**sub_category**       |----                                                 |
|**sub_category2**      |----                         |
|**sub_category3**      |----                                      |
|**Title**              |----                                                          |
|**long_definition**    |-----                                           |
|**short_definition**   |----                                         |
|**Source**             |Data source                                      |
|**general_comments**   |----                                                         |
|**aggregation_method** |-----                                            |
|**URL**                |Hyperlink at Trading Economics                                          |
|**Organization**       |----                                         |
|**Unit**               |----                                                       |
|**verbose_unit**       |----                                          |
|**last_update**        |Time when new data was inserted or changed                                           |



## Indicators and Countries

### Methods

<span class="methods">

* Detailed information about specific indicator for all countries using a series code from the previous method    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=fr.inr.rinr">/worldBank/indicator?c=guest:guest&s={series_code}</a>


* List of indicators available for a specific country (with pagination)    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/country/portugal/2?c=guest:guest">/worldBank/country/{country}/{page_number}</a>


* Detailed  information just for a specific indicator and country by using series code or url    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&s=usa.fr.inr.rinr">/worldBank/indicator?c=guest:guest&s={series_code}</a>    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/indicator?c=guest:guest&url=/united-states/real-interest-rate-percent-wb-data.html">/worldBank/indicator?c=guest:guest&url={url1}</a>

All of this can be formatted to json by appending "&format=json"

</span>

### Response Fields

|                 |                                                                                                                                 |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Symbol**       |Unique symbol used by TradingEconomics                                                                                          |
|**Last**         |Latest released value                                                      |
|**Date**         |Release time and date in UTC                                                  |
|**Previous**     |Value for the previous period after the revision (if revision is applicable)                          |
|**PreviousDate** |Release time and date in UTC of the previous value                                        |
|**Country**      |Country name                                                          |
|**Category**     |Category name                                                    |
|**Description**  |----                                              |
|**Frequency**    |Frequency of the indicator                                              |
|**Unit**         |Unit of the value                                          |
|**Title**        |---                                                            ---                                          |
|**URL**          |Hyperlink at Trading Economics                                          |
|**LastUpdate**   |Time when new data was inserted or changed                                           |


## Historical

### Methods

<span class="methods">

* Historical data for a specific indicator    
<a target = '_blank' href="https://api.tradingeconomics.com/worldBank/historical?c=guest:guest&s=usa.fr.inr.rinr">/worldBank/historical?c=guest:guest&s={series_code}</a>

All of this can be formatted to json by appending "&format=json"

</span>

### Response Fields

|           |                                       |
|:----------|:--------------------------------------|
|**Symbol** |Unique symbol used by TradingEconomics |
|**Date**   |Release time and date in UTC           |
|**Value**  |Released value                         |


# Comtrade

### Methods

<span class="methods">

* Get detailed information about Comtrade categories    
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/categories?c=guest:guest">/comtrade/categories</a>

</span>


### Response Fields

|                |                                                                                                                                 |
|:---------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Id**          | ---                                                                                                        |
|**Name**        |                                             ---                                          |
|**ParentId**    |                                            ---                                           |
|**Pretty_Name** | ---                                                                                                       |

## Country

### Methods 

<span class="methods">

* Get detailed information about Comtrade countries    
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/countries?c=guest:guest">/comtrade/countries</a>

* Snapshot of data per country    
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/country/portugal?c=guest:guest">/comtrade/country/{country}</a>    
Because there are too many results, this method has pagination. Each page is limited to 200 results, you can request each page separately   
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/country/portugal/2?c=guest:guest">/comtrade/country/{country}/{page_number}</a>

* Snapshot of trade between two countries (with pagination)   
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/country/portugal/spain/2?c=guest:guest">/comtrade/country/{country_1}/{country_2}/{page_number}</a>

</span>


### Response Fields

|              |                                                                                                                                 |
|:-------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Id**        | ---                                                                                                        |
|**Name**      |                                             ---                                          |
|**Region**    |                                            ---                                           |
|**Subregion** | ---                                                                                                       |
|**ISO**       |Three letter country code                                          |
|**Year**      |                                            ---                                           |
|**Symbol**    |Unique symbol used by TradingEconomics                                                                                          |
|**Country1**  |First country ame                                                          |
|**Country2**  |Second country name                                                          |
|**Type**      |-----                                                         |
|**Category**  |Category name                                                                                                         |
|**URL**       |Hyperlink at Trading Economics                                          |
|**Title**     |     -----                                           |

## Historical

### Methods

<span class="methods">

* Historical data    
<a target = '_blank' href="https://api.tradingeconomics.com/comtrade/historical/PRTESP24031?c=guest:guest">/comtrade/historical/{symbol}</a>

</span>


### Response Fields

|           |                                       |
|:----------|:--------------------------------------|
|**Symbol** |Unique symbol used by TradingEconomics |
|**Date**   |Release time and date in UTC           |
|**Value**  |Released value                         |


# Federal Reserve    

### Methods

<span class="methods">  

* List of all US states    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/states?c=guest:guest">/fred/states</a>    

* List of all counties per state    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/counties/arkansas?c=guest:guest">/fred/counties/{county}</a>    

</span>

### Response Fields

|           |       |
|:----------|:------|
|**Name**   |State  |
|**County** |County |

## Snapshots    
Snapshots can be accessed through symbol, url, country, state or county. All have pagination.  

### Methods

<span class="methods">  

* Symbol    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/symbol/AGEXMAK2A647NCEN?c=guest:guest">/fred/snapshot/symbol/{symbol}</a>    

* URL    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/url?c=guest:guest&url=/united-states/income-inequality-in-aleutians-east-borough-ak-fed-data.html">/fred/snapshot/url?c=guest:guest&url={url}</a>

* Country     
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/country/united%20states/?c=guest:guest">/fred/snapshot/country/{country}</a>    

* State    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/state/tennessee?c=guest:guest">/fred/snapshot/state/{state}</a>    

* County    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/county/arkansas?c=guest:guest">/fred/snapshot/county/{county}</a>    
or    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/county/Pike%20County,%20AR?c=guest:guest">/fred/snapshot/county/Pike%20County,%20AR</a>

* Pagination    
<a target = '_blank' href="https://api.tradingeconomics.com/fred/snapshot/country/united%20states/2?c=guest:guest">/fred/snapshot/country/{country}/{page}</a>    

</span>

### Response Fields

|                 |                                                                                                                                 |
|:----------------|:--------------------------------------------------------------------------------------------------------------------------------|
|**Symbol**       |Unique symbol used by TradingEconomics                                                                                          |
|**Country**      |Country name                                                          |
|**Category**     |Indicator category name                                                                                                         |
|**Last**         |Latest released value                                                      |
|**Date**         |Release time and date in UTC                                                  |
|**Previous**     |Value for the previous period after the revision (if revision is applicable)                          |
|**PreviousDate** |Release time and date in UTC of the previous value                                        |
|**Frequency**    |Frequency of the indicator                                              |
|**Popularity**   |                                                ---                                              |
|**Start**        |                                                              ---                                          |
|**Unit**         |Unit of the value                                          |
|**Adjustment**   |                                               ---                                          |
|**URL**          |Hyperlink at Trading Economics                                          |
|**LastUpdate**   |Time when new data was inserted or changed                                           |

## Historical

### Methods

<span class="methods"> 

* Only accessed through symbol       
<a target = '_blank' href="https://api.tradingeconomics.com/fred/historical/RACEDISPARITY005007?c=guest:guest">/fred/historical/{symbol}</a>    

* Multiple symbols        
<a target = '_blank' href="http://api.tradingeconomics.com/fred/historical/RACEDISPARITY005007,2020RATIO002013?c=guest:guest">/fred/historical/{symbols}</a>    

</span>

### Response Fields

|           |                                       |
|:----------|:--------------------------------------|
|**Symbol** |Unique symbol used by TradingEconomics |
|**Date**   |Release time and date in UTC           |
|**Value**  |Released value                         |


# Excel



Download the <a target = '_blank' href=" https://github.com/ieconomics/open-api/raw/master/Excel/All_Releases/ExcelAddInDeploy_latest.msi">Trading Economics Excel Add In</a> installer, launch it and follow the instructions. We support Excel 2010, 2013, 2016 (32 and 64bit). After installing the Trading Economics Excel Add In click on TE tab and then click on login button, insert the access key and hit Submit button.    
<a target = '_blank' href="https://github.com/ieconomics/open-api/raw/master/Documentation/source/Trading%20Economics%20Excel%20Add%20On%20Tutorial%202017.pdf">Click here to download detailed user guide.</a>



<!-- Start of LiveChat (www.livechatinc.com) code -->
<script type="text/javascript">
  var theDate = new Date();
  if(theDate.getUTCHours() > 9 && theDate.getUTCHours() < 18){
      console.log("livechatinc");
      window.__lc = window.__lc || {};
      window.__lc.license = 9383265;
      (function() {
       var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
       lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
      })();

  }




</script>
<!-- End of LiveChat code -->