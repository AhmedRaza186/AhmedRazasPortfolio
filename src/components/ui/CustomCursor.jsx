import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    // Only enable on devices that have a fine pointer (like a desktop mouse)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    // Set initial centering and hidden opacity
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

    const onMouseMove = (e) => {
      // Fade in on first movement to avoid flashing at (0,0)
      if (!hasMoved.current) {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        hasMoved.current = true;
      }
      
      // Use GSAP for high-performance translation, bypassing React state re-renders
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      // Event delegation for clickable elements
      const isClickable = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      
      if (isClickable) {
        // Hover state
        cursorRef.current.classList.add('w-12', 'h-12', 'bg-black/10', 'backdrop-blur-sm', 'border', 'border-black/20');
        cursorRef.current.classList.remove('w-3', 'h-3', 'bg-[var(--color-text-primary)]');
      } else {
        // Default state
        cursorRef.current.classList.remove('w-12', 'h-12', 'bg-black/10', 'backdrop-blur-sm', 'border', 'border-black/20');
        cursorRef.current.classList.add('w-3', 'h-3', 'bg-[var(--color-text-primary)]');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full w-3 h-3 bg-[var(--color-text-primary)] transition-all duration-300 ease-out"
    />
  );
};
