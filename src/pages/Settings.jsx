import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Moon, Globe, Battery, Shield, Database } from 'lucide-react';

const SettingItem = ({ icon: Icon, title, description, children }) => (
  <div className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-2xl mb-3">
    <div className="flex gap-4 items-center">
      <div className="bg-gray-800 p-2 rounded-xl text-gray-400">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
    {children}
  </div>
);

const Settings = () => {
  const [batterySave, setBatterySave] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2">AYARLAR</h1>

      <SettingItem
        icon={Battery}
        title="Pil Tasarruf Modu"
        description="Düşük parlaklık ve azaltılmış animasyonlar."
      >
        <button
          onClick={() => setBatterySave(!batterySave)}
          className={`w-12 h-6 rounded-full transition-colors relative ${batterySave ? 'bg-green-600' : 'bg-gray-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${batterySave ? 'left-7' : 'left-1'}`} />
        </button>
      </SettingItem>

      <SettingItem
        icon={Globe}
        title="Dil / Language"
        description="Türkçe (Varsayılan)"
      >
        <button className="text-xs font-bold text-blue-400 uppercase">Değiştir</button>
      </SettingItem>

      <SettingItem
        icon={Bell}
        title="Bildirimler"
        description="Acil durum uyarıları ve hatırlatıcılar."
      >
        <button
          onClick={() => setNotifications(!notifications)}
          className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-green-600' : 'bg-gray-700'}`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? 'left-7' : 'left-1'}`} />
        </button>
      </SettingItem>

      <SettingItem
        icon={Database}
        title="Çevrimdışı Veri"
        description="Harita ve rehber verilerini yönet."
      >
        <button className="text-xs font-bold text-gray-400 uppercase">Güncelle</button>
      </SettingItem>

      <SettingItem
        icon={Shield}
        title="Güvenlik & Gizlilik"
        description="Veri şifreleme ve izinler."
      >
        <button className="text-xs font-bold text-gray-400 uppercase">İncele</button>
      </SettingItem>

      <div className="mt-8 p-6 bg-gray-900/50 rounded-3xl border border-gray-800 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Uygulama Bilgisi</p>
        <p className="text-sm font-bold text-gray-300">QuakeSafe Offline v1.0.0</p>
        <p className="text-[10px] text-gray-600 mt-1">Bu uygulama afet anında hayat kurtarmak için tasarlanmıştır. Verileriniz cihazınızda güvenle saklanır.</p>
      </div>
    </div>
  );
};

export default Settings;
