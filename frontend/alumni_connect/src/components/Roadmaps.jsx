import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, Share2, Download, Edit3, 
  RefreshCw, CheckCircle, Clock, AlertCircle, MessageSquare, 
  ChevronDown, ChevronUp, GraduationCap, Briefcase, Award, 
  Code, ArrowRight, FileText, Users, Star, Zap 
} from 'lucide-react';

/* ---------------------------------------------------------------------------
   MOCK DATA & SUB-COMPONENTS
   --------------------------------------------------------------------------- */

// --- S4: Journey Graph Data ---
const journeyNodes = [
  { id: 1, type: 'education', title: 'B.Tech - CSE', inst: 'M.M. Engineering College', year: '2022-2026', description: 'Specialized in AI & Data Science.' },
  { id: 2, type: 'skill', title: 'Learned React & Node.js', inst: 'Self-Paced', year: '2023', description: 'Built 3 major projects.' },
  { id: 3, type: 'internship', title: 'Frontend Intern', inst: 'TechSolutions Inc.', year: '2024', description: 'Worked on enterprise dashboard UI.' },
  { id: 4, type: 'project', title: 'Alumni Connect App', inst: 'Capstone', year: '2025', description: 'Full stack application with graph visualization.' },
];

// --- S5/S7: Roadmap Stages Data ---
const roadmapStages = [
  {
    id: 1, title: 'Stage 1: Fundamentals', status: 'Done', progress: 100,
    tasks: [
      { name: 'HTML/CSS Mastery', status: 'Done', deadline: 'Week 1' },
      { name: 'JavaScript ES6+', status: 'Done', deadline: 'Week 2' }
    ]
  },
  {
    id: 2, title: 'Stage 2: Advanced Concepts', status: 'In Progress', progress: 60,
    tasks: [
      { name: 'React Hooks & Context', status: 'Done', deadline: 'Week 3' },
      { name: 'Redux Toolkit', status: 'In Progress', deadline: 'Week 4' },
      { name: 'Tailwind CSS', status: 'To-do', deadline: 'Week 5' }
    ]
  },
  {
    id: 3, title: 'Stage 3: Projects & Portfolio', status: 'To-do', progress: 0,
    tasks: [
      { name: 'Build E-commerce App', status: 'To-do', deadline: 'Week 6' },
      { name: 'Deploy to Vercel', status: 'To-do', deadline: 'Week 7' }
    ]
  }
];

// --- S6: Templates Data ---
const templates = [
  { id: 1, title: 'Full Stack Web Dev', duration: '6 Months', level: 'Intermediate', domain: 'Web', skills: ['React', 'Node', 'SQL'] },
  { id: 2, title: 'Data Structures (DSA)', duration: '3 Months', level: 'Beginner', domain: 'DSA', skills: ['Arrays', 'Trees', 'DP'] },
  { id: 3, title: 'Machine Learning A-Z', duration: '1 Year', level: 'Advanced', domain: 'ML', skills: ['Python', 'TensorFlow', 'Math'] },
];

/* ---------------------------------------------------------------------------
   VIEW 1: S4 — Journey Graph Viewer
   --------------------------------------------------------------------------- */
