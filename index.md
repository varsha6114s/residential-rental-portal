---
layout: default
title: Home
---
# 🏢 Residential Apartment Rental Portal

A complete full-stack web application demonstrating modern web development practices.

## 🌟 Live Demos

**👥 [User Portal Demo](./frontend-user/)** - Experience the tenant interface  
**🔐 [Admin Portal Demo](./frontend-admin/)** - Explore the property management interface  
**📚 [Documentation](./documentation/)** - Complete project documentation

## 🛠️ Tech Stack

| Frontend | Backend | Database | Deployment |
|----------|---------|----------|------------|
| Angular 20 | Flask (Python) | PostgreSQL | Docker |
| Tailwind CSS | SQLAlchemy ORM | SQLite | GitHub Pages |
| TypeScript | JWT Auth | - | Heroku Ready |

## ⚡ Quick Features

- ✅ **User Registration & Login** with JWT authentication
- ✅ **Browse Apartments** with filtering and search
- ✅ **Booking System** with approval workflow
- ✅ **Admin Dashboard** with analytics
- ✅ **Responsive Design** works on all devices
- ✅ **RESTful API** with 29 endpoints
- ✅ **Database Design** with proper relationships
- ✅ **Docker Ready** for easy deployment

## 🎯 Project Highlights

This project demonstrates:
- **Full-Stack Development**: Complete frontend and backend implementation
- **Modern Architecture**: 3-tier architecture with clear separation of concerns
- **Security**: JWT authentication, password hashing, role-based access
- **Database Design**: Normalized schema with foreign key relationships
- **API Design**: RESTful endpoints following best practices
- **UI/UX**: Professional, responsive design
- **DevOps**: Containerization with Docker
- **Documentation**: Comprehensive project documentation

## 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/varsha6114s/residential-rental-portal.git
cd residential-rental-portal

# Set up virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Run the application
python backend/app.py
```

## 📊 Architecture Overview

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐    SQL    ┌─────────────────┐
│   Frontend      │ ──────────────► │    Backend      │ ────────► │    Database     │
│   (Angular)     │                 │    (Flask)      │           │  (PostgreSQL)   │
│                 │                 │                 │           │                 │
│ • User Portal   │                 │ • REST APIs     │           │ • Users         │
│ • Admin Portal  │                 │ • JWT Auth      │           │ • Towers        │
│ • Responsive UI │                 │ • Business      │           │ • Units         │
│                 │                 │   Logic         │           │ • Bookings      │
└─────────────────┘                 └─────────────────┘           └─────────────────┘
```

## 🎤 Interview Ready

This project is designed to showcase:
- **Problem-solving skills**: Complete booking workflow implementation
- **Technical knowledge**: Modern web development stack
- **Best practices**: Security, testing, documentation
- **Communication**: Clear code structure and documentation

## 📞 Contact

**GitHub**: [@varsha6114s](https://github.com/varsha6114s)  
**Project**: [View on GitHub](https://github.com/varsha6114s/residential-rental-portal)

---

⭐ **Star this repository if you found it helpful!**
