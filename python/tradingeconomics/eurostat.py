import json 
import urllib 
import pandas as pd
from datetime import *
import sys
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

def checkLists(lists):
    linkAPI = 'https://api.tradingeconomics.com/eurostat/'       
    if type(lists) is str and lists == "categories":
        linkAPI += 'categories'
    elif type(lists) is str and lists == "countries":
        linkAPI += 'countries'
    return linkAPI

def checkCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/eurostat/country/'       
    if type(country) is str:
        linkAPI += quote(country, safe='')
    else:
        #multiCountry = ",".join(country)
        linkAPI += quote(",".join(country), safe='')
    return linkAPI
        
def checkcategory(category):
    linkAPI = 'https://api.tradingeconomics.com/eurostat?category='        
    if type(category) is str:
        linkAPI += quote(category, safe='')
    else:
        linkAPI += quote(",".join(category), safe='')
    return linkAPI

def checkcategory_group(category_group):
    linkAPI = 'https://api.tradingeconomics.com/eurostat?category_group='        
    if type(category_group) is str:
        linkAPI += quote(category_group, safe='')
    else:
        linkAPI += quote(",".join(category_group), safe='')
    return linkAPI

def getLinkcategory(country, category):
    linkAPI = 'https://api.tradingeconomics.com/eurostat/country/'
    if type(country) is str:
        linkAPI += quote(country)
    else:
        linkAPI += quote(",".join(country), safe='') 
    if type(category) is str:
        linkAPI += '?category=' + quote(category, safe='') 
    return linkAPI

def getLinkcategory_group(country, category_group):
    linkAPI = 'https://api.tradingeconomics.com/eurostat/country/'
    if type(country) is str:
        linkAPI += quote(country)
    else:
        linkAPI += quote(",".join(country), safe='') 
    if type(category_group) is str:
        linkAPI += '?category_group=' + quote(category_group, safe='') 
    return linkAPI

    
def getEurostatData(country = None, category = None, category_group= None, lists= None, output_type = None):
    """
     Return Eurostat data by country, category and category_group, also lists with countries and categoreies available.
    ===========================================================================

    Parameters:
    -----------
    country: string.
             String to get data for one country. 
    category: string.
             String  to get data for one category.
             For example, category = 'People at risk of income poverty after social transfers'. 
    category_group: string.
             String  to get data for one category_group.
             For example, category_group = 'Poverty'.
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries without any parsing.  

    Notes
    -----
    At least one of parameters, country or category, should be provided. 

    Example
    -------
    getEurostatData(country = 'Denmark',output_type='df')
    
    getEurostatData(country = 'Denmark', category = 'People at risk of income poverty after social transfers',output_type='df')
    
    getEurostatData(country = 'Denmark', category_group = 'Poverty',output_type='df')

    getEurostatData(category = 'People at risk of income poverty after social transfers',output_type='df')
    
    getEurostatData(category_group = 'Poverty',output_type='df')

    getEurostatData(lists='categories',output_type='df')

    getEurostatData(lists='countries',output_type='df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if country == None and category == None and category_group == None and lists == None:
        raise ValueError ('At least one of the parameters, needs to be supplied.')
    elif lists != None:
        linkAPI =checkLists(lists)
    elif country != None and category == None and category_group == None:
        linkAPI = checkCountry(country)
    elif country == None and category != None:
        linkAPI = checkcategory(category)
    elif country == None and category_group != None:
        linkAPI = checkcategory_group(category_group)
    elif country != None and category_group != None:
        linkAPI = getLinkcategory_group(country, category_group)
    elif country != None and category != None:
        linkAPI = getLinkcategory(country, category)
    try:
        if (category)is not None or (category_group) is not None:
            linkAPI += '&c=' + glob.apikey
        else:
            linkAPI += '?c=' + glob.apikey
        #print(linkAPI)
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)



def getEurostatCountries(output_type=None):
    """
    Returns List of List of countries available.
    ==========================================================
    Example
    -------
        te.getEurostatCountries(output_type='df')
    """


    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/eurostat/countries',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    

    
    api_url_request = "%s%s" % (d['url_base'],  d['key']) 

    # print(api_url_request)
    

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)
    # return


def getEurostatCategoryGroups(output_type=None):
    """
    Returns List of categories and category groups available..
    ==========================================================

    Example
    -------
        getEurostatCategoryGroups(output_type='df')
    """


    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/eurostat/categories',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    

    
    api_url_request = "%s%s" % (d['url_base'],  d['key']) 

    # print(api_url_request)
    

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)
    # return
        
