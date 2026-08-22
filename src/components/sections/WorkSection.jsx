import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../layout/Container';
import { Grid } from '../layout/Grid';
import { projects } from '../../data/projects';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index }) => {
  // Intentional asymmetry via alternating grid
  const isReverse = index % 2 !== 0;

  return (
    <div className="project-card col-span-4 md:col-span-12 mb-32 md:mb-40 group">
      <div className={`flex flex-col ${isReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}>
        
        {/* Visual Block - 55% width */}
        <div className="w-full lg:w-[55%]">
          {/* Browser Window Frame Mockup */}
          <div className="w-full rounded-xl bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] shadow-2xl overflow-hidden relative transition-transform duration-700 ease-out group-hover:scale-[1.02]">
            
            {/* Browser Chrome */}
            <div className="h-8 border-b border-[var(--color-border-subtle)] bg-[var(--color-canvas)] flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)] opacity-50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)] opacity-50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)] opacity-50"></div>
            </div>
            
            {/* Image / UI Placeholder */}
            <div className="w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] bg-[var(--color-canvas)] relative">
              {project.image ? (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                // CSS Dashboard Mockup for User Management System
                <div className="absolute inset-0 flex p-4 gap-4 bg-[var(--color-canvas)]">
                  {/* Sidebar */}
                  <div className="w-1/4 h-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-3 flex flex-col gap-3">
                    <div className="w-full h-4 bg-[var(--color-border-strong)] rounded-sm opacity-20 mb-4"></div>
                    <div className="w-3/4 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                    <div className="w-2/3 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                    <div className="w-4/5 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                  </div>
                  {/* Main Content */}
                  <div className="w-3/4 h-full flex flex-col gap-4">
                    {/* Header */}
                    <div className="w-full h-12 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-3 flex items-center justify-between">
                       <div className="w-1/3 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-20"></div>
                       <div className="w-8 h-8 rounded-full border border-[var(--color-border-strong)] opacity-20"></div>
                    </div>
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-3 flex flex-col justify-center gap-2">
                        <div className="w-1/2 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                        <div className="w-1/3 h-4 bg-[var(--color-border-strong)] rounded-sm opacity-30"></div>
                      </div>
                      <div className="h-16 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-3 flex flex-col justify-center gap-2">
                        <div className="w-1/2 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                        <div className="w-1/3 h-4 bg-[var(--color-border-strong)] rounded-sm opacity-30"></div>
                      </div>
                      <div className="h-16 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-3 flex flex-col justify-center gap-2">
                        <div className="w-1/2 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-10"></div>
                        <div className="w-1/3 h-4 bg-[var(--color-border-strong)] rounded-sm opacity-30"></div>
                      </div>
                    </div>
                    {/* List */}
                    <div className="flex-1 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-elevated)] p-4 flex flex-col gap-3">
                       <div className="w-full h-8 rounded-sm bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] flex items-center px-3">
                         <div className="w-6 h-6 rounded-full bg-[var(--color-border-strong)] opacity-20"></div>
                         <div className="ml-3 w-1/4 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-20"></div>
                       </div>
                       <div className="w-full h-8 rounded-sm bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] flex items-center px-3">
                         <div className="w-6 h-6 rounded-full bg-[var(--color-border-strong)] opacity-20"></div>
                         <div className="ml-3 w-1/3 h-2 bg-[var(--color-border-strong)] rounded-sm opacity-20"></div>
                       </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Block - 45% width */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-4 mb-4 md:mb-6 text-meta text-[var(--color-text-secondary)] transition-transform duration-500 group-hover:translate-x-1">
            <span>0{index + 1}</span>
            <span className="w-6 h-[1px] bg-[var(--color-border-strong)]"></span>
            <span>{project.category}</span>
          </div>
          
          <Link to={`/work/${project.slug}`} className="group/title block w-fit">
            <h3 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] mb-4 md:mb-6 leading-[1.1] transition-colors duration-300 group-hover/title:text-[var(--color-accent)]">
              {project.title}
            </h3>
          </Link>
          
          <p className="font-body text-[var(--color-text-secondary)] text-base md:text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Impact Metric Block */}
          {project.impact && (
            <div className="mb-6 border-l-2 border-[var(--color-accent)] pl-4 py-1">
              <p className="font-body text-sm md:text-base text-[var(--color-text-primary)]">
                <span className="font-semibold text-[var(--color-accent)] mr-2">Impact:</span>
                {project.impact}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          {project.technologies && (
            <div className="flex flex-wrap items-center gap-2 mb-8 font-meta text-xs text-[var(--color-text-secondary)]">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span key={i} className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-elevated)]">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-3 py-1.5 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-elevated)]">
                  +{project.technologies.length - 5} MORE
                </span>
              )}
            </div>
          )}
          
          {/* Action Links */}
          <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center font-meta font-semibold gap-4 sm:gap-6 text-xs md:text-sm">
            <Link to={`/work/${project.slug}`} className="group/link flex items-center gap-2 text-[var(--color-text-primary)] transition-all duration-300">
              CASE STUDY 
              <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover/link:translate-x-1">→</span>
            </Link>
            
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-300">
                LIVE DEMO 
                <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
              </a>
            )}
            
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="group/link flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-300">
                SOURCE CODE 
                <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
              </a>
            )}
          </div>
        </div>

      </div>
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
    <section id="work" ref={sectionRef} className="py-12 md:py-16 relative bg-[var(--color-canvas)]">
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
        <div className="mt-12 md:mt-20 text-center flex justify-center">
          <Link 
            to="/work" 
            className="group flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-canvas)] hover:bg-[var(--color-elevated)] transition-all duration-300 focus:outline-none"
          >
            <span className="font-meta text-xs md:text-sm tracking-widest text-[var(--color-text-primary)]">
              VIEW ALL PROJECTS
            </span>
            <span className="font-meta text-lg text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
              ↗
            </span>
          </Link>
        </div>

      </Container>
    </section>
  );
};
