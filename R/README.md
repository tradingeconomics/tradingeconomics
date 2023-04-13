# R version of Trading Economics API library.

![version](https://img.shields.io/badge/version-0.2.12-green.svg)

This package provides to Trading Economics API users an easiest way to extract different kind of economic data.

#

## Documentation
https://docs.tradingeconomics.com/?r#introduction

#


## Installation

You can get R from official website: https://cran.r-project.org/

**Step 1.**   Install the devtools package. You can do this from CRAN. Invoke R and then type
```r
install.packages("devtools")
```
**Step 2.** Load the devtools and stringr packages.
```r
library(devtools)
library(stringr)
```
**Step 3.** Install the tradingeconomics package
```r
install_github("tradingeconomics/tradingeconomics/R/tradingeconomics")
```

#


## How to use ?
* Require the tradingeconomics package on R Console:
```r
library(tradingeconomics)
```
* then do the loggin with your apikey or leave it blank 
* **Note:** If you don't have a client key leave it blank and a sample of data will be provided or you can get your free key here: http://developer.tradingeconomics.com 
```r
login('users APIkey')
```
* If you don't have APIkey just type
```
login()
```
* After this steps you are now able to request economic data using our methods, check the example bellow.

#

## Examples:
* getForecastData(country, indicator, outType) - Return forecast values by country, by indicator, by country and indicator.    
   Parameters:  
	 - country - string or list. String to get data for one country. List of strings to get data for
			   several countries. For example, country = c('United States', 'Australia').   
	 - indicator - string or list. String  to get data for one category. List of strings to get data for
	 		     several calendar events. For example, indicator = 'GDP Growth Rate' or
				 indicator = c('Exports', 'Imports').   
	 - outType - string. 'df' for data frame, 'lst'(default) for list.  
	 
   Next code will provide a list with forecasted values of all indicators of Portugal. 
```r
getForecastData(country ='portugal')
```   
  To get data in data frame format type          
```r
getForecastData(country ='portugal', outType = 'df')
```
* getHistoricalData(country, indicator, initDate, endDate, outTytpe) - Return historical information for specific country and indicator.   
   Parameters:    
    - country - string or list. String to get data for one country. List of strings to get data for
               several countries. For example, country = c('United States', 'Australia').   
    - indicator - string or list. String  to get data for one category. List of strings to get data for
 	 			 several calendar events.For example, indicator = 'GDP Growth Rate' or 
 	 			 indicator = c('Exports', 'Imports').
    - initDate - string with format: YYYY-MM-DD. For example: '2011-01-01'.
    - endDate - string with format: YYYY-MM-DD.
    - outType - string. 'df' for data frame, 'lst'(default) for list.   
    
   For example, to get historical data of imports in United Kingdom type
```r
getHistoricalData(country = 'united kingdom', indicator = 'imports')
```
* getIndicatorData(country, indicator, outType) -  Return a list of all indicators, indicators by country or country-indicator pair.   
   Parameters:     
	 - country - string or list. String for one country information. List of strings for
	           several country's, for example country = c('country_name', 'country_name').
	 - indicator - string or list. String for one indicator. List of strings for several indicators, for example
                 indicator = 'indicator_name' or indicator = c('indicator_name', 'indicator_name').
	 - outType - string. 'df' for data frame, 'lst' for list.   
	 
   For example, next code will provide information in data frame format about a number of companies in Italy that got bankrupt
```r
getIndicatorData(country = 'italy', indicator = 'Bancruptcies', outType = 'df')

  Country     Category              Title LatestValue     LatestValueDate Source      Unit                 URL CategoryGroup Frequency HistoricalDataSymbol PreviousValue   PreviousValueDate
1   Italy Bankruptcies Italy Bankruptcies        3600 2016-03-31T00:00:00 Cerved Companies /italy/bankruptcies      Business Quarterly             ITALYBAN          4100 2015-12-31T00:00:00
```
* getMarketsData(marketsField, outType) - Returns a list of available commodities, currencies, indexes or bonds and their latest values.   
  Parameters:  
     - marketsField - string. Takes either one of 'commodity', 'currency', 'index' or 'bond' as options.
     - outType - string. 'df' for data frame, 'lst'(default) for list.   
     
   To get information about commodities in data frame format type
```r
getMarketsData(marketsField = 'commodity', outType = 'df')
```
* getCalendarData(country, indicator, initDate, endDate, outType) - Return calendar events.   
   Parameters:   
	- country - string or list. String to get data for one country. List of strings to get data for
               several countries. For example, country = c('United States', 'Australia').
	- indicator -  string or list. String  to get data for one category. List of strings to get 
	              data for several calendar events. For example, category = 'GDP Growth Rate' or
                  category = c('Exports', 'Imports').
 	- initDate - string with format: YYYY-MM-DD. For example: '2011-01-01'.
	- endDate - string with format: YYYY-MM-DD.
	- outType - string. 'dict'(default) for dictionary format output, 'df' for data frame,
			   'raw' for list of dictionaries without any parsing.   
			   
   Next code will provide a data frame with information about calendar events for United Kingdom 
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

## More examples

https://github.com/tradingeconomics/tradingeconomics/tree/master/R/EXAMPLES

#

## Learn More

https://tradingeconomics.com/analytics/api.aspx