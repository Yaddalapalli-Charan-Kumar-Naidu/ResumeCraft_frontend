import React, { useContext } from "react";
import ResumeContext from "../context/ResumeContext";

const PersonalDetailForm = () => {
  const {data,setResumeData}=useContext(ResumeContext);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-screen bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
          <div>
          <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-500 mx-2"
            >
              Back 
            </button>
          <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-500"
            >
              Next 
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          Get Started with the basic information
        </p>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder={data.firstName}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Yaddalapalli"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job title
            </label>
            <input
              type="text"
              placeholder="Full Stack Developer"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                placeholder="9988776655"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailForm;
