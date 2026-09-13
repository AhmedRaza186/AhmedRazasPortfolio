import React, { createContext, useContext, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useSound } from './SoundContext';

const TransitionContext = createContext();

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const curtainRef = useRef(null);
  const veilRef = useRef(null);
  const textRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playWhoosh } = useSound();

  // Initialize GSAP positions on mount
  React.useEffect(() => {
    gsap.set([veilRef.current, curtainRef.current], { yPercent: 100 });
    gsap.set(textRef.current, { opacity: 0, scale: 1.2, y: 30 });
  }, []);

  const navigateWithTransition = (to) => {
    // If we are already on that path, don't do anything
    if (location.pathname === to || isTransitioning) {
      if (location.pathname !== to) navigate(to); // just in case it's a hash change
      return;
    }

    setIsTransitioning(true);
    playWhoosh();

    // Reset curtain position to bottom
    gsap.set([veilRef.current, curtainRef.current], { yPercent: 100 });
    gsap.set(textRef.current, { opacity: 0, scale: 1.2, y: 30 });

    const tl = gsap.timeline({
      onComplete: () => {
        // Change the route when curtain is fully up
        navigate(to);
        
        // Scroll to top immediately before revealing new page
        window.scrollTo(0, 0);

        // Use setTimeout to ensure the React render cycle finishes
        setTimeout(() => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              setIsTransitioning(false);
              // Reset safely in background
              gsap.set([veilRef.current, curtainRef.current], { yPercent: 100 });
              gsap.set(textRef.current, { opacity: 0, scale: 1.2, y: 30 });
            }
          });
          
          exitTl
            .to(textRef.current, { opacity: 0, scale: 0.9, y: -20, duration: 0.3, ease: 'power3.in' })
            .to(curtainRef.current, { yPercent: -100, duration: 0.6, ease: 'expo.inOut' }, "<0.1")
            .to(veilRef.current, { yPercent: -100, duration: 0.6, ease: 'expo.inOut' }, "<0.15");
        }, 150);
      }
    });

    // Bring curtain up with layered offset
    tl.to(veilRef.current, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' })
      .to(curtainRef.current, { yPercent: 0, duration: 0.6, ease: 'expo.inOut' }, "-=0.45")
      .to(textRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'expo.out' }, "-=0.3");
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      
      {/* Parent Overlay Container */}
      <div 
        className={`fixed inset-0 z-[9999] overflow-hidden ${isTransitioning ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Layer 1: Fast Veil */}
        <div 
          ref={veilRef} 
          className="absolute inset-0 bg-[var(--color-border-strong)]"
        ></div>

        {/* Layer 2: Main Curtain with Noise */}
        <div 
          ref={curtainRef} 
          className="absolute inset-0 bg-[var(--color-text-primary)] flex items-center justify-center overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("/assets/noise.png")', backgroundSize: '150px' }}></div>
          
          {/* Kinetic Typography */}
          <div ref={textRef} className="font-display text-4xl md:text-6xl text-[var(--color-canvas)] tracking-tighter relative z-10 flex items-center overflow-hidden">
            <span className="opacity-50 mr-2">AHMED</span> RAZA
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
