import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { siteConfig } from '../../data/site';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: "EMAIL",
    value: "ahmedrazamun@gmail.com",
    to: "/contact",
    external: false
  },
  {
    label: "LINKEDIN",
    value: "Ahmed Raza",
    href: "https://www.linkedin.com/in/ahmed-raza-14188b35b/",
    external: true
  },
  {
    label: "WHATSAPP",
    value: "Let's chat",
    href: "https://wa.me/923320397145?text=Hi%20Ahmed%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    external: true
  },
  {
    label: "DOWNLOAD CV",
    value: "View Résumé",
    href: siteConfig.cvUrl,
    external: true,
    download: "Ahmed_Raza_CV.pdf"
  }
];

export const ContactSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.contact-anim', { opacity: 1, y: 0 });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      tl.from('.contact-anim', { 
        y: 20, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: 'power3.out' 
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} aria-labelledby="contact-heading" className="py-12 md:py-16 relative bg-[var(--color-canvas)] border-t border-[var(--color-border-subtle)]">
      <Container>
        <Grid>
          
          {/* Left Column — Context */}
          <div className="col-span-4 md:col-span-12 lg:col-span-6 mb-16 lg:mb-0 flex flex-col justify-start">
            <div className="contact-anim text-meta flex items-center gap-3 text-[var(--color-text-secondary)] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              07 / CONTACT
            </div>
            
            <h2 id="contact-heading" className="contact-anim font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-6">
              Let's work together.
            </h2>
            
            <p className="contact-anim font-body text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-md leading-relaxed">
              Have a project, idea, or problem you'd like to discuss? Feel free to reach out.
            </p>
          </div>
          
          {/* Right Column — Links */}
          <div className="col-span-4 md:col-span-12 lg:col-span-5 lg:col-start-8 flex flex-col justify-center gap-10 lg:gap-12 mt-8 lg:mt-0">
            {contactLinks.map((link, idx) => {
              const LinkElement = link.external ? 'a' : Link;
              const linkProps = link.external 
                ? { href: link.href, target: link.download ? undefined : "_blank", rel: link.download ? undefined : "noopener noreferrer", download: link.download }
                : { to: link.to };

              return (
                <LinkElement 
                  key={idx}
                  {...linkProps}
                  className="contact-anim group flex flex-col gap-2 focus:outline-none"
                  aria-label={`Contact via ${link.label}`}
                >
                  <span className="font-meta text-sm font-semibold text-[var(--color-text-secondary)] tracking-wide transition-colors duration-300 group-hover:text-[var(--color-text-primary)] group-focus-visible:text-[var(--color-text-primary)]">
                    {link.label}
                  </span>
                  
                  <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2">
                    <span className="font-body text-2xl md:text-3xl text-[var(--color-text-primary)] relative">
                      {link.value}
                      {/* Subtle Electric Blue Underline Indicator */}
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 transform origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"></span>
                    </span>
                    <span className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 font-meta text-xl md:text-2xl mt-1">
                      ↗
                    </span>
                  </div>
                </LinkElement>
              );
            })}
          </div>

        </Grid>
      </Container>
    </section>
  );
};
