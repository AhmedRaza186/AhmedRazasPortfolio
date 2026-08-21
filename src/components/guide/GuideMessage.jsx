import React from 'react';

export const GuideMessage = ({ messageData, isVisible }) => {
  return (
    <div 
      className={`absolute left-6 top-1/2 -translate-y-1/2 w-max max-w-[200px] md:max-w-[250px] pointer-events-none transition-all duration-700 ease-out flex flex-col gap-1 ${
        isVisible 
          ? 'opacity-100 translate-y-[-50%]' 
          : 'opacity-0 translate-y-[-40%]'
      }`}
    >
      <div className="font-meta text-[10px] tracking-widest text-[var(--color-accent)]">
        SYSTEM / {messageData.label.split(' / ')[0]}
      </div>
      <div className="font-meta text-xs md:text-sm tracking-widest text-[var(--color-text-primary)] leading-tight">
        {messageData.message}
      </div>
    </div>
  );
};
