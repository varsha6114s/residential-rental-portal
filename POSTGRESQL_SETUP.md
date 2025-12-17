# PostgreSQL Setup Guide

This application uses **PostgreSQL exclusively** as the database. No SQLite fallback is provided.

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)
```bash
cd backend
python setup_postgres.py
```

### Option 2: Manual Setup

## 📦 Install PostgreSQL

### Windows:
1. Download from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)
2. Install with default settings
3. Remember the password for `postgres` user

### macOS:
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Ubuntu/Debian:
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

## 🔧 Create Database and User

Connect to PostgreSQL as superuser:
```bash
psql -U postgres
```

Create database and user:
```sql
CREATE USER rental_user WITH PASSWORD 'rental_password';
CREATE DATABASE residential_rental OWNER rental_user;
GRANT ALL PRIVILEGES ON DATABASE residential_rental TO rental_user;
\q
```

## ⚙️ Environment Configuration

Create `.env` file in backend directory:
```bash
cd backend
cp .env.example .env
```

Update `.env` with your PostgreSQL connection:
```
DATABASE_URL=postgresql://rental_user:rental_password@localhost:5432/residential_rental
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
```

## 🏃‍♂️ Run Application

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

## ✅ Verify Setup

Check that all tables are created:
```bash
psql -U rental_user -d residential_rental
\dt
```

You should see: `users`, `towers`, `units`, `amenities`, `bookings`, `leases`, `payments` tables.

## 🐳 Docker Alternative

For easier setup, use Docker:
```bash
docker-compose up --build
```

This automatically sets up PostgreSQL with the correct configuration.

## 🔍 Troubleshooting

### Connection Issues:
1. Ensure PostgreSQL is running
2. Check username/password in `.env`
3. Verify database exists
4. Check firewall settings

### Permission Issues:
```sql
GRANT ALL PRIVILEGES ON DATABASE residential_rental TO rental_user;
GRANT ALL ON SCHEMA public TO rental_user;
```
