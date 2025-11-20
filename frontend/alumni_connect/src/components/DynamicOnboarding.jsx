// components/DynamicOnboarding.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../pages/services/MockApi';
import { Loader2 } from 'lucide-react';

export const DynamicOnboarding = ({ role, onComplete }) => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  // Immediately fetch config based on passed prop
  useEffect(() => {
    const fetchConfig = async () => {
       const res = await api.getProfileConfig(role);
       setConfig(res.data);
       setLoading(false);
    };
    fetchConfig();
  }, [role]);

  if (loading) {
     return (
       <div className="py-12 flex flex-col items-center justify-center text-neutral-400">
          <Loader2 className="w-8 h-8 animate-spin mb-2" />
          <span className="text-sm">Fetching institute requirements...</span>
       </div>
     );
  }

  return (
    <div className="animate-in slide-in-from-right-4">
       <div className="mb-6">
         <h2 className="text-xl font-bold text-neutral-900 capitalize">Complete {role} Profile</h2>
         <p className="text-sm text-neutral-500">One last step to join the network.</p>
       </div>

       <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onComplete(); }}>
          {/* Domains */}
          <div>
             <label className="block text-sm font-medium text-neutral-700 mb-2">Interests / Domains</label>
             <div className="flex flex-wrap gap-2">
                 {config?.taxonomy.domains.map(d => (
                     <button key={d} type="button" className="px-3 py-1 rounded-full border border-neutral-200 text-sm hover:bg-neutral-900 hover:text-white transition">
                         {d}
                     </button>
                 ))}
             </div>
          </div>

          {/* Dynamic Inputs */}
          {config?.requiredFields.map(field => (
             <div key={field}>
                 <label className="block text-sm font-medium text-neutral-700 mb-1 capitalize">
                     {field.replace(/([A-Z])/g, ' $1').trim()}
                 </label>
                 <input type="text" className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:ring-1 focus:ring-neutral-800 outline-none" />
             </div>
          ))}

          <button className="w-full mt-4 py-3 bg-neutral-900 text-white rounded-lg font-bold shadow-lg hover:bg-black">
             Finish Setup
          </button>
       </form>
    </div>
  );
};