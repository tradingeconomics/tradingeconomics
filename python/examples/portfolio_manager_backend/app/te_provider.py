import os
import time
import logging

import tradingeconomics as te

from app.storage import BASE_PRICES_USD, RATES_TO

logger = logging.getLogger(__name__)

CACHE_TTL = 300

SYMBOL_MAP = {
    "AAPL": "AAPL:US",
    "TSLA": "TSLA:US",
    "GOOGL": "GOOGL:US",
    "BTC": "BTCUSD:CUR",
}

LOG_ERROR_AUTH_FAILED = "Failed to authenticate on Trading Economics"

_prices_cache: tuple[float, dict[str, float]] | None = None
_rates_cache: tuple[float, dict[str, dict[str, float]]] | None = None


class LoginError(Exception):
    """Raised when login fails due to credential issues."""

    pass


def init():
    try:
        _login()
        return True
    except te.CredentialsError as e:
        raise LoginError(LOG_ERROR_AUTH_FAILED) from e
    except Exception as e:
        raise LoginError("Unexpected authentication failure") from e


def _login():
    api_key = os.environ.get("PMEXAMPLE_TRADINGECONOMICS_API_KEY")
    if api_key:
        logger.debug("te.login(api_key=***)")
        te.login(api_key)


def get_te_prices() -> dict[str, float]:
    global _prices_cache

    now = time.time()
    if _prices_cache and (now - _prices_cache[0]) < CACHE_TTL:
        return _prices_cache[1]

    try:
        _login()
        symbols = list(SYMBOL_MAP.values())
        logger.debug("te.getMarketsBySymbol(symbols=%s)", symbols)
        data = te.getMarketsBySymbol(symbols=symbols)
        symbol_to_internal = {v: k for k, v in SYMBOL_MAP.items()}
        prices = {}
        for entry in data:
            sym = entry.get("Symbol", "")
            last = entry.get("Last")
            if sym and last is not None:
                internal = symbol_to_internal.get(sym)
                if internal is not None:
                    prices[internal] = float(last)
        if prices:
            _prices_cache = (now, prices)
            return prices
    except te.CredentialsError as e:
        logger.error(
            "Failed to fetch live base prices, using fallback base prices. Error: Invalid credentials."
        )
        return BASE_PRICES_USD
    except te.ParametersError as e:
        logger.error(
            "Failed to fetch live base prices, using fallback base prices. Error: Invalid request parameters. Details: Requests per Second Rate Exceeded."
        )
        return BASE_PRICES_USD
    except Exception as e:
        logger.error(
            "Failed to fetch live base prices, using fallback base prices. Error: %s",
            e,
            exc_info=True,
        )
        return BASE_PRICES_USD

    return BASE_PRICES_USD


def get_te_rates() -> dict[str, dict[str, float]]:
    global _rates_cache

    now = time.time()
    if _rates_cache and (now - _rates_cache[0]) < CACHE_TTL:
        return _rates_cache[1]

    try:
        _login()
        logger.debug("te.getCurrencyCross(cross=USD)")
        data = te.getCurrencyCross(cross="USD")
        usd_rates: dict[str, float] = {}
        for entry in data:
            sym: str = entry.get("Symbol", "")
            last = entry.get("Last")
            if sym.startswith("USD") and last is not None:
                target = sym[3:].replace(":CUR", "")
                if target in RATES_TO:
                    usd_rates[target] = float(last)

        if "EUR" not in usd_rates:
            raise ValueError("Failed to get USD rates from TE")

        rates: dict[str, dict[str, float]] = {}
        for base in RATES_TO:
            rates[base] = {}
            for target in RATES_TO:
                if base == target:
                    rates[base][target] = 1.0
                elif base == "USD":
                    rates[base][target] = usd_rates[target]
                else:
                    usd_per_base = 1.0 / usd_rates[base]
                    if target == "USD":
                        rates[base][target] = round(usd_per_base, 12)
                    else:
                        rates[base][target] = round(
                            usd_per_base * usd_rates[target], 12
                        )

        _rates_cache = (now, rates)
        return rates
    except te.CredentialsError as e:
        logger.error(
            "Failed to fetch live currency rates, using fallback rates. Error: Invalid credentials."
        )
        return RATES_TO
    except Exception as e:
        logger.error(
            "Failed to fetch live currency rates, using fallback rates. Error: %s",
            e,
            exc_info=True,
        )
        return RATES_TO
