import urllib
import sys
from datetime import *
from . import glob
from . import functions as fn

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
    Returns financial data and stocks fundamental information.
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
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    If no argument is provided, returns a list of all companies.
            getFinancialsData()
    To get companies financial data by symbol:
            getFinancialsData(symbol='aapl:us', output_type='df')
            
            or
            
            getFinancialsData(symbol=['aapl:us','msft:us'], output_type='df')
    To get companies by country:
            getFinancialsData(country='united states', output_type='df')
            
            getFinancialsData(country=['united states', 'china'], output_type='df')
    """

    try:
        # d is a dictionary used for create the api url
        d = {
            'url_base': 'https://api.tradingeconomics.com/financials',
            'symbol': '',
            'country': '/companies',
            'key': f'?c={glob.apikey}',
            'output_type' : ''
        }
    except AttributeError:
        return "You are not logged in. Run te.login('guest:guest') to login"

    if country and symbol:
        return 'Cannot pass country and symbol arguments at the same time.'

    if country:
        #the 'key' value has to be changed due to url enpoint use of '?' or '&' characters. 
        d['key']=f'&c={glob.apikey}'
        d['country'] = f'/companies?country={fn.stringOrList(country)}'
    elif symbol:
        d['key']=f'&c={glob.apikey}'
        d['country'] = ''
        d['symbol'] = f'/symbol/{fn.stringOrList(symbol)}?'

    
    api_url_request = "%s%s%s%s" % (d['url_base'], d['symbol'],d['country'],  d['key']) 

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)


def getFinancialsCategoryList(output_type=None):
    """
    Returns list of categories of financial data.
    ==========================================================

    Parameters:
    -----------
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    If no argument is provided, returns a list of all categories as a dictionary.
    getFinancialsCategories()
    getFinancialsCategories(output_type='df')
    """

    try:

        d = {
            'url_base': 'https://api.tradingeconomics.com/financials/categories',
            'key': f'?c={glob.apikey}',
            'output_type' : ''
        }
    except AttributeError:
        return "You are not logged in. Run te.login('guest:guest') to login"

    api_url_request = "%s%s" % (d['url_base'], d['key'])

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)



def getFinancialsDataByCategory(category=None, output_type=None):

    """
    Returns financial data by categories.
    ==========================================================

    Parameters:
    -----------
    category: string or list.
             String to get data for category. List of strings to get data for
             several categories.
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    Get data by financial categories:
            getFinancialsDataByCategory(category='assets', output_type='df')
            
            or
            
            getFinancialsDataCategory(symbol=['assets','debt'], output_type='df')
    """

    try:
        # d is a dictionary used for create the api url
        d = {
            'url_base': 'https://api.tradingeconomics.com/financials/category',
            'symbol': f'/{category}',
            'key': f'?c={glob.apikey}',
            'output_type' : ''
        }
    except AttributeError:
        return "You are not logged in. Run te.login('guest:guest') to login"
    
    if category:
        #the 'key' value has to be changed due to url enpoint use of '?' or '&' characters. 
        d['category'] = f'/{category}'
    else:
        return 'No category supplied'


    api_url_request = "%s%s%s" % (d['url_base'], d['category'], d['key'])

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)


def getSectors(output_type=None):
    """
    Returns all sectors.
    ==========================================================

    Parameters:
    -----------

    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    
    Example
    -------
    Get data by financial categories:
            getSectors()

    """

    linkAPI = 'https://api.tradingeconomics.com/sectors/'

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
        
    linkAPI = fn.checkDates(linkAPI)
    
    try:
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)