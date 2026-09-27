import axios from "axios";
import { useState } from "react";
import "../App.css";

function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        college: "",
        department: "",
        year: "",
        agree: false,
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess("");

  if (
    formData.name === "" ||
    formData.email === "" ||
    formData.password === "" ||
    formData.confirmPassword === "" ||
    formData.college === ""
  ) {
    setError("Please fill all the fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (!formData.agree) {
    setError("Please accept the Terms & Conditions.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:8080/api/auth/register",
      {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
      }
    );

    setError("");
    setSuccess("Registration Successful!");

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      college: "",
      agree: false,
    });
  } catch (err) {
    setError("Email already exists!");
  }
};

    return (

        <div className="container">

            <div className="card">

                <h1 className="logo">
                    Placement Compass
                </h1>

                <h2>Create Your Account</h2>

                {error && <p className="error">{error}</p>}

                {success && <p className="success">{success}</p>}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />

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

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="college"
                        placeholder="College Name"
                        value={formData.college}
                        onChange={handleChange}
                    />

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="IT">IT</option>
                    </select>

                    <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                    >
                        <option value="">Graduation Year</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                    </select>

                    <label className="checkbox">

                        <input
                            type="checkbox"
                            name="agree"
                            checked={formData.agree}
                            onChange={handleChange}
                        />

                        I agree to the Terms & Conditions

                    </label>

                    <button type="submit" className="btn">
                        Register
                    </button>

                </form>

            </div>

        </div>

    );
}

export default Register;