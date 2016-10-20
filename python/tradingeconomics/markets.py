import json 
import urllib 
import pandas as pd
from datetime import *
import re
import itertools
import functions as fn 



def getMarketsData(marketsField, output_type = None, credentials = None):
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
    credentials: string.
             User's credentials.

    Notes
    ----- 
    Without credentials only sample information will be provided.

    Example
    -------
    getMarketsData(marketsField = 'index')
    """
    fields =['commodities', 'currency', 'index', 'bonds']
    if marketsField not in fields:
        raise ValueError ('Accepted values for marketsField are \'commodity\', \'currency\', \'index\' or \'bonds\'.')
    linkAPI = 'http://api.tradingeconomics.com/markets/' + urllib.quote(marketsField) 
    if credentials == None:
        credentials = 'guest:guest'
    else:
        fn.credCheck(credentials)
    linkAPI = linkAPI + '?c=' + credentials
    webResults = json.load(urllib.urlopen(linkAPI))
    names = ['symbol','ticker','name', 'country', 'date', 'last', 'group','url','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','ydtchange','ydtpercentualchange','yesterday','lastweek','lastmonth','lastyear','startyear']
    names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Last', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear']    
    maindf = pd.DataFrame()     
    for i in range(len(names)):
        names[i] =  [d[names2[i]] for d in webResults]
        maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)
    if output_type == None or output_type =='df':        
        output = maindf.dropna()
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ValueError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output
    
