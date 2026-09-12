import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Container } from '../components/layout/Container';
import { NetworkBackground } from '../components/ui/NetworkBackground';

const experiences = [
  {
    company: "IDM Pakistan",
    role: "Full Stack Developer",
    duration: "2026 – Present",
    type: "Full-time",
    location: "Karachi, Pakistan",
    description: "Working on real-world production software and full-stack development, including frontend and backend architecture, APIs, databases, debugging, and implementing business-critical features.",
  },
  {
    company: "Saylani",
    role: "Web & App Development Intern",
    duration: "May 11, 2026 – August 10, 2026",
    type: "Internship",
    location: "Karachi, Pakistan",
    description: "Completed the comprehensive Web & App Development Internship. Developed functional web applications and projects, including LinkUp, a social media web app with authentication and state management. Actively participated in Saylani Coding Night hackathons.",
  }
];

export const Experience = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.experience-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      gsap.from('.experience-header', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-24 min-h-screen bg-[var(--color-canvas)] relative">
      <NetworkBackground />
      <Container className="relative z-10">
        <div className="mb-16 md:mb-24 experience-header">
          <span className="text-meta flex items-center gap-3 text-[var(--color-text-secondary)] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] inline-block"></span>
            EXPERIENCE
          </span>
          <h1 className="font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)]">
            Professional <br/> Experience.
          </h1>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="experience-item relative pl-6 md:pl-0 border-l md:border-l-0 border-[var(--color-border-subtle)] md:border-t md:pt-12 flex flex-col md:flex-row gap-4 md:gap-12"
            >
              {/* Mobile Timeline Dot */}
              <div className="md:hidden absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--color-canvas)] border border-[var(--color-border-strong)]"></div>

              {/* Meta info (Left side on Desktop) */}
              <div className="md:w-1/3 flex flex-col gap-1 shrink-0">
                <h3 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] mb-1">
                  {exp.company}
                </h3>
                <div className="text-[var(--color-text-secondary)] font-body text-sm md:text-base mb-1">
                  {exp.duration}
                </div>
                <div className="text-[var(--color-text-secondary)] font-body text-sm flex items-center gap-2">
                  <span>{exp.type}</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Role & Description (Right side on Desktop) */}
              <div className="md:w-2/3 flex flex-col pt-1 md:pt-2">
                <h4 className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-4 font-body tracking-tight">
                  {exp.role}
                </h4>
                <p className="text-[var(--color-text-secondary)] font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
