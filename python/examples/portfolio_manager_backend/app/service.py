"""
Services logic
"""

from app.storage import (
    accounts,
    portfolio_cash_balances,
    portfolio_positions,
)


def get_account(account_id: int):
    """Get mocked storage accounts"""
    return accounts.get(account_id)


def get_positions(account_id: int):
    """Get mocked storage positions"""
    return portfolio_positions.get(account_id, [])


def get_cash_balances(account_id: int):
    """Get mocked storage balances"""
    return portfolio_cash_balances.get(account_id, {})
