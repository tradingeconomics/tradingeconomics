import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import functions as fn
from . import glob
from tradingeconomics import functions as fn #remove
from tradingeconomics import glob #remove
import ssl



PY3 = sys.version_info[0] == 3
if PY3: # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else: # Python 2.X
    from urllib import urlopen
    from urllib import quote



def validateDates(initDate=None, endDate=None):
    class DateError(ValueError):
        pass
    
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

    dates_list = []
    
    if initDate is None and endDate is None:
        dates_list.append(f'')
        dates_list.append(f'')


    if (initDate is not None) and endDate == None :
        try: 
            validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD.')
            if initDate > str(date.today()):
                raise DateError ('Initial date out of range.')
        #baseLink += '&d1=' + quote(initDate)
        dates_list.append(f'/{quote(initDate)}')
        dates_list.append(f'/')
        


    if (initDate is not None) and (endDate is not None) :
        try: 
            validate(initDate)
        except ValueError:
            raise DateError ('Incorrect initDate format, should be YYYY-MM-DD.')
        try: 
            validate(endDate)
        except ValueError:
            raise DateError ('Incorrect endDate format, should be YYYY-MM-DD.')
        try:        
            validatePeriod(initDate, endDate)
        except ValueError:
            raise DateError ('Invalid time period.')
        #baseLink += '&d1=' + quote(initDate) + '&d2=' + quote(endDate)
        dates_list.append(f'/{quote(initDate)}')
        dates_list.append(f'/{quote(endDate)}')

    if initDate == None and (endDate is not None):
        raise DateError('initDate value is missing')
    return dates_list


def parseCountry(country):
    if type(country) is not str:
        return '/country/' + quote(",".join(country))
    return f'/country/{quote(country)}'


def parseIndicator(indicator):
    if type(indicator) is not str:
        return '/indicator/' + quote(",".join(indicator))
    return f'/indicator/{quote(indicator)}'



#country and indicator have be quoted!!!



def getCalendarData(country, indicator, start_date=None, end_date=None, importance=None):
    # d is a DICTIONARY
    d = {
        'url_base': 'https://api.tradingeconomics.com/calendar',
        'country': '/country/portugal,spain,brazil',
        'indicator': '/indicator/balance%20of%20trade,personal%20spending,interest%20rate',
        'start_date': '/2010-12-02',
        'end_date': '/2016-12-03',
        #'key': '?c=kjq3jx15aswdmed:77vy8tb3e7s5d45',
        'key': glob.apikey,

        'importance': '&importance=2'
    }

    if country is not None:
        d['country'] = parseCountry(country)

    if indicator is not None:
        d['indicator'] = parseIndicator(indicator)

    if start_date is not None:
        parsed_dates = validateDates(initDate=start_date, endDate=end_date)
        d['start_date'] = parsed_dates[0]
        d['end_date'] = parsed_dates[1]

    if importance is not None:
        d['importance'] = importance

    

    
    #url_string = f"{url_var_dict['url_base']}{url_var_dict['country']}{url_var_dict['indicator']}"
    url_string = "%s%s%s%s%s%s%s" % (d['url_base'], d['country'], d['indicator'], d['start_date'], d['end_date'], d['key'], d['importance'] )


    mydict = {"path": "/var/blah"}
    curr = "1.1"
    prev = "1.0"

    mystr = "path: %s curr: %s prev: %s" % (mydict['path'], curr, prev)