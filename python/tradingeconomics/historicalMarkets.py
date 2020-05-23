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

def parseData(data):
    datafr = pd.DataFrame.from_dict(data)
    datafr['dates'] = pd.to_datetime(datafr['dates'], format='%d/%m/%Y' )
    indx = datafr['dates']
    datafr = datafr[['symbol','open', 'high', 'low', 'close']]
    datafr = datafr.set_index(indx)
    datafr.index.name = None
    #del datafr.index.name
    return datafr    
    
    
def fetchMarkets(symbol = None, initDate=None, endDate=None, output_type=None):
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
             'df' for dataframe,
             'raw' for list of dictionaries without any parsing.

    Notes
    ----- 
    A symbol must be provided.

    Example
    -------
    fetchMarkets(symbol = 'indu:ind')
    fetchMarkets(symbol = 'indu:ind', initDate = '2017-01-01', endDate = '2017-06-15', output_type='raw')
    fetchMarkets(symbol = ['aapl:us', 'indu:ind'], initDate = '2017-01-01', endDate = '2017-06-15')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/markets/historical/'
    
    
    if type(symbol) is not str:        
        linkAPI = 'https://api.tradingeconomics.com/markets/historical/' + quote(",".join(symbol), safe='') 
    else:   
        linkAPI = 'https://api.tradingeconomics.com/markets/historical/' + quote(symbol, safe='')
    
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

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
        linkAPI += '&d1=' + initDate + '&d2=' + endDate
    
    elif (initDate is not None) and endDate == None :        
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        linkAPI += '&d1=' + initDate
    
    elif initDate == None and (endDate is not None):
        initDate = (datetime.strptime(endDate, '%Y-%m-%d') - relativedelta(months=1)).strftime('%Y-%m-%d')
        linkAPI += '&d1=' + initDate + '&d2=' + endDate   
    
    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(linkAPI).read().decode('utf-8'))
        else: 
            raise WebRequestError ('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            if len(webResults) > 0:
                #date = [d['Date'] for d in webResults]        
                #myOpen = [d['Open'] for d in webResults]
                #myHigh = [d['High'] for d in webResults]
                #myLow = [d['Low'] for d in webResults]
                #myClose = [d['Close'] for d in webResults]
                #mySymbol = [d['Symbol'] for d in webResults]

                results = {'dates': [d['Date'] for d in webResults], 
                            'open': [d['Open'] for d in webResults], 
                            'high': [d['High'] for d in webResults], 
                            'low': [d['Low'] for d in webResults], 
                            'close': [d['Close'] for d in webResults], 
                            'symbol':[d['Symbol'] for d in webResults]}
                results = parseData(results)

            else:
                raise ParametersError ('No data available for the provided parameters.')  
            if output_type == None or output_type =='dict':        
                output = webResults
            elif output_type == 'df':
                output = results      
            elif output_type == 'raw':        
                output = webResults
            else:       
                raise ParametersError ('output_type options : dict(default) for dictionary or raw for unparsed results.')
            return output
    
        except ValueError:
            pass
    else:
        return ''
            

