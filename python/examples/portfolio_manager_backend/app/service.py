"""
Services logic.
"""

from typing import Any, Literal
from app.storage import (
    BASE_PRICES_USD,
    RATES_TO,
    accounts,
    portfolio_cash_balances,
    portfolio_positions,
)
from app.te_provider import get_te_prices, get_te_rates, init


def init_service() -> Literal[True]:
    """Initialize service. First try of TE authentication."""

    return init()


def convert_price_from_usd(
    offline_mode: bool, price_usd: float, target_currency: str
) -> float:
    """Convert price from USD to target currency"""

    if offline_mode:
        return round(price_usd * RATES_TO["USD"][target_currency], 2)
    else:
        return round(price_usd * get_te_rates()["USD"][target_currency], 2)


def get_account(account_id: int) -> dict[str, Any] | None:
    """Get mocked storage accounts"""

    return accounts.get(account_id)


def get_positions(account_id: int) -> list[dict[str, Any]]:
    """Get mocked storage positions"""

    return portfolio_positions.get(account_id, [])


def get_cash_balances(account_id: int) -> dict[str, float]:
    """Get mocked storage balances"""

    return portfolio_cash_balances.get(account_id, {})


def get_portfolio(
    account_id: int, offline_mode: bool = True, is_auth: bool = False
) -> None | dict[str, Any]:
    """Get full portfolio with enriched positions for an account"""

    account = get_account(account_id)
    if not account:
        return None

    currency = account["currency"]
    price_source = BASE_PRICES_USD if offline_mode else get_te_prices()
    positions: list[dict[str, Any]] = [
        {
            **position,
            "price": price,
            "currency": currency,
            "market_value": round(position["quantity"] * price, 2),
        }
        for position in get_positions(account_id)
        for price in [
            convert_price_from_usd(
                offline_mode, price_source[position["symbol"]], currency
            )
        ]
    ]

    return {
        "account": account,
        "positions": positions,
        "cash_balances": get_cash_balances(account_id),
    }
