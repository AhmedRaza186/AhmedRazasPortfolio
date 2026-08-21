import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Work } from '../pages/Work';
import { About } from '../pages/About';
import { Journey } from '../pages/Journey';
import { Contact } from '../pages/Contact';
import { ProjectDetail } from '../pages/ProjectDetail';
import { ScrollToTop } from '../components/common/ScrollToTop';

export const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};
