import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TripleMonitorShowcase = ({ logoImg, thumbnail, uiScreenshots, title }) => {
  const containerRef = useRef(null);
  
  // Combine all viable images for the showcase
  const allImages = [thumbnail, ...(uiScreenshots || [])].filter(Boolean);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  // Animation on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    let ctx = gsap.context(() => {
      gsap.fromTo('.monitor-3d-wrapper', 
        { opacity: 0, marginTop: 60 },
        {
          opacity: 1,
          marginTop: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  };

  // Touch Swipe Handlers for Mobile
  const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const onTouchMove = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.targetTouches[0].clientX;
    if (diff > 50) { handleNext(); setTouchStart(null); } 
    else if (diff < -50) { handlePrev(); setTouchStart(null); }
  };
  const onTouchEnd = () => setTouchStart(null);

  if (allImages.length === 0) return null;

  const MonitorFrame = ({ children, overlay, className = '' }) => (
    <div className={`w-full bg-[var(--color-elevated)] rounded-md border border-[var(--color-border-strong)] shadow-2xl overflow-hidden flex flex-col ${className}`}>
      <div className="h-4 md:h-6 w-full bg-[#1A1A1A] border-b border-[#2A2A2A] flex items-center px-2 md:px-3 gap-1.5 shrink-0 relative z-30">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3A3A3A]"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3A3A3A]"></div>
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#3A3A3A]"></div>
      </div>
      <div className="relative flex-grow bg-[var(--color-canvas)] overflow-hidden flex flex-col">
        {children}
        {overlay}
      </div>
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className="w-full relative py-16 md:py-32 flex flex-col items-center justify-center overflow-visible select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* 3D Coverflow Stage */}
      <div className="relative w-full max-w-[1400px] h-[300px] sm:h-[450px] md:h-[600px] lg:h-[700px] perspective-[1000px] lg:perspective-[1400px]">
        {allImages.map((img, i) => {
          // Calculate shortest distance in a circular array
          const len = allImages.length;
          let diff = i - currentIndex;
          if (Math.abs(diff) > len / 2) {
            diff = diff > 0 ? diff - len : diff + len;
          }

          const isCenter = diff === 0;
          const absDiff = Math.abs(diff);
          const direction = diff > 0 ? 1 : -1;
          
          // Math for fanning outwards
          const lgTx = diff * 50; // translateX percentage
          const lgTz = -absDiff * 250; // translateZ pixels
          const lgRy = -direction * (absDiff > 0 ? 25 : 0); // rotateY degrees

          return (
            <div 
              key={i}
              onClick={() => {
                if (diff > 0) handleNext();
                if (diff < 0) handlePrev();
              }}
              className={`monitor-3d-wrapper absolute top-1/2 left-1/2 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[50%] transition-all duration-700 ease-out ${
                isCenter ? 'cursor-default' : 'cursor-pointer group'
              } ${
                // On mobile, hide non-center images completely to use a standard swipe carousel
                !isCenter ? 'hidden lg:block' : 'block'
              }`}
              style={{
                transform: `translate(-50%, -50%) translateX(var(--tx, 0%)) translateZ(var(--tz, 0px)) rotateY(var(--ry, 0deg))`,
                zIndex: 30 - absDiff,
                '--tx': `${lgTx}%`,
                '--tz': `${lgTz}px`,
                '--ry': `${lgRy}deg`
              }}
            >
              <MonitorFrame 
                className={`transition-all duration-700 ${isCenter ? 'shadow-[0_30px_60px_rgba(0,0,0,0.6)]' : 'shadow-xl'}`}
                overlay={
                  <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 pointer-events-none z-20 ${isCenter ? 'opacity-0' : 'opacity-100 group-hover:opacity-30'}`}></div>
                }
              >
                <div 
                  className="w-full aspect-video bg-[var(--color-canvas)] relative overflow-y-auto overflow-x-hidden block"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>{`
                    .monitor-3d-wrapper ::-webkit-scrollbar { display: none; }
                  `}</style>
                  <img src={img} alt={`${title} UI screenshot ${i+1}`} className="w-full h-auto block relative z-10" loading="lazy" />
                </div>
              </MonitorFrame>
            </div>
          );
        })}
      </div>

      {/* Mobile/Tablet Swipe Indicators */}
      {allImages.length > 1 && (
        <div className="flex lg:hidden items-center gap-4 z-30 mt-8">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[var(--color-elevated)] text-[var(--color-text-primary)] flex items-center justify-center border border-[var(--color-border-subtle)] shadow-sm">←</button>
          <div className="flex gap-2">
            {allImages.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'}`} />
            ))}
          </div>
          <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[var(--color-elevated)] text-[var(--color-text-primary)] flex items-center justify-center border border-[var(--color-border-subtle)] shadow-sm">→</button>
        </div>
      )}
    </div>
  );
};
