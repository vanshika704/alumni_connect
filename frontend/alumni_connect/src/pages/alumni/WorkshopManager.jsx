import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalIcon, 
  Clock, 
  Users, 
  DollarSign, 
  Star, 
  ExternalLink, 
  Copy, 
  Plus, 
  X, 
  Trash2, 
  MapPin, 
  Video 
} from 'lucide-react';

// Initial Mock Data to populate the view
const INITIAL_DATA = [
  { 
    id: 'WS-001', 
    title: "System Design for Beginners", 
    date: "2025-11-21", 
    time: "14:00", 
    attendees: 45, 
    status: 'Live', 
    mode: 'Online', 
    price: 0 
  },
  { 
    id: 'WS-002', 
    title: "Resume Review Session", 
    date: "2025-11-25", 
    time: "18:00", 
    attendees: 12, 
    status: 'Scheduled', 
    mode: 'Online', 
    price: 499 
  },
];

const WorkshopManager = () => {
  // --- State Management ---
  const [workshops, setWorkshops] = useState(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '10:00',
    mode: 'Online',
    price: '',
    seats: 50
  });

  // --- Stats Calculations (Dynamic) ---
  const stats = useMemo(() => {
    const totalRegistrations = workshops.reduce((acc, curr) => acc + curr.attendees, 0);
    const totalRevenue = workshops.reduce((acc, curr) => acc + (curr.attendees * curr.price), 0);
    return { totalRegistrations, totalRevenue };
  }, [workshops]);

  // --- Handlers ---

  // 1. Handle clicking a date on the calendar
  const handleDayClick = (day) => {
    // Format day to YYYY-MM-DD for the input
    const formattedDate = `2025-11-${day.toString().padStart(2, '0')}`;
    setFormData({ ...formData, date: formattedDate });
    setIsModalOpen(true);
  };

  // 2. Handle Form Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Submit New Workshop
  const handleCreateWorkshop = (e) => {
    e.preventDefault();
    
    const newWorkshop = {
      id: `WS-${Math.floor(Math.random() * 10000)}`,
      title: formData.title,
      date: formData.date,
      time: formData.time,
      attendees: 0, // Starts with 0
      status: 'Scheduled', // Default status
      mode: formData.mode,
      price: Number(formData.price) || 0,
    };

    setWorkshops([...workshops, newWorkshop]);
    setIsModalOpen(false);
    
    // Reset form (keep some defaults)
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '10:00',
      mode: 'Online',
      price: '',
      seats: 50
    });
  };

  // 4. Delete Workshop
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this workshop?')) {
      setWorkshops(workshops.filter(w => w.id !== id));
    }
  };

  // Helper to generate Callora Code
  const generateMeetingCode = (id) => `WK-${id.split('-')[1]}-${Math.floor(1000 + Math.random() * 9000)}`;

