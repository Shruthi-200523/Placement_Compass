import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (formData.email === "" || formData.password === "") {
            setError("Please enter email and password.");
            return;
        }

        try {

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            console.log("Login response:", response.data);

            // Store logged-in user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );

            // Go to dashboard
            navigate("/dashboard");

        } catch (err) {

            console.error("Login error:", err);

            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError("Unable to connect to server.");
            }
        }
    };

    return (

        <div className="container">

            <div className="card">

                <h1 className="logo">
                    Placement Compass
                </h1>

                <h2>Welcome Back</h2>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="submit"
                        className="btn"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;