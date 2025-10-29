'use client';

import React from 'react';
import clsx from 'clsx';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary' }> = ({ variant='primary', className, children, ...props }) => {
  return (
    <button {...props} className={clsx('px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5', variant==='primary' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300', className)}>
      {children}
    </button>
  );
};
