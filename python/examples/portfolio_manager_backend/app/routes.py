"""
FastAPI endpoint routes
"""

from typing import Any

from fastapi import APIRouter, HTTPException
from app.service import get_portfolio
from app.schemas import AccountPortfolioResponse
from app.te_provider import get_rates

router = APIRouter(prefix="/api/v1")


@router.get("/rates")
def get_fx_rates():
    """Return exchange rates (TE or fallback)"""
    return get_rates()


@router.get("/accounts/{account_id}", response_model=AccountPortfolioResponse)
def get_portfolio_endpoint(account_id: int) -> dict[str, Any]:
    """Get portfolio for an account"""
    result = get_portfolio(account_id)
    if not result:
        raise HTTPException(status_code=404, detail="Account not found")
    return result


@router.get("/health")
def healthcheck():
    """Healthcheck"""
    return {"status": "ok"}
