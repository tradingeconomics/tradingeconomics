# R version of Trading Economics API library.

This package provides to Trading Economics API users easiest way to extract different kind of data.
Available functions are:

## Installation

You can get R from official website: https://cran.r-project.org/

Then you need to install the tradingeconomics package. At this moment our package available to download from GitHub repository. 

How to install a package that’s sitting on GitHub?

**Step 1.**   Install the devtools package. You can do this from CRAN. Invoke R and then type
```r
install.packages("devtools")
```
**Step 2.** Load the devtools package.
```r
library(devtools)
```
**Step 3.** Install the tradingeconomics package
```r
install_github("ieconomics/open-api/R/tradingeconomics")
```

##How to use ?
In R Console type
```r
library(tradingeconomics)
```
than type
```r
login('users APIkey')
```
If you don't have APIkey just type
```
login()
```
**Note:** Without APIkey  data sets will default to returning sample data.
##Examples
* getForecastData(country, indicator, outType) - Return forecast values by country, by indicator, by country and indicator.    
   Parameters:   
	 - country - string or list. String to get data for one country. List of strings to get data for
			   several countries. For example, country = c('United States', 'Australia').   
	 - indicator - string or list. String  to get data for one category. List of strings to get data for
	 		     several calendar events. For example, category = 'GDP Growth Rate' or
				 category = c('Exports', 'Imports').   
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
* getIndicatorData -  Return a list of all indicators, indicators by country or country-indicator pair.
	Parameters:   
	 country - string or list. String for one country information. List of strings for
	           several country's, for example country = c('country_name', 'country_name').
	 indicator - string or list. String for one indicator. List of strings for several indicators, for example
                 indicators = 'indicator_name' or indicators = c('indicator_name', 'indicator_name').
	 outType - string. 'dict'(default) for dictionary format output, 'df' for data frame,
			   'raw' for list of dictionaries directly from the web.
  	 credentials - string. User's credentials.
* getMarketsData - Returns a list of available commodities, currencies, indexes or bonds and their latest values.
	Parameters:
     marketsField - string. Takes either one of 'commodity','currency',
			       'index' or 'bond' as options.
     outType - string. 'df'(default) for data frame,
              'raw' for list of unparsed data.
     credentials - string. User's credentials.
* getCalendarData - Return calendar events.
	Parameters:
	 country - string or list. String to get data for one country. List of strings to get data for
               several countries. For example, country = c('United States', 'Australia').
	 indicator -  string or list. String  to get data for one category. List of strings to get 
	              data for several calendar events. For example, category = 'GDP Growth Rate' or
                  category = c('Exports', 'Imports').
 	 initDate - string with format: YYYY-MM-DD. For example: '2011-01-01'.
	 endDate - string with format: YYYY-MM-DD.
	 outType - string. 'dict'(default) for dictionary format output, 'df' for data frame,
			   'raw' for list of dictionaries without any parsing.
	 credentials - string. User's credentials.
Results are available in data frame format or list. 
