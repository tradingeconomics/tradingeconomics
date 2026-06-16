"""
Mocked Storage.
"""

from typing import Any

# Portfolio accounts
accounts: dict[int, dict[str, Any]] = {
    1001: {
        "account_id": 1001,
        "owner": "Alexandre Ferreira",
        "email": "hello@alexjorgef.com",
        "phone": "+351912345678",
        "currency": "USD",
        "account_type": "individual",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "moderate",
        "country": "Portugal",
        "address": "Rua Augusta 120, Lisbon",
        "created_at": "2025-09-23T11:21:01Z",
        "last_login_at": "2026-06-12T18:44:12Z",
        "is_premium": True,
    },
    1002: {
        "account_id": 1002,
        "owner": "João Semedo",
        "email": "joaosemedo@example.com",
        "phone": "+351913456789",
        "currency": "EUR",
        "account_type": "individual",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "conservative",
        "country": "Portugal",
        "address": "Avenida da Liberdade 88, Lisbon",
        "created_at": "2022-11-08T09:14:20Z",
        "last_login_at": "2026-06-11T07:21:44Z",
        "is_premium": False,
    },
    1003: {
        "account_id": 1003,
        "owner": "Amantha Jatson",
        "email": "amanjo@example.com",
        "phone": "+12025550123",
        "currency": "EUR",
        "account_type": "corporate",
        "status": "active",
        "kyc_status": "verified",
        "risk_profile": "aggressive",
        "country": "United States",
        "address": "350 Fifth Avenue, New York, NY",
        "created_at": "2021-04-27T15:33:52Z",
        "last_login_at": "2026-06-12T23:09:15Z",
        "is_premium": True,
    },
}

# Portfolio cash balances per account
portfolio_cash_balances = {
    1001: {"EUR": 2512.12, "USD": 124.27},
    1002: {"EUR": 0.0, "USD": 15291.79},
    1003: {"EUR": 0.0, "USD": 15291.79},
}

# Portfolio positions per account
portfolio_positions: dict[int, list[dict[str, Any]]] = {
    1001: [
        {"symbol": "AAPL", "quantity": 12.0},
        {"symbol": "TSLA", "quantity": 5.0},
        {"symbol": "BTC", "quantity": 0.4},
    ],
    1002: [
        {"symbol": "BTC", "quantity": 2.3},
        {"symbol": "GOOGL", "quantity": 2.0},
    ],
    1003: [
        {"symbol": "BTC", "quantity": 431.1},
        {"symbol": "GOOGL", "quantity": 2.0},
        {"symbol": "AAPL", "quantity": 12.0},
        {"symbol": "TSLA", "quantity": 5.0},
    ],
}

# Fallback market data for assets base prices
BASE_PRICES_USD = {
    "AAPL": 190.50,
    "TSLA": 284.25,
    "GOOGL": 359.68,
    "BTC": 67012.21,
}

# Fallback market data for assets meta-information
MARKET_FALLBACK: dict[str, dict[str, Any]] = {
    "AAPL": {
        "Ticker": "AAPL",
        "Name": "Apple",
        "MarketCap": 4099562400000.0,
        "YTDPercentualChange": 7.09,
        "WeeklyPercentualChange": -5.27,
        "MonthlyPercentualChange": -2.59,
    },
    "TSLA": {
        "Ticker": "TSLA",
        "Name": "Tesla",
        "MarketCap": 789000000000.0,
        "YTDPercentualChange": -12.34,
        "WeeklyPercentualChange": -3.21,
        "MonthlyPercentualChange": 1.45,
    },
    "GOOGL": {
        "Ticker": "GOOGL",
        "Name": "Alphabet Inc.",
        "YTDPercentualChange": 5.67,
        "MarketCap": 1950000000000.0,
        "WeeklyPercentualChange": 0.89,
        "MonthlyPercentualChange": -1.23,
    },
    "BTC": {
        "Ticker": "BTC",
        "Name": "Bitcoin",
        "MarketCap": 1320000000000.0,
        "YTDPercentualChange": 45.21,
        "WeeklyPercentualChange": 2.15,
        "MonthlyPercentualChange": 8.73,
    },
}

# Fallback rates data for currency conversion
RATES_TO = {
    "USD": {"USD": 1.0, "EUR": 0.92, "GBP": 0.79, "JPY": 150.0},
    "EUR": {
        "USD": 1.0869565217391304,
        "EUR": 1.0,
        "GBP": 0.86,
        "JPY": 163.04347826086956,
    },
    "GBP": {
        "USD": 1.2658227848101267,
        "EUR": 1.1627906976744187,
        "GBP": 1.0,
        "JPY": 189.873417721519,
    },
    "JPY": {
        "USD": 0.006666666666666667,
        "EUR": 0.006133333333333333,
        "GBP": 0.005266666666666667,
        "JPY": 1.0,
    },
}
