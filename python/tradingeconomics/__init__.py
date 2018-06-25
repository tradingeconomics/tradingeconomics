"""
This package allows Trading Economics clients to easily query the Trading Economics API to get data into their Python code.
"""

import sys

PY3 = sys.version_info[0] == 3


if PY3: # Python 3+
    from .historical import getHistoricalData
    from .calendar import getCalendarData
    from .forecasts import getForecastData
    from .indicators import getIndicatorData
    from .markets import getMarketsData
    from .historicalMarkets import fetchMarkets
    from .glob import login, subscribe
    from .stream import run
else: # Python 2.X
    from historical import getHistoricalData
    from calendar import getCalendarData
    from forecasts import getForecastData
    from indicators import getIndicatorData
    from markets import getMarketsData
    from historicalMarkets import fetchMarkets
    from glob import login, subscribe
    from stream import run