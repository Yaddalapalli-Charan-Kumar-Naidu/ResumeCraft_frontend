import React,{useState} from 'react'
import ResumeTemplate1 from '../template/ResumeTemplate1'
import PersonalDetailsForm from './PersonalDetailsForm'
import ResumeProvider from '../context/ResumeProvider'
import ProfessionalSummaryForm from "./ProfessioalSummaryForm.jsx"
import EducationalDetailsForm from './EducationalDetailsForm.jsx'
import ExperienceDetailsForm from './ExperienceDetailsForm.jsx'
import ProjectsDetailsForm from './ProjectDetailsForm.jsx'
export default function CreateResume() {
  const [page,setPage]=useState(0);
  return (
    <ResumeProvider>
    <div className='grid grid-cols-1 md:grid-cols-2 h-[85vh] gap-10 p-10 mb-5'>
      <div className='h-[85vh]'>
        {page==0 && <PersonalDetailsForm page={page} setPage={setPage}/>}
        {page==1 && <ProfessionalSummaryForm page={page} setPage={setPage}/>}
        {page==2 && <EducationalDetailsForm page={page} setPage={setPage}/>}
        {page==3 && <ExperienceDetailsForm page={page} setPage={setPage}/>}
        {page==4 && <ProjectsDetailsForm page={page} setPage={setPage}/>}
        {page==5 && <ProfessionalSummaryForm page={page} setPage={setPage}/>}
        {page==6 && <ProfessionalSummaryForm page={page} setPage={setPage}/>}
        {page==7 && <ProfessionalSummaryForm page={page} setPage={setPage}/>}

      </div>
      <div className='border border-accent h-full rounded-xl px-4 bg-gray-100 shadow-xl overflow-y-auto max-h-[80vh]'>
        resume preview
        <ResumeTemplate1/>
      </div>
    </div>
    </ResumeProvider>
  )
}
