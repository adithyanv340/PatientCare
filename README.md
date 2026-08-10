<div align="center">

# HospitalX

### Modern Full-Stack Patient Management System

A secure, responsive, and user-friendly patient management platform built with **React**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

---

### Tech Stack

<img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,vscode,git" />

<br><br>

Secure Authentication • Patient Management • Search • Protected Routes • Responsive UI

</div>

---

# About the Project

Healthcare organizations require a secure and efficient way to manage patient information. **HospitalX** was developed to provide a simple yet modern solution for managing patient records through a clean and intuitive web interface.

The application enables authenticated users to securely register, log in, create patient records and search patients by name or bed ID. Access to patient records is protected using **JWT authentication**, ensuring users can access only the patient records associated with their own account.

This project demonstrates the implementation of a complete **MERN-style full-stack application**, focusing on authentication, REST APIs, database integration, and responsive frontend development.

---

# Live Demo

### HospitalX is deployed and available online

**Live Application:**  
https://patient-care-beta-livid.vercel.app

**Backend API:**  
https://patientcare-backend-ojcg.onrender.com

> **Demo Note:** The backend is hosted on Render's free tier. If the service has been inactive, the first request may take a short time while the server starts.

---

# Application Screenshots

<table>
<tr>
<td align="center">

### Login Page

<img src="documents/images/01-login-final.png" width="100%">

</td>

<td align="center">

### Sign Up Page

<img src="documents/images/02-signup-final.png" width="100%">

</td>
</tr>

<tr>
<td align="center">

### Dashboard

<img src="documents/images/03-dashboard-final.png" width="100%">

</td>

<td align="center">

### Patient Search

<img src="documents/images/04-search-final.png" width="100%">

</td>
</tr>

<tr>
<td align="center">

### Create Patient

<img src="documents/images/05-create-patient-final.png" width="100%">

</td>

<td align="center">

### Logout Confirmation

<img src="documents/images/06-logout-final.png" width="100%">

</td>
</tr>
</table>

---

# Key Features

### Secure Authentication

- User Registration & Login
- Login using username or email
- Passwords securely hashed using **bcrypt**
- JWT-based authentication
- Protected backend API routes
- User-specific patient records

---

### Patient Management

- Create new patient records
- View all patient records associated with the logged-in user
- Patient name and Bed ID validation
- Duplicate Bed ID prevention
- Bed IDs normalized for consistent storage

---

### Smart Search

Quickly search patient records using:

- Patient Name
- Bed ID

Results are filtered dynamically, making it easy to locate patient information.

---

### User Interface

- Responsive design
- Login and Sign Up pages aligned with the provided reference design
- Clean patient dashboard
- Create Patient modal
- Inline form validation and error messages
- Email format validation during registration
- Logout confirmation modal

---

# Technology Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- React Icons
- CSS3

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB Atlas
- Mongoose

---

## Authentication & Security

- JSON Web Token (JWT)
- bcryptjs

---

# System Architecture

```text
              User
                │
                ▼
      React Frontend (Vite)
                │
           Axios API Calls
                │
                ▼
       Express.js REST API
                │
        JWT Auth Middleware
                │
                ▼
            Mongoose
                │
                ▼
         MongoDB Atlas
```

---

# Installation

### 1. Clone the Repository

```bash
git clone https://github.com/adithyanv340/PatientCare.git
cd PatientCare
```

### 2. Backend Setup

Navigate to the backend directory and install the dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add the following environment variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend development server:

```bash
npm run dev
```

The backend will run locally at:

```text
http://localhost:5001
```

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install the dependencies:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run locally at:

```text
http://localhost:5173
```

> **Note:** The deployed frontend is configured to communicate with the deployed backend API. To use the local backend during development, update the API base URL in `frontend/src/services/api.js` to `http://localhost:5001/api`.
---

## Author

**Adithyan V**

B.Tech in Artificial Intelligence & Data Science  
Muthoot Institute of Technology & Science

**GitHub**  
https://github.com/adithyanv340

**LinkedIn**  
https://www.linkedin.com/in/adithyanv340/

---
