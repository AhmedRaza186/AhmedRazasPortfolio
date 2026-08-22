import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const PortfolioIntro = () => {
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setShouldRender(false);
      return;
    }

    document.body.style.overflow = 'hidden';
    
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          setShouldRender(false);
        }
      });

      // 0.5 - 1.3s: Identity reveal
      tl.to('.intro-identity', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.5)
        .to('.intro-bg-brackets', { opacity: 0.04, duration: 1.5, ease: 'power2.out' }, 0.5)
        .to('.intro-icons', { opacity: 0.6, duration: 1.5, ease: 'power2.out' }, 0.5)
        
      // 1.2 - 2.0s: Statement reveal
        .to('.intro-statement', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.2)
        
      // 1.9s: Text fades out just before doors open
        .to('.intro-content-wrapper', { opacity: 0, y: -20, duration: 0.4, ease: 'power2.inOut' }, 1.9)
        
      // 1.9s: Blue door seam appears exactly in the center
        .to('.intro-seam', { opacity: 1, duration: 0.3, ease: 'power2.out' }, 1.9);

      // 2.0 - 3.5s: Doors open (cinematic expo.inOut).
      tl.to('.intro-left-panel', { xPercent: -100, duration: 1.5, ease: 'expo.inOut' }, 2.0);
      tl.to('.intro-right-panel', { xPercent: 100, duration: 1.5, ease: 'expo.inOut' }, 2.0);
        
      // 2.0 - 3.5s: The seam travels to exactly the PortfolioGuide location.
      const trackEl = document.getElementById('guide-track-line');
      let targetX = 0;
      if (trackEl) {
        const rect = trackEl.getBoundingClientRect();
        const startX = window.innerWidth / 2;
        targetX = rect.left - startX + (rect.width / 2);
      } else {
        const lg = window.matchMedia('(min-width: 1024px)').matches;
        const md = window.matchMedia('(min-width: 768px)').matches;
        const offset = lg ? 32 : (md ? 24 : 8); 
        targetX = offset - (window.innerWidth / 2);
      }

      tl.to('.intro-seam', {
        x: targetX,
        opacity: 0.2,
        top: '20vh',
        bottom: '20vh',
        duration: 1.5,
        ease: 'expo.inOut'
      }, 2.0);

      // 3.5s: Exact handoff point
      // Hide the intro seam instantly. Since the real PortfolioGuide track is naturally underneath 
      // and now exposed by the open doors, it seamlessly takes over.
      tl.set('.intro-seam', { opacity: 0 }, 3.5);

      // 3.5 - 4.0s: Intro completely unmounts/exits
      tl.to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, 3.5);

    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] pointer-events-auto"
      aria-hidden="true"
    >
      {/* LEFT DOOR */}
      <div className="intro-left-panel absolute top-0 bottom-0 left-0 w-1/2 bg-[var(--color-canvas)] z-10"></div>
      
      {/* RIGHT DOOR */}
      <div className="intro-right-panel absolute top-0 bottom-0 right-0 w-1/2 bg-[var(--color-canvas)] z-10"></div>

      {/* INDEPENDENT BLUE SEAM (Animates to become the guide laser) */}
      <div className="intro-seam fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[var(--color-accent)] opacity-0 z-30"></div>

      {/* TYPOGRAPHY CONTENT */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="intro-content-wrapper relative w-full h-full flex flex-col items-center justify-center gap-12">
          
          {/* BACKGROUND BRACKETS */}
          <div className="intro-bg-brackets absolute inset-0 flex items-center justify-center gap-[10vw] md:gap-[15vw] opacity-0 z-0 font-display text-[50vh] md:text-[70vh] leading-none text-[var(--color-text-primary)] select-none pointer-events-none">
            <span>{`{`}</span>
            <span>{`}`}</span>
          </div>

          {/* LEFT ICON */}
          <div className="intro-icons absolute left-8 md:left-16 top-1/2 -translate-y-1/2 opacity-0 z-0 text-[var(--color-text-primary)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 3 12 9 6"></polyline>
              <polyline points="15 6 21 12 15 18"></polyline>
            </svg>
          </div>

          {/* RIGHT ICON */}
          <div className="intro-icons absolute right-8 md:right-16 top-1/2 -translate-y-1/2 opacity-0 z-0 text-[var(--color-text-primary)]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 2L20 2L18.5 19.5L12 22L5.5 19.5L4 2Z"></path>
              <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="sans-serif">JS</text>
            </svg>
          </div>

          <div className="intro-identity opacity-0 translate-y-4 flex flex-col items-center gap-2 z-10">
            <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] uppercase">
              01 / AHMED RAZA
            </div>
            <div className="font-body text-sm md:text-base text-[var(--color-text-primary)] tracking-widest uppercase">
              Full Stack Developer
            </div>
          </div>

          <div className="intro-statement opacity-0 translate-y-4 px-6 text-center z-10">
            <div className="font-display text-[clamp(2.5rem,6vw,5rem)] text-[var(--color-text-primary)] tracking-tight leading-[1] relative inline-block">
              I BUILD DIGITAL PRODUCTS.
              {/* SAGE GREEN HIGHLIGHT */}
              <div className="absolute left-[-2%] right-[-2%] bottom-[12%] h-[35%] bg-[#a3b19b] opacity-50 -z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
