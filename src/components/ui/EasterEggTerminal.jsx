import React, { useState, useEffect, useRef } from 'react';
import { useSound } from '../../context/SoundContext';

export const EasterEggTerminal = ({ onClose }) => {
  const { playPing, playWhoosh } = useSound();
  const [history, setHistory] = useState([
    { type: 'system', text: 'SYSTEM OVERRIDE INITIATED...' },
    { type: 'system', text: 'ACCESS GRANTED: ROOT LEVEL' },
    { type: 'system', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    playWhoosh();
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => window.removeEventListener('keydown', handleEsc);
  }, [playWhoosh, onClose]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'user', text: `root@ahmed:~$ ${cmd}` }];
      
      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'system', text: 'Commands: help, whoami, ls, clear, exit, secret-projects' });
          break;
        case 'whoami':
          newHistory.push({ type: 'system', text: 'AHMED RAZA - Product Engineer & Full Stack Developer' });
          break;
        case 'ls':
          newHistory.push({ type: 'system', text: 'portfolio.exe  secret_plans.txt  world_domination.sh' });
          break;
        case 'secret-projects':
          newHistory.push({ type: 'system', text: 'CLASSIFIED: Currently building Antigravity AI...' });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          onClose();
          return;
        default:
          if (cmd !== '') {
            newHistory.push({ type: 'error', text: `Command not found: ${cmd}` });
          }
      }
      setHistory(newHistory);
      setInput('');
      playPing();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black text-[#0f0] font-mono p-8 overflow-y-auto" style={{ textShadow: '0 0 5px #0f0' }}>
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #0f0 2px, #0f0 4px)' }}></div>
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-2 text-lg">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'error' ? 'text-red-500' : 'text-[#0f0]'}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-2 mt-4">
          <span>root@ahmed:~$</span>
          <input 
            type="text" 
            autoFocus 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent border-none outline-none flex-grow text-[#0f0] caret-[#0f0]"
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={endRef}></div>
      </div>
    </div>
  );
};
