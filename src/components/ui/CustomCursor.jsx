import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const hasMoved = useRef(false);

  useEffect(() => {
    // Only enable on devices that have a fine pointer (like a desktop mouse)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    // Set initial centering and hidden opacity
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 });

    const onMouseMove = (e) => {
      // Fade in on first movement to avoid flashing at (0,0)
      if (!hasMoved.current) {
        gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 });
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
      const cursorTarget = e.target.closest('[data-cursor]');
      const magneticTarget = e.target.closest('[data-cursor-magnetic]');
      const isClickable = e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
      
      const cursor = cursorRef.current;
      const text = textRef.current;
      
      if (!cursor || !text) return;

      // Reset base classes
      cursor.className = 'fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center rounded-full transition-all duration-300 ease-out text-center';
      
      if (cursorTarget) {
        // "VIEW CASE STUDY" state
        const customText = cursorTarget.getAttribute('data-cursor');
        text.textContent = customText;
        cursor.classList.add('w-24', 'h-24', 'bg-[var(--color-accent)]', 'text-[var(--color-canvas)]');
        text.style.display = 'block';
      } else if (magneticTarget) {
        // Magnetic button state (hollow ring)
        text.style.display = 'none';
        cursor.classList.add('w-20', 'h-20', 'bg-transparent', 'border', 'border-[var(--color-border-strong)]');
      } else if (isClickable) {
        // Standard hover state
        text.style.display = 'none';
        cursor.classList.add('w-12', 'h-12', 'bg-[var(--color-text-primary)]', 'bg-opacity-10', 'backdrop-blur-sm', 'border', 'border-[var(--color-border-subtle)]');
      } else {
        // Default state
        text.style.display = 'none';
        cursor.classList.add('w-3', 'h-3', 'bg-[var(--color-text-primary)]');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    // Initialize default class
    cursorRef.current.classList.add('w-3', 'h-3', 'bg-[var(--color-text-primary)]');

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full w-3 h-3 bg-[var(--color-text-primary)] transition-all duration-300 ease-out flex items-center justify-center text-center"
    >
      <span ref={textRef} className="font-meta text-[9px] tracking-widest font-bold leading-tight hidden px-2"></span>
    </div>
  );
};
