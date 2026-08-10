// PatientCare registration page - handles new user account creation
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

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
        <main className="reference-auth-page">
            <div className="reference-auth-wrapper">
                <h1 className="reference-hospital-title">
                    Hospital X
                </h1>
    
                <form
                    className="reference-auth-form"
                    onSubmit={handleRegister}
                >
                    <h2>Sign Up</h2>
    
                    {error && (
                        <div className="reference-auth-error">
                            {error}
                        </div>
                    )}
    
                    {success && (
                        <div className="reference-auth-success">
                            {success}
                        </div>
                    )}
    
                    <label htmlFor="username">
                        Username
                    </label>
    
                    <input
                        id="username"
                        type="text"
                        placeholder="mail@website.com"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            setUsernameError("");
                        }}
                    />
    
                    {usernameError && (
                        <p className="reference-field-error">
                            {usernameError}
                        </p>
                    )}
    
                    <label htmlFor="register-email">
                        Email
                    </label>
    
                    <input
                        id="register-email"
                        type="email"
                        placeholder="mail@website.com"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value);
                            setEmailError("");
                        }}
                    />
    
                    {emailError && (
                        <p className="reference-field-error">
                            {emailError}
                        </p>
                    )}
    
                    <label htmlFor="register-password">
                        Password
                    </label>
    
                    <input
                        id="register-password"
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
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
    
                    <p className="reference-auth-switch">
                        Already have an account?{" "}
                        <Link to="/">Log In</Link>
                    </p>
                </form>
            </div>
        </main>
    );
}

export default Register;