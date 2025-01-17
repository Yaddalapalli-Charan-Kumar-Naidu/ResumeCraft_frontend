import React, { useContext, useRef } from "react";
import ResumeContext from "../context/ResumeContext";
import html2pdf from "html2pdf.js";

const ResumeTemplate1 = () => {
  const { resumeData } = useContext(ResumeContext);
  const resumeRef = useRef(null);

  const handleGeneratePdf = () => {
    const element = resumeRef.current;
    const opt = {
      filename: `${resumeData.firstName}_${resumeData.lastName}_Resume.pdf`,
      image: { type: "text", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div>
      <button onClick={handleGeneratePdf} style={styles.generatePdfButton}>
        Generate PDF
      </button>
      <div ref={resumeRef} className="resume-container" style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.name}>
            {resumeData.firstName} {resumeData.lastName}
          </h1>
          <p style={styles.title}>{resumeData.designation}</p>
          <div style={styles.contactInfo}>
            <p>
              {resumeData.email} | {resumeData.phone}
            </p>
            <p>
              <a
                href={resumeData.socialMediaLinks.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                LinkedIn
              </a>{" "}
              |{" "}
              <a
                href={resumeData.socialMediaLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                GitHub
              </a>
            </p>
          </div>
        </div>

        {/* Professional Summary Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Professional Summary</h2>
          <p style={styles.summaryText}>{resumeData.professionalSummary}</p>
        </div>

        {/* Skills Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillsContainer}>
            {resumeData.skills.map((skill, index) => (
              <span key={index} style={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} style={styles.educationItem}>
              <div>
                <p style={styles.educationDegree}>
                  <strong>{edu.degree}</strong>, {edu.institution}
                </p>
                {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
              </div>
              <p style={styles.dates}>{edu.year}</p>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          {resumeData.experience.map((exp, index) => (
            <div key={index} style={styles.experienceItem}>
              <div>
                <p style={styles.experienceTitle}>
                  <strong>{exp.jobTitle}</strong>, {exp.company}
                </p>
                <p style={styles.experienceDescription}>{exp.description}</p>
              </div>
              <p style={styles.dates}>{exp.duration}</p>
            </div>
          ))}
        </div>

        {/* Projects Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} style={styles.projectItem}>
              <p style={styles.projectTitle}>
                <strong>{project.title}</strong>
                {project.link && (
                  <span style={styles.link}>
                    {" "}
                    |{" "}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={styles.link}
                    >
                      Link
                    </a>
                  </span>
                )}
              </p>
              <p style={styles.projectDescription}>{project.description}</p>
              <p style={styles.projectTechnologies}>
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Certifications</h2>
          {resumeData.certifications.map((cert, index) => (
            <div key={index} style={styles.certificationItem}>
              <div>
                <p style={styles.certificationName}>
                  <strong>{cert.name}</strong>, {cert.organization}
                </p>
              </div>
              <div style={styles.dates}>
                {new Date(cert.issueDate).toLocaleDateString()} -{" "}
                {cert.expirationDate
                  ? new Date(cert.expirationDate).toLocaleDateString()
                  : "Present"}
              </div>
            </div>
          ))}
        </div>

        {/* Hobbies Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Hobbies</h2>
          <div style={styles.hobbiesContainer}>
            {resumeData.hobbies.map((hobby, index) => (
              <span key={index} style={styles.hobby}>
                {hobby}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.6,
    // margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  header: {
    textAlign: "center",
    marginBottom: "10px",
    paddingBottom: "10px",
    borderBottom: "2px solid #e0e0e0",
  },
  name: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
    margin: "5px 0",
  },
  contactInfo: {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  },
  link: {
    color: "#3498db",
    textDecoration: "none",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "10px",
    paddingBottom: "5px",
    borderBottom: "1px solid #e0e0e0",
  },
  summaryText: {
    fontSize: "14px",
    color: "#555",
  },
  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  skill: {
    backgroundColor: "#f1f1f1",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
    color: "#555",
  },
  educationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  educationDegree: {
    fontSize: "14px",
    color: "#555",
  },
  experienceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  experienceTitle: {
    fontSize: "14px",
    color: "#555",
  },
  experienceDescription: {
    fontSize: "14px",
    color: "#777",
  },
  projectItem: {
    marginBottom: "10px",
  },
  projectTitle: {
    fontSize: "14px",
    color: "#555",
  },
  projectDescription: {
    fontSize: "14px",
    color: "#777",
  },
  projectTechnologies: {
    fontSize: "14px",
    color: "#777",
  },
  certificationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  certificationName: {
    fontSize: "14px",
    color: "#555",
  },
  dates: {
    fontSize: "14px",
    color: "#777",
    fontStyle: "italic",
  },
  hobbiesContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  hobby: {
    backgroundColor: "#f1f1f1",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
    color: "#555",
  },
  generatePdfButton: {
    margin: "20px",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default ResumeTemplate1;