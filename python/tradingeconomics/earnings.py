import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import glob
import ssl
from . import functions as fn
from dateutil.relativedelta import relativedelta
import time

PY3 = sys.version_info[0] == 3

if PY3: # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else: # Python 2.X
    from urllib import urlopen
    from urllib import quote


class ParametersError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

class LoginError(AttributeError):
    pass

class DateError(ValueError):
    pass

def getEarnings(symbols=None, country=None, initDate=None, endDate=None, output_type=None):
    """
    Returns earnings calendar data.
    ==========================================================

    Parameters:
    -----------
    symbols: string or list.
             String to get data for symbol. List of strings to get data for
             several symbols.
    
    country: string or list.
             String to get data for a specific country. List of strings to get data for
             several countries.

    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 

    endDate: string with format: YYYY-MM-DD.

    output_type: string.
             'df'(default) for data frame,
             'raw' for list of unparsed data. 

    Example
    -------
    getEarnings(symbols = 'msft:us', initDate='2016-01-01', endDate='2017-12-31')
    getEarnings(country = 'united states')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
        
    
    linkAPI = 'https://api.tradingeconomics.com/earnings/' 
    if symbols:
        linkAPI += 'symbol/'
        if type(symbols) is not str:
            linkAPI += quote(",".join(symbols))
        else:
            linkAPI += quote(symbols)
    elif country:
        linkAPI += 'country/'
        if type(country) is not str:
            linkAPI += quote(",".join(country))
        else:
            linkAPI += quote(country)
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
        
    linkAPI = fn.checkDates(linkAPI, initDate, endDate)
    print(linkAPI)
    try:       
        code = urlopen(linkAPI)
        code = code.getcode() 
        webResults = json.loads(urlopen(linkAPI).read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    
    if len(webResults) > 0:
        names = ['date', 'symbol', 'name', 'actual', 'forecast', 'fiscaltag', 'fiscalreference', 'calendarreference', 'country', 'currency', 'lastupdate']
        names2 = ['Date', 'Symbol', 'Name', 'Actual', 'Forecast', 'FiscalTag', 'FiscalReference', 'CalendarReference', 'Country', 'Currency', 'LastUpdate']    
        maindf = pd.DataFrame(webResults, columns=names2)     
        
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf#.dropna()
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output
