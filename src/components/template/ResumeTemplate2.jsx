import React, { useContext, useRef } from "react";
import ResumeContext from "../context/ResumeContext";
import html2pdf from "html2pdf.js";

const ResumeTemplate2 = () => {
  const { resumeData } = useContext(ResumeContext);
  const resumeRef = useRef(null);

  const handleGeneratePdf = () => {
    const element = resumeRef.current;
    const opt = {
      filename: `${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 }, // Use 'jpeg' for better image quality
      html2canvas: { scale: 2, useCORS: true }, // Enable CORS for external images
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      {/* PDF Generation Button */}
      <button
        onClick={handleGeneratePdf}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600"
      >
        Generate PDF
      </button>

      {/* Resume Content */}
      <div
        ref={resumeRef}
        className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          <p className="text-xl text-gray-600">{resumeData.designation}</p>
          <div className="mt-4 text-gray-700">
            <p>
              {resumeData.email} | {resumeData.phone}
            </p>
            <p>
              <a
                href={resumeData.socialMediaLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn
              </a>{" "}
              |{" "}
              <a
                href={resumeData.socialMediaLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Left Sidebar */}
          <aside className="w-1/3 pr-8 border-r border-gray-200">
            {/* Professional Summary */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                SALES EXECUTIVE SUMMARY
              </h2>
              <p className="text-gray-700">{resumeData.professionalSummary}</p>
            </section>

            {/* Skills */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">SKILLS</h2>
              <ul className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {/* Interests (Optional) */}
            {resumeData.hobbies && (
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  INTERESTS
                </h2>
                <ul className="space-y-2">
                  {resumeData.hobbies.map((interest, index) => (
                    <li key={index} className="text-gray-700">
                      {interest}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>

          {/* Right Main Content */}
          <main className="w-2/3 pl-8">
            {/* Education */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                EDUCATION
              </h2>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <p className="text-gray-700">
                    <strong>{edu.degree}</strong>, {edu.institution}
                  </p>
                  <p className="text-gray-500 text-sm">{edu.year}</p>
                </div>
              ))}
            </section>

            {/* Professional Experience */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                PROFESSIONAL EXPERIENCE
              </h2>
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <p className="text-gray-700">
                    <strong>{exp.jobTitle}</strong>, {exp.company}
                  </p>
                  <p className="text-gray-600">{exp.description}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;