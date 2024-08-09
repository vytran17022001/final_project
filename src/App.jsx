import React from "react";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Role from "./pages/management/Role";
import Direction from "./pages/management/Direction";
import Management from "./pages/management/Management";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AdminLayout from "./components/management/AdminLayout";
import { Actor as ManagementActor } from "./pages/management/Actor";
import { Actor } from "./pages/Actor";
import Category from "./pages/management/Category";
import User from "./pages/management/User";
import Movie from "./pages/management/Movie";
import { Ticket as ManagementTicket } from "./pages/management/Ticket";
import { Ticket } from "./pages/Ticket";
import Order from "./pages/management/Order";
import Payment from "./pages/management/Payment";
import Showtime from "./pages/management/Showtime";
import MovieDetail from "./pages/MovieDetail";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/management/role" element={<Role />} />
          <Route path="/management/actor" element={<ManagementActor />} />
          <Route path="/management/direction" element={<Direction />} />
          <Route path="/management/movie" element={<Movie />} />
          <Route path="/management/showtime" element={<Showtime />} />
          <Route path="/management/category" element={<Category />} />
          <Route path="/management/user" element={<User />} />
          <Route path="/management/ticket" element={<ManagementTicket />} />
          <Route path="/management/order" element={<Order />} />
          <Route path="/management/payment" element={<Payment />} />
          <Route path="/management" element={<Management />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/movie/:id/showtime/" element={<MovieDetail />} />
          <Route
            path="/movie/:id/showtime/:showtimeId"
            element={<MovieDetail />}
          />
          <Route
            path="/movie/:id/showtime/:showtimeId/ticket"
            element={<Ticket />}
          />
          <Route path="/actor" element={<Actor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
