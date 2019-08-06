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

def checkRatings(rating, linkAPI):       
    if type(rating) is str:
        linkAPI += 'https://api.tradingeconomics.com/ratings/' + quote(rating, safe='')
    else:
        linkAPI += 'https://api.tradingeconomics.com/ratings/' + quote(",".join(rating), safe='')
    return linkAPI    

def getResults(webResults, country):
        names = ['country', 'category', 'latestvalue', 'latestvaluedate', 'source', 'unit', 'categorygroup', 'frequency', 'previousvalue', 'previousvaluedate']
        names2 = ['Country', 'Category', 'LatestValue', 'LatestValueDate',  'Source', 'Unit', 'CategoryGroup', 'Frequency', 'PreviousValue', 'PreviousValueDate']
        maindf = pd.DataFrame() 
        
        for i in range(len(names)):
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['Country'] =  maindf['Country'].map(lambda x: x.strip())
        return maindf 

def getRatingResults(webResults, rating):
        names = ['country', 'te', 'te_outlook', 'sp', 'sp_outlook', 'moodys', 'moodys_outlook', 'fitch', 'fitch_outlook', 'outlook']
        names2 = ['Country','Te', 'Te_Outlook', 'Sp', 'Sp_Outlook', 'Moodys', 'Moodys_Outlook', 'Fitch', 'Fitch_Outlook', 'Outlook']
        maindf = pd.DataFrame()  
        for i in range(len(names)):  
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['Rating'] =  maindf['Rating'].map(lambda x: x.strip())
        return maindf

def getUpdateResults(webResults, date):
        names = ['historicalDataSymbol', 'lastUpdate']
        names2 = ['HistoricalDataSymbol', 'LastUpdate']
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
        except ValueError:
            pass
    else:
        return ''   
 
def getRatings(country=['united states', 'china'], rating = None, output_type='df'):
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
        linkAPI = 'https://api.tradingeconomics.com/ratings/'
    else:
        linkAPI = checkCountryRatings(country)
    
    if rating == None:
        linkAPI = linkAPI
    else:
        linkAPI = checkRatings(rating, linkAPI)
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

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
                names = ['country', 'te', 'te_outlook', 'sp', 'sp_outlook', 'moodys', 'moodys_outlook', 'fitch', 'fitch_outlook', 'outlook']
                names2 = ['Country','TE', 'TE_Outlook', 'SP', 'SP_Outlook', 'Moodys', 'Moodys_Outlook', 'Fitch', 'Fitch_Outlook', 'Outlook']    
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
    
        except ValueError:
            pass
    else:
        return ''

def getLatestUpdates(initDate = None, output_type = None):
    """
    Return a list of latest updates, and last updates by initial date.
    =================================================================================

    Parameters:
    -----------
        initDate:string or list.
                 list of latest updates by initial date, for example:
                 initDate = '2018-08-15'          
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 

    Notes
    -----
    Without parameters a list of latest updates will be provided. 

    Example
    -------
    getLatestUpdates(initDate = None, output_type = None)

    getLatestUpdates(initDate = '2018-08-15', output_type = None)

    """
    
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    if initDate == None:
        
            linkAPI = 'https://api.tradingeconomics.com/updates/'
        
    if initDate != None:
        if type(initDate) == str:
            linkAPI =  'https://api.tradingeconomics.com/updates/' + initDate 
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

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
                names = ['historicalDataSymbol', 'lastUpdate']
                names2 = ['HistoricalDataSymbol', 'LastUpdate']    
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
        except ValueError:
            pass
    else:
        return ''  

