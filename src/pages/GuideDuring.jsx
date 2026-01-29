
import { Home, TreePine, Car, XCircle } from 'lucide-react';
import GuideTabs from '../components/GuideTabs';

const Scenario = ({ title, icon: Icon, steps, color }) => (
  <div className="mb-8 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
    <div className={`flex items-center gap-3 mb-4 ${color}`}>
      <Icon size={32} />
      <h2 className="text-2xl font-bold uppercase tracking-tight">{title}</h2>
    </div>
    <ul className="space-y-4">
      {steps.map((step, idx) => (
        <li key={idx} className="flex gap-4 items-start">
          <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold mt-1">
            {idx + 1}
          </span>
          <span className="text-lg leading-snug">{step}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GuideDuring = () => {
  return (
    <div className="pb-20">
      <GuideTabs />
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-orange-500">DEPREM ANI</h1>

      <div className="bg-orange-600 p-6 rounded-3xl mb-8 flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl font-black uppercase italic">Çök - Kapan - Tutun</h2>
        <div className="flex gap-4">
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">ÇÖK</div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">KAPAN</div>
          <div className="bg-white/20 p-4 rounded-xl backdrop-blur-md">TUTUN</div>
        </div>
        <p className="font-bold">Güvenli bir yerde sarsıntı geçene kadar bekleyin.</p>
      </div>

      <Scenario
        title="İçerideyseniz"
        icon={Home}
        color="text-blue-400"
        steps={[
          "Eşya devrilmeyecek bir yere çökün.",
          "Başınızı ve ensenizi kollarınızla koruyun.",
          "Sağlam bir masa altına girip tutunun.",
          "Pencerelerden ve camlı bölmelerden uzak durun."
        ]}
      />

      <Scenario
        title="Dışarıdaysanız"
        icon={TreePine}
        color="text-green-400"
        steps={[
          "Binalardan, enerji hatlarından ve direklerden uzak durun.",
          "Açık bir alana gidin.",
          "Yamaç altlarında durmayın (heyelan riski)."
        ]}
      />

      <Scenario
        title="Araçtaysanız"
        icon={Car}
        color="text-yellow-400"
        steps={[
          "Aracı güvenli bir yerde sağa çekin ve durun.",
          "Kontak anahtarını üzerinde bırakın.",
          "Bina altlarından, köprülerden ve enerji hatlarından uzak durun.",
          "Sarsıntı bitene kadar araç içinde bekleyin."
        ]}
      />

      <div className="bg-red-900/30 border border-red-500/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <XCircle size={24} /> YAPILMAMASI GEREKENLER
        </h2>
        <ul className="space-y-2 text-red-200 font-medium">
          <li>• Asansöre asla binmeyin.</li>
          <li>• Merdivenlere koşmayın.</li>
          <li>• Balkonlara çıkmayın veya aşağı atlamayın.</li>
          <li>• Kibrit veya çakmak kullanmayın (gaz sızıntısı!).</li>
        </ul>
      </div>
    </div>
  );
};

export default GuideDuring;
