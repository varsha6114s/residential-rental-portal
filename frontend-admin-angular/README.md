# Angular Admin Portal

> Modern Angular 20 application for residential rental management - Admin interface

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed
- Backend Flask server running on `http://localhost:5000`

### Installation & Running

```bash
# Navigate to admin portal
cd frontend-admin-angular

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

The admin portal will run on **http://localhost:4201**

---

## 🔑 Login Credentials

**Admin Account:**
- **Email:** `admin@rental.com`
- **Password:** `admin123`

---

## ✅ Features Implemented

### 1. Admin Authentication
- Secure admin login
- Role-based access control
- JWT token management
- Auto-redirect to dashboard

### 2. Dashboard
- Statistics overview
- Total towers count
- Total units count
- Occupied vs available units
- Pending bookings count
- Active leases count
- Real-time data display

### 3. Manage Towers
- View all towers in table format
- Add new towers
- Edit existing towers
- Delete towers
- Validation and error handling

### 4. Manage Units
- View all units across towers
- Add new units to towers
- Edit unit details
- Delete units
- Tower selection dropdown
- Status management (available/occupied/maintenance)

### 5. Manage Amenities
- View all amenities
- Add new amenities
- Edit amenity details
- Delete amenities
- Active/inactive status toggle
- Availability hours management

### 6. Bookings Management
- View all booking requests
- Approve bookings with comments
- Reject bookings with reasons
- Filter by status
- User and unit information display

---

## 🏗️ Project Structure

```
src/app/
├── components/
│   ├── login/              # Admin login
│   │   ├── login.ts
│   │   ├── login.html
│   │   └── login.css
│   ├── dashboard/          # Statistics dashboard
│   │   ├── dashboard.ts
│   │   ├── dashboard.html
│   │   └── dashboard.css
│   ├── manage-towers/      # Towers CRUD
│   │   ├── manage-towers.ts
│   │   ├── manage-towers.html
│   │   └── manage-towers.css
│   ├── manage-units/       # Units CRUD
│   │   ├── manage-units.ts
│   │   ├── manage-units.html
│   │   └── manage-units.css
│   ├── manage-amenities/   # Amenities CRUD
│   │   ├── manage-amenities.ts
│   │   ├── manage-amenities.html
│   │   └── manage-amenities.css
│   └── bookings/           # Booking management
│       ├── bookings.ts
│       ├── bookings.html
│       └── bookings.css
├── services/
│   ├── admin-api.service.ts    # HTTP API calls
│   └── admin-auth.service.ts   # Authentication
├── guards/
│   └── admin.guard.ts          # Route protection
├── models/
│   └── models.ts               # TypeScript interfaces
├── app.component.ts            # Root component
├── app.config.ts               # App configuration
└── app.routes.ts               # Routing setup
```

---

## 🎨 Tech Stack

- **Angular 20** - Latest Angular framework
- **TypeScript** - Type-safe development
- **Custom CSS** - Professional styling
- **RxJS** - Reactive programming
- **Standalone Components** - Modern Angular pattern
- **HTTP Client** - API communication

---

## 🔌 API Integration

The app connects to Flask backend at `http://localhost:5000/api`:

### Endpoints Used:
- `POST /api/auth/login` - Admin login
- `GET /api/stats` - Dashboard statistics
- `GET /api/towers` - Get all towers
- `POST /api/towers` - Create tower
- `PUT /api/towers/:id` - Update tower
- `DELETE /api/towers/:id` - Delete tower
- `GET /api/units` - Get all units
- `POST /api/units` - Create unit
- `PUT /api/units/:id` - Update unit
- `DELETE /api/units/:id` - Delete unit
- `GET /api/amenities` - Get all amenities
- `POST /api/amenities` - Create amenity
- `PUT /api/amenities/:id` - Update amenity
- `DELETE /api/amenities/:id` - Delete amenity
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/:id/approve` - Approve booking
- `PUT /api/bookings/:id/reject` - Reject booking

---

## 🎯 Component Details

### LoginComponent
- Admin authentication
- Form validation
- Error handling
- Role verification

### DashboardComponent
- Statistics cards
- Real-time data
- Navigation menu
- Logout functionality

### ManageTowersComponent
- Data table view
- Add/Edit modal
- Delete confirmation
- Form validation

### ManageUnitsComponent
- Comprehensive unit form
- Tower selection
- Status dropdown
- Multi-field validation

### ManageAmenitiesComponent
- Amenity CRUD operations
- Active status toggle
- Hours input
- Description field

### BookingsComponent
- Booking requests table
- Approve/Reject modals
- Comments input
- Status indicators

---

## 🎨 Design Features

### Color Scheme
- Primary: `#dc2626` (Red 600)
- Secondary: `#b91c1c` (Red 700)
- Success: `#10b981` (Green 500)
- Background: `#f9fafb` (Gray 50)

### UI Components
- Navigation tabs
- Data tables
- Modal dialogs
- Form inputs
- Status badges
- Action buttons
- Loading states

---

## 📦 Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/frontend-admin-angular/browser
```

---

## 🐳 Docker Deployment

The admin portal includes a Dockerfile for containerized deployment:

```bash
# Build Docker image
docker build -t admin-portal .

# Run container
docker run -p 4201:80 admin-portal
```

Or use docker-compose from the root directory:
```bash
docker-compose up admin-portal
```

---

## 📊 Code Statistics

- **6 Components** (Login, Dashboard, Towers, Units, Amenities, Bookings)
- **2 Services** (Admin API, Admin Auth)
- **1 Guard** (Admin)
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

**Port 4201 already in use?**
```bash
# Kill the process
lsof -ti:4201 | xargs kill -9

# Or use a different port
ng serve --port 4202
```

**Backend connection errors?**
- Ensure Flask server is running on `http://localhost:5000`
- Check admin authentication token
- Verify CORS settings

**Build errors?**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔒 Security

- JWT-based authentication
- Role-based access control (admin only)
- Route guards on all admin pages
- Secure token storage
- API request authentication

---

## 📝 License

Part of the Residential Rental Portal project.

---

## 👨‍💻 Author

**Shiva Sagar**
- GitHub: [@varsha6114s](https://github.com/varsha6114s)
