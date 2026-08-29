# Deployment Guide

## Full-stack deployment

```bash
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

Copy `backend/.env.example` to `backend/.env` and replace placeholder values. For a separate Vite frontend, copy `frontend/.env.example` to `frontend/.env`.

## Production notes

- Use managed PostgreSQL and Redis for production.
- Set a long, unique `JWT_SECRET`; do not commit `.env`.
- Set `VITE_API_URL=/api` when using the bundled Nginx proxy, or your HTTPS API origin when deploying services separately.
- Terminate TLS at Nginx or a managed load balancer.
- Keep PostgreSQL and Redis private; expose only the frontend/Nginx service.
