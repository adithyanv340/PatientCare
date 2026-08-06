const Patient = require("../models/Patient");

const addPatient = async (req, res) => {
    try {

        const { patientName, bedID } = req.body;

        // Check is all fields are provided
        if (!patientName || !bedID) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        // Create new patient
        const newPatient = await Patient.create({
            patientName,
            bedID,
            user: req.user._id
        });

        res.status(201).json({
            message: "Patient Added Successfully",
            patient: newPatient
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getPatients = async (req, res) => {
    try {
        
        const search = req.query.search || "";

        const patients = await Patient.find({
            user: req.user._id,
            $or: [
                {
                    patientName: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    bedID: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ]
        });

        res.status(200).json(patients);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        await patient.deleteOne();

        res.status(200).json({
            message: "Patient deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addPatient,
    getPatients,
    deletePatient
};