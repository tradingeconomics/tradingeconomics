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
            
def checkCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/country/'       
    if type(country) is str:
        linkAPI += quote(country.lower())
    else:
        linkAPI += quote(",".join(country))
    return linkAPI
    
    
def checkIndic(indicators, linkAPI):       
    if type(indicators) is str:
        linkAPI += '/' + quote(indicators)
    else:
        linkAPI += '/' + quote(",".join(indicators))
    return linkAPI

 
def getResults(webResults, country):
        names = ['country', 'category', 'latestvalue', 'latestvaluedate', 'source', 'unit', 'categorygroup', 'frequency', 'previousvalue', 'previousvaluedate']
        names2 = ['Country', 'Category','LatestValue', 'LatestValueDate',  'Source', 'Unit', 'CategoryGroup', 'Frequency', 'PreviousValue', 'PreviousValueDate']
        maindf = pd.DataFrame()  
        for i in range(len(names)):
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['Country'] =  maindf['Country'].map(lambda x: x.strip())
        return maindf    

          
def getIndicatorData(country = None, indicators = None, output_type = None):
    """
    Return a list of all indicators, indicators by country or country-indicator pair.
    =================================================================================

    Parameters:
    -----------
    country: string or list.
             String for one country information. List of strings for 
             several countrys, for example country = ['country_name', 'country_name'].
    indicators: string or list.
             String for one indicator. List of strings for several indicators, for example 
             indicators = 'indicator_name' or 
             indicators = ['indicator_name', 'indicator_name']
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    All parameters are optional. Without parameters a list of all indicators will be provided. 

    Example
    -------
    getIndicatorData(country = 'United States', indicators = 'Imports', output_type = 'df')

    getIndicatorData(country = ['United States', 'Portugal'], indicators = ['Imports','Exports'])
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    if country == None:
        linkAPI = 'https://api.tradingeconomics.com/indicators/'
    else:
        linkAPI = checkCountry(country)
    
    if indicators == None:
        linkAPI = linkAPI
    else:
        linkAPI = checkIndic(indicators, linkAPI)
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        code = urlopen(linkAPI)
        code = code.getcode() 
        webResults = json.loads(urlopen(linkAPI).read().decode('utf-8'))
    except ValueError:
        raise WebRequestError ('Something went wrong. Error code = ' + str(code)) 

    if len(webResults) > 0:
        if country == None:
            print ('Without country indication only a list of available indicators will be returned...')
            output = {'Category': [d['Category'] for d in webResults], 
                        'CategoryGroup': [d['CategoryGroup'] for d in webResults]}
            return pd.DataFrame(output)
        else:
            maindf = getResults(webResults, country)  
    else:
        raise ParametersError ('No data available for the provided parameters.')

    if output_type == None or output_type =='dict':
        output = fn.out_type(maindf)
    elif output_type == 'df': 
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError ('output_type options : df for data frame, dict(defoult) for dictionary by country, raw for results directly from web.')      
    return output
  
