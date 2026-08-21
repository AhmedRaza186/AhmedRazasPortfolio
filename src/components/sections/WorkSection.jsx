import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  // Custom layouts based on index to create intentional asymmetry
  let colSpan = '';
  let imageAspect = '';
  let innerLayout = '';
  
  if (index === 0) {
    // 01 Auto-QA: Largest, strongest visual
    colSpan = 'col-span-4 md:col-span-8 lg:col-span-12 mb-20 md:mb-40';
    imageAspect = 'aspect-[4/3] md:aspect-[16/9] lg:aspect-[2.35/1]';
    innerLayout = 'flex flex-col gap-6 md:gap-10';
  } else if (index === 1) {
    // 02 TradeSift: Typographic, pushed right
    colSpan = 'col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5 mb-20 md:mb-40';
    imageAspect = 'aspect-video';
    innerLayout = 'flex flex-col gap-6 md:gap-10';
  } else if (index === 2) {
    // 03 GoldenKey: Image on left, text right
    colSpan = 'col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-1 mb-20 md:mb-40';
    imageAspect = 'aspect-[4/3]';
    innerLayout = 'flex flex-col md:flex-row gap-8 lg:gap-16 items-center';
  } else {
    // 04 User Management System: smaller final, centered
    colSpan = 'col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-4 mb-20 md:mb-32';
    imageAspect = 'aspect-[4/3]';
    innerLayout = 'flex flex-col gap-6 md:gap-8';
  }

  return (
    <div className={`project-card ${colSpan} group`}>
      <Link to={`/work/${project.slug}`} className="block">
        <div className={innerLayout}>
          
          {/* Visual Block */}
          {project.image ? (
            <div className={`w-full overflow-hidden rounded-sm bg-[var(--color-border-subtle)] relative ${index === 2 ? 'md:w-[60%]' : ''}`}>
              <div className={`w-full ${imageAspect}`}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          ) : (
            <div className={`w-full overflow-hidden rounded-sm bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] relative flex items-center justify-center p-12 ${index === 2 ? 'md:w-[60%]' : ''} ${imageAspect}`}>
              <span className="font-display text-4xl md:text-5xl lg:text-7xl text-[var(--color-text-secondary)] tracking-tight opacity-40 transition-opacity duration-700 group-hover:opacity-100">
                {project.title}
              </span>
            </div>
          )}

          {/* Content Block */}
          <div className={`flex flex-col justify-center ${index === 2 ? 'md:w-[40%]' : ''}`}>
            <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6 text-meta text-[var(--color-text-secondary)] transition-transform duration-500 group-hover:translate-x-1">
              <span>0{index + 1}</span>
              <span className="w-6 h-[1px] bg-[var(--color-border-strong)]"></span>
              <span>{project.category}</span>
            </div>
            
            <h3 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] mb-4 md:mb-6 leading-[1.1] transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="font-body text-[var(--color-text-secondary)] text-base md:text-lg mb-6 leading-relaxed max-w-xl">
              {project.description}
            </p>

            {project.technologies && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 text-xs font-meta text-[var(--color-text-secondary)]">
                {project.technologies.map((tech, i) => (
                  <React.Fragment key={i}>
                    <span>{tech}</span>
                    {i < project.technologies.length - 1 && (
                      <span className="text-[var(--color-accent)] opacity-50">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
            
            <div className="mt-auto flex items-center text-meta font-semibold gap-2 group-hover:gap-4 transition-all duration-300">
              VIEW PROJECT 
              <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-1">→</span>
            </div>
          </div>

        </div>
      </Link>
    </div>
  );
};

export const WorkSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // Section Header Reveal
      gsap.from('.work-header-element', {
        scrollTrigger: {
          trigger: '.work-header',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      // Project Cards Reveal
      gsap.utils.toArray('.project-card').forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-40 relative bg-[var(--color-canvas)]">
      <Container>
        
        {/* Section Header */}
        <div className="work-header mb-24 md:mb-40 border-t border-[var(--color-border-subtle)] pt-12 md:pt-16">
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-7 flex flex-col gap-6 md:gap-8">
              <span className="work-header-element text-meta flex items-center gap-3 text-[var(--color-text-secondary)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
                SELECTED WORK / 2025—2026
              </span>
              <h2 className="work-header-element font-display text-[clamp(4rem,7vw,6rem)] leading-[0.9] tracking-tight">
                WORK
              </h2>
              <p className="work-header-element font-body text-lg md:text-2xl text-[var(--color-text-secondary)] max-w-lg leading-relaxed">
                Selected products and experiments I've built across AI, automation, commerce, and full-stack development.
              </p>
            </div>
          </Grid>
        </div>

        {/* Projects Layout */}
        <Grid>
          {projects.filter(p => p.featured).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Grid>

        {/* View All Projects CTA */}
        <div className="mt-24 md:mt-32 text-center">
          <Link 
            to="/work" 
            className="group inline-flex flex-col items-center focus:outline-none"
          >
            <span className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors mb-2">
              DISCOVER MORE
            </span>
            <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
              <span className="font-body text-2xl md:text-3xl relative">
                VIEW ALL PROJECTS
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all origin-left scale-x-0 group-hover:scale-x-100"></span>
              </span>
              <span className="font-meta text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[var(--color-accent)]">↗</span>
            </div>
          </Link>
        </div>

      </Container>
    </section>
  );
};
