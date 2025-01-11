import React, { useContext } from "react";
import ResumeContext from "../context/ResumeContext";

const ResumeTemplate1 = () => {
  const { resumeData } = useContext(ResumeContext);

  return (
    <div className="resume-container mb-2 text-sm" style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.name}>
          {resumeData.firstName} {resumeData.lastName}
        </h1>
        <p style={styles.title}>{resumeData.designation}</p>
        <p style={styles.contactInfo}>
          {resumeData.email} | {resumeData.phone}
        </p>
        <p style={styles.links}>
          <a href={resumeData.socialMediaLinks.linkedIn} target="_blank">
            {resumeData.socialMediaLinks.linkedIn}{" "}
          </a>
          |{" "}
          <a href={resumeData.socialMediaLinks.github} target="_blank">
            {resumeData.socialMediaLinks.github}
          </a>
        </p>
      </div>

      {/* Professional Summary Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Professional Summary</h2>
        <p>{resumeData.professionalSummary}</p>
      </div>

      {/* Skills Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Skills</h2>
        <ul className="list-disc list-inside">
          {resumeData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Education Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        {resumeData.education.map((edu, index) => (
          <div key={index} style={styles.educationItem}>
            <div>
              <p>
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
              <p>
                <strong>{exp.jobTitle}</strong>, {exp.company}
              </p>
              <p>{exp.description}</p>
            </div>
            <p style={styles.dates}>{exp.duration}</p>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <p>
              <strong>{project.title}</strong>
              {project.link && (
                <span style={styles.link}>
                  {" "}
                  |{" "}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </span>
              )}
            </p>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(", ")}</p>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Certifications</h2>
        {resumeData.certifications.map((cert, index) => (
          <div key={index} style={styles.certificationItem}>
            <div>
              <p>
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
        <ul className="list-disc list-inside">
          {resumeData.hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
    margin: "0 auto",
    maxWidth: "800px",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  name: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#555",
  },
  contactInfo: {
    fontSize: "14px",
    margin: "5px 0",
  },
  links: {
    fontSize: "14px",
    margin: "5px 0",
    color: "blue",
  },
  section: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
  },
  educationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  experienceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  certificationItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  dates: {
    fontStyle: "italic",
    color: "#555",
    textAlign: "right",
    minWidth: "120px", // Ensure consistent width for alignment
  },
  link: {
    color: "blue",
  },
};

export default ResumeTemplate1;