import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Github, FileText, Send, Award, 
  User, Star, Briefcase, X
} from 'lucide-react';

// --- Mock Data ---
const studentsData = [
  { id: 1, name: "Arjun Mehta", branch: "CSE", year: "3rd", readiness: 88, skills: ["React", "Node.js", "AWS"], goal: "SDE at Product Co.", github: "github.com/arjun" },
  { id: 2, name: "Sara Ali", branch: "ECE", year: "4th", readiness: 94, skills: ["Python", "ML", "PyTorch", "OpenCV"], goal: "AI Researcher", github: "github.com/sara" },
  { id: 3, name: "Dev Patel", branch: "CSE", year: "2nd", readiness: 20, skills: ["C++ Basics"], goal: "Backend Dev", github: "github.com/dev" },
  { id: 4, name: "Kavya S.", branch: "Mech", year: "4th", readiness: 65, skills: ["AutoCAD", "Python", "Robotics"], goal: "Robotics Eng.", github: "github.com/kavya" },
  { id: 5, name: "Rohan Gupta", branch: "CSE", year: "4th", readiness: 45, skills: ["Java", "SQL"], goal: "Fintech Eng.", github: "github.com/rohan" },
  { id: 6, name: "Priya Sharma", branch: "Civil", year: "3rd", readiness: 15, skills: ["Revit"], goal: "Structural Eng.", github: "github.com/priya" },
];

