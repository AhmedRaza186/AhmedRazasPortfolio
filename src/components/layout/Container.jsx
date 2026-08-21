import React from 'react';

export const Container = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={`w-full max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </Component>
  );
};
