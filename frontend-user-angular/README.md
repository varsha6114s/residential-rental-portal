# Angular User Portal - Quick Start

## Prerequisites
- Node.js v18+ installed
- Backend Flask server running on `http://localhost:5000`

## Installation & Running

1. **Navigate to the Angular user portal**:
```bash
cd frontend-user-angular
```

2. **Install dependencies** (if not already done):
```bash
npm install
```

3. **Start the development server**:
```bash
npm start
```

The app will run on **http://localhost:4200**

## Features Implemented

### ✅ User Authentication
- Login with existing account
- Register new user account
- JWT token-based authentication
- Auto-redirect to towers after login

### ✅ Browse Towers
- View all available residential towers
- See tower details (address, floors, description)
- Navigate to view units in each tower

### ✅ View & Book Units
- Browse available units in selected tower
- View unit details (bedrooms, bathrooms, size, rent)
- Book available units with move-in date and lease duration
- Real-time availability status

### ✅ My Bookings
- View all your booking requests
- See booking status (pending/approved/rejected)
- View admin comments on bookings

## Tech Stack
- **Angular 20** - Component-based architecture
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **RxJS** - Reactive programming
- **Standalone Components** - Modern Angular approach

## Project Structure
```
src/app/
├── components/          # UI Components
│   ├── login/          # Login & Registration
│   ├── towers/         # Towers listing
│   ├── units/          # Units listing & booking
│   └── my-bookings/    # User's bookings
├── services/           # Business logic
│   ├── api.service.ts  # HTTP API calls
│   └── auth.service.ts # Authentication
├── guards/             # Route protection
│   └── auth.guard.ts   # Auth guard
├── models/             # TypeScript interfaces
│   └── models.ts       # Data models
└── app.routes.ts       # Routing configuration
```

## Default Login Credentials

### User Accounts
- **User 1**: `rajesh.kumar@example.com` / `password123`
- **User 2**: `priya.sharma@example.com` / `password123`

Or register a new account!

## API Integration
The app connects to the Flask backend at `http://localhost:5000/api` for:
- User authentication
- Tower data
- Unit listings
- Booking management

## Next Steps
To extend this MVP, you can:
1. Add Amenities component
2. Add Unit details page
3. Implement search/filter functionality
4. Add payment integration
5. Create admin portal with similar pattern
