import React, { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { ChatWidget } from './components/chat/ChatWidget';
import { TransitionProvider } from './context/TransitionContext';
import { SoundProvider } from './context/SoundContext';
import { SoundToggle } from './components/ui/SoundToggle';
import gsap from 'gsap';

function App() {
  return (
    <SoundProvider>
      <TransitionProvider>
        <SmoothScroll>
          <div className="min-h-screen flex flex-col">
            <CustomCursor />
            <SoundToggle />
            <Navbar />
            <main className="flex-grow pt-24 md:pt-32">
              <AppRoutes />
            </main>
            <ChatWidget />
          </div>
        </SmoothScroll>
      </TransitionProvider>
    </SoundProvider>
  );
}

export default App;
