'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';

export const Modal: React.FC<{ open:boolean; onClose: ()=>void; children: React.ReactNode }> = ({ open, onClose, children }) => {
  useEffect(()=> {
    const onKey = (e: KeyboardEvent) => { if(e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return ()=> document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if(!open) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className={clsx('bg-white rounded-lg shadow-lg p-6 w-full max-w-lg')} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};