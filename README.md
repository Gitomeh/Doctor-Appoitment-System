# 🏥 Doctor Appointment Booking System

A modern full-stack web application that enables patients to browse doctors, schedule appointments, manage bookings, and receive email notifications.

## 🚀 Live Demo

Frontend: Coming Soon

Backend API: Coming Soon

## 📸 Screenshots

| Home | Doctors |
|------|----------|
| ![](screenshots/home.png) | ![](screenshots/doctors.png) |

| Appointment | Dashboard |
|-------------|-----------|
| ![](screenshots/appointment.png) | ![](screenshots/dashboard.png) |

---

# Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Encryption using bcrypt

### Doctor Management

- Browse available doctors
- View doctor details
- Search doctors

### Appointment Management

- Book appointments
- Cancel appointments
- View appointment history

### Notifications

- Confirmation emails
- Cancellation emails

### Security

- JWT Protected Routes
- Password Hashing
- Environment Variables

---

# Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer

---

# Project Structure

```
Doctor_Appointment_System
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   └── server.js
│   │
│   └── package.json
│
├── system
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
```

---

# Installation

## Clone

```bash
git clone https://github.com/Gitomeh/Doctor-Appoitment-System.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd system
npm install
npm run dev
```

---

# Environment Variables

Create `.env` inside backend.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

# Future Improvements

- Doctor Dashboard
- Admin Dashboard
- Payment Integration
- SMS Notifications
- Video Consultations
- Medical Records
- Appointment Reminders
- Patient Profiles

---

# License

MIT License

---

# Author

**Gerald Njoroge Gitau**

Email: ggtomeh@gmail.com

GitHub: https://github.com/Gitomeh
