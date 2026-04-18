import React from 'react';
import { BarChart3, TrendingUp, Users, Calendar, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AgendaAnalysisView: React.FC = () => {
  const data = [
    { name: 'Seg', ocupacao: 85 },
    { name: 'Ter', ocupacao: 70 },
    { name: 'Qua', ocupacao: 92 },
    { name: 'Qui', ocupacao: 65 },
    { name: 'Sex', ocupacao: 78 },
    { name: 'Sab', ocupacao: 45 },
  ];

  const suggestions = [
    { patient: 'Ricardo Oliveira', reason: 'Agendado para 18/02, mas confirmou disponibilidade hoje.', action: 'Antecipar para 10:30', doctor: 'Dr. Mendes' },
    { patient: 'Sara Meireles', reason: 'Procedimento curto (15min) ideal para o gap das 14:15.', action: 'Encaixar às 14:15', doctor: 'Dra. Ana' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-montserrat">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black text-[#0a3d62] tracking-tighter uppercase italic">Análise de Agenda</h2>
        <p className="text-[#2f3640] font-black mt-3 text-[10px] uppercase tracking-widest opacity-90">Otimização de ocupação e inteligência preditiva</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'OCUPAÇÃO MÉDIA', value: '76%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-50' },
          { label: 'HORÁRIOS OCIOSOS', value: '12h', icon: Calendar, color: 'text-amber-500 bg-amber-50' },
          { label: 'REMARCAÇÕES IA', value: '08', icon: Users, color: 'text-blue-500 bg-blue-50' },
          { label: 'GAP SCORE', value: '8.4', icon: CheckCircle, color: 'text-purple-500 bg-purple-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[13px] border border-slate-200 shadow-sm group">
            <div className={`p-2 w-fit rounded-[13px] mb-4 ${kpi.color}`}>
              <kpi.icon size={18} />
            </div>
            <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest mb-1">{kpi.label}</p>
            <h3 className="text-xl font-black text-[#0a3d62]">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-7 bg-white p-8 rounded-[13px] border border-slate-200 shadow-sm space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-black text-[#0a3d62] uppercase tracking-[0.1em]">Taxa de Ocupação Semanal</h3>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+4% vs semana passada</span>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f2f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontFamily: 'Montserrat' }}
                />
                <Bar dataKey="ocupacao" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ocupacao > 80 ? '#0a3d62' : '#82ccdd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Suggestions Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-[11px] font-black text-[#0a3d62] uppercase tracking-[0.1em] flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-500" />
            Oportunidades de Otimização
          </h3>

          <div className="space-y-4">
            {suggestions.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-[13px] border border-slate-200 shadow-sm hover:border-[#e55039]/30 transition-all group">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#0a3d62]">
                      <Users size={18} />
                   </div>
                   <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md uppercase tracking-widest border border-emerald-100">
                      Alta Probabilidade
                   </span>
                </div>
                
                <h4 className="text-[11px] font-light text-[#0a3d62] italic mb-1">{s.patient}</h4>
                <p className="text-[10px] text-[#2f3640] font-black leading-relaxed mb-4">{s.reason}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <span className="text-[9px] font-black text-[#e55039] uppercase tracking-widest">{s.action}</span>
                   <button title="Executar Ação" className="p-2 bg-[#0a3d62] text-white rounded-[13px] hover:bg-[#e55039] transition-all">
                      <ArrowRight size={14} />
                   </button>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-br from-[#0a3d62] to-[#1e3a8a] p-8 rounded-[13px] text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
               <h4 className="text-[10px] font-black text-[#82ccdd] uppercase tracking-[0.2em] mb-4">Insight Preditivo</h4>
               <p className="text-xs font-medium leading-loose italic opacity-90">
                 "Baseado no histórico dos últimos 3 meses, as quintas-feiras à tarde têm 25% de taxa de cancelamento. Sugerimos abrir 2 vagas extras de encaixe preventivo."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaAnalysisView;
