# PostgreSQL Migration Guide

## Install PostgreSQL

### macOS:
```bash
brew install postgresql@14
brew services start postgresql@14
```

### Create Database:
```bash
createdb residential_rental
```

## Update Backend Configuration

The backend has been configured to use PostgreSQL. Update your `.env` file or environment variables:

```
DATABASE_URL=postgresql://localhost/residential_rental
```

## Install Python PostgreSQL Driver

```bash
cd backend
source venv/bin/activate
pip install psycopg2-binary
pip freeze > requirements.txt
```

## Run Migrations

The database will be automatically created when you start the Flask app:

```bash
cd backend
./venv/bin/python app.py
```

## Verify Migration

Check that all tables are created:
```bash
psql residential_rental
\dt
```

You should see: users, towers, units, amenities, bookings, leases tables.
