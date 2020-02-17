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


def checkSeriesCode(linkAPI, series_code):
    linkAPI = 'https://api.tradingeconomics.com/worldBank/indicator'     
    if series_code == None:
        linkAPI += '?c=' + glob.apikey + '&s=' + quote(str(series_code)) 
    else:
        linkAPI += '?c=' + glob.apikey + '&s=' + quote("".join(series_code)) 
       
    return linkAPI  
        
def checkPageNumber(linkAPI, page_number):
    if page_number != None:
        linkAPI +=  '/{0}'.format(page_number) 
    return linkAPI

def checkCountry(linkAPI, country):
    linkAPI = 'https://api.tradingeconomics.com/worldBank/country/'       
    if type(country) is str:
        linkAPI += quote(str(country), safe='')
    else:
        linkAPI += quote(",".join(country), safe='')
        
    return linkAPI

def checkIndicator(linkAPI, indicator): 
    linkAPI = 'https://api.tradingeconomics.com/worldBank/indicator/'     
    if type(indicator) is str:
        linkAPI +=  quote(str(indicator), safe='')
    else:
        linkAPI += quote(",".join(str(indicator), safe=''))
    
    return linkAPI
 
    

def getWBCategories(category = None, page_number = None, output_type = None):
    """
    Return a list of all categories, categories by page number.
    =================================================================================

    Parameters:
    -----------
    categories:list.
             List of strings for all categories and list of categories by page number.
             All categories, for example:
                category = None
             Several categories or one category, for example:
                category = ['education', 'agriculture']
                category = 'education'
             categories by page, for example:
                category = 'education', page_number = 3
                category = ['education', 'agriculture'], page_number = 5   
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    All parameters are optional. Without parameters a list of all categories will be provided. 

    Example
    -------
    getWBCategories(category = None, page_number = None, output_type = None)

    getWBCategories(category = ['education', 'agriculture'], page_number =3, output_type = None)
    """          
    url = ''
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    if category:
        url = 'https://api.tradingeconomics.com/worldBank/category/' + quote(str(category), safe='')
    else: 
        url = 'https://api.tradingeconomics.com/worldBank/categories'
    
    if category == None:
        linkAPI = 'https://api.tradingeconomics.com/worldBank/categories'
    else:
        linkAPI = 'https://api.tradingeconomics.com/worldBank/category/' + quote(str(category), safe='')
    
    if page_number != None:
        linkAPI = checkPageNumber(linkAPI, page_number)
     
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    print(linkAPI) 
    try:
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code)) 
    
    if len(webResults) > 0:
        if category == None:
            names2 = ['category']
        else:
            names = ['category', 'series_name', 'sub_category', 'sub_category2', 'sub_category3', 'title', 'long_defenition', 'short_defenition', 'source', 'general_comments', 'aggregation_method', 'url', 'organization', 'unit', 'verbose_unit', 'last_update']
            names2 = ['category', 'series_name', 'sub_category', 'sub_category2', 'sub_category3', 'title', 'long_defenition', 'short_defenition', 'source', 'general_comments', 'aggregation_method', 'URL', 'organization', 'unit', 'verbose_unit', 'last_update']    
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

def getWBIndicator(series_code = None, url = None, output_type = None):
    """
    Detailed information about specific indicator for all countries using a series 
    code or url.
    =================================================================================

    Parameters:
    -----------
    series_code:list.
             List of strings of indicators by series code.
             sring of indicator by country using it's url.
             Specific indicator and country by using series code, for example:
                series_code = 'usa.fr.inr.rinr'(symbol used by TE for a country)
    Url:string.            
             Specific indicator and country by using url, for example:
                url = '/united-states/real-interest-rate-percent-wb-data.html'             
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A series code or url is required. 

    Example
    -------

    getWBIndicator(series_code = 'usa.fr.inr.rinr', url = None, output_type = None)

    getWBIndicator(series_code = None, url = '/united-states/real-interest-rate-percent-wb-data.html', output_type = None)
    """          
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
   
    linkAPI = 'https://api.tradingeconomics.com/worldBank/indicator/'  
    if series_code == None and url == None:
        return "Series code or url is required!"  

    if series_code != None:
        linkAPI = 'https://api.tradingeconomics.com/worldBank/indicator' + '?c=' + glob.apikey + '&s=' + quote(str(series_code), safe='')            
    elif url != None:
        linkAPI = 'https://api.tradingeconomics.com/worldBank/indicator' + '?c=' + glob.apikey + '&url=' + quote(str(url), safe='')
         
   
    try:       
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code))  
    
    if len(webResults) > int(0):
        names = ['symbol', 'last', 'date', 'previous', 'previousDate', 'country', 'category', 'description', 'frequency', 'unit', 'title', 'url', 'lastUpdate']
        names2 = ['symbol', 'last', 'date', 'previous', 'previousDate', 'country', 'category', 'description', 'frequency', 'unit', 'title', 'URL', 'lastUpdate']
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
  
def getWBCountry(country = None, page_number = None, output_type = None):
    """
    List of indicators available for a specific country (with pagination).
    =================================================================================

    Parameters:
    -----------
    country:list.
             List of strings of indicators by country.
             country, for example:
                country = 'portugal'
    page_number:            
                country = 'portugal', page_number = 3               
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A country is required to get a list.

    Example
    -------
    getWBCountry(country = 'portugal', page_number = 3, output_type = None)
    """ 
    linkAPI = 'https://api.tradingeconomics.com/worldBank/country/'          
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
  
    if country == None:
        return "A country is required!" 
    else:
        linkAPI = checkCountry(linkAPI, country)

    if page_number != None:    
        linkAPI = checkPageNumber(linkAPI, page_number)
    
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
        names = ['symbol', 'last', 'date', 'previous', 'previousDate', 'country', 'category', 'description', 'frequency', 'unit', 'title', 'url', 'lastUpdate']
        names2 = ['symbol', 'last', 'date', 'previous', 'previousDate', 'country', 'category', 'description', 'frequency', 'unit', 'title', 'URL', 'lastUpdate']    
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

def getWBHistorical(series_code = None, output_type = None):
    """
    Historical data for a specific indicator.
    =================================================================================

    Parameters:
    -----------
    series_code:list.
             List of historical data by country.
             for example:
                series_code = None
                series_code = 'usa.fr.inr.rinr'            
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    A series code is required.

    Example
    -------
    getWBHistorical(series_code = None, output_type = None)

    getWBHistorical(series_code = 'usa.fr.inr.rinr', output_type = None)
    """          
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/worldBank/historical' 
    
    if series_code == None:
        return "A series code is required!"
    else:
        linkAPI += '?c=' + glob.apikey + '&s=' + quote(str(series_code))   
    
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
  
    
