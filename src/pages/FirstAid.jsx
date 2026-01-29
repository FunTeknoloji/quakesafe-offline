import { useState } from 'react';
import { Droplets, Bone, Activity, Flame, Baby, ChevronRight, ChevronDown } from 'lucide-react';
import GuideTabs from '../components/GuideTabs';

const AidCategory = ({ title, icon: Icon, steps }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 border border-gray-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-900 active:bg-gray-800 transition-colors"
      >
        <div className="flex items-center gap-4 text-rose-400">
          <Icon size={32} />
          <span className="text-xl font-bold uppercase tracking-tight">{title}</span>
        </div>
        {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
      </button>
      {isOpen && (
        <div className="p-6 bg-black border-t border-gray-800">
          <ul className="space-y-4">
            {steps.map((step, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <span className="bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                  {idx + 1}
                </span>
                <span className="text-lg text-gray-200">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const FirstAid = () => {
  return (
    <div className="pb-20">
      <GuideTabs />
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-rose-500">İLK YARDIM</h1>

      <AidCategory
        title="Kanama Durdurma"
        icon={Droplets}
        steps={[
          "Yaraya temiz bir bezle doğrudan baskı uygulayın.",
          "Kanama durmazsa bez sayısını artırın (eskisini çekmeyin).",
          "Yaralı bölgeyi kalp seviyesinin üzerinde tutmaya çalışın.",
          "Şok riskine karşı hastayı sıcak tutun."
        ]}
      />

      <AidCategory
        title="Kırık ve Çıkık"
        icon={Bone}
        steps={[
          "Kırık olduğundan şüphelenilen bölgeyi asla hareket ettirmeyin.",
          "Bölgeyi sabit tutun (atel kullanabiliyorsanız kullanın).",
          "Açık kırık varsa yarayı temiz bir bezle kapatın.",
          "Şişliği azaltmak için (eğer deri bütünlüğü bozulmamışsa) soğuk uygulama yapın."
        ]}
      />

      <AidCategory
        title="Bilinç Kaybı"
        icon={Activity}
        steps={[
          "Hastanın solunumunu kontrol edin (Bak-Dinle-Hisset).",
          "Solunumu varsa Koma Pozisyonu (Yan yatış) verin.",
          "Solunumu yoksa temel yaşam desteğine başlayın (eğitimliyseniz).",
          "Dilin geriye kaçmasını önlemek için başı hafifçe geriye itin."
        ]}
      />

      <AidCategory
        title="Yanıklar"
        icon={Flame}
        steps={[
          "Yanık bölgeyi en az 20 dakika soğuk (buzlu değil) su altında tutun.",
          "Yanan bölgedeki takı ve giysileri (yapışmamışsa) çıkarın.",
          "Oluşan su kabarcıklarını asla patlatmayın.",
          "Yanık üzerine krem, diş macunu veya yağ sürmeyin."
        ]}
      />

      <AidCategory
        title="Bebek / Çocuk"
        icon={Baby}
        steps={[
          "Bebeklerde nefes borusu tıkanıklığında sırt vuruşu yapın.",
          "Hafif sarsıntılarda bebeği korumak için vücudunuza sabitleyin.",
          "Çocuklara yetişkinlerden daha nazik müdahale edin.",
          "Korkusunu azaltmak için göz teması kurun."
        ]}
      />
    </div>
  );
};

export default FirstAid;
