import React from 'react';
import { PortfolioIntro } from '../components/layout/PortfolioIntro';
import { Hero } from '../components/sections/Hero';
import { WorkSection } from '../components/sections/WorkSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { PortfolioGuide } from '../components/guide/PortfolioGuide';
import { Footer } from '../components/layout/Footer';

export const Home = () => {
  return (
    <>
      <PortfolioIntro />
      <PortfolioGuide />
      <Hero />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </>
  );
};
