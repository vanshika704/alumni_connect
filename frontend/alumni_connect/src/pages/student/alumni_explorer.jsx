import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  User,
  GraduationCap,
  Building2,
  Sparkles,
  X
} from 'lucide-react';

// --- Mock Data ---
const MOCK_ALUMNI = [
  {
    id: 1,
    name: "Aditya Sharma",
    role: "Senior SDE",
    company: "Microsoft",
    batch: "2019",
    location: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Azure", "C#", "System Design"],
    experience: "5 Years",
    domain: "Engineering",
    featured: true
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Manager",
    company: "Uber",
    batch: "2020",
    location: "Hyderabad, India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Product Strategy", "Analytics", "UX"],
    experience: "4 Years",
    domain: "Product",
    featured: false
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Data Scientist",
    company: "Amazon",
    batch: "2021",
    location: "Seattle, USA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Python", "ML", "AWS"],
    experience: "3 Years",
    domain: "Data Science",
    featured: false
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Frontend Engineer",
    company: "Airbnb",
    batch: "2022",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["React", "TypeScript", "Design Systems"],
    experience: "2 Years",
    domain: "Engineering",
    featured: true
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Associate",
    company: "Goldman Sachs",
    batch: "2018",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Valuation", "Equity Research"],
    experience: "6 Years",
    domain: "Finance",
    featured: false
  },
  {
    id: 6,
    name: "Sanya Mirza",
    role: "UX Researcher",
    company: "Spotify",
    batch: "2020",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["User Testing", "Figma", "Prototyping"],
    experience: "4 Years",
    domain: "Design",
    featured: false
  }
];

const FILTERS = [
  {
    id: 'domain',
    label: 'Domain',
    options: ['Engineering', 'Product', 'Data Science', 'Design', 'Finance']
  },
  {
    id: 'batch',
    label: 'Class Batch',
    options: ['2024', '2023', '2022', '2021', '2020', 'Older']
  },
  {
    id: 'location',
    label: 'Location',
    options: ['Bangalore', 'Mumbai', 'Delhi NCR', 'USA', 'Remote']
  }
];

// --- COMPONENTS ---

