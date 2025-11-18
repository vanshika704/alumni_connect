import React, { useState } from 'react';
import {
    LogIn, User, Mail, Lock, Zap, BookOpen, GraduationCap, Building2, Briefcase, PlusCircle, Trash2, Globe, TrendingUp, Calendar, MapPin
} from 'lucide-react';
// Import the external visualization module
import JourneyGraphModule from '../components/JourneyGraphModule'; 
// Assuming image1 is correctly aliased in your build process
import image1 from '../assets/52_MjExMC53MDEyLm4wMDEuMTHQoS5wNi4xMQ.jpg'; 

// --- Data Definitions ---
const domains = ["Software Dev", "Data Science", "Marketing", "Consulting", "Finance", "Product Management"];
const skillsOptions = ["React", "Python", "SQL", "Leadership", "Communication", "Financial Modeling", "CAD", "Machine Learning"];
const careerGoals = ["IT/Tech", "Finance/Banking", "UPSC/Civil Services", "MBA", "Startup/Entrepreneurship", "Higher Studies", "Research"];
const degrees = ["B.Tech", "M.Tech", "MBA", "B.Sc", "M.Sc"];
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
const LoginCard = ({ setView }) => {
    const [loginAs, setLoginAs] = useState('Student');
    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 sm:text-sm w-full transition duration-150";

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <LogIn className="w-6 h-6 mr-3 text-neutral-600" /> Sign In
            </h2>

            <form className="space-y-4">
                {/* Email / Institute ID */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email / Institute ID</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="email"
                            className={`block w-full pl-10 pr-3 py-2.5 ${inputStyle}`}
                            placeholder="you@institute.edu or ID"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            id="password"
                            className={`block w-full pl-10 pr-3 py-2.5 ${inputStyle}`}
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {/* Login As Dropdown */}
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
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-300 ease-in-out"
                >
                    Login
                </button>
            </form>

            {/* Action Links */}
            <div className="text-center pt-2 space-y-3 text-sm">
                <button
                    onClick={() => console.log('Forgot Password clicked')}
                    className="text-neutral-600 hover:text-neutral-500 block w-full font-medium transition duration-150 ease-in-out"
                >
                    Forgot Password?
                </button>
                <div className="flex justify-center space-x-4 border-t pt-4">
                    <button
                        onClick={() => setView('student-register')}
                        className="text-neutral-600 hover:text-neutral-700 font-bold transition duration-150 ease-in-out"
                    >
                        <User className="w-4 h-4 mr-1 inline-block" /> Student Register
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                        onClick={() => setView('alumni-register')}
                        className="text-neutral-600 hover:text-neutral-700 font-bold transition duration-150 ease-in-out"
                    >
                        <BookOpen className="w-4 h-4 mr-1 inline-block" /> Alumni Register
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Student Registration View Component ---
const StudentRegisterCard = ({ setView }) => {
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
    
    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 transition duration-150 sm:text-sm w-full";

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <GraduationCap className="w-6 h-6 mr-3 text-neutral-600" /> Student Registration
            </h2>
            <form className="space-y-6">
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
                        <input type="tel" placeholder="Phone" className={inputStyle} />
                        <select className={inputStyle}>
                            <option value="">Gender (Optional)</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
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
                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-300 ease-in-out"
                >
                    Complete Registration
                </button>

                <button
                    type="button"
                    onClick={() => setView('login')}
                    className="mt-4 w-full text-sm text-gray-600 hover:text-neutral-600 font-medium transition duration-150 ease-in-out"
                >
                    &larr; Back to Sign In
                </button>
            </form>
        </div>
    );
};

// --- Alumni Registration View Component ---
const AlumniRegisterCard = ({ setView, setJourneyData }) => {
    const [alumniForm, setAlumniForm] = useState({
        skills: [],
        milestones: [{ year: '', milestone: '', description: '', skillsGained: '', type: 'Job' }]
    });

    const handleChipToggle = (chip) => {
        setAlumniForm(prev => {
            const current = prev.skills;
            if (current.includes(chip)) {
                return { ...prev, skills: current.filter(c => c !== chip) };
            } else {
                return { ...prev, skills: [...current, chip] };
            }
        });
    };

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

    // Passes filtered milestones to the parent state and triggers the view change
    const handleGraphGeneration = () => {
        // Only include milestones that have required fields filled
        const userMilestones = alumniForm.milestones.filter(m => m.milestone && m.year && m.description);
        setJourneyData(userMilestones.length > 0 ? userMilestones : null); 
        setView('journey-graph'); 
    };

    const inputStyle = "p-2.5 border border-gray-300 rounded-lg focus:ring-neutral-500 focus:border-neutral-500 transition duration-150 sm:text-sm w-full";

    return (
        <div className="p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center border-b pb-4">
                <BookOpen className="w-6 h-6 mr-3 text-neutral-600" /> Alumni Registration
            </h2>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); console.log("Account Creation Submitted"); }}>
                {/* Section A: Basic Info */}
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

                {/* Section B: Past Academic Info */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <GraduationCap className="w-5 h-5 mr-2" /> Past Academic Info
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <input type="text" placeholder="Graduation Year (e.g. 2010)" className={inputStyle} required />
                        <select className={inputStyle}>
                            <option value="">Department</option>
                            {departments.map(d => <option key={d}>{d}</option>)}
                        </select>
                        <select className={inputStyle}>
                            <option value="">Degree</option>
                            {degrees.map(d => <option key={d}>{d}</option>)}
                        </select>
                    </div>
                </div>

                {/* Section C: Current Professional Info */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <Briefcase className="w-5 h-5 mr-2" /> Current Professional Info
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <input type="text" placeholder="Current Company" className={inputStyle} required />
                        <input type="text" placeholder="Current Role" className={inputStyle} required />
                        <input type="number" placeholder="Experience (Years)" min="0" className={inputStyle} required />
                    </div>
                    <ChipSelect
                        label="Key Skills (Share your expertise)"
                        options={skillsOptions}
                        selected={alumniForm.skills}
                        onSelect={handleChipToggle}
                    />
                </div>

                {/* Section D: Journey Input */}
                <div className="pb-4">
                    <h3 className="lg:text-xl text-lg font-semibold text-neutral-700 flex items-center mb-4">
                        <Globe className="w-5 h-5 mr-2" /> Your Career Journey Milestones
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">Help students by sharing year-wise milestones from your journey.</p>
                    <div className="space-y-4">
                        {alumniForm.milestones.map((milestone, index) => (
                            <div key={index} className="p-3 border border-neutral-300 rounded-lg bg-neutral-50 shadow-sm relative">
                                <h4 className="font-medium text-neutral-600 mb-3">Milestone {index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    <input
                                        type="number"
                                        placeholder="Year"
                                        min="2000"
                                        max={new Date().getFullYear()}
                                        value={milestone.year}
                                        onChange={(e) => handleMilestoneChange(index, 'year', e.target.value)}
                                        className={inputStyle + " col-span-1"}
                                        required
                                    />
                                    <select
                                        value={milestone.type}
                                        onChange={(e) => handleMilestoneChange(index, 'type', e.target.value)}
                                        className={inputStyle + " col-span-1"}
                                    >
                                        <option value="Job">Job/Role</option>
                                        <option value="Higher Study">Higher Study</option>
                                        <option value="Project">Big Project</option>
                                        <option value="Location">Location Change</option>
                                        <option value="Default">Other</option>
                                    </select>

                                    <input
                                        type="text"
                                        placeholder="Milestone (Job/Higher Study/Project)"
                                        value={milestone.milestone}
                                        onChange={(e) => handleMilestoneChange(index, 'milestone', e.target.value)}
                                        className={inputStyle + " col-span-2"}
                                        required
                                    />
                                    <textarea
                                        placeholder="Description (What was it?)"
                                        value={milestone.description}
                                        onChange={(e) => handleMilestoneChange(index, 'description', e.target.value)}
                                        className={inputStyle + " col-span-full h-16 resize-none"} 
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Skills gained (e.g. React, Negotiation)"
                                        value={milestone.skillsGained}
                                        onChange={(e) => handleMilestoneChange(index, 'skillsGained', e.target.value)}
                                        className={inputStyle + " col-span-full"}
                                    />
                                </div>
                                {alumniForm.milestones.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMilestone(index)}
                                        className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500 hover:text-red-700 hover:bg-red-50 transition"
                                        title="Remove Milestone"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addMilestone}
                            className="flex items-center justify-center w-full py-2 border border-dashed border-neutral-400 text-neutral-600 rounded-lg hover:bg-neutral-100 transition duration-150"
                        >
                            <PlusCircle className="w-5 h-5 mr-2" /> Add Another Milestone
                        </button>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-4 pt-4">
                    <button
                        type="button"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                        onClick={handleGraphGeneration}
                    >
                        Preview Career Journey Graph
                    </button>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition duration-300 ease-in-out"
                    >
                        Create Alumni Account
                    </button>
                </div>

                <button
                    type="button"
                    onClick={() => setView('login')}
                    className="mt-4 w-full text-sm text-gray-600 hover:text-neutral-600 font-medium transition duration-150 ease-in-out"
                >
                    &larr; Back to Sign In
                </button>
            </form>
        </div>
    );
};


// ----------------------------------------------------------------------
// --- Main Application Component (Handles Full-Page Routing) ---
// ----------------------------------------------------------------------
const LoginPage = () => {
    const [currentView, setCurrentView] = useState('login');
    const [journeyData, setJourneyData] = useState(null); 
    
    const renderView = () => {
        switch (currentView) {
            case 'login':
                return <LoginCard setView={setCurrentView} />;
            case 'student-register':
                return <StudentRegisterCard setView={setCurrentView} />;
            case 'alumni-register':
                return <AlumniRegisterCard setView={setCurrentView} setJourneyData={setJourneyData} />;
            case 'journey-graph':
                // Pass the captured data to the visualization component
                return <JourneyGraphModule milestones={journeyData} setView={setCurrentView} />;
            default:
                return <LoginCard setView={setCurrentView} />;
        }
    };

    const getSubTitle = () => {
        switch (currentView) {
            case 'login':
                return 'Login or Create Account below to get started.';
            case 'student-register':
                return 'Unlock your potential by filling out your student profile.';
            case 'alumni-register':
                return 'Guide the next generation by sharing your professional journey.';
            case 'journey-graph':
                return 'Review the beautifully mapped journey before final submission.';
            default:
                return 'Join the network of thousands of students and esteemed alumni.';
        }
    }

    // New variable to determine if the view should take up the full width (i.e., hide the sidebar)
    const isFullPage = currentView === 'journey-graph';

    return (
        <div 
            className="min-h-screen bg-neutral-50 flex poppins-font-override"
            style={{ fontFamily: "'Poppins', sans-serif" }} 
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
            `}</style>
            
            {/* Conditional Grid/Block Layout: If full page, use 'block' layout, otherwise use the grid for side-by-side */}
            <div className={`w-full max-w-7xl mx-auto ${isFullPage ? 'block' : 'grid grid-cols-1 lg:grid-cols-2'}`}>
                
                {/* Left Side: Illustration & Marketing (Hidden if full-page) */}
                {!isFullPage && (
                    <div className="hidden lg:flex flex-col justify-center items-center p-10 space-y-8 bg-neutral-50 lg:h-screen lg:sticky lg:top-0">
                        <h1 className="text-5xl font-extrabold text-neutral-800 text-center leading-tight">
                            Connect. <span className="text-neutral-600">Grow.</span> Succeed.
                        </h1>
                        <p className="text-neutral-600 text-lg text-center max-w-md">
                            {getSubTitle()}
                        </p>
                        <img
                            src={image1}
                            alt="Illustration showing alumni and students connecting"
                            className="w-full max-w-lg h-auto rounded-xl shadow-2xl transition duration-500 hover:scale-[1.01]"
                        />
                        <div className="text-sm text-neutral-400 text-center mt-4">
                            A powerful network built for your career journey.
                        </div>
                    </div>
                )}

                {/* Right Side: Form/Graph View */}
                <div 
                    className={`flex justify-center items-start overflow-y-auto ${isFullPage ? 'col-span-full pt-12 pb-12' : 'pt-16 pb-16 lg:py-16'}`}
                >
                    {/* Max width is large (max-w-4xl) for the graph to fill the page, but small (max-w-xl) for the form */}
                    <div className={isFullPage ? 'w-full max-w-screen px-4 lg:px-0' : 'w-full max-w-xl px-4 lg:px-0'}>
                        {renderView()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;