let audioCtx = null;
let oscillator = null;
let gainNode = null;

export const startSiren = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (oscillator) return;

  oscillator = audioCtx.createOscillator();
  gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);

  // Siren effect
  const now = audioCtx.currentTime;
  oscillator.frequency.exponentialRampToValueAtTime(880, now + 0.5);
  oscillator.frequency.exponentialRampToValueAtTime(440, now + 1);
  oscillator.loop = true;

  // Modulate frequency for siren sound
  const lfo = audioCtx.createOscillator();
  const lfoGain = audioCtx.createGain();
  lfo.frequency.value = 1; // 1Hz
  lfoGain.gain.value = 400; // range of frequency shift

  lfo.connect(lfoGain);
  lfoGain.connect(oscillator.frequency);
  lfo.start();

  gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
};

export const stopSiren = () => {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }
};

export const playWhistle = () => {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(2000, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2500, audioCtx.currentTime + 0.1);
    g.gain.setValueAtTime(0.5, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
}
