import React from 'react';
import { 
  Users, 
  DollarSign, 
  Video, 
  Award, 
  MessageSquare, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Briefcase,
  UserPlus,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';

// --- Mock Data ---

// Analytics: Earnings vs Attendees per month
const performanceData = [
  { month: 'Jan', attendees: 45, earnings: 12000 },
  { month: 'Feb', attendees: 52, earnings: 15000 },
  { month: 'Mar', attendees: 38, earnings: 9500 },
  { month: 'Apr', attendees: 65, earnings: 21000 },
  { month: 'May', attendees: 48, earnings: 13500 },
  { month: 'Jun', attendees: 70, earnings: 25000 },
];

const upcomingWorkshops = [
  { id: 1, title: "Breaking into Product Management", date: "24 Nov, 2025", time: "10:00 AM", registered: 42 },
  { id: 2, title: "Mock Interview Session: SDE-1", date: "02 Dec, 2025", time: "06:00 PM", registered: 15 },
];

const studentRequests = [
  { id: 1, name: "Rohan Sharma", year: "3rd Year", msg: "Need help with System Design basics.", avatar: "R" },
  { id: 2, name: "Priya Singh", year: "4th Year", msg: "Resume review request for Google.", avatar: "P" },
  { id: 3, name: "Amit Verma", year: "2nd Year", msg: "Guidance on AI/ML roadmap.", avatar: "A" },
];

const matchingStudents = [
  { id: 101, name: "Vikram Malhotra", skills: ["React", "Node.js"], match: "95%", interest: "Full Stack Dev" },
  { id: 102, name: "Sneha Gupta", skills: ["Python", "Django"], match: "88%", interest: "Backend Engineering" },
];

const AlumniDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-slate-900">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, Vanshika 👋</h1>
          <p className="text-slate-500">Your impact summary and upcoming schedule.</p>
        </div>
        <button className="bg-neutral-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-neutral-700 flex items-center gap-2 shadow-sm transition">
          <Video className="w-4 h-4" />
          Create New Workshop
        </button>
      </div>

      {/* Stats Grid - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={Video} title="Workshops" value="12" sub="Total Conducted" color="text-neutral-600" bg="bg-neutral-50" />
        <StatCard icon={DollarSign} title="Total Earnings" value="₹45,200" sub="Lifetime Revenue" color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard icon={Users} title="Students Helped" value="340" sub="+24 this month" color="text-purple-600" bg="bg-purple-50" />
        <StatCard icon={MessageSquare} title="Interactions" value="1,250" sub="Chats & Comments" color="text-orange-600" bg="bg-orange-50" />
        
        {/* Profile Completion Card - Special Design */}
        <div className="bg-linear-to-br from-neutral-600 to-neutral-800 p-4 rounded-xl text-white shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
              <Award className="w-6 h-6 text-neutral-200" />
              <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">High</span>
            </div>
            <h3 className="text-2xl font-bold mb-1">85%</h3>
            <p className="text-neutral-100 text-xs mb-2">Profile Completed</p>
            <button className="text-xs font-medium underline hover:text-neutral-200">Complete Now</button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Analytics Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neutral-500" />
                Workshop Performance
              </h3>
              <select className="text-sm border-gray-300 rounded-md text-slate-500 bg-gray-50 px-2 py-1">
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} unit="₹" />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="attendees" name="Attendees" barSize={30} fill="#818cf8" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="earnings" name="Earnings (₹)" stroke="#10b981" strokeWidth={3} dot={{r: 4}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Two Columns within Left Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Workshops */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="font-bold text-slate-800 mb-4">Upcoming Workshops</h3>
              <div className="space-y-4">
                {upcomingWorkshops.map((ws) => (
                  <div key={ws.id} className="p-4 rounded-lg border border-gray-100 bg-gray-50 hover:border-neutral-200 transition">
                    <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-1">{ws.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ws.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ws.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-neutral-600 bg-neutral-50 px-2 py-1 rounded">
                        {ws.registered} Registered
                      </span>
                      <button className="text-xs font-medium text-slate-600 hover:text-neutral-600">Edit Details</button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-slate-500 border border-dashed border-gray-300 rounded-lg hover:bg-gray-50 hover:text-neutral-600 transition">
                  + Schedule New Session
                </button>
              </div>
            </div>

            {/* Matching Students (Recommendations) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-slate-800">Recommended Mentees</h3>
                <span className="text-xs text-slate-400">Based on your profile</span>
              </div>
              <div className="space-y-4">
                {matchingStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-100 to-neutral-100 flex items-center justify-center text-slate-600 font-bold text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.interest}</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-full transition">
                      <UserPlus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button className="w-full mt-2 text-xs font-medium text-neutral-600 flex items-center justify-center gap-1 hover:underline">
                  View All Matches <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          
          </div>
        </div>

        {/* RIGHT COLUMN (1/3 width) - Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Guidance Requests - Actionable List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">Guidance Requests</h3>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 New</span>
            </div>
            
            <div className="space-y-6">
              {studentRequests.map((req) => (
                <div key={req.id} className="relative pl-4 border-l-2 border-neutral-100">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{req.name}</p>
                      <p className="text-xs text-slate-500">{req.year}</p>
                    </div>
                    <span className="text-[10px] text-slate-400">2h ago</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 bg-gray-50 p-2 rounded italic">
                    "{req.msg}"
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-neutral-600 text-white text-xs py-1.5 rounded hover:bg-neutral-700 transition flex justify-center items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Accept
                    </button>
                    <button className="flex-1 bg-white border border-slate-200 text-slate-600 text-xs py-1.5 rounded hover:bg-slate-50 transition flex justify-center items-center gap-1">
                      <XCircle className="w-3 h-3" /> Ignore
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <button className="text-xs text-slate-500 hover:text-slate-800">View Archived Requests</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Widget Component
// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, title, value, sub, color, bg }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <div className={`p-2.5 rounded-lg ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
    <div>
      <h3 className="text-2xl font-bold text-slate-900 mb-0.5">{value}</h3>
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className={`text-[10px] mt-1 ${color}`}>{sub}</p>
    </div>
  </div>
);

export default AlumniDashboard;