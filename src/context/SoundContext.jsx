import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/soundEngine';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const soundEnabledRef = useRef(soundEnabled);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

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
    if (soundEnabledRef.current) soundEngine.playHover();
  };

  const playWhoosh = () => {
    if (soundEnabledRef.current) soundEngine.playWhoosh();
  };

  const playPing = () => {
    if (soundEnabledRef.current) soundEngine.playPing();
  };

  const playDoorOpen = () => {
    if (soundEnabledRef.current) soundEngine.playDoorOpen();
  };

  const playAlarm = () => {
    if (soundEnabledRef.current) soundEngine.playAlarm();
  };

  const playLightRay = () => {
    if (soundEnabledRef.current) soundEngine.playLightRay();
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playWhoosh, playPing, playDoorOpen, playLightRay, playAlarm }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
