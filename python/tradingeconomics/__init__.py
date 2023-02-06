"""
This package allows Trading Economics clients to easily query the Trading Economics API to get data into their Python code.
"""

import sys

PY3 = sys.version_info[0] == 3


if PY3: # Python 3+
    from .historicalDB import getHistorical
    from .historical import getHistoricalData, getHistoricalRatings,getHistoricalByTicker,getHistoricalUpdates
    from .calendar import getCalendarData, getCalendarId,getCalendarUpdates, getCalendarEventsByGroup
    from .forecasts import getForecastData,getForecastByTicker
    from .indicators import getIndicatorData, getRatings, getLatestUpdates, getDiscontinuedIndicator, getIndicatorByCategoryGroup, getIndicatorByTicker, getPeers, getAllCountries
    from .markets import getMarketsData, getMarketsBySymbol, getMarketsIntraday, getMarketsPeers, getMarketsComponents, getMarketsSearch, getMarketsForecasts, getCurrencyCross, getMarketsIntradayByInterval, getMarketsStockDescriptions,getMarketsSymbology,getStocksByCountry
    from .historicalMarkets import fetchMarkets
    from .glob import login, subscribe
    from .stream import run
    from .earnings import getEarnings, getEarningsType
    from .news import getNews, getArticles, getArticleId 
    from .worldBank import getWBCategories, getWBIndicator, getWBCountry, getWBHistorical
    from .comtrade import getCmtCategories, getCmtCountry, getCmtHistorical, getCmtTwoCountries, getCmtUpdates, getCmtCountryByCategory, getCmtTotalByType, getCmtCountryFilterByType,getCmtTotalByTypeAndMainCategory
    from .federalReserve import getFedRStates, getFedRSnaps, getFedRHistorical, getFedRCounty
    from .eurostat import getEurostatData,getEurostatCountries,getEurostatCategoryGroups
    from .historicalEurostat import getHistoricalEurostat
    from .financials import getFinancialsData, getFinancialsCategoryList, getFinancialsDataByCategory
    from .historicalFinancials import getFinancialsHistorical
    from .search import getSearch


else: # Python 2.X
    from historicalDB import getHistorical
    from historical import getHistoricalData, getHistoricalRatings,getHistoricalByTicker
    from calendar import getCalendarData, getCalendarId, getCalendarUpdates
    from forecasts import getForecastData,getForecastByTicker
    from indicators import getIndicatorData, getRatings, getLatestUpdates, getDiscontinuedIndicator, getIndicatorByCategoryGroup,getIndicatorByTicker, getPeers
    from markets import getMarketsData, getMarketsBySymbol, getMarketsIntraday, getMarketsPeers, getMarketsComponents, getMarketsSearch, getMarketsForecasts, getCurrencyCross, getMarketsIntradayByInterval, getMarketsStockDescriptions
    from historicalMarkets import fetchMarkets
    from glob import login, subscribe
    from stream import run
    from earnings import getEarnings, getEarningsType
    from news import getNews, getArticles, getArticleId
    from worldBank import getWBCategories, getWBIndicator, getWBCountry, getWBHistorical
    from comtrade import getCmtCategories, getCmtCountry, getCmtHistorical, getCmtTwoCountries, getCmtUpdates, getCmtCountryByCategory, getCmtTotalByType, getCmtCountryFilterByType
    from federalReserve import getFedRStates, getFedRSnaps, getFedRHistorical, getFedRCounty
    from eurostat import getEurostatData,getEurostatCountries,getEurostatCategoryGroups
    from historicalEurostat import getHistoricalEurostat
    from financials import getFinancialsData, getFinancialsCategoryList, getFinancialsDataByCategory
    from historicalFinancials import getFinancialsHistorical
    from search import getSearch




    