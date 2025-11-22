import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

// --- Layout Imports ---


// --- Page Imports ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import AlumniProfile from './pages/student/AlumniProfile';

// Admin Pages
import UniversityAdminDashboard from './pages/admin/UniversityAdminDashboard';

// Alumni Pages
import AlumniDashboard from './pages/alumni/AlumniDashboard';
import WorkshopManager from './pages/alumni/WorkshopManager';
import WorkshopCreator from './pages/alumni/WorkshopCreator';
import StudentExplorer from './pages/alumni/StudentExplorer';
import StudentRequests from './pages/alumni/studentRequests';
import AlumniSettings from './pages/alumni/AlumniSettings';
import Layout from './pages/alumni/Layout';
import AlumniLayout from './pages/alumni/Layout';
import AdminDashboard from './pages/admin/DashBoard';
import { AuthProvider } from './context/AuthContext';

// --- 1. Landing Page Wrapper ---
const LandingWrapper = () => {
  const navigate = useNavigate();
  const handleNavigateToAuth = (role, mode) => {
    navigate('/auth', { state: { role, mode } });
  };
  return <LandingPage onNavigate={handleNavigateToAuth} />;
};

// --- 2. Login Page Wrapper ---
const LoginWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, mode } = location.state || { role: 'student', mode: 'login' };

  // This function simulates the logic after successful login
  const handleLoginSuccess = (userRole) => {
    if (userRole === 'alumni') navigate('/alumni'); // Goes to Alumni Dashboard (inside Sidebar)
    else if (userRole === 'admin') navigate('/university');
    else navigate('/student-dashboard');
  };

  return (
    <LoginPage 
      initialRole={role} 
      initialMode={mode} 
      onBack={() => navigate('/')}
      onLoginSuccess={handleLoginSuccess} // Pass the navigation logic down
    />
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <AuthProvider>
      <Routes>
        
        {/* --- Public Routes --- */}
        <Route path="/" element={<LandingWrapper />} />
        <Route path="/auth" element={<LoginWrapper />} />

        {/* --- Student Routes (Standalone) --- */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/profile/:id" element={<AlumniProfile />} />

        {/* --- Admin Routes (Standalone) --- */}
        <Route path="/university" element={<UniversityAdminDashboard />} />
 <Route path="/admin" element={<AdminDashboard/>} />
        {/* --- ALUMNI ROUTES (Protected & Nested in Sidebar) --- */}
        {/* All routes inside here will have the Sidebar! */}
        <Route path="/alumni" element={<AlumniLayout/>}>
          
          {/* Default: /alumni -> Dashboard */}
          <Route index element={<AlumniDashboard />} />
          
          {/* /alumni/students -> Explorer */}
          <Route path="students" element={<StudentExplorer />} />
          
          {/* /alumni/requests -> Requests */}
          <Route path="requests" element={<StudentRequests />} />
          
          {/* /alumni/workshops -> Manager */}
          <Route path="workshops" element={<WorkshopManager />} />
          
          {/* /alumni/create-workshop -> Creator */}
          <Route path="create-workshop" element={<WorkshopCreator />} />
          
          {/* /alumni/settings -> Settings */}
          <Route path="settings" element={<AlumniSettings />} />
          
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      </AuthProvider>
    </div>
  );
}