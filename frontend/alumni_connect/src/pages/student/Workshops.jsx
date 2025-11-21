import React, { useState } from 'react';
import { 
  Calendar, Users, Star, Clock, DollarSign, Heart, 
  CheckCircle, Video, Download, MessageSquare, FileText, 
  ChevronRight, PlayCircle, Award, Search, Filter
} from 'lucide-react';

// --- MOCK DATA ---
const WORKSHOPS_DATA = [
  {
    id: 1,
    title: "System Design for High Scale",
    host: "Aditya Verma",
    hostRole: "Senior Architect @ Google",
    hostImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "Nov 25, 2025",
    time: "2:00 PM - 5:00 PM",
    price: 49,
    seats: 120,
    seatsFilled: 98,
    rating: 4.9,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    tags: ["Architecture", "Backend"],
    status: "upcoming"
  },
  {
    id: 2,
    title: "React Performance Optimization",
    host: "Sarah Chen",
    hostRole: "Frontend Lead @ Airbnb",
    hostImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    date: "Dec 02, 2025",
    time: "10:00 AM - 1:00 PM",
    price: 0,
    seats: 300,
    seatsFilled: 280,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    tags: ["Frontend", "React"],
    status: "popular"
  }
];

// --- SUB-COMPONENTS ---

