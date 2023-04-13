import sys
from datetime import *
from . import functions as fn
from . import glob
import ssl


PY3 = sys.version_info[0] == 3

if PY3: # Python 3+
    from urllib.parse import quote
else: # Python 2.X
    from urllib import quote


class ParametersError(ValueError):
    pass

class DateError(ValueError):
    pass

class CredentialsError(ValueError):
    pass

class LoginError(AttributeError):
    pass

class WebRequestError(ValueError):
    pass



def paramCheck (country, indicator = None):
    if type(country) is str and indicator == None:
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(country)
    elif type(country) is not str and indicator == None:
        multiCountry = ",".join(country)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry)
    elif type(country) is not str and type(indicator) is str:  
        multiCountry = ",".join(country)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry) + '/indicator/' + quote(indicator)
    elif type(country) is str and type(indicator) is not str:
        multiIndicator = ",".join(indicator)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(country) + '/indicator/' + quote(multiIndicator) 
    else:
        multiCountry = ",".join(country)
        multiIndicator = ",".join(indicator)
        linkAPI = 'https://api.tradingeconomics.com/calendar/country/' + quote(multiCountry) + '/indicator/' + quote(multiIndicator)
    return linkAPI
        
def checkCalendarId(id):
    linkAPI = 'https://api.tradingeconomics.com/calendar/calendarid'      
    if type(id) is str:
        linkAPI +=  '/' + quote(str(id))
    else:
        linkAPI += '/' + quote(",".join(id))
    return linkAPI

def getCalendarId(id = None, output_type = None):
    
    """
    Return calendar events by it's specific Id.
    ===========================================================

    Parameters:
    -----------
    Id: Specific Id or Ids.
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries without any parsing. 

    Notes
    -----
    All parameters are optional. When not supplying parameters, data for all calendar events will be provided. 

    Example
    -------
    getCalendarId(id = None, output_type = None)

    getCalendarId(id = 160025, output_type = None)

    getCalendarId(id = ['174108','160025','160030'], output_type = 'df')
    
    """
    
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    if id == None:
        linkAPI = 'https://api.tradingeconomics.com/calendar'
    else:
        linkAPI = checkCalendarId(id)
   
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')
    
    try:
        # print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)
        

def getCalendarData(country = None, category = None, initDate = None, endDate = None, importance=None, ticker=None, output_type = None):
    """
    Returns Lastest Updates by country, by country and initial date, by initial date only.
    =================================================================================
    Parameters:
    -----------
        country: string or list.
                country = 'united states'
                country = ['united states', 'portugal']
        category: string
                category='inflation rate'
        ticker: string or list.
                ticker = 'IJCUSA'
                ticker=['IJCUSA','SPAINFACORD','BAHRAININFNRATE']
        importance: string.
                importance = '2'
        
        initDate: string.
                initDate = '2021-01-01'
        endDate:string.
                endDate = '2021-01-03'
        
        output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    all parameters are optional.
    
    Example
    -------
            getCalendarData(output_type='df')
            getCalendarData(importance='2', output_type='df')
            getCalendarData(country='all', initDate = '2011-01-01', endDate = '2016-01-01', output_type='df')
            getCalendarData(initDate='2016-01-01', endDate='2016-01-01',importance='3', output_type='df')
            getCalendarData(country='united states',  output_type='df')
            getCalendarData(country = 'United States', initDate = '2011-01-01', endDate = '2016-01-01', output_type='df')
            getCalendarData(country='united states',initDate='2016-01-01', endDate='2016-01-01',importance='3', output_type='df')
            getCalendarData(category='inflation rate', output_type='df')
            getCalendarData(category='inflation rate',importance='2', output_type='df')
            getCalendarData(category='inflation rate',initDate='2016-03-01', endDate='2016-03-03', output_type='df')
            getCalendarData(category='inflation rate',initDate='2016-03-01', endDate='2016-03-03',importance='2', output_type='df')
            getCalendarData(country = ['United States','china'], output_type='df')
            getCalendarData(country=['united states','china'], importance='2', output_type='df')
            getCalendarData(country=['united states', 'china'], initDate = '2016-01-01', endDate = '2016-01-03', output_type='df')
            getCalendarData(country=['united states', 'china'], initDate = '2016-01-01', endDate = '2016-01-03',importance=2, output_type='df')
            getCalendarData(country = 'United States', category = 'initial jobless claims', output_type='df')
            getCalendarData(country = 'United States', category = 'initial jobless claims',initDate = '2011-01-01', endDate = '2016-01-01', output_type='df')
            getCalendarData(ticker=['IJCUSA','SPAINFACORD','BAHRAININFNRATE'], output_type='df')
            getCalendarData(ticker=['IJCUSA','SPAINFACORD','BAHRAININFNRATE'], initDate = '2021-01-01', endDate = '2021-01-03',utput_type='df')
    """
            
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/calendar',
        'country': '',
        'category' : '',
        'init_date': '',
        'end_date':'',
        'importance':'',
        'ticker':'',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }
    if initDate and endDate :     

        fn.validate(initDate)
        fn.validate(endDate)
        fn.validatePeriod(initDate, endDate)
        d['init_date']=f'/{initDate}'
        d['end_date']=f'/{endDate}'

    if ticker:
        d['ticker'] = f'/ticker/{fn.stringOrList(ticker)}'
        api_url_request = "%s%s%s%s%s" % (d['url_base'],  d['ticker'],  d['init_date'],  d['end_date'],  d['key']) 
        #print(api_url_request)
        return fn.dataRequest(api_request=api_url_request, output_type=output_type)

    if country:
        d['country']=f'/country/{fn.stringOrList(country)}'
        
    if category:
        d['category'] = f'/indicator/{fn.stringOrList(category)}'
    if importance:
        d['importance'] = f'&importance={importance}'

    if initDate and endDate and not country and not category:
        d['country'] = f'/country/all'
    

    api_url_request = "%s%s%s%s%s%s%s" % (d['url_base'], d['country'], d['category'],  d['init_date'],  d['end_date'],  d['key'], d['importance']) 
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)


