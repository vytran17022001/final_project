import React, { useState } from "react";
import "./output.css";
import getData from "./utils/getData";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  const [data, setData] = React.useState([]);

  const fetchData = async () => {
    const result = await getData("school");
    setData(result);
  };

  // fetchData();

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}
