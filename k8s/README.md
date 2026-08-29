# Proposed Kubernetes Deployment

> These manifests are assessment artifacts and have not been deployed to a Kubernetes cluster.

The manifests deploy only the frontend and FastAPI application. PostgreSQL and
Redis are deliberately external production services (for example RDS and
ElastiCache), not public in-cluster services. Create a real Kubernetes Secret
from managed-service connection values before applying the manifests.

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.example.yaml # replace placeholders first
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml
```

Build and publish the backend and frontend images to a private registry, then
replace the example image names. The Ingress exposes frontend traffic and routes
`/api` to FastAPI. Database and Redis endpoints remain private.
