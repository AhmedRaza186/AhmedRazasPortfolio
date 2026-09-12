import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { RippleBackground } from '../components/ui/RippleBackground';
import { siteConfig } from '../data/site';

export const Contact = () => {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error, missing_config
  const [errorMessage, setErrorMessage] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

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
      <RippleBackground />
      <Container className="mb-24 md:mb-32 flex-grow relative z-10">
        
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
                  download={link.download}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  className="contact-link-row group flex items-center justify-between border-b border-[var(--color-border-subtle)] py-4 hover:bg-[var(--color-text-secondary)]/5 px-4 -mx-4 rounded-sm focus:outline-none focus-visible:bg-[var(--color-text-secondary)]/5 transition-colors"
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
          <div className="col-span-4 md:col-span-12 lg:col-span-6 lg:col-start-7 flex flex-col justify-between">
            <div className="contact-form">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                
                <div className="flex flex-col md:flex-row gap-8 w-full">
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="name" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">YOUR NAME</label>
                    <input 
                      type="text" 
                      name="from_name" 
                      id="name"
                      required
                      autoComplete="name"
                      className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="email" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">YOUR EMAIL</label>
                    <input 
                      type="email" 
                      name="from_email" 
                      id="email"
                      required
                      autoComplete="email"
                      className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                  <label className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">WHAT ARE YOU LOOKING FOR?</label>
                  
                  {/* Custom Dropdown Trigger */}
                  <div 
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] cursor-pointer flex justify-between items-center transition-colors hover:border-[var(--color-text-primary)]"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={selectedProjectType ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]/50'}>
                      {selectedProjectType || "What are you looking for?"}
                    </span>
                    <span className={`transform transition-transform text-sm ${isDropdownOpen ? 'rotate-180' : ''}`}>↓</span>
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] shadow-xl z-50 rounded-sm overflow-hidden flex flex-col">
                        {["Full-Stack Development", "Backend/API Integration", "Frontend Design", "General Inquiry"].map(option => (
                          <div 
                            key={option}
                            className="font-body text-lg px-6 py-4 cursor-pointer hover:bg-[var(--color-text-secondary)]/5 transition-colors text-[var(--color-text-primary)]"
                            onClick={() => {
                              setSelectedProjectType(option);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                  )}
                  
                  {/* Hidden input to pass value to emailjs */}
                  <input type="hidden" name="project_type" value={selectedProjectType} />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">TELL ME ABOUT IT</label>
                  <textarea 
                    name="message" 
                    id="message"
                    required
                    rows={3}
                    className="font-body text-lg md:text-xl bg-transparent border-b border-[var(--color-border-subtle)] py-4 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors resize-none"
                    placeholder="Tell me a little about your project, idea, or problem..."
                  />
                </div>

                <div className="pt-8">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'loading' || formStatus === 'missing_config'}
                    className={`group inline-flex justify-center items-center gap-2 px-8 py-4 border border-[var(--color-text-primary)] bg-[var(--color-text-primary)] text-[var(--color-canvas)] hover:bg-transparent hover:text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none w-full md:w-auto ${formStatus === 'success' ? 'bg-green-600 border-green-600 text-white hover:bg-green-600 hover:text-white' : ''} ${formStatus === 'error' ? 'bg-red-600 border-red-600 text-white hover:bg-red-600 hover:text-white' : ''}`}
                  >
                    <span className="font-meta tracking-widest text-sm relative">
                      {formStatus === 'idle' && 'SEND MESSAGE'}
                      {formStatus === 'loading' && 'SENDING...'}
                      {formStatus === 'success' && 'MESSAGE SENT. TALK SOON.'}
                      {formStatus === 'error' && 'SOMETHING WENT WRONG — TRY AGAIN'}
                      {formStatus === 'missing_config' && 'CONFIGURATION MISSING'}
                    </span>
                    {formStatus === 'idle' && (
                      <span className="font-meta text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
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
