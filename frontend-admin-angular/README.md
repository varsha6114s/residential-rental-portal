# Angular Admin Portal - README

## Quick Start

### Prerequisites
- Backend Flask server running on `http://localhost:5000`
- Node.js v18+ installed

### Installation & Running

1. Navigate to admin portal:
```bash
cd frontend-admin-angular
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

The admin portal will run on **http://localhost:4201**

## Login Credentials

**Admin Account:**
- Email: `admin@rental.com`
- Password: `admin123`

## Features

### ✅ Dashboard
- View statistics overview
- Total towers, units, bookings, leases
- Occupancy rates

### ✅ Manage Towers
- View all towers
- Add new towers
- Edit tower details
- Delete towers

### ✅ Manage Units
- View all units
- Add new units
- Edit unit details
- Delete units

### ✅ Bookings Management
- View all booking requests
- Approve bookings
- Reject bookings with comments

## Tech Stack
- Angular 20
- TypeScript
- Standalone Components
- RxJS
- Custom CSS

## API Integration
Connects to Flask backend at `http://localhost:5000/api`
