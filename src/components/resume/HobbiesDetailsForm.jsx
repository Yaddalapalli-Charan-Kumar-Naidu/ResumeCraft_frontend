import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import axios from "axios";

const HobbiesDetailsForm = ({ page, setPage, isEdit }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [hobbies, setHobbies] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize hobbies from resumeData
  useEffect(() => {
    if (resumeData.hobbies && resumeData.hobbies.length > 0) {
      setHobbies(resumeData.hobbies);
    } else {
      setHobbies([""]); // Initialize with one empty field if hobbies is empty
    }
  }, [resumeData]);

  // Handle input change for hobbies
  const handleChange = (e, index) => {
    const { value } = e.target;
    const newHobbies = [...hobbies];
    newHobbies[index] = value;

    // Update local state
    setHobbies(newHobbies);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      hobbies: newHobbies,
    });
  };

  // Add a new hobby field
  const handleAddHobby = () => {
    setHobbies([...hobbies, ""]);
  };

  // Remove a hobby field
  const handleRemoveHobby = (index) => {
    const newHobbies = [...hobbies];
    newHobbies.splice(index, 1);
    setHobbies(newHobbies);
    setResumeData({
      ...resumeData,
      hobbies: newHobbies,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    // Validate that at least one hobby is filled
    const isHobbiesValid = hobbies.some((hobby) => hobby.trim() !== "");
    if (!isHobbiesValid) {
      setError("Please enter at least one hobby.");
      setIsLoading(false);
      return;
    }

    // Update resumeData with the latest hobbies
    const updatedResumeData = { ...resumeData, hobbies };

    // Determine the API URL and method based on whether it's an edit or create operation
    const url = isEdit
      ? `${import.meta.env.VITE_BASEURL}/resume/${resumeData._id}`
      : `${import.meta.env.VITE_BASEURL}/resume/`;
    const method = isEdit ? "put" : "post";

    try {
      const config = {
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: updatedResumeData,
      };

      const response = await axios.request(config);
      console.log("Resume saved:", response.data);
      setSuccess(true); // Show success message
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error saving resume:", error);
      setError("An error occurred while saving the resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-7">
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
              onClick={handleSubmit}
              disabled={isLoading}
              className={`px-4 py-2 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              } rounded-md shadow mt-2`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <p className="text-gray-600 mb-7">Provide your hobbies</p>

        {/* Display error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {/* Display success message */}
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-600 rounded-md">
            Resume saved successfully!
          </div>
        )}

        <form className="space-y-4">
          <div className="overflow-y-auto max-h-[60vh]">
            {hobbies.map((hobby, index) => (
              <div key={index} className="space-y-4 mb-7">
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
                    disabled={hobbies.length === 1}
                    className={`mt-2 px-4 py-2 ${
                      hobbies.length === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 text-white hover:bg-red-700"
                    } rounded-md shadow`}
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
        </form>
      </div>
    </div>
  );
};

export default HobbiesDetailsForm;