import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const ExperienceDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize experiences state with resumeData.experience
  const [experiences, setExperiences] = useState([
    { jobTitle: "", company: "", duration: "", description: "" },
  ]);

  useEffect(() => {
    // If resumeData.experience exists and is not empty, use it to initialize experiences
    if (resumeData.experience && resumeData.experience.length > 0) {
      setExperiences(resumeData.experience);
    }
  }, [resumeData.experience]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newExperiences = [...experiences];
    newExperiences[index][name] = value;

    // Update local state
    setExperiences(newExperiences);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      experience: newExperiences, // Update experience in real-time
    });
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { jobTitle: "", company: "", duration: "", description: "" },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
  
    // Update local state
    setExperiences(newExperiences);
  
    // Update global resumeData state
    setResumeData({
      ...resumeData,
      experience: newExperiences, // Update experience in real-time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      experience: experiences, // Save experiences under the "experience" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Experience Details</h2>
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
        <p className="text-gray-600 mb-6">Provide your experience details</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {experiences.map((experience, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Job Title
                    </label>
                    <input
                      type="text"
                      placeholder="Job Title"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="jobTitle"
                      value={experience.jobTitle}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      placeholder="Company"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="company"
                      value={experience.company}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Dec 2022)"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="duration"
                      value={experience.duration}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="description"
                    value={experience.description}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
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
            onClick={handleAddExperience}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Experience
          </button>
          <div className="flex justify-between items-center m-1">
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 mt-2"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceDetailsForm;