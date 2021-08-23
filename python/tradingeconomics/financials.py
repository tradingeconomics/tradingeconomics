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


def getFinancialsData(symbols=None, output_type=None):
    """
    Returns financial data.
    ==========================================================

    Parameters:
    -----------
    symbols: string or list.
             String to get data for symbol. List of strings to get data for
             several symbols.


    output_type: string.
             ''dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    getFinancialsData('aapl:us', 'df')
    getFinancialsData(['aapl:us', 'ea:us'], 'df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'http://api.tradingeconomics.com/financials/'
    if symbols:
        linkAPI += 'symbol/'
        if type(symbols) is not str:
            linkAPI += ",".join(symbols)
        else:
            linkAPI += symbols

    try:
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
            raise WebRequestError('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:

            if len(webResults) > 0:
                maindf = pd.DataFrame(webResults) # columns=names2

            else:
                raise ParametersError('No data available for the provided parameters.')
            if output_type == None or output_type == 'dict':
                output = webResults
            elif output_type == 'df':
                output = maindf  # .dropna()
            elif output_type == 'raw':
                output = webResults
            else:
                raise ParametersError(
                    'output_type options : dict(default), df for data frame or raw for unparsed results.')
            return output
        except ValueError:
            pass
    else:
        return ''

def stringOrList(string_or_list):
    if type(string_or_list) is not str:
        return quote(",".join(string_or_list))
    return quote(string_or_list)

def getFinancialsData2(symbol = None, country = None, output_type=None):
    # IN PROGRESS, Description is not updated
    """
    Returns financial data.
    ==========================================================

    Parameters:
    -----------
    symbols: string or list.
             String to get data for symbol. List of strings to get data for
             several symbols.


    output_type: string.
             ''dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    getFinancialsData('aapl:us', 'df')
    getFinancialsData(['aapl:us', 'ea:us'], 'df')
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
    print(api_url_request)
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)



