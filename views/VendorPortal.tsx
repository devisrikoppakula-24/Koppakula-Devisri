
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Package, UserCheck, Clock, TrendingUp, MoreVertical, 
  Edit3, Trash2, MapPin, Users, DollarSign, 
  Search, CheckCircle2, XCircle, Clock3, MessageSquare, ShieldCheck 
} from 'lucide-react';
import { MOCK_VENUES } from '../constants';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import { AvailabilityStatus, Venue } from '../types';

const data = [
  { name: 'Mon', bookings: 4, revenue: 2400 },
  { name: 'Tue', bookings: 3, revenue: 1398 },
  { name: 'Wed', bookings: 2, revenue: 9800 },
  { name: 'Thu', bookings: 5, revenue: 3908 },
  { name: 'Fri', bookings: 8, revenue: 4800 },
  { name: 'Sat', bookings: 12, revenue: 12000 },
  { name: 'Sun', bookings: 9, revenue: 9600 },
];

const VendorPortal: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [venues, setVenues] = useState<Venue[]>(MOCK_VENUES);
  const [selectedVenueId, setSelectedVenueId] = useState<string>(MOCK_VENUES[0].id);

  const activeVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  const toggleAvailability = (dateStr: string) => {
    setVenues(prev => prev.map(v => {
      if (v.id === selectedVenueId) {
        const current = v.availability[dateStr] || 'AVAILABLE';
        const next: AvailabilityStatus = current === 'AVAILABLE' ? 'BOOKED' : current === 'BOOKED' ? 'PENDING' : 'AVAILABLE';
        return {
          ...v,
          availability: { ...v.availability, [dateStr]: next }
        };
      }
      return v;
    }));
  };

  if (activeTab === 'dashboard') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <header>
          <h2 className="text-3xl font-black text-slate-800">Business Overview</h2>
          <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Bookings', value: '42', icon: Package, color: 'indigo' },
            { label: 'Active Inquiries', value: '18', icon: UserCheck, color: 'emerald' },
            { label: 'Pending Payouts', value: '$12,450', icon: Clock, color: 'amber' },
            { label: 'Monthly Growth', value: '+24%', icon: TrendingUp, color: 'rose' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-800">Revenue Analysis</h3>
              <select className="bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-600 px-3 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last Month</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={4} dot={{r: 4, fill: '#4f46e5'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-6">Recent Booking Requests</h3>
            <div className="space-y-6">
              {[
                { name: 'Sarah\'s Wedding', date: '25 Dec', status: 'Confirmed', amount: '$4,500' },
                { name: 'Tech Conf 2024', date: '12 Jan', status: 'Pending', amount: '$12,000' },
                { name: 'Private Gala', date: '20 Jan', status: 'Confirmed', amount: '$2,300' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      {booking.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{booking.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">{booking.amount}</p>
                    <p className={`text-[10px] font-bold ${booking.status === 'Confirmed' ? 'text-emerald-500' : 'text-amber-500'}`}>{booking.status}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl mt-4 hover:bg-indigo-100 transition-colors">View All Activity</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'listings') {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800">My Venues</h2>
            <p className="text-slate-500">Manage and update your property listings.</p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2">
            Add New Venue
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {venues.map(venue => (
            <div key={venue.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group">
              <div className="relative h-48">
                <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="bg-white/90 backdrop-blur p-2 rounded-lg text-slate-600 hover:text-indigo-600 shadow-sm transition-colors">
                    <Edit3 size={18} />
                  </button>
                  <button className="bg-white/90 backdrop-blur p-2 rounded-lg text-slate-600 hover:text-red-600 shadow-sm transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-800">{venue.name}</h3>
                      {venue.isVerified && <ShieldCheck size={18} className="text-indigo-600" />}
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <MapPin size={14} /> {venue.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold uppercase">Base Price</p>
                    <p className="text-xl font-black text-indigo-600">${venue.pricePerDay}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-sm font-medium">{venue.capacity} Capacity</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    {venue.isVerified ? (
                      <>
                        <ShieldCheck size={16} className="text-indigo-600" />
                        <span className="text-sm font-bold text-indigo-600">Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-slate-400" />
                        <span className="text-sm font-medium text-slate-400">Unverified</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTab === 'calendar') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800">Availability Manager</h2>
            <p className="text-slate-500">Tap a date to toggle status for your active venue.</p>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs font-bold text-slate-400 px-2">MANAGING:</span>
            <select 
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="bg-slate-50 border-none font-bold text-indigo-600 text-sm px-3 py-1 rounded-xl outline-none"
            >
              {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <AvailabilityCalendar 
              availability={activeVenue.availability} 
              onDateClick={toggleAvailability} 
            />
          </div>
          <div className="space-y-6">
            <div className="bg-indigo-600 text-white p-6 rounded-[32px] shadow-xl shadow-indigo-100">
              <h4 className="font-bold mb-4">Quick Legend</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20"></div>
                  <span className="text-sm font-medium">Available (Open)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-400 ring-4 ring-rose-400/20"></div>
                  <span className="text-sm font-medium">Booked (Closed)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20"></div>
                  <span className="text-sm font-medium">Pending Inquiry</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-4">Calendar Tips</h4>
              <ul className="text-sm text-slate-500 space-y-3 leading-relaxed">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div> Tap once to block a date</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div> Tap twice to set as pending</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div> Tap three times to reset to open</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'messages') {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-right-4 duration-500">
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Contacts Sidebar */}
          <div className="w-full lg:w-80 border-r border-slate-100 flex flex-col overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search inquiries..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {[
                { name: 'David Miller', msg: 'Is the hall available for Feb 14th?', time: '2m ago', unread: true },
                { name: 'Elena Rodriguez', msg: 'Thank you for the quote!', time: '1h ago', unread: false },
                { name: 'Tech Solutions Inc', msg: 'Can we bring our own caterer?', time: 'Yesterday', unread: false },
              ].map((contact, i) => (
                <div key={i} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${i === 0 ? 'bg-indigo-50/50' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-slate-800 text-sm">{contact.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{contact.time}</p>
                  </div>
                  <p className={`text-xs truncate ${contact.unread ? 'text-indigo-600 font-bold' : 'text-slate-500 font-medium'}`}>
                    {contact.msg}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col bg-slate-50/50 overflow-hidden">
            <div className="p-4 bg-white border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">D</div>
                <div>
                  <p className="font-bold text-slate-800">David Miller</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              <div className="flex justify-start">
                <div className="max-w-[80%] bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                  <p className="text-sm text-slate-800 leading-relaxed">
                    Hello! I'm interested in booking the Grand Royal Plaza for a Valentine's Day event. Is Feb 14th available for 150 guests?
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">10:42 AM</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-indigo-100">
                  <p className="text-sm leading-relaxed">
                    Hi David! Let me check that for you right now. 
                  </p>
                  <p className="text-[10px] text-indigo-100 mt-2 font-bold uppercase">10:45 AM</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t">
              <div className="flex gap-2 items-center bg-slate-50 rounded-2xl p-2 pr-4 border border-slate-100">
                <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                  <Package size={20} />
                </button>
                <input 
                  type="text" 
                  placeholder="Type your reply..." 
                  className="flex-1 bg-transparent border-none text-sm py-2 focus:ring-0 outline-none"
                />
                <button className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
                  <TrendingUp className="rotate-90" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-12 text-center text-slate-400 font-medium">Development in progress for this section.</div>;
};

export default VendorPortal;
