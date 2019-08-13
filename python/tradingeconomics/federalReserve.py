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

def checkFedRSymbol(linkAPI, symbol):
    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/symbol/'     
    if symbol != None:
        if type(symbol) == str:
            linkAPI +=  quote(symbol)
        else:    
            linkAPI += quote("/".join(symbol), safe='')
     
    return linkAPI

def checkFedRCountry(linkAPI, country):
    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/country/'     
    if country != None:
        if type(country) == str:
            linkAPI +=  quote(country)
        else:    
            linkAPI += quote("/".join(country), safe='')
     
    return linkAPI

def checkFedRState(linkAPI, state):
    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/state/'     
    if state != None:
        if type(state) == str:
            linkAPI +=  quote(state)
        else:    
            linkAPI += quote("/".join(state), safe='')
     
    return linkAPI

def checkFedRCounty(linkAPI, county):
    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/county/'     
    if county != None:
        if type(county) == str:
            linkAPI +=  quote(county)
        else:    
            linkAPI += quote("/".join(county), safe='') 
     
    return linkAPI

def checkFedRPage(linkAPI, page_number):
    if page_number != None:
        linkAPI +=  '/{0}'.format(page_number) 
    
    return linkAPI


def getFedRStates(county = None, output_type = None):
    """
    List of all US states and list of all counties per state.
    =================================================================================

    Parameters:
    -----------
    name:list.
             List of strings of all US states.
    county:string.            
            List of all counties per state. 
                for example:
                county = 'arkansas'             
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    For all states no parameters are required. 

    Example
    -------
    getFedRStates(county = None, output_type = None)

    getFedRStates(county = 'arkansas', output_type = None)
    """
    name = ""          
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/fred/states'

    if county != None:
        linkAPI = 'https://api.tradingeconomics.com/fred/counties/' + quote("".join(county))
    
    if name == None and county == None:
        linkAPI = 'https://api.tradingeconomics.com/fred/states'  
        
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

   
    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code)) 
    
    if len(webResults) > 0:
        if county:
            names = ['county']
            names2 = ['county']
        else: 
            names = ['name']
            names2 = ['name']          
        maindf = pd.DataFrame(webResults, columns=names2)    
      
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output  


def getFedRSnaps(symbol = None, url = None, country = None, state = None, county = None, page_number = None, output_type = None):
    """
    Snapshots can be accessed through symbol, url, country, state or county. All have pagination.
    =================================================================================

    Parameters:
    -----------
    symbol:list or string.
             snapshots of sepecific symbol or list of snapshots of symbols.
             for example:
                 symbol = None
                 symbol = 'te_symbol'
    url:string.
             String of a specific url, for example:
                 url = 'specific url'
    country:list.
             In this case only a list of US will be provided.
                 country = 'united states'
    state:list.
             A list of states or one state, for example:
                 state = 'state_name'
                 state = ['state_name', 'state_name']
    county:list.            
             A list of counties or county, for example:
                  county = 'county_name' 
                  county = 'pike county, ar'
                  county = ['county_name', 'county_name' ]                     
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    At least one of the parameters must be provided. All have pagination 

    Example
    -------
    getFedRSnaps(symbol = 'AGEXMAK2A647NCEN', url = None, country = None, state = None, county = None, page_number = None, output_type = None)

    getFedRSnaps(symbol = None, url = 'united states''/united-states/white-to-non-white-racial-dissimilarity-index-for-benton-county-ar-fed-data.html', country = None, state = None, county = None, page_number = None, output_type = None)
  
    getFedRSnaps(symbol = None, url = None, country = 'united states', state = None, county = None, page_number = None, output_type = None)

    getFedRSnaps(symbol = None, url = None, country = None, state = 'tennessee', county = None, page_number = 5, output_type = None)

    getFedRSnaps(symbol = None, url = None, country = None, state = None, county = 'arkansas', page_number = 10, output_type = None)
  
    """
 
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/'

    if symbol != None: 
        linkAPI = checkFedRSymbol(linkAPI, symbol) 
    elif url != None:    
        linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/url/'+ '?c=' + glob.apikey + '&url=' + quote(str(url))      
    elif country != None:    
        linkAPI = checkFedRCountry(linkAPI, country)  
    elif state != None:   
        linkAPI = checkFedRState(linkAPI, state) 
    elif county != None:  
        linkAPI = checkFedRCounty(linkAPI, county)    
    else:                
        return "A parameter must be provided!"
    
    if page_number != None:
        linkAPI = checkFedRPage(linkAPI, page_number) +'?c=' + glob.apikey  
    else:  
        linkAPI += '?c=' + glob.apikey
    
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    
    if len(webResults) > int(0):
        names = ['symbol', 'country', 'category', 'last', 'date', 'previous', 'previousDate', 'frequency', 'popularity', 'start', 'unit', 'adjustment', 'url', 'lastUpdate' ]
        names2 = ['symbol', 'Country', 'Category', 'Last', 'Date', 'Previous', 'PreviousDate', 'Frequency', 'popularity', 'Start', 'Unit', 'Adjustment', 'URL', 'lastUpdate']
        maindf = pd.DataFrame(webResults, columns=names2)     
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(default) for data frame or raw for unparsed results.') 
    return output
  

def getFedRHistorical(symbol = None, output_type = None):
    """
    Get Historical data.
    =================================================================================

    Parameters:
    -----------
    symbol:list.
             List of strings by a specific symbol or symbols.
             for example:
                symbol = 'te_symbol'
                symbol = ['te_symbol', 'te_symbol']        
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A symbol is required. 

    Example
    -------
    getFedRHistorical(symbol = 'racedisparity005007', output_type = None)

    getFedRHistorical(symbol = ['racedisparity005007', '2020ratio002013'], output_type = None)
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/fred/historical/' 
    
    if symbol == None:
        return "A symbol is required!"
    if symbol != None:
        if type(symbol) == str:
            linkAPI +=  quote(symbol)
        else:    
            linkAPI += quote(",".join(symbol))
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request') 

    
    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code)) 
    
    if len(webResults) > 0:
        names = ['symbol', 'date', 'value']
        names2 = ['symbol', 'date', 'value']    
        maindf = pd.DataFrame(webResults, columns=names2)    
      
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output


def getFedRCounty(output_type = None):
    """
    List of Pike County, AR.
    =================================================================================

    Parameters:
    -----------
    county:list.
             List of strings of all Pike County categories.
             
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes:
    ------
    No parameters are required, because it can only be Pike County.

    Example
    -------
    getFedRCounty(output_type = None)

    """
             
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    
    linkAPI = 'https://api.tradingeconomics.com/fred/snapshot/county/Pike%20County,%20AR'
     
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    
    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code)) 
    
    if len(webResults) > 0:            
        maindf = pd.DataFrame(webResults)    
      
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : df(defoult) for data frame or raw for unparsed results.') 
    return output     