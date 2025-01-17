import React, { useState } from "react";
import ResumeTemplate1 from "../template/ResumeTemplate1";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ResumeProvider from "../context/ResumeProvider";
import ProfessionalSummaryForm from "./ProfessioalSummaryForm.jsx";
import EducationalDetailsForm from "./EducationalDetailsForm.jsx";
import ExperienceDetailsForm from "./ExperienceDetailsForm.jsx";
import ProjectsDetailsForm from "./ProjectDetailsForm.jsx";
import CertificationDetailsForm from "./CertificationDetailsForm.jsx";
import HobbiesDetailsForm from "./HobbiesDetailsForm";
import SkillsDetailsForm from "./SkillsDetailsForm.jsx";
export default function CreateResume() {
  const [page, setPage] = useState(0);
  return (
    <ResumeProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 h-[85vh] gap-10 p-10 my-5 items-center">
        <div className="h-[85vh]">
          {page == 0 && <PersonalDetailsForm page={page} setPage={setPage} />}
          {page == 1 && (
            <ProfessionalSummaryForm page={page} setPage={setPage} />
          )}
          {page == 2 && (
            <SkillsDetailsForm page={page} setPage={setPage} />
          )}

          {page == 3 && (
            <EducationalDetailsForm page={page} setPage={setPage} />
          )}
          {page == 4 && <ExperienceDetailsForm page={page} setPage={setPage} />}
          {page == 5 && <ProjectsDetailsForm page={page} setPage={setPage} />}
          {page == 6 && (
            <CertificationDetailsForm page={page} setPage={setPage} />
          )}
          {page == 7 && <HobbiesDetailsForm page={page} setPage={setPage} />}
          {/* {page==7 && <ProfessionalSummaryForm page={page} setPage={setPage}/>} */}
        </div>
        <div className="border border-t-primary border-t-4 h-full rounded-xl px-4 bg-gray-100 shadow-xl overflow-y-auto max-h-[85vh] mt-5">
          <h2 className="text-xl font-bold mb-4">Resume Preview</h2>
          <ResumeTemplate1 />
        </div>
      </div>
    </ResumeProvider>
  );
}
