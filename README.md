## Healthcare Wellness & Preventive Care Portal (MVP)

This is a **Backend + Frontend MVP** for a Healthcare Wellness & Preventive Care Portal built for a hackathon.
The goal is to help patients track wellness goals, receive preventive care reminders, and allow healthcare providers to manage patients efficiently.

### 🚀 Project Objectives

- **Secure Authentication** (patients & providers)  
- **Track Wellness Goals** (steps, water intake, sleep)  
- **Preventive Checkup Reminders**  
- **Profile Management**  
- **Healthcare Provider Dashboard**  
- **Appointment Booking System** (optional)  
- **Privacy & Consent Compliance**

---

### 🧠 Tech Stack

- **Frontend**
  - React + Vite (this repo)
  - Tailwind CSS (custom healthcare theme)
  - React Router, React Redux, React Hook Form, chart.js, Lucide Icons, react-hot-toast
  - Axios (for API calls)
  - JWT-based auth (token in `localStorage`)

- **Backend** (planned – see overall repo [HCL_HACKATHON](https://github.com/sukhdeep2813/HCL_HACKATHON.git))

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |    
| Node.js + Express.js | API backend                   |
| MongoDB + Mongoose   | NoSQL database                |
| bcrypt               | Password hashing              |
| JWT                  | Authentication                |
| cors                 | Enable frontend communication |
| dotenv               | Environment variables         |

- **Dev Tools**
  - Postman / Thunder Client → API testing  
  - Nodemon → auto-restart server  
  - Git & GitHub → version control  

---

### 🔐 Authentication Flow

1. User registers → role: `patient` or `provider`  
2. Backend hashes password → stores in MongoDB  
3. On login → JWT token generated  
4. Frontend stores token in `localStorage`  
5. Protected routes require token  
6. Role-based redirects:

| Role     | Redirect to            |
| -------- | ---------------------- |
| patient  | `/dashboard/patient`   |
| provider | `/dashboard/provider`  |

---

### 📡 Core API Endpoints (Planned)

**Auth Routes**

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| POST   | `/api/auth/register`  | Register user      |
| POST   | `/api/auth/login`     | Login & get token  |
| GET    | `/api/auth/profile`   | Get profile (JWT)  |
| PUT    | `/api/auth/profile`   | Update profile     |

**Patient Routes**

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/patient/goals`         | Get goals           |
| POST   | `/api/patient/goals`         | Add / update goals  |
| GET    | `/api/patient/reminders`     | Upcoming checkups   |
| POST   | `/api/patient/appointments`  | Book appointment ✔  |

**Provider Routes**

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| GET    | `/api/provider/patients`       | Get assigned patients|
| GET    | `/api/provider/patient/:id`    | View patient data    |

---

### 🗄️ Core Schemas (MongoDB / Mongoose – Backend)

**1. User Schema**

```js
{
  name: String,
  email: String,
  password: String,        // hashed using bcrypt
  role: String,            // "patient" or "provider"
  consent: Boolean,        // data usage agreement
  profile: {
    age: Number,
    allergies: [String],
    medications: [String]
  }
}
```

**2. Goals Schema (Wellness Tracking)**

```js
{
  userId: ObjectId,
  steps: Number,
  waterIntake: Number,
  sleepHours: Number,
  date: { type: Date, default: Date.now }
}
```

**3. Preventive Checkup Schema**

```js
{
  userId: ObjectId,
  checkupName: String,        // e.g., "Annual Blood Test"
  scheduledDate: Date,
  status: { type: String, default: "upcoming" } // or "completed"
}
```

**4. Appointment Schema**

```js
{
  patientId: ObjectId,
  providerId: ObjectId,
  date: Date,
  reason: String,
  status: { type: String, default: "pending" }
}
```

**5. Logs Schema**

```js
{
  userId: ObjectId,
  action: String,            // e.g., "Viewed Profile", "Updated Goals"
  timestamp: { type: Date, default: Date.now }
}
```

---

### 🔷 High-Level Architecture

**Frontend (React/Vite)**
- Login / Register Pages  
- Patient Dashboard  
- Provider Dashboard  
- Profile Management  
- Appointment Booking UI  
- Public Health Info / Education  

**Backend (Node.js + Express)**
- `/api/auth` (register, login, profile)  
- `/api/patient` (goals, reminders)  
- `/api/provider` (patients, view)  
- `/api/appointments` (booking)  
- Middleware: JWT auth, RBAC, action logging  

**Database (MongoDB)**
- `users`  
- `goals`  
- `preventiveCheckups`  
- `appointments` (optional)  
- `logs` (security tracking)  

**Overall Flow:**  
User → Frontend → API Request → Backend → MongoDB → Backend → Frontend (UI update)

---

### ▶️ Running the Frontend (This Repo)

```bash
cd wellnesshub-frontend
npm install
npm run dev
```

The app will start on the default Vite dev server port (usually `http://localhost:5173`).
