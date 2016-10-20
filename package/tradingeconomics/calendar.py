import json 
import urllib 
import pandas as pd
from datetime import *
import re
import itertools


def paramCheck (country, indicator = None):
    if type(country) is str and indicator == None:
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(country)
    elif type(country) is not str and indicator == None:
        multiCountry = ",".join(country)
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(multiCountry)
    elif type(country) is not str and type(indicator) is str:  
        multiCountry = ",".join(country)
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(multiCountry) + '/indicator/' + urllib.quote(indicator)
    elif type(country) is str and type(indicator) is not str:
        multiIndicator = ",".join(indicator)
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(multiIndicator) 
    else:
        multiCountry = ",".join(country)
        multiIndicator = ",".join(indicator)
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(multiCountry) + '/indicator/' + urllib.quote(multiIndicator)
    return linkAPI

    
def credCheck(credentials):
    #Check user's credentials
    pattern = re.compile("^...............:...............$")
    if pattern.match(credentials):
        print("Correct credentials format")
    else:
        raise ValueError('Incorrect credentials format')
        
        
def validate(date_text):      
        try:
            datetime.strptime(date_text, '%Y-%m-%d')
        except ValueError:
            raise ValueError("Incorrect data format, should be YYYY-MM-DD")

            
def validatePeriod(initDate, endDate):
    if  datetime.strptime(initDate, '%Y-%m-%d') > datetime.strptime(endDate, '%Y-%m-%d'):
        raise ValueError ('Incorrect time period! ')

    
def finalLink(link, prmtr):
    linkAPI  = link
    for i in range(len(prmtr)):
        if type(prmtr) == str: 
            linkAPI = linkAPI + '/' + prmtr
        linkAPI = linkAPI + '/' + str( prmtr[i])            
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
    
    
def getCalendarData(country = None, event = None, initDate = None, endDate = None, output_type = None,  credentials = None):
    
    """
    Return calendar events.
    ===========================================================

    Parameters:
    -----------
    country: string or list.
             String for one country information. List of strings for 
             several countrys, for example country = ['country_name', 'country_name'].
    event:   string or list.
             String for one event information. List of strings for several events in a
             calendar, for example event = 'event_name' or 
             event = ['event_name', 'event_name']
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    credentials: string.
             User's credentials.

    Notes
    -----
    All parameters are optional. Without parameters all daily information will be provided. 
    Without credentials default information will be provided.

    Example
    -------
    getCalendarData(country = 'United States', event = 'Imports', initDate = '2011-01-01', endDate = '2016-01-01')

    getCalendarData(country = ['United States', 'Portugal'], event = ['Imports','Exports'], initDate = '2011-01-01', endDate = '2016-01-01')
    """
    if country == None and event == None:
        linkAPI = 'http://api.tradingeconomics.com/calendar'
    elif country == None and event != None:
        country_all = 'all'
        linkAPI = paramCheck(country_all, event)
    elif type(country) is str and type(event) is str:
        linkAPI = 'http://api.tradingeconomics.com/calendar/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(event)
    else:
        linkAPI = paramCheck(country, event)
    if  initDate == None and endDate == None:
        linkAPI = linkAPI
    elif endDate > str(datetime.now()):
        raise ValueError ('End date could not be greater than actual date')
    else:
        try: 
            validate(initDate)
        except ValueError:
            raise ValueError ('Incorrect initDate format, should be YYYY-MM-DD ')
        try: 
            validate(endDate)
        except ValueError:
            raise ValueError ('Incorrect endDate format, should be YYYY-MM-DD ')
        try:        
            validatePeriod(initDate, endDate)
        except ValueError:
            raise ValueError ('Incorrect time period! ') 
        param=[initDate, endDate]
        linkAPI = finalLink(linkAPI, param)
    if credentials == None:
        credentials = 'guest:guest'
    else:
        credCheck(credentials)
    linkAPI = linkAPI + '?c=' + credentials
    webResults = json.load(urllib.urlopen(linkAPI))
    names = ['date', 'country', 'category', 'event', 'reference', 'unit', 'source', 'actual', 'previous', 'forecast', 'teforecast']
    names2 = ['Date', 'Country', 'Category', 'Event', 'Reference', 'Unit', 'Source', 'Actual', 'Previous', 'Forecast', 'TEForecast']
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
        raise ValueError ('output_type options : df for data frame, dict(defoult) for dictionary by country, raw for results directly from web.') 
    return output
