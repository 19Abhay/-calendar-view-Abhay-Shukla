import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

export const groupEventsByDay = (events: CalendarEvent[]) => {
  const map: Record<string, CalendarEvent[]> = {};
  for (const e of events) {
    const key = e.start.toISOString().slice(0,10);
    map[key] = map[key] ? [...map[key], e] : [e];
  }
  return map;
};