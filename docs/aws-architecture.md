# Proposed AWS Production Architecture

> This is a proposed architecture. HubFlow is not deployed to AWS by this repository.

```mermaid
flowchart TD
    Internet --> Route53[Route 53]
    Route53 --> ALB[Application Load Balancer + ACM TLS]
    ALB --> Frontend[CloudFront/S3 or frontend container]
    ALB --> ECS[ECS/Fargate FastAPI service]
    ECS --> RDS[(RDS PostgreSQL)]
    ECS --> Cache[(ElastiCache Redis)]
    ECS --> S3[S3 for future upload/export storage]
    Secrets[Secrets Manager / Parameter Store] --> ECS
```

Map the current frontend, FastAPI, PostgreSQL, Redis, and `.env` configuration
to frontend hosting, ECS, RDS, ElastiCache, and Secrets Manager respectively.
RDS and ElastiCache belong in private subnets, while the ALB is the public TLS
entry point.
