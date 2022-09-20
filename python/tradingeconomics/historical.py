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
        indx = pd.DatetimeIndex(data['dates'])
        datafr = pd.DataFrame(data['values']) 
        datafr = datafr.set_index(indx)
        return datafr    
        
def multiParams(webdata):
    mycntry = list(set([d['Country'] for d in webdata]))
    myind = list(set([d['Category'] for d in webdata]))
    lst = [(d['Country'], d['Value'], d['DateTime'], d['Category']) for d in webdata] 
    lst2 = [list(i) for i in lst]
    countryDict = dict();
    for i in range(len(mycntry)):
        countryDict[mycntry[i]] = dict();
        for m in range(len(myind)):
            countryDict[mycntry[i]][myind[m]] = {'dates':list(), 'values': list()}
            for j in range(len(lst2)):                
                if lst2[j][0] == mycntry[i] and lst2[j][3] == myind[m]:
                    countryDict[mycntry[i]][myind[m]]['dates'].append(lst2[j][2])
                    countryDict[mycntry[i]][myind[m]]['values'].append(lst2[j][1])
    finalDict = multiParsedData(countryDict)                            
    return finalDict 
          
def multiParsedData(countryDict):
    CNTRY = list(countryDict.keys())
    INDCTR = list(countryDict[CNTRY[0]].keys())
    answer = [];
    for i, j in itertools.product(range(len(CNTRY)), range(len(INDCTR))):
        answer.append(parseData(countryDict[CNTRY[i]][INDCTR[j]]).to_dict('Series').values())
    empty_dict2 =  dict.fromkeys(CNTRY)
    for i in range(len(CNTRY)):
        empty_dict2[CNTRY[i]] = dict.fromkeys(INDCTR)    
    for i, j in itertools.product(range(len(CNTRY)), range(len(INDCTR))):
        empty_dict2[CNTRY[i]][INDCTR[j]] = answer[:1]
        del answer[0]       
    return empty_dict2      

def out_type(init_format):
    list_of_countries= init_format.Country.unique()
    list_of_cat= init_format.Category.unique()
    dict_start = {el:{elm:0 for elm in list_of_cat} for el in list_of_countries} 
    for i, j in itertools.product(range(len(list_of_countries)), range(len(list_of_cat))):
        dict_cntry = init_format.loc[init_format['Country'] == list_of_countries[i]]
        dict_cat = dict_cntry.loc[init_format['Category'] == list_of_cat[j]].to_dict('records')
        dict_start[list_of_countries[i]][list_of_cat[j]] = dict_cat
        for l in range(len(dict_cat)):
            del dict_cat[l]['Country']
            del dict_cat[l]['Category']
    return dict_start
            
def paramCheck (country, indicator):
    linkAPI = 'https://api.tradingeconomics.com/historical/country/'
    if type(country) is str:
        linkAPI += quote(country)
    else:
        linkAPI += quote(",".join(country), safe='') 
    if type(indicator) is str:
        linkAPI += '/indicator/' + quote(indicator, safe='')
    else:
        linkAPI += '/indicator/' + quote(",".join(indicator), safe='') 
    return linkAPI

def checkCountryHistoricalRatings(country):
    linkAPI = 'https://api.tradingeconomics.com/ratings/historical/'       
    if type(country) is str:
        linkAPI += quote(country.lower())
    else:
        linkAPI += quote(",".join(country), safe='')
    return linkAPI
    
def getRatingResults(webResults, rating):
        names = ['country','date', 'agency', 'rating', 'outlook']
        names2 = ['Country','Date', 'Agency', 'Rating', 'Outlook']
        maindf = pd.DataFrame()  
        for i in range(len(names)):  
            names[i] = [d[names2[i]]  for d in webResults]
            maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1) 
        maindf['Rating'] =  maindf['Rating'].map(lambda x: x.strip())
        return maindf

def checkRatings(linkAPI, rating):    
    if type(rating) is str:
        linkAPI += 'https://api.tradingeconomics.com/ratings/historical/' + quote(rating)
    else:
        linkAPI += 'https://api.tradingeconomics.com/ratings/historical/' + quote(",".join(rating))
    return linkAPI    


