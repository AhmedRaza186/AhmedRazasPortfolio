import React from 'react';

export const Grid = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={`grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-6 ${className}`}>
      {children}
    </Component>
  );
};
