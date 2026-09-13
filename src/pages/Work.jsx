import React, { useEffect, useRef, useState } from 'react';
import { TransitionLink } from '../components/ui/TransitionLink';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { DotGridBackground } from '../components/ui/DotGridBackground';
import { ProjectMockup } from '../components/micro/ProjectMockup';
import { projects } from '../data/projects';
import { SEO } from '../components/common/SEO';

const FILTERS = ['All', 'Full Stack', 'Frontend', 'AI & Tools', 'API Projects', 'Games'];

const isMatch = (project, filter) => {
  if (filter === 'All') return true;
  if (filter === 'Full Stack' && project.category.includes('Full Stack')) return true;
  if (filter === 'Frontend' && project.category.includes('Frontend')) return true;
  if (filter === 'AI & Tools' && (project.category.includes('AI') || project.category.includes('Tools'))) return true;
  if (filter === 'API Projects' && project.category.includes('API')) return true;
  if (filter === 'Games' && project.category.includes('Games')) return true;
  return false;
};

gsap.registerPlugin(ScrollTrigger);

export const Work = () => {
  const pageRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');

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

      // Parallax Effect for Images
      gsap.utils.toArray('.parallax-image').forEach((img) => {
        gsap.fromTo(img, 
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Filter Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const elements = document.querySelectorAll('.filtered-project');
    if(elements.length > 0) {
      gsap.fromTo(elements, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeFilter]);

  const filteredProjects = projects.filter(p => isMatch(p, activeFilter));
  const featuredProjects = filteredProjects.filter(p => p.featured);
  const y2026Projects = filteredProjects.filter(p => p.year === '2026' && !p.featured);
  const archiveProjects = filteredProjects.filter(p => p.year !== '2026' && !p.featured);



  const renderArchiveCard = (project, index) => (
    <TransitionLink 
      key={project.slug} 
      to={`/work/${project.slug}`}
      className="aw-project-card filtered-project group flex flex-col gap-4 border-t border-[var(--color-border-subtle)] pt-6 pb-2"
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
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[var(--color-border-subtle)] shrink-0 overflow-hidden flex items-center justify-center p-3">
          {project.thumbnail ? (
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              loading="lazy"
              className="parallax-image w-[110%] h-[110%] max-w-none object-contain grayscale group-hover:grayscale-0 group-hover:scale-[1.15] transition-all duration-700 ease-out" 
            />
          ) : <ProjectMockup slug={project.slug} />}
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
    </TransitionLink>
  );

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-8 md:pt-12 flex flex-col relative">
      <SEO title="Selected Works" description="A showcase of my recent full stack web development projects." />
      <DotGridBackground />
      <Container className="mb-16 md:mb-24 flex-grow relative z-10">
        
        {/* Header */}
        <Grid className="mb-20 md:mb-32">
          <div className="col-span-4 md:col-span-12 lg:col-span-10">
            <div className="aw-meta flex items-center justify-between mb-8">
              <div className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
                PROJECT ARCHIVE
              </div>
              <TransitionLink to="/" className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
                BACK HOME ↗
              </TransitionLink>
            </div>
            
            <h1 className="aw-title font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-8">
              EVERYTHING I'VE BUILT.
            </h1>
            
            <div className="aw-desc">
              <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
                A collection of products, experiments, interfaces and systems I've worked on over time.
              </p>
            </div>
          </div>
        </Grid>

        {/* Filter Row */}
        <div className="mb-20 overflow-x-auto no-scrollbar border-b border-[var(--color-border-subtle)] pb-4 flex gap-6 md:gap-10">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-meta text-xs tracking-widest uppercase transition-colors duration-300 focus:outline-none flex-shrink-0 relative ${activeFilter === filter ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
            >
              {filter}
              {activeFilter === filter && (
                <span className="absolute -bottom-[17px] left-0 w-full h-[1px] bg-[var(--color-accent)]"></span>
              )}
            </button>
          ))}
        </div>

        {/* FEATURED PROJECTS */}
        {featuredProjects.length > 0 && (
          <div className="mb-24 md:mb-32">
            <h2 className="aw-section-title font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-12 pb-4 border-b border-[var(--color-border-strong)]">
              FEATURED
            </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
            {featuredProjects.map((project, index) => (
              <TransitionLink 
                key={project.slug} 
                to={`/work/${project.slug}`}
                className="aw-project-card filtered-project group block"
              >
                <div className="w-full aspect-[16/9] lg:aspect-square bg-[var(--color-elevated)] rounded-sm overflow-hidden mb-6 md:mb-8 relative flex items-center justify-center">
                  {project.thumbnail ? (
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      loading="lazy"
                      className="parallax-image w-[110%] h-[110%] max-w-none object-contain p-12 lg:p-16 filter grayscale group-hover:grayscale-0 group-hover:scale-[1.15] transition-all duration-700"
                    />
                  ) : <ProjectMockup slug={project.slug} />}
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
              </TransitionLink>
            ))}
          </div>
        </div>
      )}

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

        {/* 2025 & EARLIER ARCHIVE */}
        {archiveProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="aw-section-title font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-12 pb-4 border-b border-[var(--color-border-strong)]">
              2025 & EARLIER
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12">
              {archiveProjects.map((p, i) => renderArchiveCard(p, featuredProjects.length + y2026Projects.length + i))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 uppercase">
              NO PROJECTS FOUND
            </div>
            <p className="font-body text-xl text-[var(--color-text-primary)]">
              Try adjusting your filter to explore other work.
            </p>
          </div>
        )}

      </Container>
      
      <Footer />
    </div>
  );
};
