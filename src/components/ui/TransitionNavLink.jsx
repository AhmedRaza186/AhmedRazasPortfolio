import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

export const TransitionNavLink = ({ to, children, className, onClick, ...props }) => {
  const { navigateWithTransition } = useTransition();
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    if (e.ctrlKey || e.metaKey || to.startsWith('http')) return;
    
    e.preventDefault();
    if (onClick) onClick(e);
    
    if (!isActive) {
      navigateWithTransition(to);
    }
  };

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a href={to} onClick={handleClick} className={computedClassName} {...props}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  );
};
