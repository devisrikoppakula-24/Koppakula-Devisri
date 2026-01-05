
import React, { useState } from 'react';
import { AvailabilityStatus } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AvailabilityCalendarProps {
  availability: Record<string, AvailabilityStatus>;
  onDateClick?: (date: string) => void;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ availability, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startDay = startDayOfMonth(year, month);
    const days = [];

    // Empty spaces for previous month's trailing days
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 md:h-16 border-slate-100 border"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const status = availability[dateStr] || 'AVAILABLE';

      const statusColors = {
        AVAILABLE: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200',
        BOOKED: 'bg-rose-50 text-rose-700 border-rose-200',
        PENDING: 'bg-amber-50 text-amber-700 border-amber-200'
      };

      days.push(
        <button
          key={d}
          onClick={() => onDateClick?.(dateStr)}
          className={`h-12 md:h-16 border flex flex-col items-center justify-center transition-colors relative group ${statusColors[status]}`}
        >
          <span className="text-sm font-semibold">{d}</span>
          <span className="text-[8px] md:text-[10px] uppercase font-bold mt-1 opacity-70">
            {status === 'AVAILABLE' ? 'Free' : status.toLowerCase()}
          </span>
          {status === 'AVAILABLE' && (
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          )}
        </button>
      );
    }

    return days;
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 p-4 border-b flex items-center justify-between">
        <h3 className="font-bold text-slate-700">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-white rounded-full border">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => changeMonth(1)} className="p-1 hover:bg-white rounded-full border">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center border-b border-slate-100 bg-slate-50/50">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="py-2 text-[10px] font-bold text-slate-400 uppercase">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {renderDays()}
      </div>
      <div className="p-4 bg-slate-50 flex gap-4 text-xs font-semibold">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-400"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-rose-400"></div> Booked</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div> Pending</div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
