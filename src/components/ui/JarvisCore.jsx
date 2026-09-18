import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, MicOff } from 'lucide-react';
import { Magnetic } from './Magnetic';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin);

const intents = {
  navigation: {
    home: ['home', 'homepage', 'main page', 'main', 'start over', 'portfolio', 'wapas chalo', 'ghar chalo', 'shuru karo'],
    journey: ['journey', 'your journey', 'story', 'your story', 'history', 'background', 'career journey', 'developer journey', 'how did you start', 'how you started', 'where did you start', 'tell me your story', 'safar', 'tumhara safar', 'aap ka safar', 'kahani', 'tumhari kahani', 'shuruat', 'apni journey dikhao'],
    work: ['work', 'projects', 'project', 'all projects', 'your projects', 'my projects', 'show me your work', 'show me your projects', 'what have you built', 'what did you build', 'what have you made', 'things you built', 'everything you built', 'portfolio projects', 'archive', 'project archive', 'development work', 'builds', "builds you've made", 'kya banaya hai', 'kya banaya', 'kya kya banaya', 'tumne kya banaya', 'tumhare projects', 'sare projects', 'saare projects', 'apna kaam dikhao', 'kaam dikhao', 'bana hua kaam dikhao'],
    experience: ['experience', 'your experience', 'work experience', 'professional experience', 'career', 'career experience', 'jobs', 'job history', 'employment', 'previous work', 'previous jobs', 'where have you worked', 'where did you work', "companies you've worked with", 'resume', 'résumé', 'cv', 'professional background', 'kaam ka experience', 'kaha kaam kiya', 'kahan kaam kiya', 'tumhara experience'],
    achievements: ['achievements', 'achievement', 'accomplishments', 'awards', 'award', 'trophies', 'trophy', 'recognition', 'certifications', 'certificates', 'milestones', 'wins', 'highlights', 'what have you achieved', 'what did you achieve', 'your achievements', 'your awards', 'show me your awards', 'show me your achievements', 'kya achieve kiya', 'kya achievements hain', 'awards dikhao', 'certificates dikhao', 'trophies dikhao'],
    writing: ['writing', 'writings', 'articles', 'article', 'blog', 'blogs', 'posts', 'thoughts', 'essays', 'publications', 'reads', 'reading', "things you've written", 'what have you written', 'show me your writing', 'show me your articles', 'read something', 'let me read', 'your thoughts', 'tumne kya likha', 'kya likha hai', 'apni writing dikhao', 'articles dikhao', 'blog dikhao', 'kuch parhne do']
  },
  sections: {
    hero: ['hero', 'intro section', 'introduction', 'introduction section', 'top', 'beginning', 'first section', 'first thing', 'opening', 'who are you', 'tell me about yourself', 'introduce yourself', 'what do you do', 'what do you build', 'what are you', 'developer intro', 'your introduction', 'start the tour', 'start from beginning', 'shuru se', 'pehle dikhao', 'intro dikhao', 'apne bare mein batao', 'apne baare mein batao'],
    about: ['about', 'about you', 'about yourself', 'philosophy', 'your philosophy', 'mindset', 'approach', 'your approach', 'how do you work', 'how you work', 'your process', 'development process', 'working style', 'how you build', 'how do you build', 'product thinking', 'product mindset', 'your principles', 'principles', 'beliefs', 'what do you believe', 'why do you build', 'tumhara approach', 'tum kaise kaam karte ho', 'kaise kaam karte ho', 'tumhara process', 'kaam kaise karte ho', 'soch kya hai', 'tumhari soch', 'approach dikhao'],
    work: ['selected work', 'featured work', 'featured projects', 'highlighted projects', 'best projects', 'main projects', 'projects on homepage', 'homepage projects', 'show selected work', 'show featured projects', 'what are your main projects', "projects you're proud of", 'projects you worked on', 'your best work', 'important projects', 'top projects', 'kuch projects dikhao', 'important projects dikhao', 'featured projects dikhao', 'apna best kaam dikhao'],
    skills: ['skills', 'your skills', 'technical skills', 'expertise', 'tech stack', 'technology', 'technologies', 'technologies you use', 'what technologies do you use', 'what tech do you use', 'tools you use', 'tools', 'technologies you know', 'programming skills', 'development skills', 'coding skills', 'technical expertise', 'frontend skills', 'backend skills', 'full stack skills', 'stack', 'tech', 'frameworks', 'languages', 'what can you build', 'what are you good at', 'what do you specialize in', 'what do you work with', 'tumhari skills', 'kya kya aata hai', 'kya technologies aati hain', 'kaunsi technologies use karte ho', 'konsi technology use karte ho', 'tech stack dikhao', 'skills dikhao', 'technology dikhao', 'apna stack dikhao', 'kis cheez mein expert ho'],
    contact: ['contact', 'contact me', 'contact you', 'get in touch', 'reach out', 'reach you', 'talk to you', "let's talk", 'connect', 'connect with you', 'hire you', 'hire me', 'work with you', 'work together', 'collaborate', 'collaboration', 'email', 'your email', 'contact details', 'how can I contact you', 'how do I reach you', 'where can I contact you', "let's work together", 'tumse contact kaise karun', 'contact kaise karun', 'baat karni hai', 'baat karte hain', 'kaam karna hai', 'saath kaam karna hai', 'hire karna hai', 'contact info dikhao', 'rabta kaise karun']
  },
  actions: {
    tour: ['give me a tour', 'take me on a tour', 'show me around', 'walk me through', 'walk me through your portfolio', 'guide me', 'guide me through', 'explain your portfolio', 'show me everything', 'show me around your portfolio', 'portfolio tour', 'full tour', 'complete tour', 'begin the tour', 'mujhe tour karao', 'tour karao', 'poora portfolio dikhao', 'sab dikhao', 'sab kuch dikhao', 'mujhe sab dikhao', 'guide karo', 'pura tour karao'],
    explain: ['explain this', 'explain this page', 'what is this', "what's this", 'tell me about this', 'tell me about this page', 'what am I looking at', 'what is this section', 'explain this section', 'explain this project', 'tell me about this project', 'tell me more', 'what does this mean', "what's going on here", 'ye kya hai', 'ye kya hai batao', 'iske bare mein batao', 'iske baare mein batao', 'ye section kya hai', 'ye page kya hai', 'isko explain karo', 'samjhao', 'samjha do', 'detail mein batao']
  }
};

