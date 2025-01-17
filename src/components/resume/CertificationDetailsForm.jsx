import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const CertificationDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize certifications state with resumeData.certifications
  const [certifications, setCertifications] = useState([
    { name: "", organization: "", issueDate: "", expirationDate: "" },
  ]);

  useEffect(() => {
    // If resumeData.certifications exists and is not empty, use it to initialize certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      setCertifications(resumeData.certifications);
    }
  }, [resumeData.certifications]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newCertifications = [...certifications];
    newCertifications[index][name] = value;

    // Update local state
    setCertifications(newCertifications);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      certifications: newCertifications, // Update certifications in real-time
    });
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { name: "", organization: "", issueDate: "", expirationDate: "" },
    ]);
  };

  const handleRemoveCertification = (index) => {
    // Create a copy of the current certifications array
    const newCertifications = [...certifications];
  
    // Remove the certification at the specified index
    newCertifications.splice(index, 1);
  
    // Update the local state
    setCertifications(newCertifications);
  
    // Update the global resumeData state
    setResumeData({
      ...resumeData,
      certifications: newCertifications, // Update certifications in real-time
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      certifications: certifications, // Save certifications under the "certifications" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Certifications</h2>
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
        <p className="text-gray-600 mb-6">Provide your certification details</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {certifications.map((certification, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Certification Name
                    </label>
                    <input
                      type="text"
                      placeholder="Certification Name"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="name"
                      value={certification.name}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Issuing Organization"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="organization"
                      value={certification.organization}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Issue Date
                    </label>
                    <input
                      type="date"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="issueDate"
                      value={certification.issueDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiration Date (optional)
                    </label>
                    <input
                      type="date"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="expirationDate"
                      value={certification.expirationDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCertification(index)}
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
            onClick={handleAddCertification}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Certification
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

export default CertificationDetailsForm;