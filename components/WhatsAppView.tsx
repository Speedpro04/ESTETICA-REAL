
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  MoreVertical, 
  Trash2, 
  UserPlus, 
  Wifi, 
  WifiOff, 
  Settings2, 
  ExternalLink,
  PlusCircle,
  Clock,
  CheckCheck
} from 'lucide-react';

const WhatsAppView: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Mock de instâncias e conversas
  const instance = {
    name: "Clínica Geral - Matriz",
    id: "inst_001",
    status: isConnected ? "connected" : "disconnected",
    whatsapp: isConnected ? "+55 (11) 99999-9999" : "--",
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-700 font-inter">
      {/* Header do Módulo */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-4xl font-light text-[#0a3d62] tracking-tighter uppercase leading-none italic">WhatsApp da Clínica</h2>
          <p className="text-[#2f3640] font-black mt-3 text-[10px] uppercase tracking-[0.3em] opacity-90">Central de Comunicação Inteligente</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2.5 px-6 py-3 bg-white/50 border border-[#0a3d62]/10 rounded-[13px] text-[10px] font-bold uppercase tracking-widest text-[#0a3d62] hover:bg-white transition-all shadow-sm">
            <Trash2 size={16} /> Limpar conversa
          </button>
          <button className="flex items-center gap-2.5 px-6 py-3 bg-[#0a3d62] border border-[#0a3d62]/10 rounded-[13px] text-[10px] font-bold uppercase tracking-widest text-white hover:brightness-110 transition-all shadow-lg shadow-[#0a3d62]/20">
            <UserPlus size={16} /> Assumir humano
          </button>
        </div>
      </div>

      {/* Seletor de Instância / Status */}
      <div className="bg-white/40 backdrop-blur-md rounded-[13px] p-4 border border-white/50 shadow-xl mb-8">
        <div className="bg-white/80 rounded-[13px] p-5 border border-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-14 h-14 rounded-[13px] flex items-center justify-center border-2 ${isConnected ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest mb-1.5">Clínica / Instância</p>
              <h3 className="text-xl font-light text-[#0a3d62] tracking-tight">
                {isConnected ? instance.name : "Nenhuma conexão cadastrada"}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-slate-300'}`}></div>
                <span className={`text-xs font-bold uppercase tracking-widest ${isConnected ? 'text-green-600' : 'text-slate-400'}`}>
                  {isConnected ? 'Ativo' : 'Offline'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsConnected(!isConnected)}
              className="px-6 py-3 bg-[#ff7675] text-white rounded-[13px] text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-[#ff7675]/20"
            >
              {isConnected ? 'Desconectar' : 'Configurar Instância'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Conversas e Chat */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        
        {/* Coluna Esquerda: Lista de Conversas */}
        <div className="lg:col-span-4 flex flex-col bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-xl overflow-hidden min-h-0">
          <div className="p-6 border-b border-black/5 bg-white/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <h4 className="text-sm font-bold text-[#0a3d62] uppercase tracking-[0.15em]">Conversas</h4>
               <span className="bg-[#0a3d62]/10 text-[#0a3d62] text-[10px] font-bold px-2 py-0.5 rounded-full">0</span>
            </div>
            <PlusCircle size={20} className="text-[#0a3d62]/40 hover:text-[#0a3d62] cursor-pointer transition-colors" />
          </div>
          
          <div className="p-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0a3d62] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Buscar conversa..."
                className="w-full bg-white/60 border border-black/5 rounded-[13px] py-3 pl-12 pr-4 text-xs font-light text-[#0a3d62] outline-none focus:bg-white focus:border-[#0a3d62]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center opacity-40">
             <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
               <MessageSquare size={32} className="text-slate-300" />
             </div>
             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-[180px] leading-relaxed">
               Nenhuma conversa ainda para esta instância.
             </p>
          </div>
        </div>

        {/* Coluna Direita: Detalhamento / Chat */}
        <div className="lg:col-span-8 flex flex-col min-h-0">
          {/* Header da conversa selecionada */}
          <div className="bg-white/40 backdrop-blur-md rounded-[13px] p-6 border border-white/50 shadow-xl mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-slate-100 rounded-[13px] flex items-center justify-center border-2 border-white shadow-sm overflow-hidden text-slate-300">
                  <span className="text-xl font-bold">C</span>
                </div>
                <div>
                  <h3 className="text-xl font-light text-[#0a3d62] tracking-tight italic">Nenhum cliente selecionado</h3>
                  <p className="text-[11px] font-black text-[#2f3640] uppercase tracking-widest">Sem número vinculado</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-[1px] bg-[#0a3d62]/10"></div>
                <div className="flex flex-col items-end">
                   <p className="text-[9px] font-black text-[#2f3640] uppercase tracking-widest">Instância</p>
                   <p className="text-xs font-bold text-[#0a3d62]">--</p>
                </div>
                <div className="h-10 w-[1px] bg-[#0a3d62]/10"></div>
                <div className="flex flex-col items-end">
                   <p className="text-[9px] font-black text-[#2f3640] uppercase tracking-widest">WhatsApp</p>
                   <p className="text-xs font-bold text-[#0a3d62]">--</p>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Chat (Placeholder) */}
          <div className="flex-1 bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
            
            <div className="flex-1 flex flex-col items-center justify-center opacity-30 text-center px-10">
               <div className="w-32 h-32 bg-slate-200/50 rounded-full flex items-center justify-center mb-8 border border-white/20">
                 <WifiOff size={48} className="text-slate-400" />
               </div>
               <h4 className="text-2xl font-light text-[#0a3d62] uppercase tracking-tighter mb-4 italic leading-none">Nenhuma conversa ativa</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] max-w-[280px] leading-loose">
                 Conecte sua instância da Evolution API para visualizar e interagir com seus pacientes em tempo real.
               </p>
            </div>

            {/* Input Fake */}
            <div className="p-8 border-t border-white/40 bg-white/20 backdrop-blur-xl">
               <div className="w-full h-16 bg-white/60 border border-white rounded-[13px] flex items-center px-8 text-slate-300 italic text-sm shadow-inner group-hover:bg-white transition-all cursor-not-allowed">
                  Aguardando conexão...
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppView;
