import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
  User,
  ExternalLink
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
    skills: ["Azure", "C#", ".NET Core", "System Design"],
    experience: "5 Years",
    domain: "Engineering"
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Product Manager",
    company: "Uber",
    batch: "2020",
    location: "Hyderabad, India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Product Strategy", "Analytics", "Agile", "UX"],
    experience: "4 Years",
    domain: "Product"
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Data Scientist",
    company: "Amazon",
    batch: "2021",
    location: "Seattle, USA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Python", "Machine Learning", "AWS", "NLP"],
    experience: "3 Years",
    domain: "Data Science"
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Frontend Engineer",
    company: "Airbnb",
    batch: "2022",
    location: "Remote",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["React", "TypeScript", "GraphQL", "Design Systems"],
    experience: "2 Years",
    domain: "Engineering"
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Investment Associate",
    company: "Goldman Sachs",
    batch: "2018",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["Financial Modeling", "Valuation", "Equity Research"],
    experience: "6 Years",
    domain: "Finance"
  },
  {
    id: 6,
    name: "Sanya Mirza",
    role: "UX Researcher",
    company: "Spotify",
    batch: "2020",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    skills: ["User Testing", "Figma", "Prototyping", "Qualitative Research"],
    experience: "4 Years",
    domain: "Design"
  }
];

const FILTERS = [
  {
    id: 'domain',
    label: 'Domain',
    options: ['Engineering', 'Product', 'Data Science', 'Design', 'Finance', 'Marketing']
  },
  {
    id: 'batch',
    label: 'Batch',
    options: ['2024', '2023', '2022', '2021', '2020', 'Older']
  },
  {
    id: 'company',
    label: 'Company',
    options: ['Google', 'Microsoft', 'Amazon', 'Uber', 'Startups', 'MNCs']
  },
  {
    id: 'skills',
    label: 'Skills',
    options: ['React', 'Python', 'Java', 'Machine Learning', 'Product Management']
  },
  {
    id: 'location',
    label: 'Location',
    options: ['Bangalore', 'Mumbai', 'Delhi NCR', 'USA', 'Europe', 'Remote']
  },
  {
    id: 'experience',
    label: 'Experience',
    options: ['0-2 Years', '2-5 Years', '5-10 Years', '10+ Years']
  }
];

// --- Components ---

const FilterSection = ({ title, options, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-bold text-slate-800 mb-2 hover:text-indigo-600 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      {isOpen && (
        <div className="space-y-2 mt-2 animate-in slide-in-from-top-2 duration-200">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  className="peer appearance-none h-4 w-4 border border-slate-300 rounded bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <svg className="absolute w-3 h-3 text-white pointer-events-none hidden peer-checked:block left-0.5 top-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const AlumniCard = ({ data }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col h-full group">
    {/* Card Header */}
    <div className="p-6 flex flex-col items-center text-center border-b border-slate-50 relative">
      <div className="w-24 h-24 rounded-full p-1 bg-linear-to-br from-indigo-50 to-slate-50 border border-slate-100 mb-3 shadow-inner relative group-hover:scale-105 transition-transform duration-300">
        <img 
          src={data.image} 
          alt={data.name} 
          className="w-full h-full rounded-full object-cover"
        />
        <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm" title={`Batch of ${data.batch}`}>
           <span className="text-[10px] font-bold text-indigo-600">'{data.batch.slice(2)}</span>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900">{data.name}</h3>
      <p className="text-sm font-medium text-indigo-600 mb-1">{data.role}</p>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">@ {data.company}</p>
      
      <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{data.location}</span>
        </div>
        <div className="flex items-center gap-1">
            <Briefcase size={12} />
            <span>{data.experience}</span>
        </div>
      </div>
    </div>

    {/* Skills Section */}
    <div className="p-4 grow bg-slate-50/50">
        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">Top Skills</p>
        <div className="flex flex-wrap gap-2">
            {data.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-600 shadow-sm">
                    {skill}
                </span>
            ))}
            {data.skills.length > 3 && (
                <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-500">
                    +{data.skills.length - 3}
                </span>
            )}
        </div>
    </div>

    {/* Action Buttons */}
    <div className="p-4 grid grid-cols-2 gap-3 mt-auto">
      <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 transition-all">
        <User size={16} />
        Profile
      </button>
      <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-sm hover:shadow-indigo-200 transition-all">
        <MessageCircle size={16} />
        Connect
      </button>
    </div>
  </div>
);

export default function AlumniExplorer() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 p-4 md:p-8">
      
      {/* Page Header & Search */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Alumni Explorer</h1>
                <p className="text-slate-500 mt-1">Find and connect with 1,200+ alumni from your institute.</p>
            </div>
            <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 md:hidden">
                    <Filter size={16} /> Filters
                </button>
            </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                className="block w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Search by name, company, role, or skills..."
            />
            <button className="absolute inset-y-1.5 right-1.5 px-4 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                Search
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters Panel */}
        <aside className="hidden lg:block col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm sticky top-6">
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold">
                        <Filter size={18} />
                        <span>Filters</span>
                    </div>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                        Clear All
                    </button>
                </div>

                <div className="pr-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {FILTERS.map((filter) => (
                        <FilterSection 
                            key={filter.id} 
                            title={filter.label} 
                            options={filter.options}
                            isOpenDefault={['domain', 'batch'].includes(filter.id)} 
                        />
                    ))}
                </div>
            </div>
        </aside>

        {/* Main Content: Alumni Grid */}
        <section className="col-span-1 lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-500">Showing <span className="font-semibold text-slate-900">142</span> matches</p>
                
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Sort by:</span>
                    <select className="text-sm font-semibold text-slate-800 bg-transparent border-none focus:ring-0 cursor-pointer">
                        <option>Relevance</option>
                        <option>Experience (High to Low)</option>
                        <option>Recent Batches</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_ALUMNI.map((alumni) => (
                    <AlumniCard key={alumni.id} data={alumni} />
                ))}
                {/* Duplicate mock data to fill grid for visual purposes */}
                {MOCK_ALUMNI.slice(0, 2).map((alumni) => (
                    <AlumniCard key={`dup-${alumni.id}`} data={{...alumni, id: `dup-${alumni.id}`}} />
                ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-10 flex justify-center">
                <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                    Load More Alumni
                </button>
            </div>
        </section>

      </div>
    </div>
  );
}