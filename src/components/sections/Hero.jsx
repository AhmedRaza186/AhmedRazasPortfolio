import React, { useEffect, useRef, useState } from 'react';
import { useTransition } from '../../context/TransitionContext';
import { useSound } from '../../context/SoundContext';
import gsap from 'gsap';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { Button } from '../ui/Button';
import { Magnetic } from '../ui/Magnetic';
import { siteConfig } from '../../data/site';

let heroAnimPlayed = false;

export const Hero = () => {
  const { navigateWithTransition } = useTransition();
  const { playDoorOpen, toggleSound, soundEnabled } = useSound();
  const heroRef = useRef(null);
  const q = gsap.utils.selector(heroRef);
  const [entered, setEntered] = useState(heroAnimPlayed);

  useEffect(() => {
    // Wait until user has clicked enter if it hasn't played yet
    if (!entered && !heroAnimPlayed) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || heroAnimPlayed) {
      gsap.set(q('.animate-item'), { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', scale: 1, rotateX: 0 });
      // Still dispatch the event if other things rely on the image being "revealed"
      if (heroAnimPlayed) window.dispatchEvent(new CustomEvent('hero-image-revealed'));
      return;
    }

    heroAnimPlayed = true;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial states
    gsap.set(q('.hero-meta'), { opacity: 0, y: 10 });
    gsap.set(q('.hero-title-line'), { opacity: 0, y: 40, rotateX: -10 });
    gsap.set(q('.hero-desc'), { opacity: 0, y: 20 });
    gsap.set(q('.hero-cta'), { opacity: 0, y: 20 });
    gsap.set(q('.hero-image-container'), { clipPath: 'inset(100% 0% 0% 0%)' });
    gsap.set(q('.hero-image'), { scale: 1.1 });

    // Animation Sequence
    const introDelay = 0.2; // Fast start since they just clicked enter

    tl.to(q('.hero-meta'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, delay: introDelay })
      .to(q('.hero-title-line'), { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1 }, '-=0.6')
      .to(q('.hero-desc'), { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(q('.hero-cta'), { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.6')
      .to(q('.hero-image-container'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, '-=0.8')
      .to(q('.hero-image'), { scale: 1, duration: 1.2, ease: 'power4.inOut', clearProps: 'transform' }, '-=1.2')
      .add(() => window.dispatchEvent(new CustomEvent('hero-image-revealed')));

    return () => {
      tl.kill();
    };
  }, [entered]); // Rerun when entered state changes

  const handleWhatsApp = () => {
    window.open('https://wa.me/923320397145?text=Hi%20Ahmed%2C%20I%27d%20like%20to%20discuss%20a%20project.', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Click to Enter Overlay */}
      {!entered && !heroAnimPlayed && (
        <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
          <button 
            className="font-display text-4xl md:text-6xl uppercase tracking-widest hover:text-[var(--color-accent)] transition-colors focus:outline-none"
            onClick={() => {
              if (!soundEnabled) toggleSound(); // Enable sound implicitly
              playDoorOpen();
              setEntered(true);
            }}
          >
            Click to Enter
          </button>
        </div>
      )}

      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[calc(100svh-80px)] flex flex-col justify-center pt-8 pb-24 md:pt-1 md:pb-32 overflow-hidden"
      >
      <Container>
        <Grid className="items-end">

          {/* Left Column - Content */}
          <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col z-10">

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-10 md:mb-12">
              <span className="hero-meta animate-item text-meta flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
                KARACHI, PAKISTAN
              </span>
              <span className="hero-meta animate-item text-[var(--color-border-strong)] hidden sm:inline-block">/</span>
              <span className="hero-meta animate-item text-meta text-[var(--color-text-secondary)]">
                FULL STACK DEVELOPMENT
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[1.1] tracking-tight mb-8 md:mb-10" style={{ perspective: '1000px' }}>
              <div className="hero-title-line animate-item origin-bottom">I build digital products</div>
              <div className="hero-title-line animate-item origin-bottom text-[var(--color-text-secondary)]">from idea to deployment.</div>
            </h1>

            {/* Description */}
            <p className="hero-desc animate-item font-body text-base md:text-xl text-[var(--color-text-secondary)] max-w-xl mb-12 leading-loose">
              Product-focused Full Stack Developer building robust MERN architecture with Node.js, Express, and REST APIs, alongside seamless frontend experiences.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="hero-cta animate-item">
                <Magnetic>
                  <Button onClick={() => navigateWithTransition('/work')}>
                    VIEW WORK ↗
                  </Button>
                </Magnetic>
              </div>
              <div className="hero-cta animate-item">
                <Magnetic>
                  <Button variant="secondary" onClick={handleWhatsApp}>
                    LET'S TALK ↗
                  </Button>
                </Magnetic>
              </div>
              <div className="hero-cta animate-item ml-2 md:ml-4">
                <a 
                  href={siteConfig.cvUrl} 
                  download="Ahmed_Raza_CV.pdf"
                  className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline underline-offset-4 transition-all duration-300 uppercase"
                >
                  DOWNLOAD CV ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image (Background on mobile, Grid on desktop) */}
          <div className="absolute inset-0 w-full h-full -z-10 lg:z-auto lg:relative lg:col-span-4 lg:col-start-9 group pointer-events-none lg:pointer-events-auto">
            <div className="hero-image-container animate-item relative w-full h-full lg:aspect-[3/4] overflow-hidden lg:rounded-sm bg-transparent lg:bg-[var(--color-border-subtle)]">
              <img
                src="/assets/personal/ahmedRazaPhoto.jpg"
                alt="Ahmed Raza Portrait"
                className="hero-image animate-item w-full h-full object-cover object-[center_top] grayscale opacity-15 lg:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />
            </div>
            {/* Subtle decorative element */}
            <div className="hero-meta animate-item absolute -bottom-6 -right-6 w-24 h-24 border border-[var(--color-border-subtle)] rounded-full hidden lg:block -z-10"></div>
          </div>

        </Grid>
      </Container>
    </section>
    </>
  );
};
