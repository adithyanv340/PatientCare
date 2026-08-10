import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiSearch } from "react-icons/fi";
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
    const [showPatientModal, setShowPatientModal] = useState(false);

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
            setShowPatientModal(false);

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
        <main className="reference-dashboard">
            <header className="reference-topbar">
                <div className="reference-user-name">
                    {user?.username || "User"}
                </div>
    
                <button
                    type="button"
                    className="reference-logout-button"
                    onClick={() => setShowLogoutModal(true)}
                >
                    <FiLogOut/>
                    <span>Log Out</span>
                </button>
            </header>
    
            <div className="reference-dashboard-toolbar">
                <button
                    type="button"
                    className="reference-create-button"
                    onClick={() => setShowPatientModal(true)}
                >
                    Create Patient
                </button>
    
                <h1>Dashboard</h1>
    
                <div className="reference-search-box">
                    <div className="reference-search-input">
                        <input
                            type="text"
                            placeholder="Patient name / Bed ID"
                            value={search}
                            onChange={handleSearch}
                        />

                        <FiSearch className="reference-search-icon" />
                    </div>
                </div>
            </div>
    
            <section className="reference-dashboard-content">
                {patients.length === 0 ? (
                    <p className="reference-empty-state">
                        No patients found
                    </p>
                ) : (
                    <div className="reference-patient-list">
                        {patients.map((patient) => (
                            <div
                                className="reference-patient-card-wrapper"
                                key={patient._id}
                            >
                                <div className="reference-bed-id">
                                    {patient.bedID}
                                </div>

                                <div className="reference-patient-card">
                                    {patient.patientName}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </section>
    
            {showPatientModal && (
                <div className="reference-modal-overlay">
                    <div className="reference-patient-modal">
                        <h2>Create Patient</h2>
    
                        {patientError && (
                            <div className="reference-auth-error">
                                {patientError}
                            </div>
                        )}
    
                        <form onSubmit={handleAddPatient}>
                            <label htmlFor="patientName">
                                Patient Name
                            </label>
    
                            <input
                                id="patientName"
                                type="text"
                                value={patientName}
                                onChange={(event) => {
                                    setPatientName(event.target.value);
                                    setPatientNameError("");
                                }}
                            />
    
                            {patientNameError && (
                                <p className="reference-field-error">
                                    {patientNameError}
                                </p>
                            )}
    
                            <label htmlFor="bedID">
                                Bed ID
                            </label>
    
                            <input
                                id="bedID"
                                type="text"
                                value={bedID}
                                onChange={(event) => {
                                    setBedID(event.target.value);
                                    setBedIDError("");
                                }}
                            />
    
                            {bedIDError && (
                                <p className="reference-field-error">
                                    {bedIDError}
                                </p>
                            )}
    
                            <div className="reference-modal-actions">
                                <button
                                    type="submit"
                                    className="reference-save-button"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save"}
                                </button>
    
                                <button
                                    type="button"
                                    className="reference-cancel-button"
                                    onClick={() => {
                                        setShowPatientModal(false);
                                        setPatientName("");
                                        setBedID("");
                                        setPatientNameError("");
                                        setBedIDError("");
                                        setPatientError("");
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
    
            {showLogoutModal && (
                <div className="reference-modal-overlay">
                    <div className="reference-confirm-modal">
                        <h2>Log Out?</h2>
    
                        <p>
                            Are you sure you want to log out?
                        </p>
    
                        <div className="reference-modal-actions">
                            <button
                                type="button"
                                className="reference-cancel-button"
                                onClick={() => setShowLogoutModal(false)}
                            >
                                Cancel
                            </button>
    
                            <button
                                type="button"
                                className="reference-delete-button"
                                onClick={confirmLogout}
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Dashboard;