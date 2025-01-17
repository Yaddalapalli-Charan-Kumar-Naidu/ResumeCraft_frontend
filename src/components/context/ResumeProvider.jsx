import React, { useState } from "react";
import ResumeContext from "./ResumeContext";
import data from "./Data.jsx"; 

function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(data); 

  return (
    <ResumeContext.Provider value={{ resumeData ,setResumeData}}>
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeProvider;
