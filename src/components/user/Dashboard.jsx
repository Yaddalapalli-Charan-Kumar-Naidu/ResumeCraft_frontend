import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <div className='mx-[10vw] my-5 min-h-[90vh] my-[17vh] grid grid-cols-1 md:grid-cols-4 '>
      <Link to='/create-resume' className='w-[15vw] h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-400 hover:shadow-lg cursor-pointer'>
        +
      </Link>
      <div className='w-[15vw] h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-300 hover:shadow-lg cursor-pointer'>
        resumes
      </div>
      <div className='w-[15vw] h-[40vh] border border-purple-600 rounded-lg flex justify-center items-center text-4xl shadow-lg hover:shadow-purple-300 hover:shadow-lg cursor-pointer'>
        resumes
      </div>
    </div>
  )
}

export default Dashboard
