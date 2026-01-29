import { useState, useEffect } from 'react';
import { Volume2, Zap, HelpCircle, ArrowLeft, Bell, Radio, XCircle } from 'lucide-react';
import { playSound, stopAllSounds } from '../utils/audio';

const EmergencyMode = () => {
  const [activeSound, setActiveSound] = useState(null);
  const [isFlashActive, setIsFlashActive] = useState(false);

  // Wake Lock Logic
  useEffect(() => {
    let wl = null;
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wl = await navigator.wakeLock.request('screen');
          console.log('Wake Lock is active');
        }
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    };

    requestWakeLock();

    return () => {
      if (wl) {
        wl.release().then(() => {
          console.log('Wake Lock was released');
        });
      }
    };
  }, []);

  useEffect(() => {
    if (activeSound) {
      const interval = setInterval(() => {
        if ('vibrate' in navigator) {
          navigator.vibrate([500, 200, 500]);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      }
    }
  }, [activeSound]);

  const toggleSound = (id) => {
    if (activeSound === id) {
      stopAllSounds();
      setActiveSound(null);
    } else {
      playSound(id);
      setActiveSound(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-red-600 z-[100] flex flex-col p-6 text-white overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-black uppercase italic">ACİL MOD</h1>
        <button
          onClick={() => window.history.back()}
          className="bg-black/20 p-2 rounded-full"
        >
          <ArrowLeft size={32} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6 items-center justify-center">
        <button
          onClick={() => toggleSound('siren_klasik')}
          className={`w-60 h-60 rounded-full flex flex-col items-center justify-center gap-4 transition-all border-[12px] shadow-2xl ${
            activeSound === 'siren_klasik' ? 'bg-white text-red-600 border-red-900 animate-pulse' : 'bg-red-950 text-white border-red-800'
          }`}
        >
          <Volume2 size={80} strokeWidth={3} />
          <span className="text-2xl font-black">{activeSound === 'siren_klasik' ? 'SİRENİ DURDUR' : 'SİRENİ AÇ'}</span>
        </button>

        <div className="grid grid-cols-2 gap-4 w-full">
          <button
            onClick={() => setIsFlashActive(!isFlashActive)}
            className={`p-6 rounded-2xl flex flex-col items-center gap-2 font-bold ${
              isFlashActive ? 'bg-yellow-400 text-black' : 'bg-red-800 text-white shadow-lg'
            }`}
          >
            <Zap size={32} />
            SOS FLAŞ
          </button>
          <button
            onClick={() => toggleSound('sos_sinyali')}
            className={`p-6 rounded-2xl flex flex-col items-center gap-2 font-bold ${
              activeSound === 'sos_sinyali' ? 'bg-purple-600 text-white shadow-xl scale-105 animate-pulse' : 'bg-red-800 text-white'
            }`}
          >
            <Radio size={32} />
            MORSE SOS
          </button>
          <button
            onClick={() => toggleSound('yangin_alrmi')}
            className={`p-6 rounded-2xl flex flex-col items-center gap-2 font-bold ${
              activeSound === 'yangin_alrmi' ? 'bg-orange-500 text-white shadow-xl scale-105 animate-pulse' : 'bg-red-800 text-white'
            }`}
          >
            <Bell size={32} />
            YANGIN ALARMI
          </button>
          <button
             onClick={() => { stopAllSounds(); setActiveSound(null); }}
             className="p-6 rounded-2xl flex flex-col items-center gap-2 font-bold bg-white text-black active:bg-gray-200"
          >
            <XCircle size={32} />
            SESİ KES
          </button>
        </div>
      </div>

      <div className="mt-8 bg-black/30 rounded-3xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <HelpCircle size={28} className="text-red-300" />
          <h2 className="text-xl font-bold uppercase tracking-tight">Hayatta Kalma Rehberi</h2>
        </div>
        <ul className="space-y-4 text-lg font-medium">
          <li className="flex gap-3">
            <span className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">1</span>
            <span>Sakin kal, derin nefes al.</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
            <span>Çök, Kapan, Tutun pozisyonunu al.</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">3</span>
            <span>Asansörden ve merdivenlerden uzak dur.</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-white text-red-600 w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold">4</span>
            <span>Siren sesini aralıklarla açarak yerini belli et.</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center opacity-70 text-sm">
        Telefonun parlaklığı maksimuma ayarlandı.
        <br />
        Uyku modu devre dışı bırakılmaya çalışılıyor.
      </div>
    </div>
  );
};

export default EmergencyMode;
