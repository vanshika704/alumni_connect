import React, { useState } from 'react';
import { 
  User, CreditCard, Bell, Shield, LogOut, Save, 
  Camera, Lock, CheckCircle, AlertCircle, ChevronRight 
} from 'lucide-react';

const AlumniSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // --- Mock State ---
  const [profile] = useState({
    firstName: 'Vanshika',
    lastName: 'Sharma',
    headline: 'Senior Software Engineer @ Microsoft',
    bio: 'Passionate about distributed systems and mentoring students.',
    email: 'vanshika.s@example.com',
    linkedin: 'linkedin.com/in/vanshika',
    website: 'vanshika.dev'
  });

  const [payouts, setPayouts] = useState({
    accountName: 'Vanshika Sharma',
    accountNumber: '•••• •••• 8932',
    ifsc: 'HDFC0001234',
    autoWithdraw: true
  });

  const [notifications, setNotifications] = useState({
    emailRequest: true,
    emailWorkshop: true,
    pushMentorship: true,
    marketing: false
  });

  // --- Render Content Based on Tab ---
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Public Profile</h2>
              <button className="bg-neutral-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-700 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>

            {/* Avatar Section */}
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
              <div className="relative group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 text-2xl font-bold border-2 border-white shadow-md">
                  VS
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-white">
                  <Camera className="w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Profile Photo</h3>
                <p className="text-xs text-slate-500 mb-2">JPG, GIF or PNG. Max size of 800K</p>
                <button className="text-xs font-bold text-neutral-600 border border-neutral-200 px-3 py-1 rounded hover:bg-neutral-50">Upload New</button>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">First Name</label>
                <input type="text" value={profile.firstName} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Last Name</label>
                <input type="text" value={profile.lastName} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Headline</label>
                <input type="text" value={profile.headline} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bio</label>
                <textarea rows="3" value={profile.bio} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">LinkedIn URL</label>
                <input type="text" value={profile.linkedin} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Portfolio / Website</label>
                <input type="text" value={profile.website} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-neutral-500 outline-none" />
              </div>
            </div>
          </div>
        );

      case 'payouts':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold text-slate-900">Payout Settings</h2>
               <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                 <CheckCircle className="w-3 h-3" /> Verified Account
               </div>
            </div>
            
            <div className="bg-linear-to-r from-slate-800 to-slate-900 p-6 rounded-xl text-white shadow-lg">
              <p className="text-slate-400 text-xs font-bold uppercase mb-1">Total Earnings Balance</p>
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-bold">₹12,450.00</h3>
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-100">Withdraw Now</button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-neutral-600" /> Bank Account Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Account Holder Name</label>
                    <input type="text" value={payouts.accountName} disabled className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-500 cursor-not-allowed" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bank IFSC Code</label>
                    <input type="text" value={payouts.ifsc} className="w-full p-2 border border-slate-300 rounded-lg" />
                 </div>
                 <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Account Number</label>
                    <input type="text" value={payouts.accountNumber} className="w-full p-2 border border-slate-300 rounded-lg font-mono" />
                 </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                 <div>
                   <p className="text-sm font-bold text-slate-800">Automatic Payouts</p>
                   <p className="text-xs text-slate-500">Transfer earnings to bank every Monday.</p>
                 </div>
                 <Toggle 
                   active={payouts.autoWithdraw} 
                   onToggle={() => setPayouts({...payouts, autoWithdraw: !payouts.autoWithdraw})} 
                 />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <h2 className="text-xl font-bold text-slate-900 mb-6">Notification Preferences</h2>
             
             <div className="space-y-4">
               <NotificationRow 
                 title="New Mentorship Requests" 
                 desc="When a student requests mentorship or guidance."
                 active={notifications.pushMentorship}
                 onToggle={() => setNotifications({...notifications, pushMentorship: !notifications.pushMentorship})}
               />
               <NotificationRow 
                 title="Workshop Bookings" 
                 desc="Receive an email when someone buys a workshop seat."
                 active={notifications.emailWorkshop}
                 onToggle={() => setNotifications({...notifications, emailWorkshop: !notifications.emailWorkshop})}
               />
               <NotificationRow 
                 title="Direct Messages" 
                 desc="Email notifications for new chats from students."
                 active={notifications.emailRequest}
                 onToggle={() => setNotifications({...notifications, emailRequest: !notifications.emailRequest})}
               />
               <NotificationRow 
                 title="Marketing & Tips" 
                 desc="Receive tips on how to grow your alumni profile."
                 active={notifications.marketing}
                 onToggle={() => setNotifications({...notifications, marketing: !notifications.marketing})}
               />
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <NavButton id="profile" label="Profile Details" icon={User} active={activeTab} set={setActiveTab} />
              <NavButton id="payouts" label="Payout Settings" icon={CreditCard} active={activeTab} set={setActiveTab} />
              <NavButton id="notifications" label="Notifications" icon={Bell} active={activeTab} set={setActiveTab} />
              <NavButton id="security" label="Login & Security" icon={Lock} active={activeTab} set={setActiveTab} />
              <div className="h-px bg-slate-100 my-1"></div>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition text-left">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
             {renderContent()}
             
             {/* "Danger Zone" - Show only on Profile tab for demo */}
             {activeTab === 'profile' && (
               <div className="mt-12 pt-8 border-t border-slate-200">
                 <h3 className="text-red-600 font-bold text-sm uppercase mb-4">Danger Zone</h3>
                 <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex justify-between items-center">
                   <div>
                     <p className="text-sm font-bold text-red-900">Deactivate Account</p>
                     <p className="text-xs text-red-700">This will hide your profile and stop all workshops.</p>
                   </div>
                   <button className="text-xs bg-white border border-red-200 text-red-600 px-3 py-2 rounded font-bold hover:bg-red-100">Deactivate</button>
                 </div>
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

// eslint-disable-next-line no-unused-vars
const NavButton = ({ id, label, icon: Icon, active, set }) => (
  <button 
    onClick={() => set(id)}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition text-left ${
      active === id 
        ? 'bg-neutral-50 text-neutral-600 border-l-4 border-neutral-600' 
        : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'
    }`}
  >
    <Icon className="w-4 h-4" /> {label}
  </button>
);

const NotificationRow = ({ title, desc, active, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-neutral-200 transition">
    <div>
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
    <Toggle active={active} onToggle={onToggle} />
  </div>
);

const Toggle = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${active ? 'bg-neutral-600' : 'bg-slate-300'}`}
  >
    <span className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${active ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);

export default AlumniSettings;