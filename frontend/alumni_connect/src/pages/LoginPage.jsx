import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import {
  LogIn, User, Mail, Lock, BookOpen, GraduationCap, Building2, Briefcase, PlusCircle, Trash2, Globe, TrendingUp, ArrowLeft
} from 'lucide-react';
import JourneyGraphModule from '../components/JourneyGraphModule';
// Use a placeholder if image is missing, or ensure path is correct relative to this file
import image1 from '../assets/52_MjExMC53MDEyLm4wMDEuMTHQoS5wNi4xMQ.jpg'; 

// --- Data Definitions ---
const domains = ["Software Dev", "Data Science", "Marketing", "Consulting", "Finance", "Product Management"];
const skillsOptions = ["React", "Python", "SQL", "Leadership", "Communication", "Financial Modeling", "CAD", "Machine Learning"];
const careerGoals = ["IT/Tech", "Finance/Banking", "UPSC/Civil Services", "MBA", "Startup/Entrepreneurship", "Higher Studies", "Research"];

const departments = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Management"];

// Utility component for multi-select chips
const ChipSelect = ({ label, options, selected, onSelect }) => (
 <div>
   <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
   <div className="flex flex-wrap gap-2">
     {options.map((option) => (
       <span
         key={option}
         onClick={() => onSelect(option)}
         className={`
           px-3 py-1 text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 shadow-sm border
           ${selected.includes(option)
             ? 'bg-neutral-600 text-white border-neutral-600 hover:bg-neutral-700'
             : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50'
           }
         `}
       >
         {option}
       </span>
     ))}
   </div>
 </div>
);

