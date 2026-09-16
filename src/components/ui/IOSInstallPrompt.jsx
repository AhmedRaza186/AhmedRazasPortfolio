import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, X } from 'lucide-react';

export const IOSInstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    // Detect if already installed (standalone mode on iOS)
    const isStandaloneMode = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    // If it's iOS, not installed, and they haven't dismissed the prompt recently
    if (isIosDevice && !isStandaloneMode) {
      const lastDismissed = localStorage.getItem('iosInstallPromptDismissed');
      const now = new Date().getTime();
      
      // Show if never dismissed, or if dismissed more than 24 hours ago
      if (!lastDismissed || (now - parseInt(lastDismissed)) > 24 * 60 * 60 * 1000) {
        // Show after a short delay
        setTimeout(() => setShowPrompt(true), 3000);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('iosInstallPromptDismissed', new Date().getTime().toString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--color-elevated)] border-t border-[var(--color-border-subtle)] p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.2)] z-[9999] animate-in slide-in-from-bottom duration-500 pb-8 md:pb-4">
      <div className="max-w-md mx-auto relative flex flex-col gap-3">
        <button onClick={handleDismiss} className="absolute -top-2 -right-2 p-1 text-[var(--color-text-secondary)]">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-start gap-4">
          <img src="/apple-touch-icon.jpg" alt="App Icon" className="w-12 h-12 rounded-xl shadow-sm object-cover" />
          <div className="flex-1">
            <h3 className="font-display text-lg text-[var(--color-text-primary)]">Install Portfolio</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Install this app on your iPhone for the best fullscreen experience.</p>
          </div>
        </div>
        <div className="bg-[var(--color-canvas)] rounded-lg p-3 text-sm flex items-center justify-center gap-2 text-[var(--color-text-primary)] mt-2">
          Tap <Share className="w-5 h-5 text-blue-500 inline" /> then <strong>Add to Home Screen</strong> <PlusSquare className="w-5 h-5 inline opacity-70" />
        </div>
      </div>
    </div>
  );
};
