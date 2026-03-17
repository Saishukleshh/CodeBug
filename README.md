# 🇮🇳 Learning License Application Portal

A full-stack **Learning License Application System** Built with React, Node.js, Express, and MySQL.s

---

## 📁 Project Structure

```
CodeBug/
├── backend/              # Node.js + Express REST API
├── applicant-portal/     # React frontend for applicants (Port 5173)
└── admin-portal/         # React frontend for RTO officials (Port 5174)
```

## ✨ Features

### Applicant Portal
- 5-step multi-section application form
- Client-side validations (Aadhaar, phone, email, age, pincode)
- Document upload with drag-and-drop (Photo, Aadhaar, Address Proof, Medical Cert)
- Unique application number generation
- Government-themed UI matching Parivahan/Sarathi

### Admin Portal
- Search applications by application number
- Full application details with document viewing
- Approve/Reject workflow with confirmation modals
- Internal guidelines and verification checklists
- Secure RTO official interface

### Backend
- RESTful API with Express.js
- File uploads via Multer
- MySQL database with auto-initialization
- Separate tables: `applications`, `approved_applications`, `rejected_applications`
- Server-side validations

## 🛠️ Tech Stack

| Layer    | Technology                             |
|----------|----------------------------------------|
| Frontend | React 19, Tailwind CSS 4, Vite 6       |
| Backend  | Node.js, Express.js 4                  |
| Database | MySQL 8.0 (mysql2)                     |
| Uploads  | Multer                                 |
| HTTP     | Axios                                  |

## 🚀 Setup & Run

### Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)

### 1. Backend
```bash
cd backend
npm install
# Update .env with your MySQL password
node server.js
```

### 2. Applicant Portal
```bash
cd applicant-portal
npm install
npm run dev
# Opens at http://localhost:5173
```

### 3. Admin Portal
```bash
cd admin-portal
npm install
npm run dev
# Opens at http://localhost:5174
```

## 📋 Environment Variables (backend/.env)
```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=learning_license_db
PORT=5000
```

## 👥 Team - CodeBug

---
*Built for Hackathon 2026*
