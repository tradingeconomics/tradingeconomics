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
        
    fields =['commodities', 'currency', 'index', 'bond', 'crypto']
    if marketsField not in fields:
        raise ParametersError ('Accepted values for marketsField are \'commodities\', \'currency\', \'index\', \'crypto\' or \'bond\'.')
    linkAPI = 'https://api.tradingeconomics.com/markets/' + quote(marketsField, safe='') 
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  
    
    

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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  
    
    


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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  


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
    getMarketsIntraday(symbols = ['aapl:us', 'indu:ind'], initDate='2022-01-01', endDate='2022-12-31', output_type = 'raw')
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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  

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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  

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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  

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
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')  


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
    #   output = fn.makeRequestAndParse(linkAPI, output_type)
      output = fn.dataRequest(linkAPI, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')   


def getMarketsIntradayByInterval(symbol, interval, initDate,endDate,output_type=None):
    """
    Returns Aggregate intraday prices by interval - allowed intervals: 1m, 5m, 10m, 15m, 30m, 1h, 2h, 4h.
    =================================================================================
    Parameters:
    -----------
        symbol: string.
                symbol = 'CL1:COM'
                symbol = ['CL1:COM','AAPL:US']
        interval: string
                interval='1m'
        initDate: string.
                initDate = '2021-01-01'
        endDate:string.
                endDate = '2021-01-10'
        
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getMarketsIntradayByInterval(symbol='CL1:COM',interval='1m',initDate='2022-01-01',endDate='2023-12-01',output_type='df')
            getMarketsIntradayByInterval(symbol=['CL1:COM','AAPL:US'],interval='1m',initDate='2022-01-01',endDate='2022-12-01',output_type='df')
    """
            
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/markets/intraday',
        'symbol': f'/{fn.stringOrList(symbol)}',
        'interval' : f'?agr={fn.stringOrList(interval)}',
        'init_date': '',
        'end_date':'',
        'key': f'&client={glob.apikey}',
        'output_type' : ''
    }
    if initDate and endDate :     

        fn.validate(initDate)
        fn.validate(endDate)
        fn.validatePeriod(initDate, endDate)
        # #it will parse endDate when initDate and endData are the same. 
        # endDate = (lambda x, y : f"{endDate[0:8]}{(int(endDate[8:])+1)}" if x==y else endDate)(initDate,endDate)
        # d['init_date']=f'&d1={initDate}'
        # d['end_date']=f'&d2={endDate}'

    

    api_url_request = "%s%s%s%s%s%s" % (d['url_base'], d['symbol'], d['interval'],  d['init_date'],  d['end_date'],  d['key']) 

    try:
      output = fn.dataRequest(api_url_request, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')   
    


def getMarketsStockDescriptions(symbol = None,country = None, output_type=None):
    """
    Returns Markets Descriptions
    =================================================================================
    Parameters:
    -----------
        symbol: string or list.
                symbol = 'AAPL:US'
                symbol = ['AAPL:US','FB:US']
        
        country: string or list
                country = 'france'
                countr = ['france','portugal']
        
        
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getMarketsStockDescriptions(symbol='AAPL:US',output_type='df')
            getMarketsStockDescriptions(symbol=['AAPL:US','FB:US'],output_type='df')
            getMarketsStockDescriptions(country='france',output_type='df')
            getMarketsStockDescriptions(country=['france','portugal'],output_type='df')
    """
            
    # url example: 'https://api.tradingeconomics.com/markets/stockdescriptions/symbol/aapl:us,fb:us?c=guest:guest'
    # https://api.tradingeconomics.com/markets/stockdescriptions/country/france,portugal?c=guest:guest

    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/markets/stockdescriptions',
        'symbol': '',
        'country': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if symbol:
        d['symbol'] = f'/symbol/{(fn.stringOrList(symbol))}'
    
    if country:
        d['country'] = f'/country/{(fn.stringOrList(country))}'

    if country and symbol or country is None and symbol is None:
        return 'You have to pass country or symbol'
    
    

    api_url_request = "%s%s%s%s" % (d['url_base'], d['symbol'],d['country'],  d['key']) 
    try:
      output = fn.dataRequest(api_url_request, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')   

def getMarketsSymbology(symbol = None,ticker = None, isin=None,output_type=None):
    """
    Returns Markets Descriptions
    =================================================================================
    Parameters:
    -----------
        symbol: string 
                symbol = 'AAPL:US'
                
        
        ticker: string 
                ticker = 'aapl'
                
        
        
        output_type: string.
            'dict'(default) for dictionary format output, 'df' for data frame,
            'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getMarketsSymbology(symbol='AAPL:US',output_type='df')
            getMarketsSymbology(ticker='aapl',output_type='df')
            getMarketsSymbology(isin='US0378331005',output_type='df')
            
    """
    #validateParameters
    parametersList = []
    (lambda x : parametersList.append(x) if x != None else None )(symbol) 
    (lambda x : parametersList.append(x) if x != None else None )(ticker) 
    (lambda x : parametersList.append(x) if x != None else None )(isin) 

    if len(parametersList) > 1:
      print('Only one argument must be provided for each request')
      return 
          

    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/markets/symbology',
        'symbol': '',
        'ticker': '',
        'isin': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }


    if symbol:
        d['symbol'] = f'/symbol/{(fn.stringOrList(symbol))}'
    
    if ticker:
        d['ticker'] = f'/ticker/{(fn.stringOrList(ticker))}'
    
    if isin:
        d['isin'] = f'/isin/{(fn.stringOrList(isin))}'

    api_url_request = "%s%s%s%s%s" % (d['url_base'], d['symbol'],d['ticker'],  d['isin'],d['key']) 
    try:
      output = fn.dataRequest(api_url_request, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.')   

def getStocksByCountry (country:str,output_type=None):
    """
    Returns Stocks List to a specific country
    =================================================================================
    Parameters:
    -----------
        country: string 
                symbol = 'United States'
                
        output_type: string.
            'dict'(default) for dictionary format output, 'df' for data frame,
            'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getStocksByCountry(country='United States',output_type='df')
            
    """
    
          

    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/markets/country/',
        'country': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    try:
        if type(country) == str:
            d['country'] = f'{quote(country)}'
        else:
          raise AttributeError ('country must be a string')
    except Exception as e:
      raise e
    
    

    api_url_request = "%s%s%s" % (d['url_base'], d['country'],d['key']) 
    try:
      output = fn.dataRequest(api_url_request, output_type)
      return output
    except ValueError:
      raise WebRequestError ('Something went wrong.') 