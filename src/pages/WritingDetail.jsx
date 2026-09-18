import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('css', css);
import { Container } from '../components/layout/Container';
import { Footer } from '../components/layout/Footer';
import { writingArticles } from '../data/writing';
import { useTransition } from '../context/TransitionContext';
import { SEO } from '../components/common/SEO';

export const WritingDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { navigateWithTransition } = useTransition();
  const [article, setArticle] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const foundArticle = writingArticles.find(a => a.slug === slug);
    if (!foundArticle) {
      navigate('/writing');
      return;
    }
    setArticle(foundArticle);
  }, [slug, navigate]);

  useEffect(() => {
    if (!article) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.article-header', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' })
        .from('.markdown-content', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4');
    }, pageRef);

    return () => ctx.revert();
  }, [article]);

  if (!article) return null;

  return (
    <div ref={pageRef} className="bg-[var(--color-canvas)] min-h-screen pt-24 md:pt-32 flex flex-col">
      <SEO title={article.title} description={article.description} />
      <Container className="mb-24 md:mb-32 flex-grow max-w-4xl mx-auto w-full">
        
        {/* Back Button */}
        <button 
          onClick={() => navigateWithTransition('/writing')}
          className="group flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-12 md:mb-16 transition-colors focus:outline-none"
        >
          <span className="font-meta text-lg group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-meta text-xs tracking-widest uppercase">BACK TO WRITING</span>
        </button>

        {/* Article Header */}
        <div className="article-header jarvis-section mb-16 border-b border-[var(--color-border-subtle)] pb-12" data-jarvis-explain={`This is the article titled ${article.title}, published on ${article.date}.`}>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-tight text-[var(--color-text-primary)] mb-8">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-meta text-[var(--color-text-secondary)]">
            <span className="tracking-widest uppercase">{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border-strong)]"></span>
            <span className="tracking-widest uppercase">{article.readTime}</span>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="markdown-content jarvis-section" data-jarvis-explain="Here is the full content of the article.">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="font-display text-4xl md:text-5xl text-[var(--color-text-primary)] mt-12 mb-6 jarvis-section" data-jarvis-explain={props.children} {...props} />,
              h2: ({node, ...props}) => <h2 className="font-display text-3xl md:text-4xl text-[var(--color-text-primary)] mt-12 mb-6 jarvis-section" data-jarvis-explain={props.children} {...props} />,
              h3: ({node, ...props}) => <h3 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] mt-8 mb-4 jarvis-section" data-jarvis-explain={props.children} {...props} />,
              p: ({node, ...props}) => <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-6 jarvis-section" data-jarvis-explain={node.children?.[0]?.value || 'A paragraph of text.'} {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside font-body text-lg md:text-xl text-[var(--color-text-secondary)] mb-6 space-y-2 jarvis-section" data-jarvis-explain="Here is a list of items." {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-inside font-body text-lg md:text-xl text-[var(--color-text-secondary)] mb-6 space-y-2 jarvis-section" data-jarvis-explain="Here is a numbered list of items." {...props} />,
              li: ({node, ...props}) => <li className="pl-2" {...props} />,
              a: ({node, ...props}) => <a className="text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[var(--color-border-subtle)] transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-[var(--color-accent)] pl-6 py-2 my-8 italic text-[var(--color-text-primary)] bg-[var(--color-border-subtle)]/10 jarvis-section" data-jarvis-explain="A quote." {...props} />,
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <div className="my-8 rounded-sm overflow-hidden border border-[var(--color-border-subtle)] jarvis-section" data-jarvis-explain="Here is a code snippet.">
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: '1.5rem', background: 'var(--color-elevated)' }}
                    />
                  </div>
                ) : (
                  <code {...props} className="bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] px-1.5 py-0.5 rounded-sm font-mono text-sm">
                    {children}
                  </code>
                )
              }
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        
      </Container>
      <Footer />
    </div>
  );
};
