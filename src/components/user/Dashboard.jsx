import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import HashLoader from 'react-spinners/HashLoader'; // Import HashLoader

function Dashboard() {
  const [resumeData, setResumeData] = useState({ resumes: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // State for delete loader
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_BASEURL}/resume/`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const response = await axios.request(config);
        console.log(response.data);
        setResumeData(response.data || { resumes: [] });
      } catch (err) {
        setError(err.message || 'An error occurred while fetching resumes.');
        toast.error("Failed to fetch resumes. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
        }); // Error toast
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true); // Show loader
    try {
      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BASEURL}/resume/${id}`, // Use the correct resume ID
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios.request(config);

      // Remove the deleted resume from the state
      setResumeData((prev) => ({
        ...prev,
        resumes: prev.resumes.filter((resume) => resume._id !== id), // Use _id instead of id
      }));

      toast.success("Resume deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      }); // Success toast
    } catch (err) {
      console.error('Error deleting resume:', err.message);
      setError('An error occurred while deleting the resume. Please try again.');
      toast.error("Failed to delete resume. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
      }); // Error toast
    } finally {
      setIsDeleting(false); // Hide loader
    }
  };

  const handleUpdate = (resume) => {
    // Pass the resume data to the CreateResume component via route state
    navigate(`/resume/${resume.template}`, { state: { resumeData: resume } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <HashLoader color="#9333ea" size={60} /> {/* Purple color */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">Error: {error}</div>
    );
  }

  return (
    <div>
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
        style={{ display: 'none' }}
      />
      {/* Purple HashLoader for delete action */}
      {isDeleting && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <HashLoader color="#9333ea" size={60} /> {/* Purple color */}
        </div>
      )}

      <div className="mx-4 my-8 min-h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Add New Resume Card */}
        <Link
          to="/templates"
          className="w-full mt-[15vh] h-60 md:h-64 border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-400 hover:shadow-lg cursor-pointer"
        >
          +
        </Link>

        {/* Resume Cards */}
        {Array.isArray(resumeData.resumes) && resumeData.resumes.length > 0 ? (
          resumeData.resumes.map((resume) => (
            <div
              key={resume._id} // Use _id as the key
              className="w-full mt-[15vh] h-48 md:h-64 border border-purple-600 rounded-lg flex flex-col justify-between text-center text-xl md:text-2xl shadow-lg hover:shadow-purple-300 hover:shadow-lg cursor-pointer"
              style={{
                backgroundImage:
                  "url('https://s3.resume.io/cdn-cgi/image/width=380,dpr=1,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="p-2 bg-white bg-opacity-70">
                {resume.title || `Resume ${resume._id}`} {/* Use _id */}
              </div>
              <div className="flex justify-around bg-white bg-opacity-70 py-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleUpdate(resume)}
                  title="Update"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(resume._id)} // Use _id
                  title="Delete"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-full mt-10 text-gray-500">
            No resumes found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;