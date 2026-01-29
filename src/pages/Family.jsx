import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Heart, Shield, Phone, QrCode, LogOut, PlusCircle, Trash2 } from 'lucide-react';
import { storage } from '../utils/storage';

const Family = () => {
  const [familyData, setFamilyData] = useState(storage.get('family_group', {
    name: '',
    code: '',
    members: []
  }));
  const [isSafe, setIsSafe] = useState(storage.get('my_safe_status', false));
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [newMemberName, setNewMemberName] = useState('');

  useEffect(() => {
    storage.set('family_group', familyData);
  }, [familyData]);

  useEffect(() => {
    storage.set('my_safe_status', isSafe);
  }, [isSafe]);

  const createGroup = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFamilyData({
      name: 'Ailem',
      code: code,
      members: [{ name: 'Siz', status: isSafe ? 'Güvendeyim' : 'Bilinmiyor', isMe: true }]
    });
  };

  const addMember = () => {
    if (!newMemberName.trim()) return;
    const newMember = {
      name: newMemberName,
      status: 'Bilinmiyor',
      lastSeen: 'Şimdi eklendi'
    };
    setFamilyData({
      ...familyData,
      members: [...familyData.members, newMember]
    });
    setNewMemberName('');
  };

  const removeMember = (index) => {
    const newMembers = familyData.members.filter((_, i) => i !== index);
    setFamilyData({ ...familyData, members: newMembers });
  };

  const toggleMyStatus = () => {
    const newStatus = !isSafe;
    setIsSafe(newStatus);
    if (familyData.code) {
      const newMembers = familyData.members.map(m =>
        m.isMe ? { ...m, status: newStatus ? 'Güvendeyim' : 'Bilinmiyor' } : m
      );
      setFamilyData({ ...familyData, members: newMembers });
    }
  };

  if (!familyData.code) {
    return (
      <div className="h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-indigo-900/20 p-8 rounded-full mb-8">
            <Users size={80} className="text-indigo-500" />
        </div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Aile Grubu Yok</h2>
        <p className="text-gray-500 text-sm mb-8">Henüz bir aile grubu kurmadınız veya bir gruba katılmadınız.</p>

        <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
                onClick={createGroup}
                className="bg-indigo-600 p-5 rounded-2xl font-black uppercase italic tracking-tighter text-xl shadow-xl shadow-indigo-900/30 active:scale-95 transition-transform"
            >
                Grup Oluştur
            </button>
            <button
                onClick={() => setShowJoinModal(true)}
                className="bg-gray-900 border border-gray-800 p-5 rounded-2xl font-black uppercase italic tracking-tighter text-xl active:scale-95 transition-transform"
            >
                Gruba Katıl
            </button>
        </div>

        {showJoinModal && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
                <div className="bg-gray-900 border border-gray-800 w-full rounded-[2.5rem] p-8">
                    <h3 className="text-2xl font-black uppercase italic mb-4">Gruba Katıl</h3>
                    <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        placeholder="Grup Kodunu Girin"
                        className="w-full bg-black border border-gray-800 rounded-2xl p-4 text-white text-center text-2xl font-black tracking-widest focus:border-indigo-500 outline-none mb-6"
                    />
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowJoinModal(false)}
                            className="flex-1 p-4 bg-gray-800 rounded-xl font-bold"
                        >
                            İPTAL
                        </button>
                        <button
                            onClick={() => {
                                // Mock join
                                setFamilyData({
                                    name: 'Katıldığım Grup',
                                    code: joinCode,
                                    members: [
                                        { name: 'Grup Lideri', status: 'Güvendeyim' },
                                        { name: 'Siz', status: isSafe ? 'Güvendeyim' : 'Bilinmiyor', isMe: true }
                                    ]
                                });
                                setShowJoinModal(false);
                            }}
                            className="flex-1 p-4 bg-indigo-600 rounded-xl font-bold shadow-lg shadow-indigo-900/40"
                        >
                            KATIL
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-indigo-500">AİLE GRUBU</h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Grup Kodu: <span className="text-white">{familyData.code}</span></p>
          </div>
          <button
            onClick={() => setFamilyData({ name: '', code: '', members: [] })}
            className="p-3 bg-red-900/20 text-red-500 rounded-2xl"
          >
            <LogOut size={20} />
          </button>
      </div>

      <div className="bg-indigo-600 rounded-[2rem] p-6 mb-8 shadow-2xl shadow-indigo-900/40 border border-indigo-400/20">
        <h2 className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Senin Durumun</h2>
        <button
          onClick={toggleMyStatus}
          className={`w-full py-6 rounded-2xl font-black text-3xl transition-all shadow-inner ${
            isSafe ? 'bg-white text-indigo-600' : 'bg-indigo-950 text-white border border-indigo-400'
          }`}
        >
          {isSafe ? 'GÜVENDEYİM' : 'GÜVENDEYİM BUTONU'}
        </button>
        <p className="text-[10px] text-indigo-200 uppercase text-center mt-4 font-bold tracking-widest animate-pulse">
            Durumun yakındaki tüm cihazlara yayınlanıyor...
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
            <h3 className="font-black uppercase italic text-lg flex items-center gap-2">
                <Heart size={20} className="text-rose-500" /> Üyeler ({familyData.members.length})
            </h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="İsim"
                    className="bg-gray-900 border border-gray-800 rounded-xl px-3 py-1 text-xs w-24 focus:outline-none focus:border-indigo-500"
                />
                <button onClick={addMember} className="text-indigo-500 p-1">
                    <PlusCircle size={24} />
                </button>
            </div>
        </div>

        {familyData.members.map((member, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-3xl p-5 flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-900/40 rounded-2xl flex items-center justify-center text-indigo-400 font-black text-xl border border-indigo-500/20">
                {member.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-none">{member.name} {member.isMe && '(Sen)'}</h3>
                <p className="text-[10px] text-gray-500 uppercase font-black mt-1 tracking-tighter">{member.lastSeen || 'Bilgi Bekleniyor...'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
               <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg ${
                 member.status === 'Güvendeyim' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-500'
               }`}>
                 {member.status}
               </span>
               {!member.isMe && (
                   <button onClick={() => removeMember(idx)} className="text-red-900/40 group-hover:text-red-500 transition-colors">
                       <Trash2 size={18} />
                   </button>
               )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
          <button className="bg-gray-900 border border-gray-800 p-4 rounded-3xl flex flex-col items-center gap-2 active:bg-indigo-900/20 transition-colors">
            <QrCode className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Kodu Paylaş</span>
          </button>
          <button className="bg-gray-900 border border-gray-800 p-4 rounded-3xl flex flex-col items-center gap-2 active:bg-rose-900/20 transition-colors">
            <Shield className="text-rose-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Konum İste</span>
          </button>
      </div>
    </div>
  );
};

export default Family;
