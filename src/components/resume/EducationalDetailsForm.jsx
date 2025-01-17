import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const EducationalDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize educations state with resumeData.education
  const [educations, setEducations] = useState([
    { institution: "", degree: "", startDate: "", endDate: "" },
  ]);

  useEffect(() => {
    // If resumeData.education exists and is not empty, use it to initialize educations
    if (resumeData.education && resumeData.education.length > 0) {
      setEducations(resumeData.education);
    }
  }, [resumeData.education]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newEducations = [...educations];
    newEducations[index][name] = value;
  
    // Update local state
    setEducations(newEducations);
  
    // Update global resumeData state
    setResumeData({
      ...resumeData,
      education: newEducations, // Update education in real-time
    });
  };
  const handleAddEducation = () => {
    setEducations([
      ...educations,
      { institution: "", degree: "", startDate: "", endDate: "" },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const newEducations = [...educations];
    newEducations.splice(index, 1);
    setEducations(newEducations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      education: educations, // Save educations under the "education" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Educational Details</h2>
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
        <p className="text-gray-600 mb-6">Provide your educational details</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {educations.map((education, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Institution
                    </label>
                    <input
                      type="text"
                      placeholder="Institution Name"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="institution"
                      value={education.institution}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Degree
                    </label>
                    <input
                      type="text"
                      placeholder="Degree"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="degree"
                      value={education.degree}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="startDate"
                      value={education.startDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="endDate"
                      value={education.endDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Education
          </button>
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

export default EducationalDetailsForm;