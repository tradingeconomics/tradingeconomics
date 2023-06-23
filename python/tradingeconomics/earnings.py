import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import glob
import ssl
from . import functions as fn
from dateutil.relativedelta import relativedelta
from typing import List

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

def getEarnings(symbols: List[str]=None, country: List[str]=None, index: List[str]=None, sector: List[str] = None, initDate=None, endDate=None, output_type=None):
    """
    Returns earnings and revenues calendar data.
    ==========================================================

    Parameters:
    -----------
    symbols: string or list of strings, optional
            Get earnings and revenues for the symbol/s specified.
    
    country: string or list of strings, optional
            Get earnings and revenues from stocks of specific countries.

    index: string or list of strings, optional
            Get earnings and revenues of stocks belonging to a specific indexes.

    sector: string or list, optional
            Get earnings and revenues of stocks belonging to a specific sectors.
             
    initDate: string with format: YYYY-MM-DD.
            For example: '2022-01-01' 

    endDate: string with format: YYYY-MM-DD.
            For example: '2023-01-01'

    output_type: string.
            'dict'(default) for dictionary format output, 'df' for data frame,
            'raw' for list of dictionaries directly from the web.  

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
        
    
    linkAPI = 'https://api.tradingeconomics.com/earnings-revenues'
    if symbols and fn.isStringOrList(symbols):
        linkAPI += '/symbol/' + fn.stringOrList(symbols)

    elif country and fn.isStringOrList(country):
        linkAPI += '/country/' + fn.stringOrList(country)

    elif index and fn.isStringOrList(index):
        linkAPI += '/index/' + fn.stringOrList(index)

    elif sector and fn.isStringOrList(sector):
        linkAPI += '/sector/' + fn.stringOrList(sector)
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
        
    linkAPI = fn.checkDates(linkAPI, initDate, endDate)
    
    try:
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


def getEarningsType(type=None, output_type=None):
    """
    Returns earnings by type.
    ==========================================================

    Parameters:
    -----------
    type: string or list.
             String to get data by type.
             Type can be: earnings, ipo and dividends.

    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.  

    Example
    -------
    getEarningsType(type = 'ipo')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
        
    
    linkAPI = 'https://api.tradingeconomics.com/earnings?type=' 
    if type:
        linkAPI += quote((type), safe='')  
    try:
        linkAPI += '&c=' + glob.apikey
      
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    #print(linkAPI) 
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)