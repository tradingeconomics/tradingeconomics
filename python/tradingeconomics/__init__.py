"""
This package allows Trading Economics clients to easily query the Trading Economics API to get data into their Python code.
"""

import sys

PY3 = sys.version_info[0] == 3


if PY3: # Python 3+
    from .historicalDB import getHistorical
    from .historical import getHistoricalData, getHistoricalRatings
    from .calendar import getCalendarData, getCalendarId
    from .forecasts import getForecastData
    from .indicators import getIndicatorData, getRatings, getLatestUpdates
    from .markets import getMarketsData, getMarketsBySymbol, getMarketsIntraday, getMarketsPeers, getMarketsComponents, getMarketsSearch, getMarketsForecasts 
    from .historicalMarkets import fetchMarkets
    from .glob import login, subscribe
    from .stream import run
    from .earnings import getEarnings, getEarningsType
    from .news import getNews, getArticles, getArticleId
    from .worldBank import getWBCategories, getWBIndicator, getWBCountry, getWBHistorical
    from .comtrade import getCmtCategories, getCmtCountry, getCmtHistorical, getCmtTwoCountries, getCmtUpdates
    from .federalReserve import getFedRStates, getFedRSnaps, getFedRHistorical, getFedRCounty
    from .eurostat import getEurostatData    
else: # Python 2.X
    from historicalDB import getHistorical
    from historical import getHistoricalData, getHistoricalRatings
    from calendar import getCalendarData, getCalendarId
    from forecasts import getForecastData
    from indicators import getIndicatorData, getRatings, getLatestUpdates
    from markets import getMarketsData, getMarketsBySymbol, getMarketsIntraday, getMarketsPeers, getMarketsComponents, getMarketsSearch, getMarketsForecasts 
    from historicalMarkets import fetchMarkets
    from glob import login, subscribe
    from stream import run
    from earnings import getEarnings, getEarningsType
    from news import getNews, getArticles, getArticleId
    from worldBank import getWBCategories, getWBIndicator, getWBCountry, getWBHistorical
    from comtrade import getCmtCategories, getCmtCountry, getCmtHistorical, getCmtTwoCountries, getCmtUpdates
    from federalReserve import getFedRStates, getFedRSnaps, getFedRHistorical, getFedRCounty
    from eurostat import getEurostatData



    