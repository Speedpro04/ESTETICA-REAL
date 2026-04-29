
import React, { useState, useRef, useEffect } from 'react';
import { Sun, X, Send, RotateCcw, Sparkles } from 'lucide-react';
import { useSolaraStore } from '../store';
import { askSolara } from '../geminiService';
import toast from 'react-hot-toast';

interface SolaraAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  context?: any;
}

const SolaraAssistant: React.FC<SolaraAssistantProps> = ({ isOpen, onClose, context }) => {
  const { currentUser } = useSolaraStore();
  
  const userName = currentUser?.name || 'Administrador';

  const initialContent = `Olá, sou Solara, sua assistente Inteligente. Como posso ajudar com a gestão da clínica hoje?`;

  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>(() => {
    const saved = sessionStorage.getItem('solara-balanced-chat-v2');
    return saved ? JSON.parse(saved) : [{ role: 'model', text: initialContent }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (messages.length > 20) {
      setMessages(prev => prev.slice(-20));
    }
    sessionStorage.setItem('solara-balanced-chat-v2', JSON.stringify(messages));
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    console.log("SolaraAssistant: Sending message:", userMsg);
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      console.log("SolaraAssistant: Calling askSolara...");
      const responseText = await askSolara(userMsg, messages, context);
      console.log("SolaraAssistant: Received response:", responseText.substring(0, 30) + "...");
      setMessages(prev => [...prev, { role: 'model' as const, text: responseText }]);
    } catch(err: any) {
      console.error("SolaraAssistant: Error in handleSend:", err);
      toast.error("Erro na comunicação com a IA.");
      setMessages(prev => [...prev, { role: 'model' as const, text: `Desculpe ${userName}, ocorreu um erro de conexão: ${err.message || 'Erro desconhecido'}.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'model', text: initialContent }]);
    sessionStorage.removeItem('solara-balanced-chat-v2');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[420px] h-[650px] bg-white shadow-2xl rounded-[13px] overflow-hidden z-[10000] flex flex-col animate-in zoom-in-95 duration-300 border border-white/20 font-inter shadow-[0_20px_60px_-15px_rgba(10,61,98,0.4)]">
      {/* Header */}
      <div className="p-8 bg-[#0a3d62] text-white flex justify-between items-center border-b border-white/5 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <img src="/sol_com_risco_em_baixo-removebg-preview.png" alt="Solara Logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          <div>
            <h3 className="font-bold text-[15px] leading-none tracking-tighter uppercase italic">Solara AI</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7ed6df]">Inteligência Neural Ativa</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button onClick={resetChat} title="Reiniciar sessão" className="p-2.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-orange-400 transition-all">
            <RotateCcw size={18} />
          </button>
          <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/30 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[88%] p-6 rounded-[13px] text-[13px] leading-relaxed shadow-sm whitespace-pre-wrap transition-all ${
              m.role === 'user' 
                ? 'bg-[#0a3d62] text-white rounded-tr-none border border-white/10 font-medium' 
                : 'bg-slate-50 text-[#2f3640] rounded-tl-none border border-black/5 font-medium opacity-90'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in">
            <div className="bg-white p-5 rounded-[13px] rounded-tl-none border border-black/5 shadow-sm flex items-center gap-4">
              <div className="relative w-5 h-5">
                <div className="absolute inset-0 border-2 border-slate-100 rounded-full"></div>
                <div className="absolute inset-0 border-2 border-[#FF9500] rounded-full border-t-transparent animate-spin"></div>
              </div>
              <span className="text-xs font-bold text-[#2f3640] uppercase tracking-widest">Sincronizando com a clínica...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-8 bg-white border-t border-slate-100">
        <div className="relative flex items-center bg-slate-50 border border-black/5 rounded-[13px] overflow-hidden focus-within:border-[#0a3d62] focus-within:bg-white transition-all">
          <input 
            type="text"
            className="w-full pl-6 pr-14 py-6 bg-transparent outline-none text-[13px] font-medium text-[#2f3640] placeholder:text-slate-300"
            placeholder="Comando para Solara IA..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 w-12 h-12 bg-[#0a3d62] text-white rounded-[13px] flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 shadow-xl shadow-blue-900/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolaraAssistant;
