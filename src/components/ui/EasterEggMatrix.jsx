import React, { useEffect, useRef } from 'react';
import { useSound } from '../../context/SoundContext';

export const EasterEggMatrix = ({ onClose }) => {
  const canvasRef = useRef(null);
  const { playWhoosh } = useSound();

  useEffect(() => {
    playWhoosh();
    document.body.classList.add('matrix-mode');

    const style = document.createElement('style');
    style.id = 'matrix-styles';
    style.innerHTML = `
      .matrix-mode {
        --color-canvas: #000000 !important;
        --color-text-primary: #0f0 !important;
        --color-text-secondary: #0a0 !important;
        --color-accent: #0f0 !important;
        --color-border-subtle: #0f04 !important;
        --color-border-strong: #0f0 !important;
      }
      .matrix-mode * {
        font-family: monospace !important;
      }
      .matrix-mode img {
        filter: sepia(1) hue-rotate(90deg) saturate(3) !important;
        opacity: 0.8;
      }
    `;
    document.head.appendChild(style);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      document.body.classList.remove('matrix-mode');
      document.getElementById('matrix-styles')?.remove();
      window.removeEventListener('keydown', handleEsc);
      window.removeEventListener('resize', handleResize);
    };
  }, [playWhoosh, onClose]);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 z-[99998] pointer-events-none mix-blend-screen opacity-40"></canvas>
      <div className="fixed top-4 right-4 z-[99999] pointer-events-none text-[#0f0] font-mono">
        THE MATRIX [PRESS ESC TO EXIT]
      </div>
    </>
  );
};
