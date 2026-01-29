import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Users, Send, ShieldAlert, WifiOff, Radio, User, Bluetooth } from 'lucide-react';
import { storage } from '../utils/storage';

const Messaging = () => {
  const [activeTab, setActiveTab] = useState('global'); // 'global' or 'family'
  const [globalMessages, setGlobalMessages] = useState(storage.get('global_chat', []));
  const [familyMessages, setFamilyMessages] = useState(storage.get('family_chat', []));
  const [input, setInput] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const scrollRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    // Simulated Mesh Network using BroadcastChannel
    channelRef.current = new BroadcastChannel('quakesafe_mesh');
    channelRef.current.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'MSG_GLOBAL') {
        setGlobalMessages(prev => [...prev, payload]);
      } else if (type === 'MSG_FAMILY') {
        setFamilyMessages(prev => [...prev, payload]);
      }
    };
    return () => channelRef.current.close();
  }, []);

  useEffect(() => {
    storage.set('global_chat', globalMessages);
  }, [globalMessages]);

  useEffect(() => {
    storage.set('family_chat', familyMessages);
  }, [familyMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [globalMessages, familyMessages, activeTab]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'Siz',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Sent'
    };

    const broadcastMsg = { ...newMsg, sender: 'Yakındaki Kullanıcı' };

    if (activeTab === 'global') {
      setGlobalMessages([...globalMessages, newMsg]);
      channelRef.current.postMessage({ type: 'MSG_GLOBAL', payload: broadcastMsg });
    } else {
      setFamilyMessages([...familyMessages, newMsg]);
      channelRef.current.postMessage({ type: 'MSG_FAMILY', payload: broadcastMsg });
    }
    setInput('');
  };

  const currentMessages = activeTab === 'global' ? globalMessages : familyMessages;

  return (
    <div className="pb-2 flex flex-col h-[calc(100vh-140px)]">
      <h1 className="text-3xl font-black mb-4 uppercase italic tracking-tighter">Mesajlaşma</h1>

      <div className="flex bg-gray-900 p-1 rounded-2xl mb-4">
        <button
          onClick={() => setActiveTab('global')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'global' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500'
          }`}
        >
          <Radio size={14} /> GENEL (YAKINDAKİLER)
        </button>
        <button
          onClick={() => setActiveTab('family')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'family' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500'
          }`}
        >
          <Users size={14} /> AİLE GRUBU
        </button>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 p-3 rounded-2xl mb-4 flex items-center gap-3">
        <WifiOff className="text-blue-500 shrink-0" size={20} />
        <p className="text-[10px] text-blue-200 font-bold leading-tight uppercase tracking-tighter">
          Şebekesiz Bluetooth & Wi-Fi Direct Mesh Modu Aktif. Yakındaki cihazlar otomatik bağlanır.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scroll-smooth"
      >
        {currentMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
            <Radio size={48} className="mb-4 animate-pulse" />
            <p className="text-sm font-bold uppercase">Mesaj bulunamadı.</p>
            <p className="text-[10px] mt-1">Yayın yaparak yakındakilere sesini duyur.</p>
          </div>
        ) : (
          currentMessages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'Siz' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-3xl max-w-[85%] shadow-xl ${
                msg.sender === 'Siz' ? 'bg-blue-600 rounded-tr-none' : 'bg-gray-800 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                    <User size={10} className="opacity-60" />
                    <p className="text-[10px] uppercase font-black opacity-60">{msg.sender}</p>
                </div>
                <p className="text-lg leading-tight font-medium">{msg.text}</p>
                <div className="flex justify-end gap-1 mt-1 opacity-40">
                    <p className="text-[9px] font-bold">{msg.time}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 placeholder:text-gray-600 font-medium"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 p-5 rounded-2xl shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
          >
            <Send size={24} />
          </button>
        </div>

        <div className="flex justify-around text-[9px] font-black text-gray-700 uppercase tracking-widest pb-2">
            <span className="flex items-center gap-1"><Bluetooth size={10} /> Bluetooth</span>
            <span className="flex items-center gap-1 text-green-800"><Wifi size={10} /> Wi-Fi Direct</span>
            <span className="flex items-center gap-1"><Radio size={10} /> Hotspot Mesh</span>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
