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
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))

    if len(webResults) > 0:

        names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
        names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
        maindf = pd.DataFrame(webResults, columns=names2)

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(default), df for data frame or raw for unparsed results.')
    return output


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
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))

    if len(webResults) > 0:
        names = ['Id', 'name', 'parent_Id', 'pretty_Name']
        names2 = ['id', 'name', 'parentId', 'pretty_name']
        maindf = pd.DataFrame(webResults, columns=names2)

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(defoult), df for data frame or raw for unparsed results.')
    return output


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
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))

    if len(webResults) > 0:
        if country == None:
            names2 = ['id', 'name', 'region', 'subregion', 'iso', 'year']
        else:
            names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
            names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title', 'lastupdate']
        maindf = pd.DataFrame(webResults, columns=names2)

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(default), df for data frame or raw for unparsed results.')
    return output


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
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))

    if len(webResults) > 0:
        names = ['symbol', 'date', 'value']
        names2 = ['symbol', 'date', 'value']
        maindf = pd.DataFrame(webResults, columns=names2)

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(default), df  for data frame or raw for unparsed results.')
    return output


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
        response = urlopen(linkAPI)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        raise WebRequestError('Something went wrong. Error code = ' + str(code))

    if len(webResults) > 0:
        if country1 and country2 == None:
            names2 = ['id', 'name', 'parentId', 'pretty_name']
        else:
            names = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title']
            names2 = ['symbol', 'country1', 'country2', 'type', 'category', 'url', 'title']
        maindf = pd.DataFrame(webResults, columns=names2)

    else:
        raise ParametersError('No data available for the provided parameters.')
    if output_type == None or output_type == 'dict':
        output = webResults
    elif output_type == 'df':
        output = maindf
    elif output_type == 'raw':
        output = webResults
    else:
        raise ParametersError('output_type options : dict(default), df for data frame or raw for unparsed results.')
    return output


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
        response = urlopen(link_api)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(link_api).read().decode('utf-8'))
        else:
            raise WebRequestError('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            if len(webResults) > 0:

                maindf = pd.DataFrame(webResults)

            else:
                raise ParametersError('No data available for the provided parameters.')
            if output_type is None or output_type == 'dict':
                output = webResults
            elif output_type == 'df':
                output = maindf
            elif output_type == 'raw':
                output = webResults
            else:
                raise ParametersError(
                    'output_type options : df for data frame, dict(default) for dictionary by country, raw for unparsed results.')
            return output
        except ValueError:
            pass
    else:
        return ''

def getTotalByType(country=None, type=None, output_type=None):
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
            getCmtTotalType(country = 'Portugal', type = 'import', output_type = None )

            getCmtTotalType(country = 'United States', type = 'export', output_type = 'raw' )

            getCmtTotalType(country = 'Brazil', type = import, output_type = 'df' )

            """


    if country is None:
        return f'country is missing'

    if type is None:
        return f"type is missing. Choose 'imports' or 'exports'"

    def getLinkApi(country, type):
        api_url_base = "https://api.tradingeconomics.com/comtrade"

        return f'{api_url_base}/{type}/{quote(country)}/totals'

    link_api = getLinkApi(country, type)

    try:
        link_api += '?c=' + glob.apikey
    except AttributeError:
        raise LoginError('You need to do login before making any request')

    try:
        response = urlopen(link_api)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(link_api).read().decode('utf-8'))
        else:
            raise WebRequestError('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            if len(webResults) > 0:

                maindf = pd.DataFrame(webResults)

            else:
                raise ParametersError('No data available for the provided parameters.')
            if output_type is None or output_type == 'dict':
                output = webResults
            elif output_type == 'df':
                output = maindf
            elif output_type == 'raw':
                output = webResults
            else:
                raise ParametersError(
                    'output_type options : df for data frame, dict(default) for dictionary by country, raw for unparsed results.')
            return output
        except ValueError:
            pass
    else:
        return ''

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
        getCmtType(country1 = 'Portugal', country2 = 'Spain' type = 'import' )

        getCmtType(country1 = 'United States', type = 'export')


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
        response = urlopen(link_api)
        code = response.getcode()
        webResults = json.loads(response.read().decode('utf-8'))
    except ValueError:
        if code != 200:
            print(urlopen(link_api).read().decode('utf-8'))
        else:
            raise WebRequestError('Something went wrong. Error code = ' + str(code))
    if code == 200:
        try:
            if len(webResults) > 0:

                maindf = pd.DataFrame(webResults)

            else:
                raise ParametersError('No data available for the provided parameters.')
            if output_type is None or output_type == 'dict':
                output = webResults
            elif output_type == 'df':
                output = maindf
            elif output_type == 'raw':
                output = webResults
            else:
                raise ParametersError(
                    'output_type options : df for data frame, dict(default) for dictionary by country, raw for unparsed results.')
            return output
        except ValueError:
            pass
    else:
        return ''







