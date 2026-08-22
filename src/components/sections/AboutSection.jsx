import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { num: '01', title: 'UNDERSTAND', desc: 'Find the real problem.' },
  { num: '02', title: 'DECIDE', desc: 'Define what matters.' },
  { num: '03', title: 'BUILD', desc: 'Turn the idea into a product.' },
  { num: '04', title: 'TEST', desc: 'Find what breaks.' },
  { num: '05', title: 'SHIP', desc: 'Put it in the real world.' },
  { num: '06', title: 'REFINE', desc: 'Improve what actually matters.' },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.about-anim, .snake-line', { opacity: 1, scaleX: 1, scaleY: 1, y: 0 });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // 1. Label
      tl.from('.about-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' });
      
      // 2. Main Statement
      tl.from('.about-statement', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
      
      // 3. Product + Engineering
      tl.from('.about-split', { y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '-=0.4');

      // 4. Snake Path lines reveal (Standard LTR)
      tl.fromTo('.snake-line-1', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.2');
      tl.fromTo('.snake-line-3', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.inOut' });
      tl.fromTo('.snake-line-mobile', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, opacity: 1, duration: 1.5, ease: 'power2.inOut' }, '-=1.2');

      // 5. Process steps
      tl.from('.process-step', { y: 15, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=1.2');

      // 6. Background
      tl.from('.about-footer', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // 7. Continuous Light Pulse Effect
      const pulseTl = gsap.timeline({ 
        repeat: -1, 
        repeatDelay: 1.5,
        delay: 2
      });
      
      // Desktop top line pulse
      pulseTl.fromTo('.process-pulse-1', { left: '-100px', opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0)
             .to('.process-pulse-1', { left: '100%', duration: 1.5, ease: 'power1.inOut' }, 0)
             .to('.process-pulse-1', { opacity: 0, duration: 0.2, ease: 'none' }, 1.3);

      // Desktop bottom line pulse
      pulseTl.fromTo('.process-pulse-2', { left: '-100px', opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 1.6)
             .to('.process-pulse-2', { left: '100%', duration: 1.5, ease: 'power1.inOut' }, 1.6)
             .to('.process-pulse-2', { opacity: 0, duration: 0.2, ease: 'none' }, 2.9);

      // Mobile vertical line pulse
      pulseTl.fromTo('.process-pulse-mobile', { top: '-100px', opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'none' }, 0)
             .to('.process-pulse-mobile', { top: '100%', duration: 2.5, ease: 'power1.inOut' }, 0)
             .to('.process-pulse-mobile', { opacity: 0, duration: 0.2, ease: 'none' }, 2.3);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const desktopOrder = [
    processSteps[0], processSteps[1], processSteps[2],
    processSteps[3], processSteps[4], processSteps[5]
  ];

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-16 relative bg-[var(--color-canvas)]">
      <Container>
        
        {/* Layer 01 — Section Introduction */}
        <Grid className="mb-24 md:mb-40">
          <div className="about-label about-anim col-span-4 md:col-span-12 lg:col-span-3 mb-8 lg:mb-0 pt-2 lg:pt-4">
            <span className="text-meta flex items-center gap-3 text-[var(--color-text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              02 / ABOUT
            </span>
          </div>
          <div className="about-statement about-anim col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
            <h2 className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight mb-8">
              I don't start with the code.<br />I start with the problem.
            </h2>
            <p className="font-body text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl">
              I like understanding what needs to be solved before deciding how it should be built.
            </p>
          </div>
        </Grid>

        {/* Layer 02 — Product + Engineering Thinking */}
        <Grid className="mb-24 md:mb-40">
          <div className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              
              <div className="about-split about-anim">
                <h3 className="text-meta text-[var(--color-text-secondary)] mb-6">01 — PRODUCT THINKING</h3>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.5] tracking-tight text-[var(--color-text-primary)]">
                  Before building, I try to understand the user, the business goal, and what actually needs to exist.
                </p>
              </div>

              <div className="about-split about-anim">
                <h3 className="text-meta text-[var(--color-text-secondary)] mb-6">02 — ENGINEERING</h3>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.5] tracking-tight text-[var(--color-text-primary)]">
                  Then I turn that understanding into clean logic using Node.js, robust REST APIs with Express, and scalable data systems with MongoDB.
                </p>
              </div>
              
            </div>
          </div>
        </Grid>

        {/* Layer 03 — Creative Process / Snake Path */}
        <div className="mb-32 md:mb-40 relative">
          
          {/* Mobile Vertical Path */}
          <div className="lg:hidden relative pl-6 border-l border-[var(--color-border-subtle)] flex flex-col gap-12">
            <div className="snake-line-mobile snake-line absolute top-0 left-[-1px] w-[1px] h-full bg-[var(--color-border-strong)] opacity-0"></div>
            <div className="process-pulse-mobile absolute top-[-100px] left-[-2px] w-[3px] h-[100px] bg-gradient-to-b from-transparent via-[var(--color-accent)] to-transparent opacity-0 z-10 pointer-events-none shadow-[0_0_12px_rgba(49,87,255,0.8)]"></div>
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step about-anim group relative">
                <span className="absolute -left-[29px] top-2 w-2 h-2 rounded-full bg-[var(--color-canvas)] border border-[var(--color-border-strong)] group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors duration-300"></span>
                <div className="text-meta text-[var(--color-text-secondary)] mb-1 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">{step.num}</div>
                <h4 className="font-display text-2xl tracking-wide group-hover:text-[var(--color-text-primary)] transition-colors duration-300 mb-2">{step.title}</h4>
                <p className="font-body text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Desktop Snake Path */}
          <div className="hidden lg:block relative py-12">
            
            {/* The Connecting Lines */}
            <div className="absolute top-[3.75rem] left-[16.66%] right-[16.66%] h-[1px] bg-[var(--color-border-subtle)]">
              <div className="snake-line-1 snake-line w-full h-full bg-[var(--color-border-strong)] opacity-0 relative"></div>
              <div className="process-pulse-1 absolute top-[-1px] left-[-100px] w-[100px] h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 z-10 pointer-events-none shadow-[0_0_12px_rgba(49,87,255,0.8)]"></div>
            </div>
            <div className="absolute bottom-[3.75rem] left-[16.66%] right-[16.66%] h-[1px] bg-[var(--color-border-subtle)]">
              <div className="snake-line-3 snake-line w-full h-full bg-[var(--color-border-strong)] opacity-0 relative"></div>
              <div className="process-pulse-2 absolute top-[-1px] left-[-100px] w-[100px] h-[3px] bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-0 z-10 pointer-events-none shadow-[0_0_12px_rgba(49,87,255,0.8)]"></div>
            </div>

            {/* Grid for Nodes */}
            <div className="grid grid-cols-3 gap-y-32 text-center relative z-10">
              {desktopOrder.map((step, idx) => (
                <div key={idx} className="process-step about-anim group relative flex flex-col items-center cursor-default mx-auto bg-[var(--color-canvas)] px-8">
                  {/* Subtle Node interaction */}
                  <div className="absolute top-[28px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas)] group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] transition-all duration-300 -z-10 group-hover:scale-150"></div>
                  
                  <div className="text-meta text-[var(--color-text-secondary)] mb-2 group-hover:text-[var(--color-text-primary)] transition-colors duration-300 bg-[var(--color-canvas)] px-2">{step.num}</div>
                  <h4 className="font-display text-3xl tracking-wide group-hover:text-[var(--color-text-primary)] transition-colors duration-300 mb-2 bg-[var(--color-canvas)] px-2">{step.title}</h4>
                  <p className="font-body text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 whitespace-nowrap bg-[var(--color-canvas)] px-2">{step.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Layer 04 — Background / Personal Context */}
        <Grid className="about-footer about-anim border-t border-[var(--color-border-subtle)] pt-12 md:pt-16">
          <div className="col-span-4 md:col-span-12 lg:col-span-8 flex flex-col items-start gap-8">
            <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-[65ch] leading-relaxed mb-4 lg:mb-0">
              My path started with design and experimentation before I found my footing in full-stack web development. Today, I enjoy working where product thinking, engineering, AI, and business problems overlap.
            </p>
            <button 
              onClick={() => navigate('/journey')}
              className="group inline-flex items-center gap-3 font-meta text-xs tracking-widest text-[var(--color-text-primary)] transition-all duration-300 focus:outline-none"
            >
              <span className="relative">
                VIEW MY JOURNEY
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"></span>
              </span>
              <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)] transition-colors duration-300 font-meta text-xl md:text-2xl mt-0.5 group-hover:translate-x-1 group-focus-visible:translate-x-1">
                ↗
              </span>
            </button>
          </div>
          
          <div className="col-span-4 md:col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-start gap-8 lg:gap-12 mt-12 lg:mt-0 lg:pt-1.5">
            <div>
              <h4 className="text-meta text-[var(--color-text-secondary)] mb-2">KARACHI, PAKISTAN</h4>
              <p className="font-body text-base text-[var(--color-text-primary)]">FULL STACK DEVELOPMENT</p>
            </div>
            <div>
              <h4 className="text-meta text-[var(--color-text-secondary)] mb-2">PRODUCT · AI · AUTOMATION</h4>
            </div>
          </div>
        </Grid>

      </Container>
    </section>
  );
};
