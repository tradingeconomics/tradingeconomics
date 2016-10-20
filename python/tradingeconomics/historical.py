import json 
import urllib 
import pandas as pd
from datetime import *
import re
import itertools
    
def parseData(data, frequency):
    if len(data) == 2:
        datafr = pd.DataFrame.from_dict(data)
        times = []
        for j in range(len(data['dates'])):
            times.append(datetime.strptime(data['dates'][j], '%Y-%m-%dT%H:%M:%S'))
        if frequency == None:
            finalfreq = timefreq(times)
        else:
            finalfreq = frequency   
        times = pd.date_range(min(times), max(times), freq=finalfreq)
        datafr = pd.DataFrame(data['values'])            
        datafr = datafr.set_index(times)
    else:
        datafr=[]
        for i in range(len(data)):
            datafr.append(pd.DataFrame.from_dict(data[i]))
            times=[]
            for j in range(len(datafr[i]['dates'])):
                times.append(datetime.strptime(data[i]['dates'][j], '%Y-%m-%dT%H:%M:%S'))
            if frequency == None:
                finalfreq = timefreq(times)
            finalfreq = frequenc
            times = pd.date_range(min(times), max(times), freq=frequency)
            datafr[i] = pd.DataFrame(datafr[i]['values'])
            datafr[i] = datafr[i].set_index(times)
    return datafr    
    
    
def multiParams(webdata):
    cntry = [d['Country'] for d in webdata]
    mycntry = list(set(cntry))
    ind = [d['Category'] for d in webdata]
    myind = list(set(ind))
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
    CNTRY = countryDict.keys()
    INDCTR = countryDict[CNTRY[0]].keys()
    answer = [];
    for i, j in itertools.product(range(len(CNTRY)), range(len(INDCTR))):
        answer.append(parseData(countryDict[CNTRY[i]][INDCTR[j]], None).to_dict('Series').values())
    empty_dict2 =  dict.fromkeys(CNTRY)
    for i in range(len(CNTRY)):
        empty_dict2[CNTRY[i]] = dict.fromkeys(INDCTR)    
    for i, j in itertools.product(range(len(CNTRY)), range(len(INDCTR))):
        empty_dict2[CNTRY[i]][INDCTR[j]] = answer[:1]
        del answer[0]       
    return empty_dict2      
    
    
def timefreq(times):
    a = times[1]
    b = times[2]
    c=(b-a).days
    if c == 1:
        frequency = 'D'
    elif c==7:
        frequency = 'w'
    elif (29 >= c) or (c <= 31) : 
        frequency = 'm'
    elif (89 >= c) or (c <= 93):
        frequency = '3m'
    else :
        frequency = 'A'
    return frequency    
    
def lowerDate(country, indicator, credentials):
    if credentials == None:
        credentials = 'guest:guest'
    linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(indicator) + '?c='+credentials;
    webResults = json.load(urllib.urlopen(linkAPI)) 
    date = [d['DateTime'] for d in webResults]
    iDate = datetime.strptime(date[0], '%Y-%m-%dT%H:%M:%S').strftime('%Y-%m-%d')
    return iDate

    
def higherDate(country, indicator, credentials):
    if credentials == None:
        credentials = 'guest:guest'
    linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(indicator) + '?c='+credentials;
    webResults = json.load(urllib.urlopen(linkAPI)) 
    date = [d['DateTime'] for d in webResults]
    eDate = datetime.strptime(date[len(date)-1], '%Y-%m-%dT%H:%M:%S').strftime('%Y-%m-%d')
    return eDate    
    
    
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

    
def credCheck(credentials):
    pattern = re.compile("^...............:...............$")
    if pattern.match(credentials):
        print("Correct credentials format")
    else:
        raise ValueError('Incorrect credentials format')

        
