import React, { createContext } from "react";
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
import { Order } from "./pages/Order";
import { Order as ManagementOrder } from "./pages/management/Order";
import Payment from "./pages/management/Payment";
import Showtime from "./pages/management/Showtime";
import MovieDetail from "./pages/MovieDetail";
import { CheckRole } from "./utils/checkRole";
import { AuthContext, AuthProvider } from "./context/AuthContext";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  // const { user } = React.useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
          // element={<CheckRole isAdmin={(user && user.isAdmin) || false} />}
          >
            <Route element={<AdminLayout />}>
              <Route path="/management/role" element={<Role />} />
              <Route path="/management/actor" element={<ManagementActor />} />
              <Route path="/management/direction" element={<Direction />} />
              <Route path="/management/movie" element={<Movie />} />
              <Route path="/management/showtime" element={<Showtime />} />
              <Route path="/management/category" element={<Category />} />
              <Route path="/management/user" element={<User />} />
              <Route path="/management/order" element={<ManagementOrder />} />
              <Route path="/management/payment" element={<Payment />} />
              <Route path="/management" element={<Management />} />
            </Route>
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
              path="/movie/:id/showtime/:showtimeId/order"
              element={<Order />}
            />
            <Route path="/actor" element={<Actor />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
