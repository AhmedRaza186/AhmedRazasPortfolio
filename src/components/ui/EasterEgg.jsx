import React, { useEffect, useState, useRef } from 'react';
import Matter from 'matter-js';
import { useSound } from '../../context/SoundContext';

export const EasterEgg = () => {
  const { playAlarm } = useSound();
  const [active, setActive] = useState(false);
  const engineRef = useRef(null);

  useEffect(() => {
    let keyBuffer = [];
    const secretCode = ['a', 'h', 'm', 'e', 'd'];

    const handleKeyDown = (e) => {
      if (active) return;

      const key = e.key.toLowerCase();
      keyBuffer.push(key);
      if (keyBuffer.length > secretCode.length) {
        keyBuffer.shift();
      }

      if (keyBuffer.join('') === secretCode.join('')) {
        triggerGravityCollapse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  const triggerGravityCollapse = () => {
    if (active) return;
    setActive(true);
    playAlarm();

    const { Engine, Runner, MouseConstraint, Mouse, World, Bodies } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;

    // Grab elements that are visually interesting to drop
    const targetSelectors = 'h1, h2, h3, h4, p, img, button, .process-step, .work-card, .hero-meta, .hero-cta, .about-split';
    const elements = Array.from(document.querySelectorAll(targetSelectors)).filter(el => {
      const rect = el.getBoundingClientRect();
      // Only include elements currently visible in the viewport
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
      
      // Preserve styles
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
      // Prevent interactions on the clone itself so we can drag it
      clone.style.pointerEvents = 'none'; 
      
      bodyDOMMap.set(body, { clone, width: rect.width, height: rect.height, original: el });
      
      // Hide original
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

    // Boundaries
    const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth * 2, 100, { isStatic: true });
    const leftWall = Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight * 2, { isStatic: true });
    // Keep them from flying out the top too easily
    const ceiling = Bodies.rectangle(window.innerWidth / 2, -1000, window.innerWidth * 2, 100, { isStatic: true });

    World.add(engine.world, [...bodies, floor, leftWall, rightWall, ceiling]);

    // Setup mouse
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

    // Render loop for DOM syncing
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
  };

  return null; // This component has no UI of its own
};
