# PatientCare

PatientCare is a full-stack patient management application that allows authenticated users to securely create, view, search and delete patient records.

## Features

- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected patient routes
- Add new patients
- View patients associated with the logged-in user
- Search patients by name or bed ID
- Delete selected patients
- Responsive login, registration and dashboard interfaces
- Inline form validation
- Custom logout and delete confirmation modals

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- React Icons
- CSS

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token
- bcryptjs

## Project Structure

```text
PatientCare/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── pages/
│       ├── services/
│       ├── App.jsx
│       └── index.css
│
└── README.md