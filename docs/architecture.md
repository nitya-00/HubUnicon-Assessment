# Current system architecture

```mermaid
flowchart TD
    Browser[React / Vite frontend] --> Nginx[Nginx frontend container]
    Nginx -->|/api reverse proxy| API[FastAPI]
    API --> Auth[JWT authentication]
    API --> CRM[Contacts, campaigns, CSV, reports]
    API --> Billing[Plans, subscriptions, payments]
    API --> Postgres[(PostgreSQL)]
    API --> Redis[(Redis dashboard cache)]
```

The current local deployment is Docker Compose. Nginx/frontend (`8080`) and
FastAPI (`8000`) are published; PostgreSQL and Redis remain internal. The
dashboard calls `/api`, which Nginx forwards to FastAPI. FastAPI scopes all CRM
queries and cache keys to the JWT subject.

WhatsApp delivery, payment processing, AI/OCR, workers, object storage,
Kubernetes, and AWS are not running components.
