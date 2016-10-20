import json 
import urllib 
import pandas as pd
from datetime import *
import re
import itertools


def credCheck(credentials):
    pattern = re.compile("^...............:...............$")
    if pattern.match(credentials):
        print("Correct credentials format")
    else:
        raise ValueError('Incorrect credentials format')

        
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

    
def getForecastData(country = None, indicator = None, output_type = None, credentials = None):
    """
     Return forecast values by country, by indicator, by country and indicator.
    ===========================================================================

    Parameters:
    -----------
    country: string or list.
             String for one country information. List of strings for 
             several countrys, for example country = ['country_name', 'country_name'].
    indicator: string or list.
             String for one indicator information. List of strings for several indicators, 
             for example indicator = 'indicator_name' or 
             indicator = ['indicator_name', 'indicator_name']
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    credentials: string.
             User's credentials.

    Notes
    -----
    At least one of parameters, country or indicator, should be provided. 
    Without credentials default information will be provided.

    Example
    -------
    getForecastData(country = 'United States', indicator = 'Imports')

    getForecastData(country = ['United States', 'Portugal'], indicator = ['Imports','Exports'])
    """
    if country == None and indicator == None:
        raise ValueError ('At least one of parameters, country or indicator, should be indicated. ')
    elif country != None and indicator == None:
        linkAPI = checkCountry(country)
    elif country == None and indicator != None:
        linkAPI = checkIndic(indicator)
    else:
        linkAPI = getLink(country, indicator)
    if credentials == None:
        credentials = 'guest:guest'
    else:
        credCheck(credentials)
    linkAPI = linkAPI + '?c=' + credentials
    webResults = json.load(urllib.urlopen(linkAPI))
    names = ['country', 'category', 'latestvalue', 'latestvaluedate',  'yearend', 'yearend2', 'yearend3', 'q1', 'q1_date', 'q2', 'q2_date', 'q3', 'q3_date', 'q4', 'q4_date']
    names2 = ['Country', 'Category', 'LatestValue', 'LatestValueDate',  'YearEnd', 'YearEnd2', 'YearEnd3', 'q1', 'q1_date', 'q2', 'q2_date', 'q3', 'q3_date', 'q4', 'q4_date']
    maindf = pd.DataFrame()  
    for i in range(len(names)):
        names[i] =  [d[names2[i]] for d in webResults]
        maindf = pd.concat([maindf, pd.DataFrame(names[i], columns = [names2[i]])], axis = 1)  
    if output_type == None or output_type =='dict':
        output = out_type(maindf)
    elif output_type == 'df':  
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ValueError ('output_type options : df(defoult) for data frame, dict for dictionary by country, raw for results directly from web.')
    return output