const matchesAny = (transcript, keywords) => {
  return keywords.some(keyword => transcript.includes(keyword));
};

const analyzeIntent = (transcript) => {
  // 1. Contextual Actions
  if (matchesAny(transcript, intents.actions.explain)) return { type: 'CURRENT_CONTEXT' };

  // 2. Disambiguate Experience vs Work vs About vs Journey
  if (matchesAny(transcript, intents.navigation.experience)) return { type: 'PAGE', path: '/experience', name: 'Experience' };
  if (matchesAny(transcript, intents.sections.about)) return { type: 'SECTION', path: '/', id: 'about', name: 'About' };
  if (matchesAny(transcript, intents.navigation.journey)) return { type: 'PAGE', path: '/journey', name: 'Journey' };

  // 3. Sections
  if (matchesAny(transcript, intents.sections.skills)) return { type: 'SECTION', path: '/', id: 'expertise', name: 'Expertise' };
  if (matchesAny(transcript, intents.sections.contact)) return { type: 'SECTION', path: '/', id: 'contact', name: 'Contact' };
  if (matchesAny(transcript, intents.sections.work)) return { type: 'SECTION', path: '/', id: 'work', name: 'Selected Work' };
  if (matchesAny(transcript, intents.sections.hero)) return { type: 'SECTION', path: '/', id: 'top', name: 'Introduction' };
  
  // 4. Pages
  if (matchesAny(transcript, intents.navigation.achievements)) return { type: 'PAGE', path: '/achievements', name: 'Achievements' };
  if (matchesAny(transcript, intents.navigation.writing)) return { type: 'PAGE', path: '/writing', name: 'Writing' };
  if (matchesAny(transcript, intents.navigation.work)) return { type: 'PAGE', path: '/work', name: 'Work Archive' };
  if (matchesAny(transcript, intents.navigation.home)) return { type: 'PAGE', path: '/', name: 'Home' };

  // 5. Global Tour
  if (matchesAny(transcript, intents.actions.tour) || transcript.includes('start tour') || transcript.includes('tour')) {
    return { type: 'START_TOUR' };
  }

  return null;
};

