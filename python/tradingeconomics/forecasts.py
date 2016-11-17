import json 
import urllib 
import pandas as pd
from datetime import *
import functions as fn
import glob
        
def checkCountry(country):
    linkAPI = 'http://api.tradingeconomics.com/forecast/country/'       
    if type(country) is str:
        linkAPI = linkAPI + urllib.quote(country)
    else:
        multiCountry = ",".join(country)
        linkAPI = linkAPI + urllib.quote(multiCountry)
    return linkAPI
    
    
def checkIndic(indicator):
    linkAPI = 'http://api.tradingeconomics.com/forecast/indicator/'        
    if type(indicator) is str:
        linkAPI = linkAPI + urllib.quote(indicator)
    else:
        multiIndic = ",".join(indicator)
        linkAPI = linkAPI  + urllib.quote(multiIndic)
    return linkAPI


def getLink(country, indicator):
    linkAPI = 'http://api.tradingeconomics.com/forecast/country/'
    if type(country) is str:
        linkAPI = linkAPI + urllib.quote(country)
    else:
        multiCountry = ",".join(country)
        linkAPI = linkAPI + urllib.quote(multiCountry) 
    if type(indicator) is str:
        linkAPI = linkAPI + '/indicator/' + urllib.quote(indicator)
    else:
        multiIndic = ",".join(indicator)
        linkAPI = linkAPI + '/indicator/' + urllib.quote(multiIndic) 
    return linkAPI

    
def getForecastData(country = None, indicator = None, output_type = None):
    """
     Return forecast values by country, by indicator, by country and indicator.
    ===========================================================================

    Parameters:
    -----------
    country: string or list.
             String to get data for one country. List of strings to get data for
             several countries. For example, country = ['United States', 'Australia'].
    indicator: string or list.
             String  to get data for one category. List of strings to get data for several calendar events.
             For example, category = 'GDP Growth Rate' or 
             category = ['Exports', 'Imports']
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries without any parsing.  

    Notes
    -----
    At least one of parameters, country or indicator, should be provided. 

    Example
    -------
    getForecastData(country = 'United States', indicator = 'Imports')

    getForecastData(country = ['United States', 'India'], indicator = ['Imports','Exports'])
    """
    if country == None and indicator == None:
        raise ValueError ('At least one of the parameters, country or indicator, needs to be supplied.')
    elif country != None and indicator == None:
        linkAPI = checkCountry(country)
    elif country == None and indicator != None:
        linkAPI = checkIndic(indicator)
    else:
        linkAPI = getLink(country, indicator)
    try:
        linkAPI = linkAPI + '?c=' + glob.apikey
    except AttributeError:
        raise AttributeError('You need to do login before making any request')
    try:
        webResults = json.load(urllib.urlopen(linkAPI))
    except ValueError:
        raise ValueError ('Invalid credentials')
    names = ['country', 'category', 'latestvalue', 'latestvaluedate',  'yearend', 'yearend2', 'yearend3', 'q1', 'q1_date', 'q2', 'q2_date', 'q3', 'q3_date', 'q4', 'q4_date']
    names2 = ['Country', 'Category', 'LatestValue', 'LatestValueDate',  'YearEnd', 'YearEnd2', 'YearEnd3', 'q1', 'q1_date', 'q2', 'q2_date', 'q3', 'q3_date', 'q4', 'q4_date']
    maindf = pd.DataFrame()  
    for i in range(len(names)):
        names[i] =  [d[names2[i]] for d in webResults]
        maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)  
    if output_type == None or output_type =='dict':
        output = fn.out_type(maindf)
    elif output_type == 'df':  
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ValueError ('output_type options : df for data frame, dict(defoult) for dictionary by country, raw for unparsed results')
    return output
