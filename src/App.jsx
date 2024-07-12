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
import Movie from "./pages/Movie";
import Ticket from "./pages/Ticket";
import Order from "./pages/Order";
import Payment from "./pages/Payment";
import Showtime from "./pages/Showtime";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/management/role" element={<Role />} />
          <Route path="/management/actor" element={<Actor />} />
          <Route path="/management/direction" element={<Direction />} />
          <Route path="/management/movie" element={<Movie />} />
          <Route path="/management/showtime" element={<Showtime />} />
          <Route path="/management/category" element={<Category />} />
          <Route path="/management/user" element={<User />} />
          <Route path="/management/ticket" element={<Ticket />} />
          <Route path="/management/order" element={<Order />} />
          <Route path="/management/payment" element={<Payment />} />
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
