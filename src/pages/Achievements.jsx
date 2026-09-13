import React, { useEffect, useRef, useState } from 'react';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { NetworkBackground } from '../components/ui/NetworkBackground';
import { SEO } from '../components/common/SEO';
import { achievements } from '../data/achievements';
import Confetti from 'react-confetti';
import gsap from 'gsap';

export const Achievements = () => {
  const pageRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [windowDimension, setWindowDimension] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !pageRef.current) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.achievements-hero-text', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
      })
      .from('.achievement-row', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }, '-=0.6');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Window resize for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    
    // Unmount confetti after 10s to clean up DOM
    const timer = setTimeout(() => setShowConfetti(false), 10000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={pageRef} className="pt-24 md:pt-32 min-h-screen bg-[var(--color-canvas)] relative flex flex-col">
      <SEO title="Achievements" description="My professional achievements and certifications." />
      <NetworkBackground />
      
      {/* Celebration Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          colors={['#FFD700', '#FFA500', '#FF8C00', '#F8E8A2']}
          recycle={false}
          numberOfPieces={400}
          gravity={0.12}
          initialVelocityY={15}
          style={{ position: 'fixed', zIndex: 100, top: 0, left: 0, pointerEvents: 'none' }}
        />
      )}

      {/* Hero Section */}
      <Container className="mb-24 md:mb-40">
        <Grid>
          <div className="col-span-12 md:col-span-10 lg:col-span-8">
            <p className="achievements-hero-text font-meta text-xs tracking-widest text-[var(--color-text-secondary)] mb-6 md:mb-8">
              09 / ACHIEVEMENTS
            </p>
            <h1 className="achievements-hero-text font-display text-5xl md:text-7xl lg:text-[7.5rem] leading-[0.9] text-[var(--color-text-primary)] mb-8 md:mb-12 tracking-tight">
              THINGS I'VE EARNED.
            </h1>
            <p className="achievements-hero-text font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              A curated archive of verified certifications, hackathon victories, internships, and technical milestones that mark my continuous journey in software engineering.
            </p>
          </div>
        </Grid>
      </Container>

      {/* Achievements Archive */}
      <Container className="mb-32 md:mb-48">
        <div className="flex flex-col space-y-16 md:space-y-32">
          {achievements.map((achievement, index) => (
            <div key={achievement.id} className="achievement-row group">
              <Grid className="items-start gap-y-8">
                
                {/* Media Column (Left) */}
                <div className="col-span-12 lg:col-span-5 relative">
                  <div className="absolute -left-12 top-0 hidden xl:block font-meta text-xs tracking-widest text-[var(--color-text-tertiary)]">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  
                  <div 
                    className={`w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] overflow-hidden rounded-sm bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] transition-transform duration-700 ease-out group-hover:scale-[1.02] ${achievement.image ? 'cursor-zoom-in' : ''}`}
                    onClick={() => achievement.image && setSelectedImage(achievement.image)}
                  >
                    {achievement.image ? (
                      achievement.image.toLowerCase().endsWith('.pdf') ? (
                        <iframe 
                          src={`${achievement.image}#toolbar=0&navpanes=0&scrollbar=0`}
                          title={`${achievement.title} certificate`}
                          className="w-full h-full border-none pointer-events-none filter grayscale group-hover:grayscale-0 transition-all duration-700 bg-white"
                        />
                      ) : (
                        <img 
                          src={achievement.image} 
                          alt={`${achievement.title} certificate`} 
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[var(--color-canvas)] to-[var(--color-elevated)] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-accent)_0%,_transparent_70%)]"></div>
                        <span className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] opacity-20 select-none">
                          {achievement.title.substring(0, 3).toUpperCase()}
                        </span>
                        <span className="font-meta text-xs tracking-widest text-[var(--color-text-tertiary)] mt-4 uppercase relative z-10">
                          {achievement.type}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Column (Right) */}
                <div className="col-span-12 lg:col-start-7 lg:col-span-6 flex flex-col justify-center h-full pt-2 md:pt-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-meta text-xs tracking-widest text-[var(--color-accent)] uppercase">
                      {achievement.type}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
                    <span className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)]">
                      {achievement.year}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-[var(--color-text-primary)] mb-4">
                    {achievement.title}
                  </h2>
                  
                  <p className="font-meta text-sm tracking-widest text-[var(--color-text-primary)] mb-6 md:mb-8 uppercase">
                    ISSUED BY {achievement.issuer}
                  </p>
                  
                  {achievement.description && (
                    <p className="font-body text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 md:mb-12 max-w-xl">
                      {achievement.description}
                    </p>
                  )}
                  
                  {achievement.credentialUrl && (
                    <a 
                      href={achievement.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-meta text-xs tracking-widest text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors group/btn"
                    >
                      VIEW CREDENTIAL
                      <span className="transform transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1">↗</span>
                    </a>
                  )}
                </div>

              </Grid>
            </div>
          ))}
        </div>
      </Container>

      {/* Fullscreen Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
          style={{ opacity: 0, animation: 'fadeIn 0.3s ease forwards' }}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
          
          {selectedImage.toLowerCase().endsWith('.pdf') ? (
            <iframe 
              src={selectedImage} 
              title="Full size certificate preview" 
              className="w-[95vw] md:w-[90vw] h-[85vh] md:h-[90vh] rounded-sm shadow-2xl relative z-[110] bg-white border-none cursor-auto"
              style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
              onClick={(e) => e.stopPropagation()} 
            />
          ) : (
            <img 
              src={selectedImage} 
              alt="Full size certificate" 
              className="max-w-full max-h-full object-contain rounded-sm shadow-2xl relative z-[110] cursor-auto"
              style={{ animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
              onClick={(e) => e.stopPropagation()} 
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};
