import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, MessageSquare, Briefcase, 
  BookOpen, Code, FileText, Filter, Clock, ChevronRight 
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer, PolarRadiusAxis 
} from 'recharts';

// --- Mock Data ---
const initialRequests = [
  { 
    id: 1, 
    name: "Rohan Das", 
    year: "3rd Year",
    type: "Referral", 
    goal: "SDE @ Fintech",
    message: "I noticed your team at Razorpay is hiring. I have 2 years of React exp.",
    posted: "2h ago",
    skillsData: [
      { subject: 'DSA', A: 80, fullMark: 100 },
      { subject: 'Dev', A: 90, fullMark: 100 },
      { subject: 'Comms', A: 60, fullMark: 100 },
      { subject: 'Sys Design', A: 50, fullMark: 100 },
    ]
  },
  { 
    id: 2, 
    name: "Ananya Singh", 
    year: "4th Year",
    type: "Mentorship", 
    goal: "AI Researcher",
    message: "Need guidance on structuring my final year Thesis on NLP.",
    posted: "1d ago",
    skillsData: [
      { subject: 'DSA', A: 70, fullMark: 100 },
      { subject: 'Dev', A: 40, fullMark: 100 },
      { subject: 'ML/AI', A: 95, fullMark: 100 },
      { subject: 'Research', A: 85, fullMark: 100 },
    ]
  },
  { 
    id: 3, 
    name: "Vikram Malhotra", 
    year: "2nd Year",
    type: "Doubt Solving", 
    goal: "Backend Dev",
    message: "Stuck on a Graph DP problem. Can we connect for 15 mins?",
    posted: "5h ago",
    skillsData: [
      { subject: 'DSA', A: 40, fullMark: 100 },
      { subject: 'Dev', A: 65, fullMark: 100 },
      { subject: 'Comms', A: 70, fullMark: 100 },
      { subject: 'Logic', A: 60, fullMark: 100 },
    ]
  },
  { 
    id: 4, 
    name: "Sneha Gupta", 
    year: "4th Year",
    type: "Portfolio Review", 
    goal: "Product Designer",
    message: "Would love feedback on my Behance case studies.",
    posted: "30m ago",
    skillsData: [
      { subject: 'UI/UX', A: 90, fullMark: 100 },
      { subject: 'Frontend', A: 50, fullMark: 100 },
      { subject: 'Comms', A: 85, fullMark: 100 },
      { subject: 'Product', A: 80, fullMark: 100 },
    ]
  },
];

const StudentRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filterType, setFilterType] = useState('All');

  // Filter Logic
  const filteredRequests = filterType === 'All' 
    ? requests 
    : requests.filter(r => r.type === filterType);

  // Handlers
  const handleAction = (id, action) => {
    const newRequests = requests.filter(r => r.id !== id);
    setRequests(newRequests);
    // In real app: API call to update status
    alert(`${action} request from Student ID: ${id}`);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Referral': return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'Mentorship': return <BookOpen className="w-4 h-4 text-purple-600" />;
      case 'Doubt Solving': return <Code className="w-4 h-4 text-orange-600" />;
      case 'Portfolio Review': return <FileText className="w-4 h-4 text-pink-600" />;
      default: return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'Referral': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Mentorship': return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Doubt Solving': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'Portfolio Review': return 'bg-pink-50 text-pink-700 border-pink-100';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Incoming Requests</h1>
          <p className="text-slate-500">Manage student inquiries and opportunities.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Referral', 'Mentorship', 'Doubt Solving', 'Portfolio Review'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition border ${
                filterType === type 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {filteredRequests.length === 0 ? (
          <div className="col-span-2 text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">No pending requests found.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col hover:shadow-md transition duration-300">
              
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-600">
                    {req.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">{req.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{req.year}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${getTypeColor(req.type)}`}>
                  {getTypeIcon(req.type)}
                  {req.type}
                </div>
              </div>

              {/* Content Body */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Left: Details */}
                <div className="col-span-2 space-y-4">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Career Goal</label>
                    <p className="font-semibold text-slate-800">{req.goal}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-sm text-slate-600 italic">"{req.message}"</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" /> Posted {req.posted}
                  </div>
                </div>

                {/* Right: Skill Graph (Radar Chart) */}
                <div className="col-span-1 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-slate-100 relative p-1">
                  <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-400">Skill Fit</div>
                  <div className="w-full h-28">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={req.skillsData}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="subject" tick={{fontSize: 0}} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                        <Radar
                          name="Skills"
                          dataKey="A"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.4}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <button className="text-[10px] text-indigo-600 font-bold hover:underline">View Details</button>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-auto flex gap-3 pt-4 border-t border-slate-100">
                <button 
                  onClick={() => handleAction(req.id, 'Rejected')}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition flex justify-center items-center gap-2"
                >
                  <XCircle className="w-4 h-4" /> Decline
                </button>
                <button 
                  onClick={() => handleAction(req.id, 'Accepted')}
                  className="flex-1 py-2.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-indigo-600 transition flex justify-center items-center gap-2 shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Accept
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentRequests;