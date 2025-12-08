# Residential Rental Portal

A full-stack web application for managing residential rental properties with separate portals for users and administrators.

## Tech Stack

- **Frontend**: Vanilla JavaScript + Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

## Features

### User Portal
- Browse available towers and units
- View unit details with pricing in Indian Rupees (₹)
- Submit booking requests
- Track booking status
- View amenities

### Admin Portal
- Dashboard with statistics
- Manage towers and units
- Approve/reject booking requests
- View and manage leases
- Manage amenities

## Quick Start

### Prerequisites
- Python 3.x
- Web browser

### Setup

1. **Clone the repository**
```bash
cd /Users/shivasagar/KOTS/residential-rental-portal
```

2. **Install backend dependencies**
```bash
cd backend
python3 -m venv venv
./venv/bin/pip install Flask Flask-SQLAlchemy Flask-JWT-Extended Flask-CORS Werkzeug python-dotenv
```

3. **Seed the database**
```bash
./venv/bin/python seed_data.py
```

4. **Start the backend server**
```bash
./venv/bin/python app.py
```

The backend will run on `http://localhost:5000`

5. **Open the frontend**
```bash
open index.html
```

## Login Credentials

### Admin Portal
- Email: `admin@rental.com`
- Password: `admin123`

### User Portal
- User 1: `rajesh.kumar@example.com` / `password123`
- User 2: `priya.sharma@example.com` / `password123`

## Project Structure

```
residential-rental-portal/
├── index.html              # Landing page with portal selection
├── frontend-user/          # User portal
│   └── index.html
├── frontend-admin/         # Admin portal
│   ├── index.html
│   └── admin.js
├── backend/                # Flask backend
│   ├── app.py             # Main application
│   ├── config.py          # Configuration
│   ├── models.py          # Database models
│   ├── seed_data.py       # Sample data script
│   └── routes/            # API endpoints
└── instance/              # SQLite database
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User/Admin login

### Towers
- `GET /api/towers` - Get all towers
- `POST /api/towers` - Create tower (admin)
- `DELETE /api/towers/:id` - Delete tower (admin)

### Units
- `GET /api/units` - Get all units
- `POST /api/units` - Create unit (admin)
- `DELETE /api/units/:id` - Delete unit (admin)

### Bookings
- `GET /api/bookings` - Get bookings
- `POST /api/bookings` - Create booking request
- `PUT /api/bookings/:id/approve` - Approve booking (admin)
- `PUT /api/bookings/:id/reject` - Reject booking (admin)

### Amenities
- `GET /api/amenities` - Get all amenities
- `POST /api/amenities` - Create amenity (admin)

### Leases
- `GET /api/leases` - Get all leases

## Sample Data

The application comes pre-loaded with:
- 3 Towers (Mumbai, Bangalore, Delhi)
- 11 Units (1BHK to 4BHK)
- 6 Amenities
- 3 Users (1 admin, 2 regular users)

## Development

The application uses SQLite for easy setup and development. For production, you can switch to PostgreSQL by updating the `config.py` file.

## License

MIT License