// --- Login View Component ---
const LoginCard = ({ setView, onLoginSuccess, initialRole }) => {
    // Default select value based on role passed from Landing
    const [loginAs, setLoginAs] = useState(
        initialRole === 'institute' ? 'Admin' : 
        (initialRole === 'alumni' ? 'Alumni' : 'Student')
    );
    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm w-full transition duration-150";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login API delay
        setTimeout(() => {
            // Pass the specific role to the success handler for routing
            onLoginSuccess(loginAs);
        }, 500);
    };

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <LogIn className="w-6 h-6 mr-3 text-neutral-600" /> Sign In
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email / Institute ID</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="email" className={`block w-full pl-10 pr-3 py-2.5 ${inputStyle}`} placeholder="you@institute.edu or ID" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="password" id="password" className={`block w-full pl-10 pr-3 py-2.5 ${inputStyle}`} placeholder="••••••••" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="loginAs" className="block text-sm font-medium text-gray-700">Login as</label>
                    <div className="mt-1 relative">
                        <select
                            id="loginAs"
                            value={loginAs}
                            onChange={(e) => setLoginAs(e.target.value)}
                            className={`block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm rounded-lg shadow-sm appearance-none transition duration-150`}
                        >
                            <option value="Student">Student</option>
                            <option value="Alumni">Alumni</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-300 ease-in-out">
                    Login
                </button>
            </form>

            <div className="text-center pt-2 space-y-3 text-sm">
                <div className="flex justify-center space-x-4 border-t pt-4">
                    <button onClick={() => setView('student-register')} className="text-neutral-600 hover:text-neutral-700 font-bold transition duration-150 ease-in-out">
                        <User className="w-4 h-4 mr-1 inline-block" /> Student Register
                    </button>
                    <span className="text-gray-400">|</span>
                    <button onClick={() => setView('alumni-register')} className="text-neutral-600 hover:text-neutral-700 font-bold transition duration-150 ease-in-out">
                        <BookOpen className="w-4 h-4 mr-1 inline-block" /> Alumni Register
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Student Registration View Component ---
const StudentRegisterCard = ({ setView, onLoginSuccess }) => {
    const [studentForm, setStudentForm] = useState({
        interestedDomains: [],
        currentSkills: [],
        careerGoal: ''
    });

    const handleChipToggle = (field, chip) => {
        setStudentForm(prev => {
            const current = prev[field];
            if (current.includes(chip)) {
                return { ...prev, [field]: current.filter(c => c !== chip) };
            } else {
                if (current.length >= 5 && field !== 'currentSkills') return prev;
                return { ...prev, [field]: [...current, chip] };
            }
        });
    };

    const handleDropdownChange = (e) => {
        setStudentForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Explicitly pass 'Student' role
        onLoginSuccess('Student');
    };

    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 transition duration-150 sm:text-sm w-full";

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <GraduationCap className="w-6 h-6 mr-3 text-neutral-600" /> Student Registration
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Section A: Basic Details */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <User className="w-5 h-5 mr-2" /> Basic Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" className={inputStyle} required />
                        <input type="email" placeholder="Email (Institute Domain)" className={inputStyle} required />
                        <input type="password" placeholder="Password" className={inputStyle} required />
                        <input type="password" placeholder="Confirm Password" className={inputStyle} required />
                    </div>
                </div>

                {/* Section B: Academic Details */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <Building2 className="w-5 h-5 mr-2" /> Academic Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select className={inputStyle}>
                            <option value="">Department</option>
                            {departments.map(d => <option key={d}>{d}</option>)}
                        </select>
                        <input type="text" placeholder="Batch (e.g. 2022-2026)" className={inputStyle} required />
                        <select className={inputStyle}>
                            <option value="">Current Year</option>
                            <option>1st Year</option>
                            <option>2nd Year</option>
                            <option>3rd Year</option>
                            <option>4th Year</option>
                        </select>
                        <input type="text" placeholder="Roll/Enrollment Number" className={inputStyle} required />
                    </div>
                </div>

                {/* Section C: Career Preferences */}
                <div className="pb-4">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <TrendingUp className="w-5 h-5 mr-2" /> Career Preferences
                    </h3>
                    <div className="space-y-6">
                        <ChipSelect
                            label="Interested Domains (Select up to 3)"
                            options={domains}
                            selected={studentForm.interestedDomains}
                            onSelect={(chip) => handleChipToggle('interestedDomains', chip)}
                        />
                        <ChipSelect
                            label="Current Skills (Self-Assessed)"
                            options={skillsOptions}
                            selected={studentForm.currentSkills}
                            onSelect={(chip) => handleChipToggle('currentSkills', chip)}
                        />
                        <div>
                            <label htmlFor="careerGoal" className="block text-sm font-medium text-gray-700 mb-2">Primary Career Goal</label>
                            <select
                                id="careerGoal"
                                value={studentForm.careerGoal}
                                onChange={handleDropdownChange}
                                className={inputStyle} 
                            >
                                <option value="" disabled>Select a Primary Career Goal</option>
                                {careerGoals.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-300 ease-in-out">
                    Complete Registration
                </button>

                <button type="button" onClick={() => setView('login')} className="mt-4 w-full text-sm text-gray-600 hover:text-neutral-600 font-medium transition duration-150 ease-in-out">
                    &larr; Back to Sign In
                </button>
            </form>
        </div>
    );
};

// --- Alumni Registration View Component ---
const AlumniRegisterCard = ({ setView, setJourneyData, onLoginSuccess }) => {
    const [alumniForm, setAlumniForm] = useState({
        skills: [],
        milestones: [{ year: '', milestone: '', description: '', skillsGained: '', type: 'Job' }]
    });


    const handleMilestoneChange = (index, field, value) => {
        const newMilestones = alumniForm.milestones.map((m, i) =>
            i === index ? { ...m, [field]: value } : m
        );
        setAlumniForm(prev => ({ ...prev, milestones: newMilestones }));
    };

    const addMilestone = () => {
        setAlumniForm(prev => ({
            ...prev,
            milestones: [...prev.milestones, { year: '', milestone: '', description: '', skillsGained: '', type: 'Job' }]
        }));
    };

    const removeMilestone = (index) => {
        setAlumniForm(prev => ({
            ...prev,
            milestones: prev.milestones.filter((_, i) => i !== index)
        }));
    };

    const handleGraphGeneration = () => {
        const userMilestones = alumniForm.milestones.filter(m => m.milestone && m.year && m.description);
        setJourneyData(userMilestones.length > 0 ? userMilestones : null); 
        setView('journey-graph'); 
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        // Explicitly pass 'Alumni' role
        onLoginSuccess('Alumni');
    };

    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 transition duration-150 sm:text-sm w-full";

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <BookOpen className="w-6 h-6 mr-3 text-neutral-600" /> Alumni Registration
            </h2>
            <form className="space-y-6" onSubmit={handleFinalSubmit}>
                {/* Basic Info */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <User className="w-5 h-5 mr-2" /> Basic Info
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name" className={inputStyle} required />
                        <input type="email" placeholder="Email (Verification Required)" className={inputStyle} required />
                        <input type="password" placeholder="Password" className={inputStyle} required />
                        <input type="tel" placeholder="Phone" className={inputStyle} />
                    </div>
                </div>

                {/* Journey Input */}
                <div className="pb-4">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <Globe className="w-5 h-5 mr-2" /> Your Career Journey Milestones
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Help students by sharing year-wise milestones.</p>
                    <div className="space-y-4">
                        {alumniForm.milestones.map((milestone, index) => (
                            <div key={index} className="p-3 border border-neutral-300 rounded-lg bg-neutral-50 shadow-sm relative">
                                <h4 className="font-medium text-neutral-600 mb-3">Milestone {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input type="number" placeholder="Year" value={milestone.year} onChange={(e) => handleMilestoneChange(index, 'year', e.target.value)} className={inputStyle + " col-span-1"} required />
                                    <select value={milestone.type} onChange={(e) => handleMilestoneChange(index, 'type', e.target.value)} className={inputStyle + " col-span-1"}>
                                        <option value="Job">Job/Role</option>
                                        <option value="Higher Study">Higher Study</option>
                                        <option value="Project">Big Project</option>
                                    </select>
                                    <input type="text" placeholder="Milestone Title" value={milestone.milestone} onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)} className={inputStyle + " col-span-2"} required />
                                    <textarea placeholder="Description" value={milestone.description} onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)} className={inputStyle + " col-span-full h-16 resize-none"} required />
                                </div>
                                {alumniForm.milestones.length > 1 && (
                                    <button type="button" onClick={() => removeMilestone(index)} className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500 hover:text-red-700 transition">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addMilestone} className="flex items-center justify-center w-full py-2 border border-dashed border-neutral-400 text-neutral-600 rounded-lg hover:bg-neutral-100 transition duration-150">
                            <PlusCircle className="w-5 h-5 mr-2" /> Add Another Milestone
                        </button>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <button type="button" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-300" onClick={handleGraphGeneration}>
                        Preview Career Journey Graph
                    </button>
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 transition duration-300">
                        Create Alumni Account
                    </button>
                </div>

                <button type="button" onClick={() => setView('login')} className="mt-4 w-full text-sm text-gray-600 hover:text-neutral-600 font-medium transition duration-150 ease-in-out">
                    &larr; Back to Sign In
                </button>
            </form>
        </div>
    );
};

// --- Main Page Component ---
const LoginPage = ({ initialRole, initialMode, onLoginSuccess: propOnLoginSuccess, onBack }) => {
    const navigate = useNavigate(); // Initialize Hook

    // Determine initial view based on props from Landing Page
    const determineInitialView = () => {
        if (initialMode === 'register') {
            return initialRole === 'alumni' ? 'alumni-register' : 'student-register';
        }
        return 'login';
    };

    const [currentView, setCurrentView] = useState(determineInitialView());
    const [journeyData, setJourneyData] = useState(null); 

    // Handler that performs the navigation
    const handleNavigation = (role) => {
        // Optional: Call parent handler if it exists
        if (propOnLoginSuccess) {
            propOnLoginSuccess(role);
        }

        // Route based on role
        if (role === 'Alumni') {
            navigate('/alumni-dashboard');
        } else {
            // Default to student dashboard as requested
            navigate('/student-dashboard');
        }
    };

    const renderView = () => {
        switch (currentView) {
            case 'login':
                return <LoginCard setView={setCurrentView} onLoginSuccess={handleNavigation} initialRole={initialRole} />;
            case 'student-register':
                return <StudentRegisterCard setView={setCurrentView} onLoginSuccess={handleNavigation} />;
            case 'alumni-register':
                return <AlumniRegisterCard setView={setCurrentView} setJourneyData={setJourneyData} onLoginSuccess={handleNavigation} />;
            case 'journey-graph':
                return <JourneyGraphModule milestones={journeyData} setView={setCurrentView} />;
            default:
                return <LoginCard setView={setCurrentView} onLoginSuccess={handleNavigation} initialRole={initialRole} />;
        }
    };

    const isFullPage = currentView === 'journey-graph';

    return (
        <div className="min-h-screen bg-neutral-50 flex poppins-font-override" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');`}</style>
            
            {/* Back Button */}
            <button onClick={onBack} className="absolute top-6 left-6 flex items-center text-neutral-600 hover:text-neutral-900 z-50">
                <ArrowLeft className="w-5 h-5 mr-2" /> Home
            </button>

            <div className={`w-full max-w-7xl mx-auto ${isFullPage ? 'block' : 'grid grid-cols-1 lg:grid-cols-2'}`}>
                {/* Left Side: Illustration & Marketing (Hidden if full-page) */}
                {!isFullPage && (
                    <div className="hidden lg:flex flex-col justify-center items-center p-10 space-y-8 bg-neutral-50 lg:h-screen lg:sticky lg:top-0">
                        <h1 className="text-5xl font-extrabold text-neutral-800 text-center leading-tight">
                            Connect. <span className="text-neutral-600">Grow.</span> Succeed.
                        </h1>
                        <p className="text-neutral-600 text-lg text-center max-w-md">
                            {currentView === 'login' ? 'Login or Create Account below to get started.' : 
                            currentView.includes('student') ? 'Unlock your potential by filling out your student profile.' : 
                            'Guide the next generation by sharing your professional journey.'}
                        </p>
                        {/* Conditionally render image if imported */}
                        {image1 && <img src={image1} alt="Illustration" className="w-full max-w-lg h-auto rounded-xl shadow-2xl transition duration-500 hover:scale-[1.01]" />}
                    </div>
                )}

                {/* Right Side: Form/Graph View */}
                <div className={`flex justify-center items-start overflow-y-auto ${isFullPage ? 'col-span-full pt-12 pb-12' : 'pt-20 pb-16 lg:py-16'}`}>
                    <div className={isFullPage ? 'w-full max-w-screen px-4 lg:px-0' : 'w-full max-w-xl px-4 lg:px-0'}>
                        {renderView()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;