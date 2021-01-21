import json 
import urllib 
import pandas as pd
import sys
from datetime import *
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

class CredentialsError(ValueError):
    pass

class LoginError(AttributeError):
    pass

class WebRequestError(ValueError):
    pass


def checkCmtCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/comtrade/country/'

    if type(country) is str:  
        linkAPI += quote(country)   
    else:
        linkAPI +=  quote("/".join(country), safe='')
    return linkAPI 

def checkCmtPage(linkAPI, page_number):
    if page_number != None:
        linkAPI +=  '/{0}'.format(page_number) 
    
    return linkAPI

def getCmtUpdates(output_type = None):
    """
    Get latest updates information on Comtrade.
    =================================================================================

    Parameters:
    -----------         
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    with no parameters a list of last updates will be given. 

    Example
    -------
    getCmtUpdates(output_type = None)
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/comtrade/updates'
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

        names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
        names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']   
        maindf = pd.DataFrame(webResults, columns=names2)    
    
    else:  
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':        
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output



def getCmtCategories(category = None, output_type = None):
    """
    Get detailed information about Comtrade categories.
    =================================================================================

    Parameters:
    -----------
    category:list.
                List of strings of all categories.           
    output_type: string.
                'dict'(default) for dictionary format output, 'df' for data frame,
                'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A list of all categories will be given. 

    Example
    -------
    getCmtCategories(category = None, output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/categories'

    if category == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/categories/' 

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
        names = ['Id', 'name', 'parent_Id', 'pretty_Name']
        names2 = ['id', 'name', 'parentId', 'pretty_name']    
        maindf = pd.DataFrame(webResults, columns=names2)    
        
    else:
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':         
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(defoult), df for data frame or raw for unparsed results.') 
    return output

def getCmtCountry(country = None, page_number = None, output_type = None):
    """
    Get detailed information about Comtrade countries.
    =================================================================================

    Parameters:
    -----------
    country:list.
             List of strings of all categories or one country with pagination.
             for example:
                country = 'country_name' , page_number = 3
                country = ['country_name', 'country_name'], page_number = 3          
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    with no parameters a list of all categories will be given. 

    Example
    -------
    getCmtCountry(country = None, page_number = None, output_type = None)

    getCmtCountry(country = 'china' , page_number = 3, output_type = None)

    getCmtCountry(country = ['china', 'portugal'], page_number = 3, output_type = None)
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/comtrade/countries'

    if country == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/countries'
    else:
        linkAPI = checkCmtCountry(country)  
    
    if page_number != None:
        linkAPI = checkCmtPage(linkAPI, page_number)
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
        if country == None:
            names2 = ['id', 'name', 'region', 'subregion', 'iso', 'year']
        else:
            names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
            names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']   
        maindf = pd.DataFrame(webResults, columns=names2)    
    
    else:  
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':         
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output

def getCmtHistorical(symbol = None, output_type = None):
    """
    Get Historical data.
    =================================================================================

    Parameters:
    -----------
    symbol:list.
             List of strings by a specific symbol.
             for example:
                symbol = 'te_symbol'        
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A symbol is required. 

    Example
    -------
    getCmtHistorical(symbol = 'PRTESP24031', output_type = None)
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/comtrade/historical/' 
     
    if symbol == None:        
        return "A symbol is required!"
    else:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/historical/' + quote(symbol)
  
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
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':         
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df  for data frame or raw for unparsed results.') 
    return output

def getCmtTwoCountries(country1 = None, country2 = None, page_number = None, output_type = None):
    """
    Get detailed information about Comtrade between two countries.
    =================================================================================

    Parameters:
    -----------
    country:list.
             List of strings of all categories between two countries with pagination.
                
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
 
    Example
    -------
    getCmtTwoCountries(country1 = 'portugal', country2 = 'spain', page_number = 3, output_type = None)
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/comtrade/country'


    if country1 and country2 == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/country'
    else:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/country/' + quote(country1) + '/' + quote(country2)   
    
    if page_number != None:
        linkAPI = checkCmtPage(linkAPI, page_number)

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
        if country1 and country2 == None:
            names2 = ['id', 'name', 'parentId', 'pretty_name']
        else:
            names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title']
            names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title']   
        maindf = pd.DataFrame(webResults, columns=names2)    
    
    else:  
        raise ParametersError ('No data available for the provided parameters.')
    if output_type == None or output_type =='dict':
        output = webResults
    elif output_type == 'df':         
        output = maindf
    elif output_type == 'raw':        
        output = webResults
    else:      
        raise ParametersError ('output_type options : dict(default), df for data frame or raw for unparsed results.') 
    return output 

    