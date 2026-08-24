import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { DemoMedia } from '../components/projects/DemoMedia';
import { TripleMonitorShowcase } from '../components/projects/TripleMonitorShowcase';

gsap.registerPlugin(ScrollTrigger);

export const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [zoomedImage, setZoomedImage] = useState(null);

  const projectIndex = useMemo(() => projects.findIndex(p => p.slug === slug), [slug]);
  const project = projectIndex !== -1 ? projects[projectIndex] : null;
  const nextProject = projectIndex !== -1 ? projects[(projectIndex + 1) % projects.length] : null;

  useEffect(() => {
    if (!project) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set('.cs-anim, .cs-image-anim', { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 });
      return;
    }

    let ctx = gsap.context(() => {
      // Header Sequence
      const tl = gsap.timeline();
      tl.from('.cs-nav', { y: -10, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.cs-meta-top', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.cs-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.cs-desc-meta', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, '-=0.4');

      // Hero Image Reveal
      if (document.querySelector('.cs-image-container')) {
        tl.fromTo('.cs-image-container', 
          { clipPath: 'inset(100% 0% 0% 0%)' }, 
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' }, 
          '-=0.6'
        ).from('.cs-image', { scale: 1.1, duration: 1.2, ease: 'power4.inOut' }, '-=1.2');
      }

      // Scroll Sections
      const sections = gsap.utils.toArray('.cs-section');
      sections.forEach(sec => {
        gsap.from(sec, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
          }
        });
      });

      // Gallery Stagger
      const galleryItems = gsap.utils.toArray('.cs-gallery-item');
      if (galleryItems.length > 0) {
        gsap.from(galleryItems, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cs-gallery-grid',
            start: 'top 85%',
          }
        });
      }

      // Stagger features
      const featureItems = gsap.utils.toArray('.cs-feature-item');
      if (featureItems.length > 0) {
        gsap.from(featureItems, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cs-features-grid',
            start: 'top 80%',
          }
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, [project]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (zoomedImage === null || !project?.uiScreenshots) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setZoomedImage(null);
      } else if (e.key === 'ArrowLeft') {
        setZoomedImage(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        // Calculate remaining screenshots in gallery
        const remainingScreenshots = project.uiScreenshots.slice(2);
        setZoomedImage(prev => (prev < remainingScreenshots.length - 1 ? prev + 1 : prev));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage, project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[var(--color-canvas)] flex flex-col justify-center items-center">
        <Container>
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl mb-8">PROJECT NOT FOUND</h1>
            <button 
              onClick={() => navigate('/work')}
              className="font-meta text-xs tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
            >
              ← BACK TO WORK
            </button>
          </div>
        </Container>
      </div>
    );
  }

  const { caseStudy } = project;

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-8 md:pt-12">
      
      {/* Top Navigation */}
      <Container className="mb-16 md:mb-24">
        <button 
          onClick={() => navigate('/work')}
          className="cs-nav font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors focus:outline-none flex items-center gap-2"
        >
          ← BACK TO WORK
        </button>
      </Container>

      {/* Project Header */}
      <Container className="mb-16 md:mb-24">
        <Grid>
          <div className="col-span-4 md:col-span-12 lg:col-span-10">
            {/* Logo */}
            <div className="cs-meta-top mb-12">
               {project.logo ? (
                 <img src={project.logo} alt={`${project.title} Logo`} className="h-12 md:h-16 w-auto object-contain" />
               ) : (
                 <div className="font-display text-3xl text-[var(--color-text-primary)] tracking-tight">
                    {project.title}
                 </div>
               )}
            </div>
            
            <h1 className="cs-title font-display text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-12">
              {project.title}
            </h1>

            <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-[var(--color-border-subtle)] pt-8 mb-12">
              <div className="cs-desc-meta">
                <div className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-2">CATEGORY</div>
                <div className="font-body text-base text-[var(--color-text-primary)]">{project.category}</div>
              </div>
              <div className="cs-desc-meta">
                <div className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-2">YEAR</div>
                <div className="font-body text-base text-[var(--color-text-primary)]">{project.year}</div>
              </div>
              <div className="cs-desc-meta max-w-xl">
                <div className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-2">OVERVIEW</div>
                <div className="font-body text-base text-[var(--color-text-secondary)] leading-relaxed">{project.description}</div>
              </div>
            </div>

            {/* Action Links (Top) */}
            {(project.liveUrl || project.githubUrl || project.linkedinUrl) && (
              <div className="cs-desc-meta flex flex-wrap gap-8 pt-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                    LIVE DEMO <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                    SOURCE CODE <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </a>
                )}
                {project.linkedinUrl && (
                  <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                    LINKEDIN <span className="text-[var(--color-accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </Grid>
      </Container>

      {/* Triple Monitor Showcase */}
      <TripleMonitorShowcase 
        logoImg={project.logoImg} 
        thumbnail={project.thumbnail}
        uiScreenshots={project.uiScreenshots} 
        title={project.title} 
      />

      {/* Demo Video */}
      {project.demo && (
        <Container className="mb-24 md:mb-40">
           <DemoMedia demo={project.demo} />
        </Container>
      )}

      {/* Case Study Content */}
      <Container className="mb-32 md:mb-48">
        
        {/* Intro */}
        {caseStudy?.intro && (
          <Grid className="cs-section mb-24 md:mb-32">
            <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3">
              <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-[1.3] text-[var(--color-text-primary)]">
                {caseStudy.intro}
              </p>
            </div>
          </Grid>
        )}

        {/* Problem & Approach */}
        <Grid className="mb-24 md:mb-32 gap-y-16">
          {caseStudy?.problem && (
            <div className="cs-section col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-1">
              <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">THE PROBLEM</h3>
              <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {caseStudy.problem}
              </p>
            </div>
          )}
          {caseStudy?.approach && (
            <div className="cs-section col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-7">
              <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">THE APPROACH</h3>
              <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
                {caseStudy.approach}
              </p>
            </div>
          )}
        </Grid>

        {/* Solution */}
        {caseStudy?.solution && (
          <Grid className="cs-section mb-24 md:mb-32">
            <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3 border-t border-[var(--color-border-subtle)] pt-16">
              <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">THE SOLUTION</h3>
              <p className="font-body text-lg md:text-xl text-[var(--color-text-primary)] leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </Grid>
        )}

        {/* Features */}
        {caseStudy?.features && caseStudy.features.length > 0 && (
          <div className="cs-section mb-24 md:mb-40">
            <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-12 lg:mb-16">KEY FEATURES</h3>
            <Grid className="cs-features-grid gap-y-12">
              {caseStudy.features.map((feature, idx) => (
                <div key={idx} className="cs-feature-item col-span-4 md:col-span-6 lg:col-span-3">
                  <div className="font-meta text-[10px] text-[var(--color-text-secondary)] mb-4 pb-4 border-b border-[var(--color-border-subtle)]">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h4 className="font-body text-lg font-medium text-[var(--color-text-primary)] mb-3">
                    {feature.name}
                  </h4>
                  <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </Grid>
          </div>
        )}

        {/* Tech & Role & Challenges */}
        <Grid className="cs-section mb-24 md:mb-40 gap-y-16 border-t border-[var(--color-border-subtle)] pt-16">
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
             <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">BUILT WITH</h3>
             {project.technologies && project.technologies.length > 0 ? (
               <ul className="flex flex-wrap gap-2">
                 {project.technologies.map((tech, i) => (
                   <li key={i} className="font-meta text-[10px] tracking-widest px-3 py-1.5 border border-[var(--color-border-subtle)] rounded-full text-[var(--color-text-primary)] bg-[var(--color-canvas)]">{tech}</li>
                 ))}
               </ul>
             ) : (
               <span className="font-body text-base text-[var(--color-text-secondary)]">—</span>
             )}
          </div>
          
          <div className="col-span-4 md:col-span-4 lg:col-span-4">
             <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">MY ROLE</h3>
             <p className="font-body text-base text-[var(--color-text-primary)]">
               {caseStudy?.role || "Full Stack Developer"}
             </p>
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-5">
             <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6">CHALLENGES</h3>
             <p className="font-body text-base text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
               {caseStudy?.challenges || "Standard implementation focusing on core stability and performance."}
             </p>
          </div>
        </Grid>

        {/* Outcome */}
        {caseStudy?.outcome && (
          <Grid className="cs-section mb-24 md:mb-32">
            <div className="col-span-4 md:col-span-12 lg:col-span-8 lg:col-start-3">
              <h3 className="font-meta text-xs text-[var(--color-text-secondary)] tracking-widest mb-6 text-center lg:text-left">OUTCOME</h3>
              <p className="font-display text-2xl md:text-4xl leading-[1.2] text-[var(--color-text-primary)] text-center lg:text-left">
                {caseStudy.outcome}
              </p>
            </div>
          </Grid>
        )}

        {/* Bottom Links */}
        {(project.liveUrl || project.githubUrl || project.linkedinUrl) && (
          <Grid className="cs-section mt-16 md:mt-24 border-t border-[var(--color-border-subtle)] pt-16">
            <div className="col-span-4 md:col-span-12 flex flex-wrap gap-8 justify-center">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 focus:outline-none items-center p-4">
                  <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">LIVE PROJECT</span>
                  <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                    <span className="font-body text-xl md:text-2xl relative">
                      View Site
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all origin-left scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                    <span className="font-meta text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[var(--color-accent)]">↗</span>
                  </div>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 focus:outline-none items-center p-4">
                  <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">VIEW SOURCE</span>
                  <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                    <span className="font-body text-xl md:text-2xl relative">
                      GitHub
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all origin-left scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                    <span className="font-meta text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[var(--color-accent)]">↗</span>
                  </div>
                </a>
              )}
              {project.linkedinUrl && (
                <a href={project.linkedinUrl} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2 focus:outline-none items-center p-4">
                  <span className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">LINKEDIN</span>
                  <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                    <span className="font-body text-xl md:text-2xl relative">
                      Profile
                      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all origin-left scale-x-0 group-hover:scale-x-100"></span>
                    </span>
                    <span className="font-meta text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[var(--color-accent)]">↗</span>
                  </div>
                </a>
              )}
            </div>
          </Grid>
        )}

      </Container>

      {/* Next Project Navigation */}
      {nextProject && (
        <div className="cs-section border-t border-[var(--color-border-subtle)] bg-[var(--color-canvas)]">
          <Container className="py-24 md:py-32">
            <Link to={`/work/${nextProject.slug}`} className="group block w-fit mx-auto text-center focus:outline-none relative py-8">
              <span className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] mb-6 block transition-colors group-hover:text-[var(--color-accent)]">
                NEXT PROJECT →
              </span>
              <h2 className="font-display text-4xl md:text-6xl text-[var(--color-text-primary)] group-hover:opacity-70 transition-opacity mb-4">
                {nextProject.title}
              </h2>
              {nextProject.category && (
                <div className="font-body text-base md:text-lg text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {nextProject.category}
                </div>
              )}
              {nextProject.thumbnail && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] aspect-video rounded-sm overflow-hidden opacity-0 pointer-events-none group-hover:opacity-10 transition-opacity duration-700 -z-10 mix-blend-luminosity">
                  <img src={nextProject.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
              )}
            </Link>
          </Container>
        </div>
      )}

      {/* Image Lightbox Overlay */}
      {zoomedImage !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={() => setZoomedImage(null)}
          style={{ opacity: 0, animation: 'fadeIn 0.3s ease forwards' }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
          
          {/* Controls Overlay */}
          <div className="absolute inset-0 pointer-events-none z-[120]">
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white bg-red-600/90 hover:bg-red-700 backdrop-blur-md rounded-sm transition-colors px-6 py-3 font-meta text-sm md:text-base tracking-widest pointer-events-auto shadow-lg"
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
            >
              CLOSE [X]
            </button>
            
            {zoomedImage > 0 && (
              <button 
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors font-meta text-3xl md:text-4xl pointer-events-auto shadow-lg"
                onClick={(e) => { e.stopPropagation(); setZoomedImage(zoomedImage - 1); }}
              >
                ←
              </button>
            )}
            
            {zoomedImage < (project.uiScreenshots ? project.uiScreenshots.slice(2).length - 1 : 0) && (
              <button 
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-colors font-meta text-3xl md:text-4xl pointer-events-auto shadow-lg"
                onClick={(e) => { e.stopPropagation(); setZoomedImage(zoomedImage + 1); }}
              >
                →
              </button>
            )}
          </div>
          
          <img 
            key={zoomedImage} // Force re-animation on index change
            src={project.uiScreenshots ? project.uiScreenshots.slice(2)[zoomedImage] : ''} 
            alt={`Zoomed project view ${zoomedImage + 3}`} 
            className="max-w-full max-h-full object-contain rounded-sm shadow-2xl relative z-[110]"
            style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <Footer />
    </div>
  );
};
