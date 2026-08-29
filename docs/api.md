# HubFlow API reference

The interactive source of truth is FastAPI OpenAPI at `/docs` and `/openapi.json`. All protected endpoints require `Authorization: Bearer <access_token>`.

## Authentication

| Method | Path | Result |
|---|---|---|
| POST | `/api/auth/register` | Creates an account; duplicate email returns `409`. |
| POST | `/api/auth/login` | Returns a JWT bearer access token. Invalid credentials return `401`. |
| GET | `/api/auth/me` | Returns the current user without password data. |

## Contacts

| Method | Path | Result |
|---|---|---|
| GET | `/api/contacts` | Lists only the current user's contacts. |
| POST | `/api/contacts` | Creates a contact in the current user's workspace. |
| POST | `/api/contacts/upload` | Imports a UTF-8 CSV with `first_name,last_name,email,phone,company` headers. |
| GET | `/api/contacts/{contact_id}` | Returns the owned contact or `404`. |
| PUT | `/api/contacts/{contact_id}` | Replaces an owned contact or returns `404`. |
| DELETE | `/api/contacts/{contact_id}` | Deletes an owned contact and returns `204`. |

Duplicate non-empty contact email addresses are rejected per workspace. Imports report imported, skipped, and invalid row counts, and stream up to 5,000 rows.

## Campaigns

| Method | Path | Result |
|---|---|---|
| GET | `/api/campaigns` | Lists only the current user's campaigns. |
| POST | `/api/campaigns` | Creates a campaign; optional `contact_ids` must be caller-owned. |
| GET/PUT/DELETE | `/api/campaigns/{campaign_id}` | Owned campaign CRUD. |
| GET | `/api/campaigns/{campaign_id}/contacts` | Lists associated, owned contacts. |
| POST/DELETE | `/api/campaigns/{campaign_id}/contacts/{contact_id}` | Creates/removes an owned association. |

Cross-workspace IDs return `404`; the API does not reveal another workspace's resources.

## Dashboard, reporting, billing, and health

| Method | Path | Result |
|---|---|---|
| GET | `/api/dashboard/stats` | User-scoped counts, activity metrics, and cache state. |
| GET | `/api/reports/campaigns` | User-scoped campaign metrics. |
| GET | `/api/billing/plans` | Available plans. |
| POST | `/api/billing/subscriptions` | Creates a subscription and pending payment record. |
| GET | `/api/billing/subscriptions/me` | Current user's latest subscription. |
| GET | `/api/health` | Deployment health response. |

Redis keys use `dashboard:stats:user:{user_id}`, expire after `CACHE_TTL_SECONDS` (60 seconds by default), and are invalidated after current-user CRM changes.
