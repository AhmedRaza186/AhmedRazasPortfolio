import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ScrollToTop } from '../components/common/ScrollToTop';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const Work = React.lazy(() => import('../pages/Work').then(module => ({ default: module.Work })));
const Experience = React.lazy(() => import('../pages/Experience').then(module => ({ default: module.Experience })));
const About = React.lazy(() => import('../pages/About').then(module => ({ default: module.About })));
const Achievements = React.lazy(() => import('../pages/Achievements').then(module => ({ default: module.Achievements })));
const Journey = React.lazy(() => import('../pages/Journey').then(module => ({ default: module.Journey })));
const Contact = React.lazy(() => import('../pages/Contact').then(module => ({ default: module.Contact })));
const ProjectDetail = React.lazy(() => import('../pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const Writing = React.lazy(() => import('../pages/Writing').then(module => ({ default: module.Writing })));
const WritingDetail = React.lazy(() => import('../pages/WritingDetail').then(module => ({ default: module.WritingDetail })));

// A simple loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen bg-[var(--color-canvas)] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<WritingDetail />} />
        </Routes>
      </Suspense>
    </>
  );
};
