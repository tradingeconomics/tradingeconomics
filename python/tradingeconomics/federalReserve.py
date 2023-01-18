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
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


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
    getFedRSnaps(symbol = 'ALLMARGATTN', url = None, country = None, state = None, county = None, output_type = None)

    getFedRSnaps(symbol = None, url = 'united states''/united-states/white-to-non-white-racial-dissimilarity-index-for-benton-county-ar-fed-data.html', country = None, state = None, county = None, page_number = None, output_type = None)
  
    getFedRSnaps(symbol = None, url = None, country = 'united states', state = None, county = None, output_type = None)

    getFedRSnaps(symbol = None, url = None, country = None, state = 'tennessee', county = None, output_type = None)

    getFedRSnaps(symbol = None, url = None, country = None, state = None, county = 'arkansas', output_type = None)
  
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
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)

def getFedRCountyOld(state=None,county=None, output_type = None):
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
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)     

def getFedRCounty(state=None,county=None, output_type = None):
    """
    List of state's counties or list of counties indicators
    =================================================================================

    Parameters:
    -----------

    state:string.
            string with state name (example: "Nevada" ).
    county:string.
            string with county name (example: "Pike County, AR" ).
            
    output_type: string.
            'dict'(default) for dictionary format output, 'df' for data frame,
            'raw' for list of dictionaries directly from the web. 
    Notes:
    ------
    

    Example
    -------
    getFedRCounty(state='nevada',output_type = None)
    getFedRCounty(county='Pike County, AR',output_type = None)

    """
            
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/fred/snapshot/county/',
        'state': '',
        'county' : '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if state:
        d['state'] = quote(state)
    if county:
        d['county'] = quote(county)

    api_url_request = "%s%s%s%s" % (d['url_base'], d['state'], d['county'],  d['key'])
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)
       


def getFedRHistorical(symbol = None, initDate=None,endDate=None, output_type = None):
    """
    Get Historical data.
    =================================================================================

    Parameters:
    -----------
    symbol:list.
             List of strings by a specific symbol or symbols.
             for example:
                symbol = 'racedisparity005007'
                symbol = ['racedisparity005007', '2020ratio002013']  
    initDate: string.
            initDate = '2018-05-01'
    endDate: string.
            endDate = '2018-06-01'    
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    
    Notes
    -----
    A symbol is required. 

    Example
    -------
    getFedRHistorical(symbol = 'racedisparity005007', output_type = 'df')

    getFedRHistorical(symbol = ['racedisparity005007', '2020ratio002013'], output_type = 'df')

    getFedRHistorical(symbol=['racedisparity005007', '2020ratio002013'],initDate='2018-05-01',output_type='df')

    getFedRHistorical(symbol=['racedisparity005007', '2020ratio002013'],initDate='2017-05-01', endDate='2019-01-01',output_type='df')

    
    """


    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/fred/historical',
        'symbol': '',
        'initDate': '',
        'endDate':'',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if initDate:     
        fn.validate(initDate)
        d['initDate']=f'&d1={initDate}'
        
    if endDate:
        fn.validate(endDate)
        d['endDate']=f'&d2={endDate}'
        fn.validatePeriod(initDate, endDate)
        

    if symbol:
        d['symbol'] = f'/{fn.stringOrList(symbol)}'
        
    
    api_url_request = "%s%s%s%s%s" % (d['url_base'], d['symbol'],  d['key'],d['initDate'],d['endDate']) 
    # print(api_url_request)
    response = fn.dataRequest(api_request=api_url_request, output_type=output_type)
    return response
    # return