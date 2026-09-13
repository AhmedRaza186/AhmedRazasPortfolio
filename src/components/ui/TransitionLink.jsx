import React from 'react';
import { useTransition } from '../../context/TransitionContext';

export const TransitionLink = ({ to, children, className, onClick, ...props }) => {
  const { navigateWithTransition } = useTransition();

  const handleClick = (e) => {
    // If it's a new tab link or external link, don't hijack it
    if (e.ctrlKey || e.metaKey || to.startsWith('http') || to.startsWith('mailto')) {
      return;
    }
    
    e.preventDefault();
    if (onClick) onClick(e);
    
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
