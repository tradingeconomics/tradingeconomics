import json 
import urllib 
import pandas as pd
from datetime import *

def parseData(data):
    if len(data) == 2:
        datafr = pd.DataFrame.from_dict(data)
        times=[]
        for j in range(len(data['dates'])):
            times.append(datetime.strptime(data['dates'][j], '%Y-%m-%dT%H:%M:%S')) 
        times = pd.date_range(min(times), max(times), freq='M')
        datafr = pd.DataFrame(data['values'])
        datafr = datafr.set_index(times)
    else:
        datafr=[]
        for i in range(len(data)):
            datafr.append(pd.DataFrame.from_dict(data[i]))
            times=[]
            for j in range(len(datafr[i]['dates'])):
                times.append(datetime.strptime(data[i]['dates'][j], '%Y-%m-%dT%H:%M:%S')) 
            times = pd.date_range(min(times), max(times), freq='M')
            datafr[i] = pd.DataFrame(datafr[i]['values'])
            datafr[i] = datafr[i].set_index(times)
    return datafr

def getData(country, indicator):
    linkAPI = 'http://api.tradingeconomics.com/historical/country/' + urllib.quote(country) + '/indicator/' + urllib.quote(indicator) + '?c='
    webResults = json.load(urllib.urlopen(linkAPI))
    date = [d['DateTime'] for d in webResults]       
    value = [d[u'Value'] for d in webResults]
    results = {'dates': date, 'values': value}
    results = parseData(results)
    return results



