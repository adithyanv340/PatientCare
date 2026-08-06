import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import backgroundImage from "../assets/login-background2.jpg";
import { FaUserDoctor } from "react-icons/fa6";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");
        setEmailError("");
        setPasswordError("");

        let hasError = false;

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

            const response = await API.post("/auth/login", {
                email: email.trim(),
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user", 
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
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
                    <p className="eyebrow">SMART HOSPITAL MANAGEMENT</p>

                    <h1>Better patient care starts with better management.</h1>

                    <p>
                        Securely manage patient records, bed assignments and hospital
                        information from one simple dashboard.
                    </p>

                    <div className="feature-list">
                        <span>✓ Secure authentication</span>
                        <span>✓ Fast patient search</span>
                        <span>✓ Easy bed management</span>
                    </div>
                </div>

                <form className="auth-card" onSubmit={handleLogin}>
                    <div className="auth-heading">
                        <span className="auth-badge">Welcome back</span>
                        <h2>Login to your account</h2>
                        <p>Enter your credentials to continue.</p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        className={emailError ? "input-error" : ""}
                        type="email"
                        placeholder="abc@gmail.com"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailError("");
                        }}
                        autoComplete="email"
                    />

                    {emailError && (
                        <p className="field-error">{emailError}</p> 
                    )}

                    <label htmlFor="password">Password</label>

                    <div className="password-wrapper">
                    <input
                        id="password"
                        className={passwordError ? "input-error" : ""}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setPasswordError("");
                        }}
                        autoComplete="current-password"
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
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="auth-switch">
                        Don&apos;t have an account?{" "}
                        <Link to="/register">Create account</Link>
                    </p>
                </form>
            </section>
        </main>
    );
}

export default Login;