# HubFlow Automation API

FastAPI backend for the HubUnicon assessment. It uses PostgreSQL for transactional data, Redis for dashboard-stat caching, Argon2 for passwords, and JWT bearer tokens for authentication.

## Run locally

```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn app.main:app --reload --env-file .env
```

Open `http://127.0.0.1:8000/docs` for Swagger UI.

## Environment

Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`. `.env` is ignored by Git.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | SQLAlchemy PostgreSQL URL using Psycopg 3 |
| `JWT_SECRET` | Secret used to sign JWT access tokens |
| `REDIS_URL` | Optional Redis endpoint for dashboard cache |
| `CACHE_TTL_SECONDS` | Dashboard cache lifetime; defaults to 60 seconds |
| `FRONTEND_URL` | Allowed browser origin for CORS |

## API

| Method | Endpoint | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/` | No | API status message |
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create an account |
| POST | `/api/auth/login` | No | Obtain a bearer JWT |
| GET | `/api/auth/me` | Bearer | Current user |
| POST/GET | `/api/contacts` | Bearer | Create/list CRM contacts |
| POST/GET | `/api/campaigns` | Bearer | Create/list campaigns |
| GET | `/api/dashboard/stats` | Bearer | Cached dashboard counts |
| GET | `/api/billing/plans` | No | Available subscription plans |
| POST | `/api/billing/subscriptions` | Bearer | Create a subscription and pending payment record |
| GET | `/api/billing/subscriptions/me` | Bearer | Current user's latest subscription |

## Architecture

`Routes → Services → SQLAlchemy → PostgreSQL`, with Redis alongside PostgreSQL for short-lived dashboard statistics. Routes handle HTTP; services hold business logic; models represent tables; Pydantic schemas validate API data.

## Tests

```bash
cd backend
python3 -m pytest tests
```
