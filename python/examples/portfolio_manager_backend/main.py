"""
Main login
"""

from fastapi import FastAPI
from app.routes import router

app = FastAPI(title="Portfolio Manager Back-End")

app.include_router(router)
