import React, { useEffect, useRef } from 'react';

export const DotGridBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      // Update CSS variables for the spotlight position
      containerRef.current.style.setProperty('--x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        // Draws tiny dots using a radial gradient
        backgroundImage: `radial-gradient(var(--color-text-primary) 1.5px, transparent 1.5px)`,
        // Spacing between dots
        backgroundSize: '32px 32px',
        // Higher opacity because it's mostly hidden by the mask now
        opacity: 0.25,
        // The interactive spotlight mask! Centers at 50% by default, tracks cursor on move
        maskImage: 'radial-gradient(500px circle at var(--x, 50vw) var(--y, 50vh), black 10%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(500px circle at var(--x, 50vw) var(--y, 50vh), black 10%, transparent 80%)'
      }}
    />
  );
};
