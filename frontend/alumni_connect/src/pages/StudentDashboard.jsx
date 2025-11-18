import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Award, 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronRight, 
  Briefcase, 
  Code, 
  TrendingUp, 
  DollarSign, 
  Coffee, 
  Calendar,
  ArrowRight,
  Zap,
  Layout,
  Compass,
  UserPlus,
  Map,
  LogOut,
  MapPin, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  User,
  PanelLeftClose,
  PanelLeftOpen,
  Menu
} from 'lucide-react';
import AlumniExplorer from '../components/alumni_explorer';

// --- MOCK DATA: DASHBOARD ---

const STATS = [
  { label: "Mentors Connected", value: "12", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Communities Joined", value: "5", icon: MessageSquare, color: "bg-purple-50 text-purple-600" },
  { label: "Workshops Registered", value: "3", icon: Calendar, color: "bg-orange-50 text-orange-600" },
];

const ALUMNI_RECOMMENDATIONS = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Senior Product Designer",
    company: "Google",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    matchScore: 98,
    skills: ["UX Research", "Figma", "Prototyping"],
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Software Engineer II",
    company: "Netflix",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    matchScore: 94,
    skills: ["React", "Node.js", "System Design"],
  },
  {
    id: 3,
    name: "David Chen",
    role: "Data Scientist",
    company: "Spotify",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    matchScore: 89,
    skills: ["Python", "ML", "Data Viz"],
  },
];

const COMMUNITIES = [
  { id: 1, name: "Web Development", members: "1.2k", alumni: 45, icon: Code, color: "from-blue-500 to-cyan-400" },
  { id: 2, name: "Data Science", members: "850", alumni: 32, icon: TrendingUp, color: "from-emerald-500 to-teal-400" },
  { id: 3, name: "Finance & Fintech", members: "600", alumni: 28, icon: DollarSign, color: "from-yellow-500 to-orange-400" },
  { id: 4, name: "MBA Aspirants", members: "920", alumni: 50, icon: Briefcase, color: "from-neutral-500 to-purple-400" },
  { id: 5, name: "UPSC Prep", members: "300", alumni: 12, icon: BookOpen, color: "from-red-500 to-pink-400" },
  { id: 6, name: "Interview Prep", members: "2.5k", alumni: 110, icon: Coffee, color: "from-gray-700 to-gray-900" },
];

