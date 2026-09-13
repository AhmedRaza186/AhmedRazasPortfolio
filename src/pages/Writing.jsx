import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Container } from '../components/layout/Container';
import { Grid } from '../components/layout/Grid';
import { Footer } from '../components/layout/Footer';
import { writingArticles } from '../data/writing';
import { useTransition } from '../context/TransitionContext';
import { SEO } from '../components/common/SEO';

export const Writing = () => {
  const pageRef = useRef(null);
  const { navigateWithTransition } = useTransition();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.writing-meta', { y: 20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.writing-title', { y: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
        .from('.article-card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.4');
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-24 md:pt-32 flex flex-col">
      <SEO title="Writing" description="Thoughts, learnings, and technical articles by Ahmed Raza." />
      <Container className="mb-24 md:mb-32 flex-grow">
        
        {/* Header Section */}
        <div className="mb-20">
          <div className="writing-meta text-meta flex items-center gap-4 text-[var(--color-text-secondary)] mb-8">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] inline-block"></span>
              09 / WRITING
            </div>
          </div>
          
          <h1 className="writing-title font-display text-[clamp(3.5rem,7vw,5.5rem)] leading-[0.9] tracking-tight text-[var(--color-text-primary)] mb-8">
            THOUGHTS &<br/>LEARNINGS.
          </h1>
        </div>

        {/* Articles List */}
        <div className="flex flex-col border-t border-[var(--color-border-subtle)]">
          {writingArticles.map((article, idx) => (
            <div 
              key={article.slug} 
              onClick={() => navigateWithTransition(`/writing/${article.slug}`)}
              className="article-card group block py-8 md:py-12 border-b border-[var(--color-border-subtle)] cursor-pointer hover:bg-[var(--color-text-secondary)]/5 -mx-4 px-4 rounded-sm transition-colors"
            >
              <Grid className="items-center">
                
                {/* Meta data (Date & Read Time) */}
                <div className="col-span-4 md:col-span-3 mb-4 md:mb-0">
                  <div className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)] mb-2 group-hover:text-[var(--color-text-primary)] transition-colors">
                    {article.date}
                  </div>
                  <div className="font-meta text-[10px] tracking-widest text-[var(--color-text-secondary)]/70">
                    {article.readTime}
                  </div>
                </div>

                {/* Article Content */}
                <div className="col-span-4 md:col-span-8">
                  <h2 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {article.title}
                  </h2>
                  <p className="font-body text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                    {article.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="hidden md:flex col-span-1 justify-end">
                  <span className="font-meta text-xl text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </div>
                
              </Grid>
            </div>
          ))}
        </div>
        
      </Container>
      <Footer />
    </div>
  );
};
