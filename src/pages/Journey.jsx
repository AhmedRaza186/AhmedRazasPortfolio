import React, { useEffect } from 'react';
import { TransitionLink } from '../components/ui/TransitionLink';
import { Container } from '../components/layout/Container';
import { JourneySection } from '../components/sections/JourneySection';
import { SEO } from '../components/common/SEO';

export const Journey = () => {

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-[var(--color-canvas)] relative">
      <SEO title="My Journey" description="The story of how I became a developer." />
      <Container className="relative z-10">
        <TransitionLink 
          to="/" 
          className="inline-block font-meta text-xs tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
        >
          ← BACK HOME
        </TransitionLink>
      </Container>
      
      {/* The Journey Section Content */}
      <div className="-mt-12 md:-mt-20 relative z-10">
        <JourneySection />
      </div>
    </div>
  );
};