const WORKSHOPS = [
  {
    id: 1,
    title: "Cracking the PM Interview",
    host: "Ananya Gupta, PM at Uber",
    date: "Oct 24, 5:00 PM",
    price: "Free",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    host: "Mike Ross, Tech Lead",
    date: "Oct 28, 2:00 PM",
    price: "$15",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
];

const QUICK_ACCESS = [
  { label: "Find Alumni", icon: Search, color: "bg-neutral-100 text-neutral-600" },
  { label: "Join Community", icon: Users, color: "bg-pink-100 text-pink-600" },
  { label: "Ask Mentor", icon: MessageSquare, color: "bg-teal-100 text-teal-600" },
  { label: "My Connections", icon: UserPlus, color: "bg-orange-100 text-orange-600" },
  { label: "My Journey", icon: Map, color: "bg-blue-100 text-blue-600" },
];

// --- SHARED HELPER COMPONENTS ---

// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, onClick, expanded }) => (
  <button
    onClick={onClick}
    title={!expanded ? label : ""}
    className={`flex items-center transition-all duration-200 group rounded-xl
      ${expanded ? 'w-full gap-3 px-4 py-3' : 'w-full justify-center py-3'}
      ${active 
        ? "bg-neutral-900 text-white shadow-lg shadow-neutral-200" 
        : "text-slate-500 hover:bg-neutral-50 hover:text-neutral-900"
      }`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} className="shrink-0" />
    
    {/* Label - Hidden when collapsed, visible when expanded */}
    <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
      expanded ? 'w-auto opacity-100' : 'w-0 opacity-0'
    }`}>
      {label}
    </span>

    {/* Active Indicator Dot */}
    {active && expanded && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full shrink-0" />}
  </button>
);

const MatchScoreRing = ({ score }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="transform -rotate-90 w-12 h-12">
        <circle
          className="text-slate-100"
          strokeWidth="3"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="text-green-500 transition-all duration-1000 ease-out"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-slate-700">{score}%</span>
    </div>
  );
};

// --- PAGE VIEWS ---

const DashboardHome = ({ setActiveTab }) => (
  <>
    <header className="sticky top-0 z-20 bg-[#F8FAFC]/80 backdrop-blur-md px-8 py-6 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Hello, Vanshika 👋</h2>
        <p className="text-slate-500 text-sm">Here's what's happening with your network today.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2.5 bg-white rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-neutral-600 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-neutral-100 border-2 border-white shadow-sm overflow-hidden">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" />
        </div>
      </div>
    </header>

    <div className="px-8 pb-12 space-y-10">
      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between group">
            <div>
              <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </section>

      {/* Section 1: Smart Recommendations */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Zap className="text-amber-500 fill-amber-500" size={20} />
            <h3 className="text-xl font-bold text-slate-900">Recommended Alumni for You</h3>
          </div>
          <button onClick={() => setActiveTab('Explore Alumni')} className="text-neutral-600 font-semibold text-sm hover:underline">View All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALUMNI_RECOMMENDATIONS.map((person) => (
            <div key={person.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" 
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{person.name}</h4>
                    <p className="text-sm text-slate-500 mt-1 font-medium">{person.role}</p>
                    <p className="text-xs text-slate-400">at {person.company}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center" title="Match Score">
                  <MatchScoreRing score={person.matchScore} />
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {person.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs rounded-md font-medium border border-slate-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-auto w-full py-2.5 rounded-xl bg-neutral-600 text-white font-semibold text-sm hover:bg-neutral-700 active:scale-95 transition-all shadow-lg shadow-neutral-200 flex items-center justify-center gap-2">
                Request Guidance <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Explore Communities */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Users className="text-neutral-600" size={20} />
            <h3 className="text-xl font-bold text-slate-900">Explore Communities</h3>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 text-slate-600">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-6 -mx-8 px-8 scrollbar-hide gap-5">
          {COMMUNITIES.map((community) => (
            <div key={community.id} className="min-w-[280px] bg-white rounded-2xl p-1 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className={`h-24 rounded-t-xl bg-linear-to-r ${community.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <community.icon className="absolute bottom-3 right-3 text-white/30 w-16 h-16 transform rotate-12 translate-y-4 translate-x-4" />
              </div>
              <div className="p-5 relative">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center absolute -top-6 left-5">
                  <community.icon className="text-slate-800" size={24} />
                </div>
                <h4 className="mt-4 font-bold text-lg text-slate-900 group-hover:text-neutral-600 transition-colors">{community.name}</h4>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Users size={14} /> <span>{community.members}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award size={14} /> <span>{community.alumni} Alumni</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 group-hover:border-neutral-200 group-hover:text-neutral-600 transition-all">
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section 3: Upcoming Workshops */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-neutral-600" size={20} />
              <h3 className="text-xl font-bold text-slate-900">Upcoming Workshops</h3>
            </div>
          </div>

          <div className="space-y-4">
            {WORKSHOPS.map((workshop) => (
              <div key={workshop.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5">
                <img src={workshop.image} alt={workshop.title} className="w-full sm:w-32 h-32 object-cover rounded-xl" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="inline-block px-2 py-0.5 bg-neutral-50 text-neutral-600 text-[10px] font-bold uppercase tracking-wide rounded mb-2">
                        Webinar
                      </span>
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{workshop.price}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-lg">{workshop.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">by <span className="font-medium text-slate-700">{workshop.host}</span></p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar size={16} />
                      <span>{workshop.date}</span>
                    </div>
                    <button className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Quick Access */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Layout className="text-neutral-600" size={20} />
            <h3 className="text-xl font-bold text-slate-900">Quick Access</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACCESS.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => {
                    if(item.label === "Find Alumni") setActiveTab('Explore Alumni');
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 bg-white group ${idx === QUICK_ACCESS.length - 1 ? 'col-span-2 flex-row gap-3' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${item.color} bg-opacity-20 group-hover:scale-110 transition-transform ${idx === QUICK_ACCESS.length - 1 ? 'mb-0' : ''}`}>
                  <item.icon size={20} />
                </div>
                <span className="text-sm font-semibold text-slate-700">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Mini Motivation Card */}
          <div className="mt-6 bg-linear-to-br from-neutral-600 to-violet-700 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-neutral-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h4 className="font-bold text-lg mb-2">Profile Strength</h4>
              <div className="w-full bg-white/20 h-2 rounded-full mb-1">
                <div className="bg-green-400 h-2 rounded-full w-3/4"></div>
              </div>
              <p className="text-xs text-neutral-100 mb-4">Your profile is 75% complete.</p>
              <button className="text-xs font-bold bg-white text-neutral-600 px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors">
                Complete Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>
);

// --- MAIN SHELL COMPONENT ---

// --- MAIN SHELL COMPONENT ---

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  // Sidebar State: Initially closed (false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to decide which content to render
  const renderContent = () => {
    switch (activeTab) {
        case 'Explore Alumni':
            return <AlumniExplorer/>;
        case 'Dashboard':
        default:
            return <DashboardHome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden selection:bg-neutral-100 selection:text-neutral-900">
      
      {/* CSS Injection for Scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* Sidebar */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-slate-100 transition-all duration-300 ease-in-out shrink-0 relative z-30
        ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        {/* Sidebar Header (Logo + Toggle) */}
        <div className="h-20 flex items-center justify-center border-b border-slate-50 relative px-4">
            
            {/* Logo Section */}
            <div className={`flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen && 'justify-center w-full'}`}>
                <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-md text-white shrink-0">
                    <Compass size={20}   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                </div>
                
                {/* Text Label (Hidden when closed) */}
                <h1 className={`font-bold text-slate-900 tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'
                }`}>
                    AlumniConnect
                </h1>
            </div>

        
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 w-full p-4 mt-6">
          <SidebarItem 
            icon={Layout} 
            label="Dashboard" 
            active={activeTab === 'Dashboard'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('Dashboard')}
          />
          <SidebarItem 
            icon={Search} 
            label="Explore Alumni" 
            active={activeTab === 'Explore Alumni'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('Explore Alumni')}
          />
          <SidebarItem 
            icon={Users} 
            label="Communities" 
            active={activeTab === 'Communities'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('Communities')}
          />
          <SidebarItem 
            icon={Calendar} 
            label="Workshops" 
            active={activeTab === 'Workshops'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('Workshops')}
          />
          <SidebarItem 
            icon={MessageSquare} 
            label="Messages" 
            active={activeTab === 'Messages'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('Messages')}
          />
          <SidebarItem 
            icon={Map} 
            label="My Journey" 
            active={activeTab === 'My Journey'} 
            expanded={isSidebarOpen}
            onClick={() => setActiveTab('My Journey')}
          />
        </nav>

        {/* Logout Section */}
        <div className={`p-4 border-t border-slate-100 ${!isSidebarOpen && 'flex justify-center'}`}>
          <button 
            className={`flex items-center transition-colors group rounded-xl
                ${isSidebarOpen 
                ? "gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50" 
                : "justify-center p-3 text-slate-400 hover:text-red-600 hover:bg-red-50"
            }`}
            title="Logout"
           >
            <LogOut size={20} />
            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'
            }`}>
                Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {renderContent()}
      </main>
    </div>
  );
}