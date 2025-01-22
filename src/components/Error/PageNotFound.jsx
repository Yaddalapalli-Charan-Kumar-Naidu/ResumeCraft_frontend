import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

const PageNotFound = () => {
  // Show a toast message when the component mounts
  useEffect(() => {
    toast.error("The page you're looking for doesn't exist.", {
      position: 'bottom-right',
      autoClose: 5000, // Close after 5 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* ToastContainer must be included for toast messages to work */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Container */}
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;