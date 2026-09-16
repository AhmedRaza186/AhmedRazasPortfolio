import React from 'react';
import { PortfolioIntro } from '../components/layout/PortfolioIntro';
import { Hero } from '../components/sections/Hero';
import { WorkSection } from '../components/sections/WorkSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { PortfolioGuide } from '../components/guide/PortfolioGuide';
import { Footer } from '../components/layout/Footer';
import { SEO } from '../components/common/SEO';

export const Home = () => {
  return (
    <>
      <SEO />
      <PortfolioIntro />
      <PortfolioGuide />
      
      <div className="jarvis-section" data-jarvis-explain="This is the Hero section. It introduces Ahmed as a Product-focused Full Stack Developer who builds engaging digital experiences.">
        <Hero />
      </div>
      
      <div className="jarvis-section" data-jarvis-explain="Here is the About section. It provides a brief overview of Ahmed's background, his passion for AI, and his approach to creating scalable applications.">
        <AboutSection />
      </div>
      
      <div className="jarvis-section" data-jarvis-explain="This is the Work section. Here you can see Ahmed's selected projects, including his e-commerce platforms and SaaS applications.">
        <WorkSection />
      </div>
      
      <div className="jarvis-section" data-jarvis-explain="The Skills section highlights the technologies Ahmed uses daily, like React, Node.js, and modern AI tools.">
        <SkillsSection />
      </div>
      
      <div className="jarvis-section" data-jarvis-explain="Finally, the Contact section. If you want to collaborate or have a chat, this is where you can reach out.">
        <ContactSection />
      </div>
      
      <Footer />
    </>
  );
};
