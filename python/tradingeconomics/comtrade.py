import json
import urllib
import pandas as pd
import sys
from datetime import *
from . import functions as fn
from . import glob
import ssl

PY3 = sys.version_info[0] == 3

if PY3:  # Python 3+
    from urllib.request import urlopen
    from urllib.parse import quote
else:  # Python 2.X
    from urllib import urlopen
    from urllib import quote


class ParametersError(ValueError):
    pass


class CredentialsError(ValueError):
    pass


class LoginError(AttributeError):
    pass

class TypeError(AttributeError):
    pass


class WebRequestError(ValueError):
    pass


def checkCmtCountry(country):
    linkAPI = 'https://api.tradingeconomics.com/comtrade/country/'

    if type(country) is str:
        linkAPI += quote(country)
    else:
        linkAPI += quote("/".join(country), safe='')
    return linkAPI


def checkCmtPage(linkAPI, page_number):
    if page_number != None:
        linkAPI += '/{0}'.format(page_number)

    return linkAPI


def getCmtUpdates(output_type=None):
    """
    Get latest updates information on Comtrade.
    =================================================================================

    Parameters:
    -----------
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Notes
    -----
    with no parameters a list of last updates will be given.

    Example
    -------
    getCmtUpdates(output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/updates'
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        # print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)
        



def getCmtCategories(category=None, output_type=None):
    """
    Get detailed information about Comtrade categories.
    =================================================================================

    Parameters:
    -----------
    category:list.
                List of strings of all categories.
    output_type: string.
                'dict'(default) for dictionary format output, 'df' for data frame,
                'raw' for list of dictionaries directly from the web.

    Notes
    -----
    A list of all categories will be given.

    Example
    -------
    getCmtCategories(category = None, output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/categories'

    if category == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/categories/'

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        # print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


def getCmtCountry(country=None, page_number=None, output_type=None):
    """
    Get detailed information about Comtrade countries.
    =================================================================================

    Parameters:
    -----------
    country:list.
             List of strings of all categories or one country with pagination.
             for example:
                country = 'country_name' , page_number = 3
                country = ['country_name', 'country_name'], page_number = 3
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Notes
    -----
    with no parameters a list of all categories will be given.

    Example
    -------
    getCmtCountry(country = None, page_number = None, output_type = None)

    getCmtCountry(country = 'china' , page_number = 3, output_type = None)

    getCmtCountry(country = ['china', 'portugal'], page_number = 3, output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/countries'

    if country == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/countries'
    else:
        linkAPI = checkCmtCountry(country)

    if page_number != None:
        linkAPI = checkCmtPage(linkAPI, page_number)
    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


def getCmtHistorical(symbol=None, output_type=None):
    """
    Get Historical data.
    =================================================================================

    Parameters:
    -----------
    symbol:list.
             List of strings by a specific symbol.
             for example:
                symbol = 'te_symbol'
    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Notes
    -----
    A symbol is required.

    Example
    -------
    getCmtHistorical(symbol = 'PRTESP24031', output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/historical/'

    if symbol == None:
        return "A symbol is required!"
    else:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/historical/' + quote(symbol)

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


def getCmtTwoCountries(country1=None, country2=None, page_number=None, output_type=None):
    """
    Get detailed information about Comtrade between two countries.
    =================================================================================

    Parameters:
    -----------
    country:list.
             List of strings of all categories between two countries with pagination.

    output_type: string.
             'dict'(default) for dictionary format output, 'df' for data frame,
             'raw' for list of dictionaries directly from the web.

    Example
    -------
    getCmtTwoCountries(country1 = 'portugal', country2 = 'spain', page_number = 3, output_type = None)

    """
    try:
        _create_unverified_https_context = ssl._create_unverified_context
    except AttributeError:
        pass
    else:
        ssl._create_default_https_context = _create_unverified_https_context

    linkAPI = 'https://api.tradingeconomics.com/comtrade/country'

    if country1 and country2 == None:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/country'
    else:
        linkAPI = 'https://api.tradingeconomics.com/comtrade/country/' + quote(country1) + '/' + quote(country2)

    if page_number != None:
        linkAPI = checkCmtPage(linkAPI, page_number)

    try:
        linkAPI += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        #print(linkAPI)
        return fn.dataRequest(api_request=linkAPI, output_type=output_type)
    except Exception as e:
        print(e)


def getCmtCountryByCategory(country=None, type=None, category=None, output_type=None):
    """
        Get detailed information about Comtrade Country by Imports or Exports and by Category
        =================================================================================

        Parameters:
        -----------
        country:string.
                 for example:
                    country = 'country_name'

        type: string.
                for example:
                    type = 'import'
                    type = 'export'
        category: string.
                for example:
                    category = 'live animals'
                    category = 'Swine, live'
                    category = 'Sheep and goats, live'


        output_type: string.
                 'dict'(default) for dictionary format output, 'df' for data frame,
                 'raw' for list of dictionaries directly from the web.

        Notes
        -----
        'country' and 'type' parameters are not optional.
        if 'category' is None, returns total exports or imports with main category

        Example
        -------
        getCmtCountryByCategory(country = 'Portugal', type = 'import', category = None, output_type = None )

        getCmtCountryByCategory(country = 'United States', type = 'export', category = 'live animals', output_type = 'raw')

        getCmtCountryByCategory(country = 'Brazil', type = import, category = 'Swine, live', output_type = 'df' )

        """

    if country is None:
        return f'country is missing'
    if type is None:
        return f"type is missing. Choose 'import' or 'export'"

    def getLinkApi(country, type, category):
        api_url_base = "https://api.tradingeconomics.com/comtrade"

        if category is None:
            return f'{api_url_base}/{type}/{quote(country)}'
        return f'{api_url_base}/{type}/{quote(country)}/{quote(category)}'

    link_api = getLinkApi(country, type, category)

    try:
        link_api += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        print(link_api)
        return fn.dataRequest(api_request=link_api, output_type=output_type)
    except Exception as e:
        print(e)
        

def getCmtTotalByType(country=None, type=None, output_type=None):
    """
        Get detailed information about Comtrade Country Total by Import or Exports
        =================================================================================

        Parameters:
        -----------
        country:string.
                    for example:
                    country = 'country_name' ,

        type: string.
                for example:
                    type = 'import'
                    type = 'export'

        output_type: string.
                    'dict'(default) for dictionary format output, 'df' for data frame,
                    'raw' for list of dictionaries directly from the web.

        Notes
        -----
        country and type parameters are not optional.

        Example
        -------
        getCmtTotalByType(country = 'Portugal', type = 'import', output_type = None )

        getCmtTotalByType(country = 'United States', type = 'export', output_type = 'raw' )

        getCmtTotalByType(country = 'Brazil', type = import, output_type = 'df' )

        """


    if country is None:
        return f'country is missing'

    if type is None:
        return f"type is missing. Choose 'import' or 'export'"

    def getLinkApi(country, type):
        api_url_base = "https://api.tradingeconomics.com/comtrade"

        return f'{api_url_base}/{type}/{quote(country)}/totals/?c={glob.apikey}'

    link_api = getLinkApi(country, type)

    try:
        print(link_api)
        return fn.dataRequest(api_request=link_api, output_type=output_type)
    except Exception as e:
        print(e)

def getCmtCountryFilterByType(country1=None, country2=None, type=None, output_type=None):
    """
        Get detailed information about Comtrade Countries filter by type 'import' or 'export'
        =================================================================================

        Parameters:
        -----------
        country:string.
                 for example:
                    country1 = 'country_name'
                    country2 = 'country_name'

        type: string.
                for example:
                    type = 'import'
                    type = 'export'
        category: string.
                for example:
                    category = 'live animals'
                    category = 'Swine, live'
                    category = 'Sheep and goats, live'


        output_type: string.
                 'dict'(default) for dictionary format output, 'df' for data frame,
                 'raw' for list of dictionaries directly from the web.

        Notes
        -----
        'country1' and 'type' parameters are not optional.


        Example
        -------
        getCmtCountryFilterByType(country1 = 'Portugal', country2 = 'Spain', type = 'import' )

        getCmtCountryFilterByType(country1 = 'United States', type = 'export')


        """

    if country1 is None:
        return f'country is missing'
    if type is None:
        return f"type is missing. Choose 'import' or 'export'"

    def getLinkApi(country1, country2 ):
        api_url_base = "https://api.tradingeconomics.com/comtrade/country"

        if country2 is None:
            return f'{api_url_base}/{quote(country1)}'
        return f'{api_url_base}/{quote(country1)}/{quote(country2)}'

    link_api = getLinkApi(country1, country2)

    try:
        link_api += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        link_api += f'&type={type}'

    except AttributeError:
        raise TypeError('type is missing. Choose "import" or "export"')

    try:
        print(link_api)
        return fn.dataRequest(api_request=link_api, output_type=output_type)
    except Exception as e:
        print(e)




def getCmtTotalByTypeAndMainCategory(country=None, type=None, output_type=None):
    """
        Get detailed information about Comtrade Country Total by Import or Exports and main category
        =================================================================================

        Parameters:
        -----------
        country:string.
                    for example:
                    country = 'country_name' ,

        type: string.
                for example:
                    type = 'import'
                    type = 'export'

        output_type: string.
                    'dict'(default) for dictionary format output, 'df' for data frame,
                    'raw' for list of dictionaries directly from the web.

        Notes
        -----
        country and type parameters are not optional.

        Example
        -------
        getCmtTotalByType(country = 'Portugal', type = 'import', output_type = None )

        getCmtTotalByType(country = 'United States', type = 'export', output_type = 'raw' )

        getCmtTotalByType(country = 'Brazil', type = import, output_type = 'df' )

        """


    if country is None:
        return f'country is missing'

    if type is None:
        return f"type is missing. Choose 'import' or 'export'"

    def getLinkApi(country, type):
        api_url_base = "https://api.tradingeconomics.com/comtrade"

        return f'{api_url_base}/{type}/{quote(country)}?c={glob.apikey}'

    link_api = getLinkApi(country, type)

    try:
        print(link_api)
        return fn.dataRequest(api_request=link_api, output_type=output_type)
    except Exception as e:
        print(e)

def getCmtSnapshotByType(country=None, type=None, output_type=None):
    """
        Get Snapshot of data per country filtered by type: import or export
        =================================================================================

        Parameters:
        -----------
        country:string.
                    for example:
                    country = 'country_name' ,

        type: string.
                for example:
                    type = 'import'
                    type = 'export'

        output_type: string.
                    'dict'(default) for dictionary format output, 'df' for data frame,
                    'raw' for list of dictionaries directly from the web.

        Notes
        -----
        country and type parameters are not optional.

        Example
        -------
        getCmtSnapshotByType(country = 'Portugal', type = 'import', output_type = None )

        getCmtSnapshotByType(country = 'United States', type = 'export', output_type = 'raw' )

        getCmtSnapshotByType(country = 'Brazil', type = import, output_type = 'df' )

        """


    if country is None:
        raise ParametersError (f'country is missing')

    if type is None:
        raise ParametersError (f"type is missing. Choose 'import' or 'export'")

    def getLinkApi(country, type):
        api_url_base = "https://api.tradingeconomics.com/comtrade/country"

        return f'{api_url_base}/{quote(country)}?type={type}&c={glob.apikey}'

    link_api = getLinkApi(country, type)

    try:
        print(link_api)
        return fn.dataRequest(api_request=link_api, output_type=output_type)
    except Exception as e:
        print(e)
