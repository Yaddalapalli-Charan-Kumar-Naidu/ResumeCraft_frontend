import React, { useContext, useState,useEffect } from "react";
import ResumeTemplate1 from "../template/ResumeTemplate1";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ProfessionalSummaryForm from "./ProfessioalSummaryForm.jsx";
import EducationalDetailsForm from "./EducationalDetailsForm.jsx";
import ExperienceDetailsForm from "./ExperienceDetailsForm.jsx";
import ProjectsDetailsForm from "./ProjectDetailsForm.jsx";
import CertificationDetailsForm from "./CertificationDetailsForm.jsx";
import HobbiesDetailsForm from "./HobbiesDetailsForm";
import SkillsDetailsForm from "./SkillsDetailsForm.jsx";
import { useLocation, useParams } from "react-router-dom";
import ResumeTemplate2 from "../template/ResumeTemplate2.jsx";
import ResumeContext from "../context/ResumeContext.jsx";

export default function CreateResume() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false); // Declare loading state
  const [error, setError] = useState(null); // Declare error state
  const { templateId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  // const { resumeData, setResumeData } = useContext(ResumeContext);

  const { state } = useLocation(); // Access route state
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // Pre-fill form data if resumeData is passed via route state
  useEffect(() => {
    if (state?.resumeData) {
      setResumeData(state.resumeData);
      setIsEdit(true);
    }
  }, [state, setResumeData]);

  // Define the form components in an array for easier rendering
  const formComponents = [
    <PersonalDetailsForm key={0} page={page} setPage={setPage} />,
    <ProfessionalSummaryForm key={1} page={page} setPage={setPage} />,
    <SkillsDetailsForm key={2} page={page} setPage={setPage} />,
    <EducationalDetailsForm key={3} page={page} setPage={setPage} />,
    <ExperienceDetailsForm key={4} page={page} setPage={setPage} />,
    templateId != 2 && (
      <ProjectsDetailsForm key={5} page={page} setPage={setPage} />
    ),
    templateId != 2 && (
      <CertificationDetailsForm key={6} page={page} setPage={setPage} />
    ),
    <HobbiesDetailsForm key={7} page={page} setPage={setPage} isEdit={isEdit} />,
  ].filter(Boolean); // Remove falsy values (e.g., `false` from conditional rendering)

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 h-[85vh] gap-10 p-10 my-5 items-center">
        {/* Form Section */}
        <div className="h-[85vh] overflow-y-auto">
          {formComponents[page]} {/* Render the current form */}
        </div>

        {/* Resume Preview Section */}
        <div className="border border-t-primary border-t-4 h-full rounded-xl px-4 bg-gray-100 shadow-xl overflow-y-auto max-h-[85vh] mt-5">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          {templateId === "64d5f9f6b3e2a9a1d8e4f9a8" && <ResumeTemplate1 />}
          {templateId == 2 && <ResumeTemplate2 />}
        </div>
      </div>
  );
}