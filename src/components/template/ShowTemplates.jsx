import React from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS
import HashLoader from 'react-spinners/HashLoader'; // Import HashLoader

function ShowTemplates() {
    const ResumeTemplates = [
        { id: "64d5f9f6b3e2a9a1d8e4f9a8", name: "Template 1", image: "https://s3.resume.io/cdn-cgi/image/width=380,dpr=1,format=auto/uploads/local_template_image/image/383/persistent-resource/santiago-resume-templates.jpg?v=1656070649" },
        { id: 2, name: "Template 2", image: "https://s3.resume.io/cdn-cgi/image/width=380,dpr=1,format=auto/uploads/local_template_image/image/372/persistent-resource/stockholm-resume-templates.jpg?v=1656506913" }
    ];

    const handleTemplateClick = (templateName) => {
        toast.success(`Selected ${templateName}`, {
            position: "bottom-right",
            autoClose: 3000,
        }); // Success toast
    };

    return (
        <div className='mx-[10vw] my-[17vh] min-h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
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

            {ResumeTemplates.map((template) => (
                <Link
                    to={`/create-resume/${template.id}`}
                    key={template.id}
                    onClick={() => handleTemplateClick(template.name)} // Trigger toast on click
                    style={{ 
                        backgroundImage: `url(${template.image})`,
                        backgroundSize: 'contain', // Ensures the image covers the card
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat' // Centers the image
                    }}
                    className='w-full h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl text-white font-bold shadow-lg hover:shadow-purple-300 hover:shadow-xl cursor-pointer transition-shadow duration-300 relative'
                >
                    {/* Overlay for better text visibility */}
                    <div className='absolute inset-0 bg-black bg-opacity-30 rounded-lg'></div>
                    <div className='relative z-10'>
                        {template.name}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShowTemplates;