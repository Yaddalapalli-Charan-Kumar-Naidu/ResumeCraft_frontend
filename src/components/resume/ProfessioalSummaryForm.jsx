import React, { useContext, useState } from "react";
import ResumeContext from "../context/ResumeContext";

const ProfessionalSummaryForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setResumeData({
      ...resumeData,
      [name]: value,
    });
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
          <h2 className="text-xl font-bold text-gray-800">
            Professional Summary
          </h2>
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
              onClick={handleSubmit}
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
        <p className="text-gray-600 mb-6">provide some professional summary</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 my-1">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Professional Summary
              </label>
              <textarea
                placeholder="Provide a brief professional summary..."
                rows={7}
                className="my-1 block w-full h-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                name="professionalSummary"
                value={resumeData.professionalSummary}
                onChange={handleChange}
              />
            </div>
          </div>
              <br/>
          {/* <div className="flex justify-between items-center m-1">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 mt-2"
            >
              Save
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
