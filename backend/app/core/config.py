from os import getenv

DATABASE_URL = getenv(
    "DATABASE_URL",
    "postgresql+psycopg://hubflow:hubflow@localhost:5432/hubflow",
)

JWT_SECRET = getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
