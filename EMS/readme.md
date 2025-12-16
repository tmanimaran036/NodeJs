# Employee Management System (EMS)

An **Employee Management System (EMS)** built using **Node.js (Express.js)** and **SQL Database** with **Role-Based Authentication**.  
This system helps organizations manage employees, roles, and access permissions securely.

---

## 🚀 Features

- User Authentication (Login & Logout)
- Role-Based Access Control (RBAC)
  - Admin
  - Manager
  - Employee
- Employee CRUD Operations
- Secure Password Hashing
- RESTful API Architecture
- SQL Database Integration
- Environment-based Configuration

---

## 🛠️ Technology Stack

| Layer        | Technology |
|--------------|-----------|
| Backend      | Node.js |
| Framework    | Express.js |
| Database     | SQL (MySQL / PostgreSQL) |
| Authentication | JWT (JSON Web Token) |
| Password Security | bcrypt |
| ORM / Query | Sequelize / Raw SQL |
| API Testing  | Postman |

---

## 🏗️ Project Architecture

EMS/
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── employee.controller.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ └── role.middleware.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── employee.model.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── employee.routes.js
│ ├── utils/
│ │ └── jwt.js
│ └── app.js
├── .env
├── package.json
└── README.md
---

## 🔐 Role-Based Authentication

### Roles

| Role     | Permissions |
|--------|-------------|
| Admin   | Full access (users, employees, roles) |
| Manager | Manage employees |
| Employee | View own profile |

### Authorization Flow

1. User logs in with email & password
2. Server generates JWT token
3. Token is sent in `Authorization` header
4. Middleware verifies token & role
5. Access is granted or denied

---

## 📦 Database Schema (Sample)

### Users Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'manager', 'employee'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


# Authentication APIs
Login
POST /api/auth/login


## Request Body

{
  "email": "admin@gmail.com",
  "password": "password123"
}

## Response

{
  "token": "jwt_token_here"
}


# Create a .env file:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=ems_db
JWT_SECRET=your_jwt_secret