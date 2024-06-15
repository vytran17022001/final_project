import React from "react";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Role from "./pages/Role";
import Direction from "./pages/Direction";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/direction" element={<Direction />} />
          <Route path="/role" element={<Role />} />
        </Routes>
      </div>
    </Router>
  );
}
