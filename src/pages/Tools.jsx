import React, { useState, useEffect } from 'react';
import { Compass, Zap, Volume2, FileText, Ruler, RefreshCw } from 'lucide-react';
import { playWhistle } from '../utils/audio';

const ToolCard = ({ title, icon: Icon, children, color }) => (
  <div className="mb-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <Icon size={24} />
      <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
    </div>
    {children}
  </div>
);

const Tools = () => {
  const [heading, setHeading] = useState(0);
  const [flashlight, setFlashlight] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem('qs_notes') || '');

  useEffect(() => {
    const handleOrientation = (e) => {
      if (e.webkitCompassHeading) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha) {
        setHeading(360 - e.alpha);
      }
    };
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const saveNotes = (val) => {
    setNotes(val);
    localStorage.setItem('qs_notes', val);
  };

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-purple-500">ARAÇLAR</h1>

      <ToolCard title="Pusula" icon={Compass} color="text-blue-400">
        <div className="flex flex-col items-center">
          <div
            className="w-48 h-48 rounded-full border-4 border-gray-700 relative flex items-center justify-center bg-black transition-transform duration-200"
            style={{ transform: `rotate(${-heading}deg)` }}
          >
            <div className="absolute top-2 font-black text-red-500">N</div>
            <div className="absolute bottom-2 font-black text-white">S</div>
            <div className="absolute left-2 font-black text-white">W</div>
            <div className="absolute right-2 font-black text-white">E</div>
            <div className="w-1 h-24 bg-red-500 rounded-full relative bottom-6" />
            <div className="w-1 h-24 bg-white rounded-full relative top-6" />
          </div>
          <p className="mt-4 text-2xl font-mono">{Math.round(heading)}°</p>
          <p className="text-xs text-gray-500 uppercase mt-1">Cihazınızı düz tutun</p>
        </div>
      </ToolCard>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setFlashlight(!flashlight)}
          className={`p-6 rounded-2xl border flex flex-col items-center gap-3 transition-colors ${
            flashlight ? 'bg-yellow-400 border-yellow-300 text-black' : 'bg-gray-900 border-gray-800 text-white'
          }`}
        >
          <Zap size={32} />
          <span className="font-bold uppercase tracking-tight">Fener</span>
        </button>
        <button
          className="p-6 rounded-2xl border border-gray-800 bg-gray-900 text-white flex flex-col items-center gap-3 active:bg-red-900/40"
          onClick={() => playWhistle()}
        >
          <Volume2 size={32} className="text-red-500" />
          <span className="font-bold uppercase tracking-tight">Düdük</span>
        </button>
      </div>

      <ToolCard title="Acil Durum Notları" icon={FileText} color="text-green-400">
        <textarea
          value={notes}
          onChange={(e) => saveNotes(e.target.value)}
          placeholder="İlaçlarınız, kan grubunuz veya önemli numaraları buraya not edin..."
          className="w-full h-32 bg-black border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-green-500"
        />
        <p className="text-[10px] text-gray-500 mt-2 uppercase">Veriler sadece bu cihazda saklanır.</p>
      </ToolCard>

      <ToolCard title="Su Terazisi" icon={RefreshCw} color="text-orange-400">
        <div className="h-12 bg-black border border-gray-800 rounded-full relative flex items-center px-2 overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700" />
          <div
            className="w-8 h-8 rounded-full bg-orange-500/50 border-2 border-orange-400 blur-[2px] transition-all"
            style={{ marginLeft: `calc(50% - 1rem + ${Math.min(Math.max(heading - 180, -100), 100) / 2}px)` }}
          />
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">Düz yüzey kontrolü için</p>
      </ToolCard>
    </div>
  );
};

export default Tools;
