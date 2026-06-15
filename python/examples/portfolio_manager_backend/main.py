"""
Main entry point.
"""

from fastapi import FastAPI
import uvicorn
from app.routes import router

app = FastAPI(title="Portfolio Manager Back-End")

app.include_router(router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        workers=1,
        log_level="info",
        reload=True,
    )
