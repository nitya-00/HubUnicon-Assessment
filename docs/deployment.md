# Deployment Guide

## Full-stack deployment

```bash
cp .env.example .env
# Replace placeholder secrets in .env, then:
docker compose up --build
```

Open the deployed site at `http://localhost:8080`. The Nginx frontend proxies `/api/*` to FastAPI, while PostgreSQL and Redis remain private Docker services.

For local development without Docker:

```bash
cd backend
python3 -m uvicorn app.main:app --reload --env-file .env

cd ../frontend
npm run dev
```

## Environment variables

Copy `.env.example` to `.env` for Docker Compose and replace all placeholders. For local backend development, copy `backend/.env.example` to `backend/.env`. For a separate Vite frontend, copy `frontend/.env.example` to `frontend/.env`.

PostgreSQL stores its initial credentials in the named Docker volume. If a volume
already exists, keep the same `POSTGRES_USER`, `POSTGRES_DB`, and
`POSTGRES_PASSWORD` values in `.env`; changing only the environment file does
not change the database password. Create a fresh local database only when you
explicitly intend to remove local data with `docker compose down -v`.

## Production notes

- Use managed PostgreSQL and Redis for production.
- Set a long, unique `JWT_SECRET`; do not commit `.env`.
- Set `VITE_API_URL=/api` when using the bundled Nginx proxy, or your HTTPS API origin when deploying services separately.
- Nginx includes safe headers, 5 MB request size protection, SPA routing, asset caching, API timeouts, and Docker DNS resolution.
- Terminate TLS at Nginx or a managed load balancer.
- Keep PostgreSQL and Redis private; expose only the frontend/Nginx service.
