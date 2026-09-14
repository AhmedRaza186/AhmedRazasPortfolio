import React, { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/layout/Navbar';
import { MobileDock } from './components/layout/MobileDock';
import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { ChatWidget } from './components/chat/ChatWidget';
import { TransitionProvider } from './context/TransitionContext';
import { SoundProvider } from './context/SoundContext';
import { ThemeProvider } from './context/ThemeContext';
import { SoundToggle } from './components/ui/SoundToggle';
import { EasterEgg } from './components/ui/EasterEgg';
import gsap from 'gsap';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <SoundProvider>
          <TransitionProvider>
            <SmoothScroll>
              <div className="min-h-screen flex flex-col">
                <CustomCursor />
                <SoundToggle />
                <Navbar />
                <main className="flex-grow pt-24 md:pt-32 pb-24 md:pb-0">
                  <AppRoutes />
                </main>
                <MobileDock />
                <ChatWidget />
                <EasterEgg />
              </div>
            </SmoothScroll>
          </TransitionProvider>
        </SoundProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
