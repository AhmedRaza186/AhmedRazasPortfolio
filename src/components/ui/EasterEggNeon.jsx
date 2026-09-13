import React, { useEffect } from 'react';
import { useSound } from '../../context/SoundContext';

export const EasterEggNeon = ({ onClose }) => {
  const { playWhoosh } = useSound();

  useEffect(() => {
    playWhoosh();
    document.body.classList.add('neon-mode');
    
    // Inject synthwave styles
    const style = document.createElement('style');
    style.id = 'neon-styles';
    style.innerHTML = `
      .neon-mode {
        --color-canvas: #090014 !important;
        --color-text-primary: #ff00ff !important;
        --color-text-secondary: #00ffff !important;
        --color-accent: #00ffff !important;
        --color-border-subtle: #ff00ff40 !important;
        --color-border-strong: #ff00ff !important;
      }
      .neon-mode * {
        text-shadow: 0 0 5px var(--color-text-primary) !important;
        box-shadow: none !important;
      }
      .neon-mode button, .neon-mode .process-step, .neon-mode .work-card, .neon-mode .magnetic-wrap {
        border-color: var(--color-accent) !important;
        box-shadow: 0 0 10px var(--color-accent), inset 0 0 10px var(--color-accent) !important;
      }
      .neon-mode img {
        filter: sepia(1) hue-rotate(250deg) saturate(3) !important;
      }
    `;
    document.head.appendChild(style);

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.classList.remove('neon-mode');
      document.getElementById('neon-styles')?.remove();
      window.removeEventListener('keydown', handleEsc);
    };
  }, [playWhoosh, onClose]);

  return (
    <div className="fixed top-4 right-4 z-[99999] pointer-events-none text-[#00ffff] font-display animate-pulse" style={{ textShadow: '0 0 10px #00ffff' }}>
      SYNTHWAVE OVERDRIVE [PRESS ESC TO EXIT]
    </div>
  );
};
