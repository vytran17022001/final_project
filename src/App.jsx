import React from "react";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Role from "./pages/Role";
import Direction from "./pages/Direction";
import Management from "./pages/Management";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AdminLayout from "./components/management/AdminLayout";
import Actor from "./pages/Actor";
import Category from "./pages/Category";
import User from "./pages/User";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/management/direction" element={<Direction />} />
          <Route path="/management/role" element={<Role />} />
          <Route path="/management/actor" element={<Actor />} />
          <Route path="/management/direction" element={<Role />} />
          <Route path="/management/movie" element={<Role />} />
          <Route path="/management/showtime" element={<Role />} />
          <Route path="/management/category" element={<Category />} />
          <Route path="/management/user" element={<User />} />
          <Route path="/management/ticket" element={<Role />} />
          <Route path="/management/payment" element={<Role />} />
          <Route path="/management" element={<Management />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
