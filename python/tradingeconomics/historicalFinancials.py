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
        if category.__contains__(' '):
            category = category.replace(' ', '-')
        linkAPI = f"http://api.tradingeconomics.com/financials/historical/{symbol}:{category}"
    else:
        "symbol and category are required"

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)
