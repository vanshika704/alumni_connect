import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// --- Page Imports ---
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AlumniProfile from './pages/student/AlumniProfile';
import StudentDashboard from './pages/student/StudentDashboard'; // Ensure this file exists

// --- 1. Landing Page Wrapper ---
const LandingWrapper = () => {
  const navigate = useNavigate();

  const handleNavigateToAuth = (role, mode) => {
    // FIX: Changed path from '/' to '/auth' so it actually goes to the login page
    navigate('/auth', { state: { role, mode } });
  };

  return <LandingPage onNavigate={handleNavigateToAuth} />;
};

// --- 2. Login Page Wrapper ---
const LoginWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Default to student/login if no state is present (e.g., direct URL access)
  const { role, mode } = location.state || { role: 'student', mode: 'login' };

  return (
    <LoginPage 
      initialRole={role} 
      initialMode={mode} 
      onBack={() => navigate('/')} // Handle the "Home" button
      // onLoginSuccess is handled internally by LoginPage using useNavigate
    />
  );
};

// --- 3. Student Dashboard Wrapper ---
const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleViewProfile = (alumniId) => {
    navigate(`/profile/${alumniId}`);
  };

  return (
    <StudentDashboard 
      onLogout={handleLogout} 
      onViewProfile={handleViewProfile} 
    />
  );
};

// --- 4. Profile Wrapper ---
const ProfileWrapper = () => {
  const navigate = useNavigate();
  // In a real app, you would extract the ID here: const { id } = useParams(); 

  return (
    <AlumniProfile 
      onBack={() => navigate('/student-dashboard')} 
    />
  );
};

// --- Main App Component ---
export default function App() {
  return (

      <div className="min-h-screen bg-white font-sans">
        <Routes>
          {/* Route: Landing Page */}
          <Route path="/" element={<LandingWrapper />} />

          {/* Route: Authentication (Login/Register) */}
          <Route path="/auth" element={<LoginWrapper />} />

          {/* Route: Student Dashboard */}
          <Route path="/student-dashboard" element={<DashboardWrapper />} />

          {/* Route: Alumni Dashboard (Placeholder) */}
          <Route path="/alumni-dashboard" element={<div className="p-10 text-center">Alumni Dashboard Coming Soon</div>} />

          {/* Route: Alumni Profile */}
          <Route path="/profile/:id" element={<ProfileWrapper />} />
        </Routes>
      </div>
  
  );
}