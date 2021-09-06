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

if PY3:  # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else:  # Python 2.X
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


def getFinancialsData(symbol = None, country = None, output_type=None):
    """
    Returns financial data.
    ==========================================================

    Parameters:
    -----------
    symbols: string or list.
             String to get data for symbol. List of strings to get data for
             several symbols.
    country: string or list.
             String to get data for country. List of strings to get data for
             several symbols.
    output_type: string.
             ''dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    If no argument is provided, returns a list of all companies.
            getFinancialsData()
    To get company ou companies by symbol:
            getFinancialsData(symbol='aapl:us', output_type='df')
            
            or
            
            getFinancialsData(symbol=['aapl:us','msft:us'], output_type='df')
    To get companies by country:
            getFinancialsData(country='united states', output_type='df')
            
            getFinancialsData(country=['united states', 'china'], output_type='df')
    """


    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/financials',
        'symbol': '',
        'country': '/companies',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if country:
        #the 'key' value has to be changed due to url enpoint use of '?' or '&' characters. 
        d['key']=f'&c={glob.apikey}'
        d['country'] = f'/companies?country={fn.stringOrList(country)}'
    if symbol:
        d['country'] = ''
        d['symbol'] = f'/symbol/{fn.stringOrList(symbol)}'

    
    api_url_request = "%s%s%s%s" % (d['url_base'], d['symbol'],d['country'],  d['key']) 
    

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)



