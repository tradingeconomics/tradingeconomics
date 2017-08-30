import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import glob
import ssl

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

def getMarketsData(marketsField, output_type = None):
    """
    Returns a list of available commodities, currencies, indeces or 
    bonds and their latest values.
    ==========================================================

    Parameters:
    -----------
    marketsField: string.
            Takes either one of 'commodity','currency',
            'index' or 'bond' as options.
             
    output_type: string.
             'df'(default) for data frame,
             'raw' for list of unparsed data. 

    Example
    -------
    getMarketsData(marketsField = 'index')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
        
    fields =['commodities', 'currency', 'index', 'bonds']
    if marketsField not in fields:
        raise ParametersError ('Accepted values for marketsField are \'commodity\', \'currency\', \'index\' or \'bonds\'.')
    linkAPI = 'https://api.tradingeconomics.com/markets/' + quote(marketsField) 
    try:
        linkAPI = linkAPI + '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        code = urlopen(linkAPI)
        code = code.getcode() 
        webResults = json.loads(urlopen(linkAPI).read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        if marketsField == 'bonds':
            names = ['symbol','name', 'country', 'date', 'last', 'group','url','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','ydtchange','ydtpercentualchange','yesterday','lastweek','lastmonth','lastyear','startyear']
            names2 = ['Symbol','Name', 'Country', 'Date', 'Last', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear']
        else:
            names = ['symbol','ticker','name', 'country', 'date', 'last', 'group','url','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','ydtchange','ydtpercentualchange','yesterday','lastweek','lastmonth','lastyear','startyear']
            names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Last', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear']    
        maindf = pd.DataFrame()     
        for i in range(len(names)):
            names[i] =  [d[names2[i]] for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf.dropna()
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output
    

