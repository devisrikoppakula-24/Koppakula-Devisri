
import React from 'react';
import { UserRole } from '../types';
import { 
  Home, Calendar, Search, MessageSquare, 
  Settings, User, PlusCircle, BarChart3, 
  LogOut, ShieldCheck 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, onLogout, activeTab, setActiveTab }) => {
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
        return [
          { id: 'dashboard', label: 'Overview', icon: BarChart3 },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'listings', label: 'My Venues', icon: PlusCircle },
          { id: 'messages', label: 'Inquiries', icon: MessageSquare },
        ];
      case UserRole.EVENT_MANAGER:
        return [
          { id: 'projects', label: 'Projects', icon: Home },
          { id: 'clients', label: 'Clients', icon: User },
          { id: 'services', label: 'Services', icon: PlusCircle },
          { id: 'chat', label: 'Messages', icon: MessageSquare },
        ];
      case UserRole.ADMIN:
        return [
          { id: 'stats', label: 'Analytics', icon: BarChart3 },
          { id: 'verify', label: 'Verify', icon: ShieldCheck },
          { id: 'users', label: 'Users', icon: User },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-slate-200 z-50">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">O</div>
            OccasionAlly
          </h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">{role.replace('_', ' ')} Portal</p>
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
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-40">
        <h1 className="text-xl font-bold text-indigo-600">OccasionAlly</h1>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-semibold">{role.replace('_', ' ')}</span>
          <button onClick={onLogout} className="p-2 text-slate-500 hover:text-red-600">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center p-2 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${
              activeTab === item.id ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
