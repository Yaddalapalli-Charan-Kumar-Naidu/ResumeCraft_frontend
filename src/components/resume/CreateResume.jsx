import React from 'react'
import ResumeTemplate1 from '../template/ResumeTemplate1'
import PersonalDetailsForm from './PersonalDetailsForm'
import ResumeProvider from '../context/ResumeProvider'
export default function CreateResume() {
  return (
    <ResumeProvider>
    <div className='grid grid-cols-1 md:grid-cols-2 h-[85vh] gap-10 p-10 mb-5'>
      <div className='h-[85vh]'>
        <PersonalDetailsForm/>
      </div>
      <div className='border border-accent h-full rounded-xl px-4 py-2 bg-gray-100 shadow-xl'>
        resume preview
        <ResumeTemplate1/>
      </div>
    </div>
    </ResumeProvider>
  )
}
