import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSound } from '../../context/SoundContext';

// Lazily load easter egg UI components
const EasterEggTerminal = React.lazy(() => import('./EasterEggTerminal').then(m => ({ default: m.EasterEggTerminal })));
const EasterEggNeon = React.lazy(() => import('./EasterEggNeon').then(m => ({ default: m.EasterEggNeon })));
const EasterEggMatrix = React.lazy(() => import('./EasterEggMatrix').then(m => ({ default: m.EasterEggMatrix })));

export const EasterEgg = () => {
  const { playAlarm } = useSound();
  const [activeEgg, setActiveEgg] = useState(null); // 'gravity', 'terminal', 'neon', 'matrix'
  const engineRef = useRef(null);

  useEffect(() => {
    let keyBuffer = '';
    const maxLen = 10;

    const handleKeyDown = (e) => {
      if (activeEgg) return;
      if (!/^[a-zA-Z]$/.test(e.key)) return;

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > maxLen) {
        keyBuffer = keyBuffer.slice(-maxLen);
      }

      if (keyBuffer.endsWith('ahmed')) {
        triggerGravityCollapse();
      } else if (keyBuffer.endsWith('hack')) {
        setActiveEgg('terminal');
      } else if (keyBuffer.endsWith('neon')) {
        setActiveEgg('neon');
      } else if (keyBuffer.endsWith('matrix')) {
        setActiveEgg('matrix');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEgg]);

  const triggerGravityCollapse = async () => {
    if (activeEgg) return;
    setActiveEgg('gravity');
    playAlarm();

    // Dynamically import matter-js ONLY when needed
    const Matter = (await import('matter-js')).default;
    const { Engine, Runner, MouseConstraint, Mouse, World, Bodies } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;

    const targetSelectors = 'h1, h2, h3, h4, p, img, button, .process-step, .work-card, .hero-meta, .hero-cta, .about-split';
    const elements = Array.from(document.querySelectorAll(targetSelectors)).filter(el => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight && rect.bottom > 0;
    });

    const bodyDOMMap = new Map();
    const bodies = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      
      const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          restitution: 0.6,
          friction: 0.1,
          render: { visible: false }
        }
      );
      
      bodies.push(body);
      
      const computed = window.getComputedStyle(el);
      const clone = el.cloneNode(true);
      
      clone.style.position = 'absolute';
      clone.style.margin = '0';
      clone.style.top = '0px';
      clone.style.left = '0px';
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      
      clone.style.fontSize = computed.fontSize;
      clone.style.fontFamily = computed.fontFamily;
      clone.style.fontWeight = computed.fontWeight;
      clone.style.color = computed.color;
      clone.style.lineHeight = computed.lineHeight;
      clone.style.textAlign = computed.textAlign;
      clone.style.background = computed.background;
      clone.style.borderRadius = computed.borderRadius;
      clone.style.display = computed.display;
      clone.style.boxSizing = 'border-box';
      clone.style.pointerEvents = 'none'; 
      
      bodyDOMMap.set(body, { clone, width: rect.width, height: rect.height, original: el });
      
      el.style.opacity = '0';
    });

    const container = document.createElement('div');
    container.id = 'easter-egg-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '99998';
    container.style.pointerEvents = 'none'; 
    document.body.appendChild(container);

    bodyDOMMap.forEach(({ clone }) => {
      container.appendChild(clone);
    });

    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const ceiling = Bodies.rectangle(window.innerWidth / 2, -1000, window.innerWidth * 2, 100, { isStatic: true });

    World.add(engine.world, [...bodies, floor, leftWall, rightWall, ceiling]);

    const mouse = Mouse.create(document.body);
    const mConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    World.add(engine.world, mConstraint);
    
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

    const syncDOM = () => {
      if (!engineRef.current) return;
      
      bodyDOMMap.forEach((data, body) => {
        const x = body.position.x - data.width / 2;
        const y = body.position.y - data.height / 2;
        data.clone.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
      });
      
      requestAnimationFrame(syncDOM);
    };

    const runner = Runner.create();
    Runner.run(runner, engine);
    requestAnimationFrame(syncDOM);
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        Runner.stop(runner);
        Engine.clear(engine);
        if (container.parentNode) container.parentNode.removeChild(container);
        bodyDOMMap.forEach(({ original }) => { original.style.opacity = ''; });
        setActiveEgg(null);
        window.removeEventListener('keydown', handleEsc);
      }
    };
    window.addEventListener('keydown', handleEsc);
  };

  return (
    <Suspense fallback={null}>
      {activeEgg === 'gravity' && (
        <div className="fixed top-4 right-4 z-[99999] pointer-events-none text-[var(--color-text-secondary)] font-meta animate-pulse">
          PHYSICS ENGINE ACTIVE [PRESS ESC TO RESET]
        </div>
      )}
      {activeEgg === 'terminal' && <EasterEggTerminal onClose={() => setActiveEgg(null)} />}
      {activeEgg === 'neon' && <EasterEggNeon onClose={() => setActiveEgg(null)} />}
      {activeEgg === 'matrix' && <EasterEggMatrix onClose={() => setActiveEgg(null)} />}
    </Suspense>
  );
};
