# Angular User Portal

> Modern Angular 20 application for residential rental management - User interface

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed
- Backend Flask server running on `http://localhost:5000`

### Installation & Running

```bash
# Navigate to user portal
cd frontend-user-angular

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

The app will run on **http://localhost:4200**

---

## ✅ Features Implemented

### 1. User Authentication
- Login with existing account
- Register new user
- JWT token-based authentication
- Auto-redirect after login
- Secure route protection

### 2. Browse Towers
- View all available residential towers
- Tower details (name, address, floors)
- Tower descriptions
- Navigate to view units

### 3. View & Book Units
- Browse units in selected tower
- Unit details (bedrooms, bathrooms, size, rent)
- Real-time availability status
- Booking modal with date picker
- Lease duration selection (6/12/24 months)

### 4. View Amenities
- Browse all available amenities
- Amenity details and descriptions
- Availability hours
- Active status indicators

### 5. My Bookings
- View all booking requests
- Booking status (pending/approved/rejected)
- Admin comments display
- Formatted dates
- Empty state handling

---

## 🏗️ Project Structure

```
src/app/
├── components/
│   ├── login/              # Login & Registration
│   │   ├── login.ts        # Component logic
│   │   ├── login.html      # Template
│   │   └── login.css       # Styles
│   ├── towers/             # Towers listing
│   │   ├── towers.ts
│   │   ├── towers.html
│   │   └── towers.css
│   ├── units/              # Units listing & booking
│   │   ├── units.ts
│   │   ├── units.html
│   │   └── units.css
│   ├── amenities/          # Amenities view
│   │   ├── amenities.ts
│   │   ├── amenities.html
│   │   └── amenities.css
│   └── my-bookings/        # User's bookings
│       ├── my-bookings.ts
│       ├── my-bookings.html
│       └── my-bookings.css
├── services/
│   ├── api.service.ts      # HTTP API calls
│   └── auth.service.ts     # Authentication logic
├── guards/
│   └── auth.guard.ts       # Route protection
├── models/
│   └── models.ts           # TypeScript interfaces
├── app.component.ts        # Root component
├── app.config.ts           # App configuration
└── app.routes.ts           # Routing setup
```

---

## 🎨 Tech Stack

- **Angular 20** - Latest Angular framework
- **TypeScript** - Type-safe development
- **Custom CSS** - Responsive styling
- **RxJS** - Reactive programming
- **Standalone Components** - Modern Angular pattern
- **HTTP Client** - API communication

---

## 🔑 Default Credentials

### Test Users
- **User 1:** `rajesh.kumar@example.com` / `password123`
- **User 2:** `priya.sharma@example.com` / `password123`
- **User 3:** `amit.patel@example.com` / `password123`

Or **register a new account**!

---

## 🔌 API Integration

The app connects to Flask backend at `http://localhost:5000/api`:

### Endpoints Used:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/towers` - Get all towers
- `GET /api/towers/:id/units` - Get units by tower
- `GET /api/amenities` - Get all amenities
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my` - Get user's bookings

---

## 🎯 Component Details

### LoginComponent
- Toggle between login and registration
- Form validation
- Error handling
- JWT token storage

### TowersComponent
- Grid layout of towers
- Loading states
- Navigation to units
- Logout functionality

### UnitsComponent
- Unit cards with details
- Availability badges
- Booking modal
- Date picker integration

### AmenitiesComponent
- Amenity cards
- Active/inactive status
- Availability hours display

### MyBookingsComponent
- Booking history
- Status badges (color-coded)
- Admin comments
- Empty state

---

## 🎨 Design Features

### Color Scheme
- Primary: `#dc2626` (Red 600)
- Secondary: `#b91c1c` (Red 700)
- Background: `#f9fafb` (Gray 50)
- Text: `#1f2937` (Gray 800)

### UI Components
- Responsive grid layouts
- Loading spinners
- Status badges
- Modal dialogs
- Form validation
- Hover effects

---

## 📦 Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/frontend-user-angular/browser
```

---

## 🐳 Docker Deployment

The user portal includes a Dockerfile for containerized deployment:

```bash
# Build Docker image
docker build -t user-portal .

# Run container
docker run -p 4200:80 user-portal
```

Or use docker-compose from the root directory:
```bash
docker-compose up user-portal
```

---

## 📊 Code Statistics

- **5 Components** (Login, Towers, Units, Amenities, My Bookings)
- **2 Services** (API, Auth)
- **1 Guard** (Auth)
- **TypeScript Models** for type safety
- **Custom CSS** for styling
- **~1,500 lines of code**

---

## 🔧 Development

### Run Development Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

---

## 🆘 Troubleshooting

**Port 4200 already in use?**
```bash
# Kill the process
lsof -ti:4200 | xargs kill -9

# Or use a different port
ng serve --port 4201
```

**Backend connection errors?**
- Ensure Flask server is running on `http://localhost:5000`
- Check CORS settings in backend

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 License

Part of the Residential Rental Portal project.

---

## 👨‍💻 Author

**Shiva Sagar**
- GitHub: [@varsha6114s](https://github.com/varsha6114s)
