# 📚 Library Management System (Full-Stack SaaS)

A production-style full-stack web application that manages a digital library — including authentication, role-based authorization, book inventory, borrowing workflow, overdue tracking, and fine calculation.

This project demonstrates how a real SaaS system is designed and deployed using **Angular + Node.js + PostgreSQL + Nginx + Docker**.

---

## 🚀 Live Architecture

Browser → Nginx (Reverse Proxy) → Express API → PostgreSQL Database

The frontend and backend are fully containerized and communicate through an internal Docker network.

---

## ✨ Features

### Authentication & Security

- User registration & login
- JWT Access Token + Refresh Token
- Persistent sessions
- Logout with token invalidation
- Route guards
- Role-based access (User / Librarian)

### Books Management

- View available books
- Track available copies
- Inventory updates in real-time

### Circulation System

- Borrow books
- Return books
- Renew borrowed books
- Prevent borrowing when unavailable

### Overdue & Fine System

- Automatic overdue detection
- Dynamic fine calculation
- User fine dashboard
- Librarian overdue monitoring panel

### Production Infrastructure

- Reverse proxy using Nginx
- No CORS configuration needed
- SPA routing handled at server level
- Dockerized frontend, backend, and database
- PostgreSQL persistent volumes

---

## 🧠 Tech Stack

### Frontend

- Angular (Signals state management)
- Standalone Components
- HTTP Interceptors
- Route Guards

### Backend

- Node.js + Express.js
- Sequelize ORM
- JWT Authentication
- REST API architecture

### Database

- PostgreSQL
- Relational schema design
- Transaction handling

### DevOps / Infrastructure

- Docker & Docker Compose
- Nginx Reverse Proxy
- Production Angular Build
- Container networking

---

## 🏗️ System Architecture

Frontend (Angular SPA)

- Served as static files
- Communicates only via `/api`

Nginx

- Serves Angular build
- Proxies `/api` requests to backend

Backend (Express API)

- Handles authentication
- Business logic
- Database transactions

PostgreSQL

- Stores users, books, borrows, and fines

---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns access token + refresh token
3. Angular stores tokens
4. Access token used for API requests
5. Refresh token renews session without logout

---

## 📦 Project Structure

```
library-management-system/
│
├── frontend/        # Angular application
├── backend/         # Express REST API
├── nginx/           # Reverse proxy configuration
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Running Locally

### Requirements

- Docker
- Docker Compose
- WSL (recommended on Windows)

### Start the application

```bash
docker compose up --build
```

Open:

```
http://localhost:8080
```

---

## 🧪 Demo Accounts

Librarian:

```
email: librarian@test.com
password: password
```

User:

```
email: user@test.com
password: password
```

---

## 📸 Screenshots (Add These)

Add screenshots inside `/screenshots` folder and embed here:

- Login Page
- Books List
- Borrowed Books
- Fines Dashboard
- Librarian Overdue View

---

## 🧩 Key Concepts Demonstrated

- Reverse Proxy Architecture
- Token-based Authentication
- Role-based Authorization
- SPA Production Deployment
- Database Transactions
- State management using Angular Signals
- Containerized micro-environment

---

## 🎯 What This Project Shows

This project demonstrates the ability to:

- Design backend REST APIs
- Implement secure authentication
- Manage relational databases
- Build responsive frontend UI
- Handle real-world workflows
- Deploy a production-style application

---

## 👨‍💻 Author

**Your Name**
Yash Madhukar Varadkar
GitHub: https://github.com/Yash7900
