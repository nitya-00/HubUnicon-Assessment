# HubUnicon Technical Assessment — HubFlow

HubFlow is a React, FastAPI, PostgreSQL, and Redis application demonstrating a landing page, e-commerce and Stripe-inspired frontend exercises, plus an authenticated CRM automation workspace.

## Implemented capabilities

- React/Vite routes: `/hubflow`, `/ecommerce`, `/stripe`, and `/dashboard`.
- Argon2 password hashing, JWT authentication, and protected API routes.
- User-scoped contact and campaign CRUD, campaign-contact associations, dashboard statistics, Redis cache, CSV contact import, campaign reporting, plans, subscriptions, and pending payment records.
- Docker Compose deployment with Nginx serving the frontend and proxying `/api`.

## Architecture and artifacts

- [Current system architecture](docs/architecture.md)
- [ER diagram and indexing strategy](docs/er-diagram.md)
- [Proposed AWS production architecture](docs/aws-architecture.md)
- [Deployment guide](docs/deployment.md)
- [API reference](docs/api.md)
- [Postman collection](postman/hubflow.json)
- [Sample contacts CSV](sample-data/contacts.csv)
- [Proposed Kubernetes deployment](k8s/README.md)

## Local setup

1. Copy `backend/.env.example` to `backend/.env` and set a strong `JWT_SECRET`.
2. Copy `.env.example` to `.env` and set the Docker PostgreSQL credentials and `JWT_SECRET`. Do not commit either `.env` file.
3. Start the stack with `docker compose up --build`.
4. Open `http://localhost:8080/hubflow` and `http://localhost:8000/docs`.

The Docker frontend proxies `/api/*` to FastAPI, so the dashboard uses the same origin in the Compose deployment.

## Database and migration

`database/schema.sql` initializes a fresh environment. Existing databases created with the original schema must apply `database/migrations/001_multi_user_crm.sql` after assigning every existing contact and campaign to its actual owner. The migration intentionally stops if unowned legacy records remain rather than weakening tenant isolation.

## API and tests

FastAPI provides interactive OpenAPI documentation at `/docs` and the raw spec at `/openapi.json`. Register with `/api/auth/register`, log in with `/api/auth/login`, then use the returned bearer token on protected requests.

```bash
cd backend && python3 -m pip install -r requirements.txt && python3 -m pytest tests
cd frontend && npm ci && npm run lint && npm run build
docker compose build
```

## Known limits and production integration points

- Subscription creation creates a pending database payment record; Stripe or another payment gateway is not integrated.
- WhatsApp, OTP delivery, AI, OCR, scheduled workers, and message sending are not implemented. They are future production integrations, not live features.
- Kubernetes and AWS materials are proposed deployment artifacts only. This repository is not deployed to either platform.
