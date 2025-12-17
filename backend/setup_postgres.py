#!/usr/bin/env python3
"""
PostgreSQL Database Setup Script
Creates the database and user if they don't exist
"""

import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import sys

def create_database():
    """Create PostgreSQL database and user"""
    try:
        # Connect to PostgreSQL server (default database)
        conn = psycopg2.connect(
            host='localhost',
            port=5432,
            user='postgres',  # Default PostgreSQL superuser
            password='postgres'  # Change this to your PostgreSQL password
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Create user if not exists
        cursor.execute("""
            DO $$ 
            BEGIN
                IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'rental_user') THEN
                    CREATE USER rental_user WITH PASSWORD 'rental_password';
                END IF;
            END
            $$;
        """)
        
        # Create database if not exists
        cursor.execute("""
            SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'residential_rental'
        """)
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute("CREATE DATABASE residential_rental OWNER rental_user")
            print("✅ Database 'residential_rental' created successfully")
        else:
            print("✅ Database 'residential_rental' already exists")
        
        # Grant privileges
        cursor.execute("GRANT ALL PRIVILEGES ON DATABASE residential_rental TO rental_user")
        
        cursor.close()
        conn.close()
        
        print("✅ PostgreSQL setup completed successfully!")
        print("Database: residential_rental")
        print("User: rental_user")
        print("Password: rental_password")
        
    except psycopg2.Error as e:
        print(f"❌ Error setting up PostgreSQL: {e}")
        print("\nMake sure:")
        print("1. PostgreSQL is running")
        print("2. You have superuser access")
        print("3. Update the connection parameters in this script")
        sys.exit(1)

if __name__ == "__main__":
    create_database()