const FilterSection = ({ title, options, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-slate-100 py-5 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-bold text-slate-800 hover:text-neutral-600 transition-colors group"
      >
        {title}
        <span className={`p-1 rounded-full group-hover:bg-neutral-50 transition-all ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronDown size={14} />
        </span>
      </button>
      
      {/* Smooth collapse animation */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2.5">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none h-4 w-4 border border-slate-300 rounded bg-white checked:bg-neutral-600 checked:border-neutral-600 focus:ring-2 focus:ring-neutral-100 transition-all"
                />
                <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

const AlumniCard = ({ data, onClick }) => (
  <div 
    onClick={() => onClick(data)}
    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-neutral-100 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group cursor-pointer relative overflow-hidden"
  >
    {/* Featured Badge */}
    {data.featured && (
      <div className="absolute top-0 right-0 bg-linear-to-bl from-neutral-600 to-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">
        TOP MENTOR
      </div>
    )}

    {/* Card Header with Cover Effect */}
    <div className="h-24 bg-linear-to-r from-slate-50 to-slate-100 relative">
       <div className="absolute inset-0 bg-grid-slate-200/[0.5] mask-[linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
    </div>

    <div className="px-6 pb-6 flex flex-col grow -mt-12 relative">
      {/* Avatar */}
      <div className="flex justify-between items-end mb-3">
        <div className="w-20 h-20 rounded-2xl p-1 bg-white shadow-md">
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full rounded-xl object-cover"
          />
        </div>
        <div className="mb-1 text-right">
           <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
             <GraduationCap size={12} /> '{data.batch.slice(2)}
           </span>
        </div>
      </div>
      
      {/* Info */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-neutral-600 transition-colors">{data.name}</h3>
        <p className="text-sm font-medium text-slate-600 flex items-center gap-1.5 mt-0.5">
           {data.role}
        </p>
        <p className="text-xs text-slate-400 font-medium flex items-center gap-1 mt-1">
           <Building2 size={12} /> {data.company}
        </p>
      </div>
      
      {/* Location & Exp */}
      <div className="flex items-center gap-3 mt-4 text-xs font-medium text-slate-500 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
            <MapPin size={12} className="text-neutral-500" />
            <span>{data.location}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
            <Briefcase size={12} className="text-neutral-500" />
            <span>{data.experience}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
          {data.skills.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-semibold text-slate-600 group-hover:border-neutral-100 transition-colors">
                  {skill}
              </span>
          ))}
          {data.skills.length > 3 && (
              <span className="px-2 py-1 bg-slate-50 rounded-md text-[10px] font-semibold text-slate-400">
                  +{data.skills.length - 3}
              </span>
          )}
      </div>

      {/* Hover Actions */}
      <div className="mt-5 pt-4 border-t border-slate-50 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-slate-900 transition-all">
          <User size={14} /> Profile
        </button>
        <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-neutral-600 shadow-sm hover:shadow-neutral-200 transition-all">
          <MessageCircle size={14} /> Connect
        </button>
      </div>
    </div>
  </div>
);

export default function AlumniExplorer({ onViewProfile }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 relative">
      
      {/* --- Background Decorations --- */}
      <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-neutral-50/50 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                   Alumni <span className="text-neutral-600">Network</span>
                </h1>
                <p className="text-slate-500 mt-3 text-lg leading-relaxed">
                   Connect with <span className="font-semibold text-slate-900">1,200+ alumni</span> working at top companies. Find a mentor who has walked your path.
                </p>
            </div>
            
            {/* Mobile Filter Toggle */}
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50"
            >
                <Filter size={16} /> Filter Results
            </button>
        </div>

        {/* Search Bar Area */}
        <div className="bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-2 max-w-4xl mb-10 mx-auto transform -translate-y-2 sticky top-4 z-20">
            <div className="pl-4 text-slate-400">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search by name, company, role, or skills..."
                className="flex-1 py-3 px-2 bg-transparent outline-none text-slate-700 placeholder-slate-400 font-medium"
            />
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-neutral-600 transition-colors shadow-md">
                Search
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            
            {/* Left Sidebar: Filters (Desktop) */}
            <aside className="hidden lg:block col-span-1 sticky top-28">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                            <Filter size={20} className="text-neutral-600" />
                            <span>Filters</span>
                        </div>
                        <button className="text-xs font-bold text-slate-400 hover:text-neutral-600 uppercase tracking-wide transition-colors">
                            Reset
                        </button>
                    </div>
                    
                    {FILTERS.map((filter) => (
                        <FilterSection 
                            key={filter.id} 
                            title={filter.label} 
                            options={filter.options}
                            isOpenDefault={['domain', 'batch'].includes(filter.id)} 
                        />
                    ))}
                </div>
            </aside>

            {/* Main Grid */}
            <section className="col-span-1 lg:col-span-3">
                <div className="flex items-center justify-between mb-6 px-1">
                    <p className="text-sm font-medium text-slate-500">
                        Showing <span className="font-bold text-slate-900">142</span> alumni
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500 font-medium">Sort:</span>
                        <select className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none cursor-pointer hover:text-neutral-600">
                            <option>Relevance</option>
                            <option>Newest First</option>
                            <option>Experience (High-Low)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MOCK_ALUMNI.map((alumni) => (
                        <AlumniCard 
                            key={alumni.id} 
                            data={alumni} 
                            onClick={onViewProfile} 
                        />
                    ))}
                </div>

                {/* Load More */}
                <div className="mt-12 flex justify-center">
                    <button className="px-8 py-3 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
                        Load More Alumni
                    </button>
                </div>
            </section>

        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 lg:hidden flex justify-end">
            <div className="w-80 bg-white h-full shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                    <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200">
                        <X size={20} />
                    </button>
                </div>
                {FILTERS.map((filter) => (
                    <FilterSection 
                        key={filter.id} 
                        title={filter.label} 
                        options={filter.options}
                        isOpenDefault={true} 
                    />
                ))}
                <div className="mt-8 pt-6 border-t border-slate-100">
                    <button 
                        onClick={() => setIsFilterOpen(false)}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-neutral-200"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}