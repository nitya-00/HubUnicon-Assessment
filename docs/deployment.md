# Deployment Guide

## Local development

```bash
docker compose up --build
```

## Environment variables

Copy `.env.example` to `.env` and replace placeholder values.

## Production notes

- Use managed Postgres for production.
- Set strong secrets for JWT and session values.
- Serve the frontend via a production build or CDN.
- Keep the backend behind a reverse proxy or load balancer.
