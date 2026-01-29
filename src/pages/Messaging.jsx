import React, { useState } from 'react';
import { MessageSquare, Wifi, Bluetooth, Share2, Send, ShieldAlert } from 'lucide-react';

const Messaging = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Siz", text: "Herkes iyi mi?", time: "12:00" },
    { id: 2, sender: "Komşu", text: "Biz iyiyiz, bahçedeyiz.", time: "12:02" }
  ]);
  const [input, setInput] = useState('');

  const sendBroadcast = () => {
    if (!input) return;
    const newMsg = { id: Date.now(), sender: "Siz", text: input, time: "Şimdi" };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <div className="pb-20 flex flex-col h-[calc(100vh-120px)]">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-blue-500">YEREL MESAJLAŞMA</h1>

      <div className="bg-orange-900/30 border border-orange-500/50 p-4 rounded-xl mb-6 flex gap-3 items-center">
        <Wifi className="text-orange-500 shrink-0" size={24} />
        <p className="text-xs text-orange-200 leading-tight">
          İnternet yokken Bluetooth veya Yerel Wi-Fi üzerinden yakındaki cihazlarla iletişim kurmaya çalışır.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'Siz' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 rounded-2xl max-w-[80%] ${
              msg.sender === 'Siz' ? 'bg-blue-600' : 'bg-gray-800'
            }`}>
              <p className="text-[10px] uppercase font-bold opacity-60 mb-1">{msg.sender}</p>
              <p className="text-lg leading-snug">{msg.text}</p>
              <p className="text-[10px] text-right mt-1 opacity-40">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
            <button className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-xs font-bold text-gray-400">
                GÜVENDEYİM ŞABLONU
            </button>
            <button className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-full text-xs font-bold text-gray-400">
                YARDIM LAZIM!
            </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesaj yazın..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendBroadcast}
            className="bg-blue-600 p-3 rounded-xl"
          >
            <Share2 size={24} />
          </button>
        </div>
        <p className="text-[10px] text-center text-gray-600 uppercase tracking-widest">Yakındaki cihazlar taranıyor...</p>
      </div>
    </div>
  );
};

export default Messaging;
