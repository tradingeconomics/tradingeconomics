import json
import itertools
import urllib 
import pandas as pd
import sys
from datetime import *
from dateutil.relativedelta import relativedelta
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

class DateError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

class LoginError(AttributeError):
    pass

class WebRequestError(ValueError):
    pass



def getHistorical(symbol = None, initDate = None, endDate = None, output_type = None, *args): 
    """
    Return historical information for specific symbol.
    =================================================================
    Parameters:
    -----------
    symbol: string or list.
             String to get data for one symbol. List of strings to get data for
             several symbols. 
            
    output_type: string.
             'dict'(default) for dictionary format output,
             'raw' for list of dictionaries without any parsing.
    Notes
    ----- 
    Must put symbol and type of data.
    Example
    -------
    te.getHistorical("indu:ind", '2015-01-01')
    te.getHistorical("indu:ind", '2015-01-01', '2017-01-01' )
    te.getHistorical("USURTOT", '2015-01-01')
    te.getHistorical(['aapl:us', 'indu:ind'])
    te.getHistorical("USURTOT")
    te.getHistorical("aapl:us")
    te.getHistorical("are.fr.inr.rinr:worldbank")
    te.getHistorical("RACEDISPARITY005007:fred")
    te.getHistorical("PRTESP24031:comtrade")
    """
    linkAPI = 'https://api.tradingeconomics.com/'
 
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if (symbol[-10:] == ':worldbank'):  
        linkAPI += 'worldBank/historical?' + 's=' + quote(symbol[:-10], safe=':') 
        
    elif (symbol[-9:] == ':comtrade'):    
        linkAPI += 'comtrade/historical/' +  quote(symbol[:-9], safe=':')  
    
    elif (symbol[-5:] == ':fred'):
        linkAPI += 'fred/historical/' + quote(symbol[:-5], safe=':')          
    
    elif(':' not in symbol and type(symbol) is str):
        linkAPI += 'historical/ticker/' + quote(symbol, safe='')
                
    elif (':' in symbol): 
        linkAPI += 'markets/historical/' + quote(symbol, safe='') 
    else:
        linkAPI += 'markets/historical/' + quote(','.join(symbol), safe='')     
    
    if (initDate is not None) and (endDate is not None):
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
        try: 
            fn.validate(endDate)
        except ValueError:
            raise DateError ('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
        try:        
            fn.validatePeriod(initDate, endDate)
        except ValueError:
            raise DateError ('Invalid time period.')
        linkAPI += '?d1=' + initDate + '&d2=' + endDate
    
    if (initDate is not None) and endDate == None :        
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        if('markets' in linkAPI):
            linkAPI += '?d1=' + initDate
        else:
            linkAPI += '/' + initDate
        
    if initDate == None and (endDate is not None):
        initDate = (datetime.strptime(endDate, '%Y-%m-%d') - relativedelta(months=1)).strftime('%Y-%m-%d')
        linkAPI += '?d1=' + initDate + '&d2=' + endDate

    try:
        if ('?' in linkAPI):
            linkAPI += '&c='+glob.apikey 
        else:   
            linkAPI += '?c='+glob.apikey
        
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e) 
            

