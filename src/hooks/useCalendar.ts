'use client';

import { useState } from 'react';
import { startOfToday, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';

export type CalendarViewType = 'month' | 'week';

export const useCalendar = (initialDate?: Date, initialView?: CalendarViewType) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? startOfToday());
  const [view, setView] = useState<CalendarViewType>(initialView ?? 'month');

  const next = () => setCurrentDate(d => view === 'month' ? addMonths(d, 1) : addWeeks(d, 1));
  const prev = () => setCurrentDate(d => view === 'month' ? subMonths(d, 1) : subWeeks(d, 1));
  const today = () => setCurrentDate(startOfToday());
  const toggleView = () => setView(v => v === 'month' ? 'week' : 'month');

  return { currentDate, view, next, prev, today, toggleView, setView };
};