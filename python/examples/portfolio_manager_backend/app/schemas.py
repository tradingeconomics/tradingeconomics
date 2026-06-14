"""
Object Schemas
"""

from typing import Any

from pydantic import BaseModel


class Account(BaseModel):
    """Account Object"""

    account_id: int
    owner: str
    email: str
    currency: str


class AccountPortfolioResponse(BaseModel):
    """Account Portfolio Object"""

    account: Account
    positions: list[dict[str, Any]]
    cash_balances: dict[str, float]
