import React, { useState } from "react";
import ResumeContext from "./ResumeContext";
import data from "./Data.jsx"; // Corrected import for default export

function ResumeProvider({ children }) {
  const [resumeData, setResumeData] = useState(data); // Renamed variable to avoid conflict with imported 'data'

  return (
    <ResumeContext.Provider value={{ data: resumeData ,setResumeData}}>
      {children}
    </ResumeContext.Provider>
  );
}

export default ResumeProvider;
