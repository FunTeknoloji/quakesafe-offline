import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Users,
  WifiOff,
  Activity,
  ChevronRight
} from 'lucide-react';

const QuickAction = ({ title, icon: Icon, color, onClick, description }) => (
  <button
    onClick={onClick}
    className="w-full p-5 bg-gray-900 border border-gray-800 rounded-3xl flex items-center gap-4 active:scale-95 transition-transform"
  >
    <div className={`p-3 rounded-2xl ${color}`}>
      <Icon size={28} />
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-lg leading-none">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
    <ChevronRight size={20} className="text-gray-700" />
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-2">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Merhaba,</h2>
        <p className="text-gray-400 font-medium">Güvende kalman için buradayız.</p>
      </section>

      {/* Emergency Button - Redesigned */}
      <button
        onClick={() => navigate('/emergency')}
        className="group relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl shadow-red-900/40"
      >
        <div className="absolute inset-0 bg-red-600 group-active:bg-red-700 transition-colors flex flex-col items-center justify-center gap-2">
          <AlertTriangle size={64} className="animate-bounce" />
          <span className="text-4xl font-black uppercase italic tracking-tighter">Acil Mod</span>
          <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Siren ve SOS</span>
        </div>
      </button>

      <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-2xl flex items-center gap-3">
        <WifiOff className="text-blue-500" size={24} />
        <p className="text-xs font-bold text-blue-200">
            %100 Çevrimdışı Mod Aktif. Tüm verileriniz bu cihazda güvende.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-4">
        <QuickAction
          title="Toplanma Alanları"
          description="Sana en yakın güvenli bölgeleri gör."
          icon={MapPin}
          color="bg-emerald-500/20 text-emerald-500"
          onClick={() => navigate('/map')}
        />
        <QuickAction
          title="Aile Grubu"
          description="Sevdiklerinin durumunu takip et."
          icon={Users}
          color="bg-indigo-500/20 text-indigo-500"
          onClick={() => navigate('/family')}
        />
        <QuickAction
          title="İlk Yardım"
          description="Adım adım hayatta kalma rehberi."
          icon={Activity}
          color="bg-rose-500/20 text-rose-500"
          onClick={() => navigate('/first-aid')}
        />
        <QuickAction
          title="Hazırlık Rehberi"
          description="Deprem öncesi yapılması gerekenler."
          icon={ShieldCheck}
          color="bg-orange-500/20 text-orange-500"
          onClick={() => navigate('/guide/pre')}
        />
      </section>

      <footer className="text-center pt-4 pb-8">
        <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.2em]">QuakeSafe Offline v2.0</p>
      </footer>
    </div>
  );
};

export default Dashboard;
