"""
Services logic
"""

from typing import Any

from app.storage import (
    accounts,
    portfolio_cash_balances,
    portfolio_positions,
    BASE_PRICES_USD,
    RATES_TO,
)


def convert_price_from_usd(price_usd: float, target_currency: str) -> float:
    """Convert price from USD to target currency"""
    return round(price_usd * RATES_TO["USD"][target_currency], 2)


def get_account(account_id: int) -> dict[str, Any] | None:
    """Get mocked storage accounts"""
    return accounts.get(account_id)


def get_positions(account_id: int):
    """Get mocked storage positions"""
    return portfolio_positions.get(account_id, [])


def get_cash_balances(account_id: int):
    """Get mocked storage balances"""
    return portfolio_cash_balances.get(account_id, {})


def get_portfolio(account_id: int) -> None | dict[str, Any]:
    """Get full portfolio with enriched positions for an account"""
    account = get_account(account_id)
    if not account:
        return None

    currency = account["currency"]
    positions: list[dict[str, Any]] = [
        {
            **position,
            "price": price,
            "currency": currency,
            "market_value": round(position["quantity"] * price, 2),
        }
        for position in get_positions(account_id)
        for price in [
            convert_price_from_usd(BASE_PRICES_USD[position["symbol"]], currency)
        ]
    ]

    return {
        "account": account,
        "positions": positions,
        "cash_balances": get_cash_balances(account_id),
    }
