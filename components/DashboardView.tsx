
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  DollarSign, 
  Calendar, 
  Sparkles, 
  ChevronRight,
  Zap,
  ArrowUpRight,
  Clock,
  Layout
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Lead, Appointment } from '../types';
import { useSolaraStore } from '../store';

interface DashboardViewProps {
  leads: Lead[];
  appointments: Appointment[];
  onOpenLead: (id: string) => void;
}

const StatCard: React.FC<{ label: string; value: string; trend: string; icon: any; color: string }> = ({ label, value, trend, icon: Icon, color }) => (
  <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[13px] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all group overflow-hidden relative">
    <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform`} />
    <div className="flex justify-between items-start mb-6">
      <div className={`p-4 rounded-[13px] ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
        <ArrowUpRight size={12} className="text-emerald-500" />
        <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest">{trend}</span>
      </div>
    </div>
    <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-[0.2em] mb-2">{label}</p>
    <h3 className="text-3xl font-extrabold text-[#0a3d62] tracking-tighter leading-none">{value}</h3>
  </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ leads, appointments, onOpenLead }) => {
  const { privacyMode } = useSolaraStore();

  const chartData = [
    { name: 'Seg', val: 4000, leads: 24 },
    { name: 'Ter', val: 3000, leads: 18 },
    { name: 'Qua', val: 5000, leads: 32 },
    { name: 'Qui', val: 2780, leads: 15 },
    { name: 'Sex', val: 6890, leads: 45 },
    { name: 'Sab', val: 2390, leads: 20 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 font-inter">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a3d62] to-[#1e3a8a] p-10 rounded-[13px] text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-[#7ed6df] text-[#0a3d62] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest">IA Ativa</div>
             <span className="text-white/40 text-xs font-extrabold uppercase tracking-widest border-l border-white/20 pl-3">Dashboard Consolidado</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tighter uppercase leading-none italic mb-4">Métricas Operacionais</h1>
          <p className="text-white/60 text-sm font-medium max-w-xl leading-relaxed">
            Sua clínica está operando com <span className="text-[#7ed6df] font-extrabold">92% de eficiência</span>. A Solara AI recuperou 12 pacientes nas últimas 24 horas.
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-[13px] text-xs font-extrabold uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl">
            Exportar Dados
          </button>
          <button className="bg-[#7ed6df] text-[#0a3d62] px-8 py-4 rounded-[13px] text-xs font-extrabold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-[#7ed6df]/20 flex items-center gap-2">
            <Sparkles size={16} /> Insights IA
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard 
          label="Faturamento Mensal" 
          value={privacyMode ? "R$ •••••" : "R$ 142.580"} 
          trend="+12.4%" 
          icon={DollarSign} 
          color="bg-[#0a3d62]" 
        />
        <StatCard 
          label="Novos Leads (Mês)" 
          value="482" 
          trend="+34%" 
          icon={Users} 
          color="bg-[#ed4c67]" 
        />
        <StatCard 
          label="Conversão Geral" 
          value="84.2%" 
          trend="+5.1%" 
          icon={TrendingUp} 
          color="bg-[#22a6b3]" 
        />
        <StatCard 
          label="Atendimentos IA" 
          value="1.240" 
          trend="+18%" 
          icon={MessageSquare} 
          color="bg-[#706fd3]" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-stretch">
        
        {/* Analytics Section */}
        <div className="lg:col-span-8 space-y-8 h-full flex flex-col">
          <div className="bg-white p-10 rounded-[13px] border border-black/5 shadow-xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-sm font-extrabold text-[#0a3d62] uppercase tracking-[0.2em] mb-2 leading-none">Desempenho Semanal</h3>
                <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest opacity-60">Fluxo de caixa vs Atração de pacientes</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0a3d62]"></div>
                    <span className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest">Receita</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7ed6df]"></div>
                    <span className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest">Leads</span>
                 </div>
              </div>
            </div>
            
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a3d62" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0a3d62" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f2f6" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#2f3640', fontSize: 12, fontWeight: 800}} 
                    dy={12}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '13px', border: 'none', boxShadow: '0 20px 40px -4px rgba(0,0,0,0.1)', fontFamily: 'Montserrat'}}
                  />
                  <Area type="monotone" dataKey="val" stroke="#0a3d62" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>          
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
             <div className="bg-white p-8 rounded-[13px] border border-black/5 shadow-xl">
                <h3 className="text-sm font-extrabold text-[#0a3d62] uppercase tracking-[0.2em] mb-8 leading-none">Saúde da Carteira</h3>
                <div className="space-y-6">
                   {[
                     { label: 'Pacientes Ativos', val: 820, total: 1000, color: 'bg-[#0a3d62]' },
                     { label: 'Em Recuperação (IA)', val: 142, total: 1000, color: 'bg-[#706fd3]' },
                     { label: 'Inativos', val: 38, total: 1000, color: 'bg-[#ed4c67]' },
                   ].map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest">{item.label}</span>
                           <span className="text-xs font-extrabold text-[#0a3d62]">{item.val}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                           <div 
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`} 
                            style={{ width: `${(item.val / item.total) * 100}%` }}
                           />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-gradient-to-br from-[#7ed6df] to-[#22a6b3] p-8 rounded-[13px] text-[#0a3d62] shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Zap size={32} className="mb-6 animate-pulse" />
                <h3 className="text-xl font-extrabold uppercase tracking-tighter italic mb-4">Automação Inteligente</h3>
                <p className="text-xs font-extrabold uppercase tracking-widest leading-loose mb-10 border-l-4 border-[#0a3d62]/20 pl-4">
                  Sua clínica economizou <span className="text-white font-extrabold underline">42 horas</span> de trabalho manual este mês através dos disparos automáticos da Solara AI.
                </p>
                <button className="w-full py-4 bg-[#0a3d62] text-white rounded-[13px] text-xs font-extrabold uppercase tracking-widest shadow-xl shadow-[#0a3d62]/20 hover:scale-[1.02] active:scale-95 transition-all">
                   Ver Relatório Completo
                </button>
             </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-4 h-full">
          <div className="bg-[#40407a] text-white h-full rounded-[13px] shadow-2xl overflow-hidden border border-white/10 flex flex-col h-full items-stretch">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/10">
               <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-[0.2em] leading-none mb-2 text-left">Timeline Solo IA</h3>
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                     <span className="text-xs font-extrabold text-green-500 uppercase tracking-widest">Monitoramento Ativo</span>
                  </div>
               </div>
               <Layout size={20} className="text-white/20" />
            </div>
            
            <div className="flex-1 p-8 space-y-8 overflow-y-auto custom-scrollbar h-full">
               {[
                 { user: 'Solara AI', action: 'Lead Recuperado', p: 'Ricardo Mendes', time: 'Há 5 min', color: 'bg-emerald-500' },
                 { user: 'Sistema', action: 'Agendamento Confirmado', p: 'Sara Oliveira', time: 'Há 12 min', color: 'bg-blue-500' },
                 { user: 'Solara AI', action: 'Disparo Automático', p: 'Lista: Inativos 6+', time: 'Há 24 min', color: 'bg-[#7ed6df]' },
                 { user: 'Dr. Mendes', action: 'Procedimento Finalizado', p: 'Carlos Ferreira', time: 'Há 1h', color: 'bg-violet-500' },
                 { user: 'Solara AI', action: 'NPS Enviado', p: 'Juliana Silva', time: 'Há 1h', color: 'bg-orange-500' },
               ].map((log, i) => (
                 <div key={i} className="flex gap-4 relative group cursor-default">
                    {i !== 4 && <div className="absolute left-1.5 top-5 bottom-[-20px] w-0.5 bg-white/5" />}
                    <div className={`w-3 h-3 rounded-full ${log.color} ring-4 ring-white/5 relative z-10 shrink-0 mt-1`} />
                    <div className="flex-1 text-left">
                       <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-extrabold text-white uppercase tracking-widest">{log.user}</span>
                          <span className="text-xs font-extrabold text-white/30 uppercase tracking-widest leading-none">{log.time}</span>
                       </div>
                       <p className="text-xs font-bold text-white/60 mb-2">{log.action}</p>
                       <div className="bg-white/5 p-3 rounded-[13px] border border-white/5 group-hover:bg-white/10 transition-all">
                          <span className="text-xs font-extrabold text-[#7ed6df] uppercase tracking-widest">{log.p}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-8 bg-black/20 mt-auto">
               <button className="w-full flex items-center justify-between group">
                  <span className="text-xs font-extrabold text-white/40 group-hover:text-white uppercase tracking-widest transition-all">Ver todos os logs</span>
                  <ChevronRight size={16} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
               </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardView;
