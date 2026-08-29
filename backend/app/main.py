from fastapi import FastAPI

app = FastAPI(
    title="HubFlow Automation API",
    version="0.1.0",
)


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
