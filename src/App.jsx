import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from "./components/auth/Login"
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateResume from './components/resume/CreateResume';
import Signup from './components/auth/Signup';
import VerifyOtp from './components/auth/VerifyOtp';
import Profile from './components/user/Profile';
import { UserProvider } from './components/context/UserContext';
import Dashboard from './components/user/Dashboard';
import ShowTemplates from './components/template/ShowTemplates';
import PageNotFound from './components/Error/PageNotFound';
import { ResumeProvider } from './components/context/ResumeContext';
function App() {
  

  return (
    <>
    <Router>
    <UserProvider>
      <ResumeProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/templates' element={<ShowTemplates/>}/>
        <Route path='/create-resume/:templateId' element={<CreateResume/>}/>
        <Route path='/resume/:templateId' element={<CreateResume/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      </ResumeProvider>
      </UserProvider>
      </Router>
    </>
  )
}

export default App
