<div align="center">

# 🏥 PatientCare

### Modern Full-Stack Patient Management System

A secure, responsive, and user-friendly patient management platform built with **React**, **Node.js**, **Express.js**, and **MongoDB Atlas**.

---

### 🚀 Tech Stack

<img src="https://skillicons.dev/icons?i=react,nodejs,express,mongodb,vscode,git" />

<br><br>

Secure Authentication • Patient Management • Search • Protected Routes • Responsive UI

</div>

---

# 📖 About the Project

Healthcare organizations require a secure and efficient way to manage patient information. **PatientCare** was developed to provide a simple yet modern solution for managing patient records through a clean and intuitive web interface.

The application enables authenticated users to securely register, log in, create patient records, search patients by name or bed ID, and delete patient records with confirmation dialogs. Every patient record is protected using **JWT Authentication**, ensuring users can access only their own data.

This project demonstrates the implementation of a complete **MERN-style full-stack application**, focusing on authentication, REST APIs, database integration, and responsive frontend development.

---

# 📸 Application Screenshots

<table>
<tr>
<td align="center">

### 🔐 Login Page

<img src="documents/images/login.png" width="100%">

</td>

<td align="center">

### 📝 Register Page

<img src="documents/images/register.png" width="100%">

</td>
</tr>

<tr>
<td align="center">

### 📊 Dashboard

<img src="documents/images/dashboard.png" width="100%">

</td>

<td align="center">

### 🔍 Patient Search

<img src="documents/images/search.png" width="100%">

</td>
</tr>
</table>

---

# ✨ Key Features

### 🔐 Secure Authentication

- User Registration & Login
- Passwords securely hashed using **bcrypt**
- JWT-based authentication
- Protected backend API routes

---

### 👥 Patient Management

- Add new patients
- View all patient records
- Delete selected patients safely
- Confirmation modal before deletion

---

### 🔍 Smart Search

Quickly search patient records using:

- Patient Name
- Bed ID

Results are filtered instantly, making it easy to locate patient information.

---

### 🎨 Modern User Interface

- Responsive design
- Professional Login & Register pages
- Beautiful Dashboard
- Inline form validation
- Show / Hide Password
- Custom Logout Confirmation
- Custom Delete Confirmation

---

# 🛠 Technology Stack

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

# 🏗 System Architecture

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
      JWT Authentication Layer
                  │
                  ▼
           MongoDB Atlas
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/adithyanv340/PatientCare.git
```

Move into the project

```bash
cd PatientCare
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

Open another terminal.

```bash
cd frontend
npm install
npm run dev
```

The application will start at:

```text
http://localhost:5173
```

---

# 👨‍💻 Author

**Adithyan V**

B.Tech in Artificial Intelligence & Data Science

- GitHub: https://github.com/adithyanv340
- LinkedIn: https://www.linkedin.com/in/adithyanv340/

---