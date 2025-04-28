import React, { createContext } from "react";
import "./output.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Role from "./pages/management/Role";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AdminLayout from "./components/management/AdminLayout";
import { Actor as ManagementActor } from "./pages/management/Actor";
import { Direction as ManagementDirection } from "./pages/management/Direction";
import { Actor } from "./pages/Actor";
import { Direction } from "./pages/Direction";
import Category from "./pages/management/Category";
import { User as ManagementUser } from "./pages/management/User";
import Movie from "./pages/management/Movie";
import { Order } from "./pages/Order";
import Summary from "./pages/Summary";
import { Order as ManagementOrder } from "./pages/management/Order";
import Showtime from "./pages/management/Showtime";
import MovieDetail from "./pages/MovieDetail";
import { User } from "./pages/User";
import Movies from "./pages/Movies";
import { AuthContext, AuthProvider } from "./context/AuthProvider";

// Route (duong di) cua trang web
// Authentication
export default function App() {
  // const { user } = React.useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route>
            <Route element={<AdminLayout />}>
              <Route path="/management/role" element={<Role />} />
              <Route path="/management/actor" element={<ManagementActor />} />
              <Route
                path="/management/direction"
                element={<ManagementDirection />}
              />
              <Route path="/management/movie" element={<Movie />} />
              <Route path="/management/showtime" element={<Showtime />} />
              <Route path="/management/category" element={<Category />} />
              <Route path="/management/user" element={<ManagementUser />} />
              <Route path="/management/order" element={<ManagementOrder />} />
            </Route>
          </Route>

          <Route element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
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
            <Route path="/summary" element={<Summary />} />
            <Route path="/actor" element={<Actor />} />
            <Route path="/direction" element={<Direction />} />
            <Route path="/user/:id" element={<User />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
