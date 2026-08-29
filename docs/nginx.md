# Nginx deployment pattern

Nginx is the public entry point in production. It terminates TLS, serves the Vite frontend, and proxies API requests to FastAPI. PostgreSQL and Redis remain private services.

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/hubflow-frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://hubflow-backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

In production, add TLS certificates, rate limiting on authentication routes, structured logs, and health checks. Never expose PostgreSQL or Redis directly through Nginx.
