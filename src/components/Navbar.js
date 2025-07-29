import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Assuming you have a CSS file for styling

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Web3Today Admin
      </Link>
      
      <div className="navbar-center">
        <Link to="/admin-task" className="navbar-link">
          Admin Task
        </Link>
        <Link to="/admin-news" className="navbar-link">
          Admin News
        </Link>
      </div>
      
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </nav>
  );
}

export default Navbar;