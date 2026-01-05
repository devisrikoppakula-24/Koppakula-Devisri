
import React from 'react';
import { UserRole } from '../types';
import { Building2, UserCircle2, Briefcase, ShieldCheck, ChevronRight } from 'lucide-react';

interface HomeProps {
  onLogin: (role: UserRole) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-200">
              O
            </div>
            <h1 className="text-3xl font-black text-slate-900">OccasionAlly</h1>
          </div>
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1]">
            Every Detail, <span className="text-indigo-600">Perfectly</span> Planned.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed max-w-md font-medium">
            Book venues, catering, cultural programs and more in one tap. Real-time availability, zero physical visits required.
          </p>
          <div className="flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/${i + 10}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" />
              ))}
            </div>
            <p className="text-sm font-bold text-slate-600"><span className="text-indigo-600">10k+</span> events planned this year</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100 animate-in slide-in-from-right-12 duration-500">
          <h3 className="text-2xl font-black text-slate-800 mb-2">Welcome Back</h3>
          <p className="text-slate-500 mb-8 font-medium">Please select your portal to continue</p>
          
          <div className="space-y-3">
            {[
              { r: UserRole.CUSTOMER, label: 'I am a Customer', desc: 'Book venues & plan events', icon: UserCircle2, color: 'indigo' },
              { r: UserRole.VENUE_OWNER, label: 'I am a Venue Owner', desc: 'Manage bookings & calendar', icon: Building2, color: 'emerald' },
              { r: UserRole.EVENT_MANAGER, label: 'I am an Event Manager', desc: 'Offer services & packages', icon: Briefcase, color: 'amber' },
              { r: UserRole.ADMIN, label: 'Administrator', desc: 'Platform control & analytics', icon: ShieldCheck, color: 'slate' },
            ].map((item) => (
              <button
                key={item.r}
                onClick={() => onLogin(item.r)}
                className="w-full flex items-center gap-4 p-4 rounded-3xl border border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group"
              >
                <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center`}>
                  <item.icon size={24} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
          
          <p className="text-center mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            By continuing, you agree to our Terms & Privacy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
