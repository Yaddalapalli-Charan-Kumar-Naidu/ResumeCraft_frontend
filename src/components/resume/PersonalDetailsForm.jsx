import React, { useContext, useState } from "react";
import ResumeContext from "../context/ResumeContext";

const PersonalDetailForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the name contains a nested path (e.g., "socialMediaLinks[linkedIn]")
    if (name.includes("[")) {
      const [parent, child] = name.split(/[\[\]]/).filter(Boolean); // Split and extract keys
      setResumeData({
        ...resumeData,
        [parent]: {
          ...resumeData[parent],
          [child]: value,
        },
      });
    } else {
      setResumeData({
        ...resumeData,
        [name]: value,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage((page) => page + 1);
    console.log(page);
  };

  // console.log(resumeData);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-screen bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Personal Details</h2>
          <div>
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 0))}
              className={`px-4 py-2 rounded-md shadow mx-2 ${
                page === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              }`}
              aria-disabled={page === 0}
            >
              Back
            </button>

            <button
      type="button"
      onClick={() => setPage((prevPage) => prevPage + 1)}
      disabled={page === 10}
      className={`px-4 py-2 rounded-md shadow mx-2 ${
        page === 10
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-purple-600 text-white hover:bg-purple-500"
      }`}
      aria-disabled={page === 10}
    >
      Next
    </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">
          Get Started with the basic information
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                placeholder="Charan Kumar Naidu"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                name="firstName"
                value={resumeData.firstName}
                onChange={handleChange}
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
                name="lastName"
                value={resumeData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              placeholder="Full Stack Developer"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              name="designation"
              value={resumeData.designation}
              onChange={handleChange}
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
                name="phone"
                value={resumeData.phone}
                onChange={handleChange}
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
                name="email"
                value={resumeData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/in/yourprofile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                name="socialMediaLinks[linkedIn]"
                value={resumeData.socialMediaLinks?.linkedIn || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="text"
                placeholder="https://github.com/yourprofile"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                name="socialMediaLinks[github]"
                value={resumeData.socialMediaLinks?.github || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
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
