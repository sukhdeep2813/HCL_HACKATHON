# WellNest - Healthcare Wellness & Preventive Care Portal (MVP)

This is a **Next.js Frontend** MVP for a Healthcare Wellness & Preventive Care Portal built for a hackathon.
The goal is to help patients track wellness goals, receive preventive care reminders, and allow healthcare providers to manage patients efficiently.

## 🚀 Project Objectives

✅ Secure Authentication (Patients & Providers)  
✅ Track Wellness Goals (steps, water intake, sleep)  
✅ Preventive Checkup Reminders  
✅ Profile Management  
✅ Healthcare Provider Dashboard  
✅ Appointment Booking System  
✅ Privacy & Consent Compliance  

## 🧠 Tech Stack

### 🔹 Frontend
- **Next.js 16** with React 19
- **Tailwind CSS** for styling
- **Axios** for API calls
- **JWT-based auth** (localStorage)
- **TypeScript** for type safety
- **Lucide React** for icons

### 🔹 Backend (Separate Repository)
| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| Node.js + Express.js | API backend                   |
| In-memory storage    | Data persistence (MVP)        |
| bcrypt               | Password hashing              |
| JWT                  | Authentication                |
| cors                 | Enable frontend communication |
| dotenv               | Environment variables         |

### 🔹 Dev Tools
- **ESLint** → Code linting
- **PostCSS** → CSS processing
- **Git & GitHub** → Version control

## 🔐 Authentication Flow

1. User registers → role: `patient` or `provider`
2. Backend hashes password → stores in memory
3. On login → JWT token generated
4. Frontend stores token → localStorage
5. Protected routes require token
6. Role-based redirection:

| Role | Redirect to |
|------|-------------|
| Patient | `/dashboard/patient` |
| Provider | `/dashboard/provider` |

## 📡 API Endpoints (Main)

### 🔹 Auth Routes
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/auth/register   | Register user     |
| POST   | /api/auth/login      | Login & get token |

### 🔹 Patient Routes
| Method | Endpoint                | Description        |
| ------ | ----------------------- | ------------------ |
| GET    | /api/doctors           | Get available doctors |
| GET    | /api/appointments      | Get user appointments |
| POST   | /api/appointments      | Book appointment   |

### 🔹 Provider Routes
| Method | Endpoint              | Description |
| ------ | --------------------- | ----------- |
| GET    | /api/appointments     | Get provider appointments |

## 🗄️ Data Schemas

### 1. User Schema
```javascript
{
  id: String,
  role: String,            // "patient" or "provider"
  fullName: String,
  email: String,
  passwordHash: String,    // hashed using bcrypt
  specialization: String,  // for providers only
  createdAt: String
}
```

### 2. Doctor Schema
```javascript
{
  id: String,
  fullName: String,
  specialization: String,
  yearsExperience: Number,
  availableSlots: [String],
  bio: String
}
```

### 3. Appointment Schema
```javascript
{
  id: String,
  providerId: String,
  patientId: String,
  slot: String,
  reason: String,
  status: String,          // "confirmed"
  createdAt: String
}
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── dashboard/
│   │   │   ├── patient/page.tsx
│   │   │   └── provider/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── providers/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   ├── api.ts
│   │   └── mock.ts
│   └── types/
│       └── index.ts
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sukhdeep2813/HCL_HACKATHON.git
cd HCL_HACKATHON
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Live Demo

**Frontend URL:** [http://localhost:3000](http://localhost:3000)  
**Backend URL:** [http://localhost:4000](http://localhost:4000) (when running separately)

## 📱 Features

### For Patients:
- ✅ Secure registration and login
- ✅ Wellness dashboard with goals tracking
- ✅ View available healthcare providers
- ✅ Book appointments with real-time slots
- ✅ Track daily metrics (steps, water, sleep)
- ✅ Preventive care reminders

### For Providers:
- ✅ Provider dashboard
- ✅ View scheduled appointments
- ✅ Manage availability slots
- ✅ Patient overview

## 🔒 Security Features

- JWT-based authentication
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Protected API routes
- CORS configuration
- Input validation

## 🎨 UI/UX Features

- Responsive design for all devices
- Glass-panel aesthetic with backdrop blur
- Dark/light mode support
- Smooth animations and transitions
- Accessible color contrast
- Modern typography with Geist fonts

## 📊 Architecture Overview

```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)            │
│─────────────────────────────────────────│
│ 1. Landing Page                         │
│ 2. Login/Register Pages                 │
│ 3. Patient Dashboard                    │
│ 4. Provider Dashboard                   │
│ 5. Appointment Booking                  │
│ 6. Wellness Tracking                    │
└─────────────────┬───────────────────────┘
                  │  API Calls (Axios)
                  ▼
┌─────────────────────────────────────────┐
│   Backend (Node.js + Express.js)       │
│─────────────────────────────────────────│
│ ROUTES:                                 │
│   - /api/auth (register, login)         │
│   - /api/doctors (list providers)       │
│   - /api/appointments (booking, list)   │
│                                         │
│ MIDDLEWARE:                             │
│   - JWT Authentication                  │
│   - Role-Based Access Control (RBAC)    │
│   - CORS & Security Headers             │
└─────────────────┬───────────────────────┘
                  │   In-Memory Storage
                  ▼
┌─────────────────────────────────────────┐
│           Data Storage (MVP)            │
│─────────────────────────────────────────│
│ Arrays:                                 │
│   1. users[]                            │
│   2. doctors[]                          │
│   3. appointments[]                     │
└─────────────────────────────────────────┘
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built for HCL Hackathon 2024

---

**🎯 Hackathon Ready:** This MVP is designed to be demo-ready in under 5 minutes with full authentication, role-based dashboards, and appointment booking functionality.