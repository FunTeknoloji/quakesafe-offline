import React from 'react';
import { CheckSquare, Flame, Zap, Droplets, AlertTriangle, Info } from 'lucide-react';

const Card = ({ title, items, icon: Icon, color }) => (
  <div className="mb-6 bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <Icon size={24} />
      <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-3 items-start text-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-2.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GuidePost = () => {
  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-green-500">DEPREM SONRASI</h1>

      <div className="bg-yellow-900/40 border border-yellow-600/50 p-4 rounded-xl mb-6 flex gap-4 items-center">
        <AlertTriangle className="text-yellow-500 shrink-0" size={32} />
        <p className="text-yellow-200 font-bold leading-tight">
          Artçı sarsıntılara karşı hazırlıklı olun. Hasarlı binalara girmeyin.
        </p>
      </div>

      <Card
        title="Güvenlik Kontrolü"
        color="text-green-400"
        icon={CheckSquare}
        items={[
          "Kendi emniyetinizden emin olun.",
          "Çevrenizdeki yaralılara yardım edin.",
          "Gaz, su ve elektrik tesisatlarını kontrol edin.",
          "Yangın kontrolü yapın."
        ]}
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-950 border border-orange-800 rounded-xl p-4 flex flex-col items-center text-center gap-2">
          <Flame size={24} className="text-orange-500" />
          <span className="text-xs font-bold">GAZ</span>
          <span className="text-[10px] text-gray-400 uppercase">Kapat</span>
        </div>
        <div className="bg-yellow-950 border border-yellow-800 rounded-xl p-4 flex flex-col items-center text-center gap-2">
          <Zap size={24} className="text-yellow-500" />
          <span className="text-xs font-bold">ELEKTRİK</span>
          <span className="text-[10px] text-gray-400 uppercase">Şalteri İndir</span>
        </div>
        <div className="bg-blue-950 border border-blue-800 rounded-xl p-4 flex flex-col items-center text-center gap-2">
          <Droplets size={24} className="text-blue-500" />
          <span className="text-xs font-bold">SU</span>
          <span className="text-[10px] text-gray-400 uppercase">Vana Kapat</span>
        </div>
      </div>

      <Card
        title="Hasar Kontrolü"
        color="text-blue-400"
        icon={Info}
        items={[
          "Binadaki çatlakları kontrol edin.",
          "Bacaları kontrol edin (yangın riski).",
          "Dökülen tehlikeli maddeleri temizleyin.",
          "Radyoyu açıp resmi duyuruları dinleyin."
        ]}
      />

      <div className="bg-gray-900 rounded-2xl p-6 border-l-4 border-red-500">
        <h3 className="text-lg font-bold text-red-500 mb-2">Enkaz Çevresi Davranış</h3>
        <p className="text-gray-300">
          Enkaz altında değilseniz, enkazlardan uzak durun. Arama kurtarma ekiplerinin çalışmasını engellemeyin. Gereksiz telefon kullanımından kaçının, SMS veya internet kullanın.
        </p>
      </div>
    </div>
  );
};

export default GuidePost;
