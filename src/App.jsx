import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import PageNotFound from './components/Error/PageNotFound';
import { UserProvider } from './components/context/UserContext';
import { ResumeProvider } from './components/context/ResumeContext';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './components/auth/ForgotPassword';
// Lazy load components for better performance
const Login = lazy(() => import('./components/auth/Login'));
const Signup = lazy(() => import('./components/auth/Signup'));
const VerifyOtp = lazy(() => import('./components/auth/VerifyOtp'));
const Profile = lazy(() => import('./components/user/Profile'));
const Dashboard = lazy(() => import('./components/user/Dashboard'));
const ShowTemplates = lazy(() => import('./components/template/ShowTemplates'));
const CreateResume = lazy(() => import('./components/resume/CreateResume'));

function App() {
  return (
    <Router>
      <UserProvider>
        <ResumeProvider>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/verify-otp' element={<VerifyOtp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Private routes */}
              <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path='/templates' element={<ProtectedRoute><ShowTemplates /></ProtectedRoute>} />
              <Route path='/create-resume/:templateId' element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
              <Route path='/resume/:templateId' element={<ProtectedRoute><CreateResume /></ProtectedRoute>} />
              {/* 404 page */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </ResumeProvider>
      </UserProvider>
    </Router>
  );
}

export default App;