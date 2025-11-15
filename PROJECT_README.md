# 🏢 Residential Apartment Rental Portal - Project Setup

Complete full-stack apartment rental management system with Angular, Flask, PostgreSQL, and Docker.

---

## 📋 Prerequisites

Before running the project, ensure you have:

- **Docker** and **Docker Compose** installed
- **Python 3.11+** (for local development)
- **Node.js 18+** and **npm** (for frontend development)
- **PostgreSQL 15** (if running without Docker)

---

## 🚀 Quick Start with Docker

### 1. Start the Backend and Database

```bash
# Start database and backend services
docker-compose up --build

# The backend will be available at http://localhost:5000
```

### 2. Seed the Database (First Time Only)

In a new terminal:

```bash
# Access the backend container
docker exec -it rental_backend bash

# Run the seed script
python seed_data.py

# Exit the container
exit
```

### 3. Test the API

```bash
# Check if API is running
curl http://localhost:5000

# Login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rental.com","password":"admin123"}'

# Get all towers
curl http://localhost:5000/api/towers
```

---

## 💻 Local Development Setup (Without Docker)

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://admin:password@localhost:5432/rental_portal

# Create PostgreSQL database
createdb rental_portal

# Run the application
python app.py

# In another terminal, seed the database
python seed_data.py
```

The backend will be available at `http://localhost:5000`

---

## 🗄️ Database Setup

### Using Docker (Recommended)

The database is automatically created when you run `docker-compose up`.

### Manual PostgreSQL Setup

```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb rental_portal

# Create user (optional)
psql rental_portal
CREATE USER admin WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE rental_portal TO admin;
\q
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login and get JWT token
GET    /api/auth/me          - Get current user info
```

### Towers
```
GET    /api/towers           - Get all towers
GET    /api/towers/:id       - Get single tower
POST   /api/towers           - Create tower (admin)
PUT    /api/towers/:id       - Update tower (admin)
DELETE /api/towers/:id       - Delete tower (admin)
```

### Units
```
GET    /api/units            - Get all units (with filters)
GET    /api/units/:id        - Get single unit
POST   /api/units            - Create unit (admin)
PUT    /api/units/:id        - Update unit (admin)
DELETE /api/units/:id        - Delete unit (admin)
```

### Amenities
```
GET    /api/amenities        - Get all amenities
GET    /api/amenities/:id    - Get single amenity
POST   /api/amenities        - Create amenity (admin)
PUT    /api/amenities/:id    - Update amenity (admin)
DELETE /api/amenities/:id    - Delete amenity (admin)
```

### Bookings
```
POST   /api/bookings                - Create booking request
GET    /api/bookings                - Get bookings (filtered by user/admin)
GET    /api/bookings/:id            - Get single booking
PUT    /api/bookings/:id/approve    - Approve booking (admin)
PUT    /api/bookings/:id/reject     - Reject booking (admin)
```

### Leases
```
GET    /api/leases           - Get leases (filtered by user/admin)
GET    /api/leases/:id       - Get single lease
GET    /api/leases/stats     - Get lease statistics (admin)
```

### Payments
```
POST   /api/payments         - Record payment (admin)
GET    /api/payments         - Get payments (filtered by user/admin)
GET    /api/payments/:id     - Get single payment
```

---

## 🔑 Default Login Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@rental.com`
- Password: `admin123`

**User Accounts:**
- Email: `john@example.com` / Password: `password123`
- Email: `jane@example.com` / Password: `password123`

---

## 🧪 Testing the API

### Using cURL

```bash
# 1. Login and get token
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rental.com","password":"admin123"}' \
  | jq -r '.token')

# 2. Get all towers
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/api/towers

# 3. Get available units
curl http://localhost:5000/api/units?status=available

# 4. Create a booking (as user)
USER_TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  | jq -r '.token')

curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"unit_id":1,"requested_move_in_date":"2025-12-01"}'

# 5. Get pending bookings (as admin)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5000/api/bookings?status=pending"
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5000`
3. Login to get JWT token
4. Add token to Authorization header: `Bearer <token>`
5. Test all endpoints

---

## 📁 Project Structure

```
residential-rental-portal/
├── backend/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── towers.py
│   │   ├── units.py
│   │   ├── amenities.py
│   │   ├── bookings.py
│   │   ├── leases.py
│   │   └── payments.py
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   ├── seed_data.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
└── PROJECT_README.md
```

---

## 🔧 Common Commands

### Docker Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild containers
docker-compose up --build

# Access backend container
docker exec -it rental_backend bash

# Access database
docker exec -it rental_db psql -U admin -d rental_portal
```

### Database Commands

```bash
# Inside the database container
docker exec -it rental_db psql -U admin -d rental_portal

# List tables
\dt

# View users
SELECT * FROM users;

# View towers
SELECT * FROM towers;

# View units
SELECT * FROM units;

# View bookings
SELECT * FROM bookings;

# Exit
\q
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Check what's using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change the port in docker-compose.yml
```

### Database Connection Error

```bash
# Check if database is running
docker ps

# Check database logs
docker-compose logs database

# Restart database
docker-compose restart database
```

### Permission Denied

```bash
# Fix file permissions
chmod +x backend/app.py
chmod +x backend/seed_data.py
```

### Module Not Found

```bash
# Reinstall dependencies
pip install -r backend/requirements.txt

# Or rebuild Docker container
docker-compose up --build
```

---

## 📊 Sample Data

After seeding, you'll have:

- **3 Towers**: Tower A, Tower B, Tower C
- **11 Units**: Various sizes (1-4 bedrooms)
- **6 Amenities**: Pool, Gym, Parking, Clubhouse, Playground, Business Center
- **3 Users**: 1 admin, 2 regular users

---

## 🔐 Security Notes

**For Production:**

1. Change all default passwords
2. Use strong JWT secret keys
3. Enable HTTPS
4. Set up proper CORS origins
5. Use environment variables for secrets
6. Enable rate limiting
7. Add input validation
8. Implement logging and monitoring

---

## 🚀 Next Steps

1. ✅ Backend API is complete and running
2. 🔄 Frontend (Angular) - Coming next
3. 🔄 Admin Portal (Angular) - Coming next
4. 🔄 Complete Docker setup with all services

---

## 📝 API Testing Examples

### Complete Booking Workflow

```bash
# 1. User registers
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123",
    "name":"Test User",
    "phone":"5551234567"
  }'

# 2. User logs in
USER_TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  | jq -r '.token')

# 3. User browses available units
curl http://localhost:5000/api/units?status=available

# 4. User creates booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "unit_id":1,
    "requested_move_in_date":"2025-12-01"
  }'

# 5. Admin logs in
ADMIN_TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rental.com","password":"admin123"}' \
  | jq -r '.token')

# 6. Admin views pending bookings
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  "http://localhost:5000/api/bookings?status=pending"

# 7. Admin approves booking (replace :id with actual booking ID)
curl -X PUT http://localhost:5000/api/bookings/1/approve \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# 8. User views their lease
curl -H "Authorization: Bearer $USER_TOKEN" \
  http://localhost:5000/api/leases
```

---

## 💡 Development Tips

1. **Use Postman** for easier API testing
2. **Check logs** when debugging: `docker-compose logs -f`
3. **Seed data** can be run multiple times (it clears existing data)
4. **JWT tokens** expire after 24 hours
5. **Database changes** require container restart

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check Docker logs
4. Verify database connection

---

**🎉 Your backend is ready! Start building the frontend next.**
