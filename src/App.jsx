import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from "./components/auth/Login"
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateResume from './components/resume/CreateResume';
function App() {
  

  return (
    <>
    <Router>
  
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-resume' element={<CreateResume/>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
