import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import "../styles/RegisterForm.css"; 

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerUser(email, password, role);
    if (response.message) {
      alert("Registration successful!");
      navigate("/");
    } else {
      setMessage(response.error || "Registration failed");
    }
  };

  return (
    <div className="register-container"style={{ backgroundImage: "url('/img2.png')", backgroundSize: "cover", backgroundPosition: "center", height: "100vh" }}>
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {message && <p className="error-message">{message}</p>}

          <button type="submit" className="btn">Register</button>

          <p className="login-text">
            Already have an account? <Link to="/" className="login-link">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
