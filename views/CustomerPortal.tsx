
import React, { useState } from 'react';
import { MOCK_VENUES, MOCK_SERVICES } from '../constants';
import { 
  Search, Calendar, CheckCircle, Plus, ShoppingCart, Trash2, X, Filter, 
  Sparkles, Send, PartyPopper, ArrowRight, Star, Info
} from 'lucide-react';
import VenueCard from '../components/VenueCard';
import AvailabilityCalendar from '../components/AvailabilityCalendar';
import DetailsModal from '../components/DetailsModal';
import { getEventPlanningAdvice } from '../services/geminiService';
import { Venue, Service, Booking } from '../types';

const CustomerPortal: React.FC<{ activeTab: string; setActiveTab?: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [bookingDate, setBookingDate] = useState<string>('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ally', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  
  // New state for detailed view
  const [viewingItem, setViewingItem] = useState<Venue | Service | null>(null);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsTyping(true);
    const advice = await getEventPlanningAdvice(userMsg);
    setChatHistory(prev => [...prev, { role: 'ally', text: advice || 'Error' }]);
    setIsTyping(false);
  };

  const toggleService = (service: Service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleBookNow = () => {
    if (!bookingDate) {
      alert("Please select a date on the calendar first!");
      return;
    }
    const newBooking: Booking = {
      id: 'BK-' + Math.random().toString(36).substr(2, 6).toUpperCase(),
      userId: 'USER-1',
      venueId: selectedVenue?.id,
      venueName: selectedVenue?.name,
      date: bookingDate,
      status: 'PENDING',
      totalPrice: (selectedVenue?.pricePerDay || 0) + selectedServices.reduce((acc, s) => acc + s.price, 0),
      services: selectedServices.map(s => s.name)
    };
    setMyBookings(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);
    setShowCheckout(false);
    setSelectedServices([]);
    setSelectedVenue(null);
    setBookingDate('');
  };

  if (activeTab === 'bookings') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-black text-slate-800">My Booking History</h2>
        {myBookings.length === 0 ? (
          <div className="bg-white p-12 rounded-[40px] border border-dashed border-slate-200 text-center">
            <Calendar className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-bold">No bookings yet. Start exploring venues and services!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {myBookings.map(booking => (
              <div key={booking.id} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black">
                    {booking.venueName ? booking.venueName[0] : 'S'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800">{booking.venueName || 'Custom Service Package'}</h4>
                      <span className="text-[10px] font-mono text-slate-400 font-bold tracking-tighter">#{booking.id}</span>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-1 font-medium"><Calendar size={14} /> {booking.date}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {booking.services.map((s, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-500">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8">
                  <div className="text-right">
                    <p className="text-xs text-slate-400 font-bold">TOTAL PRICE</p>
                    <p className="text-xl font-black text-indigo-600">${booking.totalPrice}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-black ${
                    booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {booking.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (activeTab === 'chat') {
    return (
      <div className="h-[calc(100vh-12rem)] flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b bg-indigo-600 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Sparkles /></div>
          <div>
            <h2 className="text-xl font-black">Ally - AI Event Planner</h2>
            <p className="text-indigo-100 text-sm font-medium">Ask me about venues, catering, or budgeting!</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {chatHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4 font-bold">I'm Ally, your expert planner. Try asking...</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Suggest makeup artists in Mumbai", "Best catering for corporate events", "Cost for 200 people wedding"].map(t => (
                  <button key={t} onClick={() => setChatMessage(t)} className="bg-slate-100 px-4 py-2 rounded-full text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                    "{t}"
                  </button>
                ))}
              </div>
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl font-medium ${
                msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && <div className="text-[10px] text-indigo-500 animate-pulse font-black ml-2 uppercase tracking-widest">Ally is thinking...</div>}
        </div>

        <div className="p-4 border-t bg-slate-50 flex gap-2">
          <input 
            type="text" 
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your event planning query..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white font-medium"
          />
          <button onClick={handleSendMessage} className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Details Modal */}
      {viewingItem && (
        <DetailsModal 
          item={viewingItem} 
          onClose={() => setViewingItem(null)} 
          isSelected={
            'type' in viewingItem 
            ? selectedVenue?.id === viewingItem.id 
            : selectedServices.some(s => s.id === viewingItem.id)
          }
          onSelect={() => {
            if ('type' in viewingItem) {
              setSelectedVenue(selectedVenue?.id === viewingItem.id ? null : viewingItem as Venue);
            } else {
              toggleService(viewingItem as Service);
            }
          }}
        />
      )}

      {/* Floating Summary */}
      {(selectedVenue || selectedServices.length > 0) && !showCheckout && !confirmedBooking && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[90%] max-w-2xl animate-in slide-in-from-bottom-8">
          <div className="bg-slate-900/90 backdrop-blur-xl text-white p-5 rounded-[32px] shadow-2xl flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">
                {selectedServices.length + (selectedVenue ? 1 : 0)}
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">Package Total</p>
                <p className="text-xl font-black">${(selectedVenue?.pricePerDay || 0) + selectedServices.reduce((acc, s) => acc + s.price, 0)}</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCheckout(true)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-indigo-950/80 backdrop-blur-md"></div>
          <div className="bg-white w-full max-w-md rounded-[48px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="h-48 bg-indigo-600 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle size={48} className="text-indigo-600" />
              </div>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-black text-slate-800 mb-2">Booking Requested!</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">Your request has been sent to the vendor. We'll notify you soon.</p>
              
              <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left space-y-3 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</span>
                  <span className="text-sm font-mono font-black text-indigo-600">#{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue</span>
                  <span className="text-sm font-bold text-slate-800 truncate max-w-[150px]">{confirmedBooking.venueName || 'N/A'}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Price</span>
                  <span className="text-lg font-black text-indigo-600">${confirmedBooking.totalPrice}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setConfirmedBooking(null);
                    if (setActiveTab) setActiveTab('bookings');
                  }}
                  className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                >
                  View My Bookings <ArrowRight size={18} />
                </button>
                <button onClick={() => setConfirmedBooking(null)} className="w-full text-slate-400 py-2 font-bold text-sm">Dismiss</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)}></div>
          <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-12">
            <div className="p-8 border-b flex justify-between items-center">
              <h3 className="text-2xl font-black text-slate-800">Finalize Selections</h3>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-slate-100 rounded-full"><X /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              <div>
                <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-3">Event Date</h4>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center gap-3">
                  <Calendar className="text-indigo-600" />
                  <span className="font-black text-indigo-700">{bookingDate || "Select a date on venue calendar below"}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-slate-400 text-[10px] uppercase tracking-widest mb-3">Line Items</h4>
                {selectedVenue && (
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700">{selectedVenue.name} (Venue)</span>
                    <span className="font-black text-indigo-600">${selectedVenue.pricePerDay}</span>
                  </div>
                )}
                {selectedServices.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="font-bold text-slate-700">{s.name} ({s.category})</span>
                    <span className="font-black text-indigo-600">${s.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 bg-slate-50 border-t">
              <div className="flex justify-between items-center mb-6">
                <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest">Total to Pay</p>
                <p className="text-4xl font-black text-indigo-700">${(selectedVenue?.pricePerDay || 0) + selectedServices.reduce((acc, s) => acc + s.price, 0)}</p>
              </div>
              <button onClick={handleBookNow} className="w-full bg-indigo-600 text-white py-5 rounded-3xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Confirm Booking Request <CheckCircle size={22} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Explore View */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-800">Discover Venues</h2>
            <p className="text-slate-500 mt-1 font-medium">Top-rated hotels, halls and restaurants.</p>
          </div>
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by city, type or name..."
              className="w-full pl-12 pr-12 py-5 rounded-[24px] border-none focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all bg-white shadow-xl shadow-slate-200/50 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {MOCK_VENUES.map(venue => (
            <VenueCard 
              key={venue.id} 
              venue={venue} 
              isSelected={selectedVenue?.id === venue.id} 
              onSelect={setSelectedVenue}
              onViewDetails={setViewingItem}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-slate-800">Professional Services</h3>
          <div className="flex gap-2">
             {['CATERING', 'MAKEUP', 'DANCE', 'DECOR'].map(cat => (
               <span key={cat} className="text-[10px] font-black bg-white px-3 py-1.5 rounded-full border border-slate-100 text-slate-500 uppercase tracking-widest">{cat}</span>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {MOCK_SERVICES.map(service => {
            const isSelected = selectedServices.some(s => s.id === service.id);
            return (
              <div key={service.id} className="bg-white p-5 rounded-[40px] border border-slate-100 shadow-sm flex gap-5 hover:shadow-xl transition-all group">
                <div 
                  className="relative w-28 h-28 shrink-0 rounded-3xl overflow-hidden shadow-lg shadow-slate-100 cursor-pointer"
                  onClick={() => setViewingItem(service)}
                >
                  <img src={service.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Info className="text-white" size={24} />
                  </div>
                  <div className="absolute top-2 right-2 bg-white/95 rounded-xl px-2 py-1 flex items-center gap-1 shadow-md">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black">{service.rating}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[10px] font-black uppercase text-indigo-500 tracking-widest">{service.category}</span>
                    <h4 className="font-black text-slate-800 truncate text-lg cursor-pointer" onClick={() => setViewingItem(service)}>{service.name}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-medium">{service.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-black text-slate-800 text-lg">${service.price}</p>
                    <button 
                      onClick={() => toggleService(service)}
                      className={`p-3 rounded-2xl transition-all ${
                        isSelected 
                        ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                    >
                      {isSelected ? <Trash2 size={20} /> : <Plus size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrated Calendar Section */}
      {selectedVenue && (
        <section className="bg-white rounded-[56px] border border-slate-100 p-10 shadow-2xl shadow-slate-200/50 animate-in slide-in-from-bottom-12 duration-700">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <Calendar className="text-indigo-600" /> Availability check
                  </h2>
                  <p className="text-slate-500 mt-1 font-bold uppercase tracking-widest text-[10px]">Real-time schedule for {selectedVenue.name}</p>
                </div>
                {bookingDate && (
                  <div className="bg-emerald-500 text-white px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 animate-in zoom-in shadow-xl shadow-emerald-200">
                    <CheckCircle size={18} /> Selected: {bookingDate}
                  </div>
                )}
              </div>
              <AvailabilityCalendar 
                availability={selectedVenue.availability} 
                onDateClick={(date) => {
                  const status = selectedVenue.availability[date] || 'AVAILABLE';
                  if (status === 'AVAILABLE') setBookingDate(date);
                  else alert("Sorry, this date is already booked or pending.");
                }}
              />
            </div>
            <div className="w-full lg:w-96 space-y-6">
              <div className="bg-slate-50 p-8 rounded-[48px] border border-slate-100 shadow-inner">
                <h4 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs">Pricing Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-bold">Venue Rent</span>
                    <span className="text-slate-800 font-black">${selectedVenue.pricePerDay}</span>
                  </div>
                  {selectedServices.map(s => (
                    <div key={s.id} className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-bold">{s.name}</span>
                      <span className="text-slate-800 font-black">${s.price}</span>
                    </div>
                  ))}
                  <div className="pt-6 border-t-2 border-slate-200 flex justify-between items-center mt-4">
                    <span className="text-slate-900 font-black text-lg">Est. Total</span>
                    <span className="text-3xl font-black text-indigo-600">
                      ${selectedVenue.pricePerDay + selectedServices.reduce((acc, s) => acc + s.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowCheckout(true)}
                className="w-full bg-indigo-600 text-white py-6 rounded-[32px] font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                Continue to Booking <ShoppingCart size={24} />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CustomerPortal;
