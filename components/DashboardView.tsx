import React from 'react';
import { 
  Clock, 
  Users, 
  ChevronRight, 
  Activity, 
  Calendar,
  Sparkles,
  TrendingUp,
  MessageSquare,
  DollarSign
} from 'lucide-react';
import { Lead, Appointment } from '../types';
import { useSolaraStore } from '../store';

interface DashboardViewProps {
  leads: Lead[];
  appointments: Appointment[];
  onOpenLead: (id: string) => void;
}

const DashboardStatusCard: React.FC<{ icon: any, label: string, value: string, color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white/60 backdrop-blur-md p-5 rounded-3xl border border-white shadow-sm flex items-center gap-4 flex-1 min-w-[200px]">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color} shadow-sm border border-white`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <h3 className="text-sm font-bold text-[#40407a] uppercase tracking-tight">{value}</h3>
    </div>
  </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ leads, appointments, onOpenLead }) => {
  const { privacyMode } = useSolaraStore();

  const formatValue = (val: string) => {
    return privacyMode ? 'R$ •••••' : val;
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      
      {/* Indicadores do Topo */}
      <div className="flex flex-wrap gap-6 items-center">
        <DashboardStatusCard 
          icon={TrendingUp} 
          label="Conversão de Leads" 
          value="84.2%" 
          color="bg-[#7ed6df]/10 text-[#40407a]" 
        />
        <DashboardStatusCard 
          icon={MessageSquare} 
          label="Interações Solara (Hoje)" 
          value="12 atendimentos" 
          color="bg-[#706fd3]/10 text-[#706fd3]" 
        />
        <DashboardStatusCard 
          icon={Clock} 
          label="Tempo de Resposta AI" 
          value="< 5 segundos" 
          color="bg-green-50 text-green-600" 
        />
        <div className="flex gap-4 ml-auto">
          <button className="bg-[#706fd3] text-white px-8 py-3.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-[#706fd3]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
            <Sparkles size={14} /> Solara Intelligence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Coluna Principal: Fluxo e Agendamentos */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Funil de Vendas / Leads */}
          <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white/50">
              <h3 className="text-sm font-bold text-[#40407a] uppercase tracking-[0.15em]">Funil de Captação e Atendimento</h3>
              <span className="text-[10px] font-bold text-[#b2bec3] uppercase bg-slate-50 px-3 py-1.5 rounded-lg border border-black/5">Realtime</span>
            </div>
            <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
               {[
                 { label: 'Novos Leads', val: leads.filter(l => l.status === 'Novo Lead').length, color: 'text-[#40407a]' },
                 { label: 'Qualificados', val: leads.filter(l => l.status === 'Qualificado').length, color: 'text-[#706fd3]' },
                 { label: 'Agendados', val: leads.filter(l => l.status === 'Agendado').length, color: 'text-[#22a6b3]' },
                 { label: 'Finalizados', val: leads.filter(l => l.status === 'Finalizado').length, color: 'text-green-600' },
               ].map((item, i) => (
                 <div key={i} className="bg-white/80 p-6 rounded-3xl border border-white shadow-sm hover:translate-y-[-4px] transition-all cursor-pointer group">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{item.label}</p>
                   <h3 className={`text-4xl font-light ${item.color} group-hover:scale-105 transition-transform`}>{item.val}</h3>
                   <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-4">Ver detalhes</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Próximos Procedimentos */}
          <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-xl overflow-hidden">
             <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white/50">
               <h3 className="text-sm font-bold text-[#40407a] uppercase tracking-[0.15em]">Procedimentos agendados</h3>
               <span className="text-[10px] font-bold text-[#b2bec3] uppercase bg-slate-50 px-3 py-1.5 rounded-lg">Próximos</span>
             </div>
             
             <div className="p-8 space-y-4">
                {appointments.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-6 bg-white/80 rounded-3xl border border-white shadow-sm group hover:bg-white transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-[#40407a]/5 rounded-2xl flex items-center justify-center text-[#40407a] font-bold">
                        {app.time}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#40407a]">{app.leadName}</h4>
                        <p className="text-[10px] font-bold text-[#706fd3] uppercase tracking-widest mt-1">{app.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{app.professional}</p>
                        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mt-2 italic">{app.specialty}</p>
                      </div>
                      <ChevronRight size={16} className="text-slate-200 group-hover:text-[#706fd3] transition-colors" />
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="py-12 text-center opacity-30 grayscale items-center flex flex-col">
                    <Calendar size={40} className="mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Nenhum agendamento para hoje</p>
                  </div>
                )}
             </div>
          </div>

        </div>

        {/* Coluna Lateral: Leads Recentes e Chat Live */}
        <div className="lg:col-span-4 flex flex-col gap-8">
           
           {/* Card Faturamento Estimado (Novo) */}
           <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-xl p-8 flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <DollarSign size={80} className="text-[#40407a]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Faturamento Projetado</p>
              <h3 className="text-3xl font-bold text-[#40407a] tracking-tighter">
                {formatValue('R$ 42.850')}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-lg">+15% vs mês anterior</span>
              </div>
           </div>

           {/* Monitor de Conversas (Solara) */}
           <div className="bg-[#40407a] rounded-[40px] border border-white/10 shadow-2xl overflow-hidden flex flex-col min-h-[320px]">
             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/10">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em]">Solara Live Chat</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-bold text-green-500 truncate uppercase">Online</span>
                </div>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-white/40">
                <MessageSquare size={40} className="mb-6 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">Solara está gerenciando 5 conversas simultâneas no WhatsApp.</p>
             </div>
             <div className="p-8 bg-black/20">
                <button className="w-full py-5 bg-white/10 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
                  Intervir e assumir chat
                </button>
             </div>
           </div>

           {/* Leads Recentes */}
           <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-xl overflow-hidden flex flex-col">
             <div className="p-8 border-b border-black/5 flex justify-between items-center bg-white/50">
                <h3 className="text-sm font-bold text-[#40407a] uppercase tracking-[0.15em]">Novos Leads</h3>
             </div>
             <div className="p-8 flex flex-col gap-4">
               {leads.slice(0, 3).map((l) => (
                 <div key={l.id} className="bg-white/80 p-5 rounded-3xl border border-white shadow-sm flex items-center justify-between hover:scale-[0.98] transition-all cursor-pointer hover:bg-white" onClick={() => onOpenLead(l.id)}>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#706fd3]/5 rounded-2xl flex items-center justify-center font-bold text-[#706fd3] text-sm">
                         {l.name.charAt(0)}
                       </div>
                       <div>
                         <p className="text-[12px] font-bold text-[#40407a] leading-none mb-2">{l.name}</p>
                         <p className="text-[9px] font-bold text-[#7ed6df] uppercase tracking-[0.15em]">{l.interestArea || 'Interesse não definido'}</p>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <ChevronRight size={14} className="text-slate-200" />
                    </div>
                 </div>
               ))}
             </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardView;
