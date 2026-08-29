from os import getenv

DATABASE_URL = getenv(
    "DATABASE_URL",
    "postgresql+psycopg://hubflow:hubflow@localhost:5432/hubflow",
)
