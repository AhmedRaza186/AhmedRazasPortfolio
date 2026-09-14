import React from 'react';
import { useSound } from '../../context/SoundContext';
import { Magnetic } from './Magnetic';

export const SoundToggle = () => {
  const { soundEnabled, toggleSound } = useSound();

  return (
    <div className="fixed bottom-28 left-4 md:bottom-8 md:left-8 z-[9000]">
      <Magnetic>
        <button
          onClick={toggleSound}
          className="w-12 h-12 rounded-full bg-[var(--color-elevated)] border border-[var(--color-border-strong)] shadow-lg flex items-center justify-center text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors focus:outline-none group"
          aria-label={soundEnabled ? 'Disable Sound' : 'Enable Sound'}
          data-cursor={soundEnabled ? 'MUTE SOUND' : 'ENABLE SOUND'}
        >
          {soundEnabled ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-[var(--color-accent)] transition-colors">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          )}
        </button>
      </Magnetic>
    </div>
  );
};
