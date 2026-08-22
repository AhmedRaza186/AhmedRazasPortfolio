import React from 'react';
import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true 
      }}
    >
      {children}
    </ReactLenis>
  );
};
