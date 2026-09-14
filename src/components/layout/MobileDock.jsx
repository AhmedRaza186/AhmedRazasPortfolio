import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Briefcase, Award, Map, PenTool, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useTransition } from '../../context/TransitionContext';

export const MobileDock = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dockRef = useRef(null);
  const location = useLocation();
  const { playTransition } = useTransition();

  const dockLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Work', path: '/work', icon: Briefcase },
    { name: 'Exp', path: '/experience', icon: Award },
    { name: 'Journey', path: '/journey', icon: Map },
    { name: 'Writing', path: '/writing', icon: PenTool },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current + 10 && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY < 50) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dockRef.current) {
      if (isVisible) {
        gsap.to(dockRef.current, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
      } else {
        gsap.to(dockRef.current, { y: 100, opacity: 0, duration: 0.4, ease: 'power3.in' });
      }
    }
  }, [isVisible]);

  const handleNavigation = (e, path) => {
    if (location.pathname === path) return;
    e.preventDefault();
    playTransition(path);
  };

  return (
    <div 
      ref={dockRef}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 w-[95%] max-w-sm"
    >
      <div className="bg-[var(--color-canvas)]/80 backdrop-blur-xl border border-[var(--color-border-subtle)] rounded-full px-3 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {dockLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          
          return (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavigation(e, link.path)}
              className={`relative flex flex-col items-center justify-center p-2 rounded-full min-w-[3.5rem] transition-colors duration-300 ${
                isActive 
                  ? 'text-[var(--color-canvas)] bg-[var(--color-text-primary)]' 
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <Icon strokeWidth={isActive ? 2.5 : 2} className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium leading-none tracking-wide">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};
