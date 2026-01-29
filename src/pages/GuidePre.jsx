import React, { useState } from 'react';
import { ShieldCheck, Package, MapPin, Users, CheckCircle2, Circle } from 'lucide-react';
import GuideTabs from '../components/GuideTabs';

const ChecklistItem = ({ item }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div
      onClick={() => setChecked(!checked)}
      className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 cursor-pointer active:bg-gray-800 transition-colors"
    >
      {checked ? <CheckCircle2 className="text-green-500" size={28} /> : <Circle className="text-gray-600" size={28} />}
      <span className={`text-lg ${checked ? 'line-through text-gray-500' : 'text-white'}`}>{item}</span>
    </div>
  );
};

const Section = ({ title, icon: Icon, items }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-4 text-blue-400">
      <Icon size={24} />
      <h2 className="text-xl font-bold uppercase tracking-tight">{title}</h2>
    </div>
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <ChecklistItem key={idx} item={item} />
      ))}
    </div>
  </div>
);

const GuidePre = () => {
  return (
    <div className="pb-20">
      <GuideTabs />
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2">DEPREM ÖNCESİ</h1>

      <Section
        title="Afet Çantası"
        icon={Package}
        items={[
          "Su (kişi başı günlük 4 litre)",
          "Yüksek kalorili gıda / Konserve",
          "İlk yardım çantası",
          "Pilli radyo ve yedek piller",
          "Fener ve yedek piller",
          "Kişisel ilaçlar",
          "Önemli evrak fotokopileri",
          "Bir miktar nakit para",
          "Mevsimlik giysi ve battaniye"
        ]}
      />

      <Section
        title="Ev Güvenliği"
        icon={ShieldCheck}
        items={[
          "Büyük dolapları duvara sabitle",
          "Ağır tabloları yataktan uzaklaştır",
          "Beyaz eşyaları sabitle",
          "Zehirli/parlayıcı maddeleri güvenli sakla",
          "Tesisat vanalarını yerini öğren"
        ]}
      />

      <Section
        title="Aile Planı"
        icon={Users}
        items={[
          "Buluşma noktasını belirle",
          "Şehir dışı bağlantı kişisi seç",
          "Tahliye provası yap",
          "Evcil hayvan planı yap"
        ]}
      />
    </div>
  );
};

export default GuidePre;
