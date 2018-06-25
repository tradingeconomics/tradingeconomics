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


def parseData(data):
    datafr = pd.DataFrame.from_dict(data)
    datafr['dates'] = pd.to_datetime(datafr['dates'], format='%d/%m/%Y' )
    indx = datafr['dates']
    datafr = datafr[['symbol','open', 'high', 'low', 'close']]
    datafr = datafr.set_index(indx)
    del datafr.index.name
    return datafr    
    
    
def fetchMarkets(symbol, initDate= None, endDate= None, output_type = None):
    """
    Return historical information for specific markets symbol.
    =================================================================

    Parameters:
    -----------
    symbol: Unique symbol used by TradingEconomics. 
             For example: 'aapl:us'
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.
    output_type: string.
             'dict'(default) for dictionary format output,
             'raw' for list of dictionaries without any parsing.

    Notes
    ----- 
    Without credentials only sample data will be provided.

    Example
    -------
    fetchMarkets(symbol = 'indu:ind', initDate = '2017-01-01', endDate = '2017-06-15')

    fetchMarkets(symbol = ['aapl:us', 'indu:ind'])
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    if type(symbol) is list:
        symbol = ",".join(symbol)
    elif type(symbol) is str:
        pass
    else:
        raise TypeError('symbol parameter should be of the list or of the string type')

    
    linkAPI = 'https://api.tradingeconomics.com/markets/historical/' + quote(symbol) + '?c=' + glob.apikey
    

    if (initDate is not None) and (endDate is not None) :
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
        linkAPI = linkAPI + '&d1=' + initDate + '&d2=' + endDate
    
    elif (initDate is not None) and endDate == None :        
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        linkAPI = linkAPI + '&d1=' + initDate
    
    elif initDate == None and (endDate is not None):
        iDate = (datetime.strptime(endDate, '%Y-%m-%d') - relativedelta(months=1)).strftime('%Y-%m-%d')
        linkAPI = linkAPI + '&d1=' + iDate + '&d2=' + endDate

    try:
        linkAPI = linkAPI
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
    try:
        code = urlopen(linkAPI)
        code = code.getcode() 
        webResults = json.loads(urlopen(linkAPI).read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))
    if len(webResults) > 0:
        date = [d['Date'] for d in webResults]        
        myOpen = [d['Open'] for d in webResults]
        myHigh = [d['High'] for d in webResults]
        myLow = [d['Low'] for d in webResults]
        myClose = [d['Close'] for d in webResults]
        mySymbol = [d['Symbol'] for d in webResults]

        results = {'dates': date, 'open': myOpen, 'high': myHigh, 'low': myLow, 'close': myClose, 'symbol':mySymbol}
        results = parseData(results)

    else:
        raise ParametersError ('No data available for the provided parameters.')  
    if output_type == None or output_type =='dict':        
        output = results
    elif output_type == 'raw':        
        output = webResults
    else:       
        raise ParametersError ('output_type options : dict(defoult) for dictionary or raw for unparsed results.')
    return output
    

