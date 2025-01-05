import React, { useContext, useState } from "react";
import ResumeContext from "../context/ResumeContext";

const ResumeTemplate1 = () => {
  const { resumeData } = useContext(ResumeContext); // Destructure data directly from context


  return (
    <div className="resume-container" style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.name}>{resumeData.firstName} {resumeData.lastName}</h1>
        <p style={styles.contactInfo}>
          Your Location | {resumeData.email} | {resumeData.phone} | {resumeData.socialMediaLinks.portfolio}
        </p>
        <p style={styles.links}>
          {resumeData.socialMediaLinks.linkedIn} | {resumeData.socialMediaLinks.github}
        </p>
      </div>

      {/* Welcome Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Professional summary</h2>
        <p>
          {resumeData.professionalSummary}
        </p>
      </div>

      {/* Education Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Education</h2>
        {resumeData.education.map((edu, index) => (
          <p key={index}>
            <strong>{edu.institution}</strong>, {edu.degree}
            <span style={styles.dates}>{edu.year}</span>
          </p>
        ))}
      </div>

      {/* Experience Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Experience</h2>
        {resumeData.experience.map((exp, index) => (
          <div key={index}>
            <p>
              <strong>{exp.jobTitle}, {exp.company}</strong> – {exp.location || "Location not specified"}
              <span style={styles.dates}>{exp.duration}</span>
            </p>
            <ul className="list-disc">
              <li>{exp.description}</li>
            </ul>
          </div>
        ))}
      </div>

      {/* Publications Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Publications</h2>
        {resumeData.publications && resumeData.publications.length > 0 ? (
          resumeData.publications.map((pub, index) => (
            <p key={index}>
              <strong>{pub.title}</strong>
              <br />
              {pub.authors}
              <br />
              {pub.doi}
            </p>
          ))
        ) : (
          <p>No publications listed.</p>
        )}
      </div>

      {/* Projects Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Projects</h2>
        {resumeData.projects.map((project, index) => (
          <div key={index}>
            <p>
              <strong>{project.title}</strong>
              <span style={styles.link}>{project.link}</span>
            </p>
            <p>{project.description}</p>
            <p>Tools Used: {project.technologies.join(", ")}</p>
          </div>
        ))}
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
  dates: {
    float: "right",
    fontStyle: "italic",
  },
  link: {
    float: "right",
    color: "blue",
  },
};

export default ResumeTemplate1;
