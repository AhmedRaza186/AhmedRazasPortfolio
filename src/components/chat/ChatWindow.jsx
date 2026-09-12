import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

const SUGGESTED_QUESTIONS = [
  "Tell me about Ahmed.",
  "What projects has Ahmed built?",
  "What technologies does he use?",
  "Tell me about his experience."
];

export const ChatWindow = ({ messages, isLoading, onSendMessage, onClose }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="w-[calc(100vw-3rem)] sm:w-[400px] h-[calc(100dvh-8rem)] max-h-[600px] bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] flex flex-col shadow-2xl overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-subtle)] bg-[var(--color-canvas)]">
        <div>
          <h3 className="font-display text-xl text-[var(--color-text-primary)]">AI Assistant</h3>
          <p className="text-meta text-[var(--color-text-secondary)]">Ask anything about Ahmed</p>
        </div>
        <button 
          onClick={onClose}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors p-1 md:hidden focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] rounded-md"
          aria-label="Close chat"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-6 bg-[var(--color-elevated)] overscroll-contain"
        data-lenis-prevent="true"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={msg.id} message={msg} index={index} />
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-[var(--color-text-muted)] pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" style={{ animationDelay: '300ms' }}></span>
          </div>
        )}

        {/* Suggested Questions - Only show if there's only the welcome message */}
        {messages.length === 1 && (
          <div className="pt-4 border-t border-[var(--color-border-subtle)] space-y-2 mt-4">
            <p className="text-meta text-[var(--color-text-secondary)] mb-3">SUGGESTED QUESTIONS</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(q)}
                  className="text-left text-[0.9375rem] px-3 py-2 border border-[var(--color-border-subtle)] rounded-lg hover:border-[var(--color-text-primary)] hover:bg-[var(--color-canvas)] transition-colors text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-text-primary)] focus:border-transparent"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-[var(--color-canvas)] border-t border-[var(--color-border-subtle)]">
        <ChatInput onSend={onSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};
