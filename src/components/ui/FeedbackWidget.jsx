import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Star, Mic, MicOff, Send, X, CheckCircle } from 'lucide-react';
import gsap from 'gsap';

export const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState('');
  
  // Audio state
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);
  const [audioMimeType, setAudioMimeType] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [hasTriggeredExitIntent, setHasTriggeredExitIntent] = useState(false);
  const [openedByExitIntent, setOpenedByExitIntent] = useState(false);
  
  const modalRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // Trigger when mouse leaves the top of the window (exit intent)
      if (e.clientY <= 0 && !hasTriggeredExitIntent && !isOpen) {
        const hasSeen = localStorage.getItem('hasSeenFeedbackModal');
        if (!hasSeen) {
          setOpenedByExitIntent(true);
          setIsOpen(true);
          setHasTriggeredExitIntent(true);
          localStorage.setItem('hasSeenFeedbackModal', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggeredExitIntent, isOpen]);

  const handleOpenModal = () => {
    setOpenedByExitIntent(false);
    setIsOpen(true);
    setHasTriggeredExitIntent(true);
    setShowCancelConfirm(false);
    localStorage.setItem('hasSeenFeedbackModal', 'true');
  };

  const handleCloseAttempt = () => {
    if (isSubmitting) return;
    
    // Only show begging screen if it was opened automatically by exit intent
    if (openedByExitIntent && !showCancelConfirm) {
      setShowCancelConfirm(true);
    } else {
      setIsOpen(false);
      setShowCancelConfirm(false);
      setOpenedByExitIntent(false);
    }
  };

  const forceClose = () => {
    setIsOpen(false);
    setShowCancelConfirm(false);
    setOpenedByExitIntent(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioMimeType(mediaRecorder.mimeType || 'audio/webm');
        
        // Convert Blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          setAudioBase64(reader.result);
        };

        // Stop all tracks to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required to record a voice note.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const resetAudio = () => {
    setAudioUrl(null);
    setAudioBase64(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 && !text.trim() && !audioBase64) return;
    
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          text,
          audioBase64,
          mimeType: audioMimeType
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
          setShowCancelConfirm(false);
          setRating(0);
          setText('');
          resetAudio();
        }, 3000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error(error);
      alert('There was an issue sending your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={handleOpenModal}
        className={`fixed top-1/2 right-0 -translate-y-1/2 bg-[var(--color-text-primary)] text-[var(--color-canvas)] py-3 px-2 rounded-l-lg shadow-[-4px_0_15px_rgba(0,0,0,0.1)] hover:pr-4 transition-all duration-300 z-[900] ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <span className="flex items-center gap-2 font-medium tracking-widest text-sm">
          <MessageSquare className="w-4 h-4 rotate-90" />
          Feedback
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 bg-[var(--color-canvas)]/80 backdrop-blur-sm">
          <div 
            className="absolute inset-0" 
            onClick={handleCloseAttempt}
          ></div>
          
          {/* Modal Content */}
          <div 
            ref={modalRef}
            className="relative w-full max-w-md bg-[var(--color-elevated)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl p-6 md:p-8"
          >
            <button 
              onClick={handleCloseAttempt}
              className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              disabled={isSubmitting}
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display text-[var(--color-text-primary)] mb-2">Thank You!</h3>
                <p className="text-[var(--color-text-secondary)]">Your feedback helps me improve.</p>
              </div>
            ) : showCancelConfirm ? (
              <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
                <h3 className="text-2xl font-display text-[var(--color-text-primary)] mb-3">Wait! Are you sure?</h3>
                <p className="text-[var(--color-text-secondary)] mb-8">
                  Your feedback is incredibly valuable to me and helps me improve this portfolio. It only takes a few seconds!
                </p>
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => setShowCancelConfirm(false)} 
                    className="flex-1 py-3 bg-[var(--color-text-primary)] text-[var(--color-canvas)] rounded-lg font-medium hover:scale-105 transition-transform"
                  >
                    Give Feedback
                  </button>
                  <button 
                    onClick={forceClose} 
                    className="flex-1 py-3 border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:text-red-500 hover:border-red-500 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-display text-[var(--color-text-primary)] mb-1">Rate this portfolio</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">How was your experience exploring my work?</p>
                  
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            (hoveredRating ? star <= hoveredRating : star <= rating)
                              ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'text-[var(--color-border-strong)]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Leave a comment
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What did you like? What could be better?"
                    className="w-full bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] rounded-lg p-3 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors min-h-[100px] resize-y"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Or leave a voice note
                  </label>
                  
                  {!audioUrl ? (
                    <button
                      type="button"
                      onMouseDown={startRecording}
                      onMouseUp={stopRecording}
                      onTouchStart={startRecording}
                      onTouchEnd={stopRecording}
                      className={`w-full flex items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all duration-300 ${
                        isRecording 
                          ? 'border-red-500 bg-red-500/10 text-red-500 scale-[0.98]' 
                          : 'border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <Mic className="w-5 h-5 animate-pulse" />
                          <span className="font-medium animate-pulse">Recording... {formatTime(recordingTime)}</span>
                          <span className="text-xs ml-2 opacity-70">(Release to stop)</span>
                        </>
                      ) : (
                        <>
                          <Mic className="w-5 h-5" />
                          <span className="font-medium">Hold to record voice</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 bg-[var(--color-canvas)] border border-[var(--color-border-subtle)] rounded-lg p-3">
                      <audio src={audioUrl} controls className="flex-1 h-10" />
                      <button 
                        type="button"
                        onClick={resetAudio}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                        aria-label="Delete recording"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || (rating === 0 && !text.trim() && !audioBase64)}
                  className="w-full bg-[var(--color-text-primary)] text-[var(--color-canvas)] font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[var(--color-accent)] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Feedback
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
