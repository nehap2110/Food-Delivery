import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { ShoppingBasket } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const {
    setCartOpen,
    totalQuantity,
    setShowLogin,
    setShowMobileMenu,
    token,
    logout,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const userName = localStorage.getItem("userName");

  const onClickHandler = () => {
    navigate("/orders");
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav className="shadow-md">
      <div className=" flex justify-between sm:justify-around items-center p-2 lg:mx-20 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="p-4"
        >
          <img
            onClick={() => navigate("/")}
            className="cursor-pointer  w-20 md:w-28"
            src={assets.brandLogo}
            alt=""
          />
        </motion.div>
        <div className="hidden sm:block">
          <ul className="flex gap-5 md:gap-10 font-Outfit font-medium text-lg">
            <NavLink to={"/"} className="p-2 text-[#492d13]">
              {" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Home
              </motion.div>{" "}
            </NavLink>
            <NavLink to={"/menu"} className="p-2 text-[#492d13]">
              {" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Menu
              </motion.div>{" "}
            </NavLink>
            <NavLink to={"/about"} className="p-2 text-[#492d13]">
              {" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                About
              </motion.div>{" "}
            </NavLink>
            <NavLink to={"/contact"} className="p-2 text-[#492d13]">
              {" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                Contact
              </motion.div>{" "}
            </NavLink>
          </ul>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex gap-4 items-center"
        >
          <div className=" rounded-full relative">
            {totalQuantity === 0 ? (
              <></>
            ) : (
              <div
                className="absolute w-5 h-5 font-Outfit top-0 text-white rounded-full text-center right-0 bg-[#f29c52] text-[9px]
                            font-semibold p-1"
              >
                {" "}
                {totalQuantity}
              </div>
            )}

            <ShoppingBasket
              onClick={() => setCartOpen(true)}
              className="cursor-pointer border border-[#f29c52] rounded-full p-3 w-full h-full"
            />
          </div>
          {token ? (
            <div className="relative hidden sm:block">
              <button
                id="dropdownDefaultButton "
                className=" rounded-full"
                data-dropdown-toggle="dropdown"
              >
                <img
                  onClick={() => setShowDropdown((prev) => !prev)}
                  src={assets.user}
                  alt=""
                  className="w-12 mt-1"
                />
              </button>
              <div
                id="dropdown"
                className={`z-20 right-0 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-28 dark:bg-gray-700 ${
                  showDropdown ? "block" : "hidden"
                } `}
              >
                <div className="px-2 py-3 text-sm text-gray-900 dark:text-white">
                  <p className="font-Outfit px-2">
                    {userName
                      ? userName.charAt(0).toUpperCase() +
                        userName.slice(1).toLowerCase()
                      : "User"}
                  </p>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      onClick={onClickHandler}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-Outfit cursor-pointer"
                    >
                      Orders
                    </a>
                  </li>

                  <li>
                    <a
                      onClick={logout}
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-Outfit cursor-pointer"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-8 py-2 hidden sm:block border rounded-full bg-[#f29c52] text-xl text-white font-Outfit font-medium
                            hover:bg-[#492d13] transition-all duration-200 delay-[50ms]
                        "
            >
              Login
            </button>
          )}

          <div
            onClick={() => setShowMobileMenu(true)}
            className="bg-[#492d13] py-3 px-4 sm:hidden"
          >
            <Menu color="white" width={20} />
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
