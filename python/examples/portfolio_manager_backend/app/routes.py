"""
FastAPI endpoint routes
"""

from fastapi import APIRouter, HTTPException
from app.service import get_account, get_positions, get_cash_balances
from app.schemas import AccountPortfolioResponse

router = APIRouter(prefix="/api/v1")

# Mock data for stock prices and FX rates
BASE_PRICES_USD = {
    "AAPL": 190.50,
    "TSLA": 284.25,
    "GOOGL": 359.68,
    "BTC": 67012.21,
}

# Mock FX rates for currency conversion
RATES_TO = {
    "USD": {"USD": 1, "EUR": 0.92, "GBP": 0.79, "JPY": 150},
    "EUR": {"USD": 1.09, "EUR": 1, "GBP": 0.86, "JPY": 163},
    "GBP": {"USD": 1.27, "EUR": 1.16, "GBP": 1, "JPY": 189},
    "JPY": {"USD": 0.0067, "EUR": 0.0061, "GBP": 0.0053, "JPY": 1},
}


def convert_price_from_usd(price_usd: float, target_currency: str) -> float:
    """Convert price from USD to target currency"""
    return round(price_usd * RATES_TO["USD"][target_currency], 2)


@router.get("/rates")
def get_fx_rates():
    """Return mock data"""
    return RATES_TO


@router.get("/accounts/{account_id}", response_model=AccountPortfolioResponse)
def get_portfolio(account_id: int):
    """Get portfolio for an account"""

    account = get_account(account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    currency = account["currency"]
    positions = [
        {
            **position,
            "price": price,
            "currency": currency,
            "market_value": round(position["quantity"] * price, 2),
        }
        for position in get_positions(account_id)
        for price in [
            convert_price_from_usd(
                BASE_PRICES_USD[position["symbol"]],
                currency,
            )
        ]
    ]
    return {
        "account": account,
        "positions": positions,
        "cash_balances": get_cash_balances(account_id),
    }


@router.get("/health")
def healthcheck():
    """Healthcheck"""
    return {"status": "ok"}
