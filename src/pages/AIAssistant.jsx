import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Merhaba, ben QuakeSafe Çevrimdışı Asistanıyım. Panik yapmayın. Size nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');

  const quickPrompts = [
    "Şu an deprem oluyor!",
    "Enkaz altındayım, ne yapmalıyım?",
    "Kanama nasıl durdurulur?",
    "Toplanma alanı neresi?"
  ];

  const knowledgeBase = {
    "Şu an deprem oluyor!": "Sakin olun. Hemen ÇÖK-KAPAN-TUTUN pozisyonunu alın. Pencerelerden, merdivenlerden ve asansörlerden uzak durun. Sarsıntı bitene kadar yerinizden ayrılmayın.",
    "Enkaz altındayım, ne yapmalıyım?": "Enerjinizi tasarruflu kullanın. Bağırmak yerine ıslık çalın veya sert bir cisme vurun (boru vb.). Ağzınızı ve burnunuzu bir bezle kapatın. Dışarıdan ses geldiğinde cevap verin.",
    "Kanama nasıl durdurulur?": "Yaranın üzerine temiz bir bezle bastırın. Kanama durmuyorsa bastırmaya devam edin ve yarayı kalp seviyesinden yukarıda tutun. 'İlk Yardım' sayfamıza bakabilirsiniz.",
    "Toplanma alanı neresi?": "Size en yakın toplanma alanını 'Toplanma Alanları' sayfamızdan görebilirsiniz. Genellikle parklar ve spor alanları toplanma alanı olarak belirlenir."
  };

  const handleSend = (text) => {
    if (!text) return;
    const userMsg = { role: 'user', text };
    const responseText = knowledgeBase[text] || "Bu konuda şu an çevrimdışı bilgim sınırlı. Lütfen ana menüdeki rehberleri inceleyin veya acil durum butonlarını kullanın.";
    const aiMsg = { role: 'ai', text: responseText };
    setMessages([...messages, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="pb-20 flex flex-col h-[calc(100vh-120px)]">
      <h1 className="text-3xl font-black mb-6 border-b border-gray-800 pb-2 text-cyan-500">ASİSTAN</h1>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
              msg.role === 'user' ? 'bg-cyan-900 text-white' : 'bg-gray-900 text-gray-200 border border-gray-800'
            }`}>
              {msg.role === 'ai' && <Bot className="shrink-0 text-cyan-500" size={20} />}
              <p className="text-lg leading-snug">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs bg-gray-900 border border-gray-800 px-3 py-2 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="Bir soru sorun..."
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSend(input)}
            className="bg-cyan-600 p-3 rounded-xl"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
