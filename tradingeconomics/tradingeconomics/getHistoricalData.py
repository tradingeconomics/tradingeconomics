import json 
import urllib 
import pandas as pd
from datetime import *
import re
    
def parseData(data, frequency):
    if len(data) == 2:
        datafr = pd.DataFrame.from_dict(data)
        times = []
        for j in range(len(data['dates'])):
            times.append(datetime.strptime(data['dates'][j], '%Y-%m-%dT%H:%M:%S'))
        if frequency == None:
            finalfreq = timefreq(times)
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
    
    
    
def finalfreq(times):
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

    
    
def getHistoricalData(country, indicator, credentials = None, initDate= None, endDate= None):
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
        credentials = '?c=guest:guest'
    else:
        credCheck(credentials)
    linkAPI = finalLink(linkAPI, [credentials])
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
        results = parseData(results, webfreq)
    else:
        raise ValueError ('No data for provided parameters.')    
    return results
    
