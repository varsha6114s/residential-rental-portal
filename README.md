# Residential Rental Portal - Angular 20

> **Full-Stack Web Application** for managing residential rental properties with Angular 20, Flask, PostgreSQL, and Docker.

[![Angular](https://img.shields.io/badge/Angular-20-red)](https://angular.io/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green)](https://flask.palletsprojects.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

---

## 🎯 Project Overview

A comprehensive residential rental management system with separate portals for residents and administrators. Built with modern technologies and containerized for easy deployment.

### **Key Features**
- 🏠 **User Portal**: Browse towers, view amenities, book units, track bookings
- 👨‍💼 **Admin Portal**: Manage towers, units, amenities, approve/reject bookings
- 🔐 **JWT Authentication**: Secure user and admin sessions
- 🐳 **Docker Ready**: One-command deployment with docker-compose
- 📊 **PostgreSQL**: Production-ready database (PostgreSQL only)

---

## 🚀 Quick Start

### **Option 1: Docker (Recommended)**
```bash
# Start all services
docker-compose up --build

# Access applications:
# User Portal: http://localhost:4200
# Admin Portal: http://localhost:4201
# Backend API: http://localhost:5000
```

### **Option 2: Local Development**
```bash
# Setup PostgreSQL Database
cd backend
python setup_postgres.py  # Creates database and user

# Backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

# User Portal
cd frontend-user-angular
npm install
npm start  # http://localhost:4200

# Admin Portal
cd frontend-admin-angular
npm install
npm start  # http://localhost:4201
```

---

## 📋 Tech Stack

### **Frontend**
- **Angular 20** - Modern component-based framework
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **Custom CSS** - Responsive design

### **Backend**
- **Python Flask** - RESTful API server
- **SQLAlchemy** - ORM for database operations
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing

### **Database**
- **PostgreSQL** - Primary database (development & production)

### **DevOps**
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Frontend web server

---

## 🏗️ Project Structure

```
residential-rental-portal/
├── backend/                    # Flask API
│   ├── models/                # Database models
│   ├── routes/                # API endpoints
│   ├── Dockerfile             # Backend container
│   └── app.py                 # Main application
├── frontend-user-angular/      # User Portal
│   ├── src/app/
│   │   ├── components/        # 5 Angular components
│   │   ├── services/          # API & Auth services
│   │   └── guards/            # Route protection
│   ├── Dockerfile             # User portal container
│   └── nginx.conf             # Nginx configuration
├── frontend-admin-angular/     # Admin Portal
│   ├── src/app/
│   │   ├── components/        # 6 Angular components
│   │   ├── services/          # Admin API & Auth
│   │   └── guards/            # Admin route protection
│   ├── Dockerfile             # Admin portal container
│   └── nginx.conf             # Nginx configuration
├── docker-compose.yml          # Multi-container setup
├── DOCKER_GUIDE.md            # Docker deployment guide
└── POSTGRESQL_SETUP.md        # PostgreSQL setup guide
```

---

## 👤 Default Credentials

### **User Portal**
- Email: `rajesh.kumar@example.com`
- Password: `password123`

### **Admin Portal**
- Email: `admin@rental.com`
- Password: `admin123`

---

## 📱 Features

### **User Portal**
- ✅ User registration and login
- ✅ Browse available towers
- ✅ View unit details (bedrooms, bathrooms, rent)
- ✅ View amenities (gym, pool, parking)
- ✅ Book available units
- ✅ Track booking status (pending/approved/rejected)

### **Admin Portal**
- ✅ Admin authentication
- ✅ Dashboard with statistics
- ✅ Manage towers (Create, Read, Update, Delete)
- ✅ Manage units (Create, Read, Update, Delete)
- ✅ Manage amenities (Create, Read, Update, Delete)
- ✅ Approve or reject booking requests
- ✅ Add admin comments to bookings

---

## 🗄️ Database Schema

### **Tables**
- `users` - User accounts and authentication
- `towers` - Residential tower information
- `units` - Individual rental units
- `amenities` - Facility information
- `bookings` - Rental booking requests
- `leases` - Active rental agreements

---

## 🔧 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User/Admin login

### **Towers**
- `GET /api/towers` - List all towers
- `POST /api/towers` - Create tower (admin)
- `PUT /api/towers/:id` - Update tower (admin)
- `DELETE /api/towers/:id` - Delete tower (admin)

### **Units**
- `GET /api/units` - List all units
- `GET /api/towers/:id/units` - Units by tower
- `POST /api/units` - Create unit (admin)
- `PUT /api/units/:id` - Update unit (admin)
- `DELETE /api/units/:id` - Delete unit (admin)

### **Amenities**
- `GET /api/amenities` - List all amenities
- `POST /api/amenities` - Create amenity (admin)
- `PUT /api/amenities/:id` - Update amenity (admin)
- `DELETE /api/amenities/:id` - Delete amenity (admin)

### **Bookings**
- `GET /api/bookings` - List bookings (admin)
- `GET /api/bookings/my` - User's bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id/approve` - Approve booking (admin)
- `PUT /api/bookings/:id/reject` - Reject booking (admin)

---

## 📊 Statistics

- **11 Angular Components** (5 user + 6 admin)
- **4 Services** (API, Auth for both portals)
- **2 Route Guards** (User & Admin protection)
- **3,000+ Lines of Code** (TypeScript, HTML, CSS)
- **100% TypeScript** - Type-safe development
- **Responsive Design** - Mobile-friendly UI

---

## 🐳 Docker Services

The `docker-compose.yml` includes:
1. **PostgreSQL** - Database server (port 5432)
2. **Backend** - Flask API (port 5000)
3. **User Portal** - Angular app (port 4200)
4. **Admin Portal** - Angular app (port 4201)

---

## 📚 Documentation

- [Docker Deployment Guide](DOCKER_GUIDE.md)
- [PostgreSQL Setup Guide](POSTGRESQL_SETUP.md)
- [User Portal README](frontend-user-angular/README.md)
- [Admin Portal README](frontend-admin-angular/README.md)

---

## 🛠️ Development

### **Backend Development**
```bash
cd backend
source venv/bin/activate
python app.py
```

### **Frontend Development**
```bash
# User Portal
cd frontend-user-angular
npm start

# Admin Portal
cd frontend-admin-angular
npm start
```

### **Database Setup**
The PostgreSQL database is automatically created when the Flask app starts. For local development:
```bash
# Setup PostgreSQL database and user
cd backend
python setup_postgres.py

# Start the application
python app.py
```

---

## 🚢 Production Deployment

### **Build for Production**
```bash
# Build Angular apps
cd frontend-user-angular && npm run build
cd frontend-admin-angular && npm run build

# Start with Docker
docker-compose up -d
```

### **Environment Variables**
Update `docker-compose.yml` for production:
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT signing key
- `POSTGRES_PASSWORD` - Database password

---

## 📝 License

This project is part of the Zeno Talent Internship Program.

---

## 👨‍💻 Author

- GitHub: [@varsha6114s](https://github.com/varsha6114s)

---
