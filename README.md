Healthcare Wellness & Preventive Care Portal (MVP)

This is a Backend + Frontend MVP for a Healthcare Wellness & Preventive Care Portal built for a hackathon.
The goal is to help patients track wellness goals, receive preventive care reminders, and allow healthcare providers to manage patients efficiently.

🚀 Project Objectives

✔ Secure Authentication (Patients & Providers)
✔ Track Wellness Goals (steps, water intake, sleep)
✔ Preventive Checkup Reminders
✔ Profile Management
✔ Healthcare Provider Dashboard
✔ Appointment Booking System (optional)
✔ Privacy & Consent Compliance
🧠 Tech Stack
🔹 Frontend

React.js / Next.js

CSS Modules / Sass

Axios (API calls)

JWT-based auth (localStorage)

🔹 Backend
| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| Node.js + Express.js | API backend                   |
| MongoDB + Mongoose   | NoSQL database                |
| bcrypt               | Password hashing              |
| JWT                  | Authentication                |
| cors                 | Enable frontend communication |
| dotenv               | Environment variables         |

🔹 Dev Tools

Postman / Thunder Client → API testing

Nodemon → auto restart server

Git & GitHub → version control

🔐 Authentication Flow

User registers → role: patient or provider

Backend hashes password → stores in MongoDB

On login → JWT token generated

Frontend stores token → localStorage

Protected routes require token

Role-based redirection:
| Role | Redirect to |
|------|--------------|
| patient | /dashboard/patient |
| provider | /dashboard/provider |

📡 API Endpoints (Main)
🔹 Auth Routes
| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | /api/auth/register | Register user     |
| POST   | /api/auth/login    | Login & get token |
| GET    | /api/auth/profile  | Get profile (JWT) |
| PUT    | /api/auth/profile  | Update profile    |

🔹 Patient Routes
| Method | Endpoint                    | Description        |
| ------ | --------------------------- | ------------------ |
| GET    | /api/patient/goals        | Get goals          |
| POST   | /api/patient/goals        | Add / update goals |
| GET    | /api/patient/reminders    | Upcoming checkups  |
| POST   | /api/patient/appointments | Book appointment ✔ |

