# 🚀 Docker Compose Configuration - Nginx Added

## ✅ Services Updated

Both `docker-compose.yml` (production) and `docker-compose.dev.yml` (development) now include the **nginx-api** service.

## 📊 Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    YOUR LOCAL MACHINE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│  │  Port 4200     │  │  Port 8080  │  │   Port 3306     │    │
│  │  Angular UI    │  │ Symfony API │  │     MySQL       │    │
│  └────────────────┘  └─────────────┘  └──────────────────┘    │
│         ↓                   ↓                    ↓              │
│  ┌────────────────┐  ┌─────────────┐  ┌──────────────────┐    │
│  │ Angular        │  │  Nginx      │  │                  │    │
│  │ (npm start)    │  │  (8080)     │  │   MySQL          │    │
│  │    OR          │  │ + PHP-FPM   │  │   Container      │    │
│  │ Nginx+Build    │  │             │  │                  │    │
│  └────────────────┘  └─────────────┘  └──────────────────┘    │
│                             ↓                                   │
│                      ┌────────────────┐                         │
│                      │  Symfony App   │                         │
│                      │  (PHP-FPM 9000)│                         │
│                      │                │                         │
│                      │  - Controllers │                         │
│                      │  - Services    │                         │
│                      │  - API         │                         │
│                      └────────────────┘                         │
│                             ↓                                   │
│                      ┌────────────────┐                         │
│                      │  MySQL 8.0     │                         │
│                      │  Database      │                         │
│                      └────────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🔌 Ports Configuration

| Port | Service | Purpose | URL |
|------|---------|---------|-----|
| **4200** | Angular / Nginx | Frontend Application | http://localhost:4200 |
| **8080** | Nginx + PHP-FPM | Symfony REST API | http://localhost:8080 |
| **9000** | PHP-FPM | PHP FastCGI | (Internal only) |
| **3306** | MySQL | Database | localhost:3306 |

## 🌐 Access URLs

### Development Mode
```bash
./manage.sh up-dev
```

- **Frontend (Angular with hot reload):** http://localhost:4200
- **Symfony API:** http://localhost:8080
- **API Documentation:** http://localhost:8080/api/docs
- **MySQL:** localhost:3306

### Production Mode
```bash
./manage.sh up
```

- **Frontend (Compiled):** http://localhost:4200
- **Symfony API:** http://localhost:8080
- **API Documentation:** http://localhost:8080/api/docs
- **MySQL:** localhost:3306

## 🐳 Docker Services

### mysql
- Container: greeting-card-mysql
- Image: greeting-card-mysql-v1.0.0
- Port: 3306
- Database: greeting_card

### php
- Container: greeting-card-php
- Image: greeting-card-php-v1.0.0
- Port: 9000 (internal, via Nginx)
- Framework: Symfony 6.x + API Platform

### nginx-symfony (NEW) ⭐
- Container: greeting-card-nginx-symfony
- Image: nginx:alpine
- Port: 8080
- Purpose: Serve Symfony application via HTTP

### angular
- Container: greeting-card-angular
- Image: greeting-card-angular-prod-v1.0.0 (prod) or dev
- Port: 4200
- Purpose: Serve Angular frontend

## 🚀 Quick Start

### Launch Everything

```bash
cd docker

# Development mode (with hot reload)
./manage.sh up-dev

# Or production mode
./manage.sh up
```

### Access Services

```bash
# Frontend
open http://localhost:4200

# Backend API
open http://localhost:8080

# API Documentation
open http://localhost:8080/api/docs

# Connect to MySQL
mysql -h localhost -P 3306 -u user -p
```

## 📊 Request Flow

### Frontend to API
```
Browser (localhost:4200)
  ↓
Angular App
  ↓
HTTP Request (http://localhost:8080/api/...)
  ↓
Nginx (port 8080) ← NEW
  ↓
PHP-FPM (port 9000)
  ↓
Symfony App
  ↓
MySQL Database
  ↓
Response JSON back to Frontend
```

## ✨ What Changed

### Added to docker-compose.yml and docker-compose.dev.yml

```yaml
nginx-symfony:
  image: nginx:alpine
  container_name: greeting-card-nginx-symfony
  ports:
    - "8080:8080"
  volumes:
    - ../symfony:/app
    - ./nginx/nginx-symfony.conf:/etc/nginx/nginx.conf:ro
    - ./nginx/symfony.conf:/etc/nginx/conf.d/default.conf:ro
  networks:
    - greeting-card-network
  depends_on:
    - php
  restart: unless-stopped
  healthcheck:
    test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:8080/health"]
    interval: 10s
    timeout: 5s
    retries: 3
    start_period: 10s
```

## 💻 Common Commands

```bash
cd docker

# View all services
./manage.sh ps

# View logs
./manage.sh logs
./manage.sh logs-php
./manage.sh logs-nginx

# Stop everything
./manage.sh down

# Restart a service
docker compose restart nginx-api

# Check Nginx config
docker compose exec nginx-api nginx -t
```

## 🎯 Next Steps

1. **Launch the application:**
   ```bash
   cd docker && ./manage.sh up-dev
   ```

2. **Check everything is running:**
   ```bash
   ./manage.sh ps
   ```

3. **Access the services:**
   - Frontend: http://localhost:4200
   - API: http://localhost:8080
   - Docs: http://localhost:8080/api/docs

---

**All services are now configured and ready to use! 🚀**
