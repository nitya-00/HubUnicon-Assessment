from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.contacts import router as contacts_router

app = FastAPI(
    title="HubFlow Automation API",
    version="0.1.0",
)

app.include_router(auth_router)
app.include_router(contacts_router)


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
