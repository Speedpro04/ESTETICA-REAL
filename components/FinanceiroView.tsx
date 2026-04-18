import React from 'react';
import { DollarSign, Clock, CheckCircle, EyeOff, Eye, MoreHorizontal, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, CreditCard, ShieldCheck } from 'lucide-react';
import { useSolaraStore } from '../store';

const FinanceiroView: React.FC = () => {
  const { privacyMode, togglePrivacyMode } = useSolaraStore();

  const formatValue = (val: string) => {
    return privacyMode ? 'R$ •••••' : val;
  };

  const faturas = [
    { id: 'NV-2847', patient: 'Beatriz Almeida', value: 'R$ 180,00', due: '08/04/2026', status: 'Pago', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'NV-2848', patient: 'Ricardo Fernandes', value: 'R$ 850,00', due: '08/04/2026', status: 'Pendente', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'NV-2849', patient: 'Camila Souza', value: 'R$ 3.200,00', due: '02/04/2026', status: 'Atrasado', color: 'bg-rose-50 text-rose-600 border-rose-100' },
    { id: 'NV-2850', patient: 'Fernando Lima', value: 'R$ 450,00', due: '13/04/2026', status: 'Pendente', color: 'bg-amber-50 text-amber-600 border-amber-100' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold text-[#40407a] tracking-tight uppercase leading-none">Gestão Financeira</h2>
          <p className="text-[#2f3640] text-[10px] font-black uppercase tracking-[0.3em] mt-3 opacity-90">Fluxo de Caixa e Assinaturas Solara</p>
        </div>
        <button 
          onClick={togglePrivacyMode}
          className={`px-8 py-4 rounded-[13px] font-bold flex items-center gap-3 transition-all uppercase text-[10px] tracking-widest shadow-xl active:scale-95 ${
            privacyMode 
              ? 'bg-[#706fd3] text-white shadow-[#706fd3]/20' 
              : 'bg-white border border-black/5 text-[#40407a] hover:bg-slate-50'
          }`}
          title={privacyMode ? "Mostrar valores" : "Ocultar valores"}
        >
          {privacyMode ? <Eye size={18} /> : <EyeOff size={18} />}
          {privacyMode ? 'Exibir Valores' : 'Modo Privacidade'}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'RECEITA BRUTA (MÊS)', value: 'R$ 28.450,00', trend: '+12.3%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'EM ABERTO', value: 'R$ 4.280,00', trend: '8 pendentes', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'LUCRO LÍQUIDO', value: 'R$ 24.170,00', trend: '+8.1%', icon: TrendingUp, color: 'text-[#706fd3]', bg: 'bg-[#706fd3]/5' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white/40 backdrop-blur-md p-10 rounded-[13px] border border-white/50 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className={`absolute top-10 right-10 p-4 rounded-[13px] ${kpi.bg} ${kpi.color} shadow-sm border border-white/20`}>
              <kpi.icon size={26} />
            </div>
            <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-[0.2em] mb-6">{kpi.label}</p>
            <h3 className="text-4xl font-black text-[#0a3d62] tracking-tighter">{formatValue(kpi.value)}</h3>
            <div className="mt-8 flex items-center gap-2">
               {i % 2 === 0 ? <ArrowUpRight size={14} className="text-emerald-500" /> : <ArrowDownRight size={14} className="text-amber-500" />}
               <span className={`text-[10px] font-black uppercase tracking-widest ${i % 2 === 0 ? 'text-emerald-500' : 'text-amber-500'}`}>{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-2xl overflow-hidden">
            <div className="p-10 border-b border-black/5 flex justify-between items-center bg-white/50">
              <h3 className="text-sm font-bold text-[#40407a] uppercase tracking-[0.15em]">Faturas Recentes</h3>
              <div className="flex bg-slate-100 p-1.5 rounded-[13px] border border-black/5">
                <button className="px-4 py-2 bg-white rounded-lg text-[9px] font-black uppercase tracking-widest text-[#40407a] shadow-sm">Todos</button>
                <button className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-[#2f3640] hover:text-[#0a3d62] transition-colors">Pendentes</button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#40407a] text-white text-[9px] uppercase tracking-[0.2em]">
                    <th className="px-10 py-6">ID Fatura</th>
                    <th className="px-10 py-6">Lead / Cliente</th>
                    <th className="px-10 py-6">Valor</th>
                    <th className="px-10 py-6">Vencimento</th>
                    <th className="px-10 py-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {faturas.map((f, i) => (
                    <tr key={i} className="hover:bg-white/60 transition-colors group">
                      <td className="px-10 py-8 text-[11px] font-black text-[#2f3640] opacity-60">{f.id}</td>
                      <td className="px-10 py-8 text-[13px] font-black text-[#0a3d62]">{f.patient}</td>
                      <td className="px-10 py-8 text-[13px] font-black text-[#0a3d62]">{formatValue(f.value)}</td>
                      <td className="px-10 py-8 text-[11px] font-black text-[#2f3640]">{f.due}</td>
                      <td className="px-10 py-8">
                         <div className="flex justify-center">
                          <span className={`px-5 py-2 rounded-[13px] text-[9px] font-black uppercase tracking-widest border-2 ${f.color}`}>
                            {f.status}
                          </span>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Plan Sidebar */}
        <div className="lg:col-span-4 space-y-10">
            <div className="bg-[#40407a] rounded-[13px] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              
              <div className="flex justify-between items-start mb-12">
                 <div className="flex items-center gap-3">
                   <div className="p-3 bg-white/10 rounded-[13px] border border-white/10">
                     <ShieldCheck size={20} className="text-[#7ed6df]" />
                   </div>
                   <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Assinatura Solara</h3>
                 </div>
                 <MoreHorizontal size={20} className="text-white/20" />
              </div>

              <div className="flex items-end justify-between mb-12">
                 <div>
                    <span className="text-base font-bold text-white uppercase tracking-widest block mb-2">Plano Pro</span>
                    <span className="text-[10px] text-[#7ed6df] font-bold uppercase tracking-widest">Ativo desde Out/25</span>
                 </div>
                 <div className="text-right">
                    <span className="text-4xl font-bold text-white tracking-tighter italic">{formatValue('R$ 249')}</span>
                    <span className="text-[10px] text-white/50 font-medium block mt-2">/ mês</span>
                 </div>
              </div>

              <div className="space-y-5 mb-12 border-t border-white/5 pt-10">
                 <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-white/50 font-semibold uppercase tracking-widest">Especialistas cadastrados</span>
                    <span className="text-white">2 de 4</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-white/50 font-semibold uppercase tracking-widest">Duração do ciclo</span>
                    <span className="text-[#7ed6df]">Renovação Automática</span>
                 </div>
              </div>

              <button className="w-full bg-[#706fd3] text-white py-6 rounded-[13px] text-[10px] font-black uppercase tracking-[0.3em] hover:scale-[1.02] transition-all flex items-center justify-center gap-4 active:scale-[0.98] shadow-2xl shadow-[#706fd3]/20 border border-white/20">
                 <ArrowUpRight size={18} /> Gerenciar Assinatura
              </button>
           </div>

            <div className="space-y-6">
              <h3 className="text-[11px] font-black text-[#40407a] uppercase tracking-[0.2em] ml-2">Pagamentos Recentes</h3>
              <div className="bg-white/60 backdrop-blur-md rounded-[13px] p-8 border border-white shadow-xl flex items-center justify-between group hover:border-[#7ed6df]/50 transition-all cursor-pointer">
                 <div className="flex items-center gap-5">
                   <div className="w-12 h-12 bg-[#40407a]/5 rounded-[13px] flex items-center justify-center text-[#40407a]">
                     <CreditCard size={20} />
                   </div>
                   <div>
                      <p className="text-base font-bold text-[#40407a]">{formatValue('R$ 249,00')}</p>
                      <p className="text-[9px] font-black text-[#2f3640] mt-1 uppercase tracking-widest opacity-60">Fatura de Abril — Solara</p>
                   </div>
                 </div>
                 <CheckCircle size={18} className="text-emerald-500" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroView;
