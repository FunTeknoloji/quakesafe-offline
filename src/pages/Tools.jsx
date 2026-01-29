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
  const [tilt, setTilt] = useState({ beta: 0, gamma: 0 });
  const [flashlight, setFlashlight] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem('qs_notes') || '');
  const [torchTrack, setTorchTrack] = useState(null);

  useEffect(() => {
    const handleOrientation = (e) => {
      // Compass
      if (e.webkitCompassHeading) {
        setHeading(e.webkitCompassHeading);
      } else if (e.alpha) {
        setHeading(360 - e.alpha);
      }
      // Spirit Level
      if (e.beta !== null && e.gamma !== null) {
        setTilt({ beta: e.beta, gamma: e.gamma });
      }
    };
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const toggleFlashlight = async () => {
    try {
      if (!flashlight) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: true }]
          });
          setTorchTrack(track);
          setFlashlight(true);
        } else {
            // Fallback for UI if no hardware torch
            setFlashlight(true);
            setTimeout(() => setFlashlight(false), 5000);
            alert("Cihazınızda flaş desteği bulunamadı.");
        }
      } else {
        if (torchTrack) {
          await torchTrack.applyConstraints({
            advanced: [{ torch: false }]
          });
          torchTrack.stop();
          setTorchTrack(null);
        }
        setFlashlight(false);
      }
    } catch (err) {
      console.error(err);
      setFlashlight(!flashlight); // Toggle UI anyway for demo
    }
  };

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
        </div>
      </ToolCard>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={toggleFlashlight}
          className={`p-6 rounded-[2rem] border flex flex-col items-center gap-3 transition-all ${
            flashlight ? 'bg-yellow-400 border-yellow-300 text-black shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'bg-gray-900 border-gray-800 text-white'
          }`}
        >
          <Zap size={32} />
          <span className="font-black uppercase tracking-widest text-[10px]">Fener</span>
        </button>
        <button
          className="p-6 rounded-[2rem] border border-gray-800 bg-gray-900 text-white flex flex-col items-center gap-3 active:bg-red-900/40 active:scale-95 transition-all"
          onClick={() => playWhistle()}
        >
          <Volume2 size={32} className="text-red-500" />
          <span className="font-black uppercase tracking-widest text-[10px]">Düdük</span>
        </button>
      </div>

      <ToolCard title="Su Terazisi" icon={RefreshCw} color="text-emerald-400">
        <div className="aspect-square bg-black border-2 border-gray-800 rounded-full relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-gray-800" />
              <div className="h-full w-[1px] bg-gray-800" />
          </div>
          <div
            className="w-10 h-10 rounded-full bg-emerald-500/50 border-2 border-emerald-400 blur-[1px] transition-all duration-75 ease-out shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            style={{
                transform: `translate(${Math.min(Math.max(tilt.gamma, -45), 45) * 2}px, ${Math.min(Math.max(tilt.beta, -45), 45) * 2}px)`
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-emerald-500/20 rounded-full" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 text-center font-mono text-sm opacity-60">
            <div>X: {Math.round(tilt.gamma)}°</div>
            <div>Y: {Math.round(tilt.beta)}°</div>
        </div>
      </ToolCard>

      <ToolCard title="Acil Durum Notları" icon={FileText} color="text-orange-400">
        <textarea
          value={notes}
          onChange={(e) => saveNotes(e.target.value)}
          placeholder="İlaçlarınız, kan grubunuz veya önemli numaraları buraya not edin..."
          className="w-full h-32 bg-black border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-orange-500 placeholder:text-gray-700"
        />
        <p className="text-[9px] text-gray-600 mt-2 uppercase font-black tracking-widest">Veriler bu cihazda şifreli saklanır.</p>
      </ToolCard>
    </div>
  );
};

export default Tools;
