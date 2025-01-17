import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const SkillsDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize skills state with resumeData.skills or a default skill
  const [skills, setSkills] = useState([""]);

  useEffect(() => {
    // If resumeData.skills exists and is not empty, use it to initialize skills
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSkills(resumeData.skills);
    } else {
      // Initialize with one default skill
      setSkills([""]);
    }
  }, [resumeData.skills]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newSkills = [...skills];
    newSkills[index] = value;

    // Update local state
    setSkills(newSkills);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      skills: newSkills, // Update skills in real-time
    });
  };

  const handleAddSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);

    // Update local state
    setSkills(newSkills);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      skills: newSkills, // Update skills in real-time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      skills: skills, // Save skills under the "skills" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Skills</h2>
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
        <p className="text-gray-600 mb-6">Provide your skills</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skill {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a skill"
                    className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={skill}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
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
            onClick={handleAddSkill}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Skill
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

export default SkillsDetailsForm;