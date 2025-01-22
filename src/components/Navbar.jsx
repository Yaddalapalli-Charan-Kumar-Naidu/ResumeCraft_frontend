import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For user profile dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const dropdownRef = useRef(null);
  const navigate=useNavigate();
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/");
  }

  // Close dropdown and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-button")) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener for clicks outside the dropdown and mobile menu
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-screen min-h-[10vh] mb-3 z-[2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Text */}
          <div className="flex items-center">
            <img
              src="logo.webp" // Path to your logo image
              alt="Logo"
              className="h-16 rounded-full p-2" // Adjust styling as needed
            />
            <Link to="/" className="text-2xl font-bold text-purple-600">
              ResumeBuilder
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {localStorage.getItem("token")&&<Link
              to="/dashboard"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Dashboard
            </Link>}
            <Link
              to="/templates"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Templates
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* User Profile Section */}{
            localStorage.getItem("token")?
          
          <div className="hidden md:flex items-center" ref={dropdownRef}>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <img
                  src="https://via.placeholder.com/40" // Replace with user profile image
                  alt="User Profile"
                  className="rounded-full h-10 w-10"
                />
                {/* <span className="ml-2 text-gray-700 font-medium">John Doe</span> */}
                {/* <svg
                  className="ml-2 h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg> */}
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
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
          : <div className="flex items-center"><Link to='/login'>Login/Signup</Link></div>}

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
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/create-resume"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Create Resume
          </Link>
          <Link
            to="/templates"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Templates
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;