export const JarvisCore = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const voiceRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const tourIndexRef = useRef(0);
  const isTouringRef = useRef(false);
  const pendingTourRef = useRef(null);

  // Effect to automatically start tour when navigating to a new page
  useEffect(() => {
    if (pendingTourRef.current) {
      const targetId = pendingTourRef.current.targetId;
      pendingTourRef.current = null;
      
      // Wait a moment for the new page components to mount and DOM to be ready
      setTimeout(() => {
        startTour(targetId);
      }, 800);
    }
  }, [location.pathname]);

  // Initialize SpeechSynthesis Voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        // Try to find a male UK voice first for that "Jarvis" feel
        let selected = voices.find(v => v.lang === 'en-GB' && (v.name.includes('Male') || v.name.includes('Google UK English Male')));
        // Fallback to any GB voice
        if (!selected) selected = voices.find(v => v.lang.includes('en-GB'));
        // Fallback to any US male voice
        if (!selected) selected = voices.find(v => v.lang === 'en-US' && v.name.includes('Male'));
        
        // If they specifically want Urdu later, we can toggle it, but English fits the "Jarvis" persona best for the portfolio content
        if (!selected) selected = voices[0];
        
        voiceRef.current = selected;
      }
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const isListeningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isActiveRef = useRef(false);

  const toggleActive = () => {
    const newState = !isActive;
    isActiveRef.current = newState;
    setIsActive(newState);

    if (newState && recognitionRef.current && !isListeningRef.current && !isSpeakingRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    } else if (!newState && recognitionRef.current) {
      recognitionRef.current.stop();
      if (isTouringRef.current) stopTour();
    }
  };

  // Initialize SpeechRecognition ONCE
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
      };
      
      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
        // Restart if active and not speaking (keep continuous listening alive)
        if (isActiveRef.current && !isSpeakingRef.current) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase();
        
        console.log("Jarvis heard:", transcript);
        handleCommand(transcript);
      };

      recognition.onerror = (event) => {
        if (event.error === 'not-allowed') {
          isActiveRef.current = false;
          setIsActive(false);
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []); // Empty dependency array so it's only created once!

  const utteranceRef = useRef(null);

  const speak = (text, callback) => {
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {} // Abort immediately stops and prevents onresult
    }
    
    // Store in ref to prevent garbage collection bug in Chrome
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    
    utterance.onend = () => {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      
      if (callback) callback();
      
      // Resume listening if still active
      if (isActiveRef.current && recognitionRef.current) {
        setTimeout(() => {
          if (!isSpeakingRef.current && !isListeningRef.current) {
            try { recognitionRef.current.start(); } catch (e) {}
          }
        }, 300);
      }
    };
    
    // Fallback for Chrome bug where onend sometimes doesn't fire at all for very long text
    // Not usually needed if referenced, but good practice
    utterance.onerror = () => {
      isSpeakingRef.current = false;
      setIsSpeaking(false);
    };
    
    synthRef.current.speak(utterance);
  };

  const handleCommand = (transcript) => {
    if (isTouringRef.current) {
      if (transcript.includes('stop') || transcript.includes('ruk jao')) {
        stopTour();
        speak("Tour stopped, sir.");
      }
      return;
    }

    const intent = analyzeIntent(transcript);

    if (intent) {
      if (intent.type === 'PAGE') {
        speak(`Navigating to ${intent.name}.`, () => {
          navigate(intent.path);
          pendingTourRef.current = { targetId: null };
        });
      } 
      else if (intent.type === 'SECTION') {
        speak(`Focusing on ${intent.name}.`, () => {
          if (location.pathname !== intent.path) {
            navigate(intent.path);
            pendingTourRef.current = { targetId: intent.id };
          } else {
            startTour(intent.id);
          }
        });
      }
      else if (intent.type === 'CURRENT_CONTEXT' || intent.type === 'START_TOUR') {
        speak("Initiating tour.", () => {
          startTour();
        });
      }
    } else {
      // Fallback greeting if they just said jarvis
      if (transcript.includes('jarvis')) {
        const greetings = ["Yes sir?", "At your service.", "How can I help you?", "Ji sir, batayen."];
        speak(greetings[Math.floor(Math.random() * greetings.length)]);
      }
    }
  };

  const startTour = (targetId = null) => {
    isTouringRef.current = true;
    
    const sections = Array.from(document.querySelectorAll('.jarvis-section')).filter(el => {
      return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
    });

    let startIndex = 0;
    if (targetId && targetId !== 'top') {
      const container = document.getElementById(targetId);
      if (container) {
        const firstJarvisSection = container.querySelector('.jarvis-section');
        if (firstJarvisSection) {
          const idx = sections.indexOf(firstJarvisSection);
          if (idx !== -1) startIndex = idx;
        } else {
          // If the container itself IS a jarvis section
          if (container.classList.contains('jarvis-section')) {
            const idx = sections.indexOf(container);
            if (idx !== -1) startIndex = idx;
          }
        }
      }
    }
    
    tourIndexRef.current = startIndex;
    nextSection();
  };

  const stopTour = () => {
    isTouringRef.current = false;
    synthRef.current.cancel();
    
    // Remove all highlights
    document.querySelectorAll('.jarvis-section').forEach(el => {
      gsap.to(el, { boxShadow: 'none', borderColor: 'transparent', duration: 0.5 });
    });
  };

  const nextSection = () => {
    if (!isTouringRef.current) return;

    // Only select visible jarvis-sections
    const sections = Array.from(document.querySelectorAll('.jarvis-section')).filter(el => {
      return el.offsetParent !== null || window.getComputedStyle(el).display !== 'none';
    });
    
    if (tourIndexRef.current >= sections.length) {
      speak("That concludes the tour, sir. Let me know if you need anything else.");
      stopTour();
      return;
    }

    const currentSection = sections[tourIndexRef.current];
    const explanation = currentSection.getAttribute('data-jarvis-explain');

    // Remove highlight from previous
    sections.forEach(el => gsap.to(el, { boxShadow: 'none', borderColor: 'transparent', duration: 0.3 }));

    // Calculate robust absolute target Y to perfectly center the element
    const rect = currentSection.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY;
    const targetY = absoluteY - (window.innerHeight / 2) + (rect.height / 2);

    const highlightAndSpeak = () => {
      if (!isTouringRef.current) return;
      
      gsap.to(currentSection, { 
        boxShadow: '0 0 20px var(--color-accent)', 
        borderColor: 'var(--color-accent)',
        duration: 0.5 
      });

      speak(explanation, () => {
        tourIndexRef.current++;
        setTimeout(nextSection, 1000); // Pause before next section
      });
    };

    // Check if the element is already comfortably visible in the viewport
    const isVisible = rect.top >= 100 && rect.bottom <= (window.innerHeight - 100);
    const isMassive = rect.height > (window.innerHeight - 200);
    const isMassiveAndVisible = isMassive && rect.top <= 100 && rect.bottom >= (window.innerHeight - 100);

    if (isVisible || isMassiveAndVisible) {
      // Element is already visible, no need to scroll! Just highlight it.
      highlightAndSpeak();
    } else {
      // Scroll securely using GSAP to prevent user interference from breaking it
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetY, autoKill: false },
        ease: 'power3.inOut',
        onComplete: highlightAndSpeak
      });
    }
  };

  // Keyboard shortcut to stop tour
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isTouringRef.current) {
        stopTour();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed bottom-44 left-4 md:bottom-24 md:left-8 z-[9000] flex flex-col gap-2 items-center">
      {isActive && (
        <div className="bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] px-3 py-1.5 rounded-full text-xs font-meta tracking-wider shadow-lg flex items-center gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
          {isSpeaking ? (
            <>
              <div className="flex gap-0.5">
                <span className="w-1 h-3 bg-[var(--color-accent)] rounded-full animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                <span className="w-1 h-4 bg-[var(--color-accent)] rounded-full animate-[pulse_0.5s_ease-in-out_0.2s_infinite]"></span>
                <span className="w-1 h-2 bg-[var(--color-accent)] rounded-full animate-[pulse_0.5s_ease-in-out_0.4s_infinite]"></span>
              </div>
              <span className="text-[var(--color-text-primary)]">JARVIS SPEAKING</span>
            </>
          ) : isListening ? (
            <>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <span className="text-[var(--color-text-primary)]">LISTENING...</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span className="text-[var(--color-text-secondary)]">STANDBY</span>
            </>
          )}
        </div>
      )}

      <Magnetic>
        <button
          onClick={toggleActive}
          className={`w-12 h-12 rounded-full border shadow-lg flex items-center justify-center transition-all duration-300 focus:outline-none group ${
            isActive 
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white' 
              : 'bg-[var(--color-elevated)] border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]'
          }`}
          aria-label={isActive ? 'Deactivate Jarvis' : 'Activate Jarvis'}
          data-cursor={isActive ? 'DEACTIVATE JARVIS' : 'ACTIVATE JARVIS'}
        >
          {isActive ? (
            <Bot className="w-5 h-5 animate-pulse" />
          ) : (
            <Bot className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors" />
          )}
        </button>
      </Magnetic>
    </div>
  );
};
