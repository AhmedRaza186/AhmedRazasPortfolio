import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { RippleBackground } from '../components/ui/RippleBackground';
import { ContactForm } from '../components/micro/ContactForm';
import { siteConfig } from '../data/site';
import { SEO } from '../components/common/SEO';

export const Contact = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.contact-meta', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.contact-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.contact-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.contact-form', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.contact-link-row', { y: 15, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.4')
        .from('.contact-availability', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const contactLinks = [
    {
      label: "EMAIL",
      value: "ahmedrazamun@gmail.com",
      href: "mailto:ahmedrazamun@gmail.com",
    },
    {
      label: "LINKEDIN",
      value: "Ahmed Raza",
      href: "https://www.linkedin.com/in/ahmed-raza-14188b35b/",
    },
    {
      label: "WHATSAPP",
      value: "LET'S CHAT",
      href: "https://wa.me/923320397145?text=Hi%20Ahmed%2C%20I%27d%20like%20to%20discuss%20a%20project.",
    },
    {
      label: "GITHUB",
      value: "AhmedRaza186",
      href: "https://github.com/AhmedRaza186",
    },
    {
      label: "DOWNLOAD CV",
      value: "View Résumé",
      href: siteConfig.cvUrl,
      download: "Ahmed_Raza_CV.pdf"
    }
  ];

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-24 md:pt-32 flex flex-col relative">
      <SEO title="Contact" description="Get in touch. Open to select projects and collaborations." />
      <RippleBackground />
      <Container className="mb-24 md:mb-32 flex-grow relative z-10">
        
        <Grid>
          
          {/* Left Column — Context & Direct Links */}
          <div className="col-span-4 md:col-span-12 lg:col-span-5 mb-16 lg:mb-0 flex flex-col justify-between jarvis-section" data-jarvis-explain="This is the Contact page. You can reach out to Ahmed via email, LinkedIn, WhatsApp, or check out his GitHub and Resume.">
            <div>
              <div className="contact-meta text-meta flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-[var(--color-text-secondary)] mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
                  08 / CONTACT
                </div>
                <span className="hidden md:inline-block text-[var(--color-border-subtle)]">|</span>
                <span className="tracking-widest">OPEN TO SELECT PROJECTS & COLLABORATIONS</span>
              </div>
              
              <h1 className="contact-title font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-8">
                LET'S BUILD SOMETHING.
              </h1>
              
              <p className="contact-desc font-body text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-md leading-relaxed mb-16">
                Have a project, idea, or problem worth solving? 
                Tell me what you're working on. I'll get back to you.
              </p>
            </div>

            {/* Direct Contact Links Index */}
            <div className="flex flex-col border-t border-[var(--color-border-subtle)]">
              {contactLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  download={link.download}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  className="contact-link-row jarvis-section group flex items-center justify-between border-b border-[var(--color-border-subtle)] py-4 hover:bg-[var(--color-text-secondary)]/5 px-4 -mx-4 rounded-sm focus:outline-none focus-visible:bg-[var(--color-text-secondary)]/5 transition-colors"
                  data-jarvis-explain={`Link to ${link.label}.`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">
                      {link.label}
                    </span>
                    <span className="font-body text-lg md:text-xl text-[var(--color-text-primary)] transition-colors duration-300">
                      {link.value}
                    </span>
                  </div>
                  <span className="font-meta text-xl text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Column — Form & Availability */}
          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-between jarvis-section" data-jarvis-explain="You can also use this contact form to send a direct message. Just fill in your details and send it over!">
            <div className="contact-form">
              <ContactForm />
            </div>

            {/* Availability / Closing Statement */}
            <div className="contact-availability mt-16 lg:mt-24 pt-8 border-t border-[var(--color-border-subtle)]">
              <h3 className="font-meta text-[10px] tracking-widest text-[var(--color-text-primary)] mb-2">
                CURRENTLY OPEN TO SELECT PROJECTS & COLLABORATIONS.
              </h3>
              <p className="font-body text-sm text-[var(--color-text-secondary)]">
                Based in Karachi, Pakistan — working with people and teams building useful things.
              </p>
            </div>

          </div>

        </Grid>
      </Container>
      <Footer />
    </div>
  );
};