// 1. Workshop Listing Card (Compact)
const WorkshopCard = ({ workshop, onViewDetails }) => (
  <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
    {/* Image Header */}
    <div className="h-32 overflow-hidden relative">
      <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      <div className="absolute top-2 right-2 flex gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1">
          <Star size={12} className="text-amber-400 fill-amber-400" /> {workshop.rating}
        </span>
      </div>
      <div className="absolute bottom-2 left-2">
        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${workshop.price === 0 ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'}`}>
          {workshop.price === 0 ? 'Free' : `$${workshop.price}`}
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {workshop.title}
      </h3>
      
      <div className="flex items-center gap-2 mb-3">
        <img src={workshop.hostImg} alt={workshop.host} className="w-6 h-6 rounded-full" />
        <p className="text-xs text-slate-500 truncate">By <span className="font-medium text-slate-700">{workshop.host}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4">
        <div className="flex items-center gap-1.5"><Calendar size={14}/> {workshop.date}</div>
        <div className="flex items-center gap-1.5"><Users size={14}/> {workshop.seats - workshop.seatsFilled} seats left</div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3 border-t border-slate-100">
        <button onClick={onViewDetails} className="flex-1 bg-slate-900 text-white py-2 rounded-lg text-xs font-bold hover:bg-indigo-600 transition flex items-center justify-center gap-1">
          Register
        </button>
        <button className="p-2 text-slate-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition border border-slate-200">
          <Heart size={16} />
        </button>
      </div>
    </div>
  </div>
);

// 2. Workshop Details View
const WorkshopDetails = ({ workshop, onBack }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
    {/* Breadcrumb */}
    <button onClick={onBack} className="text-xs font-bold text-slate-500 hover:text-indigo-600 mb-4 flex items-center gap-1">
      <ChevronRight size={14} className="rotate-180" /> Back to Workshops
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Main Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Hero Card */}
        <div className="relative h-64 rounded-2xl overflow-hidden group">
          <img src={workshop.image} className="w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <div className="flex gap-2 mb-2">
               {workshop.tags.map(tag => <span key={tag} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold uppercase tracking-wider">{tag}</span>)}
            </div>
            <h1 className="text-3xl font-bold mb-2">{workshop.title}</h1>
            <div className="flex items-center gap-4 text-sm text-slate-200">
              <span className="flex items-center gap-1.5"><Calendar size={16}/> {workshop.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={16}/> {workshop.time}</span>
            </div>
          </div>
        </div>

        {/* Syllabus */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
            <FileText size={20} className="text-indigo-600"/> Agenda & Syllabus
          </h3>
          <div className="space-y-4">
            {['Introduction to Scalability', 'Database Sharding Strategies', 'Caching Patterns (Redis/Memcached)', 'Live Q&A Session'].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</div>
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
           <h3 className="font-bold text-lg text-slate-900 mb-4">Past Feedback</h3>
           <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 italic">
             "One of the best sessions I've attended. The section on Database Sharding was explained so simply."
             <div className="mt-2 font-bold text-slate-900 not-italic">- Rohan M., SDE II</div>
           </div>
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className="space-y-6">
        {/* Register Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-slate-900">{workshop.price === 0 ? 'Free' : `$${workshop.price}`}</span>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded uppercase">Open</span>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition shadow-indigo-200 shadow-lg mb-3">
            Secure Your Seat
          </button>
          <p className="text-xs text-center text-slate-500">100% Money back guarantee</p>
        </div>

        {/* Host Profile */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <img src={workshop.hostImg} className="w-12 h-12 rounded-full object-cover" alt="Host"/>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">{workshop.host}</h4>
              <p className="text-xs text-slate-500">{workshop.hostRole}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Ex-Architect at Uber with 10+ years of experience in building distributed systems.
          </p>
          <div className="flex gap-2">
             <button className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50 transition">View Profile</button>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2"><Download size={16}/> Pre-read Materials</h3>
           <ul className="space-y-3">
             <li className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer transition">
                <span>System_Design_Primer.pdf</span>
                <Download size={12}/>
             </li>
             <li className="flex items-center justify-between text-xs text-slate-300 hover:text-white cursor-pointer transition">
                <span>Prerequisites_Setup.docx</span>
                <Download size={12}/>
             </li>
           </ul>
        </div>
      </div>
    </div>
  </div>
);

// 3. My Workshops (Dashboard)
const MyWorkshops = () => {
  const [activeTab, setActiveTab] = useState('registered');

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="flex gap-6 border-b border-slate-200 mb-6">
        {['registered', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold capitalize transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></div>}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {activeTab === 'registered' ? (
          // Registered Card
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm">
            <div className="w-full sm:w-48 h-28 shrink-0 rounded-lg overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Workshop"/>
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle size={32} className="text-white/80" />
              </div>
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <h3 className="font-bold text-slate-900 mb-1">Advanced Backend Engineering</h3>
              <p className="text-xs text-slate-500 mb-3">Starts in <span className="text-indigo-600 font-bold">2 hours 15 mins</span></p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                 <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-2">
                    <Video size={14} /> Join Meeting
                 </button>
                 <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50 transition">
                    View Details
                 </button>
              </div>
            </div>
          </div>
        ) : (
          // Completed Card
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row gap-5 shadow-sm opacity-90">
            <div className="w-full sm:w-48 h-28 shrink-0 rounded-lg overflow-hidden grayscale">
               <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Workshop"/>
            </div>
            <div className="flex-1 w-full">
               <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900">Intro to AI Agents</h3>
                    <p className="text-xs text-slate-500">Completed on Nov 10, 2025</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full"><CheckCircle size={16}/></div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <button className="py-2 border border-dashed border-slate-300 rounded-lg text-xs font-semibold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 flex items-center justify-center gap-2 transition">
                     <MessageSquare size={14}/> Feedback
                  </button>
                  <button className="py-2 border border-slate-200 bg-amber-50 rounded-lg text-xs font-semibold text-amber-700 hover:bg-amber-100 flex items-center justify-center gap-2 transition">
                     <Award size={14}/> Certificate
                  </button>
                  <button className="py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition">
                     <FileText size={14}/> My Notes
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- MAIN LAYOUT COMPONENT ---
const WorkshopsModule = () => {
  const [view, setView] = useState('list'); // 'list' | 'details' | 'my-workshops'
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const handleViewDetails = (workshop) => {
    setSelectedWorkshop(workshop);
    setView('details');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-4 sm:p-6">
      
      {/* Navigation Header (For Demo Purposes) */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
         <div>
           <h1 className="text-2xl font-bold text-slate-900">Workshops</h1>
           <p className="text-xs text-slate-500">Learn from the best alumni in the industry</p>
         </div>
         
         <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           <button 
             onClick={() => setView('list')} 
             className={`px-4 py-2 rounded-lg text-xs font-bold transition ${view === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             Explore
           </button>
           <button 
             onClick={() => setView('my-workshops')} 
             className={`px-4 py-2 rounded-lg text-xs font-bold transition ${view === 'my-workshops' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
           >
             My Learning
           </button>
         </div>
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* 6️⃣ WORKSHOPS PAGE (Listing) */}
        {view === 'list' && (
          <div className="animate-in fade-in duration-500">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
               <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  {['All', 'Upcoming', 'Popular', 'Free', 'Paid'].map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition ${activeFilter === filter ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
                    >
                      {filter}
                    </button>
                  ))}
               </div>
               <div className="relative w-full sm:w-64">
                 <Search size={14} className="absolute left-3 top-3 text-slate-400"/>
                 <input type="text" placeholder="Search topics..." className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
               </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORKSHOPS_DATA.map(workshop => (
                <WorkshopCard key={workshop.id} workshop={workshop} onViewDetails={() => handleViewDetails(workshop)} />
              ))}
              {/* Skeleton Placeholder for layout visuals */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 min-h-[300px] bg-slate-50/50">
                 <Filter size={24} className="mb-2 opacity-50"/>
                 <span className="text-xs font-bold">More Coming Soon</span>
              </div>
            </div>
          </div>
        )}

        {/* 7️⃣ WORKSHOP DETAILS */}
        {view === 'details' && selectedWorkshop && (
          <WorkshopDetails workshop={selectedWorkshop} onBack={() => setView('list')} />
        )}

        {/* 8️⃣ MY WORKSHOPS */}
        {view === 'my-workshops' && (
          <div className="animate-in fade-in duration-500">
             <MyWorkshops />
          </div>
        )}

      </div>
    </div>
  );
};

export default WorkshopsModule;