# 💻 Code Examples - Residential Apartment Rental Portal

This document shows sample code snippets to help you understand how each part works.

---

## 1. Frontend (Angular) Examples

### User Login Component (TypeScript)

```typescript
// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        // Store JWT token
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials';
      }
    });
  }
}
```

### Auth Service (HTTP Calls)

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email,
      password
    });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
```

### JWT Interceptor (Auto-add token to requests)

```typescript
// jwt.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Clone request and add Authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return next.handle(request);
  }
}
```

### Booking Component

```typescript
// booking.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html'
})
export class BookingComponent implements OnInit {
  unitId: number;
  moveInDate: string = '';
  unit: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.unitId = +this.route.snapshot.params['id'];
    this.loadUnitDetails();
  }

  loadUnitDetails() {
    this.bookingService.getUnit(this.unitId).subscribe({
      next: (data) => {
        this.unit = data;
      }
    });
  }

  submitBooking() {
    const bookingData = {
      unit_id: this.unitId,
      requested_move_in_date: this.moveInDate
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        alert('Booking request submitted successfully!');
        this.router.navigate(['/my-bookings']);
      },
      error: (error) => {
        alert('Failed to submit booking');
      }
    });
  }
}
```

### HTML Template with Tailwind CSS

```html
<!-- booking.component.html -->
<div class="container mx-auto px-4 py-8">
  <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">Book Apartment</h2>
    
    <!-- Unit Details -->
    <div class="mb-6" *ngIf="unit">
      <h3 class="text-xl font-semibold mb-2">{{ unit.unit_number }}</h3>
      <p class="text-gray-600">{{ unit.bedrooms }} Bed, {{ unit.bathrooms }} Bath</p>
      <p class="text-gray-600">{{ unit.size_sqft }} sq ft</p>
      <p class="text-2xl font-bold text-blue-600 mt-2">${{ unit.rent_amount }}/month</p>
    </div>

    <!-- Booking Form -->
    <form (ngSubmit)="submitBooking()">
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2">
          Preferred Move-in Date
        </label>
        <input 
          type="date" 
          [(ngModel)]="moveInDate"
          name="moveInDate"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button 
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit Booking Request
      </button>
    </form>
  </div>
</div>
```

---

## 2. Backend (Flask) Examples

### Main Application Setup

```python
# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.towers import towers_bp
    from routes.units import units_bp
    from routes.bookings import bookings_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(towers_bp, url_prefix='/api/towers')
    app.register_blueprint(units_bp, url_prefix='/api/units')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
```

### Configuration

```python
# config.py
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://admin:password@localhost:5432/rental_portal'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key'
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours
```

### Database Models

```python
# models.py
from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20))
    role = db.Column(db.String(20), default='user')  # 'user' or 'admin'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'phone': self.phone,
            'role': self.role
        }


class Tower(db.Model):
    __tablename__ = 'towers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    total_floors = db.Column(db.Integer)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    units = db.relationship('Unit', backref='tower', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'total_floors': self.total_floors,
            'description': self.description,
            'unit_count': len(self.units)
        }


class Unit(db.Model):
    __tablename__ = 'units'
    
    id = db.Column(db.Integer, primary_key=True)
    tower_id = db.Column(db.Integer, db.ForeignKey('towers.id'), nullable=False)
    unit_number = db.Column(db.String(20), nullable=False)
    floor = db.Column(db.Integer)
    bedrooms = db.Column(db.Integer)
    bathrooms = db.Column(db.Integer)
    size_sqft = db.Column(db.Integer)
    rent_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='available')  # available, occupied, maintenance
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    bookings = db.relationship('Booking', backref='unit', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'tower_id': self.tower_id,
            'tower_name': self.tower.name if self.tower else None,
            'unit_number': self.unit_number,
            'floor': self.floor,
            'bedrooms': self.bedrooms,
            'bathrooms': self.bathrooms,
            'size_sqft': self.size_sqft,
            'rent_amount': self.rent_amount,
            'status': self.status,
            'description': self.description
        }


class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    requested_move_in_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    admin_comments = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    lease = db.relationship('Lease', backref='booking', uselist=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_name': self.user.name if self.user else None,
            'user_email': self.user.email if self.user else None,
            'unit_id': self.unit_id,
            'unit_number': self.unit.unit_number if self.unit else None,
            'requested_move_in_date': self.requested_move_in_date.isoformat(),
            'status': self.status,
            'admin_comments': self.admin_comments,
            'created_at': self.created_at.isoformat()
        }


