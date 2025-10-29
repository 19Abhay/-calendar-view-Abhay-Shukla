'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/components/Calendar/CalendarView.types';

export const useEventManager = (initialEvents: CalendarEvent[] = []) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = (ev: CalendarEvent) => setEvents(prev => [...prev, ev]);
  const updateEvent = (id: string, updates: Partial<CalendarEvent>) =>
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  const deleteEvent = (id: string) => setEvents(prev => prev.filter(e => e.id !== id));

  return { events, addEvent, updateEvent, deleteEvent };
};