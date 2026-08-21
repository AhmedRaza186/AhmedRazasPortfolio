import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export const Work = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      // Header Sequence
      const tl = gsap.timeline();
      tl.from('.aw-meta', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.aw-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.aw-desc', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4');

      // Project Reveal
      const sections = gsap.utils.toArray('.aw-section-title, .aw-project-card');
      sections.forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
          },
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out'
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter(p => p.featured);
  const y2026Projects = projects.filter(p => p.year === '2026' && !p.featured);
  const otherProjects = projects.filter(p => p.year !== '2026' && !p.featured);

  const renderArchiveCard = (project, index) => (
    <Link 
      key={project.slug} 
      to={`/work/${project.slug}`}
      className="aw-project-card group flex flex-col gap-4 border-t border-[var(--color-border-subtle)] pt-6 pb-2"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]">
          {project.year || "2025"}
        </span>
      </div>
      
      <div className="flex gap-5 md:gap-6">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--color-border-subtle)] shrink-0 overflow-hidden">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display text-2xl text-[var(--color-canvas)] opacity-50 bg-[var(--color-text-secondary)]">
              {project.title.substring(0,2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center py-1">
          <h3 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-all duration-300 relative pl-0 group-hover:pl-4">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            {project.title}
          </h3>
          <p className="font-body text-sm md:text-base text-[var(--color-text-secondary)] line-clamp-2 mt-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--color-border-subtle)] border-opacity-30">
        <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] uppercase line-clamp-1 flex-1 pr-4">
          {project.technologies ? project.technologies.slice(0, 3).join(' • ') : project.category}
        </div>
        <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-2 whitespace-nowrap">
          VIEW CASE STUDY <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
        </div>
      </div>
    </Link>
  );

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-8 md:pt-12 flex flex-col">
      <Container className="mb-16 md:mb-24 flex-grow">
        
        {/* Header */}
        <Grid className="mb-20 md:mb-32">
          <div className="col-span-4 md:col-span-12 lg:col-span-10">
            <div className="aw-meta flex items-center justify-between mb-8">
              <div className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
                PROJECT ARCHIVE
              </div>
              <Link to="/" className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                BACK HOME ↗
              </Link>
            </div>
            
            <h1 className="aw-title font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-8">
              EVERYTHING I'VE BUILT.
            </h1>
            
            <div className="aw-desc">
              <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                A collection of products, experiments, interfaces and systems I've worked on over time.
              </p>
              <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] mt-8 uppercase">
                19 PROJECTS / 2024 — 2026
              </div>
            </div>
          </div>
        </Grid>

        {/* FEATURED PROJECTS */}
        <div className="mb-24 md:mb-32">
          <h2 className="aw-section-title font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-12 pb-4 border-b border-[var(--color-border-strong)]">
            FEATURED
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {featuredProjects.map((project, index) => (
              <Link 
                key={project.slug} 
                to={`/work/${project.slug}`}
                className="aw-project-card group block"
              >
                <div className="w-full aspect-[4/3] bg-[var(--color-border-subtle)] overflow-hidden mb-6 relative">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-4xl text-[var(--color-canvas)] opacity-50 bg-[var(--color-text-secondary)]">
                      {project.title.substring(0,2).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col">
                  <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] mb-3 flex items-center justify-between">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{project.year || "2026"}</span>
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-all duration-300 mb-3 relative pl-0 group-hover:pl-5">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    {project.title}
                  </h3>
                  <p className="font-body text-base text-[var(--color-text-secondary)] line-clamp-2 max-w-md mb-6">
                    {project.description}
                  </p>
                  
                  <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                    VIEW CASE STUDY <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">↗</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2026 ARCHIVE */}
        {y2026Projects.length > 0 && (
          <div className="mb-24 md:mb-32">
            <h2 className="aw-section-title font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-12 pb-4 border-b border-[var(--color-border-strong)]">
              2026
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12">
              {y2026Projects.map((p, i) => renderArchiveCard(p, featuredProjects.length + i))}
            </div>
          </div>
        )}

        {/* OTHER PROJECTS ARCHIVE */}
        <div className="mb-16">
          <h2 className="aw-section-title font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-12 pb-4 border-b border-[var(--color-border-strong)]">
            OTHER PROJECTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12">
            {otherProjects.map((p, i) => renderArchiveCard(p, featuredProjects.length + y2026Projects.length + i))}
          </div>
        </div>

      </Container>
      
      <Footer />
    </div>
  );
};
