"""
FastAPI endpoint routes
"""

from typing import Any

from fastapi import APIRouter, HTTPException, Request
from app.service import get_portfolio
from app.schemas import AccountPortfolioResponse, AppState
from app.storage import RATES_TO
from app.te_provider import get_te_rates, LOG_ERROR_AUTH_FAILED

router = APIRouter(prefix="/api/v1")


@router.get("/rates")
def get_fx_rates(request: Request) -> dict[str, dict[str, float]]:
    """Return exchange rates (TE or fallback)"""
    state_data: AppState = request.app.state.data
    price_source = RATES_TO if state_data.offline else get_te_rates()
    return price_source


@router.get("/accounts/{account_id}", response_model=AccountPortfolioResponse)
def get_portfolio_endpoint(request: Request, account_id: int) -> dict[str, Any]:
    """Get portfolio for an account"""
    state_data: AppState = request.app.state.data
    result = get_portfolio(
        account_id=account_id,
        offline_mode=state_data.offline,
        is_auth=state_data.is_auth,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Account not found")
    return result


@router.get("/health")
def healthcheck(request: Request) -> dict[str, str]:
    """Healthcheck"""
    state_data: AppState = request.app.state.data
    if state_data.offline:
        return {"status": "ok-offline"}
    else:
        if state_data.is_auth:
            return {"status": "ok"}
        else:
            return {"status": "error", "msg": LOG_ERROR_AUTH_FAILED}
