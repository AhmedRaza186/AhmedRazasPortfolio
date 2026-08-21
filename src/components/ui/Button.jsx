import React from 'react';

export const Button = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-transform duration-200 hover:-translate-y-[1px] active:translate-y-0 text-small';
  
  const variants = {
    primary: 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] hover:bg-[var(--color-accent)] hover:text-white',
    secondary: 'bg-transparent border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]'
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
