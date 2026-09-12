import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const RippleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let ripples = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const createRipple = (x, y, maxOpacity = 0.3, speed = 1) => {
      ripples.push({
        x,
        y,
        radius: 0,
        opacity: maxOpacity,
        speed: speed
      });
    };

    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e) => {
      // Create a ripple if mouse moved significantly to throttle creation
      const dist = Math.hypot(e.clientX - lastMouseX, e.clientY - lastMouseY);
      if (dist > 20) { // Reduced from 40 to 20 for more frequent ripples
        createRipple(e.clientX, e.clientY, 0.4, Math.random() * 1.5 + 0.5); // Increased opacity from 0.15 to 0.4
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };
    
    const handleClick = (e) => {
      // Big intense ripple on click
      createRipple(e.clientX, e.clientY, 0.8, 2);
      setTimeout(() => createRipple(e.clientX, e.clientY, 0.5, 1.5), 200);
      setTimeout(() => createRipple(e.clientX, e.clientY, 0.3, 1), 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = ripples.length - 1; i >= 0; i--) {
        let r = ripples[i];
        
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        
        // Solid black stroke with variable opacity
        ctx.strokeStyle = `rgba(0, 0, 0, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        r.radius += r.speed;
        r.opacity -= 0.003; // Fade out slowly
        
        if (r.opacity <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Add random auto ripples occasionally to make the background feel alive like a signal ping
      if (Math.random() > 0.98) {
        createRipple(Math.random() * canvas.width, Math.random() * canvas.height, 0.3, Math.random() * 0.5 + 0.2);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