def paramCheck (country, indicator):
    if type(country) is not str and type(indicator) is str:  
        multiCountry = ",".join(country)
        linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(multiCountry) + '/indicator/' + urllib.quote(indicator)
    if type(country) is str and type(indicator) is not str:
        multiIndicator = ",".join(indicator)
        linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(multiIndicator)
    if type(country) is not str and type(indicator) is not str: 
        multiCountry = ",".join(country)
        multiIndicator = ",".join(indicator)
        linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(multiCountry) + '/indicator/' + urllib.quote(multiIndicator)
    return linkAPI
    
    
def getHistoricalData(country, indicator, initDate= None, endDate= None, output_type = None, credentials = None, ):
    """
    Return historical information for specific country and indicator.
    =================================================================

    Parameters:
    -----------
    country: string or list.
             String for one country information. List of strings for 
             several countrys, for example country = ['country_name', 'country_name'].
    indicator: string or list.
             String for one indicator. List of strings for several indicators, for example 
             indicator = 'indicator_name' or 
             indicator = ['indicator_name', 'indicator_name']
    initDate: string with format: YYYY-MM-DD.
             For example: '2011-01-01' 
    endDate: string with format: YYYY-MM-DD.
    output_type: string.
             'dict'(default) for dictionary format output or
             'raw' for list of dictionaries directly from the web. 
    credentials: string.
             User's credentials.

    Notes
    ----- 
    Without credentials default information will be provided.

    Example
    -------
    getHistoricalData(country = 'United States', indicator = 'Imports', initDate = '2011-01-01', endDate = '2016-01-01')

    getHistoricalData(country = ['United States', 'Portugal'], indicator = ['Imports','Exports'], initDate = '2011-01-01', endDate = '2016-01-01')
    """
    if type(country) is not str or type(indicator) is not str:  
        linkAPI = paramCheck(country, indicator)
    else:
        linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(indicator)
    if initDate == None and endDate == None:
        linkAPI = linkAPI 
    if initDate == None and (endDate is not None):
        iDate = lowerDate(country, indicator, credentials)
        try: 
            validate(endDate)
        except ValueError:
            raise ValueError ('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY')
        try:
            validatePeriod(iDate, endDate)
        except ValueError:
            raise ValueError ('Incorrect time period! ')  
        param=[iDate, endDate]
        linkAPI = finalLink(linkAPI, param)    
    if (initDate is not None) and (endDate is not None) :
        try: 
            validate(initDate)
        except ValueError:
            raise ValueError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY')
        try: 
            validate(endDate)
        except ValueError:
            raise ValueError ('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY')
        try:        
            validatePeriod(initDate, endDate)
        except ValueError:
            raise ValueError ('Incorrect time period! ')
        param=[initDate, endDate]
        linkAPI = finalLink(linkAPI, param)
    if (initDate is not None) and endDate == None :
        eDate = higherDate(country, indicator, credentials)
        try: 
            validate(initDate)
        except ValueError:
            raise ValueError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY')
            if initDate > str(date.today()):
                raise ValueError ('Initial date should be ! ')
        param=[initDate, eDate]
        linkAPI = finalLink(linkAPI, param)                 
    if credentials == None:
        credentials = 'guest:guest'
    else:
        credCheck(credentials)
    linkAPI = linkAPI + '?c='+credentials
    webResults = json.load(urllib.urlopen(linkAPI))
    if len(webResults) > 0:
        date = [d['DateTime'] for d in webResults]       
        value = [d[u'Value'] for d in webResults]
        results = {'dates': date, 'values': value}
        webfreq = webResults[0]['Frequency']
        if webfreq == 'Yearly':
            webfreq = 'A'
        elif webfreq == 'Monthly':
            webfreq = 'm'
        elif webfreq == 'Daily':
            webfreq = 'D'
        elif webfreq == 'Quaterly':
            webfreq = '3m'
        else:
            webfreq = None
        if (type(country)== str and type(indicator) == str):
            results = parseData(results, webfreq)
        else:
            results = multiParams(webResults)
    else:
        raise ValueError ('No data for provided parameters.')    
    if output_type == None or output_type =='dict':        
        output = results
    elif output_type == 'raw':        
        output = webResults
    else:       
        raise ValueError ('output_type options : df(defoult) for data frame or raw for results directly from web.')
    return output
    
