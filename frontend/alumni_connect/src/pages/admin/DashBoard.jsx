import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Calendar, CheckCircle, XCircle, 
  Search, Bell, Settings, MoreVertical, MapPin, Clock, 
  FileText, ChevronRight, GraduationCap, Briefcase, Building2,
  Download, AlertCircle, ShieldCheck, LogOut, CheckSquare,
  Compass
} from 'lucide-react';
import UniversityAdminDashboard from './UniversityAdminDashboard';
import AdminSettings from './AdminSettings';

// --- MOCK DATA ---

const STATS = [
  { label: "Total Alumni", value: "12,450", change: "+12%", icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Active Students", value: "3,200", change: "+4%", icon: GraduationCap, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Workshops", value: "8", change: "Urgent", icon: Calendar, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Avg. Attendance", value: "85%", change: "+2%", icon: Users, color: "text-pink-600", bg: "bg-pink-50" },
];

const USERS_DATA = [
  { id: 1, name: "Arjun Mehta", role: "Alumni", batch: "2019", designation: "SDE II @ Amazon", status: "Verified", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=60" },
  { id: 2, name: "Priya Sharma", role: "Student", batch: "2025", designation: "CSE Dept", status: "Active", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=60" },
  { id: 3, name: "Rohan Das", role: "Alumni", batch: "2015", designation: "Founder, TechFlow", status: "Verified", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&fit=crop&q=60" },
  { id: 4, name: "Sara Ali", role: "Student", batch: "2024", designation: "ECE Dept", status: "Pending", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=60" },
  { id: 5, name: "Vikram Singh", role: "Alumni", batch: "2018", designation: "Product Manager @ Uber", status: "Verified", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=60" },
];

const WORKSHOP_REQUESTS = [
  { 
    id: 101, 
    host: "Arjun Mehta", 
    hostRole: "SDE II @ Amazon",
    topic: "Cracking the FAANG Interview", 
    type: "Offline",
    date: "Nov 28, 2025", 
    duration: "3 Hours",
    expectedSeats: 120,
    requirements: ["Projector", "Whiteboard", "2 Microphones"],
    description: "A deep dive into DSA patterns and system design basics required for top-tier tech interviews.",
    status: "Pending"
  },
  { 
    id: 102, 
    host: "Vikram Singh", 
    hostRole: "PM @ Uber",
    topic: "Product Management 101", 
    type: "Offline",
    date: "Dec 05, 2025", 
    duration: "2 Hours",
    expectedSeats: 60,
    requirements: ["Projector", "Round Tables"],
    description: "Workshop on product thinking and agile methodologies.",
    status: "Pending"
  }
];

// --- SIDEBAR COMPONENTS ---

// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ icon: Icon, label, active, expanded, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center transition-all duration-200 group rounded-xl relative
      ${expanded 
        ? "gap-3 px-4 py-3 w-full justify-start" 
        : "justify-center p-3 w-12 h-12 mx-auto" 
      }
      ${active 
        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
      }
    `}
    title={!expanded ? label : ""}
  >
    <Icon size={20} className="shrink-0" />
    
    {/* Text Label with smooth wipe transition */}
    <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
      expanded ? 'w-auto opacity-100 ml-0' : 'w-0 opacity-0 hidden'
    }`}>
      {label}
    </span>

    {/* Active Indicator Dot (Visible only when collapsed) */}
    {!expanded && active && (
      <div className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border border-white"></div>
    )}
  </button>
);

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <aside 
      className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ease-in-out shrink-0 relative z-30 h-screen top-0
      ${isSidebarOpen ? 'w-72' : 'w-24'}`}
    >
      {/* Header */}
      <div className="h-24 flex items-center justify-center border-b border-slate-50 relative px-4">
        <div className={`flex items-center gap-3 transition-all duration-300 ${!isSidebarOpen && 'justify-center w-full'}`}>
          {/* Logo / Toggle Button */}
          <div 
            className="w-10 h-10  rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 text-white shrink-0 cursor-pointer transition" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
           <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-md text-white shrink-0 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Compass size={20} />
                </div>
          </div>
          
          {/* Text Label */}
          <div className={`flex flex-col overflow-hidden transition-all duration-300 ${
            isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'
          }`}>
            <h1 className="font-extrabold text-slate-900 tracking-tight text-lg leading-none">
                      AlumniConnect
            </h1>
           
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 w-full p-4 mt-4">
        <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} expanded={isSidebarOpen} onClick={() => setActiveTab('overview')} />
        <SidebarItem icon={Users} label="User Directory" active={activeTab === 'users'} expanded={isSidebarOpen} onClick={() => setActiveTab('users')} />
        <SidebarItem icon={CheckSquare} label="Approvals" active={activeTab === 'requests'} expanded={isSidebarOpen} onClick={() => setActiveTab('requests')} />
        <div className={`my-4 border-t border-slate-100 ${!isSidebarOpen ? 'mx-2' : 'mx-4'}`}></div>
        <SidebarItem icon={FileText} label="Reports" active={activeTab === 'reports'} expanded={isSidebarOpen} onClick={() => setActiveTab('reports')} />
        <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} expanded={isSidebarOpen} onClick={() => setActiveTab('settings')} />
      </nav>

      {/* Logout */}
      <div className={`p-4 border-t border-slate-100 ${!isSidebarOpen && 'flex justify-center'}`}>
        <button className={`flex items-center transition-colors group rounded-xl ${isSidebarOpen ? "gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50" : "justify-center p-3 w-12 h-12 text-slate-400 hover:text-red-600 hover:bg-red-50"}`} title="Logout">
          <LogOut size={20} />
          <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 hidden'}`}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Verified: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Active: "bg-blue-100 text-blue-700 border-blue-200",
    Pending: "bg-amber-100 text-amber-700 border-amber-200",
    Rejected: "bg-red-100 text-red-700 border-red-200"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

// --- MAIN COMPONENT ---

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [venueInput, setVenueInput] = useState('');

  // --- APPROVAL MODAL LOGIC ---
  const handleApprove = (id) => {
    alert(`Approved Workshop ${id} at venue: ${venueInput}`);
    setSelectedRequest(null);
    setVenueInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. INTEGRATED SIDEBAR */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. MAIN CONTENT AREA */}
      {/* flex-1 ensures it takes remaining width; no fixed margins needed */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'users' && 'User Management'}
              {activeTab === 'requests' && 'Workshop Approvals'}
              {activeTab === 'settings' && 'Settings'}
              {activeTab === 'reports' && 'Reports'}
            </h1>
          
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-64 shadow-sm" />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 relative shadow-sm">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* --- VIEW: OVERVIEW --- */}
        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {STATS.map((stat, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900">Recent Registrations</h3>
                <button className="text-xs font-bold text-indigo-600 hover:underline">View All</button>
              </div>
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs">
                  <tr>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {USERS_DATA.slice(0, 3).map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 font-medium flex items-center gap-3">
                        <img src={user.avatar} className="w-8 h-8 rounded-full" alt=""/>
                        {user.name}
                      </td>
                      <td className="px-6 py-4">{user.role}</td>
                      <td className="px-6 py-4 text-slate-500">Nov 20, 2025</td>
                      <td className="px-6 py-4"><StatusBadge status={user.status}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW: USER DIRECTORY --- */}
        {activeTab === 'users' && (
          <div className="animate-in fade-in duration-500 space-y-6">
            {/* Filters */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                 <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-md">All Users</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">Alumni</button>
                 <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">Students</button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50">
                 <Download size={14} /> Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-xs border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Profile</th>
                    <th className="px-6 py-4">Batch/Dept</th>
                    <th className="px-6 py-4">Designation</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {USERS_DATA.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50 transition group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} className="w-10 h-10 rounded-full object-cover border border-slate-200" alt=""/>
                          <div>
                            <div className="font-bold text-slate-900">{user.name}</div>
                            <div className="text-xs text-slate-500">{user.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{user.batch}</td>
                      <td className="px-6 py-4 text-slate-500">{user.designation}</td>
                      <td className="px-6 py-4"><StatusBadge status={user.status}/></td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
                 <span className="text-xs text-slate-500 font-bold">Showing 1-5 of 15,400</span>
                 <div className="flex gap-2">
                    <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold disabled:opacity-50">Prev</button>
                    <button className="px-3 py-1 border border-slate-200 rounded-lg text-xs font-bold hover:bg-slate-50">Next</button>
                 </div>
              </div>
            </div>
          </div>
        )}
{activeTab === 'reports' && (
    <UniversityAdminDashboard/>
)}
{activeTab === 'settings' && (
    <AdminSettings/>
)}
        {/* --- VIEW: WORKSHOP REQUESTS (Approvals) --- */}
        {activeTab === 'requests' && (
          <div className="animate-in fade-in duration-500">
             <div className="grid grid-cols-1 gap-6">
                {WORKSHOP_REQUESTS.map((req) => (
                   <div key={req.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row gap-6 shadow-sm hover:border-indigo-200 transition">
                      {/* Left: Details */}
                      <div className="flex-1">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                               <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                                 {req.type} Request
                               </span>
                               <h3 className="text-xl font-bold text-slate-900">{req.topic}</h3>
                            </div>
                            <div className="text-right">
                               <div className="text-2xl font-bold text-slate-900">{req.date.split(' ')[0]}</div>
                               <div className="text-xs font-bold text-slate-500 uppercase">{req.date.split(' ')[1]}</div>
                            </div>
                         </div>

                         <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-xs">
                                 {req.host.charAt(0)}
                               </div>
                               <div className="text-sm">
                                  <span className="font-bold text-slate-900">{req.host}</span>
                                  <span className="text-slate-400 mx-1">•</span>
                                  <span className="text-slate-500">{req.hostRole}</span>
                               </div>
                            </div>
                         </div>

                         <p className="text-sm text-slate-600 leading-relaxed mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            "{req.description}"
                         </p>
                         
                         <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-bold">
                            <span className="flex items-center gap-1.5"><Clock size={14}/> {req.duration}</span>
                            <span className="flex items-center gap-1.5"><Users size={14}/> {req.expectedSeats} Seats Required</span>
                            <span className="flex items-center gap-1.5"><AlertCircle size={14}/> {req.requirements.length} Logistics items</span>
                         </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="lg:w-64 flex flex-col justify-center gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6">
                         <button 
                           onClick={() => setSelectedRequest(req)}
                           className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 transition flex items-center justify-center gap-2"
                         >
                            Review & Approve <ChevronRight size={16} />
                         </button>
                         <button className="w-full py-3 bg-white border border-slate-200 text-slate-500 rounded-xl font-bold text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition">
                            Reject Request
                         </button>
                      </div>
                   </div>
                ))}

                {WORKSHOP_REQUESTS.length === 0 && (
                    <div className="text-center py-20 text-slate-400">
                        <CheckCircle size={48} className="mx-auto mb-4 opacity-20" />
                        <p>All caught up! No pending requests.</p>
                    </div>
                )}
             </div>
          </div>
        )}

      </main>

      {/* --- 3. APPROVAL MODAL --- */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}></div>
           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                 <div>
                    <h3 className="font-bold text-slate-900">Approve Workshop</h3>
                    <p className="text-xs text-slate-500">ID: #{selectedRequest.id}</p>
                 </div>
                 <button onClick={() => setSelectedRequest(null)} className="p-1 rounded-full hover:bg-slate-200 transition"><XCircle size={20} className="text-slate-400"/></button>
              </div>

              <div className="p-6 space-y-6">
                 {/* Summary */}
                 <div className="flex gap-4 text-sm">
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase">Date</div>
                        <div className="font-bold text-slate-900">{selectedRequest.date}</div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase">Attendees</div>
                        <div className="font-bold text-slate-900">{selectedRequest.expectedSeats}</div>
                    </div>
                 </div>

                 {/* Logistics List */}
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Logistics Required</label>
                    <div className="flex flex-wrap gap-2">
                       {selectedRequest.requirements.map((req, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-xs font-bold flex items-center gap-1">
                             <CheckCircle size={12} /> {req}
                          </span>
                       ))}
                    </div>
                 </div>

                 {/* Venue Assignment (Admin Action) */}
                 <div>
                    <label className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2 block items-center gap-1">
                       <MapPin size={12} /> Assign Venue <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Building2 size={18} className="absolute left-3 top-3 text-slate-400"/>
                        <input 
                          type="text" 
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-medium focus:border-indigo-500 focus:ring-0 outline-none transition"
                          placeholder="e.g. Seminar Hall A, Block 3"
                          value={venueInput}
                          onChange={(e) => setVenueInput(e.target.value)}
                          autoFocus
                        />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">This will notify the alumni and lock the venue calendar.</p>
                 </div>

                 {/* Action Buttons */}
                 <div className="flex gap-3 pt-2">
                    <button 
                        onClick={() => setSelectedRequest(null)}
                        className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => handleApprove(selectedRequest.id)}
                        disabled={!venueInput.trim()}
                        className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        <CheckCircle size={18} /> Confirm Approval
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;