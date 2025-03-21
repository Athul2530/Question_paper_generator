import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { getUserRole } from '../services/authService.js';

const Navbar = () => {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">QPGS</div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        {role === 'teacher' && <li><Link to="/teacher">Teacher Module</Link></li>}
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
