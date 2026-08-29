# EC2 production deployment guide

> This guide prepares a deployment; it does not claim that HubFlow is deployed to AWS.

## 1. GitHub and AWS prerequisites

1. Push this repository to GitHub.
2. Create an Ubuntu 22.04 or 24.04 EC2 instance with a security group allowing
   inbound TCP `22` only from your IP and TCP `80`/`443` from the internet.
   Do not allow public inbound `5432`, `6379`, `8000`, or `8080`.
3. Point an A/AAAA DNS record such as `app.example.com` at the instance public IP.
4. SSH to the instance:

   ```bash
   ssh -i path/to/key.pem ubuntu@EC2_PUBLIC_IP
   ```

## 2. Install Docker and clone

On EC2, install Docker Engine and the Compose plugin using Docker's official
Ubuntu instructions. Then add the `ubuntu` user to the `docker` group, sign out
and back in, and verify `docker compose version`.

Create a GitHub deploy key on EC2 or use a read-only GitHub token so the host can
clone a private repository. Then:

```bash
git clone git@github.com:YOUR_ORGANIZATION/YOUR_REPOSITORY.git ~/hubflow
cd ~/hubflow
cp .env.production.example .env
chmod 600 .env
```

Replace every `.env` placeholder with random values and change `FRONTEND_URL`
and `server_name` to your real HTTPS domain. Do not reuse development secrets.

## 3. Start production Compose services

```bash
docker compose -f docker-compose.yml -f docker-compose.production.yml up -d --build
docker compose ps
```

The production override removes the host backend port. The frontend is bound to
`127.0.0.1:8080`, where the host Nginx proxy can reach it.

## 4. Host Nginx and HTTPS

```bash
sudo apt-get update
sudo apt-get install -y nginx certbot python3-certbot-nginx
sudo cp deploy/nginx/hubflow.conf.example /etc/nginx/sites-available/hubflow
sudo nano /etc/nginx/sites-available/hubflow
sudo ln -s /etc/nginx/sites-available/hubflow /etc/nginx/sites-enabled/hubflow
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d app.example.com
```

Use a real domain that already resolves to EC2 before running Certbot. Test
`https://app.example.com/hubflow`, `/dashboard`, and `/api/health`.

## 5. GitHub Actions deployment

Create a GitHub Environment named `production`, then add these environment
secrets:

| Secret | Purpose |
|---|---|
| `EC2_HOST` | EC2 public IP or DNS hostname |
| `EC2_USER` | SSH user, normally `ubuntu` |
| `EC2_SSH_PRIVATE_KEY` | Private key corresponding to an authorized EC2 key |
| `EC2_APP_PATH` | Absolute clone path, for example `/home/ubuntu/hubflow` |

The workflow at `.github/workflows/deploy-ec2.yml` deploys only after a push to
`main` or a manual dispatch. The EC2 clone itself must already have GitHub read
access through its deploy key/token. It uses fast-forward-only Git updates and
rebuilds the Docker Compose stack.

## Operations

- Confirm `docker compose ps` reports healthy database, Redis, and backend services.
- Keep the EC2 OS patched and set up automated RDS/backups before using real data.
- For durable production data, replace Compose PostgreSQL/Redis with RDS and
  ElastiCache as described in [aws-architecture.md](aws-architecture.md).
