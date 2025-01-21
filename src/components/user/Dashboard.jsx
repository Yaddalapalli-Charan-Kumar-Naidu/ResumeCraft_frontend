import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [resumeData, setResumeData] = useState({ resumes: [] }); // Initialize with an empty object
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: `${import.meta.env.VITE_BASEURL}/resume/`,
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        };
        const response = await axios.request(config);
        console.log(response.data);
        setResumeData(response.data || { resumes: [] }); // Fallback to an empty array
      } catch (err) {
        setError(err.message || 'An error occurred while fetching resumes.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mx-[10vw] my-[15vh] min-h-[90vh] grid grid-cols-1 md:grid-cols-4 gap-6">
      <Link 
        to="/templates" 
        className="w-[15vw] h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-400 hover:shadow-lg cursor-pointer"
      >
        +
      </Link>
      {Array.isArray(resumeData.resumes) && resumeData.resumes.length > 0 ? (
        resumeData.resumes.map((resume, index) => (
          <div 
            key={index} 
            className="w-[15vw] h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-300 hover:shadow-lg cursor-pointer text-center"
            style={{ backgroundImage: "url('https://s3.resume.io/cdn-cgi/image/width=380,dpr=1,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649')", backgroundSize: 'cover', backgroundPosition: 'center', zIndex:-1 }}
          >
            {resume.title || `Resume ${index + 1}`}
          </div>
        ))
      ) : (
        <div className="text-center col-span-4 mt-10 text-gray-500">
          No resumes found.
        </div>
      )}
    </div>
  );
}

export default Dashboard;
