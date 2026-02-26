import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MobileMenu = () => {
  const { setShowMobileMenu, token, setShowLogin, logout } = useContext(AppContext);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={menuVariants}
        className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl z-50"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-amber-950">Menu</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileMenu(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                variants={linkVariants}
                className="mb-2"
              >
                <NavLink
                  to={link.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg text-lg font-medium transition-colors duration-200
                    ${isActive 
                      ? "bg-amber-50 text-amber-600" 
                      : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="p-4 border-t">
            {token ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    logout();
                  }}
                  className="w-full px-4 py-3 text-left text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowMobileMenu(false);
                  setShowLogin(true);
                }}
                className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-medium
                hover:bg-amber-700 transition-colors duration-200 shadow-md"
              >
                Login
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileMenu; 