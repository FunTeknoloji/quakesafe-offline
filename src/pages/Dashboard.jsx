import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ShieldCheck,
  Clock,
  CheckSquare,
  LifeBuoy,
  MapPin,
  Wrench,
  Users,
  MessageSquare,
  Bot,
  WifiOff,
  Settings as SettingsIcon
} from 'lucide-react';

const NavButton = ({ title, icon: Icon, color, onClick, description }) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-2xl flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 ${color} border border-white/10`}
  >
    <Icon size={40} />
    <div className="text-center">
      <span className="text-xl font-bold block">{title}</span>
      {description && <span className="text-xs opacity-80">{description}</span>}
    </div>
  </button>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      {/* Offline Status & Info */}
      <div className="bg-gray-900/50 rounded-xl p-4 flex items-center justify-between border border-gray-800">
        <div className="flex items-center gap-3">
          <WifiOff className="text-orange-500" size={24} />
          <div>
            <p className="text-sm font-medium">Çevrimdışı Mod Aktif</p>
            <p className="text-xs text-gray-400">Tüm veriler cihazınızda saklanıyor.</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wider text-gray-500">Son Deprem (Cache)</p>
          <p className="text-sm font-bold text-white">4.2 - Marmara Denizi</p>
        </div>
      </div>

      {/* Critical Mode Button */}
      <button
        onClick={() => navigate('/emergency')}
        className="w-full bg-red-600 hover:bg-red-700 p-8 rounded-3xl flex items-center justify-center gap-4 transition-all animate-pulse border-4 border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.3)]"
      >
        <AlertTriangle size={48} strokeWidth={2.5} />
        <span className="text-3xl font-black uppercase tracking-tighter">Acil Mod</span>
      </button>

      {/* Grid of Modules */}
      <div className="grid grid-cols-2 gap-4">
        <NavButton
          title="Öncesi"
          icon={ShieldCheck}
          color="bg-blue-900/40 text-blue-400"
          onClick={() => navigate('/guide/pre')}
        />
        <NavButton
          title="Deprem Anı"
          icon={Clock}
          color="bg-orange-900/40 text-orange-400"
          onClick={() => navigate('/guide/during')}
        />
        <NavButton
          title="Sonrası"
          icon={CheckSquare}
          color="bg-green-900/40 text-green-400"
          onClick={() => navigate('/guide/post')}
        />
        <NavButton
          title="İlk Yardım"
          icon={LifeBuoy}
          color="bg-rose-900/40 text-rose-400"
          onClick={() => navigate('/first-aid')}
        />
        <NavButton
          title="Toplanma"
          icon={MapPin}
          color="bg-emerald-900/40 text-emerald-400"
          onClick={() => navigate('/map')}
        />
        <NavButton
          title="Araçlar"
          icon={Wrench}
          color="bg-purple-900/40 text-purple-400"
          onClick={() => navigate('/tools')}
        />
        <NavButton
          title="Ailem"
          icon={Users}
          color="bg-indigo-900/40 text-indigo-400"
          onClick={() => navigate('/family')}
        />
        <NavButton
          title="Mesaj"
          icon={MessageSquare}
          color="bg-indigo-900/40 text-indigo-400"
          onClick={() => navigate('/messaging')}
        />
        <NavButton
          title="Asistan"
          icon={Bot}
          color="bg-cyan-900/40 text-cyan-400"
          onClick={() => navigate('/ai')}
        />
        <div className="col-span-2">
            <NavButton
                title="Ayarlar"
                icon={SettingsIcon}
                color="bg-gray-900/40 text-gray-400"
                onClick={() => navigate('/settings')}
            />
        </div>
      </div>

      <footer className="text-center py-4 text-gray-600 text-[10px] uppercase tracking-widest">
        QuakeSafe Offline v1.0.0
      </footer>
    </div>
  );
};

export default Dashboard;
