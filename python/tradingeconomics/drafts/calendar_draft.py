import json 
import urllib 
import pandas as pd
import sys
from datetime import *
from . import functions as fn
from . import glob
from tradingeconomics import functions as fn #remove before deploy
from tradingeconomics import glob #remove before deploy
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
        dates_list.append(f'{quote(initDate)}')
        dates_list.append(f'')
        


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
        dates_list.append(quote(initDate))
        dates_list.append(quote(endDate))

    if initDate == None and (endDate is not None):
        raise DateError('initDate value is missing')
    return dates_list

def stringOrList(string_or_list):
    if type(string_or_list) is not str:
        return quote(",".join(string_or_list))
    return quote(string_or_list)

# missing out-put format parameter!!!!
def getCalendarData(country=None, indicator=None, start_date=None, end_date=None, importance=None, calendar_id=None, ticker=None):
    # d is a DICTIONARY
    d = {
        'url_base': 'https://api.tradingeconomics.com/calendar',
        'country': '',
        'indicator': '',
        'start_date': '',
        'end_date': '',
        'key': f'?c={glob.apikey}',
        'importance': '',
        'calendar_id': '',
        'ticker': ''

        # 'url_base': 'https://api.tradingeconomics.com/calendar',
        # 'country': '/country/portugal,spain,brazil',
        # 'indicator': '/indicator/balance%20of%20trade,personal%20spending,interest%20rate',
        # 'start_date': '/2010-12-02',
        # 'end_date': '/2016-12-03',
        # #'key': '?c=guest:guest',
        # 'key': f'?c={glob.apikey}',
        # 'importance': '&importance=2'
    }
    #in all cases, start_date and end_date gets validation
    if start_date and end_date:
        all_selector =''

        if country is None and indicator is None and ticker is None :
            all_selector='/country/all'

        parsed_dates = validateDates(initDate=start_date, endDate=end_date)
        
        d['start_date'] = f'{all_selector}/{parsed_dates[0]}'

        d['end_date'] = f'/{parsed_dates[1]}'

    #  returns a ticker end-point specific url.
    if ticker:
        d['ticker'] = f'/ticker/{stringOrList(ticker)}'
        return "%s%s%s%s%s" % (d['url_base'],d['ticker'], d['start_date'], d['end_date'], d['key'] )
    #  return a calendar_id end-point specific url.
    if calendar_id:
        d['calendar_id'] = f'/calendarid/{stringOrList(calendar_id)}'
        return "%s%s%s" % (d['url_base'], d['calendar_id'], d['key'])

    # the next three conditions will conditionally format the end-point url. 
    # if a condition is not satisfied, nothing will be added to the url
    if country:
        d['country'] = f'/country/{stringOrList(country)}'

    if indicator:
        d['indicator'] = f'/indicator/{stringOrList(indicator)}'

    if importance:
        d['importance'] = f'&importance={importance}'
    
    return "%s%s%s%s%s%s%s" % (d['url_base'], d['country'], d['indicator'], d['start_date'], d['end_date'], d['key'], d['importance'] )

    
