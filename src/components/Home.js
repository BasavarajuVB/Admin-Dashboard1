import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "../styles/Home.css";

function Home({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(onLogout);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Web3Today Admin</h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/admin-news")}>Admin News</button>
        <button onClick={() => navigate("/admin-task")}>Admin Task</button>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Home;
