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

def getHistoricalFinancials(symbol=None, category=None, output_type=None):
    """
    Returns stocks fundamental information for specific symbols and categories.
    ================================================================================
    Parameters:
    -----------
    symbol: string .
            String to get data for symbol. For example, symbols = 'aapl:us'.
    category: string.
            String to get data by category.
            For example, category = 'index'

    output_type: string.
             'dict'(default), 'df' for data frame,
             'raw' for list of unparsed data.
    Example
    -------
    getHistoricalFinancials('aapl:us', 'assets', 'df')

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if symbol is not None and category is not None:
        linkAPI = f"http://api.tradingeconomics.com/financials/historical/{symbol}:{category}"
    else:
        "symbol and category are required"

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))
    if len(webResults) > 0:
        # names = ['symbol', 'country', 'date', 'type', 'last', 'url', 'importance', 'forecast1', 'forecast2',
        #          'forecast3', 'forecast4']
        # names2 = ['Symbol', 'Country', 'Date', 'Type', 'Last', 'Url', 'Importance', 'Forecast1', 'Forecast2',
        #           'Forecast3', 'Forecast4']
        maindf = pd.DataFrame(webResults)  # columns=names2

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(default), df for data frame or raw for unparsed results.')
    return output
