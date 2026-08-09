// Main Express server for the PatientCare REST API
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Patient Management System Backend is Running");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//PatientCare REST API - Backend Server