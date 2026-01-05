
import React, { useState } from 'react';
import { Venue, Service } from '../types';
import { X, Play, Image as ImageIcon, Star, MapPin, Users, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

interface DetailsModalProps {
  item: Venue | Service;
  onClose: () => void;
  onSelect: () => void;
  isSelected: boolean;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ item, onClose, onSelect, isSelected }) => {
  const [activeMedia, setActiveMedia] = useState<'GALLERY' | 'VIDEO'>('GALLERY');
  const [galleryIndex, setGalleryIndex] = useState(0);

  const isVenue = 'type' in item;
  const gallery = item.gallery || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row h-[90vh] animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md transition-all"
        >
          <X size={24} />
        </button>

        {/* Media Section */}
        <div className="relative w-full lg:w-3/5 bg-black h-1/2 lg:h-full flex-shrink-0">
          {activeMedia === 'GALLERY' ? (
            <div className="relative w-full h-full">
              <img 
                src={gallery[galleryIndex]} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              {gallery.length > 1 && (
                <>
                  <button 
                    onClick={() => setGalleryIndex((prev) => (prev > 0 ? prev - 1 : gallery.length - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setGalleryIndex((prev) => (prev < gallery.length - 1 ? prev + 1 : 0))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {gallery.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === galleryIndex ? 'bg-white' : 'bg-white/40'}`}></div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-full bg-black flex items-center justify-center">
              {item.videoUrl ? (
                <video src={item.videoUrl} controls autoPlay className="max-w-full max-h-full" />
              ) : (
                <p className="text-white font-bold">Video not available</p>
              )}
            </div>
          )}

          {/* Media Switcher */}
          <div className="absolute top-6 left-6 flex gap-2">
            <button 
              onClick={() => setActiveMedia('GALLERY')}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                activeMedia === 'GALLERY' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/20 text-white backdrop-blur-md'
              }`}
            >
              <ImageIcon size={14} /> Gallery
            </button>
            {item.videoUrl && (
              <button 
                onClick={() => setActiveMedia('VIDEO')}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${
                  activeMedia === 'VIDEO' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/20 text-white backdrop-blur-md'
                }`}
              >
                <Play size={14} /> Video Tour
              </button>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {isVenue ? (item as Venue).type : (item as Service).category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-black">{item.rating}</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-6 leading-tight">{item.name}</h2>

            <div className="space-y-6 mb-8 text-slate-600 font-medium leading-relaxed">
              <p>{item.description || 'No detailed description available for this item yet.'}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {isVenue && (
                  <>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <Users size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Capacity</p>
                        <p className="font-bold text-slate-700">{(item as Venue).capacity} Guests</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="font-bold text-slate-700">{(item as Venue).location}</p>
                      </div>
                    </div>
                  </>
                )}
                {!isVenue && (
                  <div className="flex items-center gap-3 text-sm col-span-2">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Provider</p>
                      <p className="font-bold text-slate-700">{(item as Service).provider}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Cost</p>
                  <p className="text-3xl font-black text-indigo-600">
                    ${isVenue ? (item as Venue).pricePerDay : (item as Service).price}
                    <span className="text-sm text-slate-400 font-bold ml-1">{isVenue ? '/ day' : '/ service'}</span>
                  </p>
                </div>
                {/* Fix: Guard access to isVerified property as it only exists on Venue type */}
                {isVenue && (item as Venue).isVerified && (
                  <div className="flex flex-col items-end">
                    <CheckCircle2 size={24} className="text-indigo-600 mb-1" />
                    <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Verified Vendor</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              onSelect();
              onClose();
            }}
            className={`w-full py-5 rounded-[24px] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${
              isSelected 
              ? 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600' 
              : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            {isSelected ? 'Remove from Package' : 'Add to Package'}
            {isSelected ? <X size={20} /> : <CheckCircle2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
