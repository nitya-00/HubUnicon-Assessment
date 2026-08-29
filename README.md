# HubFlow Assessment

HubFlow is a deployable React, FastAPI, PostgreSQL, and Redis assessment project. It includes the HubFlow landing page, e-commerce and Stripe-inspired showcase pages, plus a real authenticated HubFlow operations dashboard.

## Structure

- frontend/
  - src/ (HubFlow, e-commerce, Stripe, and dashboard routes)
- backend/
  - src/
  - Dockerfile
- database/
  - schema.sql
  - er-diagram.png
- docs/
  - architecture.png
  - deployment.md
  - api.md
- postman/
  - hubflow.json
- sample-data/
  - contacts.csv

## Getting started

1. Copy `backend/.env.example` to `backend/.env` and update values.
2. Start the stack with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Open `http://localhost:8080` for the site and `http://localhost:8000/docs` for API documentation.

## Notes

Frontend routes: `/hubflow`, `/dashboard`, `/ecommerce`, and `/stripe`.