const JourneyGraphViewer = () => {
  return (
    <div className="flex h-full gap-6">
      {/* Left Panel: Legend & Filters */}
      <div className="w-1/4 bg-white rounded-xl shadow-sm p-6 border border-gray-200 h-fit">
        <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>
        <div className="space-y-3">
          {['Education', 'Internships', 'Jobs', 'Skills', 'Projects'].map((item) => (
            <label key={item} className="flex items-center space-x-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="form-checkbox h-4 w-4 text-indigo-600 rounded" />
              <span className="text-gray-600">{item}</span>
            </label>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-2">Legend</h3>
          <div className="text-sm text-gray-500 space-y-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Education</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Experience</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Skills</div>
          </div>
        </div>
      </div>

      {/* Center: Interactive Graph */}
      <div className="flex-1 bg-white rounded-xl shadow-sm p-8 border border-gray-200 relative overflow-hidden">
        <div className="absolute top-4 right-4">
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 shadow-md transition-all">
                Generate My Roadmap from This
            </button>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-8">Career Journey Timeline</h2>
        
        <div className="relative border-l-2 border-gray-200 ml-6 space-y-8 pb-12">
          {journeyNodes.map((node) => (
            <div key={node.id} className="mb-8 ml-6 relative group cursor-pointer">
              {/* Dot */}
              <span className={`absolute -left-[33px] flex items-center justify-center w-10 h-10 rounded-full ring-4 ring-white ${
                node.type === 'education' ? 'bg-blue-100 text-blue-600' : 
                node.type === 'internship' ? 'bg-purple-100 text-purple-600' : 
                'bg-green-100 text-green-600'
              }`}>
                {node.type === 'education' && <GraduationCap size={18} />}
                {node.type === 'internship' && <Briefcase size={18} />}
                {(node.type === 'skill' || node.type === 'project') && <Code size={18} />}
              </span>
              
              {/* Card */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{node.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{node.inst}</p>
                        <span className="inline-block px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded">{node.year}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs bg-white border border-gray-300 px-2 py-1 rounded text-gray-600 hover:text-indigo-600">Compare</button>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">{node.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Actions */}
      <div className="w-64 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3">Actions</h4>
            <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                <SaveCheckIcon /> Save as Reference
            </button>
            <button className="w-full flex items-center gap-2 p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                <Users size={16} /> Request Similar Path
            </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   VIEW 2: S5 — Personal Roadmap (Accordion)
   --------------------------------------------------------------------------- */
const PersonalRoadmap = ({ isGeneratedMode = false }) => {
  const [openStage, setOpenStage] = useState(1);

  return (
    <div className="flex gap-6">
      {/* Main Roadmap Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{isGeneratedMode ? 'Your Customized Roadmap' : 'My Roadmap: Frontend Mastery'}</h2>
            <p className="text-gray-500 text-sm mt-1">Last updated 2 days ago</p>
          </div>
          <div className="flex gap-3">
             {isGeneratedMode && (
                 <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle size={16} /> Save to Profile
                 </button>
             )}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"><Edit3 size={18} /></button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"><RefreshCw size={18} /></button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200"><Download size={18} /></button>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-700">Overall Progress</span>
            <span className="font-bold text-indigo-600">35%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
          </div>
        </div>

        {/* Stages Accordion */}
        <div className="space-y-4">
          {roadmapStages.map((stage) => (
            <div key={stage.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => setOpenStage(openStage === stage.id ? null : stage.id)}
                className="w-full flex justify-between items-center p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        stage.status === 'Done' ? 'bg-green-100 text-green-600' : 
                        stage.status === 'In Progress' ? 'bg-amber-100 text-amber-600' : 
                        'bg-gray-100 text-gray-500'
                    }`}>
                        {stage.id}
                    </div>
                    <div className="text-left">
                        <h3 className="font-semibold text-gray-800">{stage.title}</h3>
                        <span className="text-xs text-gray-500">{stage.tasks.length} Tasks • {stage.progress}% Complete</span>
                    </div>
                </div>
                {openStage === stage.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </button>
              
              {openStage === stage.id && (
                <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                  <div className="space-y-3">
                    {stage.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white p-3 rounded border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                    task.status === 'Done' ? 'bg-green-500' : 
                                    task.status === 'In Progress' ? 'bg-amber-500' : 'bg-gray-300'
                                }`}></div>
                                <span className="text-gray-700 text-sm">{task.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12} /> {task.deadline}</span>
                                <button className="text-xs text-indigo-600 hover:underline">Resources</button>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 space-y-6">
        {isGeneratedMode && (
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2"><Zap size={16} /> AI Analysis</h4>
                <p className="text-sm text-indigo-800 mb-3">Based on your journey graph, you are missing backend skills. This roadmap prioritizes Node.js.</p>
                <button className="text-xs bg-white text-indigo-600 px-3 py-1 rounded shadow-sm border border-indigo-200">View Analysis</button>
            </div>
        )}
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><AlertCircle size={18} className="text-amber-500"/> Skill Gaps</h4>
          <div className="flex flex-wrap gap-2">
            {['Docker', 'TypeScript', 'GraphQL'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full border border-red-100">{skill}</span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-xl shadow-lg text-white">
          <h4 className="font-bold mb-2 flex items-center gap-2"><MessageSquare size={18} /> AI Assistant</h4>
          <p className="text-xs text-gray-300 mb-4">"How do I prepare for the React Hooks task?"</p>
          <div className="relative">
            <input type="text" placeholder="Ask about this roadmap..." className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-3 pr-8 py-2 text-sm focus:outline-none focus:border-indigo-400" />
            <button className="absolute right-2 top-2 text-gray-400 hover:text-white"><ArrowRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   VIEW 3: S6 — Roadmap Templates Gallery
   --------------------------------------------------------------------------- */
const TemplatesGallery = () => {
  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" placeholder="Search roadmaps (e.g. 'DevOps', 'Data Science')" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>
        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 focus:outline-none"><option>All Domains</option><option>Web Dev</option><option>Data Science</option></select>
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 focus:outline-none"><option>Duration</option><option>&lt; 3 Months</option><option>6 Months</option></select>
          <select className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm text-gray-600 focus:outline-none"><option>Level</option><option>Beginner</option><option>Advanced</option></select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((t) => (
          <div key={t.id} className="bg-white rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                    t.domain === 'Web' ? 'bg-blue-100 text-blue-700' : 
                    t.domain === 'DSA' ? 'bg-purple-100 text-purple-700' : 
                    'bg-emerald-100 text-emerald-700'
                }`}>{t.domain}</span>
                <Star size={18} className="text-gray-300 group-hover:text-yellow-400 transition-colors cursor-pointer" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{t.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Clock size={14} /> {t.duration}</span>
                <span className="flex items-center gap-1"><Award size={14} /> {t.level}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {t.skills.map(s => (
                    <span key={s} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{s}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200">Preview</button>
                <button className="w-full py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">Use Template</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------------
   VIEW 4: S7 — Generated Results
   --------------------------------------------------------------------------- */
const GeneratedResults = () => {
    // Just wrapping the Personal Roadmap with 'isGeneratedMode' prop for reuse
    // But adding specific S7 Summary Cards at the top
    return (
        <div className="space-y-6">
            {/* S7 Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-600 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-indigo-200 text-sm font-medium mb-1">Estimated Timeline</h4>
                        <p className="text-2xl font-bold">4.5 Months</p>
                        <p className="text-xs text-indigo-200 mt-2">To reach Senior Student Level</p>
                    </div>
                    <Clock className="absolute right-4 bottom-4 text-indigo-500 opacity-50" size={48} />
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                     <h4 className="text-gray-500 text-sm font-medium mb-1">Skills to Acquire</h4>
                     <div className="flex flex-wrap gap-2 mt-2">
                         <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">+ React Native</span>
                         <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">+ Docker</span>
                         <span className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-medium">+ AWS</span>
                     </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                     <h4 className="text-gray-500 text-sm font-medium mb-1">Opportunities Unlocked</h4>
                     <p className="text-2xl font-bold text-gray-800">12 Jobs</p>
                     <button className="text-xs text-indigo-600 hover:underline mt-1">View matching roles</button>
                </div>
            </div>
            
            {/* Reuse S5 Layout for the roadmap details */}
            <PersonalRoadmap isGeneratedMode={true} />
        </div>
    )
}

// Helper Icon
const SaveCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
);

/* ---------------------------------------------------------------------------
   MAIN COMPONENT: Roadmaps
   --------------------------------------------------------------------------- */
export default function Roadmaps() {
  const [activeTab, setActiveTab] = useState('graph'); // 'graph' | 'roadmap' | 'templates' | 'generated'

  const renderContent = () => {
    switch (activeTab) {
      case 'graph': return <JourneyGraphViewer />;
      case 'roadmap': return <PersonalRoadmap />;
      case 'templates': return <TemplatesGallery />;
      case 'generated': return <GeneratedResults />;
      default: return <JourneyGraphViewer />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-[Poppins] p-6">
      {/* Page Header & Navigation */}
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Career Roadmaps</h1>
                <p className="text-gray-500 text-sm">Plan your journey from student to professional.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                    <Share2 size={16} /> Share
                </button>
                {/* Demo button to simulate S7 generation */}
                <button 
                  onClick={() => setActiveTab('generated')}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-all"
                >
                    <Zap size={16} /> AI Generate Path
                </button>
            </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button 
                  onClick={() => setActiveTab('graph')}
                  className={`${activeTab === 'graph' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                    <Users size={18} /> Journey Graph (S4)
                </button>
                <button 
                  onClick={() => setActiveTab('roadmap')}
                  className={`${activeTab === 'roadmap' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                    <FileText size={18} /> My Roadmap (S5)
                </button>
                <button 
                  onClick={() => setActiveTab('templates')}
                  className={`${activeTab === 'templates' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                    <Search size={18} /> Templates (S6)
                </button>
                 <button 
                  onClick={() => setActiveTab('generated')}
                  className={`${activeTab === 'generated' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                    <Zap size={18} /> Generated Result (S7)
                </button>
            </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="animate-fade-in">
        {renderContent()}
      </main>
    </div>
  );
}