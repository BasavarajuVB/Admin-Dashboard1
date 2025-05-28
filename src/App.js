// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminNews from "./components/AdminNews";
import AdminTask from "./components/AdminTask";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {!loggedIn ? (
          <Route path="*" element={<Login onLogin={() => setLoggedIn(true)} />} />
        ) : (
          <>
            <Route path="/" element={<Home onLogout={() => setLoggedIn(false)} />} />
            <Route path="/admin-news" element={<AdminNews />} />
            <Route path="/admin-task" element={<AdminTask />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
