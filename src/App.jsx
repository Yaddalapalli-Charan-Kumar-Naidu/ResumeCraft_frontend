import { useState } from 'react'
import Navbar from './components/Navbar'
import Login from "./components/auth/Login"
import Home from './components/Home'
function App() {
  

  return (
    <>
      <Navbar/>
      {/* <Login/>
       */}
       <Home/>
    </>
  )
}

export default App
