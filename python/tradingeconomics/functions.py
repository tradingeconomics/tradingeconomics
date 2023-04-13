
from datetime import *
import re
import itertools
import urllib
import sys
import json
import pandas as pd
import time

PY3 = sys.version_info[0] == 3

if PY3: # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else: # Python 2.X
    from urllib import urlopen
    from urllib import quote


class DateError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

def credCheck(credentials):
    #pattern = re.compile("^:$")
    #if not(pattern.match(credentials)):
    #    raise CredentialsError('Invalid credentials.')
    if ':' not in credentials:
        raise CredentialsError('Invalid credentials.')
    

def out_type(init_format, isCommodity = False):
    if isCommodity:
        list_of_countries= init_format.Title.unique()
    else:
        list_of_countries= init_format.Country.unique()
    list_of_cat= init_format.Category.unique()
    dict_start = {el:{elm:0 for elm in list_of_cat} for el in list_of_countries} 
    for i, j in itertools.product(range(len(list_of_countries)), range(len(list_of_cat))):
        if isCommodity:
            dict_cntry = init_format.loc[init_format['Title'] == list_of_countries[i]]
        else:
            dict_cntry = init_format.loc[init_format['Country'] == list_of_countries[i]]
        dict_cat = dict_cntry.loc[init_format['Category'] == list_of_cat[j]].to_dict('records')
        dict_start[list_of_countries[i]][list_of_cat[j]] = dict_cat
        for l in range(len(dict_cat)):
            if isCommodity:
                del dict_cat[l]['Title']
            else:
                del dict_cat[l]['Country']
            del dict_cat[l]['Category']
    return dict_start
       
       
def validate(date_text):      
        try:
            try:
                datetime.strptime(date_text, '%Y-%m-%d')
            except:
                datetime.strptime(date_text, '%Y-%m-%d %H:%M')
        except ValueError:
            raise DateError("Incorrect data format, should be YYYY-MM-DD")
                       
def validatePeriod(initDate, endDate):
    if  datetime.strptime(initDate, '%Y-%m-%d') > datetime.strptime(endDate, '%Y-%m-%d'):
        raise DateError ('Invalid time period, check the supplied date parameters.')

def timeValidate(clientTime):
    try:
        t = time.strptime(clientTime, '%H:%M')
        time.strftime('%H:%M', t)
    except ValueError:
        print("Incorrect time format, should be HH:MM")

def finalLink(link, prmtr):
    linkAPI  = link
    for i in range(len(prmtr)):
        if type(prmtr) == str: 
            linkAPI = linkAPI + '/' + prmtr
        linkAPI = linkAPI + '/' + str( prmtr[i])            
    return linkAPI

def stringOrList(string_or_list):
    if type(string_or_list) is not str:
        return quote(",".join(string_or_list))
    return quote(string_or_list)

def stringOrListWithAppend(string_or_list_1, string_or_list_2):
    if type(string_or_list_1) is list:
        _list_1 = [s for s in string_or_list_1]
    elif type(string_or_list_1) is str:
        _list_1 = [string_or_list_1]
    
    if type(string_or_list_2) is list:
        _list_2 = [s for s in string_or_list_2]
    elif type(string_or_list_2) is str:
        _list_2 = [string_or_list_2]

    combinations = list(itertools.product(_list_1,_list_2))
    comb = [':'.join(c) for c in combinations]
    return quote(f','.join(comb))

def dataRequest(api_request, output_type):
    def trimTheResponse(webResultsRaw):
            finalResultsList = []
            while len(webResultsRaw)>0:
                oneDict = {}
                oneItem = webResultsRaw.pop()
                oneItemTrimedArray = list(map(lambda x: [x[0],x[1].rstrip()] if (str(type(x[1])) == "<class 'str'>") else [x[0], x[1]] ,list(oneItem.items())))
                while len(oneItemTrimedArray)>0:
                    oneTrimmedItem = oneItemTrimedArray.pop(0)
                    oneDict[oneTrimmedItem[0]] = oneTrimmedItem[1]
                finalResultsList.append(oneDict)
            return finalResultsList
    def outputTypeCheck(outputType):
        if outputType not in (None, 'raw', 'dict','df'):
            raise ParametersError ('invalid output_type')
    class ParametersError(ValueError):
        pass
    

    class WebRequestError(ValueError):
        pass


    outputTypeCheck(output_type)
    
    try:
        response = urlopen(api_request)
        code = response.getcode()
        webResultsRaw = json.loads(response.read().decode('utf-8'))
        webResults = trimTheResponse(webResultsRaw)
    except ValueError:
        if code != 200:
            print(urlopen(api_request).read().decode('utf-8'))
        else: 
            raise WebRequestError ('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            
            if len(webResults) > 0:
                #names = ['country', 'category', 'historicalDataSymbol', 'lastUpdate']
                #names2 = ['Country', 'Category', 'HistoricalDataSymbol', 'LastUpdate']   
                maindf = pd.DataFrame(webResults)#columns=names2    
            
            else:
                raise ParametersError ('No data available for the provided parameters.')
            if output_type == None or output_type =='dict':
                output = webResults
                # output = maindf.to_dict('dict')
            elif output_type == 'df':        
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

def makeRequestAndParse(api_request, output_type):
    class ParametersError(ValueError):
        pass

    class WebRequestError(ValueError):
        pass


    try:
        response = urlopen(api_request)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(api_request).read().decode('utf-8'))
        else: 
            raise WebRequestError ('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            
            if len(webResults) > 0:
                #names = ['country', 'category', 'historicalDataSymbol', 'lastUpdate']
                #names2 = ['Country', 'Category', 'HistoricalDataSymbol', 'LastUpdate']   
                maindf = pd.DataFrame.from_records(webResults)#columns=names2    
            
            else:
                raise ParametersError ('No data available for the provided parameters.')
            if output_type == None or output_type =='dict':
                output = maindf.to_dict('dict')
            elif output_type == 'df':        
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

def checkDates(baseLink, initDate=None, endDate=None):
    if (initDate is not None) and endDate == None :
        try: 
            validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        baseLink += '&d1=' + quote(initDate)

    if (initDate is not None) and (endDate is not None) :
        try: 
            validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
        try: 
            validate(endDate)
        except ValueError:
            raise DateError ('Incorrect endDate format, should be YYYY-MM-DD or MM-DD-YYYY.')
        try:        
            validatePeriod(initDate, endDate)
        except ValueError:
            raise DateError ('Invalid time period.')
        baseLink += '&d1=' + quote(initDate) + '&d2=' + quote(endDate)

    if initDate == None and (endDate is not None):
        raise DateError('initDate value is missing')
    return baseLink