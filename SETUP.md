# ZYM Gym Dashboard - Complete Setup Guide

## ✅ What's Been Fixed & Created

### Errors Resolved
✅ TypeScript moduleResolution fixed (node16)
✅ Button component properly exported with proper typing
✅ Layout.tsx with proper metadata and font loading
✅ Page.tsx Link/Button nesting fixed
✅ All missing pages created (/login, /register, /pricing, /about, /contact)

### Frontend Structure Created
```
frontend/
├── app/
│   ├── layout.tsx (root layout with Inter font)
│   ├── page.tsx (landing page)
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── globals.css
├── components/
│   └── ui/
│       └── button.tsx (fully typed, client component)
├── lib/
│   ├── api.ts (axios instance with interceptors)
│   └── auth-service.ts (API service methods)
├── public/
├── .env.local (development environment)
├── .eslintrc.json (linting rules)
├── .prettierrc.json (code formatting)
├── tsconfig.json (TypeScript config)
├── tailwind.config.js
├── next.config.js
└── package.json
```

### Backend Structure Created
```
backend/
├── src/
│   ├── index.js (server entry point with error handling)
│   ├── routes/
│   │   ├── index.js (route aggregator)
│   │   ├── authRoutes.js (auth endpoints)
│   │   └── gymRoutes.js (gym management endpoints)
│   ├── controllers/
│   │   ├── authController.js (auth logic)
│   │   └── gymController.js (gym logic)
│   ├── models/
│   │   ├── User.js (user database operations)
│   │   └── Gym.js (gym database operations)
│   ├── middleware/
│   │   ├── auth.js (JWT verification & role check)
│   │   └── validation.js (input validation)
│   ├── utils/
│   │   ├── auth.js (password hashing, JWT)
│   │   └── errorHandler.js (error handling utilities)
│   ├── config/
│   │   └── database.js (PostgreSQL connection)
│   └── database/
│       └── schema.sql (20+ tables with indexes)
├── .env.local (development environment)
├── .env.example (template)
├── .gitignore
├── .prettierrc.json
├── tsconfig.json
└── package.json
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 12+ ([Download](https://www.postgresql.org/download/))
- Git ([Download](https://git-scm.com/))

### Step 1: Clone/Navigate to Project
```bash
cd c:\xampp\htdocs\ZYM\ DashBoard
```

### Step 2: Setup Backend

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Create PostgreSQL Database
```bash
# Open PostgreSQL terminal or use pgAdmin
createdb zym_dashboard
```

#### 2.3 Run Database Schema
```bash
psql -U postgres -d zym_dashboard -f src/database/schema.sql
```

If using Windows Command Prompt:
```cmd
psql -U postgres -d zym_dashboard -f "src\database\schema.sql"
```

#### 2.4 Verify .env.local
Check `backend/.env.local` has correct database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=zym_dashboard
DB_USER=postgres
DB_PASSWORD=postgres  # Change this!
```

#### 2.5 Start Backend Server
```bash
npm run dev
```

Expected output:
```
✅ Connected to PostgreSQL Database
✅ Server running on http://localhost:5000
```

### Step 3: Setup Frontend

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Verify .env.local
File already created at `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=ZYM Dashboard
```

#### 3.3 Start Frontend Server
```bash
npm run dev
```

Expected output:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## 🧪 Testing the Application

### 1. Test Frontend
- Open: http://localhost:3000
- Navigate through all pages (Home, Pricing, About, Contact)
- Click Login/Register buttons

### 2. Test Backend Health
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"API is running"}
```

### 3. Test API Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "gym_owner"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGci...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "gym_owner"
    }
  }
}
```

### 4. Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 📝 Project Structure Overview

### API Endpoints
```
Authentication:
POST   /api/auth/register      - Create new account
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (requires token)
POST   /api/auth/logout        - Logout user

Gym Management:
POST   /api/gyms               - Create gym (gym_owner only)
GET    /api/gyms               - Get all gyms (super_admin only)
GET    /api/gyms/:id           - Get gym by ID
GET    /api/gyms/owner/my-gym  - Get own gym (gym_owner only)
PUT    /api/gyms/:id           - Update gym
DELETE /api/gyms/:id           - Delete gym
```

### Database Tables (20+)
- `users` - All users
- `gyms` - Gym information (multi-tenant)
- `members` - Member profiles
- `trainers` - Trainer information
- `membership_plans` - Plan definitions
- `attendance` - Check-in/out records
- `payments` - Payment transactions
- `workout_plans` - Workout routines
- `exercises` - Exercise library
- `diet_plans` - Diet plans
- `meals` - Meal library
- `progress_tracking` - Member progress
- `notifications` - User notifications
- `support_tickets` - Support system
- And more...

## 🔐 Authentication Flow

1. **Register**: User submits name, email, password, role
2. **Hash Password**: Password is hashed with bcryptjs
3. **JWT Token**: Token generated (expires in 7 days)
4. **Store Token**: Client stores token in localStorage
5. **API Requests**: Include token in `Authorization: Bearer <token>` header
6. **Verify Token**: Middleware verifies token on protected routes

## 🚀 Next Steps

### Features to Build:
1. **Members API** (CRUD, search, filter)
2. **Trainers API** (CRUD, assignment)
3. **Payments API** (Razorpay/Stripe integration)
4. **Attendance API** (QR code, manual check-in)
5. **Workout/Diet Plans API**
6. **Admin Dashboard** (React components)
7. **Member Dashboard** (React components)
8. **Notifications** (Email, WhatsApp)
9. **Analytics** (Charts, reports)
10. **File Upload** (Cloudinary/S3)

### Deployment:
- **Frontend**: Vercel (free tier)
- **Backend**: Railway/Render (free tier)
- **Database**: Supabase/Neon (free tier)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Backend port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Error
```bash
# Check PostgreSQL is running
# Verify database exists
psql -l

# Verify credentials in .env.local
# Check database user has permissions
```

### Module Not Found Errors
```bash
# Backend: Delete node_modules and reinstall
cd backend
rm -r node_modules package-lock.json
npm install

# Frontend: Same steps
cd ../frontend
rm -r node_modules package-lock.json
npm install
```

## 📚 Useful Commands

```bash
# Backend
npm run dev              # Start development server
npm start               # Start production server

# Frontend  
npm run dev             # Start development server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Check linting issues

# Database
psql -U postgres -d zym_dashboard  # Connect to database
\dt                     # List all tables
\d users                # Describe users table
```

## 📧 Support

For issues or questions:
1. Check error logs in terminal
2. Verify .env files are correctly set
3. Ensure PostgreSQL is running
4. Check database schema is loaded
5. Verify Node.js version (18+)

---

**Ready to build the future of gym management! 🏋️**
