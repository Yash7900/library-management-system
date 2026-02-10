📚 Library Management System — Backend
Overview

This backend powers a Library Management System with secure authentication, role-based access control, inventory management, circulation tracking, and fine calculation.

It is built using Node.js (Express), PostgreSQL, Sequelize ORM, and Docker, and follows production-grade architecture patterns.

✨ Features
🔐 Authentication & Security

JWT-based authentication

Refresh token rotation & revocation

Logout support

Role-Based Access Control (RBAC)

USER

LIBRARIAN

📚 Library Core

Books inventory management

Borrow / Return / Renew workflows

Availability enforcement

Ownership checks

⏰ Overdues & Fines

Overdue detection

Dynamic fine calculation (₹10/day)

User-specific & librarian-wide views

🧱 Infrastructure

Dockerized services

Nginx reverse proxy (single entry point)

PostgreSQL with pgAdmin

Clean /api/* contract (no CORS, no hardcoded URLs)

🏗 Architecture
Client (Angular / Browser)
        ↓
     Nginx (Reverse Proxy)
        ↓
   Express API (Node.js)
        ↓
 Business Logic + Security
        ↓
 PostgreSQL (via Sequelize)

🧰 Tech Stack
Layer	Technology
Runtime	Node.js
Framework	Express
Database	PostgreSQL
ORM	Sequelize
Auth	JWT
Containers	Docker / Docker Compose
Proxy	Nginx
DB UI	pgAdmin
📁 Project Structure
backend/
├── src/
│   ├── app.js                # App bootstrap
│   ├── database.js           # Sequelize config
│   ├── models/               # DB models & associations
│   ├── routes/               # API routes
│   ├── controllers/          # Business logic
│   ├── middleware/           # Auth & RBAC
│   └── utils/                # JWT, hashing, fine calculation
├── Dockerfile
├── package.json
└── README.md

🔐 Authentication Flow
Login
POST /api/auth/login
→ accessToken (15 min)
→ refreshToken (7 days)

Refresh
POST /api/auth/refresh
→ old refresh token revoked
→ new access + refresh tokens issued

Logout
POST /api/auth/logout
→ refresh token deleted


✔ Refresh tokens are stored hashed in DB
✔ Token rotation prevents replay attacks

🔑 Roles & Permissions
Role	Permissions
USER	View books, borrow, return, renew, view own fines
LIBRARIAN	Manage books, view all fines

RBAC is enforced via middleware and applies consistently across APIs.

🌐 API Endpoints
Health
GET /api/health

Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

Books
GET    /api/books
GET    /api/books/:id
POST   /api/books          (LIBRARIAN)
PUT    /api/books/:id      (LIBRARIAN)
DELETE /api/books/:id      (LIBRARIAN)

Borrow / Return / Renew
POST /api/borrow/borrow
POST /api/borrow/return
POST /api/borrow/renew

Fines & Overdues
GET /api/fines/my           (USER)
GET /api/fines/all          (LIBRARIAN)

🗄 Database Models
Users

id

name

email

password (hashed)

role

Books

title

author

genre

totalCopies

availableCopies

Borrows

borrowedAt

dueDate

returnedAt

renewCount

RefreshTokens

tokenHash

expiresAt

UserId

🐳 Running Locally (Docker)
Prerequisites

Docker

Docker Compose

WSL (on Windows)

Start services
docker compose up --build

Stop services
docker compose down

🧪 Database Access
Via pgAdmin

URL: http://localhost:5050

Host: postgres

Port: 5432

DB: library_db

User: library_user

Via CLI
docker exec -it library-management-system-postgres-1 \
psql -U library_user -d library_db

docker exec -it library-management-system-backend-1 npm run seed
