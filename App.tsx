
import React, { useState } from 'react';
import { UserRole } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CustomerPortal from './views/CustomerPortal';
import VendorPortal from './views/VendorPortal';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState('explore');

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setActiveTab(selectedRole === UserRole.CUSTOMER ? 'explore' : 'dashboard');
  };

  const handleLogout = () => {
    setRole(null);
    setActiveTab('explore');
  };

  if (!role) {
    return <Home onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20 md:pb-0 md:pl-64">
      <Navbar 
        role={role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {role === UserRole.CUSTOMER && (
          <CustomerPortal activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {(role === UserRole.VENUE_OWNER || role === UserRole.EVENT_MANAGER) && (
          <VendorPortal activeTab={activeTab} />
        )}
        {role === UserRole.ADMIN && (
          <div className="flex items-center justify-center h-[80vh] text-slate-400 font-bold">
            Admin portal features arriving soon.
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
