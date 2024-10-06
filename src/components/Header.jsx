import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import getData from "../utils/getData";

import logo from "../logo1.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../context/AuthContext";

function Header({ mode, toggleColorMode }) {
  const { user, logout } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-50 shadow-lg">
      <div className="container mx-auto px-4 h-16 max-w-screen-xl">
        <div className="flex justify-between items-center h-14">
          <Link to="/">
            <img className="h-12" src={logo} alt="logo of cinema ticket" />
          </Link>
          <div className="px-5 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center">
              <Link to="#" className="mr-4">
                <img
                  className="h-12 object-cover bg-transparent"
                  src="https://png.pngtree.com/png-vector/20230227/ourmid/pngtree-golden-ticket-png-image_6621563.png"
                  alt="Ticket"
                />
              </Link>
              <div className="hover relative">
                <div className=" text-left md:cursor-pointer group hover:text-yellow-500 ease-out transition-all duration-300 ">
                  <Link
                    to="#"
                    className="py-9 flex text-sm justify-between items-center md:pr-0 pr-5 group capitalize hover:text-yellow-500 transition-all duration-300"
                  >
                    Cinema Corner
                    <span className="text-xs md:ml-0.5 mt-0.5 md:block hidden group-hover:text-yellow-500 transition-all duration-300 text-[#777777]">
                      <KeyboardArrowDownIcon />
                    </span>
                  </Link>
                  <div>
                    <div className="absolute top-[65px] -left-[33px] hidden  group-hover:md:block hover:md:block z-[800]">
                      <Box
                        sx={{ boxShadow: 3 }}
                        class="shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px]"
                      >
                        <div className="bg-white min-w-[190px]  text-center border border-white border-solid rounded-sm ">
                          <ul>
                            <li className="text-sm text-black hover:text-yellow-600 hover:pl-0.5 hover:border-l-4 capitalize hover:border-yellow-600 hover:bg-yellow-50 transition-all duration-300">
                              <Link className="block py-2" to="/actor">
                                Actor
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-5 transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-center">
              <h2>{`Hello ${user ? user.user_email : "guest"}`}</h2>
              <button onClick={(e) => logout()}>logout</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
