import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from './Container';
import { Grid } from './Grid';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    label: "EMAIL",
    value: "ahmedrazamun@gmail.com",
    href: "mailto:ahmedrazamun@gmail.com"
  },
  {
    label: "LINKEDIN",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-raza-14188b35b/"
  },
  {
    label: "WHATSAPP",
    value: "WhatsApp",
    href: "https://wa.me/923320397145?text=Hi%20Ahmed%2C%20I%27d%20like%20to%20discuss%20a%20project."
  }
];

export const Footer = () => {
  const footerRef = useRef(null);

  const handleBackToTop = (e) => {
    e.preventDefault();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.footer-anim', { opacity: 1, y: 0 });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        }
      });

      tl.from('.footer-meta-top', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.footer-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.footer-link', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
        .from('.footer-bottom', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.2');

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-24 md:py-32 relative bg-[var(--color-canvas)] border-t border-[var(--color-border-subtle)]">
      <Container>
        
        {/* Layer 01 — Section Identifier & Layer 02 — Closing Statement */}
        <Grid className="mb-20 md:mb-32">
          <div className="col-span-4 md:col-span-12 lg:col-span-9">
            <div className="footer-meta-top footer-anim text-meta flex items-center gap-3 text-[var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              08 / FOOTER
            </div>
            <h2 className="footer-headline footer-anim font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)]">
              LET'S BUILD SOMETHING<br />WORTH BUILDING.
            </h2>
          </div>
        </Grid>

        {/* Layer 03 — Contact Links */}
        <Grid className="mb-32 md:mb-48 gap-y-12">
          {footerLinks.map((link, idx) => (
            <div key={idx} className="footer-link footer-anim col-span-4 md:col-span-4 lg:col-span-3">
              <a 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 focus:outline-none"
                aria-label={`Contact via ${link.label}`}
              >
                <span className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest transition-colors duration-300 group-hover:text-[var(--color-text-primary)] group-focus-visible:text-[var(--color-text-primary)]">
                  {link.label}
                </span>
                
                <div className="flex items-center gap-3 transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2">
                  <span className="font-body text-xl md:text-2xl text-[var(--color-text-primary)] relative">
                    {link.value}
                    {/* Subtle Electric Blue Underline Indicator */}
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"></span>
                  </span>
                  <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)] transition-colors duration-300 font-meta text-lg mt-0.5">
                    ↗
                  </span>
                </div>
              </a>
            </div>
          ))}
        </Grid>

        {/* Layer 04 — Footer Meta */}
        <div className="footer-bottom footer-anim flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-4 border-t border-[var(--color-border-subtle)] pt-12">
          
          <div className="flex flex-col gap-1">
            <span className="font-body text-base text-[var(--color-text-primary)]">AHMED RAZA</span>
            <span className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest">FULL STACK DEVELOPER</span>
          </div>

          <div className="hidden lg:block text-center flex-1">
            <span className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest">KARACHI, PAKISTAN</span>
          </div>

          <div className="flex flex-col md:items-end gap-6 md:gap-2 w-full md:w-auto">
            <span className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest">
              &copy; 2026 AHMED RAZA
            </span>
            <button 
              onClick={handleBackToTop}
              className="group flex items-center gap-2 font-meta text-xs tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)] transition-colors duration-300 focus:outline-none mt-4 md:mt-2"
              aria-label="Scroll back to top"
            >
              BACK TO TOP
              <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1">
                ↑
              </span>
            </button>
          </div>

        </div>

      </Container>
    </footer>
  );
};
