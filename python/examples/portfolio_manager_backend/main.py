"""
Main entry point.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
import tradingeconomics as te
import uvicorn
import os
import app.log as log
from typing import AsyncGenerator
from app.routes import router
from app.schemas import AppState
from app.service import init_service
from app.te_provider import LoginTEProviderException

logger = log.setup_custom_logger("root")


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Initialize application state and external Trading Economics authentication."""

    offline_mode = not os.environ.get("PMEXAMPLE_TRADINGECONOMICS_API_KEY")
    app.state.data = AppState(
        offline=offline_mode,
        is_auth=False,
        startup_complete=False,
    )
    if not offline_mode:
        try:
            app.state.data.is_auth = init_service()
        except LoginTEProviderException as e:
            if isinstance(e.__cause__, te.CredentialsError):
                logger.error("%s - Root cause was a credentials error", e)
            else:
                logger.error(e)
    else:
        logger.warning(
            "Trading Economics API Key is not present, mocked data will be used."
        )
    app.state.data.startup_complete = True
    logger.info(
        "Starting Portfolio Manager backend (PID=%s,offline=%s,is_auth=%s)",
        os.getpid(),
        app.state.data.offline,
        app.state.data.is_auth,
    )
    yield


app = FastAPI(title="Portfolio Manager Back-End", lifespan=lifespan)
app.include_router(router)


def main():
    """Portfolio Manager Backend entry point. Run FastAPI app with Uvicorn."""

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        workers=1,
        log_level="info",
        reload=True,
    )


if __name__ == "__main__":
    main()
