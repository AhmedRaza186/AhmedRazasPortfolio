import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const HourglassBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let pileHeight = 0;
    const maxPileHeight = 250;
    
    // Hourglass metrics
    // We'll scale these if on mobile, but keep logic relative to center.
    let scale = 1;
    let cx, cy;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
      scale = window.innerWidth < 768 ? 0.75 : 1;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // GSAP Fade In
    gsap.to(canvas, { opacity: 1, duration: 2, ease: "power2.out", delay: 0.2 });

    const createParticle = () => ({
      x: cx + (Math.random() - 0.5) * (200 * scale),
      y: cy - (250 * scale) - (Math.random() * 50),
      vx: (Math.random() - 0.5) * 1,
      vy: Math.random() * 1,
      radius: Math.random() * 1.5 + 0.5,
      dead: false
    });

    // Initial fill of particles in top half
    for (let i = 0; i < 300; i++) {
      particles.push({
        ...createParticle(),
        y: cy - (Math.random() * (250 * scale))
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const halfHeight = 270 * scale;
      const neckWidth = 10 * scale;
      const topWidth = 110 * scale; // Half-width at top

      // Draw accumulating pile
      if (pileHeight > 0) {
        const ph = pileHeight * scale;
        const currentY = cy + halfHeight - ph;
        // width at currentY
        const wAtY = neckWidth + (topWidth - neckWidth) * ((halfHeight - ph) / halfHeight);
        
        ctx.beginPath();
        ctx.moveTo(cx - wAtY, currentY); // Top left of pile
        ctx.lineTo(cx + wAtY, currentY); // Top right of pile
        ctx.lineTo(cx + topWidth, cy + halfHeight); // Bottom right
        ctx.lineTo(cx - topWidth, cy + halfHeight); // Bottom left
        ctx.closePath();
        ctx.fillStyle = 'rgba(120, 120, 120, 0.4)'; // Sand color
        ctx.fill();
      }

      let activeParticles = 0;
      
      particles.forEach(p => {
        if (p.dead) return;
        activeParticles++;
        
        p.vy += 0.15; // Gravity
        if (p.vy > 4) p.vy = 4; // Terminal velocity
        
        // Jitter for sand flowing effect
        p.vx += (Math.random() - 0.5) * 0.2;
        p.vx *= 0.95; // Horizontal friction
        
        p.x += p.vx;
        p.y += p.vy;
        
        const dy = cy - p.y;
        
        // Top half funnel constraints
        if (dy > 0 && dy <= halfHeight) {
          const allowedWidth = neckWidth + (topWidth - neckWidth) * (dy / halfHeight);
          
          if (p.x < cx - allowedWidth) {
            p.x = cx - allowedWidth;
            p.vx = Math.abs(p.vx) * 0.5 + Math.random() * 1; // Slide right
            p.vy *= 0.8;
          }
          if (p.x > cx + allowedWidth) {
            p.x = cx + allowedWidth;
            p.vx = -Math.abs(p.vx) * 0.5 - Math.random() * 1; // Slide left
            p.vy *= 0.8;
          }
        } 
        // Bottom half constraints
        else if (dy < 0 && Math.abs(dy) <= halfHeight) {
          const bottomDy = Math.abs(dy);
          const allowedWidth = neckWidth + (topWidth - neckWidth) * (bottomDy / halfHeight);
          
          if (p.x < cx - allowedWidth) {
            p.x = cx - allowedWidth;
            p.vx = Math.abs(p.vx) * 0.5;
          }
          if (p.x > cx + allowedWidth) {
            p.x = cx + allowedWidth;
            p.vx = -Math.abs(p.vx) * 0.5;
          }
          
          // Hit the pile
          const ph = pileHeight * scale;
          if (bottomDy >= halfHeight - ph) {
            p.dead = true;
            if (pileHeight < maxPileHeight) {
              pileHeight += 0.03; // Slowly grow pile
            }
          }
        }

        // Failsafe if it falls out of bounds somehow
        if (p.y > cy + halfHeight + 50) {
          p.dead = true;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120, 120, 120, 0.7)';
        ctx.fill();
      });

      // Respawn some dead particles at the top to keep the flow going continuously
      // (Optional: stop respawning to let it empty out, but continuous looks better for background)
      const targetActive = 300;
      if (activeParticles < targetActive && pileHeight < maxPileHeight) {
        // Find a dead particle and resurrect it
        const deadP = particles.find(p => p.dead);
        if (deadP) {
          Object.assign(deadP, createParticle());
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 w-full h-full flex items-center justify-center opacity-40">
      {/* SVG Outline for Hourglass */}
      <svg 
        viewBox="0 0 400 600" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[400px] h-[450px] md:h-[600px] pointer-events-none opacity-50"
      >
        {/* Top and Bottom Caps */}
        <rect x="50" y="20" width="300" height="10" rx="5" fill="var(--color-text-primary)" />
        <rect x="50" y="570" width="300" height="10" rx="5" fill="var(--color-text-primary)" />
        {/* Left Glass */}
        <path d="M 80 30 C 80 200, 180 280, 190 300 C 180 320, 80 400, 80 570" stroke="var(--color-text-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Right Glass */}
        <path d="M 320 30 C 320 200, 220 280, 210 300 C 220 320, 320 400, 320 570" stroke="var(--color-text-primary)" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Subtle Shine lines */}
        <path d="M 100 80 Q 110 150 170 260" stroke="var(--color-text-primary)" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round" />
        <path d="M 300 520 Q 290 450 230 340" stroke="var(--color-text-primary)" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round" />
      </svg>

      {/* Canvas for Sand Physics */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      />
    </div>
  );
};
