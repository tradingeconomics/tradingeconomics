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

class DateError(ValueError):
    pass

            
def checkCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/country/'       
    if type(country) is str:
        linkAPI += quote(country.lower())
    else:
        linkAPI += quote(",".join(country), safe='')
    return linkAPI

def checkCountryRatings(country):
    linkAPI = 'https://api.tradingeconomics.com/ratings/'       
    if type(country) is str:
        linkAPI += quote(country.lower())
    else:
        linkAPI += quote(",".join(country), safe='')
    return linkAPI
   
def checkIndic(indicators, linkAPI):       
    if type(indicators) is str:
        linkAPI += '/' + quote(indicators, safe='')
    else:
        linkAPI += '/' + quote(",".join(indicators), safe='')
    return linkAPI

  

def getResults(webResults, country):
        names = ['country', 'category', 'title', 'latestvalue', 'latestvaluedate', 'source', 'unit', 'url', 'categorygroup', 'adjustment', 'frequency','historicaldatasymbol', 'createdate', 'previousvalue', 'previousvaluedate']
        names2 = ['Country', 'Category', 'Title', 'LatestValue', 'LatestValueDate',  'Source', 'Unit', 'URL', 'CategoryGroup', 'Adjustment', 'Frequency', 'HistoricalDataSymbol', 'CreateDate', 'PreviousValue', 'PreviousValueDate']
        maindf = pd.DataFrame() 
        
        for i in range(len(names)):
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['Country'] =  maindf['Country'].map(lambda x: x.strip())
        return maindf 



def getUpdateResults(webResults, date):
        names = ['country', 'category', 'historicalDataSymbol', 'lastUpdate']
        names2 = ['Country', 'Category', 'HistoricalDataSymbol', 'LastUpdate']
        maindf = pd.DataFrame() 
        
        for i in range(len(names)):
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['date'] =  maindf['date'].map(lambda x: x.strip())
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
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)  
 
def getRatings(country=None, rating = None, output_type='df'):
    """
    Return a list of all countrys by rating.
    =================================================================================
    Parameters:
    -----------
    country: string or list.
             String for one country information. List of strings for 
             several countrys, for example country = ['country_name', 'country_name'].
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    All parameters are optional. Without parameters a list of all indicators will be provided. 
    Example
    -------
    getRatings(country = 'United States', rating = None, output_type = 'df')
    getRatings(country = ['United States', 'Portugal'], rating = None, output_type = 'df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    if country == None:
        linkAPI = 'https://api.tradingeconomics.com/ratings'
    else:
        linkAPI = checkCountryRatings(country)

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
  
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)



def getDiscontinuedIndicator(country=None, output_type=None):
    """
    Returns a list of List of discontinued series for all countries, by country or multiple countries.
    =================================================================================
    Parameters:
    -----------
        country: string or list.
                list of latest updates by initial date, for example:
                country = 'china'
                country = ['united states', 'china']          
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    Without parameters a List of discontinued series for all countries will be provided. 
    
    Example
    -------
            getDiscontinuedIndicator()

            getDiscontinuedIndicator(ountry = ['united states', 'china'], output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/country',
        'country': '/all',
        'discontinued_tag' : '/discontinued',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if country:
        d['country'] = f'/{fn.stringOrList(country)}'

    api_url_request = "%s%s%s%s" % (d['url_base'], d['country'],d['discontinued_tag'],  d['key']) 
    print(api_url_request)
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)


