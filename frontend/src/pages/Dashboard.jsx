import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import { FaSearch, FaBed, FaUserPlus } from "react-icons/fa";
import API from "../services/api";

function Dashboard() {
    const [patients, setPatients] = useState([]);
    const [patientName, setPatientName] = useState("");
    const [bedID, setBedID] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [patientNameError, setPatientNameError] = useState("");
    const [bedIDError, setBedIDError] = useState("");
    const [patientError, setPatientError] = useState("");
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const fetchPatients = async (searchValue = "") => {
        try {
            const response = await API.get(
                `/patients?search=${encodeURIComponent(searchValue)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPatients(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/");
                return;
            }

            alert(
                error.response?.data?.message ||
                "Failed to load patients"
            );
        }
    };

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        fetchPatients();
    }, []);

    const handleAddPatient = async (event) => {
        event.preventDefault();
        
        setPatientNameError("");
        setBedIDError("");
        setPatientError("");

        let hasError = false;

        if (!patientName.trim()) {
            setPatientNameError("Please enter the patient name");
            hasError = true;
        }
        
        if (!bedID.trim()) {
            setBedIDError("Please enter the bed ID");
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            setLoading(true);

            await API.post(
                "/patients",
                {
                    patientName: patientName.trim(),
                    bedID: bedID.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            setPatientName("");
            setBedID("");

            await fetchPatients(search);

        } catch (error) {
            setPatientError(
                error.response?.data?.message ||
                "Failed to add patient"
            );
        } finally {
            setLoading(false);
        }
    };

    {patientError && (
        <div className="auth-error">
            {patientError}
        </div>
    )}

    const handleSearch = async (event) => {
        const value = event.target.value;

        setSearch(value);
        await fetchPatients(value);
    };

    const handleDeletePatient = async () => {
        if (!selectedPatientId) {
            return;
        }

        try {
            setDeleting(true);
    
            await API.delete(`/patients/${selectedPatientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSelectedPatientId("");
            setShowDeleteModal(false);

            await fetchPatients(search);
        } catch (error) {
            setPatientError(
                error.response?.data?.message ||
                "Failed to delete patient"
            );
        } finally {
            setDeleting(false);
        }
    };

    

    const confirmLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setShowLogoutModal(false)
        navigate("/");
    };

    return (
        <main className="dashboard-page">
            <nav className="dashboard-navbar">
                <div className="dashboard-brand">
                    <span className="dashboard-brand-icon">
                        <FaUserDoctor />
                    </span>

                    <span>PatientCare</span>
                </div>

                <div className="dashboard-user">
                    <span>
                        Welcome, {user?.username || "User"}
                    </span>

                    <button 
                        type="button"
                        onClick={() => setShowLogoutModal(true)}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <section className="dashboard-container">
                <header className="dashboard-header">
                    <div>
                        <p className="dashboard-eyebrow">
                            PATIENT MANAGEMENT
                        </p>

                        <h1>Dashboard</h1>

                        <p>
                            Add patients, manage bed assignments and
                            quickly search hospital records.
                        </p>
                    </div>

                    <div className="patient-count">
                        <span>{patients.length}</span>
                        <p>Patients Found</p>
                    </div>
                </header>

                <section className="dashboard-grid">
                    <form
                        className="add-patient-card"
                        onSubmit={handleAddPatient}
                    >
                        <div className="card-heading">
                            <span className="card-icon">
                                <FaUserPlus />
                            </span>

                            <div>
                                <h2>Add Patient</h2>
                                <p>Create a new patient record.</p>
                            </div>
                        </div>

                        <label htmlFor="patientName">
                            Patient Name
                        </label>

                        <input
                            id="patientName"
                            className={patientNameError ? "input-error" : ""}
                            type="text"
                            placeholder="Enter patient name"
                            value={patientName}
                            onChange={(event) => {
                                setPatientName(event.target.value)
                                setPatientNameError("");
                            }}
                        />

                        {patientNameError && (
                            <p className="field-error">
                                {patientNameError}
                            </p>
                        )}        
                        

                        <label htmlFor="bedID">Bed ID</label>

                        <input
                            id="bedID"
                            className={bedIDError ? "input-error" : ""}
                            type="text"
                            placeholder="Example: B101"
                            value={bedID}
                            onChange={(event) => {
                                setBedID(event.target.value)
                                setBedIDError("");
                            }}
                        />
                        
                        {bedIDError && (
                            <p className="field-error">
                                {bedIDError}
                            </p>
                        )}

                        <button
                            className="add-patient-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Adding Patient..."
                                : "Add Patient"}
                        </button>
                    </form>

                    <section className="patients-section">
                        <div className="patients-toolbar">
                            <div>
                                <h2>Patient Records</h2>
                                <p>
                                    View patients associated with your account.
                                </p>
                            </div>

                            <div className="search-wrapper">
                                <FaSearch />

                                <input
                                    type="text"
                                    placeholder="Search name or bed ID"
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>

                        <div className="patient-table-wrapper">
                            {patients.length === 0 ? (
                                <div className="empty-state">
                                    <FaBed />
                                    <h3>No patients found</h3>
                                    <p>
                                        Add a patient or try another search.
                                    </p>
                                </div>
                            ) : (
                                <table className="patient-table">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Patient Name</th>
                                            <th>Bed ID</th>
                                            <th>Added On</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patients.map((patient) => (
                                            <tr key={patient._id}>
                                                <td>
                                                <input
                                                    type="radio"
                                                    name="selectedPatient"
                                                    checked={selectedPatientId === patient._id}
                                                    onChange={() => setSelectedPatientId(patient._id)}
                                                    />
                                                </td>

                                                <td>
                                                    <div className="patient-name-cell">
                                                        <span>
                                                            {patient.patientName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>

                                                        {
                                                            patient.patientName
                                                        }
                                                    </div>
                                                </td>

                                                <td>
                                                    <span className="bed-badge">
                                                        {patient.bedID}
                                                    </span>
                                                </td>

                                                <td>
                                                    {new Date(
                                                        patient.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                        <div className="delete-selected-wrapper">

                        <button
                            className="clear-selection-button"
                            onClick={() => setSelectedPatientId("")}
                            disabled={!selectedPatientId}
                        >
                            Clear Selection
                        </button>

                        <button
                            className="delete-selected-button"
                            disabled={!selectedPatientId}
                            onClick={() => setShowDeleteModal(true)}
                        >
                            Delete Selected
                        </button>
                    </div>

                    </section>
                </section>
            </section>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="logout-modal">
                        <h2>Logout?</h2>

                        <p>
                            Are you sure you want to logout from PatientCare?
                        </p>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="confirm-logout-button"
                                onClick={confirmLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="logout-modal">
                        <h2>Delete Patient?</h2>

                        <p>
                            Are you sure you want to delete the selected patient?
                            This action cannot be undone.
                        </p>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="cancel-button"
                                onClick={() => setShowDeleteModal(false)}
                                disabled={deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="confirm-logout-button"
                                onClick={handleDeletePatient}
                                disabled={deleting}
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        

        </main>
    );
}

export default Dashboard;