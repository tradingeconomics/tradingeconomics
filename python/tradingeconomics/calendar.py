import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import functions as fn
from . import glob

PY3 = sys.version_info[0] == 3

if PY3: # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else: # Python 2.X
    from urllib import urlopen
    from urllib import quote


class ParametersError(ValueError):
    pass

class DateError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

class LoginError(AttributeError):
    pass

def paramCheck (country, indicator = None):
    if type(country) is str and indicator == None:
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(country)
    elif type(country) is not str and indicator == None:
        multiCountry = ",".join(country)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry)
    elif type(country) is not str and type(indicator) is str:  
        multiCountry = ",".join(country)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry) + '/indicator/' + quote(indicator)
    elif type(country) is str and type(indicator) is not str:
        multiIndicator = ",".join(indicator)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(country) + '/indicator/' + quote(multiIndicator) 
    else:
        multiCountry = ",".join(country)
        multiIndicator = ",".join(indicator)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry) + '/indicator/' + quote(multiIndicator)
    return linkAPI
        
 
def getCalendarData(country = None, category = None, initDate = None, endDate = None, output_type = None):
    
    """
    Return calendar events.
    ===========================================================

    Parameters:
    -----------
    country: string or list.
             String to get data for one country. List of strings to get data for
             several countries. For example, country = ['United States', 'Australia'].
    category:   string or list.
             String  to get data for one category. List of strings to get data for several calendar events.
             For example, category = 'GDP Growth Rate' or 
             category = ['Exports', 'Imports']
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries without any parsing. 


    Notes
    -----
    All parameters are optional. When not supplying parameters, data for all countries and indicators will be provided. 

    Example
    -------
    getCalendarData(country = 'United States', category = 'Imports', initDate = '2011-01-01', endDate = '2016-01-01')

    getCalendarData(country = ['United States', 'India'], category = ['Imports','Exports'], initDate = '2011-01-01', endDate = '2016-01-01')
    """
    if country == None and category == None:
        linkAPI = 'https://api.tradingeconomics.com/calendar'
    elif country == None and category != None:
        country_all = 'all'
        linkAPI = paramCheck(country_all, category)
    elif type(country) is str and type(category) is str:
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(country) + '/indicator/' + quote(category)
    else:
        linkAPI = paramCheck(country, category)
    if  initDate == None and endDate == None:
        linkAPI = linkAPI
    else:
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initial date format, should be YYYY-MM-DD ')
        try: 
            fn.validate(endDate)
        except ValueError:
            raise DateError ('Incorrect end date format, should be YYYY-MM-DD ')
        try:        
            fn.validatePeriod(initDate, endDate)
        except ValueError:
            raise DateError ('Invalid time period.') 
        param=[initDate, endDate]
        linkAPI = fn.finalLink(linkAPI, param)
    try:
        linkAPI = linkAPI + '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:
        code = urlopen(linkAPI).read().decode('utf-8')
        code = code.getcode()
        webResults = json.loads(urlopen(linkAPI).read().decode('utf-8'))

    except ValueError:
        print "Error code = " + str(code)
        raise CredentialsError ('Invalid credentials')
    if len(webResults) > 0:
        names = ['date', 'country', 'category', 'event', 'reference', 'unit', 'source', 'actual', 'previous', 'forecast', 'teforecast']
        names2 = ['Date', 'Country', 'Category', 'Event', 'Reference', 'Unit', 'Source', 'Actual', 'Previous', 'Forecast', 'TEForecast']
        maindf = pd.DataFrame()  
        for i in range(len(names)):
            names[i] =  [d[names2[i]] for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)
    else:
        raise ParametersError ('No data available for the provided parameters.')  
    if output_type == None or output_type =='dict':
        output = fn.out_type(maindf)
    elif output_type == 'df': 
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError ('output_type options : df for data frame, dict(defoult) for dictionary by country, raw for unparsed results.') 
    return output