def getIndicatorByCategoryGroup(country=None, category_group=None, output_type=None):
    """
    Returns a list of List of discontinued series for all countries, by country or multiple countries.
    =================================================================================
    Parameters:
    -----------
        country: string or list.
                country = 'china'
                country = ['united states', 'china']    
        category_group: string or list.
                category_group = 'gdp'
                category_group = 'labour'
                category_group = 'markets'

        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
     
    
    Example
    -------
            getIndicatorByCategoryGroup(country = 'united states', category_group = 'gdp', output_type = 'df')

            getIndicatorByCategoryGroup(country = ['united states', 'china'],category_group = 'markets', output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/country',
        'country': '',
        'category_group' : '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if country and category_group:
        
        
        d['country'] = f'/{fn.stringOrList(country)}'
        d['category_group']=f'&group={fn.stringOrList(category_group)}'
        api_url_request = "%s%s%s%s" % (d['url_base'], d['country'],  d['key'], d['category_group']) 
        #print(api_url_request)
        return fn.dataRequest(api_request=api_url_request, output_type=output_type)
         


    return 'Country and category are required'


def getIndicatorByTicker(ticker=None, output_type=None):
    """
    Returns a list of Specific indicator by ticker.
    =================================================================================
    Parameters:
    -----------
        ticker: string or list.
                ticker = 'USURTOT'
                ticker = ['WGDPCHIN', 'USURTOT']    
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
     
    
    Example
    -------
            getIndicatorByTicker(ticker = 'USURTOT', output_type = 'df')

            getIndicatorByTicker(ticker = ['WGDPCHIN', 'USURTOT'], output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/country',
        'country': '/country',
        'ticker' : '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if ticker:
        d['ticker']=f'/ticker/{fn.stringOrList(ticker)}'
        api_url_request = "%s%s%s" % (d['url_base'], d['ticker'],  d['key']) 
        #print(api_url_request)
        return fn.dataRequest(api_request=api_url_request, output_type=output_type)
        #return
         

    return 'Ticker is required'

    
def getLatestUpdates(country=None, init_date=None, time=None, output_type=None):
    """
    Returns Lastest Updates by country, by country and initial date, by initial date only or initial date and time.
    =================================================================================
    Parameters:
    -----------
        country: string or list.
                country = 'united states'
                country = ['united states', 'portugal']

        init_date: string format (yyyy-mm-dd).
                init_date = '2021-06-01'

         time: string format (hh:mm).
                time = '15:20'

        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    all parameters are optional.
    
    Example
    -------
            getLatestUpdates(country = 'united states', output_type = 'df')
            getLatestUpdates(country = 'united states',init_date = '2021-06-01', output_type = 'df')
            getLatestUpdates(country = ['united states','portugal'],init_date = '2021-06-01', output_type = 'df')
            getLatestUpdates(init_date = '2021-10-18', time='15:20', output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/updates',
        'country': '',
        'ticker' : '',
        'time' : '',
        'init_date': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }
    if init_date :        
        try: 
            fn.validate(init_date)
            d['init_date']=f'/{init_date}'
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
        if time:
            try:
                fn.timeValidate(time)
                d['time']=f'&time={time}'     
            except ValueError:
                raise DateError ('Incorrect time format, should be HH:MM.')

    if country:
        d['country']=f'/country/{fn.stringOrList(country)}'

        
    
    api_url_request = "%s%s%s%s%s" % (d['url_base'], d['country'],  d['init_date'],  d['key'],  d['time']) 
    print(api_url_request)
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)

         
def getPeers(country=None, category=None, ticker=None, output_type=None):
    """
    Returns indicators peers by country, by category and ticker.
    =================================================================================
    Parameters:
    -----------
        country: string
        category: string
        ticker; stirng

        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    
    Example
    -------
            getPeers(ticker ='CPI YOY', output_type = 'df')
            getPeers(country ='united states', output_type = 'df')
            getPeers(country ='united states', category ='money', output_type = 'df')
    """
   
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/peers/',
        'country': '',
        'ticker' : '',
        'category': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    if country:
        country = country.replace(' ', '%20')
        d['country']=f'country/{country}'
        if not(category is None):
            d['category']=f'/{category}'
    
    if ticker:
       d['ticker']=ticker.replace(' ', '%20')
        
    
    api_url_request = "%s%s%s%s%s" % (d['url_base'],d['ticker'], d['country'],  d['category'],  d['key']) 
    print(api_url_request)
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)

    
def getAllCountries(output_type=None):
    """
    Return a list of countries.
    =================================================================================
    Parameters:
    -----------
    output_type parameter can be 'df' or 'raw'
    Example
    -------
    getAllCountries()
    getAllCountries(out_type='df')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    linkAPI = 'https://api.tradingeconomics.com/country/'

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)