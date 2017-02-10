
from datetime import *
import re
import itertools


class DateError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

def credCheck(credentials):
    pattern = re.compile("^...............:...............$")
    if not(pattern.match(credentials)):
        raise CredentialsError('Invalid credentials.')
        
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
    
    
def validate(date_text):      
        try:
            datetime.strptime(date_text, '%Y-%m-%d')
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