def getHistoricalData(country = None, indicator = None, initDate= None, endDate= None, output_type = None):
    """
    Return historical information for specific country and indicator.
    =================================================================
    Parameters:
    -----------
    country: string or list.
             String to get data for one country. List of strings to get data for
             several countries. For example, country = ['United States', 'Australia'].
    indicator: string or list.
             String  to get data for one category. List of strings to get data for several calendar events.
             For example, category = 'GDP Growth Rate' or 
             category = ['Exports', 'Imports']
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.
    output_type: string.
             'dict'(default) for dictionary format output,
             'raw' for list of dictionaries without any parsing.
    Notes
    ----- 
    Must choose a country and an indicator.
    Example
    -------
    getHistoricalData(country = 'United States', indicator = 'Imports', initDate = '2011-01-01', endDate = '2016-01-01')
    getHistoricalData(country = ['United States', 'china'], indicator = ['Imports','Exports'], initDate = '2011-01-01', endDate = '2016-01-01')
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if type(country) is str and type(indicator) is str: 
        linkAPI = 'https://api.tradingeconomics.com/historical/country/' + quote(country)  + '/indicator/' + quote(indicator) 
    else:
        linkAPI = paramCheck(country, indicator)
        
    if initDate == None and endDate == None:
        minDate = [(datetime.now() - relativedelta(years=15)).strftime('%Y-%m-%d') ]
        linkAPI = fn.finalLink(linkAPI, minDate) 
    if initDate == None and (endDate is not None): 
        raise DateError('initDate value is missing') 
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
        linkAPI = fn.finalLink(linkAPI, [initDate, endDate])
    if (initDate is not None) and endDate == None :        
        try: 
            fn.validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        linkAPI = fn.finalLink(linkAPI, [initDate])
   
    try:
        linkAPI += '?c='+glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)  
        

def getHistoricalRatings(country = None, rating = None, initDate = None, endDate=None, output_type = None):
    """
    Return historical information for specific country.
    =================================================================
    Parameters:
    -----------
    country: string or list.
             String to get data for one country. List of strings to get data for
             several countries. For example, country = ['United States', 'Australia'].
        output_type: string.
             'df'(default) for dictionary format output,
             'raw' for list of dictionaries without any parsing.
    Notes
    ----- 
    Without credentials only sample data will be provided.
    Example
    -------
    getHistoricalRatings(country = 'United States', rating = None)
    getHistoricalRatings(country = ['United States', 'United Kingdom'], rating = None)
    getHistoricalRatings(country = 'United States', initDate ='2011-01-01')
    getHistoricalRatings(country = 'United States', initDate ='2011-01-01', endDate = '2012-01-01')
    
    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context
    
    if country == None:
        linkAPI = 'https://api.tradingeconomics.com/ratings/historical/'    
    else:
         linkAPI = checkCountryHistoricalRatings(country)
        
    if rating == None:
        linkAPI = linkAPI
    else:
        linkAPI = checkRatings(linkAPI, rating)
    if (country == None) and (rating == None):
        linkAPI = 'https://api.tradingeconomics.com/ratings/historical/united%20states'   
    else:
        linkAPI = linkAPI
    if (initDate is not None) and (endDate == None):
        linkAPI = checkCountryHistoricalRatings(country) + "/" + initDate
    elif (initDate is not None) and (endDate is not None):
        linkAPI = checkCountryHistoricalRatings(country) + "/" + initDate + "/" + endDate
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
   
    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)   

def getHistoricalByTicker(ticker=None, start_date=None, output_type=None):
    """
    Returns historical data by ticker.
    =================================================================================
    Parameters:
    -----------
        ticker: string.
                ticker = 'USURTOT'
        start_date: string.
                start_date = '2015-03-01
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    start_date is optional 
    
    Example
    -------
            getIndicatorByTicker(ticker = 'USURTOT', output_type = 'df')

            getIndicatorByTicker(ticker = 'USURTOT', start_date = '2015-03-01, output_type = 'df')
    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/historical',
        'country': '',
        'ticker' : '',
        'start_date': '',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }
    if start_date :        
        try: 
            fn.validate(start_date)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            

    if ticker:
        d['ticker']=f'/ticker/{fn.stringOrList(ticker)}'
        d['start_date']=f'/{start_date}'
        api_url_request = "%s%s%s%s" % (d['url_base'], d['ticker'],  d['start_date'],  d['key']) 
        #print(api_url_request)
        return fn.dataRequest(api_request=api_url_request, output_type=output_type)
        #return
         

    return 'Ticker is required'


def getHistoricalUpdates(output_type=None):
    """
    Returns historical Update.
    =================================================================================
    Parameters:
    -----------
        
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getHistoricalUpdates(output_type = 'df')


    """
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/historical/updates',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }
    
    api_url_request = "%s%s" % (d['url_base'], d['key']) 
    #print(api_url_request)
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)

    
    
         

    
    
