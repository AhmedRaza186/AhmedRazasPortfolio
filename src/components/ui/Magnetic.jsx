import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;

    // We get the first child element of the div
    const child = el.firstChild;

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { width, height, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(child, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 1,
        ease: 'power3.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(child, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div ref={magneticRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
};
