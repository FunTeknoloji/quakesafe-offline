import React, { useState } from 'react';
import { Users, UserPlus, Heart, MessageSquare, Shield, Phone } from 'lucide-react';

const Family = () => {
  const [members, setMembers] = useState([
    { id: 1, name: "Annem", status: "Bilinmiyor", lastSeen: "2 saat önce" },
    { id: 2, name: "Babam", status: "Güvendeyim", lastSeen: "10 dk önce" },
    { id: 3, name: "Kardeşim", status: "Bilinmiyor", lastSeen: "Dün" },
  ]);

  const [isSafe, setIsSafe] = useState(false);

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-indigo-500">AİLE GRUBU</h1>

      <div className="bg-indigo-600 rounded-3xl p-6 mb-8 flex flex-col items-center gap-4 shadow-lg shadow-indigo-900/20">
        <h2 className="text-xl font-bold uppercase tracking-tight">Kendi Durumun</h2>
        <button
          onClick={() => setIsSafe(!isSafe)}
          className={`w-full py-4 rounded-2xl font-black text-2xl transition-all ${
            isSafe ? 'bg-white text-indigo-600' : 'bg-indigo-900 text-white border border-indigo-400'
          }`}
        >
          {isSafe ? 'GÜVENDEYİM' : 'GÜVENDEYİM BUTONU'}
        </button>
        <p className="text-xs text-indigo-200 uppercase text-center">
          Bu duruma internet geldiğinde otomatik paylaşılacaktır.
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Heart size={20} className="text-rose-500" /> Üyeler
        </h2>
        <button className="text-sm font-bold bg-gray-900 px-3 py-1 rounded-full border border-gray-800 flex items-center gap-1">
          <UserPlus size={16} /> EKLE
        </button>
      </div>

      <div className="space-y-4">
        {members.map(member => (
          <div key={member.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-900/40 rounded-full flex items-center justify-center text-indigo-400 font-bold text-xl">
                {member.name[0]}
              </div>
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-xs text-gray-500 uppercase">{member.lastSeen}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                 member.status === 'Güvendeyim' ? 'bg-green-900 text-green-400' : 'bg-gray-800 text-gray-400'
               }`}>
                 {member.status}
               </span>
               <button className="p-2 bg-gray-800 rounded-lg text-gray-400">
                 <Phone size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        <button className="flex-1 bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center gap-2">
          <MessageSquare className="text-blue-400" />
          <span className="text-xs font-bold uppercase">Çevrimdışı Mesaj</span>
        </button>
        <button className="flex-1 bg-gray-900 border border-gray-800 p-4 rounded-2xl flex flex-col items-center gap-2">
          <Shield className="text-orange-400" />
          <span className="text-xs font-bold uppercase">Konum Geçmişi</span>
        </button>
      </div>
    </div>
  );
};

export default Family;
