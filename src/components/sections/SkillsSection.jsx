import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    num: "01",
    title: "FRONTEND ENGINEERING",
    desc: "Building responsive interfaces with a strong focus on interaction, structure, accessibility and visual detail.",
    tech: ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS", "GSAP"]
  },
  {
    num: "02",
    title: "BACKEND & APIs",
    desc: "Designing practical backend systems, APIs and application logic that support real products.",
    tech: ["Node.js", "Express.js", "REST APIs", "Authentication", "API Integration"]
  },
  {
    num: "03",
    title: "DATABASE & ARCHITECTURE",
    desc: "Working across relational and document databases while keeping data models and application architecture maintainable.",
    tech: ["MongoDB", "PostgreSQL", "Prisma", "Drizzle ORM", "Mongoose", "Neon"]
  },
  {
    num: "04",
    title: "AI & AUTOMATION",
    desc: "Exploring practical ways to use AI and automation to reduce repetitive work and improve product workflows.",
    tech: ["Gemini", "AI Agents", "Playwright", "Test Automation", "Workflow Automation"]
  },
  {
    num: "05",
    title: "DEVELOPMENT WORKFLOW",
    desc: "Taking projects from development through testing, version control and deployment.",
    tech: ["Git", "GitHub", "Postman", "Vercel", "Railway", "VS Code"]
  }
];

export const SkillsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.skills-anim, .skills-line', { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });

      // 1. Section Header
      tl.from('.skills-header', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });

      // 2. Main Statement
      tl.from('.skills-statement', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // 3. Separator lines draw
      tl.fromTo('.skills-line', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.8, stagger: 0.1, ease: 'power2.inOut' }, '-=0.4');

      // 4. Expertise Rows reveal
      tl.from('.skills-row', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.6');

      // 5. Creative Detail Marker
      tl.from('.skills-marker', { opacity: 0, duration: 0.6 }, '-=0.4');

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="expertise" ref={sectionRef} className="py-24 md:py-40 relative bg-[var(--color-canvas)]">
      <Container>
        
        {/* Layer 01 — Section Introduction */}
        <Grid className="mb-24 md:mb-32">
          
          <div className="skills-header col-span-4 md:col-span-12 lg:col-span-3 mb-12 lg:mb-0 pt-2 lg:pt-4 flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
            <span className="text-meta flex items-center gap-3 text-[var(--color-text-secondary)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              06 / EXPERTISE
            </span>
            <span className="text-meta text-[var(--color-text-secondary)]">WHAT I WORK WITH</span>
          </div>
          
          <div className="skills-statement col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-5">
            <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)]">
              I build interfaces that feel simple, and systems that aren't.
            </h2>
          </div>
        </Grid>

        {/* Layer 02 — Expertise Index */}
        <Grid className="relative">
          
          {/* Creative Detail Marker (Desktop) */}
          <div className="skills-marker hidden lg:flex col-span-2 col-start-1 flex-col justify-between py-8 text-meta text-[var(--color-text-secondary)]">
            <span>01</span>
            <div className="w-[1px] h-32 bg-[var(--color-border-strong)] ml-[7px] my-4"></div>
            <span>05</span>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-10 lg:col-start-3 flex flex-col w-full">
            
            {/* Top Border */}
            <div className="w-full h-[1px] bg-[var(--color-border-subtle)]">
              <div className="skills-line w-full h-full bg-[var(--color-border-strong)] origin-left scale-x-0"></div>
            </div>

            {expertise.map((item, idx) => (
              <div key={idx} className="group cursor-default">
                
                {/* Editorial Row */}
                <div className="skills-row flex flex-col lg:flex-row items-start lg:items-center justify-between py-10 md:py-12 gap-8 lg:gap-12 transition-transform duration-500 group-hover:translate-x-2">
                  
                  {/* Left: Number + Category */}
                  <div className="flex items-start gap-6 lg:gap-12 w-full lg:w-5/12 flex-shrink-0">
                    <span className="font-meta text-sm text-[var(--color-text-secondary)] mt-1 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                      {item.num}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="font-display text-2xl md:text-3xl tracking-wide text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* Tiny Indicator (Hidden until hover) */}
                        <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          EXPERTISE
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Technologies & Description */}
                  <div className="flex flex-col w-full lg:w-7/12 pl-10 lg:pl-0">
                    <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                      {item.desc}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-sm md:text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                      {item.tech.map((tech, tIdx) => (
                        <React.Fragment key={tIdx}>
                          <span>{tech}</span>
                          {tIdx < item.tech.length - 1 && (
                            <span className="text-[var(--color-border-strong)] group-hover:text-[var(--color-accent)] transition-colors duration-300 mx-1">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow Indicator (Desktop) */}
                  <div className="hidden lg:block opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 text-[var(--color-accent)] font-meta text-xl">
                    ↗
                  </div>
                </div>

                {/* Bottom Separator Line */}
                <div className="w-full h-[1px] bg-[var(--color-border-subtle)]">
                  <div className="skills-line w-full h-full bg-[var(--color-border-strong)] origin-left scale-x-0 group-hover:bg-[var(--color-text-primary)] transition-colors duration-500"></div>
                </div>

              </div>
            ))}

          </div>
        </Grid>

      </Container>
    </section>
  );
};
