"""
Main entry point.
"""

from fastapi import FastAPI
import uvicorn
import app.log as log
from app.routes import router

logger = log.setup_custom_logger("root")

app = FastAPI(title="Portfolio Manager Back-End")
app.include_router(router)


def main():
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
