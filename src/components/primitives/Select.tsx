'use client';

import React from 'react';

export const Select: React.FC<{ options: {value:string; label:string}[]; value: string; onChange: (v:string)=>void }> = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)} className="border rounded-md p-2">
      {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
};