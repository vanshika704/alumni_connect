import React from 'react';
import { 
  Users, 
  GraduationCap, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Briefcase, 
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
  Bell
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area,
  LineChart, Line
} from 'recharts';

// --- Mock Data ---

// Radar Chart: Industry Demands vs Student Skills
const skillGapData = [
  { subject: 'Python/AI', required: 90, actual: 65, fullMark: 100 },
  { subject: 'React/Web', required: 85, actual: 80, fullMark: 100 },
  { subject: 'Communication', required: 95, actual: 50, fullMark: 100 }, // Critical Gap
  { subject: 'System Design', required: 70, actual: 40, fullMark: 100 },
  { subject: 'Data Structures', required: 80, actual: 75, fullMark: 100 },
  { subject: 'Cloud/AWS', required: 85, actual: 55, fullMark: 100 },
];

// Bar Chart: Department Readiness
const deptReadinessData = [
  { name: 'CSE', placed: 45, ready: 70, total: 120 },
  { name: 'ECE', placed: 30, ready: 50, total: 100 },
  { name: 'Mech', placed: 20, ready: 40, total: 90 },
  { name: 'Civil', placed: 15, ready: 35, total: 80 },
];

// Area Chart: Workshop Impact (Attendance vs Skill Assessment improvement)
const workshopImpactData = [
  { month: 'Jan', attendees: 120, skillScore: 40 },
  { month: 'Feb', attendees: 150, skillScore: 45 },
  { month: 'Mar', attendees: 200, skillScore: 55 },
  { month: 'Apr', attendees: 180, skillScore: 60 },
  { month: 'May', attendees: 250, skillScore: 75 },
  { month: 'Jun', attendees: 300, skillScore: 82 },
];

const topAlumni = [
  { name: "Aditya R.", role: "Sr. Engineer @ Google", contributions: 45, impact: "High" },
  { name: "Sanya K.", role: "Product @ Uber", contributions: 38, impact: "High" },
  { name: "Rahul M.", role: "Founder @ TechFlow", contributions: 32, impact: "Med" },
];

const recentAlerts = [
  { id: 1, type: "Critical", msg: "Skill Gap Alert: 'Soft Skills' in CSE Dept is 40% below industry standard.", time: "2 hrs ago" },
  { id: 2, type: "Warning", msg: "Low participation in 'Resume Building' workshop (ECE Batch 2025).", time: "5 hrs ago" },
  { id: 3, type: "Info", msg: "New Alumni wave: 50+ registrations from Microsoft.", time: "1 day ago" },
];

const UniversityAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">University Intelligence Hub</h1>
          <p className="text-slate-500">Live monitoring of Alumni-Student ecosystem</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-white border border-slate-200 rounded-full relative hover:bg-slate-50">
            <Bell className="w-5 h-5 text-slate-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            UNI
          </div>
        </div>
      </header>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Verified Alumni" 
          value="4,250" 
          trend="+12% this month" 
          icon={GraduationCap} 
          color="text-indigo-600" 
          bg="bg-indigo-50"
          trendUp={true}
        />
        <StatCard 
          title="Active Students" 
          value="2,800" 
          trend="92% Engagement Rate" 
          icon={Users} 
          color="text-blue-600" 
          bg="bg-blue-50"
          trendUp={true}
        />
        <StatCard 
          title="Workshops Held" 
          value="145" 
          trend="Avg Rating: 4.8/5" 
          icon={Calendar} 
          color="text-emerald-600" 
          bg="bg-emerald-50"
          trendUp={true}
        />
        <StatCard 
          title="Critical Skill Gaps" 
          value="3" 
          trend="Urgent Attention" 
          icon={AlertTriangle} 
          color="text-red-600" 
          bg="bg-red-50"
          trendUp={false}
        />
      </div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* 1. Skill Gap Radar (Priority Visual) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Radar className="w-5 h-5 text-indigo-500" />
              Curriculum vs. Industry
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillGapData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Industry Demand" dataKey="required" stroke="#6366f1" fill="#6366f1" fillOpacity={0.1} />
                <Radar name="Student Actual" dataKey="actual" stroke="#ec4899" fill="#ec4899" fillOpacity={0.4} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">
            <span className="text-pink-500 font-medium">Pink zone</span> shows current student capability. 
            <span className="text-indigo-500 font-medium"> Blue line</span> is market requirement.
          </p>
        </div>

        {/* 2. Department Readiness & Placements */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Department-wise Career Readiness</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptReadinessData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend />
                <Bar dataKey="total" name="Total Students" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ready" name="Job Ready (Skills)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" name="Already Placed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Workshop Impact */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Workshop Impact vs. Skill Adoption</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={workshopImpactData}>
                <defs>
                  <linearGradient id="colorSkill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="skillScore" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSkill)" />
                <Line type="monotone" dataKey="attendees" stroke="#f59e0b" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Alumni */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Top Contributing Alumni</h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {topAlumni.map((alumni, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {alumni.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{alumni.name}</p>
                    <p className="text-xs text-slate-500">{alumni.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">{alumni.contributions} Interactions</p>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {alumni.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Registrations */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-4">Recent Alumni Registrations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Batch</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Designation</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1,2,3].map((i) => (
                  <tr key={i} className="group hover:bg-slate-50">
                    <td className="py-3 font-medium text-slate-900">Alumni User {i}</td>
                    <td className="py-3 text-slate-500">2019</td>
                    <td className="py-3 text-slate-500">Microsoft</td>
                    <td className="py-3 text-slate-500">SDE II</td>
                    <td className="py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
          <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Intelligence Alerts
          </h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                <div className="flex justify-between items-start">
                  <p className={`text-xs font-bold mb-1 ${alert.type === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>
                    {alert.type.toUpperCase()}
                  </p>
                  <span className="text-xs text-slate-400">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-700 font-medium leading-tight">
                  {alert.msg}
                </p>
              </div>
            ))}
            <button className="w-full mt-4 py-2 bg-white text-red-600 text-sm font-medium rounded border border-red-200 hover:bg-red-50 transition">
              View All Risks
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Widget Component
// eslint-disable-next-line no-unused-vars
const StatCard = ({ title, value, trend, icon: Icon, color, bg, trendUp }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      {trendUp !== undefined && (
        <div className={`flex items-center text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
        </div>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <div className="flex items-end gap-2">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500 mb-1">{trend}</span>
    </div>
  </div>
);

export default UniversityAdminDashboard;