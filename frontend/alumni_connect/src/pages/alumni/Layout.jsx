import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  PlusCircle, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  Compass
} from 'lucide-react';

// eslint-disable-next-line no-unused-vars
const SidebarItem = ({ to, icon: Icon, label, collapsed, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center transition-all duration-200 group rounded-xl my-1
      ${collapsed ? 'justify-center py-3' : 'gap-3 px-4 py-3'}
      ${isActive 
        ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-200' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-neutral-900'
      }`
    }
  >
    <div className="relative flex items-center justify-center shrink-0">
      <Icon size={20} strokeWidth={2} />
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <span className="absolute left-14 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-sm">
          {label}
        </span>
      )}
    </div>
    
    <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 font-medium text-sm ${collapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
      {label}
    </span>
    
    {/* Active Dot Indicator */}
    {!collapsed && (
      <div className={`ml-auto w-1.5 h-1.5 bg-white rounded-full shrink-0 opacity-0 transition-opacity ${({ isActive }) => isActive ? 'opacity-100' : ''}`} />
    )}
  </NavLink>
);

const AlumniLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden selection:bg-neutral-100 selection:text-neutral-900">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-slate-100 transition-all duration-300 ease-in-out relative z-30
          ${collapsed ? 'w-20' : 'w-72'}
        `}
      >
        {/* Header / Logo */}
        <div className="h-20 flex items-center justify-center border-b border-slate-50 relative px-4">
          <div className={`flex items-center gap-3 transition-all duration-300 ${collapsed && 'justify-center w-full'}`}>
             <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center shadow-md text-white shrink-0">
                <Compass size={20} />
             </div>
             <span className={`font-bold text-slate-900 tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                AlumniNet
             </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <div className={`text-xs font-bold text-slate-400 px-3 mb-2 uppercase tracking-wider transition-opacity ${collapsed ? 'hidden' : 'block'}`}>
            Overview
          </div>
          
          <SidebarItem to="/alumni" end icon={LayoutDashboard} label="Dashboard" collapsed={collapsed} />
          <SidebarItem to="/alumni/students" icon={Users} label="Student Directory" collapsed={collapsed} />
          <SidebarItem to="/alumni/requests" icon={MessageSquare} label="Requests" collapsed={collapsed} />
          
          <div className={`text-xs font-bold text-slate-400 px-3 mt-6 mb-2 uppercase tracking-wider transition-opacity ${collapsed ? 'hidden' : 'block'}`}>
            Mentorship
          </div>
          <SidebarItem to="/alumni/workshops" icon={Video} label="My Workshops" collapsed={collapsed} />
         
          <div className={`text-xs font-bold text-slate-400 px-3 mt-6 mb-2 uppercase tracking-wider transition-opacity ${collapsed ? 'hidden' : 'block'}`}>
            Account
          </div>
          <SidebarItem to="/alumni/settings" icon={Settings} label="Settings" collapsed={collapsed} />
        </nav>

        {/* Footer / Logout */}
        <div className={`p-4 border-t border-slate-100 ${collapsed && 'flex justify-center'}`}>
          <button 
            onClick={() => navigate('/auth')}
            className={`flex items-center transition-colors group rounded-xl
                ${collapsed 
                ? "justify-center p-3 text-slate-400 hover:text-red-600 hover:bg-red-50"
                : "gap-3 px-4 py-3 w-full text-slate-500 hover:text-red-600 hover:bg-red-50" 
            }`}
            title="Logout"
          >
            <LogOut size={20} />
            <span className={`font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
              Sign Out
            </span>
          </button>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-24 bg-white border border-slate-200 text-slate-400 rounded-full p-1.5 shadow-sm hover:text-slate-900 hover:bg-slate-50 transition z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-100 z-40 px-4 h-16 flex items-center justify-between">
         <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
               <Compass size={20} />
            </div>
            AlumniNet
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
            <Menu size={24} />
         </button>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0 bg-[#F8FAFC]">
        <Outlet />
      </main>

    </div>
  );
};

export default AlumniLayout;