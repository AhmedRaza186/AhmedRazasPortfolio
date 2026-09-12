import React, { useState, useEffect } from 'react';
import { ChatWindow } from './ChatWindow';
import { Magnetic } from '../ui/Magnetic';

const PREVIEW_MESSAGES = [
  "Hi, I'm Ahmed's AI assistant 👋",
  "Ask me about his projects",
  "Or his skills & experience!"
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Hi, I'm Ahmed's AI assistant. Ask me anything about his skills, projects, experience, or background."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Show preview bubbles after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowPreview(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) setShowPreview(false);
  };

  const handleSendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setShowPreview(false); // Hide preview just in case

    try {
      const payload = { message: content.trim() };
      if (sessionId) {
        payload.sessionId = sessionId;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (!data || !data.success) {
        throw new Error('Malformed or unsuccessful response from server');
      }

      // Store sessionId if this is the first real interaction
      if (!sessionId && data.sessionId) {
        setSessionId(data.sessionId);
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Graceful error handling in the UI
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting to the server right now. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
      
      {/* Preview Bubbles */}
      <div className="pointer-events-auto absolute bottom-20 right-0 flex flex-col items-end gap-2 mb-2">
        {showPreview && !isOpen && PREVIEW_MESSAGES.map((msg, index) => (
          <div 
            key={index}
            className="origin-bottom-right"
            style={{ 
              animation: `bubble-float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 200}ms forwards`,
              opacity: 0
            }}
          >
            <div style={{ animation: `continuous-float 3s ease-in-out ${(index * 200) + 500}ms infinite` }}>
              <div 
                onClick={toggleChat}
                className="bg-[var(--color-text-primary)] text-[var(--color-canvas)] px-4 py-3 rounded-2xl rounded-br-sm shadow-xl cursor-pointer hover:scale-105 transition-transform flex items-center gap-3 whitespace-nowrap"
              >
                <span className="text-[0.9375rem]">{msg}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div className={`pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right mb-4 ${
        isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none absolute bottom-full'
      }`}>
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          onSendMessage={handleSendMessage}
          onClose={() => setIsOpen(false)}
        />
      </div>

      {/* Launcher Button */}
      <Magnetic>
        <button
          onClick={toggleChat}
          aria-label={isOpen ? "Close chat" : "Open AI assistant"}
          className="pointer-events-auto w-14 h-14 rounded-full bg-[var(--color-text-primary)] text-[var(--color-canvas)] flex items-center justify-center shadow-lg hover:bg-[var(--color-accent)] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-text-primary)] focus:ring-offset-[var(--color-canvas)] cursor-pointer"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </Magnetic>
    </div>
  );
};