// Filter logic for tabs
  const displayedWorkshops = workshops.filter(ws => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    if (activeTab === 'upcoming') {
      // Returns true if the workshop date is today or in the future
      return ws.date >= today;
    }
    
    if (activeTab === 'past') {
      // Returns true if the workshop date is in the past
      return ws.date < today;
    }

    if (activeTab === 'drafts') {
       // Returns true only if status is specifically 'Draft'
       return ws.status === 'Draft';
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Workshop Management</h1>
        <button 
          onClick={() => { setIsModalOpen(true); setFormData({...formData, date: new Date().toISOString().split('T')[0]}) }}
          className="bg-neutral-900-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-neutral-900-700 transition"
        >
          <Plus className="w-4 h-4" /> Create Workshop
        </button>
      </div>

      {/* Dynamic Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
         <StatBox label="Total Registrations" value={stats.totalRegistrations} icon={Users} color="neutral-900" />
         <StatBox label="Revenue Earned" value={`₹${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} color="green" />
         <StatBox label="Avg. Feedback" value="4.8/5" icon={Star} color="yellow" />
         <StatBox label="Completion Rate" value="92%" icon={Clock} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Workshop Lists */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            {['upcoming', 'past', 'drafts'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-medium capitalize transition ${activeTab === tab ? 'text-neutral-900-600 border-b-2 border-neutral-900-600 bg-neutral-900-50' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List Content */}
          <div className="p-4 space-y-4 min-h-[400px]">
            {displayedWorkshops.length === 0 ? (
              <div className="text-center py-10 text-slate-400">No workshops found in this tab.</div>
            ) : (
              displayedWorkshops.map((ws) => (
                <WorkshopCard 
                  key={ws.id} 
                  workshop={ws} 
                  generateCode={generateMeetingCode} 
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>

        {/* Right: Interactive Calendar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <CalIcon className="w-5 h-5 text-neutral-900-600" /> November 2025
              </h3>
              <div className="text-xs px-2 py-1 bg-neutral-900-50 text-neutral-900-600 rounded font-medium">Select a Date</div>
           </div>
           
           {/* Calendar Grid */}
           <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d} className="text-slate-400 text-xs font-bold">{d}</div>)}
           </div>
           <div className="grid grid-cols-7 gap-2">
              {Array.from({length: 30}).map((_, i) => {
                  const day = i + 1;
                  // Check if any workshop exists on this day
                  const hasEvent = workshops.some(ws => ws.date.endsWith(`-${day.toString().padStart(2, '0')}`));
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => handleDayClick(day)}
                      className={`
                        h-10 rounded-lg flex flex-col items-center justify-center relative transition border
                        ${hasEvent ? 'bg-neutral-900-50 border-neutral-900-200 text-neutral-900-900 font-bold' : 'bg-white border-transparent hover:bg-slate-100 text-slate-600'}
                      `}
                    >
                      {day}
                      {hasEvent && <span className="absolute bottom-1 w-1 h-1 bg-neutral-900-600 rounded-full"></span>}
                    </button>
                  )
              })}
           </div>
           <p className="text-xs text-slate-400 mt-6 text-center border-t border-slate-100 pt-4">
             Tap on any date to schedule a new session.
           </p>
        </div>

      </div>

      {/* --- CREATE WORKSHOP MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Schedule Workshop</h3>
                <p className="text-sm text-slate-500">Create a new session for your students.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateWorkshop} className="p-6 space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Workshop Title</label>
                <input 
                  required
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Mastering React Hooks"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-900-500 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input 
                    required
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-900-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                  <input 
                    required
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-900-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mode</label>
                  <select 
                    name="mode"
                    value={formData.mode}
                    onChange={handleInputChange}
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-neutral-900-500 outline-none"
                  >
                    <option value="Online">Online (Video)</option>
                    <option value="Offline">Offline (Campus)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0 for Free"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-900-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                <textarea 
                  rows="2"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="What will be covered?"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-900-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2.5 bg-neutral-900-600 text-neutral-900 font-bold rounded-lg hover:bg-neutral-900-700 shadow-md transition flex justify-center items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Schedule Workshop
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-Component: Individual Workshop Card ---
const WorkshopCard = ({ workshop, generateCode, onDelete }) => {
  // Logic: If date matches today (mocked as 2025-11-21 for demo) or status is explicitly 'Live'
  // In a real app, you would compare new Date() vs workshop.date
  const isLive = workshop.status === 'Live'; 
  const uniqueCode = generateCode(workshop.id);

  return (
    <div className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition bg-white group relative">
      
      {/* Delete Button (Hidden by default, shows on hover) */}
      <button 
        onClick={() => onDelete(workshop.id)}
        className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition"
        title="Cancel Workshop"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <div className="flex justify-between items-start mb-3 pr-8">
        <div>
           <h4 className="font-bold text-slate-900 text-lg">{workshop.title}</h4>
           <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
             <span className="flex items-center gap-1.5"><CalIcon className="w-4 h-4 text-neutral-900-500"/> {workshop.date}</span>
             <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-neutral-900-500"/> {workshop.time}</span>
             <span className="flex items-center gap-1.5">
               {workshop.mode === 'Online' ? <Video className="w-4 h-4 text-neutral-900-500"/> : <MapPin className="w-4 h-4 text-neutral-900-500"/>} 
               {workshop.mode}
             </span>
           </div>
        </div>
        <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide ${isLive ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-neutral-900-50 text-neutral-900-600'}`}>
          {workshop.status}
        </span>
      </div>

      {/* --- CALLORA MEETING LOGIC --- */}
      {isLive ? (
        <div className="mt-4 p-4 bg-neutral-900-50 border border-neutral-900-100 rounded-lg relative overflow-hidden">
           {/* Decorative Background Element */}
           <div className="absolute -right-6 -top-6 w-24 h-24 bg-neutral-900-100 rounded-full opacity-50 blur-xl pointer-events-none"></div>

           <div className="flex justify-between items-center mb-3 relative z-10">
             <span className="text-xs font-bold text-neutral-900-800 uppercase tracking-wider flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Session Active
             </span>
             <span className="text-xs text-neutral-900-600 font-medium">Starts in &lt; 15 mins</span>
           </div>
           
           <div className="flex items-center gap-2 mb-3 relative z-10">
             <div className="flex-1 bg-white border border-neutral-900-200 px-3 py-2 rounded-lg flex justify-between items-center shadow-sm">
                <span className="text-xs text-slate-400 font-medium uppercase">Meeting Code:</span>
                <code className="font-mono text-neutral-900-700 font-bold text-lg tracking-wide select-all">
                  {uniqueCode}
                </code>
             </div>
             <button 
               className="p-3 bg-neutral-200 border border-neutral-900-200 rounded-lg text-neutral-900-600 hover:bg-neutral-900-100 hover:border-neutral-900-300 transition shadow-sm" 
               title="Copy Code"
               onClick={() => { navigator.clipboard.writeText(uniqueCode); alert('Code copied!'); }}
             >
               <Copy className="w-5 h-5" />
             </button>
           </div>

           <a 
             href="https://callora.vercel.app/" 
             target="_blank" 
             rel="noopener noreferrer"
             className="relative z-10 block w-full text-center bg-neutral-700 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-neutral-900-700 hover:shadow-lg transition items-center justify-center gap-2"
           >
             Launch Callora Meeting <ExternalLink className="w-4 h-4" />
           </a>
           <p className="relative z-10 text-[10px] text-center text-neutral-900-400 mt-2">
             * This unique code allows entry for paid members only.
           </p>
        </div>
      ) : (
        /* Standard Footer for Non-Live Events */
        <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
           <div className="flex items-center gap-2">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>)}
             </div>
             <span className="text-xs text-slate-500 font-medium">{workshop.attendees} Registered</span>
           </div>
           <div className="flex items-center gap-2">
             <span className="text-sm font-bold text-slate-900">
               {workshop.price > 0 ? `₹${workshop.price}` : 'Free'}
             </span>
             <button className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-md font-medium hover:bg-slate-200 transition">
               Details
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

// --- Reusable Stat Box ---
// eslint-disable-next-line no-unused-vars
const StatBox = ({ label, value, icon: Icon, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
        purple: 'bg-purple-50 text-purple-600',
    };
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition">
            <div className={`p-3 rounded-lg ${colors[color]}`}><Icon className="w-6 h-6" /></div>
            <div>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-xs font-medium text-slate-500">{label}</p>
            </div>
        </div>
    )
}

export default WorkshopManager;