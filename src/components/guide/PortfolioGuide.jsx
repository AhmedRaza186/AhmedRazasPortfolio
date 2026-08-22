import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { guideData } from '../../data/guideData';
import { GuideMessage } from './GuideMessage';

gsap.registerPlugin(ScrollTrigger);

export const PortfolioGuide = () => {
  const dotRef = useRef(null);
  const containerRef = useRef(null);
  const [activeMessage, setActiveMessage] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const shownIds = useRef(new Set());
  const timeoutRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // 1. Initial Load Sequence (Hero)
      setTimeout(() => {
        if (!shownIds.current.has('hero')) {
          shownIds.current.add('hero');
          const heroData = guideData.find(d => d.id === 'hero');
          if (heroData) {
            setActiveMessage(heroData);
            setShowMessage(true);
            timeoutRef.current = setTimeout(() => {
              setShowMessage(false);
            }, 4000);
          }
        }
      }, 2000);

      // 2. Track scrolling progress with the dot
      // The dot travels strictly within the bounds of the fixed container
      gsap.to(dotRef.current, {
        top: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      // 3. Setup triggers for each section
      guideData.forEach((data) => {
        const element = document.getElementById(data.id);
        if (element && data.id !== 'hero') { // Hero is handled on load
          ScrollTrigger.create({
            trigger: element,
            start: 'top 50%', // When top of section hits middle of viewport
            onEnter: () => {
              if (!shownIds.current.has(data.id)) {
                shownIds.current.add(data.id);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setActiveMessage(data);
                setShowMessage(true);
                timeoutRef.current = setTimeout(() => {
                  setShowMessage(false);
                }, 4000);
              }
            },
            onEnterBack: () => {
              // Optionally show again if they scroll up? No, prompt says:
              // "Messages should only trigger once per section during a normal visit"
            }
          });
        }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Hide entirely if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* 
        We use a max-w container to match the site's layout.
        The left-* classes exactly mirror the Container's px-* padding, 
        ensuring the laser perfectly aligns with the text content (e.g. Hero subhead).
      */}
      <div className="w-full max-w-[1440px] mx-auto h-full relative">
        <div 
          ref={containerRef}
          className="absolute left-5 md:left-8 lg:left-12 xl:left-16 top-[20vh] bottom-[20vh] flex flex-col items-center"
          aria-hidden="true"
        >
          {/* Background track (Laser) */}
          <div id="guide-track-line" className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[var(--color-accent)] opacity-20"></div>
          
          {/* Moving Signal Dot */}
          <div 
            ref={dotRef} 
            id="guide-dot-element"
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full shadow-[0_0_8px_rgba(49,87,255,0.8)]"
          >
            {/* Dynamic Guide Message rendered alongside the dot */}
            {activeMessage && (
              <GuideMessage 
                messageData={activeMessage} 
                isVisible={showMessage} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
