# HubFlow Assessment

This repository is a starter monorepo for the HubFlow assessment. It contains a frontend workspace, a backend service, database schema, documentation, and sample data for an e-commerce / Stripe-inspired product flow.

## Structure

- frontend/
  - hubflow/
  - ecommerce/
  - stripe-clone/
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

1. Copy `.env.example` to `.env` and update values.
2. Start the stack with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Open the frontend apps and backend API according to your local ports.

## Notes

This scaffold is intentionally lightweight and ready for expansion into your full product implementation.
