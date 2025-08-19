// src/components/Header.tsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../img/logo.png";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-between items-center h-16"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <motion.div
            className="flex-shrink-0 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logo} alt="Logo" className="w-30" />
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            {[
              { link: "Home", to: "/" },
              { link: "How it Works", to: "/survey" },
              { link: "Marketplace", to: "/marketplace" },
              { link: "$Surda", to: "/surda" },
              { link: "Contact Us", to: "/contact" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.05, color: "#60A5FA" }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 font-medium hover:text-blue-300"
                      : "hover:text-gray-300 font-normal text-xs"
                  }
                >
                  {item.link}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-800 rounded-md text-sm hover:bg-gray-700"
              >
                Log In
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/try"
                className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium hover:bg-blue-500"
              >
                Try Now
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <motion.div
            className="lg:hidden flex items-center"
            whileTap={{ scale: 0.9 }}
          >
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-black border-t border-gray-800"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-4 gap-4 text-sm">
              {[
                { link: "Home", to: "/" },
                { link: "How it Works", to: "/survey" },
                { link: "Marketplace", to: "/marketplace" },
                { link: "$Surda", to: "/surda" },
                { link: "Contact Us", to: "/contact" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-medium hover:text-blue-300"
                        : "hover:text-gray-300"
                    }
                  >
                    {item.link}
                  </NavLink>
                </motion.div>
              ))}

              <div className="flex  gap-2 pt-2">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/login"
                    className="px-3 py-1 bg-gray-800 rounded-md text-sm hover:bg-gray-700"
                  >
                    Log In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link
                    to="/try"
                    className="px-3 py-1 bg-blue-600 rounded-md text-sm font-medium hover:bg-blue-500"
                  >
                    Try Now
                  </Link>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
