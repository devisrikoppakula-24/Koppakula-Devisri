
import React from 'react';
import { UserRole } from '../types';
import { 
  Home, Calendar, Search, MessageSquare, 
  Settings, User, PlusCircle, BarChart3, 
  LogOut, ShieldCheck 
} from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, activeTab, setActiveTab, onLogout }) => {
  const getNavItems = () => {
    switch (role) {
      case UserRole.CUSTOMER:
        return [
          { id: 'explore', label: 'Explore', icon: Search },
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'chat', label: 'AI Planner', icon: MessageSquare },
          { id: 'profile', label: 'Profile', icon: User },
        ];
      case UserRole.VENUE_OWNER:
      case UserRole.EVENT_MANAGER:
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'calendar', label: 'Availability', icon: Calendar },
          { id: 'listings', label: 'My Listings', icon: PlusCircle },
          { id: 'messages', label: 'Inquiries', icon: MessageSquare },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-black text-indigo-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">O</div>
            OccasionAlly
          </h1>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">{role.replace('_', ' ')}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="font-bold text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2 z-50 shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${
              activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-bold">{item.label}</span>
          </button>
        ))}
        <button onClick={onLogout} className="flex flex-col items-center p-2 text-slate-400">
          <LogOut size={20} />
          <span className="text-[10px] mt-1 font-bold">Exit</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
