import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import glob
import ssl
from . import functions as fn
from dateutil.relativedelta import relativedelta

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

class WebRequestError(ValueError):
    pass

def checkPage(linkAPI, page):
    if page != None:
        linkAPI += '&page={0}'.format(page)
    return linkAPI

def checkCategory(linkAPI, category):
    if type(category) is str:
        linkAPI += '?category=' + quote (category, safe='')
    else:
        linkAPI += '?category=' + quote(",".join(category), safe="")
    return linkAPI
   
   
def getMarketsData(marketsField, output_type=None):
    """
    Returns a list of available commodities, currencies, indexes or 
    bonds and their latest values.
    ==========================================================
    Parameters:
    -----------
    marketsField: string.
            Takes either one of 'commodity','currency',
            'index' or 'bond' as options.
             
    output_type: string.
             'dict'(default), 'df' for data frame,
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
        
    fields =['commodities', 'currency', 'index', 'bond']
    if marketsField not in fields:
        raise ParametersError ('Accepted values for marketsField are \'commodities\', \'currency\', \'index\' or \'bond\'.')
    linkAPI = 'https://api.tradingeconomics.com/markets/' + quote(marketsField, safe='') 
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
  																							
        names = ['symbol','ticker','name', 'country','Date', 'Last', 'Close', 'CloseDate', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear','decimals', 'unit', 'frequency', 'lastupdate']    
        names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Last', 'Close', 'CloseDate', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear','decimals', 'unit', 'frequency', 'LastUpdate']    
        maindf = pd.DataFrame()     
        for i in range(len(names)):
            names[i] =  [d[names2[i]] for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':          
        output = maindf#.dropna()
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getCurrencyCross(cross, output_type=None):
    """
    Returns a list of latest values available for 
    currencies and the chosen cross.
    ==========================================================
    Parameters:
    -----------
    cross: string.
            
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getCurrencyCross(cross = 'EUR')
    getCurrencyCross(cross = 'EUR', output_type='df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
        
    
    if cross is not None:       
        linkAPI = 'https://api.tradingeconomics.com/markets/currency?cross=' + quote(cross, safe='') 
    else:
        raise ParametersError ('You must provide a cross for your currency pair')
    try:
        linkAPI += '&c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
  																							
        names = ['symbol','ticker','name', 'country','Date', 'Last', 'Close', 'CloseDate', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear','decimals', 'unit', 'frequency', 'lastupdate']    
        names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Last', 'Close', 'CloseDate', 'Group','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear','decimals', 'unit', 'frequency', 'LastUpdate']    
        maindf = pd.DataFrame()     
        for i in range(len(names)):
            names[i] =  [d[names2[i]] for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':          
        output = maindf#.dropna()
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output


def getMarketsBySymbol(symbols, output_type=None):
    """
    Returns a markets information for specific symbols.
    ==========================================================
    Parameters:
    -----------
    symbols: string or list.
            String to get data for symbol. List of strings to get data for
             several symbols. For example, symbols = ['aapl:us', 'indu:ind'].
             
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsBySymbol(symbols = 'indu:ind')
    getMarketsBySymbol(symbols = ['aapl:us', 'indu:ind'], output_type = 'raw')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(symbols) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/symbol/' + quote(",".join(symbols), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/symbol/' + quote(symbols, safe='')
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        names = ['symbol','ticker','name', 'country', 'date', 'type', 'decimals', 'last', 'close', 'closedate','marketcap','URL','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','YTDchange','YTDpercentualchange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'lastupdate']    
        names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Type', 'decimals', 'Last', 'Close', 'CloseDate','MarketCap','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'LastUpdate']    
        maindf = pd.DataFrame(webResults, columns=names2)     

    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':         
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getMarketsIntraday(symbols, initDate=None, endDate=None, output_type=None):
    """
    Returns a markets intraday information for specific symbols.
    ==========================================================
    Parameters:
    -----------
    symbols: string or list.
            String to get data for symbol. List of strings to get data for
             several symbols. For example, symbols = ['aapl:us', 'indu:ind'].
    
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.    
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsIntraday(symbols = 'indu:ind')
    getMarketsIntraday(symbols = 'indu:ind', initDate='2018-03-13 15:30')
    getMarketsIntraday(symbols = ['aapl:us', 'indu:ind'], initDate='2018-03-13', endDate='2018-04-01', output_type = 'raw')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(symbols) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/intraday/' + quote(",".join(symbols), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/intraday/' + quote(symbols, safe='')
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
    linkAPI = fn.checkDates(linkAPI, initDate, endDate)
    

    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        names = ['symbol', 'date', 'open', 'high', 'low', 'close']
        names2 = ['Symbol', 'Date', 'Open', 'High', 'Low', 'Close']    
        maindf = pd.DataFrame(webResults, columns=names2)     

    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':          
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getMarketsPeers(symbols, output_type = None):
    """
    Returns a markets peers information for specific symbols.
    ==========================================================
    Parameters:
    -----------
    symbols: string or list.
            String to get data for symbol. List of strings to get data for
             several symbols. For example, symbols = ['aapl:us', 'indu:ind'].
             
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsPeers(symbols = 'indu:ind')
    getMarketsPeers(symbols = ['aapl:us', 'indu:ind'], output_type = 'raw')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(symbols) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/peers/' + quote(",".join(symbols), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/peers/' + quote(symbols, safe='')
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        names = ['symbol','ticker','name', 'country', 'date', 'type', 'decimals', 'last', 'close', 'closedate','marketcap','URL','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','YTDchange','YTDpercentualchange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'lastupdate']    
        names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Type', 'decimals', 'Last', 'Close', 'CloseDate','MarketCap','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'LastUpdate']    
        maindf = pd.DataFrame(webResults, columns=names2)     

    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':          
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getMarketsComponents(symbols, output_type = None):
    """
    Returns a stock market index components information for specific symbols.
    ==========================================================
    Parameters:
    -----------
    symbols: string or list.
            String to get data for symbol. List of strings to get data for
             several symbols. For example, symbols = ['aapl:us', 'indu:ind'].
             
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsComponents(symbols = 'psi20:ind')
    getMarketsComponents(symbols = ['psi20:ind', 'indu:ind'], output_type = 'raw')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(symbols) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/components/' + quote(",".join(symbols), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/components/' + quote(symbols, safe='')
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        names = ['symbol','ticker','name', 'country', 'date', 'type', 'decimals', 'last', 'close', 'closedate','marketcap','URL','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','YTDchange','YTDpercentualchange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'lastupdate']    
        names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Type', 'decimals', 'Last', 'Close', 'CloseDate','MarketCap','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'LastUpdate']    
        maindf = pd.DataFrame(webResults, columns=names2)     

    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':          
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getMarketsSearch(country=None, category = None, page = None, output_type = None):    
    """
    Search for country, category and page number.
    ==========================================================
    Parameters:
    -----------
    symbols: string.
            String to get data for country and category. 
    
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsSearch(country = 'japan', category = None, page = None, output_type = None)
    getMarketsSearch(country = 'japan', category = 'index', page = None, output_type = None)
    getMarketsSearch(country = 'japan', category = ['index', 'markets'], page = None, output_type = None)
    getMarketsSearch(country = 'japan', category = 'index', page = None, output_type = None)
    """
    
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(country) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/search/' + quote(",".join(country), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/search/' + quote(country, safe='')
    if (category) is not None:    
        linkAPI = checkCategory(linkAPI, category)       
    if (page) is not None:
        linkAPI = checkPage(linkAPI, page)
    
    try:
        if (category)is not None:
            linkAPI += '&c=' + glob.apikey
        else:
            linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
   
    
    
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(linkAPI).read().decode('utf-8'))
        else: 
            raise WebRequestError ('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:  
            if len(webResults) > 0:
                																								                                                                                                              			
                names = ['symbol','ticker','name', 'country', 'date', 'type', 'decimals', 'last', 'close', 'closedate','marketcap','URL','importance','dailychange','dailypercentualchange','weeklychange','weeklypercentualchange','monthlychange','monthlypercentualchange','yearlychange','yearlypercentualchange','YTDchange','YTDpercentualchange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'lastupdate']    
                names2 = ['Symbol','Ticker','Name', 'Country', 'Date', 'Type', 'decimals', 'Last', 'Close', 'CloseDate','MarketCap','URL','Importance','DailyChange','DailyPercentualChange','WeeklyChange','WeeklyPercentualChange','MonthlyChange','MonthlyPercentualChange','YearlyChange','YearlyPercentualChange','YTDChange','YTDPercentualChange','yesterday','lastWeek','lastMonth','lastYear','startYear', 'ISIN', 'frequency', 'LastUpdate']    
                maindf = pd.DataFrame(webResults, columns=names2)     

            else:
                raise ParametersError ('No data available for the provided parameters.')
            if output_type == None or output_type =='dict':
                output = webResults
            elif output_type == 'df':         
                output = maindf
            elif output_type == 'raw':        
                output = webResults
            else:      
                raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
            return output
        except ValueError:
            pass
    else:
        return ''


def getMarketsForecasts(category=None, symbol=None,  output_type = None):
    """
    Returns a stock market forecast information for specific symbols and categories.
    ================================================================================
    Parameters:
    -----------
    symbol: string or list.
            String to get data for symbol. List of strings to get data for
             several symbols. For example, symbols = ['aapl:us', 'indu:ind'].
    category: string.
            String to get data by category.  
            For example, category = 'index'         
             
    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data. 
    Example
    -------
    getMarketsForecasts(category = 'bond')
    getMarketsForecasts(symbol = ['psi20:ind', 'indu:ind'], output_type = 'df')
    getMarketsForecasts(symbol =  'indu:ind', output_type = 'df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context    
  
    if type(symbol) is list: 
        linkAPI = 'http://api.tradingeconomics.com/markets/forecasts' + '/symbol/' + quote(",".join(symbol), safe='') 
             
    else:  
       linkAPI = 'http://api.tradingeconomics.com/markets/forecasts' + '/symbol/' + quote(str(symbol)) 
    
    if category is not None:
        linkAPI = 'http://api.tradingeconomics.com/markets/forecasts/' + quote(category)
       

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    if len(webResults) > 0:
        names = ['symbol','country', 'date', 'type','last', 'url','importance','forecast1','forecast2','forecast3','forecast4']
        names2 = ['Symbol','Country', 'Date', 'Type','Last', 'Url','Importance','Forecast1','Forecast2','Forecast3','Forecast4']   
        maindf = pd.DataFrame(webResults, columns=names2)     

    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output        