import React from 'react';
import { Container } from '../components/layout/Container';
import { SEO } from '../components/common/SEO';

export const About = () => {
  return (
    <Container className="py-24">
      <SEO title="About" description="Learn more about my background and skills." />
      <h1 className="text-heading">About</h1>
      <p className="mt-4">Placeholder for about section.</p>
    </Container>
  );
};
