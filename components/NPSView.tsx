
import React from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  TrendingUp, 
  MessageSquare, 
  Star,
  Search,
  ChevronRight
} from 'lucide-react';

const NPSView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-normal text-[#0a3d62] tracking-tighter uppercase leading-none italic">Net Promoter Score</h2>
          <p className="text-[#2f3640] font-extrabold mt-3 text-xs uppercase tracking-[0.3em] opacity-90">Satisfação e Fidelidade do Paciente</p>
        </div>
        <div className="flex bg-white/60 backdrop-blur-md rounded-[13px] p-1.5 border border-white shadow-sm">
           <button className="px-6 py-2 bg-[#0a3d62] text-white rounded-[13px] text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#0a3d62]/20">Semanal</button>
           <button className="px-6 py-2 text-[#0a3d62]/40 text-xs font-bold uppercase tracking-widest hover:text-[#0a3d62]">Mensal</button>
        </div>
      </div>

      {/* Indicadores NPS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-gradient-to-br from-[#0a3d62] to-[#0c4f7d] p-8 rounded-[13px] text-white shadow-2xl relative overflow-hidden border-2 border-white/10">
           <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
           <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-40 mb-3">Score Geral</p>
           <h3 className="text-7xl font-normal tracking-tighter italic">89</h3>
           <div className="flex items-center gap-2 mt-6">
              <TrendingUp size={14} className="text-[#7ed6df]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#7ed6df]">+4.2% este mês</span>
           </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white flex flex-col justify-between shadow-xl">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 bg-green-500/10 rounded-[13px] flex items-center justify-center text-green-600 border border-green-500/20">
               <Smile size={24} />
             </div>
             <span className="text-xs font-bold text-green-600 bg-green-500/10 px-3 py-1 rounded-full uppercase">82%</span>
           </div>
           <div className="mt-8">
             <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mb-1.5">Promotores</p>
             <h4 className="text-2xl font-normal text-[#0a3d62]">Excelente</h4>
           </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white flex flex-col justify-between shadow-xl">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 bg-amber-500/10 rounded-[13px] flex items-center justify-center text-amber-600 border border-amber-500/20">
               <Meh size={24} />
             </div>
             <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full uppercase">12%</span>
           </div>
           <div className="mt-8">
             <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mb-1.5">Neutros</p>
             <h4 className="text-2xl font-normal text-[#0a3d62]">Estável</h4>
           </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white flex flex-col justify-between shadow-xl">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 bg-red-500/10 rounded-[13px] flex items-center justify-center text-red-600 border border-red-500/20">
               <Frown size={24} />
             </div>
             <span className="text-xs font-bold text-red-600 bg-red-500/10 px-3 py-1 rounded-full uppercase">6%</span>
           </div>
           <div className="mt-8">
             <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mb-1.5">Detratores</p>
             <h4 className="text-2xl font-normal text-[#0a3d62]">Baixo</h4>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de Feedbacks */}
        <div className="lg:col-span-8 bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-xl overflow-hidden min-h-[500px]">
           <div className="p-8 border-b border-black/5 bg-white/50 flex justify-between items-center">
             <h3 className="text-sm font-bold text-[#0a3d62] uppercase tracking-[0.15em]">Últimos feedbacks</h3>
             <div className="bg-white/60 px-4 py-2 rounded-[13px] flex items-center gap-3 border border-black/5">
                <Search size={14} className="text-slate-400" />
                <input type="text" placeholder="Filtrar..." className="bg-transparent outline-none text-xs font-bold text-[#0a3d62] uppercase tracking-widest placeholder:text-slate-300 w-32" />
             </div>
           </div>
           <div className="p-8 space-y-6">
             {[
               { name: 'Ricardo Mendes', score: 10, msg: 'Atendimento sensacional! A clínica é impecável e a equipe muito atenciosa. Recomendo com certeza.', date: 'Há 2h' },
               { name: 'Juliana Silva', score: 9, msg: 'O processo de agendamento pelo WhatsApp facilitou muito minha vida. Dra. Ana Paula foi ótima.', date: 'Há 5h' },
               { name: 'Carlos Ferreira', score: 8, msg: 'Demorou um pouco para eu ser atendido, mas o procedimento em si foi rápido e indolor.', date: 'Ontem' },
             ].map((fb, i) => (
               <div key={i} className="bg-white/80 p-6 rounded-[13px] border border-white shadow-sm flex gap-6 hover:translate-y-[-2px] transition-all group cursor-pointer">
                  <div className="w-14 h-14 rounded-[13px] bg-[#7ed6df]/10 flex flex-col items-center justify-center border border-[#7ed6df]/30 text-[#0a3d62] shrink-0">
                     <span className="text-xl font-bold leading-none">{fb.score}</span>
                     <span className="text-xs font-extrabold uppercase tracking-widest mt-1 opacity-40">Score</span>
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-[#0a3d62] uppercase tracking-widest">{fb.name}</h4>
                        <span className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest leading-none mb-2">{fb.date}</span>
                     </div>
                     <p className="text-sm font-normal text-slate-600 leading-relaxed truncate group-hover:whitespace-normal transition-all group-hover:text-[#0a3d62]">"{fb.msg}"</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <Star size={12} className="text-amber-400 fill-amber-400 opacity-20" />
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Análise de Sentimento (IA) */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gradient-to-br from-[#7ed6df] to-[#00A3FF] p-10 rounded-[13px] text-[#0a3d62] shadow-2xl relative overflow-hidden border-2 border-white/20">
              <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-white/20 blur-[60px] rounded-full"></div>
              <MessageSquare size={32} className="mb-8 opacity-40" />
              <h3 className="text-2xl font-normal tracking-tighter uppercase leading-none italic mb-4">Análise IA</h3>
              <p className="text-xs font-bold uppercase tracking-widest leading-loose mb-10 border-l-4 border-[#0a3d62]/20 pl-4">
                "Os pacientes valorizam muito a agilidade no WhatsApp, mas citam espera na recepção física como ponto de melhoria."
              </p>
              <button className="w-full py-4 bg-[#0a3d62] text-white rounded-[13px] text-xs font-bold uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#0a3d62]/20">Ver Relatório Completo</button>
           </div>

           <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white shadow-xl">
              <h4 className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mb-6">Tendência de Satisfação</h4>
              <div className="h-40 flex items-end gap-3 px-2">
                 {[
                   { h: 'h-[40%]', label: '7.0' },
                   { h: 'h-[65%]', label: '7.1' },
                   { h: 'h-[55%]', label: '7.2' },
                   { h: 'h-[80%]', label: '7.3' },
                   { h: 'h-[95%]', label: '7.4' },
                   { h: 'h-[85%]', label: '7.5' },
                 ].map((bar, i) => (
                   <div 
                    key={i} 
                    className={`flex-1 bg-[#0a3d62]/10 rounded-t-xl relative group cursor-pointer hover:bg-[#7ed6df]/50 transition-all ${bar.h}`}
                   >
                      <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-[#0a3d62] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">{bar.label}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NPSView;
