import React, { useState } from 'react';
import { 
  GraduationCap, MapPin, Zap, Award, BookOpen, 
  Linkedin, Github, Edit3, CheckCircle, X, Plus, Briefcase,
  Calendar, TrendingUp
} from 'lucide-react';
import JourneyGraphModule from '../../components/JourneyGraphModule';

const StudentJourney = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkillInputOpen, setIsSkillInputOpen] = useState(false);
  const [newSkill, setNewSkill] = useState('');

  const [profile, setProfile] = useState({
    name: "Aryan Singh",
    role: "3rd Year CSE Student",
    university: "Delhi Technological University",
    location: "New Delhi, India",
    bio: "Aspiring Full Stack Developer with a keen interest in Cloud Computing. Currently building scalable projects and looking for summer internships.",
    skills: ["React", "Node.js", "MongoDB", "C++", "Python", "Git"],
    socials: { linkedin: "aryan-s", github: "aryancodes" }
  });

  const [milestones, setMilestones] = useState([
    { year: '2022', milestone: 'Started B.Tech', description: 'Joined DTU. Focused on CGPA and C++ basics.', skillsGained: 'C++, Mathematics', type: 'Education' },
    { year: '2023', milestone: 'Built "CampBuddy"', description: 'Campsite booking app deployed on Vercel.', skillsGained: 'React, MongoDB', type: 'Project' },
    { year: '2023', milestone: 'Hackathon Winner', description: 'Won 1st prize at SIH (Internal).', skillsGained: 'Teamwork', type: 'Achievement' },
    { year: '2024', milestone: 'Data Science Intern', description: 'Summer internship analyzing customer trends.', skillsGained: 'Python, SQL', type: 'Internship' },
    { year: '2025', milestone: 'Goal: SDE Internship', description: 'Targeting Product based companies.', skillsGained: 'DSA', type: 'Internship' },
  ]);

  const [newMilestone, setNewMilestone] = useState({
    year: '', milestone: '', description: '', skillsGained: '', type: 'Project'
  });

  // --- Handlers ---
  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newMilestone.year || !newMilestone.milestone) return;
    const updated = [...milestones, newMilestone].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    setMilestones(updated);
    setIsModalOpen(false);
    setNewMilestone({ year: '', milestone: '', description: '', skillsGained: '', type: 'Project' });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] });
      setNewSkill('');
      setIsSkillInputOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-16 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* --- A. COMPACT HERO SECTION --- */}
      {/* Reduced height to h-48 (192px) */}
      <div className="relative h-32 w-full overflow-hidden group">
        <div className="absolute inset-0 bg-slate-900">
            <div className="absolute inset-0 bg-linear-to-r from-indigo-900 via-slate-900 to-slate-900 opacity-90"></div>
            {/* Subtle decorative elements */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>
        
        <button className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-full text-[10px] font-bold hover:bg-white/20 transition border border-white/10 opacity-0 group-hover:opacity-100">
             <Edit3 size={12} /> Edit Cover
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* --- B. COMPACT PROFILE HEADER --- */}
        {/* Reduced negative margin (-mt-14) and smaller grid gap */}
        <div className="flex flex-col md:flex-row items-end md:items-start -mt-14 mb-8 gap-5">
           
           {/* Avatar: Reduced to w-28 h-28 (mobile) / w-32 h-32 (desktop) */}
           <div className="relative shrink-0 mx-auto md:mx-0">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full p-1 bg-white shadow-lg relative z-10">
                 <img 
                   src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80" 
                   alt="Profile" 
                   className="w-full h-full rounded-full object-cover"
                 />
              </div>
              {/* Smaller Status Dot */}
              <div className="absolute bottom-1.5 right-1.5 z-20">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </span>
              </div>
           </div>

           {/* Info Area: Tighter spacing and smaller fonts */}
           <div className="flex-1 pt-1 md:pt-16 text-center md:text-left space-y-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                    {profile.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1.5 text-xs md:text-sm font-medium text-slate-500">
                   <span className="flex items-center gap-1">
                      <GraduationCap size={14} /> {profile.role}
                   </span>
                   <span className="hidden md:inline">•</span>
                   <span className="flex items-center gap-1">
                      <MapPin size={14} /> {profile.location}
                   </span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto md:mx-0 line-clamp-2">
                 {profile.bio}
              </p>
              
              {/* Social Actions: Smaller buttons */}
              <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
                 <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-[#0077b5] hover:border-[#0077b5] transition">
                    <Linkedin size={16} />
                 </button>
                 <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:text-black hover:border-black transition">
                    <Github size={16} />
                 </button>
                 <button className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition">
                    <BookOpen size={14} /> Resume
                 </button>
              </div>
           </div>
        </div>

        {/* --- C. COMPACT GRID SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
           
           {/* Skills Card: Reduced padding (p-5) and font sizes */}
           <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base text-slate-800 flex items-center gap-2">
                    <Zap className="text-amber-500 fill-amber-500" size={16} /> 
                    Core Competencies
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                 {profile.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-indigo-50 hover:text-indigo-700 transition cursor-default">
                       {skill}
                    </span>
                 ))}
                 
                 {isSkillInputOpen ? (
                    <form onSubmit={handleAddSkill} className="flex items-center">
                        <input 
                            autoFocus
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onBlur={() => !newSkill && setIsSkillInputOpen(false)}
                            className="px-2 py-1 text-xs border border-indigo-500 rounded-lg outline-none w-24"
                        />
                    </form>
                 ) : (
                    <button onClick={() => setIsSkillInputOpen(true)} className="px-2 py-1 border border-dashed border-slate-300 text-slate-400 rounded-lg text-xs hover:text-indigo-600 hover:border-indigo-400 transition flex items-center gap-1">
                       <Plus size={12} /> Add
                    </button>
                 )}
              </div>
           </div>

           {/* Stats Card: More compact layout */}
           <div className="bg-linear-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-md">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2 relative z-10 opacity-90">
                 <Award size={16} className="text-yellow-400" /> Overview
              </h3>
              
              <div className="grid grid-cols-2 gap-3 relative z-10">
                 <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-xl font-bold text-white">{milestones.filter(m=>m.type==='Project').length}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Projects</div>
                 </div>
                 <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-center">
                    <div className="text-xl font-bold text-white">350+</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">LeetCode</div>
                 </div>
                 <div className="bg-white/5 rounded-lg p-3 border border-white/5 col-span-2 flex items-center justify-between px-4">
                    <div>
                         <div className="text-xl font-bold text-emerald-400">3</div>
                         <div className="text-[10px] text-emerald-200/70 uppercase font-bold">Hackathons</div>
                    </div>
                    <Award size={20} className="text-emerald-400/40" />
                 </div>
              </div>
           </div>
        </div>

        {/* --- D. JOURNEY MODULE --- */}
        {/* Reduced container padding */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                   <TrendingUp size={16} className="text-indigo-600"/> Career Roadmap
                </h2>
                <button onClick={() => setIsModalOpen(true)} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                    <Plus size={14}/> Add Milestone
                </button>
            </div>
            <div className="p-4">
                <JourneyGraphModule milestones={milestones} />
            </div>
        </div>

      </div>

      {/* --- E. MODAL (Compact) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
              <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="text-sm font-bold text-slate-800">Add Milestone</h3>
                 <button onClick={() => setIsModalOpen(false)}><X size={18} className="text-slate-400 hover:text-slate-600"/></button>
              </div>
              <form onSubmit={handleAddMilestone} className="p-5 space-y-4">
                 <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Year</label>
                       <input type="number" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" placeholder="2025" value={newMilestone.year} onChange={(e) => setNewMilestone({...newMilestone, year: e.target.value})} required />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 uppercase">Type</label>
                       <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" value={newMilestone.type} onChange={(e) => setNewMilestone({...newMilestone, type: e.target.value})}>
                          <option>Project</option><option>Education</option><option>Internship</option><option>Achievement</option><option>Job</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Title</label>
                    <input type="text" className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500" placeholder="Milestone Title" value={newMilestone.milestone} onChange={(e) => setNewMilestone({...newMilestone, milestone: e.target.value})} required />
                 </div>
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Description</label>
                    <textarea className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-indigo-500 resize-none" rows="2" placeholder="Details..." value={newMilestone.description} onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}></textarea>
                 </div>
                 <button type="submit" className="w-full py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-indigo-600 transition">Save</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default StudentJourney;