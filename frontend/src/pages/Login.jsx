// PatientCare login page - handles user authentication and navigation
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [identifier, setIdentifier] = useState("");
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

        if (!identifier.trim()) {
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
                identifier: identifier.trim(),
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
        <main className="reference-auth-page">
            <div className="reference-auth-wrapper">
                <h1 className="reference-hospital-title">Hospital X</h1>
    
                <form
                    className="reference-auth-form"
                    onSubmit={handleLogin}
                >
                    <h2>Log In</h2>
    
                    {error && (
                        <div className="reference-auth-error">
                            {error}
                        </div>
                    )}
    
                    <label htmlFor="email">
                        Username / email
                    </label>
    
                    <input
                        id="email"
                        type="text"
                        placeholder="mail@website.com"
                        value={identifier}
                        onChange={(event) => {
                            setIdentifier(event.target.value);
                            setEmailError("");
                        }}
                    />
    
                    {emailError && (
                        <p className="reference-field-error">
                            {emailError}
                        </p>
                    )}
    
                    <label htmlFor="password">
                        Password
                    </label>
    
                    <input
                        id="password"
                        type="password"
                        placeholder="**********"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setPasswordError("");
                        }}
                    />
    
                    {passwordError && (
                        <p className="reference-field-error">
                            {passwordError}
                        </p>
                    )}
    
                    <button
                        type="submit"
                        className="reference-auth-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </button>
    
                    <p className="reference-auth-switch">
                        Don&apos;t have an account?{" "}
                        <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default Login;