const StudentExplorer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    year: 'All',
    branch: 'All Branches',
    minReadiness: 0
  });
  const [selectedStudent, setSelectedStudent] = useState(null);

  // --- Filter Logic ---
  const filteredStudents = useMemo(() => {
    return studentsData.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            student.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesYear = filters.year === 'All' || student.year === filters.year.replace(' Year', '');
      const matchesBranch = filters.branch === 'All Branches' || student.branch === filters.branch.split(' ')[0];
      const matchesReadiness = student.readiness >= filters.minReadiness;

      return matchesSearch && matchesYear && matchesBranch && matchesReadiness;
    });
  }, [searchTerm, filters]);

  // --- Stats Calculation ---
  const avgReadiness = Math.round(filteredStudents.reduce((acc, s) => acc + s.readiness, 0) / (filteredStudents.length || 1));
  const topTalentCount = filteredStudents.filter(s => s.readiness > 75).length;

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 flex items-center gap-2">
                Student Directory 
                <span className="bg-neutral-200 text-neutral-800 text-xs px-2 py-1 rounded-full font-medium border border-neutral-300">
                  {filteredStudents.length} Found
                </span>
              </h1>
              <p className="text-neutral-500 text-sm">Discover and mentor the next generation of talent.</p>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative group w-full md:w-72">
                <Search className="absolute left-3 top-2.5 text-neutral-400 w-4 h-4 group-focus-within:text-neutral-800 transition" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search name, skill, or role..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-neutral-500 focus:border-transparent outline-none transition placeholder-neutral-400" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* 2. Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard label="Total Candidates" value={studentsData.length} icon={User} />
          <StatCard label="Top Talent (>75%)" value={topTalentCount} icon={Star} />
          <StatCard label="Avg. Readiness" value={`${avgReadiness}%`} icon={Award} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 3. Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-neutral-800 flex items-center gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </h3>
                <button 
                  onClick={() => setFilters({ year: 'All', branch: 'All Branches', minReadiness: 0 })}
                  className="text-xs text-neutral-600 font-bold hover:text-neutral-900 underline decoration-dotted"
                >
                  Reset
                </button>
              </div>
              
              {/* Academic Year */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Academic Year</h4>
                <div className="space-y-2">
                  {['All', '1st', '2nd', '3rd', '4th'].map(y => (
                    <label key={y} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition group">
                      <input 
                        type="radio" 
                        name="year" 
                        checked={filters.year === y} 
                        onChange={() => setFilters({...filters, year: y})}
                        className="w-4 h-4 text-neutral-800 border-neutral-300 focus:ring-neutral-500 accent-neutral-800" 
                      />
                      <span className={`text-sm font-medium group-hover:text-neutral-900 ${filters.year === y ? 'text-neutral-900' : 'text-neutral-500'}`}>
                        {y === 'All' ? 'All Years' : `${y} Year`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Branch */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">Department</h4>
                <select 
                  value={filters.branch}
                  onChange={(e) => setFilters({...filters, branch: e.target.value})}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-neutral-500"
                >
                  <option>All Branches</option>
                  <option>Computer Science (CSE)</option>
                  <option>Electronics (ECE)</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                </select>
              </div>

              {/* Readiness Slider */}
              <div>
                 <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Min Readiness</h4>
                    <span className="text-xs font-bold text-white bg-neutral-800 px-2 py-1 rounded">{filters.minReadiness}%</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={filters.minReadiness}
                   onChange={(e) => setFilters({...filters, minReadiness: Number(e.target.value)})}
                   className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-800" 
                 />
                 <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-medium">
                   <span>Junior</span>
                   <span>Pro</span>
                 </div>
              </div>
            </div>
          </div>

          {/* 4. Students Grid */}
          <div className="lg:col-span-3">
            {filteredStudents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-neutral-300">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4 text-neutral-400">
                   <User className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">No students found</h3>
                <p className="text-neutral-500 text-sm">Try adjusting your filters to see more results.</p>
                <button 
                  onClick={() => setFilters({ year: 'All', branch: 'All Branches', minReadiness: 0 })}
                  className="mt-4 text-neutral-800 font-bold text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStudents.map((student) => (
                  <StudentCard 
                    key={student.id} 
                    student={student} 
                    onConnect={() => setSelectedStudent(student)} 
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 5. Connect Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 border border-neutral-200">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-lg font-bold text-neutral-900">Reach out to {selectedStudent.name.split(' ')[0]}</h3>
                 <button onClick={() => setSelectedStudent(null)} className="text-neutral-400 hover:text-neutral-800 transition"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="flex items-center gap-3 mb-6 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                 <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold text-sm">
                    {selectedStudent.name.charAt(0)}
                 </div>
                 <div>
                    <p className="text-sm font-bold text-neutral-900">{selectedStudent.name}</p>
                    <p className="text-xs text-neutral-500">{selectedStudent.goal}</p>
                 </div>
              </div>
              
              <textarea 
                className="w-full h-32 p-3 border border-neutral-300 rounded-xl text-sm outline-none focus:border-neutral-800 focus:ring-1 focus:ring-neutral-800 resize-none mb-4 bg-white placeholder-neutral-400"
                placeholder="Hi, I noticed your profile and skills..."
                defaultValue={`Hi ${selectedStudent.name.split(' ')[0]}, \n\nI saw your profile and was impressed by your readiness score in ${selectedStudent.skills[0]}. I have an opportunity that might fit you.\n\nBest,\n[Alumni Name]`}
              ></textarea>
              
              <button onClick={() => {alert("Message Sent!"); setSelectedStudent(null)}} className="w-full py-3 bg-neutral-800 text-white font-bold rounded-xl hover:bg-neutral-900 transition flex justify-center items-center gap-2 shadow-sm">
                 <Send className="w-4 h-4" /> Send Message
              </button>
           </div>
        </div>
      )}

    </div>
  );
};

// --- Components ---

const StudentCard = ({ student, onConnect }) => {
  
  // 🎨 Color Logic: <25 Blue, 25-75 Orange, >75 Green
  const getReadinessStyles = (score) => {
    if (score > 75) return { bg: 'bg-green-500', text: 'text-green-600' };
    if (score >= 25) return { bg: 'bg-orange-500', text: 'text-orange-600' };
    return { bg: 'bg-blue-500', text: 'text-blue-600' };
  };

  const styles = getReadinessStyles(student.readiness);

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          {/* Neutral Avatar */}
          <div className="w-12 h-12 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 font-bold text-lg group-hover:bg-neutral-800 group-hover:text-white transition-colors duration-300">
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 group-hover:text-neutral-600 transition">{student.name}</h3>
            <p className="text-xs text-neutral-500 font-medium">{student.branch} • {student.year} Year</p>
          </div>
        </div>
        
        {/* Github Link */}
        <a href={`https://${student.github}`} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 transition bg-neutral-50 p-2 rounded-lg">
          <Github className="w-4 h-4" />
        </a>
      </div>

      {/* Readiness Section */}
      <div className="mb-5">
        <div className="flex justify-between text-xs font-bold text-neutral-600 mb-1.5">
           <span>Job Readiness</span>
           <span className={styles.text}>{student.readiness}%</span>
        </div>
        <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
           <div 
             className={`h-full rounded-full ${styles.bg}`} 
             style={{ width: `${student.readiness}%` }}
           ></div>
        </div>
      </div>

      {/* Skills & Goal */}
      <div className="flex-1 mb-5">
         <div className="flex items-center gap-2 mb-3">
           <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
           <p className="text-sm font-medium text-neutral-700">{student.goal}</p>
         </div>
         <div className="flex flex-wrap gap-2">
           {student.skills.slice(0, 4).map(skill => (
             <span key={skill} className="px-2.5 py-1 bg-neutral-50 text-neutral-600 text-xs font-semibold rounded-lg border border-neutral-200">
               {skill}
             </span>
           ))}
           {student.skills.length > 4 && <span className="text-xs text-neutral-400 px-1">+{student.skills.length - 4}</span>}
         </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 mt-auto">
         <button 
           onClick={onConnect}
           className="flex-1 bg-neutral-800 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-neutral-900 transition flex items-center justify-center gap-2 shadow-sm"
         >
           <Send className="w-3.5 h-3.5" /> Reach Out
         </button>
         <button 
            className="p-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition bg-white" 
            title="View Resume"
         >
            <FileText className="w-4 h-4" />
         </button>
      </div>
    </div>
  );
};

// eslint-disable-next-line no-unused-vars
const StatCard = ({ label, value, icon: Icon }) => {
   return (
     <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-4 hover:border-neutral-300 transition">
        <div className="p-3 rounded-xl bg-neutral-100 text-neutral-700">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-2xl font-bold text-neutral-900">{value}</p>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">{label}</p>
        </div>
     </div>
   );
};

export default StudentExplorer;