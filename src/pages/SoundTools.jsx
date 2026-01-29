import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, ShieldAlert, Zap, Radio, Bell, Waves } from 'lucide-react';
import { playSound, stopAllSounds } from '../utils/audio';

const SoundTools = () => {
  const navigate = useNavigate();
  const [activeSound, setActiveSound] = useState(null);

  const sounds = [
    { id: 'siren_klasik', name: 'Klasik Siren', icon: ShieldAlert, color: 'bg-red-600', desc: 'Acil durum araç sireni.' },
    { id: 'yangin_alrmi', name: 'Yangın Alarmı', icon: Bell, color: 'bg-orange-600', desc: 'Standart T3 duman dedektörü alarmı.' },
    { id: 'sinyal_4khz', name: 'Tiz Sinyal (4kHz)', icon: Zap, color: 'bg-yellow-500', desc: 'Çok yüksek frekanslı delici ses.' },
    { id: 'sinyal_2khz', name: 'Tiz Sinyal (2kHz)', icon: Zap, color: 'bg-yellow-600', desc: 'Yüksek frekanslı uyarı sesi.' },
    { id: 'sinyal_1khz', name: 'Tiz Sinyal (1kHz)', icon: Zap, color: 'bg-yellow-700', desc: 'Orta-Yüksek frekanslı sinyal.' },
    { id: 'sonar_pulse', name: 'Sonar Nabız', icon: Waves, color: 'bg-cyan-600', desc: 'Ritmik sonar tarama sesi.' },
    { id: 'duduk_sesi', name: 'Düdük Sesi', icon: Volume2, color: 'bg-blue-600', desc: 'Yardım için düdük simülasyonu.' },
    { id: 'sos_sinyali', name: 'Morse SOS', icon: Radio, color: 'bg-purple-600', desc: 'Uluslararası Mors yardım kodu.' },
  ];

  const handleSoundToggle = (id) => {
    if (activeSound === id) {
      stopAllSounds();
      setActiveSound(null);
    } else {
      playSound(id);
      setActiveSound(id);
    }
  };

  useEffect(() => {
    return () => stopAllSounds();
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col p-6 text-white overflow-y-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/tools')}
          className="bg-gray-900 p-3 rounded-2xl border border-gray-800 active:scale-90 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black uppercase italic tracking-tighter">Sesli Sinyaller</h1>
        <div className="w-10"></div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sounds.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundToggle(sound.id)}
            className={`p-5 rounded-[2rem] border transition-all flex items-center gap-5 text-left ${
              activeSound === sound.id
                ? `${sound.color} border-white shadow-[0_0_30px_rgba(255,255,255,0.2)] scale-[0.98]`
                : 'bg-gray-900 border-gray-800'
            }`}
          >
            <div className={`p-4 rounded-2xl ${activeSound === sound.id ? 'bg-white/20' : sound.color}`}>
              <sound.icon size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black uppercase italic leading-none">{sound.name}</h3>
              <p className="text-xs mt-1 font-medium opacity-60 leading-tight">{sound.desc}</p>
            </div>
            {activeSound === sound.id && (
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 bg-blue-900/20 border border-blue-800/50 p-4 rounded-2xl">
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest text-center">
              SES SEVİYESİNİ CİHAZINIZDAN AYARLAYIN.
          </p>
      </div>

      <button
        onClick={() => { stopAllSounds(); setActiveSound(null); }}
        className="mt-8 w-full py-5 bg-white text-black font-black uppercase rounded-3xl active:bg-gray-200 transition-colors"
      >
        TÜM SESLERİ DURDUR
      </button>
    </div>
  );
};

export default SoundTools;
