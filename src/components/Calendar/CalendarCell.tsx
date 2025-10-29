'use client';

import React, { useMemo } from 'react';
import { isSameDay, format } from 'date-fns';
import clsx from 'clsx';
import { CalendarEvent } from './CalendarView.types';

export const CalendarCell: React.FC<{
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (e: CalendarEvent)=>void;
}> = ({ date, events, onEventClick }) => {
  const dayEvents = useMemo(() => events.filter(e => isSameDay(e.start, date)), [events, date]);
  const isToday = isSameDay(new Date(), date);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${format(date, 'MMMM d, yyyy')}. ${dayEvents.length} events.`}
      className={clsx(
        'min-h-[120px] p-3 bg-white hover:bg-gray-50 transition-all duration-200 cursor-pointer focus-visible:ring-2 ring-blue-500 rounded-sm'
      )}
      onClick={() => {/* open add event in real app */}}
      onKeyDown={() => {/* keyboard support */}}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={clsx('text-sm font-semibold text-gray-900', isToday && 'sr-only')}>{format(date, 'd')}</span>
        {isToday && (
          <span className="w-7 h-7 bg-blue-600 rounded-full text-white text-sm flex items-center justify-center font-bold shadow-md">
            {format(date, 'd')}
          </span>
        )}
      </div>

      <div className="space-y-1 overflow-hidden">
        {dayEvents.slice(0,3).map(ev => (
          <div key={ev.id} className="event-badge text-xs px-2 py-1 rounded-md truncate text-white font-medium" style={{ backgroundColor: ev.color || '#3b82f6' }} onClick={(e)=>{ e.stopPropagation(); onEventClick?.(ev); }}>
            {ev.title}
          </div>
        ))}
        {dayEvents.length > 3 && (
          <button className="text-xs text-blue-600 hover:text-blue-800 hover:underline mt-1 font-medium">+{dayEvents.length - 3} more</button>
        )}
      </div>
    </div>
  );
};