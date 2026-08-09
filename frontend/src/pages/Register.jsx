// PatientCare registration page - handles new user account creation
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";
import API from "../services/api";
import backgroundImage from "../assets/login-background2.jpg";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        
        setError("");
        setUsernameError("");
        setEmailError("");
        setPasswordError("");
        setSuccess("");

        let hasError = false;

        if (!username.trim()) {
            setUsernameError("Please enter your username");
            hasError = true;
        }
        
        if (!email.trim()) {
            setEmailError("Please enter your email");
            hasError = true;
        }
        
        if (!password) {
            setPasswordError("Please enter your password");
            hasError = true;
        }
        
        if (hasError) {
            return;
        }

        try {
            setLoading(true);

            await API.post("/auth/register", {
                username: username.trim(),
                email: email.trim(),
                password
            });

            setSuccess("Registration successful!");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="auth-page"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="auth-overlay"></div>

            <nav className="auth-navbar">
                <div className="brand">
                    <span className="brand-icon">
                        <FaUserDoctor />
                    </span>

                    <span>PatientCare</span>
                </div>

                <div className="nav-links">
                    <button type="button">Home</button>
                    <button type="button">About</button>
                    <button type="button">Services</button>
                    <button type="button">Contact</button>
                </div>
            </nav>

            <section className="auth-content">
                <div className="hero-copy">
                    <p className="eyebrow">
                        SMART HOSPITAL MANAGEMENT
                    </p>

                    <h1>
                        Better patient care starts with better management.
                    </h1>

                    <p>
                        Securely manage patient records, bed assignments
                        and hospital information from one simple dashboard.
                    </p>

                    <div className="feature-list">
                        <span>✓ Secure authentication</span>
                        <span>✓ Fast patient search</span>
                        <span>✓ Easy bed management</span>
                    </div>
                </div>

                <form
                    className="auth-card"
                    onSubmit={handleRegister}
                >
                    <div className="auth-heading">

                        <span className="auth-badge">
                            Create account
                        </span>

                        <h2>Join PatientCare</h2>

                        <p>
                            Enter your details to create an account.
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success">
                            {success}
                        </div>
                    )}
                    <label htmlFor="username">
                        Username
                    </label>

                    <input
                        id="username"
                        className={usernameError ? "input-error" : ""}
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) =>{
                            setUsername(e.target.value)
                            setUsernameError("");

                        }}
                        autoComplete="username"
                    />

                    {usernameError && (
                        <p className="field-error">
                            {usernameError}
                        </p>
                    )}



                    <label htmlFor="register-email">
                        Email address
                    </label>

                    <input
                        id="register-email"
                        className={emailError ? "input-error" : ""}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                        }}
                    />
                    {emailError && (
                        <p className="field-error">
                            {emailError}
                        </p>
                    )}

                    <label htmlFor="register-password">
                        Password
                    </label>
                    <div className="password-wrapper">
                        <input
                            id="register-password"
                            className={passwordError ? "input-error" : ""}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                                setPasswordError("");
                            }}
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    
                    {passwordError && (
                        <p className="field-error">
                            {passwordError}
                        </p>
                    )}

                    <button
                        className="auth-submit"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/">Login</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Register;