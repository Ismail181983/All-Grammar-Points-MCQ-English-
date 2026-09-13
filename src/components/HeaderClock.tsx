import React, { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';

export const HeaderClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = String(hours % 12 || 12).padStart(2, '0');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = daysOfWeek[time.getDay()];
  const dayShort = dayName.slice(0, 3);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = months[time.getMonth()];
  const monthShort = monthName.slice(0, 3);
  const dateNum = time.getDate();
  const year = time.getFullYear();

  return (
    <div
      id="digital-clock-widget"
      className="inline-flex items-center gap-1.5 xs:gap-2.5 sm:gap-3 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 shadow-[0_4px_20px_rgba(6,182,212,0.25)] text-slate-100 max-w-full"
    >
      {/* Time Section */}
      <div className="flex items-center gap-1.5 sm:gap-2 pr-1.5 sm:pr-3 border-r border-cyan-500/30">
        <div className="p-1 sm:p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 animate-pulse shrink-0">
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex items-baseline gap-0.5 sm:gap-1 font-mono">
          <span className="text-sm xs:text-base sm:text-lg font-bold tracking-wider text-cyan-200">
            {displayHours}:{minutes}
          </span>
          <span className="hidden xs:inline text-[10px] sm:text-xs font-semibold text-cyan-400/90 w-4 sm:w-5">
            :{seconds}
          </span>
          <span className="text-[9px] sm:text-[11px] font-bold tracking-wide uppercase px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-cyan-950/80 text-cyan-300 ml-0.5 border border-cyan-500/30">
            {ampm}
          </span>
        </div>
      </div>

      {/* Date Section */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="p-1 sm:p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="text-[10px] sm:text-xs leading-tight">
          <div className="font-semibold text-emerald-300 tracking-wide">
            <span className="inline sm:hidden">{dayShort}</span>
            <span className="hidden sm:inline">{dayName}</span>
          </div>
          <div className="text-[9px] sm:text-[11px] text-slate-300 font-medium whitespace-nowrap">
            <span className="inline sm:hidden">{dateNum} {monthShort}</span>
            <span className="hidden sm:inline">{dateNum} {monthName}, {year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
