"""
Object Schemas
"""

from typing import Optional

from pydantic import BaseModel


class Position(BaseModel):
    """Position Object"""

    symbol: str
    quantity: float
    price: float
    currency: str
    market_value: float


class Account(BaseModel):
    """Account Object"""

    account_id: int
    owner: str
    email: str
    currency: str
    phone: Optional[str] = None
    account_type: Optional[str] = None
    status: Optional[str] = None
    kyc_status: Optional[str] = None
    risk_profile: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[str] = None
    last_login_at: Optional[str] = None
    is_premium: Optional[bool] = None


class AccountPortfolioResponse(BaseModel):
    """Account Portfolio Object"""

    account: Account
    positions: list[Position]
    cash_balances: dict[str, float]
