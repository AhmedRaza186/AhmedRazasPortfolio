import React from 'react';
import { TransitionLink } from '../ui/TransitionLink';
import { useTheme } from '../../context/ThemeContext';

export const Logo = ({ variant = 'default', className = '', ...props }) => {
  const { theme } = useTheme();
  
  // If explicitly requested white, use white. Or if in dark mode and default was requested, use white.
  const isWhite = variant === 'white' || (theme === 'dark' && variant === 'default');
  
  const src = isWhite 
    ? '/assets/personal/AhmedRaza-logo-white.png' 
    : '/assets/personal/AhmedRaza-logo.png';

  return (
    <TransitionLink to="/" className={`inline-flex items-center gap-3 ${className}`} {...props}>
      <img src={src} alt="Ahmed Raza Logo" className="h-12 md:h-14 w-auto object-contain" />
   <span className="font-body text-base md:text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] whitespace-nowrap hidden sm:block">
  Ahmed Raza
</span>
    </TransitionLink>
  );
};
