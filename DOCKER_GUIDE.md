# Docker Deployment Guide

## Prerequisites
- Docker installed
- Docker Compose installed

## Quick Start

### 1. Build and Start All Services
```bash
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Flask backend on port 5000
- User portal on port 4200
- Admin portal on port 4201

### 2. Access the Applications

**User Portal**: http://localhost:4200
- Login: `rajesh.kumar@example.com` / `password123`

**Admin Portal**: http://localhost:4201
- Login: `admin@rental.com` / `admin123`

**Backend API**: http://localhost:5000/api

### 3. Stop Services
```bash
docker-compose down
```

### 4. Stop and Remove Volumes
```bash
docker-compose down -v
```

## Individual Service Commands

### Build specific service:
```bash
docker-compose build backend
docker-compose build user-portal
docker-compose build admin-portal
```

### Start specific service:
```bash
docker-compose up backend
docker-compose up user-portal
docker-compose up admin-portal
```

### View logs:
```bash
docker-compose logs -f backend
docker-compose logs -f user-portal
docker-compose logs -f admin-portal
```

## Database Access

### Connect to PostgreSQL:
```bash
docker exec -it rental-postgres psql -U rental_user -d residential_rental
```

### Backup Database:
```bash
docker exec rental-postgres pg_dump -U rental_user residential_rental > backup.sql
```

### Restore Database:
```bash
docker exec -i rental-postgres psql -U rental_user residential_rental < backup.sql
```

## Production Deployment

### Update Environment Variables
Edit `docker-compose.yml` and change:
- `SECRET_KEY`
- `JWT_SECRET_KEY`
- `POSTGRES_PASSWORD`

### Run in Detached Mode
```bash
docker-compose up -d
```

### Check Status
```bash
docker-compose ps
```

## Troubleshooting

### View all containers:
```bash
docker ps -a
```

### Restart a service:
```bash
docker-compose restart backend
```

### Rebuild without cache:
```bash
docker-compose build --no-cache
```

### Remove all containers and volumes:
```bash
docker-compose down -v
docker system prune -a
```
