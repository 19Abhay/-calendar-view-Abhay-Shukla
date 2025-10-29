'use client';

import React from 'react';
import { getCalendarDays } from '@/utils/date.utils';
import { CalendarCell } from './CalendarCell';
import { CalendarEvent } from './CalendarView.types';

export const MonthView: React.FC<{ date: Date; events: CalendarEvent[]; onEventClick?: (e: any)=>void }> = ({ date, events, onEventClick }) => {
  const days = getCalendarDays(date);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-100 border-b">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map(d => (
          <CalendarCell key={d.toISOString()} date={d} events={events} onEventClick={onEventClick} />
        ))}
      </div>
    </div>
  );
};