import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';

export const ChatMessage = ({ message, index = 0 }) => {
  const delay = `${index * 150}ms`;
  const isUser = message.role === 'user';

  return (
    <div 
      className={`flex w-full animate-bubble ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ animationDelay: delay }}
    >
      <div 
        className={`max-w-[85%] px-4 py-3 leading-relaxed rounded-2xl overflow-hidden ${
          isUser 
            ? 'bg-[var(--color-text-primary)] text-[var(--color-canvas)] rounded-br-sm text-[0.9375rem]'
            : 'bg-[var(--color-canvas)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] rounded-bl-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : (
          <div className="break-words w-full overflow-hidden">
            <MarkdownRenderer content={message.content} />
          </div>
        )}
      </div>
    </div>
  );
};
