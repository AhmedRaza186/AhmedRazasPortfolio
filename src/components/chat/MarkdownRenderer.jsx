import React from 'react';
import { Link } from 'react-router-dom';

const TRUSTED_URLS = [
  '/', '/work', '/about', '/achievements', '/journey', '/contact', '/experience',
  'https://github.com/AhmedRaza186',
  'https://www.linkedin.com/in/ahmed-raza-14188b35b/',
  'https://wa.me/923320397145',
  '/assets/personal/Ahmed_Raza_CV.pdf'
];

const isTrustedUrl = (url) => {
  return TRUSTED_URLS.includes(url) || url.startsWith('/work/');
};

const parseInline = (text, keyPrefix) => {
  // Split by inline code, bold, and links
  const regex = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code 
          key={`${keyPrefix}-${i}`} 
          className="bg-[var(--color-border-subtle)] px-1.5 py-0.5 rounded text-[0.85em] font-mono text-[var(--color-text-primary)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong 
          key={`${keyPrefix}-${i}`} 
          className="font-semibold text-[var(--color-text-primary)]"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const url = linkMatch[2];
      const label = linkMatch[1];
      
      if (!isTrustedUrl(url)) {
        return <React.Fragment key={`${keyPrefix}-${i}`}>{label}</React.Fragment>;
      }

      if (url.startsWith('/') && !url.endsWith('.pdf')) {
        return (
          <Link 
            key={`${keyPrefix}-${i}`} 
            to={url}
            className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition-colors font-medium"
            style={{ color: 'var(--color-accent)' }}
          >
            {label}
          </Link>
        );
      }

      return (
        <a 
          key={`${keyPrefix}-${i}`} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2 transition-colors font-medium"
          style={{ color: 'var(--color-accent)' }}
        >
          {label}
        </a>
      );
    }
    return <React.Fragment key={`${keyPrefix}-${i}`}>{part}</React.Fragment>;
  });
};

export const MarkdownRenderer = ({ content }) => {
  if (!content) return null;

  // 1. Extract fenced code blocks first
  const blocks = content.split(/(```[\w]*\n[\s\S]*?```)/g);
  
  return blocks.map((block, index) => {
    if (block.startsWith('```')) {
      // It's a code block
      const match = block.match(/```([\w]*)\n([\s\S]*?)```/);
      const code = match ? match[2] : block.slice(3, -3);
      return (
        <div 
          key={index} 
          className="my-3 w-full max-w-full overflow-x-auto bg-[#1a1a1a] text-[#e5e5e5] rounded-xl border border-[var(--color-border-strong)]"
        >
          <pre className="p-4 text-sm font-mono whitespace-pre overflow-x-auto">
            <code>{code.trim()}</code>
          </pre>
        </div>
      );
    }

    // It's normal text. Process line by line to handle lists, headings, and paragraphs.
    const lines = block.split('\n');
    const elements = [];
    let currentList = null;
    let listType = null; // 'ul' or 'ol'
    let currentParagraph = [];

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={`p-${elements.length}`} className="mb-3 last:mb-0 leading-relaxed text-[0.9375rem]">
            {parseInline(currentParagraph.join('\n'), `p-${elements.length}`)}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList) {
        const ListTag = listType;
        elements.push(
          <ListTag key={`l-${elements.length}`} className={`mb-3 pl-5 space-y-1 ${listType === 'ul' ? 'list-disc' : 'list-decimal'} text-[0.9375rem]`}>
            {currentList.map((item, i) => (
              <li key={i}>{parseInline(item, `li-${elements.length}-${i}`)}</li>
            ))}
          </ListTag>
        );
        currentList = null;
        listType = null;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed === '') {
        flushParagraph();
        flushList();
        continue;
      }

      // Headings
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        const level = headingMatch[1].length;
        const HeadingTag = `h${level}`;
        const fontSizeClass = level === 1 ? 'text-2xl' : level === 2 ? 'text-xl' : 'text-lg';
        elements.push(
          <HeadingTag key={`h-${elements.length}`} className={`font-display mt-5 mb-2 text-[var(--color-text-primary)] ${fontSizeClass}`}>
            {parseInline(headingMatch[2], `h-${elements.length}`)}
          </HeadingTag>
        );
        continue;
      }

      // Unordered list
      const ulMatch = line.match(/^[-*]\s+(.*)/);
      if (ulMatch) {
        flushParagraph();
        if (listType === 'ol') flushList();
        listType = 'ul';
        if (!currentList) currentList = [];
        currentList.push(ulMatch[1]);
        continue;
      }

      // Ordered list
      const olMatch = line.match(/^\d+\.\s+(.*)/);
      if (olMatch) {
        flushParagraph();
        if (listType === 'ul') flushList();
        listType = 'ol';
        if (!currentList) currentList = [];
        currentList.push(olMatch[1]);
        continue;
      }

      // Otherwise, it's a paragraph line
      flushList();
      currentParagraph.push(line);
    }
    
    flushParagraph();
    flushList();

    if (elements.length === 0) return null;

    return (
      <div key={`block-${index}`} className="flex flex-col w-full max-w-full">
        {elements}
      </div>
    );
  });
};
