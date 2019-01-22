
from datetime import *
import re
import itertools
import urllib
import sys

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
        
def out_type(init_format, country = None):
    if country.strip().lower() == 'commodity':
        list_of_countries= init_format.Title.unique()
    else:
        list_of_countries= init_format.Country.unique()
    list_of_cat= init_format.Category.unique()
    dict_start = {el:{elm:0 for elm in list_of_cat} for el in list_of_countries} 
    for i, j in itertools.product(range(len(list_of_countries)), range(len(list_of_cat))):
        if country.strip().lower() == 'commodity':
            dict_cntry = init_format.loc[init_format['Title'] == list_of_countries[i]]
        else:
            dict_cntry = init_format.loc[init_format['Country'] == list_of_countries[i]]
        dict_cat = dict_cntry.loc[init_format['Category'] == list_of_cat[j]].to_dict('records')
        dict_start[list_of_countries[i]][list_of_cat[j]] = dict_cat
        for l in range(len(dict_cat)):
            if country.strip().lower() == 'commodity':
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
        
def finalLink(link, prmtr):
    linkAPI  = link
    for i in range(len(prmtr)):
        if type(prmtr) == str: 
            linkAPI = linkAPI + '/' + prmtr
        linkAPI = linkAPI + '/' + str( prmtr[i])            
    return linkAPI

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