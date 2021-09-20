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


def getSearch(term = None, category = None, output_type=None):
    """
    
    You can search for keyword, term, or by category. If you do not know which category to look for, just use the search/{term} endpoint option.
    ==========================================================

    Parameters:
    -----------
    term: string .
             term ='gold'.
             term ='japan'
    category: string.
             category = 'markets'
    output_type: string.
             ''dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
        getSearch(output_type='df')
        getSearch(term='japan',category='markets',output_type='df')
        getSearch(term='gold',output_type='df')
    
    """


    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/search',
        'term': '',
        'category': '/categories',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if term:
        
        d['term'] = f'/{fn.stringOrList(term)}'
        d['category'] =''
    if term and category:
        
        d['category'] = f'?category={fn.stringOrList(category)}'
        d['key']=f'&c={glob.apikey}'

    
    api_url_request = "%s%s%s%s" % (d['url_base'], d['term'],d['category'],  d['key']) 
    # print(api_url_request)

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)
    # return



