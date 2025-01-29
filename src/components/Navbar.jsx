import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "./context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashLoader } from "react-spinners";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { userData } = useContext(userContext);

  const profilePictureUrl = userData?.profilePicture
    ? `${import.meta.env.VITE_BASEURL}/${userData.profilePicture.replace(/\\/g, "/")}`
    : "https://static.vecteezy.com/system/resources/previews/020/765/399/large_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg";

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsDropdownOpen(false);
      setIsLoggingOut(false);
      navigate("/");
    }, 1500);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-screen min-h-[10vh] mb-3 z-[2]">
      {/* ToastContainer with proper configuration */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000} // Toast will auto-close after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Text */}
          <div className="flex items-center">
            <img
              src="logo.webp"
              alt="Logo"
              className="h-16 rounded-full p-2"
            />
            <Link to="/" className="text-2xl font-bold text-purple-600">
              ResumeBuilder
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">
              Home
            </Link>
            {localStorage.getItem("token") && (
              <Link to="/dashboard" className="text-gray-700 hover:text-purple-600 font-medium">
                Dashboard
              </Link>
            )}
            <Link to="/templates" className="text-gray-700 hover:text-purple-600 font-medium">
              Templates
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 font-medium">
              Contact
            </Link>
          </div>

          {/* User Profile Section */}
          {localStorage.getItem("token") ? (
            <div className="hidden md:flex items-center" ref={dropdownRef}>
              <div className="relative">
                <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                  <img
                    src={profilePictureUrl}
                    alt="User Profile"
                    className="rounded-full h-10 w-10"
                  />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      {isLoggingOut ? (
                        <HashLoader size={20} color="#6D28D9" />
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center">
              <Link to="/login">Login/Signup</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-purple-600 focus:outline-none mobile-menu-button"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          {localStorage.getItem("token") && (
            <Link
              to="/dashboard"
              className="block text-gray-700 hover:text-purple-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/templates"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Templates
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          {localStorage.getItem("token") ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-purple-600 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={handleLogout}
              >
                {isLoggingOut ? (
                  <HashLoader size={20} color="#6D28D9" />
                ) : (
                  "Logout"
                )}
              </button>
            </>
          ) : (
            <Link
            to="/login"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login/Signup
          </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;