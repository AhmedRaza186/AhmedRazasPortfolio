import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSound } from '../../context/SoundContext';
import { Container } from '../layout/Container';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    num: '01',
    title: 'DESIGN',
    cat: 'Graphic design & visual thinking',
    desc: 'Started by exploring visual design and learning how composition, typography, and interfaces communicate ideas.',
    pos: 'above',
    left: '0%',
    width: '22%'
  },
  {
    num: '02',
    title: 'EXPERIMENT',
    cat: 'Creative experimentation & games',
    desc: 'Experimenting with interactive experiences and game development taught me to think beyond static visuals.',
    pos: 'below',
    left: '18%',
    width: '24%'
  },
  {
    num: '03',
    title: 'WEB DEVELOPMENT',
    cat: 'HTML / CSS / JavaScript',
    desc: 'Web development became the point where design and logic started working together.',
    pos: 'above',
    left: '38%',
    width: '28%',
    dominant: true
  },
  {
    num: '04',
    title: 'FULL STACK',
    cat: 'React / Node.js / Databases',
    desc: 'I moved from building interfaces to understanding the systems behind them — APIs, databases, authentication, and application architecture.',
    pos: 'below',
    left: '60%',
    width: '26%'
  },
  {
    num: '05',
    title: 'AI / AUTOMATION',
    cat: 'AI-powered products & workflows',
    desc: 'Now I\'m exploring how AI can turn software from a tool into a system that can reason, automate, and assist.',
    pos: 'above',
    left: '78%',
    width: '22%'
  }
];

export const JourneySection = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { playLightRay } = useSound();

  // Play sound when active index changes, but ONLY if in view
  useEffect(() => {
    if (isInView) {
      playLightRay();
    }
  }, [activeIndex, isInView, playLightRay]);

  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % milestones.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isHovering]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.journey-anim, .journey-line-fill', { opacity: 1, scaleX: 1, y: 0 });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          onEnter: () => setIsInView(true),
          onLeave: () => setIsInView(false),
          onEnterBack: () => setIsInView(true),
          onLeaveBack: () => setIsInView(false)
        }
      });

      // 1. Label & Header
      tl.from('.journey-header', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });

      // 2. Main Horizontal Line (Desktop) & Vertical Line (Mobile)
      tl.fromTo('.journey-line-fill',
        { scaleX: 0, scaleY: 0 },
        { scaleX: 1, scaleY: 1, duration: 1.2, ease: 'power2.inOut' },
        '-=0.2'
      );

      // 3. Milestones
      tl.from('.journey-milestone', {
        y: (i, el) => el.classList.contains('pos-above') ? 20 : -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.6');

      // 4. Descriptions fade in
      tl.from('.journey-desc', { opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');

      // 5. Bottom Statement
      tl.from('.journey-footer', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pb-24 pt-6 md:pt-8 relative bg-transparent overflow-hidden">
      <Container>

        {/* Section Header */}
        <div className="mb-20 md:mb-20">
          <div className="journey-header mb-6">
            <span className="text-meta flex items-center gap-3 text-[var(--color-text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] inline-block"></span>
              05 / JOURNEY
            </span>
          </div>
          <h1 className="journey-header font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight mb-6">
            How I got here.
          </h1>
          <p className="journey-header font-body text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-2xl">
            From visual design and experimentation to building full-stack products and exploring AI-driven systems.
          </p>
        </div>

        {/* Mobile Vertical Journey (< lg) */}
        <div className="lg:hidden relative pl-6 md:pl-8 py-8 border-l border-[var(--color-border-subtle)] flex flex-col gap-16">
          <div className="journey-line-fill absolute top-0 left-[-1px] w-[1px] h-full bg-[var(--color-border-strong)] origin-top"></div>

          {milestones.map((step, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className="journey-milestone journey-anim relative cursor-pointer"
                onMouseEnter={() => { setIsHovering(true); setActiveIndex(idx); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className={`absolute -left-[31px] md:-left-[39px] top-2 w-2.5 h-2.5 rounded-full border transition-all duration-300 ${isActive ? 'bg-[var(--color-accent)] border-[var(--color-accent)] shadow-[0_0_12px_rgba(49,87,255,0.8)]' : 'bg-[var(--color-canvas)] border-[var(--color-border-strong)]'}`}></span>

                <div className={`text-meta mb-1 transition-colors duration-300 ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                  {step.num}
                </div>
                <h3 className={`font-display tracking-tight mb-2 transition-colors duration-300 ${step.dominant ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                  {step.title}
                </h3>
                <div className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)] mb-3">
                  {step.cat}
                </div>
                <p className={`journey-desc font-body text-base transition-colors duration-300 ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Desktop Horizontal Journey (lg and up) */}
        <div className="hidden lg:block relative w-full h-[600px] my-32">
          {/* Central Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--color-border-subtle)]">
            <div className="journey-line-fill w-full h-full bg-[var(--color-border-strong)] origin-left"></div>
          </div>

          {milestones.map((step, idx) => {
            const isAbove = step.pos === 'above';
            const isActive = activeIndex === idx;
            return (
              <div
                key={idx}
                className={`journey-milestone absolute cursor-pointer ${isAbove ? 'pos-above bottom-[50%]' : 'pos-below top-[50%]'}`}
                style={{ left: step.left, width: step.width }}
                onMouseEnter={() => { setIsHovering(true); setActiveIndex(idx); }}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Connecting Stem */}
                <div className={`absolute left-6 w-[1px] transition-colors duration-500 z-0 ${isAbove ? 'top-0 bottom-0' : 'top-0 bottom-0'} ${isActive ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-subtle)]'}`}></div>

                {/* Intersection Dot */}
                <div className={`absolute left-[20px] w-2.5 h-2.5 rounded-full border transition-all duration-300 z-10 ${isAbove ? '-bottom-[5px]' : '-top-[5px]'} ${isActive ? 'border-[var(--color-accent)] bg-[var(--color-accent)] shadow-[0_0_12px_rgba(49,87,255,0.8)]' : 'border-[var(--color-border-strong)] bg-[var(--color-canvas)]'}`}></div>

                {/* Content Box */}
                <div className={`relative z-10 pl-12 pr-6 flex flex-col ${isAbove ? 'pb-12' : 'pt-12'}`}>
                  <div className={`text-meta mb-2 transition-colors duration-300 ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {step.num}
                  </div>
                  <h3 className={`font-display tracking-tight mb-2 transition-colors duration-300 ${step.dominant ? 'text-5xl lg:text-6xl' : 'text-3xl lg:text-4xl'} ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold tracking-wider text-[var(--color-text-primary)] mb-4">
                    {step.cat}
                  </div>
                  <p className={`journey-desc font-body text-base transition-colors duration-300 leading-relaxed ${isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Context */}
        <div className="journey-footer mt-24 md:mt-32 pt-16 md:pt-24 border-t border-[var(--color-border-subtle)]">
          <div className="flex flex-col items-center text-center">
            <span className="text-meta text-[var(--color-accent)] mb-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              THE DIRECTION
            </span>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--color-text-primary)] max-w-4xl mx-auto">
              I'm still figuring things out — but the direction is becoming clearer: build useful products, understand the systems behind them, and use technology to solve real problems.
            </h2>
          </div>
        </div>

      </Container>
    </section>
  );
};