def getCalendarUpdates(output_type = None):
    """
    Returns Lastest Calendar Updates
    =================================================================================
    Parameters:
    -----------
        
        
        output_type: string.
             'dict'(default) for dictionary format output, 
             'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getCalendarData(output_type='df')
            
    """
            
    
    # d is a dictionary used for create the api url
    d = {
        'url_base': 'https://api.tradingeconomics.com/calendar/updates',
        'key': f'?c={glob.apikey}',
        'output_type' : ''
    }

    api_url_request = "%s%s" % (d['url_base'], d['key']) 

    return fn.dataRequest(api_request=api_url_request, output_type=output_type)
    #return



def getCalendarEventsByGroup(group: str, country: str=None, initDate = None, endDate = None, output_type = None):
    """
    Returns calendar events of the specified group
    =================================================================================
    Parameters:
    -----------
        group: string
            bonds, inflation

        country: string, optional
            'united states'
            'china'
        
        
        output_type: string.
             'dict'(default) for dictionary format output, 
             'df' for data frame,
             'raw' for list of dictionaries directly from the web. 
    Notes
    -----
    
    
    Example
    -------
            getCalendarEventsByGroup(output_type='df')
            getCalendarEventsByGroup(country='china', group='inflation', endDate='2023-02-01', output_type='df')
            getCalendarEventsByGroup('inflation', initDate='2023-01-01', endDate='2023-02-01', output_type='dict')
            
    """

    d = {
            'url_base': 'https://api.tradingeconomics.com/calendar',
            'key': f'?c={glob.apikey}',
            'output_type' : ''
        }

    api_url_request = f"{d['url_base']}"

    if country:
        api_url_request += f"/country/{fn.stringOrList(country)}"
    
    if group:
        api_url_request += f'/group/{fn.stringOrList(group)}'
    else:
        return 'Group cannot be empty'

    if initDate and endDate:
        fn.validatePeriod(initDate, endDate)
    
    if initDate:
        fn.validate(initDate)
        api_url_request += f"/{initDate}"
    
    if endDate:
        fn.validate(endDate)
        api_url_request += f'/{endDate}'
    
    api_url_request += f"{d['key']}"
    
    return fn.dataRequest(api_request=api_url_request, output_type=output_type)