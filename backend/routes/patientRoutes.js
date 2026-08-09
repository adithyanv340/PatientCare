// Protected patient management routes for PatientCare
const express = require("express");
const router = express.Router();

const { addPatient, getPatients,deletePatient } = require("../controllers/patientController");
const protect = require("../middleware/authMiddleware");

// Add Patient
router.post("/", protect, addPatient);

// Get All Patients
router.get("/", protect, getPatients);

// Delete Patient
router.delete("/:id", protect, deletePatient);

module.exports = router;