class Lease(db.Model):
    __tablename__ = 'leases'
    
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    unit_id = db.Column(db.Integer, db.ForeignKey('units.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    monthly_rent = db.Column(db.Float, nullable=False)
    security_deposit = db.Column(db.Float)
    status = db.Column(db.String(20), default='active')  # active, expired, terminated
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'booking_id': self.booking_id,
            'user_id': self.user_id,
            'unit_id': self.unit_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'monthly_rent': self.monthly_rent,
            'security_deposit': self.security_deposit,
            'status': self.status
        }
```

### Authentication Routes

```python
# routes/auth.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create new user
    user = User(
        email=data['email'],
        name=data.get('name', ''),
        phone=data.get('phone', ''),
        role=data.get('role', 'user')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({
        'message': 'User registered successfully',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Validate input
    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    # Find user
    user = User.query.filter_by(email=data['email']).first()
    
    # Check password
    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Create JWT token
    access_token = create_access_token(
        identity=user.id,
        additional_claims={'role': user.role}
    )
    
    return jsonify({
        'message': 'Login successful',
        'token': access_token,
        'user': user.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user.to_dict()), 200
```

### Booking Routes

```python
# routes/bookings.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timedelta
from app import db
from models import Booking, Unit, Lease

bookings_bp = Blueprint('bookings', __name__)

@bookings_bp.route('', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    # Validate input
    if not data.get('unit_id') or not data.get('requested_move_in_date'):
        return jsonify({'error': 'Unit ID and move-in date required'}), 400
    
    # Check if unit exists and is available
    unit = Unit.query.get(data['unit_id'])
    if not unit:
        return jsonify({'error': 'Unit not found'}), 404
    
    if unit.status != 'available':
        return jsonify({'error': 'Unit not available'}), 400
    
    # Create booking
    booking = Booking(
        user_id=user_id,
        unit_id=data['unit_id'],
        requested_move_in_date=datetime.fromisoformat(data['requested_move_in_date']),
        status='pending'
    )
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify({
        'message': 'Booking request submitted successfully',
        'booking': booking.to_dict()
    }), 201


@bookings_bp.route('', methods=['GET'])
@jwt_required()
def get_bookings():
    user_id = get_jwt_identity()
    claims = get_jwt()
    role = claims.get('role', 'user')
    
    if role == 'admin':
        # Admin sees all bookings
        status = request.args.get('status')
        query = Booking.query
        if status:
            query = query.filter_by(status=status)
        bookings = query.all()
    else:
        # User sees only their bookings
        bookings = Booking.query.filter_by(user_id=user_id).all()
    
    return jsonify([b.to_dict() for b in bookings]), 200


@bookings_bp.route('/<int:booking_id>/approve', methods=['PUT'])
@jwt_required()
def approve_booking(booking_id):
    claims = get_jwt()
    role = claims.get('role', 'user')
    
    # Only admin can approve
    if role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    if booking.status != 'pending':
        return jsonify({'error': 'Booking already processed'}), 400
    
    try:
        # Start transaction
        # Update booking status
        booking.status = 'approved'
        booking.updated_at = datetime.utcnow()
        
        # Create lease
        lease = Lease(
            booking_id=booking.id,
            user_id=booking.user_id,
            unit_id=booking.unit_id,
            start_date=booking.requested_move_in_date,
            end_date=booking.requested_move_in_date + timedelta(days=365),  # 1 year lease
            monthly_rent=booking.unit.rent_amount,
            security_deposit=booking.unit.rent_amount * 2,  # 2 months deposit
            status='active'
        )
        db.session.add(lease)
        
        # Update unit status
        unit = Unit.query.get(booking.unit_id)
        unit.status = 'occupied'
        
        # Commit transaction
        db.session.commit()
        
        return jsonify({
            'message': 'Booking approved successfully',
            'booking': booking.to_dict(),
            'lease': lease.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to approve booking'}), 500


@bookings_bp.route('/<int:booking_id>/reject', methods=['PUT'])
@jwt_required()
def reject_booking(booking_id):
    claims = get_jwt()
    role = claims.get('role', 'user')
    
    # Only admin can reject
    if role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 403
    
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'error': 'Booking not found'}), 404
    
    if booking.status != 'pending':
        return jsonify({'error': 'Booking already processed'}), 400
    
    data = request.get_json()
    booking.status = 'rejected'
    booking.admin_comments = data.get('comments', '')
    booking.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({
        'message': 'Booking rejected',
        'booking': booking.to_dict()
    }), 200
```

---

## 3. Docker Configuration

### Dockerfile for Backend

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run application
CMD ["python", "app.py"]
```

### Dockerfile for Frontend

```dockerfile
# frontend-user/Dockerfile
FROM node:18 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build Angular app
RUN npm run build --prod

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=build /app/dist/rental-portal /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  database:
    image: postgres:15
    container_name: rental_db
    environment:
      POSTGRES_DB: rental_portal
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data
    networks:
      - rental_network

  backend:
    build: ./backend
    container_name: rental_backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://admin:password@database:5432/rental_portal
      JWT_SECRET_KEY: your-secret-key-here
      SECRET_KEY: your-app-secret-key
    depends_on:
      - database
    networks:
      - rental_network

  frontend-user:
    build: ./frontend-user
    container_name: rental_frontend_user
    ports:
      - "4200:80"
    depends_on:
      - backend
    networks:
      - rental_network

  frontend-admin:
    build: ./frontend-admin
    container_name: rental_frontend_admin
    ports:
      - "4201:80"
    depends_on:
      - backend
    networks:
      - rental_network

volumes:
  db_data:

networks:
  rental_network:
    driver: bridge
```

### requirements.txt

```txt
Flask==2.3.0
Flask-SQLAlchemy==3.0.5
Flask-JWT-Extended==4.5.2
Flask-CORS==4.0.0
psycopg2-binary==2.9.6
python-dotenv==1.0.0
Werkzeug==2.3.0
```

---

## 4. Database Queries Examples

### SQL Queries (What SQLAlchemy generates)

```sql
-- Create user
INSERT INTO users (email, password_hash, name, phone, role, created_at)
VALUES ('john@example.com', '$2b$12$...', 'John Doe', '1234567890', 'user', NOW());

-- Find user by email
SELECT * FROM users WHERE email = 'john@example.com';

-- Create booking
INSERT INTO bookings (user_id, unit_id, requested_move_in_date, status, created_at)
VALUES (42, 5, '2025-12-01', 'pending', NOW());

-- Get all available units
SELECT u.*, t.name as tower_name 
FROM units u
JOIN towers t ON u.tower_id = t.id
WHERE u.status = 'available';

-- Get user's bookings with unit details
SELECT b.*, u.unit_number, u.rent_amount, t.name as tower_name
FROM bookings b
JOIN units u ON b.unit_id = u.id
JOIN towers t ON u.tower_id = t.id
WHERE b.user_id = 42
ORDER BY b.created_at DESC;

-- Approve booking (transaction)
BEGIN;
  UPDATE bookings SET status = 'approved', updated_at = NOW() WHERE id = 789;
  INSERT INTO leases (booking_id, user_id, unit_id, start_date, end_date, monthly_rent, status)
  VALUES (789, 42, 5, '2025-12-01', '2026-11-30', 1500, 'active');
  UPDATE units SET status = 'occupied' WHERE id = 5;
COMMIT;

-- Get occupancy statistics
SELECT 
  COUNT(*) as total_units,
  SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) as occupied_units,
  SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available_units,
  ROUND(SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as occupancy_rate
FROM units;
```

---

## 5. API Request/Response Examples

### Register User

**Request:**
```http
POST /api/auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123",
  "name": "John Doe",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 42,
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "1234567890",
    "role": "user"
  }
}
```

### Login

**Request:**
```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzOTU4...",
  "user": {
    "id": 42,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "user"
  }
}
```

### Create Booking

**Request:**
```http
POST /api/bookings HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "unit_id": 5,
  "requested_move_in_date": "2025-12-01"
}
```

**Response:**
```json
{
  "message": "Booking request submitted successfully",
  "booking": {
    "id": 789,
    "user_id": 42,
    "user_name": "John Doe",
    "unit_id": 5,
    "unit_number": "301",
    "requested_move_in_date": "2025-12-01",
    "status": "pending",
    "created_at": "2025-11-14T10:30:00"
  }
}
```

### Approve Booking (Admin)

**Request:**
```http
PUT /api/bookings/789/approve HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Response:**
```json
{
  "message": "Booking approved successfully",
  "booking": {
    "id": 789,
    "status": "approved",
    "updated_at": "2025-11-14T11:00:00"
  },
  "lease": {
    "id": 50,
    "booking_id": 789,
    "user_id": 42,
    "unit_id": 5,
    "start_date": "2025-12-01",
    "end_date": "2026-11-30",
    "monthly_rent": 1500,
    "security_deposit": 3000,
    "status": "active"
  }
}
```

---

**These code examples show exactly how each part of the system is implemented!** 🚀
