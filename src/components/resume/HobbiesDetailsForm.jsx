import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const HobbiesDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize hobbies state with resumeData.hobbies
  const [hobbies, setHobbies] = useState([""]);

  useEffect(() => {
    // If resumeData.hobbies exists and is not empty, use it to initialize hobbies
    if (resumeData.hobbies && resumeData.hobbies.length > 0) {
      setHobbies(resumeData.hobbies);
    }
  }, [resumeData.hobbies]);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newHobbies = [...hobbies];
    newHobbies[index] = value;

    // Update local state
    setHobbies(newHobbies);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      hobbies: newHobbies, // Update hobbies in real-time
    });
  };

  const handleAddHobby = () => {
    setHobbies([...hobbies, ""]);
  };

  const handleRemoveHobby = (index) => {
    const newHobbies = [...hobbies];
    newHobbies.splice(index, 1);
    setHobbies(newHobbies);
    setResumeData({
      ...resumeData,
      hobbies:newHobbies
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      hobbies: hobbies, // Save hobbies under the "hobbies" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Hobbies</h2>
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
              disabled={page === 6}
              className={`px-4 py-2 rounded-md shadow mx-2 ${
                page === 6
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-500"
              }`}
              aria-disabled={page === 6}
            >
              Next
            </button>
          </div>
        </div>
        <p className="text-gray-600 mb-6">Provide your hobbies</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {hobbies.map((hobby, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hobby {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chess, Reading, Cycling"
                    className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    value={hobby}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveHobby(index)}
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
            onClick={handleAddHobby}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Hobby
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

export default HobbiesDetailsForm;