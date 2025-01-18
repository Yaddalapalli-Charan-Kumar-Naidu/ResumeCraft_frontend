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
function App() {
  

  return (
    <>
    <Router>
    <UserProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/create-resume' element={<CreateResume/>}/>
        <Route path='/verify-otp' element={<VerifyOtp/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
      </UserProvider>
      </Router>
    </>
  )
}

export default App
