import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
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

  return (
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
  );
};
