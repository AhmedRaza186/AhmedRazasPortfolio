import React, { useEffect } from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/layout/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { ChatWidget } from './components/chat/ChatWidget';
import gsap from 'gsap';

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col">
      <CustomCursor />
      <Navbar />
      <main className="flex-grow pt-24 md:pt-32">
        <AppRoutes />
      </main>
      <ChatWidget />
    </div>
    </SmoothScroll>
  );
}

export default App;
