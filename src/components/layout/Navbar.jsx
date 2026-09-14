import React, { useState, useEffect } from 'react';
import { TransitionNavLink } from '../ui/TransitionNavLink';
import { Container } from './Container';
import { Logo } from '../common/Logo';
import { siteConfig } from '../../data/site';
import { ThemeToggle } from '../ui/ThemeToggle';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Experience', path: '/experience' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Journey', path: '/journey' },
    { name: 'Writing', path: '/writing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-canvas)]/90 backdrop-blur-md border-b border-[var(--color-border-subtle)] py-4'
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <Container className="flex items-center justify-between">
        <div className="flex-shrink-0 z-50 relative">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <TransitionNavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-meta transition-colors duration-200 relative group py-2 ${
                  isActive
                    ? 'text-[var(--color-text-primary)] font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span
                    className={`absolute bottom-1 left-0 h-[1px] bg-[var(--color-text-primary)] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </TransitionNavLink>
          ))}
          
          <a
            href={siteConfig.cvUrl}
            download="Ahmed_Raza_CV.pdf"
            className="text-meta text-[var(--color-text-primary)] transition-colors duration-200 hover:text-[var(--color-accent)] py-2 ml-4 flex items-center gap-1"
          >
            DOWNLOAD CV ↗
          </a>
          
          <ThemeToggle />
        </nav>

        {/* Mobile Actions */}
        <div className="md:hidden flex items-center space-x-4 z-50">
          <a
            href={siteConfig.cvUrl}
            download="Ahmed_Raza_CV.pdf"
            className="text-xs font-medium tracking-wider text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200 border border-[var(--color-border-subtle)] px-3 py-1.5 rounded-full"
          >
            CV ↗
          </a>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};
