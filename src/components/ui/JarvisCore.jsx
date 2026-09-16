import React, { useState, useEffect, useRef } from 'react';
import { Bot, Mic, MicOff } from 'lucide-react';
import { Magnetic } from './Magnetic';
import gsap from 'gsap';

export const JarvisCore = () => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const voiceRef = useRef(null);
  
  const tourIndexRef = useRef(0);
  const isTouringRef = useRef(false);

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

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US'; // We can use en-US, it usually picks up Roman Urdu decently if pronounced clearly

      recognition.onstart = () => setIsListening(true);
      
      recognition.onend = () => {
        setIsListening(false);
        // Restart if active (to keep continuous listening alive if browser stops it)
        if (isActive && !isSpeaking) {
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

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isActive, isSpeaking]);

  useEffect(() => {
    if (isActive && recognitionRef.current && !isListening && !isSpeaking) {
      try {
        recognitionRef.current.start();
      } catch (e) {}
    } else if (!isActive && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, [isActive, isListening, isSpeaking]);

  const speak = (text, callback) => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop listening while speaking to prevent echo
    }
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceRef.current) utterance.voice = voiceRef.current;
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (callback) callback();
      
      // Resume listening
      if (isActive && recognitionRef.current) {
        setTimeout(() => {
          try { recognitionRef.current.start(); } catch (e) {}
        }, 500);
      }
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

    if (transcript.includes('hey jarvis') || transcript.includes('jarvis')) {
      // Check if it's a combined command "Hey jarvis go through the page"
      if (transcript.includes('go through') || transcript.includes('explain') || transcript.includes('tour') || transcript.includes('dikhao') || transcript.includes('samjhao') || transcript.includes('visualize')) {
        speak("Certainly sir. Let me take you through the portfolio.", () => {
          startTour();
        });
      } else {
        // Just greeting
        const greetings = ["Yes sir?", "At your service.", "How can I help you?", "Ji sir, batayen."];
        speak(greetings[Math.floor(Math.random() * greetings.length)]);
      }
    } else if (transcript.includes('go through') || transcript.includes('explain') || transcript.includes('tour') || transcript.includes('dikhao') || transcript.includes('samjhao')) {
      speak("Initiating portfolio tour.", () => {
        startTour();
      });
    }
  };

  const startTour = () => {
    isTouringRef.current = true;
    tourIndexRef.current = 0;
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

    // Scroll into view
    currentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight current
    setTimeout(() => {
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
    }, 800); // Wait for scroll
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
          onClick={() => setIsActive(!isActive)}
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
