import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ variant = 'default', className = '', ...props }) => {
  const src = variant === 'white' 
    ? '/assets/personal/AhmedRaza-logo-white.png' 
    : '/assets/personal/AhmedRaza-logo.png';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`} {...props}>
      <img src={src} alt="Ahmed Raza Logo" className="h-12 md:h-14 w-auto object-contain" />
   <span className="font-body text-base md:text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] whitespace-nowrap hidden sm:block">
  Ahmed Raza
</span>
    </Link>
  );
};
