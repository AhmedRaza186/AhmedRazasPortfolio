import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const DustBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // GSAP Fade In
    gsap.to(canvas, { opacity: 1, duration: 2, ease: "power2.out", delay: 0.2 });

    const createParticle = (yOffset = 0) => ({
      x: Math.random() * canvas.width,
      y: (Math.random() * canvas.height) + yOffset,
      radius: Math.random() * 2 + 0.5, // 0.5 to 2.5
      speedY: Math.random() * 0.4 + 0.1, // 0.1 to 0.5
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.3 + 0.05, // 0.05 to 0.35
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleOffset: Math.random() * Math.PI * 2
    });

    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 120);
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Move upward
        p.y -= p.speedY;
        
        // Wobble horizontally
        const currentX = p.x + Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * 15;

        // Reset if off screen top
        if (p.y < -10) {
          Object.assign(p, createParticle(canvas.height + 10)); // spawn below screen
          p.y = canvas.height + 10;
        }

        // Draw soft dust particle
        ctx.beginPath();
        ctx.arc(currentX, p.y, p.radius, 0, Math.PI * 2);
        
        // Neutral subtle dust color
        ctx.fillStyle = `rgba(50, 50, 50, ${p.opacity})`;
        ctx.fill();
      });

      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ opacity: 0 }}
    />
  );
};
