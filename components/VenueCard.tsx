
import React from 'react';
import { Venue } from '../types';
import { Star, MapPin, Users, ShieldCheck, CheckCircle, Info } from 'lucide-react';

interface VenueCardProps {
  venue: Venue;
  isSelected: boolean;
  onSelect: (venue: Venue) => void;
  onViewDetails: (venue: Venue) => void;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, isSelected, onSelect, onViewDetails }) => {
  return (
    <div 
      className={`group bg-white rounded-[40px] border transition-all hover:shadow-2xl hover:-translate-y-2 overflow-hidden ${
        isSelected ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-slate-100 shadow-sm'
      }`}
    >
      <div className="relative h-56 overflow-hidden">
        <img src={venue.imageUrl} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm w-fit">
            <Star size={14} className="text-amber-500 fill-amber-500" />
            <span className="text-xs font-black">{venue.rating}</span>
          </div>
          {venue.isVerified && (
            <div className="bg-indigo-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md w-fit">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
            </div>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-indigo-600 text-white px-4 py-1.5 rounded-2xl text-xs font-black shadow-lg">
          ${venue.pricePerDay}/day
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(venue);
          }}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-slate-600 hover:text-indigo-600 transition-all shadow-lg"
        >
          <Info size={18} />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-xl font-black text-slate-800">{venue.name}</h3>
          {venue.isVerified && <ShieldCheck size={18} className="text-indigo-600" />}
        </div>
        <div className="flex items-center gap-4 mb-6 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1"><MapPin size={14} /> {venue.location}</span>
          <span className="flex items-center gap-1"><Users size={14} /> {venue.capacity}</span>
        </div>
        <button 
          onClick={() => onSelect(venue)}
          className={`w-full py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
            isSelected 
            ? 'bg-indigo-600 text-white' 
            : 'bg-slate-50 text-indigo-600 hover:bg-indigo-50'
          }`}
        >
          {isSelected ? 'Selected Venue' : 'Select Venue'} 
          {isSelected && <CheckCircle size={16} />}
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
