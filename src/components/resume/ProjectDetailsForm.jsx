import React, { useContext, useState, useEffect } from "react";
import ResumeContext from "../context/ResumeContext";

const ProjectsDetailsForm = ({ page, setPage }) => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Initialize projects state with resumeData.projects
  const [projects, setProjects] = useState([
    { title: "", description: "", technologies: [], link: "" },
  ]);

  useEffect(() => {
    // If resumeData.projects exists and is not empty, use it to initialize projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      setProjects(resumeData.projects);
    }
  }, [resumeData.projects]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newProjects = [...projects];
    newProjects[index][name] = value;

    // Update local state
    setProjects(newProjects);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      projects: newProjects, // Update projects in real-time
    });
  };

  const handleTechnologiesChange = (e, index) => {
    const { value } = e.target;
    const newProjects = [...projects];
    newProjects[index].technologies = value.split(",").map((tech) => tech.trim());

    // Update local state
    setProjects(newProjects);

    // Update global resumeData state
    setResumeData({
      ...resumeData,
      projects: newProjects, // Update projects in real-time
    });
  };

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", technologies: [], link: "" },
    ]);
  };

  const handleRemoveProject = (index) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResumeData({
      ...resumeData,
      projects: projects, // Save projects under the "projects" key
    });
    setPage((page) => page + 1);
  };

  return (
    <div className="flex justify-center items-center h-full w-full mt-8">
      <div className="w-screen max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Project Details</h2>
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
        <p className="text-gray-600 mb-6">Provide your project details</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="overflow-y-auto max-h-[60vh]">
            {projects.map((project, index) => (
              <div key={index} className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Project Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project Title"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="title"
                      value={project.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Technologies (comma-separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      name="technologies"
                      value={project.technologies.join(", ")}
                      onChange={(e) => handleTechnologiesChange(e, index)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the project"
                    className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="description"
                    value={project.description}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Project Link (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Project Link"
                    className="my-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    name="link"
                    value={project.link}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(index)}
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
            onClick={handleAddProject}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
          >
            Add Another Project
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

export default ProjectsDetailsForm;