'use client';

import React from 'react';
import { startOfWeek, addDays, format, eachHourOfInterval, startOfDay, endOfDay } from 'date-fns';
import clsx from 'clsx';
import { CalendarEvent } from './CalendarView.types';

export const WeekView: React.FC<{ date: Date; events: CalendarEvent[]; onEventClick?: (e: any)=>void }> = ({ date, events, onEventClick }) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const hours = eachHourOfInterval({ start: startOfDay(date), end: endOfDay(date) });

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <div className="grid grid-cols-8 bg-neutral-100 text-xs text-neutral-600">
        <div className="p-2"></div>
        {days.map(day => (
          <div key={day.toISOString()} className="p-2 text-center font-medium">{format(day, 'EEE dd')}</div>
        ))}
      </div>

      <div className="grid grid-cols-8 border-t border-neutral-200">
        <div className="flex flex-col border-r border-neutral-200">
          {hours.map(hour => (
            <div key={hour.toISOString()} className="h-16 text-[11px] text-neutral-400 text-right pr-2">
              {format(hour, 'ha')}
            </div>
          ))}
        </div>

        {days.map(day => (
          <div key={day.toISOString()} className="border-r border-neutral-100 relative">
            {hours.map(hour => (
              <div key={hour.toISOString()} className="h-16 border-b border-neutral-100"></div>
            ))}

            {events.filter(e => format(e.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')).map(e => (
              <div key={e.id} className={clsx('absolute left-1 right-1 rounded-md px-1 py-0.5 text-xs text-white shadow-sm', e.color || 'bg-primary-600')} style={{
                top: `${(e.start.getHours() / 24) * 100}%`,
                height: `${((e.end.getTime() - e.start.getTime()) / (1000*60*60) / 24) * 100}%`,
              }} onClick={(ev)=>{ ev.stopPropagation(); onEventClick?.(e); }}>
                {e.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};