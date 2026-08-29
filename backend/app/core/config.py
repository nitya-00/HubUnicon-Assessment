from os import getenv

DATABASE_URL = getenv(
    "DATABASE_URL",
    "postgresql+psycopg://hubflow:hubflow@localhost:5432/hubflow",
)

JWT_SECRET = getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REDIS_URL = getenv("REDIS_URL", "redis://localhost:6379/0")
CACHE_TTL_SECONDS = int(getenv("CACHE_TTL_SECONDS", "60"))
FRONTEND_URL = getenv("FRONTEND_URL", "http://localhost:5173")
