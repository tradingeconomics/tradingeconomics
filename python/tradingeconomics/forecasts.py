import json 
import urllib 
import pandas as pd
from datetime import *
import sys
from . import functions as fn
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
  
class WebRequestError(ValueError):
    pass
  
def checkCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/forecast/country/'       
    if type(country) is str:
        linkAPI += quote(country, safe='')
    else:
        #multiCountry = ",".join(country)
        linkAPI += quote(",".join(country), safe='')
    return linkAPI
        
def checkIndic(indicator):
    linkAPI = 'https://api.tradingeconomics.com/forecast/indicator/'        
    if type(indicator) is str:
        linkAPI += quote(indicator, safe='')
    else:
        #multiIndic = ",".join(indicator)
        linkAPI += quote(",".join(indicator), safe='')
    return linkAPI

def getLink(country, indicator):
    linkAPI = 'https://api.tradingeconomics.com/forecast/country/'
    if type(country) is str:
        linkAPI += quote(country)
    else:
        #multiCountry = ",".join(country)
        linkAPI += quote(",".join(country), safe='') 
    if type(indicator) is str:
        linkAPI += '/indicator/' + quote(indicator, safe='')
    else:
        #multiIndic = ",".join(indicator)
        linkAPI += '/indicator/' + quote(",".join(indicator), safe='') 
    return linkAPI

    
def getForecastData(country = None, indicator = None, output_type = None):
    """
     Return forecast values by country, by indicator, by country and indicator.
    ===========================================================================

    Parameters:
    -----------
    country: string or list.
             String to get data for one country. List of strings to get data for
             several countries. For example, country = ['United States', 'Australia'].
    indicator: string or list.
             String  to get data for one category. List of strings to get data for several calendar events.
             For example, category = 'GDP Growth Rate' or 
             category = ['Exports', 'Imports']
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries without any parsing.  

    Notes
    -----
    At least one of parameters, country or indicator, should be provided. 

    Example
    -------
    getForecastData(country = 'United States', indicator = 'Imports')

    getForecastData(country = ['United States', 'India'], indicator = ['Imports','Exports'])
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if country == None and indicator == None:
        raise ValueError ('At least one of the parameters, country or indicator, needs to be supplied.')
    elif country != None and indicator == None:
        linkAPI = checkCountry(country)
    elif country == None and indicator != None:
        linkAPI = checkIndic(indicator)
    else:
        linkAPI = getLink(country, indicator)
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)
       


def getForecastByTicker(ticker=None, output_type=None):
    """
    Returns a list of Forecast by specific ticker.
    =================================================================================
    Parameters:
    -----------
        ticker: string or list.
                ticker = 'USURTOT'
                ticker = ['WGDPCHIN', 'USURTOT']    
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
     
    
    Example
    -------
            getForecastByTicker(ticker = 'USURTOT', output_type = 'df')

            getForecastByTicker(ticker = ['WGDPCHIN', 'USURTOT'], output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/forecast',
        'country': '',
        'ticker' : '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if ticker:
        d['ticker']=f'/ticker/{fn.stringOrList(ticker)}'
        api_url_request = "%s%s%s" % (d['url_base'], d['ticker'],  d['key']) 
        # print(api_url_request)
        return fn.dataRequest(api_request=api_url_request, output_type=output_type)
        
         

    return 'Ticker is required'
        

