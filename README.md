# ZYM Gym Dashboard - Full Stack SaaS

A comprehensive multi-tenant SaaS platform for gym management built with Next.js, Express.js, and PostgreSQL.

## 📋 Project Structure

```
ZYM DashBoard/
├── frontend/                  # Next.js React App
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utilities and helpers
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── next.config.js
│
├── backend/                  # Express.js Backend
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/      # Business logic
│   │   ├── models/           # Database models
│   │   ├── middleware/       # Auth, validation, etc.
│   │   ├── utils/            # Helper functions
│   │   ├── config/           # Database config
│   │   ├── database/         # Database schema & migrations
│   │   └── index.js          # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
└── .env.example              # Environment variables template
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Setup Database**
```bash
# Create database
createdb zym_dashboard

# Run schema
psql -U postgres -d zym_dashboard -f src/database/schema.sql
```

4. **Start Backend**
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Setup Environment**
```bash
# Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. **Start Frontend**
```bash
npm run dev
```
Frontend will run on `http://localhost:3000`

## 📚 Features

### Super Admin Dashboard
- Manage all gyms
- Ban/unban gyms
- View revenue analytics
- Manage subscriptions
- Customer support management

### Gym Owner Dashboard
- Member management
- Trainer management
- Payment tracking
- Attendance system
- Workout & diet plans
- Analytics & reports

### Trainer Features
- View assigned members
- Create workout plans
- Track member progress
- Attendance management
- Member communication

### Member Dashboard
- View membership plans
- Payment history
- Assigned workout plans
- Diet plans
- Progress tracking
- Attendance history

## 🗄️ Database Tables

- **users** - All users (super admin, gym owners, trainers, members)
- **gyms** - Gym information (multi-tenant)
- **members** - Member profiles
- **trainers** - Trainer information
- **membership_plans** - Membership plan definitions
- **attendance** - Attendance records
- **payments** - Payment transactions
- **workout_plans** - Workout routines
- **diet_plans** - Diet plans
- **progress_tracking** - Member progress
- **notifications** - User notifications
- **support_tickets** - Support system

## 🔐 Authentication

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcryptjs
- Email verification
- 2FA support (optional)

## 📱 API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout

GET    /api/gyms
POST   /api/gyms
GET    /api/gyms/:id
PUT    /api/gyms/:id
DELETE /api/gyms/:id

GET    /api/members
POST   /api/members
GET    /api/members/:id
PUT    /api/members/:id
DELETE /api/members/:id

GET    /api/attendance
POST   /api/attendance
GET    /api/payments
POST   /api/payments

... and more endpoints
```

## 🛠️ Tech Stack

**Frontend**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Shadcn UI
- Axios for API calls
- Zustand for state management
- Recharts for analytics

**Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- Bcryptjs for password hashing
- Nodemailer for emails
- Multer for file uploads

**Database**
- PostgreSQL

**Deployment**
- Frontend: Vercel
- Backend: Railway/Render
- Database: Supabase/Neon

## 📦 Payment Integration

**For India:**
- Razorpay integration ready

**Global:**
- Stripe integration ready

## 📧 Email Service

- Gmail SMTP configured
- Nodemailer setup ready

## 🚀 Development Commands

**Backend**
```bash
npm run dev       # Start development server
npm start         # Start production server
npm run migrate   # Run database migrations
```

**Frontend**
```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run linting
```

## 📝 Next Steps

1. ✅ Project structure created
2. ✅ Database schema setup
3. ⏳ Authentication API endpoints
4. ⏳ Gym management APIs
5. ⏳ Member management APIs
6. ⏳ Payment integration
7. ⏳ Admin Dashboard UI
8. ⏳ Member Dashboard UI
9. ⏳ Landing page
10. ⏳ Testing & Deployment

## 📄 License

ISC

## 👨‍💻 Author

Your Name

---

**Ready to build? Start with the backend setup!**
