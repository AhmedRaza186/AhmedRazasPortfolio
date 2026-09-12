import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const TopographicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // GSAP Fade In
    gsap.to(canvas, { opacity: 1, duration: 2, ease: "power2.out", delay: 0.5 });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 1.2;
      // Very subtle dark lines for the map
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      
      // Define a few "peaks" or centers for the contour lines
      const centers = [
        { x: canvas.width * 0.15, y: canvas.height * 0.2, size: Math.max(canvas.width, canvas.height) * 0.8 },
        { x: canvas.width * 0.85, y: canvas.height * 0.8, size: Math.max(canvas.width, canvas.height) * 0.9 },
        { x: canvas.width * 0.5, y: canvas.height * 1.2, size: Math.max(canvas.width, canvas.height) * 0.6 },
      ];

      centers.forEach((center, cIdx) => {
        // Draw 30 rings (contour lines) around each peak
        const rings = 30;
        for(let r = 1; r <= rings; r++) {
          const baseRadius = (center.size / rings) * r;
          
          ctx.beginPath();
          // We need a full circle (0 to 2PI), keeping the step small for smoothness
          for(let angle = 0; angle <= Math.PI * 2.1; angle += 0.05) {
            // Complex sine wave perturbation to make it organic and flowing
            const warp1 = Math.sin(angle * 3 + time * 0.4 + cIdx) * 15;
            const warp2 = Math.cos(angle * 5 - time * 0.2 + cIdx) * 10;
            const warp3 = Math.sin(angle * 2 + time * 0.15) * 25 * (r / rings); // Outer rings warp more
            
            const radius = baseRadius + warp1 + warp2 + warp3;
            
            const x = center.x + Math.cos(angle) * radius;
            const y = center.y + Math.sin(angle) * radius;
            
            if (angle === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      });

      time += 0.015; // Animation speed
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
