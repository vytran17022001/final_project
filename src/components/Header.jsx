import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../context/AuthProvider";
import logo from "../logo1.svg";
import getData from "../utils/getData";

function Header({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);

  const [categories, setCategories] = React.useState([]);

  const fetchData = async () => {
    const categorie = await getData("category");
    setCategories(categorie);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <header className="z-50 bg-slate-50 shadow-md">
      <div className="container mx-auto max-w-screen-xl px-4 h-20 flex items-center justify-between">
        <Link to="/">
          <img className="h-12 mb-2" src={logo} alt="Cinema Ticket Logo" />
        </Link>

        <div className="flex flex-1 items-center space-x-8 pl-10">
          <Link to="#">
            <img
              className="h-12 object-cover bg-transparent"
              src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png"
              alt="Ticket"
            />
          </Link>

          <div className="relative group">
            <Link
              to="#"
              className="py-6 flex items-center text-sm group-hover:text-yellow-500 transition-all"
            >
              Cinema Corner
              <span className="ml-1 mt-0.5 hidden md:block text-[#777] group-hover:text-yellow-500">
                <KeyboardArrowDownIcon />
              </span>
            </Link>
            <div className="absolute left-0 top-full hidden group-hover:block z-50">
              <Box sx={{ boxShadow: 3 }} className="shadow-lg">
                <div className="bg-white min-w-[190px] text-left border border-white rounded">
                  <ul>
                    <li className="py-2 px-4 text-sm text-black hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 border-yellow-600">
                      <Link to="/actor">Actor</Link>
                    </li>
                    <li className="py-2 px-4 text-sm text-black hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 border-yellow-600">
                      <Link to="/direction">Direction</Link>
                    </li>
                  </ul>
                </div>
              </Box>
            </div>
          </div>

          <div className="relative group">
            <Link
              to="#"
              className="py-6 flex items-center text-sm group-hover:text-yellow-500 transition-all"
            >
              Category
              <span className="ml-1 mt-0.5 hidden md:block text-[#777] group-hover:text-yellow-500">
                <KeyboardArrowDownIcon />
              </span>
            </Link>
            <div className="absolute top-full  hidden group-hover:block z-50">
              <Box sx={{ boxShadow: 3 }} className="shadow-lg">
                <div className="bg-white min-w-[190px] text-left border border-white rounded">
                  <ul>
                    {categories.map((cat) => (
                      <li
                        key={cat.id}
                        className="py-2 px-4 text-sm text-black hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 border-yellow-600"
                      >
                        <Link to={`/category/${cat.id}`}>
                          {cat.category_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Box>
            </div>
          </div>
          <div className="relative group">
            <Link
              to="#"
              className="py-6 flex items-center text-sm group-hover:text-yellow-500 transition-all"
            >
              Event
              <span className="ml-1 mt-0.5 hidden md:block text-[#777] group-hover:text-yellow-500">
                <KeyboardArrowDownIcon />
              </span>
            </Link>
            <div className="absolute left-0 top-full hidden group-hover:block z-50">
              <Box sx={{ boxShadow: 3 }} className="shadow-lg">
                <div className="bg-white min-w-[190px] text-left border border-white rounded">
                  <ul>
                    <li className="py-2 px-4 text-sm text-black hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 border-yellow-600">
                      <Link to="/actor">Endow</Link>
                    </li>
                    <li className="py-2 px-4 text-sm text-black hover:text-yellow-600 hover:bg-yellow-50 hover:border-l-4 border-yellow-600">
                      <Link to="/direction">Good movie</Link>
                    </li>
                  </ul>
                </div>
              </Box>
            </div>
          </div>
          <div className="relative group">
            <Link
              to="/about"
              className="py-6 flex items-center text-sm group-hover:text-yellow-500 transition-all"
            >
              About Cinema
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-1.5 rounded bg-blue-400 text-white hover:bg-blue-500 transition"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded border border-blue-400 text-blue-400 hover:bg-blue-500  hover:text-white transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <Link to={`/user/${user.id}`} className="">
                <span className="text-gray-700"> {user.user_email}</span>
              </Link>
              <button
                onClick={logout}
                className="px-4 py-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
