import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from '../components/common/ScrollToTop';

// Safe lazy loader that handles chunk loading errors (e.g. after a new deployment)
const safeLazy = (importFn) => React.lazy(() => 
  importFn().catch((err) => {
    console.error('Error loading chunk, forcing reload...', err);
    window.location.reload();
    return new Promise(() => {}); // Prevent React from trying to render
  })
);

// Lazy load pages for code splitting
const Home = safeLazy(() => import('../pages/Home').then(module => ({ default: module.Home })));
const Work = safeLazy(() => import('../pages/Work').then(module => ({ default: module.Work })));
const Experience = safeLazy(() => import('../pages/Experience').then(module => ({ default: module.Experience })));
const Achievements = safeLazy(() => import('../pages/Achievements').then(module => ({ default: module.Achievements })));
const Journey = safeLazy(() => import('../pages/Journey').then(module => ({ default: module.Journey })));
const Contact = safeLazy(() => import('../pages/Contact').then(module => ({ default: module.Contact })));
const ProjectDetail = safeLazy(() => import('../pages/ProjectDetail').then(module => ({ default: module.ProjectDetail })));
const Writing = safeLazy(() => import('../pages/Writing').then(module => ({ default: module.Writing })));
const WritingDetail = safeLazy(() => import('../pages/WritingDetail').then(module => ({ default: module.WritingDetail })));

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
          <Route path="/about" element={<Navigate to="/journey" replace />} />
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
