R version of Trading Economics API library.

This package provides to Trading Economics API users easiest way to extract different kind of data.
Available functions are:

* getForecastData - Return forecast values by country, by indicator, by country and indicator. 
	Parameters:
	 country - string or list. String to get data for one country. List of strings to get data for
			   several countries. For example, country = c('United States', 'Australia').
	 indicator - string or list. String  to get data for one category. List of strings to get data for
	 		     several calendar events. For example, category = 'GDP Growth Rate' or
				 category = c('Exports', 'Imports').
	 outType - string. 'dict'(default) for dictionary format output, 'df' for data frame,
		  	   'raw' for list of dictionaries without any parsing.
	 credentials - string. User's credentials.
* getHistoricalData - Return historical information for specific country and indicator.
	Parameters:
	 country - string or list. String to get data for one country. List of strings to get data for
               several countries. For example, country = c('United States', 'Australia').
 	 indicator - string or list. String  to get data for one category. List of strings to get data for
 	 			 several calendar events.For example, category = 'GDP Growth Rate' or 
 	 			 category = c('Exports', 'Imports').
	 initDate - string with format: YYYY-MM-DD. For example: '2011-01-01'.
     endDate - string with format: YYYY-MM-DD.
	 outType - string. dict'(default) for dictionary format output, 'df' for data frame,
			   raw' for list of dictionaries without any parsing.
	 credentials - string. User's credentials.
* getIndicatorData -  Return a list of all indicators, indicators by country or country-indicator pair.
	Parameters:
	 country - string or list. String for one country information. List of strings for
	           several countrys, for example country = c('country_name', 'country_name').
	 indicator - string or list. String for one indicator. List of strings for several indicators, for example
                 indicators = 'indicator_name' or indicators = c('indicator_name', 'indicator_name').
	 outType - string. 'dict'(default) for dictionary format output, 'df' for data frame,
			   'raw' for list of dictionaries directly from the web.
  	 credentials - string. User's credentials.
* getMarketsData - Returns a list of available commodities, currencies, indeces or bonds and their latest values.
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
Results are available in dataframe format or list. 