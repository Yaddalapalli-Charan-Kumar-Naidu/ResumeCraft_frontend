import React, { createContext, useState } from 'react';
import data from './Data.jsx'; // Import the default data object
// Create the context
const ResumeContext = createContext();

// Create the provider component
export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(data); // Default empty object

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
export default ResumeContext;