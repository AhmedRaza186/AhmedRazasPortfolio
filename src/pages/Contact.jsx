import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';

export const Contact = () => {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error, missing_config
  const [errorMessage, setErrorMessage] = useState('');

  // Check EmailJS config
  useEffect(() => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setFormStatus('missing_config');
      setErrorMessage('EmailJS configuration is missing. Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.');
    }
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStatus === 'missing_config') return;

    setFormStatus('loading');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
          setFormStatus('success');
          formRef.current.reset();
          // Reset status after a few seconds
          setTimeout(() => setFormStatus('idle'), 5000);
      }, (error) => {
          console.error(error.text);
          setFormStatus('error');
          setErrorMessage('SOMETHING WENT WRONG — TRY AGAIN');
          setTimeout(() => setFormStatus('idle'), 5000);
      });
  };

  const contactLinks = [
    {
      label: "EMAIL",
      value: "ahmedrazamun@gmail.com",
      href: "mailto:ahmedrazamun@gmail.com",
    },
    {
      label: "LINKEDIN",
      value: "Ahmed Raza",
      href: "https://www.linkedin.com/in/ahmed-raza-mun/",
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
    }
  ];

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-24 md:pt-32 flex flex-col">
      <Container className="mb-24 md:mb-32 flex-grow">
        
        <Grid>
          
          {/* Left Column — Context & Direct Links */}
          <div className="col-span-4 md:col-span-12 lg:col-span-5 mb-16 lg:mb-0 flex flex-col justify-between">
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row group flex items-center justify-between border-b border-[var(--color-border-subtle)] py-6 focus:outline-none focus-visible:bg-[var(--color-text-secondary)]/5 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">
                      {link.label}
                    </span>
                    <span className="font-body text-lg md:text-xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                      {link.value}
                    </span>
                  </div>
                  <span className="font-meta text-xl text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Right Column — Form & Availability */}
          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-between">
            <div className="contact-form">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">YOUR NAME</label>
                  <input 
                    type="text" 
                    name="from_name" 
                    id="name"
                    required
                    autoComplete="name"
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">YOUR EMAIL</label>
                  <input 
                    type="email" 
                    name="from_email" 
                    id="email"
                    required
                    autoComplete="email"
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="project_type" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">WHAT ARE YOU LOOKING FOR?</label>
                  <select 
                    name="project_type" 
                    id="project_type"
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors appearance-none cursor-pointer rounded-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    <option value="" disabled selected className="text-[var(--color-text-secondary)]">Select an option (Optional)</option>
                    <option value="Website / Web App" className="bg-[var(--color-canvas)] text-[var(--color-text-primary)]">Website / Web App</option>
                    <option value="Full Stack Development" className="bg-[var(--color-canvas)] text-[var(--color-text-primary)]">Full Stack Development</option>
                    <option value="AI / Automation" className="bg-[var(--color-canvas)] text-[var(--color-text-primary)]">AI / Automation</option>
                    <option value="E-commerce" className="bg-[var(--color-canvas)] text-[var(--color-text-primary)]">E-commerce</option>
                    <option value="Something Else" className="bg-[var(--color-canvas)] text-[var(--color-text-primary)]">Something Else</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">TELL ME ABOUT IT</label>
                  <textarea 
                    name="message" 
                    id="message"
                    required
                    rows={3}
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                    placeholder="Tell me a little about your project, idea, or problem..."
                  />
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading' || formStatus === 'missing_config'}
                    className={`group inline-flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none ${formStatus === 'success' ? 'text-green-600 hover:text-green-600' : ''} ${formStatus === 'error' ? 'text-red-600 hover:text-red-600' : ''}`}
                  >
                    <span className="font-body text-2xl md:text-3xl relative">
                      {formStatus === 'idle' && 'SEND MESSAGE'}
                      {formStatus === 'loading' && 'SENDING...'}
                      {formStatus === 'success' && 'MESSAGE SENT ✓'}
                      {formStatus === 'error' && 'SOMETHING WENT WRONG — TRY AGAIN'}
                      {formStatus === 'missing_config' && 'CONFIGURATION MISSING'}
                      {formStatus === 'idle' && (
                        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all origin-left scale-x-0 group-hover:scale-x-100"></span>
                      )}
                    </span>
                    {formStatus === 'idle' && (
                      <span className="font-meta text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                    )}
                  </button>
                </div>
                
                {formStatus === 'missing_config' && (
                  <div className="p-4 border border-amber-500/30 bg-amber-500/5 text-amber-600 font-body text-sm">
                    {errorMessage}
                  </div>
                )}

              </form>
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
