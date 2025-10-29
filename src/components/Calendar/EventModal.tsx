'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '@/components/primitives/Modal';
import { Button } from '@/components/primitives/Button';
import { Select } from '@/components/primitives/Select';
import { CalendarEvent } from './CalendarView.types';

export const EventModal: React.FC<{
  open: boolean;
  onClose: ()=>void;
  onSave: (ev: CalendarEvent)=>void;
  initialData?: Partial<CalendarEvent>;
}> = ({ open, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [color, setColor] = useState(initialData?.color || '#2563eb');
  const [start, setStart] = useState(initialData?.start ? initialData.start.toISOString().slice(0,16) : '');
  const [end, setEnd] = useState(initialData?.end ? initialData.end.toISOString().slice(0,16) : '');

  useEffect(()=> {
    if(open){
      setTitle(initialData?.title || '');
      setColor(initialData?.color || '#2563eb');
      setStart(initialData?.start ? initialData.start.toISOString().slice(0,16) : '');
      setEnd(initialData?.end ? initialData.end.toISOString().slice(0,16) : '');
    }
  }, [open, initialData]);

  const handleSave = () => {
    if(!title || !start || !end) return;
    const payload: CalendarEvent = {
      id: initialData?.id || crypto.randomUUID(),
      title,
      start: new Date(start),
      end: new Date(end),
      color,
    };
    onSave(payload);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-800">{initialData ? 'Edit Event' : 'Create Event'}</h2>

        <div className="flex flex-col">
          <label className="text-sm text-neutral-600">Title</label>
          <input className="border rounded-md p-2" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm text-neutral-600">Start</label>
            <input type="datetime-local" className="border rounded-md p-2 w-full" value={start} onChange={e=>setStart(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="text-sm text-neutral-600">End</label>
            <input type="datetime-local" className="border rounded-md p-2 w-full" value={end} onChange={e=>setEnd(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="text-sm text-neutral-600">Color</label>
          <Select options={[
            { value: '#2563eb', label: 'Blue' },
            { value: '#10b981', label: 'Green' },
            { value: '#f59e0b', label: 'Amber' },
            { value: '#ef4444', label: 'Red' },
          ]} value={color} onChange={setColor} />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Modal>
  );
};