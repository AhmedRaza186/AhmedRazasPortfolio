import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TripleMonitorShowcase = ({ logoImg, thumbnail, uiScreenshots, title }) => {
  const containerRef = useRef(null);
  
  // Combine all viable images for the showcase
  const allImages = [...(uiScreenshots || [])].filter(Boolean);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (zoomedImage === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedImage(null);
      else if (e.key === 'ArrowLeft') setZoomedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
      else if (e.key === 'ArrowRight') setZoomedImage((prev) => (prev + 1) % allImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage, allImages.length]);

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

  const [dragStart, setDragStart] = useState(null);
  const isSwipingRef = useRef(false);

  // Unified Drag Handlers
  const onDragStart = (clientX) => {
    setDragStart(clientX);
    isSwipingRef.current = false;
  };
  const onDragMove = (clientX) => {
    if (!dragStart) return;
    const diff = dragStart - clientX;
    if (Math.abs(diff) > 10) isSwipingRef.current = true; // Detect intent to swipe
    if (diff > 50) { handleNext(); setDragStart(null); } 
    else if (diff < -50) { handlePrev(); setDragStart(null); }
  };
  const onDragEnd = () => {
    setDragStart(null);
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 50);
  };

  // Wheel Handler for Trackpad/Mouse Wheel
  const handleWheel = (e) => {
    // Only trigger if mostly horizontal scrolling to prevent interfering with vertical page scroll
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) {
        handleNext();
      } else if (e.deltaX < -20) {
        handlePrev();
      }
    }
  };

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
      onTouchStart={(e) => onDragStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => onDragMove(e.targetTouches[0].clientX)}
      onTouchEnd={onDragEnd}
      onMouseDown={(e) => onDragStart(e.clientX)}
      onMouseMove={(e) => {
        if (e.buttons === 1) onDragMove(e.clientX);
      }}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onWheel={handleWheel}
      onDragStart={(e) => e.preventDefault()}
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
          const lgTx = diff * 55; // translateX percentage
          const lgRy = -direction * (absDiff > 0 ? 20 : 0); // rotateY degrees

          return (
            <div 
              key={i}
              onClick={(e) => {
                if (isSwipingRef.current) return;
                if (diff > 0) handleNext();
                else if (diff < 0) handlePrev();
                else setZoomedImage(i);
              }}
              className={`monitor-3d-wrapper absolute top-1/2 left-1/2 w-[85%] sm:w-[75%] md:w-[65%] lg:w-[50%] transition-all duration-700 ease-out ${
                isCenter ? 'cursor-zoom-in' : 'cursor-pointer group'
              } block`}
              style={{
                transform: `translate(-50%, -50%) translateX(var(--tx, 0%)) translateZ(var(--tz, 0px)) rotateY(var(--ry, 0deg))`,
                zIndex: 30 - absDiff,
                '--tx': `${lgTx}%`,
                '--tz': `clamp(-300px, ${-absDiff * 15}vw, -100px)`,
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

      {/* Swipe Indicators and Buttons */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-4 z-30 mt-8 md:mt-12">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-[var(--color-elevated)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] flex items-center justify-center border border-[var(--color-border-subtle)] shadow-sm transition-colors focus:outline-none">←</button>
          <div className="flex gap-2">
            {allImages.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-strong)]'}`} />
            ))}
          </div>
          <button onClick={handleNext} className="w-10 h-10 rounded-full bg-[var(--color-elevated)] text-[var(--color-text-primary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] flex items-center justify-center border border-[var(--color-border-subtle)] shadow-sm transition-colors focus:outline-none">→</button>
        </div>
      )}

      {/* Image Lightbox Overlay */}
      {zoomedImage !== null && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
        >
          
          <div className="absolute inset-0 pointer-events-none z-[120]">
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-red-600/90 hover:bg-red-700 backdrop-blur-md rounded-sm transition-colors px-6 py-3 font-meta text-sm md:text-base tracking-widest pointer-events-auto shadow-lg"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
            >
              CLOSE [X]
            </button>
            
            {allImages.length > 1 && (
              <>
                <button 
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors font-meta text-3xl md:text-4xl pointer-events-auto shadow-lg"
                  onClick={(e) => { e.stopPropagation(); setZoomedImage((zoomedImage - 1 + allImages.length) % allImages.length); }}
                >
                  ←
                </button>
                <button 
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors font-meta text-3xl md:text-4xl pointer-events-auto shadow-lg"
                  onClick={(e) => { e.stopPropagation(); setZoomedImage((zoomedImage + 1) % allImages.length); }}
                >
                  →
                </button>
              </>
            )}
          </div>
          
          <img 
            key={zoomedImage}
            src={allImages[zoomedImage]} 
            alt={`${title} zoomed view ${zoomedImage + 1}`} 
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl relative z-[110]"
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}
    </div>
  );
};
