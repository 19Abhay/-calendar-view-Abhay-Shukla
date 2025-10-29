'use client';

import React, { useState } from 'react';
import { useCalendar } from '@/hooks/useCalendar';
import { useEventManager } from '@/hooks/useEventManager';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { Button } from '@/components/primitives/Button';
import { EventModal } from './EventModal';

export const CalendarView: React.FC<{ initialEvents?: any[], initialView?: 'month' | 'week' }> = ({ initialEvents = [], initialView = 'month' }) => {
  const { currentDate, view, next, prev, today, toggleView } = useCalendar(undefined, initialView);
  const { events, addEvent, updateEvent, deleteEvent } = useEventManager(initialEvents);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const handleAdd = (payload: any) => addEvent(payload);
  const handleEdit = (payload: any) => updateEvent(payload.id, payload);
  const handleDelete = (id: string) => deleteEvent(id);

  return (
    <div className="calendar-container bg-white rounded-xl overflow-hidden">
      <div className="calendar-header p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 opacity-90"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button onClick={prev} variant="secondary" className="px-4 py-2.5 sm:px-5 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" aria-label="Previous month">‹ Prev</Button>
            <Button onClick={today} variant="secondary" className="px-4 py-2.5 sm:px-5 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" aria-label="Go to today">📅 Today</Button>
            <Button onClick={next} variant="secondary" className="px-4 py-2.5 sm:px-5 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl" aria-label="Next month">Next ›</Button>
          </div>

          <div className="text-3xl font-extrabold text-white text-center tracking-wide drop-shadow-2xl" suppressHydrationWarning>{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button onClick={toggleView} className="px-5 py-2.5 sm:px-6 sm:py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl" aria-label={`Switch to ${view === 'month' ? 'week' : 'month'} view`}>🔄 {view === 'month' ? 'Week' : 'Month'}</Button>
            <Button onClick={() => { setEditing(null); setModalOpen(true); }} className="px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20" aria-label="Add new event">+ New Event</Button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-50">
        {view === 'month' ? (
          <MonthView date={currentDate} events={events} onEventClick={(e:any)=>{ setEditing(e); setModalOpen(true); }} />
        ) : (
          <WeekView date={currentDate} events={events} onEventClick={(e:any)=>{ setEditing(e); setModalOpen(true); }} />
        )}
      </div>

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(ev:any) => { editing ? handleEdit(ev) : handleAdd(ev); }}
        initialData={editing || undefined}
      />
    </div>
  )
}
