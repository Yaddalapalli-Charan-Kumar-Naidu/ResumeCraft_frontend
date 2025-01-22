import React from 'react';

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Container */}
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <a
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;