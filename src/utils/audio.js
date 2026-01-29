let audioCtx = null;
let currentOscillator = null;
let currentGain = null;
let currentLfo = null;
let currentInterval = null;
let currentTimeout = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
};

export const stopAllSounds = () => {
  if (currentOscillator) {
    try { currentOscillator.stop(); } catch { /* ignore */ }
    currentOscillator.disconnect();
    currentOscillator = null;
  }
  if (currentGain) {
    currentGain.disconnect();
    currentGain = null;
  }
  if (currentLfo) {
    try { currentLfo.stop(); } catch { /* ignore */ }
    currentLfo.disconnect();
    currentLfo = null;
  }
  if (currentInterval) {
    clearInterval(currentInterval);
    currentInterval = null;
  }
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    currentTimeout = null;
  }
};

export const playSound = (type) => {
  initAudio();
  stopAllSounds();

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  currentOscillator = osc;
  currentGain = gain;

  const now = audioCtx.currentTime;

  switch (type) {
    case 'siren_klasik': {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      const lfo = audioCtx.createOscillator();
      const lfoGain = audioCtx.createGain();
      lfo.frequency.value = 1;
      lfoGain.gain.value = 400;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();
      currentLfo = lfo;
      gain.gain.setValueAtTime(0.5, now);
      break;
    }

    case 'yangin_alrmi': { // T3 Pattern: 0.5s on, 0.5s off (x3), then 1.5s off
      osc.type = 'square';
      osc.frequency.setValueAtTime(3000, now); // High pitch smoke alarm
      gain.gain.setValueAtTime(0, now);
      let step = 0;
      const playT3 = () => {
        const currentTime = audioCtx.currentTime;
        if (step < 6) { // 3 pulses (on/off pairs)
          gain.gain.setValueAtTime(step % 2 === 0 ? 0.5 : 0, currentTime);
          currentTimeout = setTimeout(playT3, 500);
        } else { // 1.5s pause
          gain.gain.setValueAtTime(0, currentTime);
          currentTimeout = setTimeout(() => { step = -1; playT3(); }, 1500);
        }
        step++;
      };
      playT3();
      break;
    }

    case 'sinyal_4khz':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(4000, now);
      gain.gain.setValueAtTime(0.4, now);
      break;

    case 'sinyal_2khz':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, now);
      gain.gain.setValueAtTime(0.5, now);
      break;

    case 'sinyal_1khz':
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0.6, now);
      break;

    case 'sonar_pulse': {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1500, now);
      gain.gain.setValueAtTime(0, now);
      currentInterval = setInterval(() => {
        gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      }, 1500);
      break;
    }

    case 'duduk_sesi':
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2000, now);
      currentInterval = setInterval(() => {
        osc.frequency.exponentialRampToValueAtTime(2500, audioCtx.currentTime + 0.1);
        osc.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.2);
      }, 300);
      gain.gain.setValueAtTime(0.5, now);
      break;

    case 'sos_sinyali': {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      gain.gain.setValueAtTime(0, now);
      const pattern = [200, 200, 200, 200, 200, 600, 600, 200, 600, 200, 600, 600, 200, 200, 200, 200, 200, 1000];
      let pIdx = 0;
      const playPattern = () => {
        const dur = pattern[pIdx];
        const isGap = pIdx % 2 === 1;
        gain.gain.setValueAtTime(isGap ? 0 : 0.5, audioCtx.currentTime);
        currentTimeout = setTimeout(() => {
          pIdx = (pIdx + 1) % pattern.length;
          playPattern();
        }, dur);
      };
      playPattern();
      break;
    }

    default:
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.5, now);
  }

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
};

export const startSiren = () => playSound('siren_klasik');
export const stopSiren = () => stopAllSounds();
export const playWhistle = () => playSound('duduk_sesi');
