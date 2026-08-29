from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import FRONTEND_URL
from app.routes.auth import router as auth_router
from app.routes.campaigns import router as campaigns_router
from app.routes.contacts import router as contacts_router
from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="HubFlow Automation API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(contacts_router)
app.include_router(campaigns_router)
app.include_router(dashboard_router)


@app.get("/")
def read_root():
    return {
        "message": "HubFlow Automation API is running",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
    }
