import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Initialize engine only when user opts in to avoid audio context warnings
  useEffect(() => {
    if (soundEnabled) {
      soundEngine.init();
      soundEngine.resume();
    }
  }, [soundEnabled]);

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const playHover = () => {
    if (soundEnabled) soundEngine.playHover();
  };

  const playWhoosh = () => {
    if (soundEnabled) soundEngine.playWhoosh();
  };

  const playPing = () => {
    if (soundEnabled) soundEngine.playPing();
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playWhoosh, playPing }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
