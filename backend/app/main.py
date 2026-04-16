import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.auth import router as auth_router
from app.routers.budget import router as budget_router
from app.routers.categories import router as categories_router
from app.routers.goals import router as goals_router
from app.routers.notifications import router as notifications_router
from app.routers.reports import router as reports_router
from app.routers.settings import router as settings_router
from app.routers.transactions import router as transactions_router


def create_app() -> FastAPI:
    app = FastAPI(title="Finance Tracker API", version="1.0.0")

    cors_origins = os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    allowed_origins = [origin.strip() for origin in cors_origins.split(",") if origin.strip()]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router)
    app.include_router(transactions_router)
    app.include_router(categories_router)
    app.include_router(budget_router)
    app.include_router(goals_router)
    app.include_router(reports_router)
    app.include_router(notifications_router)
    app.include_router(settings_router)

    return app


app = create_app()

