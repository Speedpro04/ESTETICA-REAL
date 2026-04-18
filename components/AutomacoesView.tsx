
import React, { useState } from 'react';
import { 
  Zap, 
  MessageSquare, 
  Settings2, 
  ToggleRight as Toggle,
  ToggleLeft as ToggleOff,
  Bell,
  Calendar,
  Gift,
  Clock,
  ExternalLink,
  PlusCircle,
  MoreVertical,
  Search,
  CheckCircle2,
  Trash2
} from 'lucide-react';

const AutomacoesView: React.FC = () => {
  const [automations, setAutomations] = useState([
    { id: '1', name: 'Lembrete 24h Padrão', type: 'Agendamento', active: true, icon: Calendar, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { id: '2', name: 'Aniversário Especial', type: 'Fidelidade', active: true, icon: Gift, color: 'bg-[#ff7675]/10 text-[#ff7675] border-[#ff7675]/20' },
    { id: '3', name: 'Recuperação 6+ Meses', type: 'Retenção', active: false, icon: Zap, color: 'bg-amber-500/10 text-amber-600 border-amber-500/20' },
    { id: '4', name: 'Pós-Consulta (Review)', type: 'NPS', active: true, icon: MessageSquare, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  ]);

  const toggleStatus = (id: string) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-light text-[#0a3d62] tracking-tighter uppercase leading-none italic">Automações Solara</h2>
          <p className="text-[#2f3640] font-black mt-3 text-[10px] uppercase tracking-[0.3em] opacity-90">Régua de Comunicação Inteligente</p>
        </div>
        <button className="bg-[#0a3d62] text-white px-8 py-3.5 rounded-[13px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-[#0a3d62]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
          <PlusCircle size={18} /> Nova Automação
        </button>
      </div>

      {/* Cards de Status de Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-[13px] bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20 shadow-sm shadow-emerald-500/10">
               <Zap size={32} />
            </div>
            <div>
               <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest leading-none mb-2">Motor de Disparo</p>
               <h3 className="text-xl font-light text-[#0a3d62]">Conectado</h3>
               <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Live</span>
               </div>
            </div>
         </div>

         <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-[13px] bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20 shadow-sm shadow-blue-500/10">
               <Bell size={32} />
            </div>
            <div>
               <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest leading-none mb-2">Mensagens Hoje</p>
               <h3 className="text-xl font-light text-[#0a3d62]">142 Envios</h3>
               <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#0a3d62] opacity-40">Taxa de Sucesso: 98.4%</span>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-[#0a3d62] to-[#0c4f7d] p-8 rounded-[13px] text-white shadow-2xl relative overflow-hidden flex items-center gap-6">
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
            <div className="relative z-10 w-16 h-16 rounded-[13px] bg-white/10 flex items-center justify-center text-[#7ed6df] border border-white/20">
               <Clock size={32} />
            </div>
            <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-none mb-2">Próxima Varredura</p>
               <h3 className="text-xl font-light">Em 12 min</h3>
               <p className="text-[9px] font-bold uppercase tracking-widest mt-2 opacity-60 italic whitespace-nowrap">IA Solara analizando agenda...</p>
            </div>
         </div>
      </div>

      {/* Tabela de Automações Ativas */}
      <div className="bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-xl overflow-hidden min-h-[500px]">
        <div className="p-8 border-b border-black/5 bg-white/50 flex justify-between items-center">
           <h3 className="text-sm font-bold text-[#0a3d62] uppercase tracking-[0.15em]">Régua de ComunicaçãoAtiva</h3>
           <div className="flex gap-4">
              <div className="bg-white/60 px-4 py-2 rounded-[13px] flex items-center gap-3 border border-black/5">
                 <Search size={14} className="text-slate-400" />
                 <input type="text" placeholder="Buscar automação..." className="bg-transparent outline-none text-[10px] font-bold text-[#0a3d62] uppercase tracking-widest placeholder:text-slate-300 w-48" />
              </div>
           </div>
        </div>
        
        <div className="p-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {automations.map((a, i) => (
               <div key={a.id} className="bg-white/80 p-8 rounded-[13px] border border-white shadow-sm flex flex-col group hover:shadow-lg transition-all relative overflow-hidden">
                  <div className="flex justify-between items-start mb-10">
                     <div className={`w-14 h-14 rounded-[13px] flex items-center justify-center border-2 ${a.color} shadow-sm`}>
                        <a.icon size={26} />
                     </div>
                     <div className="flex gap-4">
                        <button className="p-3 bg-slate-50 text-slate-300 rounded-[13px] hover:text-[#0a3d62] transition-colors shadow-sm" title="Configurar automação">
                           <Settings2 size={18} />
                        </button>
                        <button className="p-3 bg-slate-50 text-slate-300 rounded-[13px] hover:text-red-500 transition-colors shadow-sm" title="Excluir automação">
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </div>
                  
                  <div className="mb-10">
                     <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{a.type}</span>
                        <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${a.active ? 'text-green-500' : 'text-slate-400'}`}>
                           {a.active ? 'Ativo' : 'Pausado'}
                        </span>
                     </div>
                     <h4 className="text-2xl font-light text-[#0a3d62] tracking-tighter italic">{a.name}</h4>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-6 border-t border-black/5">
                     <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-slate-300" />
                        <span className="text-[11px] font-black text-[#2f3640]">Varredura automática 24/7 ativa</span>
                     </div>
                     <button 
                        onClick={() => toggleStatus(a.id)}
                        className={`transition-all duration-300 ${a.active ? 'text-green-500 scale-125' : 'text-slate-300 hover:text-slate-400 active:scale-110'}`}
                     >
                        {a.active ? <Toggle size={40} /> : <ToggleOff size={40} />}
                     </button>
                  </div>
                  
                  {/* Overlay sutil para itens desativados */}
                  {!a.active && <div className="absolute inset-0 bg-white/40 pointer-events-none backdrop-grayscale-[0.5]"></div>}
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AutomacoesView;
