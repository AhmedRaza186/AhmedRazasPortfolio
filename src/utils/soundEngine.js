class SoundEngine {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft thud for hovering on magnetic elements
  playHover() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    
    // Very quick low frequency envelope
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  // Delicate high-pitched ping for water ripples
  playPing() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  // Filtered noise for page transition whoosh
  playWhoosh() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    
    const bufferSize = this.ctx.sampleRate * 0.5; // 0.5 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.25);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.5);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + 0.25);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    noise.start();
  }

  // Heavy, cinematic rumble sweep for door opening
  playDoorOpen() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 1.5);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 1.5);

    // Noise layer for friction
    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, this.ctx.currentTime);
    filter.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.5);
    filter.frequency.linearRampToValueAtTime(50, this.ctx.currentTime + 1.5);
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0, this.ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.3);
    noiseGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    
    noise.start();
  }

  // Very faint, airy swoosh for light rays
  playLightRay() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    
    const bufferSize = this.ctx.sampleRate * 0.3; // 0.3 seconds
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(8000, this.ctx.currentTime + 0.15);
    filter.frequency.exponentialRampToValueAtTime(2000, this.ctx.currentTime + 0.3);
    filter.Q.value = 5;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 0.15);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    noise.start();
  }

  // Intense klaxon alarm for Easter Egg trigger
  playAlarm() {
    if (!this.ctx || this.ctx.state === 'suspended') return;

    // Two oscillators for a dissonant, piercing alarm sound
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    // Klaxon siren sweep up and down
    osc1.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc1.frequency.linearRampToValueAtTime(800, this.ctx.currentTime + 0.3);
    osc1.frequency.linearRampToValueAtTime(400, this.ctx.currentTime + 0.6);
    
    osc2.frequency.setValueAtTime(410, this.ctx.currentTime); // Slight dissonance
    osc2.frequency.linearRampToValueAtTime(820, this.ctx.currentTime + 0.3);
    osc2.frequency.linearRampToValueAtTime(410, this.ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.6);
    osc2.stop(this.ctx.currentTime + 0.6);
  }
}

export const soundEngine = new SoundEngine();
