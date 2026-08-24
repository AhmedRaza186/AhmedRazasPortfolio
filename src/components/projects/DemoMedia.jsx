import React, { useState } from 'react';

export const DemoMedia = ({ demo }) => {
  if (!demo || !demo.url) return null;

  if (demo.type === 'linkedin') {
    // LinkedIn Embeds MUST use the /embed/ URL format to work in an iframe.
    // If the user provides a standard LinkedIn post URL, we can attempt to convert it.
    let embedUrl = demo.url;
    let isEmbedUrl = demo.url.includes('/embed/');
    
    if (!isEmbedUrl && demo.url.includes('urn:li:activity:')) {
      const urnMatch = demo.url.match(/(urn:li:activity:\d+)/);
      if (urnMatch) {
        embedUrl = `https://www.linkedin.com/embed/feed/update/${urnMatch[1]}?compact=1`;
        isEmbedUrl = true; // We successfully constructed an embed URL
      }
    } else if (!isEmbedUrl && demo.url.includes('urn:li:ugcPost:')) {
      const urnMatch = demo.url.match(/(urn:li:ugcPost:\d+)/);
      if (urnMatch) {
        embedUrl = `https://www.linkedin.com/embed/feed/update/${urnMatch[1]}?compact=1`;
        isEmbedUrl = true;
      }
    }

    return (
      <div className="cs-section w-full max-w-3xl mx-auto rounded-md overflow-hidden bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] shadow-2xl flex flex-col items-center">
        {/* Header / Fallback Link */}
        <div className="w-full bg-[var(--color-canvas)] border-b border-[var(--color-border-subtle)] px-6 py-4 flex justify-between items-center z-10 relative">
          <span className="font-meta text-xs tracking-widest text-[var(--color-text-secondary)]">PROJECT DEMO</span>
          <a href={demo.url} target="_blank" rel="noopener noreferrer" className="font-meta text-xs tracking-widest text-[var(--color-accent)] hover:opacity-80 transition-opacity">
            WATCH ON LINKEDIN ↗
          </a>
        </div>
        
        {/* Iframe or Fallback state */}
        <div className="w-full relative bg-[var(--color-canvas)] flex items-center justify-center min-h-[300px]" style={isEmbedUrl ? { paddingTop: '100%' } : {}}>
          {isEmbedUrl ? (
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-none"
              title="LinkedIn Demo"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <p className="font-body text-lg text-[var(--color-text-secondary)] mb-6">
                This demo is hosted on LinkedIn.
              </p>
              <a 
                href={demo.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--color-border-strong)] hover:bg-[var(--color-elevated)] transition-colors font-meta text-xs tracking-widest text-[var(--color-text-primary)]"
              >
                VIEW DEMO NOW ↗
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (demo.type === 'youtube') {
    return (
      <div className="cs-section w-full max-w-5xl mx-auto rounded-md overflow-hidden bg-black shadow-2xl relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={demo.url}
          className="absolute top-0 left-0 w-full h-full border-none"
          title="YouTube Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (demo.type === 'vimeo') {
    return (
      <div className="cs-section w-full max-w-5xl mx-auto rounded-md overflow-hidden bg-black shadow-2xl relative" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={demo.url}
          className="absolute top-0 left-0 w-full h-full border-none"
          title="Vimeo Demo"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  if (demo.type === 'local') {
    return (
      <div className="cs-section w-full max-w-5xl mx-auto rounded-md overflow-hidden bg-black shadow-2xl">
        <video 
          src={demo.url}
          controls
          playsInline
          preload="metadata"
          className="w-full h-auto object-cover"
        />
      </div>
    );
  }

  return null;
};
