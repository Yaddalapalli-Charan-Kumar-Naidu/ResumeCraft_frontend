import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import HashLoader from "react-spinners/HashLoader"; // Import HashLoader

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

  // Create a new resume
  const createResume = async (resumeData) => {
    const url = `${import.meta.env.VITE_BASEURL}/resume/`;
    const config = {
      method: "post",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: resumeData,
    };

    const response = await axios.request(config);
    return response.data;
  };

  // Update an existing resume
  const updateResume = async (resumeData) => {
    const url = `${import.meta.env.VITE_BASEURL}/resume/${resumeData._id}`;
    const config = {
      method: "put",
      url: url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      data: resumeData,
    };

    const response = await axios.request(config);
    return response.data;
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
      toast.error("Please enter at least one hobby.", {
        position: "bottom-right",
        autoClose: 3000,
      });
      return;
    }

    // Update resumeData with the latest hobbies
    const updatedResumeData = { ...resumeData, hobbies };

    try {
      let response;
      if (isEdit) {
        response = await updateResume(updatedResumeData);
        console.log("updated");
      } else {
        response = await createResume(updatedResumeData);
        console.log("created");
      }

      console.log("Resume saved:", response);
      setSuccess(true); // Show success message
      setError(null); // Clear any previous errors
      toast.success("Resume saved successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setTimeout(()=>{toast.success("Download it by clicking generate pdf", {
        position: "bottom-right",
        autoClose: 3000,
      });},1000);
      
    } catch (error) {
      console.error("Error saving resume:", error);
      setError("An error occurred while saving the resume. Please try again.");
      toast.error("An error occurred while saving the resume. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      {/* ToastContainer must be included for toast messages to work */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Purple HashLoader */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <HashLoader color="#9333ea" size={60} /> {/* Purple color */}
        </div>
      )}

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
        {/* {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md">
            {error}
          </div>
        )} */}

        {/* Display success message */}
        {/* {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-600 rounded-md">
            Resume saved successfully!
          </div>
        )} */}

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