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
  const [appReady, setAppReady] = useState(false);
  const { playWhoosh, playDoorOpen, toggleSound, soundEnabled } = useSound();

  // Initialize GSAP positions on mount
  React.useEffect(() => {
    // Start with curtain covering the screen
    gsap.set([veilRef.current], { yPercent: 100 });
    gsap.set([curtainRef.current], { yPercent: 0 }); // Curtain covers screen initially
    gsap.set(textRef.current, { opacity: 0, scale: 1.2, y: 30 });
  }, []);

  const handleInitialEnter = () => {
    if (!soundEnabled) toggleSound();
    
    // Play the door opening sound
    import('../utils/soundEngine').then(({ soundEngine }) => {
      soundEngine.init();
      soundEngine.resume();
      soundEngine.playDoorOpen();
    });

    setAppReady(true);
    
    // Animate curtain up (opening the door)
    gsap.to(curtainRef.current, { 
      yPercent: -100, 
      duration: 1.2, 
      ease: 'expo.inOut',
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('app-ready'));
      }
    });
  };

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
        className={`fixed inset-0 z-[9999] overflow-hidden ${isTransitioning || !appReady ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Layer 1: Fast Veil */}
        <div 
          ref={veilRef} 
          className="absolute inset-0 bg-[var(--color-border-strong)]"
        ></div>

        {/* Layer 2: Main Curtain with Noise */}
        <div 
          ref={curtainRef} 
          className="absolute inset-0 bg-[var(--color-canvas)] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-difference" style={{ backgroundImage: 'url("/assets/noise.png")', backgroundSize: '150px' }}></div>
          
          {/* Initial Click to Enter Button */}
          {!appReady && (
            <div className="relative w-full max-w-[600px] flex flex-col items-center z-20">
              <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-[var(--color-border-subtle)] -z-20 -translate-y-1/2"></div>
              
              <button 
                className="group relative flex flex-col items-center focus:outline-none bg-[var(--color-canvas)] px-8 py-4 cursor-pointer"
                onClick={handleInitialEnter}
              >
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1px] bg-[var(--color-border-strong)] transition-all duration-700 ease-out w-0 group-hover:w-[150%] -z-10"></div>
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[3px] w-0 bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-hover:w-[100px] transition-all duration-700 shadow-[0_0_12px_rgba(49,87,255,0.8)] -z-10"></div>
                <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-300 group-hover:scale-150"></div>
                
                <div className="text-meta text-[var(--color-text-secondary)] mb-4 group-hover:text-[var(--color-text-primary)] transition-colors duration-300 bg-[var(--color-canvas)] px-4">
                  00
                </div>
                <h4 className="font-display text-3xl tracking-wide group-hover:text-[var(--color-text-primary)] transition-colors duration-300 mb-2 bg-[var(--color-canvas)] px-4">
                  ENTER
                </h4>
                <p className="font-body text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 whitespace-nowrap bg-[var(--color-canvas)] px-4">
                  Click to initialize system.
                </p>
              </button>
            </div>
          )}

          {/* Kinetic Typography (Used during page transitions) */}
          <div ref={textRef} className={`font-display text-4xl md:text-6xl text-[var(--color-text-primary)] tracking-tighter relative z-10 flex items-center overflow-hidden ${!appReady ? 'hidden' : ''}`}>
            <span className="opacity-50 mr-2">AHMED</span> RAZA
          </div>
        </div>
      </div>
    </TransitionContext.Provider>
  );
};
