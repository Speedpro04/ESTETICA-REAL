
import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { ChevronRight, MessageSquare, Clock, User, UserMinus, TrendingUp, MessageCircle, DollarSign, Activity, AlertTriangle, Zap, X, Send, Users, Sparkles, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSolaraStore } from '../store';

interface PainelViewProps {
  leads: Lead[];
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onOpenLead: (id: string) => void;
}

const PainelView: React.FC<PainelViewProps> = ({ leads, onUpdateStatus, onOpenLead }) => {
  const { privacyMode } = useSolaraStore();
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [campaignForm, setCampaignForm] = useState({
    name: 'Campanha Rejuvenescimento — 30+',
    channel: 'whatsapp',
    targetCount: '24',
    message: 'Olá! A Solara identificou que você tem interesse em procedimentos faciais. Preparamos uma condição exclusiva para o protocolo de Bioestimuladores esta semana. Vamos agendar sua avaliação? ✨',
  });

  const formatValue = (val: string) => {
    return privacyMode ? 'R$ •••••' : val;
  };

  const handleLaunchCampaign = () => {
    toast.success(`Campanha "${campaignForm.name}" disparada! A Solara assumiu o atendimento de ${campaignForm.targetCount} leads.`);
    setIsCampaignModalOpen(false);
  };

  const columns = [
    { title: 'Novos Leads', status: LeadStatus.LEAD },
    { title: 'Qualificados', status: LeadStatus.QUALIFIED },
    { title: 'Agendados', status: LeadStatus.SCHEDULED },
    { title: 'Confirmados', status: LeadStatus.CONFIRMED },
  ];

  const kpis = [
    { label: 'CUSTO POR LEAD', value: 'R$ 8,40', sub: 'Instagram Ads', icon: DollarSign, color: 'text-[#706fd3]', bg: 'bg-[#706fd3]/5', border: 'border-[#706fd3]/10' },
    { label: 'LEADS QUALIFICADOS', value: leads.filter(l => l.status === LeadStatus.QUALIFIED).length, sub: 'Prontos para agendar', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { label: 'AGENDAMENTOS HOJE', value: '8', sub: 'Taxa de ocupação: 85%', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
    { label: 'FATURAMENTO ESTIMADO', value: 'R$ 42.800', sub: 'Projeção mensal', icon: DollarSign, color: 'text-[#40407a]', bg: 'bg-[#40407a]/5', border: 'border-[#40407a]/10' },
    { label: 'CONVERSÃO SOLARA', value: '32%', sub: 'Fechamento via AI', icon: Sparkles, color: 'text-[#7ed6df]', bg: 'bg-[#7ed6df]/5', border: 'border-[#7ed6df]/10' },
    { label: 'LEADS EM RISCO', value: '12', sub: 'Ação necessária', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
  ];

  const getNextStatus = (current: LeadStatus): LeadStatus | null => {
    switch (current) {
      case LeadStatus.LEAD: return LeadStatus.QUALIFIED;
      case LeadStatus.QUALIFIED: return LeadStatus.SCHEDULED;
      case LeadStatus.SCHEDULED: return LeadStatus.CONFIRMED;
      case LeadStatus.CONFIRMED: return LeadStatus.WAITING;
      default: return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-bold text-[#40407a] tracking-tight uppercase leading-none">Central de Fluxo Comercial</h2>
        <p className="text-[#2f3640] text-xs font-extrabold uppercase tracking-[0.3em] mt-3 opacity-90">Gestão de Leads e Conversão em Tempo Real</p>
      </div>

      {/* Solara Insight Bar */}
      <div className="bg-[#40407a] rounded-[13px] p-8 flex flex-col md:flex-row items-center gap-8 border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="p-4 bg-white/10 rounded-[13px] border border-white/10 backdrop-blur-md shrink-0">
          <Sparkles size={28} className="text-[#7ed6df] animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-extrabold text-[#7ed6df] uppercase tracking-[0.3em] mb-2">Insight Solara — Oportunidade Detectada</p>
          <p className="text-lg font-bold text-white leading-snug">
            Identificamos <span className="text-[#7ed6df] font-extrabold">24 leads</span> com perfil para Harmonização Facial que ainda não agendaram. 
            Podemos iniciar uma automação de conversão personalizada agora.
          </p>
        </div>
        <button 
          onClick={() => setIsCampaignModalOpen(true)}
          className="shrink-0 bg-[#706fd3] text-white px-10 py-5 rounded-[13px] text-xs font-bold uppercase tracking-widest hover:scale-[1.05] transition-all shadow-xl shadow-[#706fd3]/20"
        >
          Executar Automação
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className={`bg-white/60 backdrop-blur-md rounded-[13px] p-6 border ${kpi.border} shadow-sm group hover:scale-[1.02] transition-all`}>
            <div className={`inline-flex p-3 rounded-[13px] ${kpi.bg} mb-5`}>
              <kpi.icon size={20} className={kpi.color} />
            </div>
            <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest leading-none mb-2.5">{kpi.label}</p>
            <h3 className={`text-xl font-extrabold ${kpi.color} leading-none tracking-tight`}>
              {typeof kpi.value === 'string' && kpi.value.includes('R$') ? formatValue(kpi.value) : kpi.value}
            </h3>
            <p className="text-xs font-extrabold text-[#2f3640] mt-2.5 uppercase tracking-wide opacity-70">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Funnel Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
        {columns.map((column) => {
          const columnLeads = leads.filter(l => l.status === column.status);
          return (
            <div key={column.status} className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-6 py-4 bg-[#40407a]/5 rounded-[13px] border border-[#40407a]/10">
                <h3 className="text-xs font-extrabold text-[#0a3d62] uppercase tracking-widest leading-none">{column.title}</h3>
                <span className="bg-white text-[#0a3d62] text-xs font-extrabold px-3 py-1.5 rounded-[13px] border border-black/5 shadow-sm">{columnLeads.length}</span>
              </div>

              <div className="flex flex-col gap-6">
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white/80 backdrop-blur-sm rounded-[13px] p-7 border border-white shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-xs font-extrabold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-500 border border-blue-100 uppercase tracking-widest">
                        {lead.leadSource || 'Instagram'}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <Clock size={14} />
                      </div>
                    </div>

                    <div onClick={() => onOpenLead(lead.id)} className="cursor-pointer mb-8">
                      <h4 className="text-lg font-extrabold text-[#0a3d62] tracking-tight group-hover:text-[#706fd3] transition-colors leading-tight">
                        {lead.name}
                      </h4>
                      <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mt-2 overflow-hidden truncate">
                        {lead.interestArea || 'Harmonização'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-3.5 bg-white border border-black/5 text-slate-600 font-medium rounded-[13px] hover:text-[#706fd3] hover:bg-slate-50 transition-all shadow-sm">
                        <MessageSquare size={20} />
                      </button>

                      {getNextStatus(lead.status) && (
                        <button
                          onClick={() => onUpdateStatus(lead.id, getNextStatus(lead.status)!)}
                          className="flex-1 bg-[#40407a] text-white py-4 rounded-[13px] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#706fd3] transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
                        >
                          Avançar <ChevronRight size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {columnLeads.length === 0 && (
                   <div className="py-20 border-2 border-dashed border-black/5 rounded-[13px] flex flex-col items-center justify-center opacity-20">
                      <Users size={40} className="text-slate-300" />
                      <span className="text-xs font-bold uppercase tracking-widest mt-3 whitespace-nowrap">Sem leads aqui</span>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Campanha */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6" onClick={() => setIsCampaignModalOpen(false)}>
          <div className="absolute inset-0 bg-[#40407a]/40 backdrop-blur-md" />
          <div
            className="relative bg-white rounded-[13px] shadow-2xl w-full max-w-lg p-12 animate-in zoom-in-95 duration-300 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsCampaignModalOpen(false)} className="absolute top-10 right-10 p-2 text-slate-300 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>

            <div className="flex items-center gap-5 mb-10">
              <div className="p-5 bg-[#706fd3]/10 rounded-[13px] border border-[#706fd3]/10">
                <Sparkles size={32} className="text-[#706fd3]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#40407a] tracking-tight uppercase">Automação Inteligente</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1.5">Campanha Solara Engagement</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nome da Campanha</label>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-black/5 rounded-[13px] px-6 py-5 text-base font-medium text-[#40407a] outline-none"
                  value={campaignForm.name}
                  onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mensagem Estratégica</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-50 border border-black/5 rounded-[13px] px-6 py-5 text-base font-medium text-[#40407a] outline-none resize-none"
                  value={campaignForm.message}
                  onChange={(e) => setCampaignForm({ ...campaignForm, message: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={handleLaunchCampaign}
              className="w-full mt-10 py-6 bg-[#0a3d62] text-white rounded-[13px] text-xs font-extrabold uppercase tracking-[0.3em] hover:brightness-110 transition-all shadow-2xl border border-white/20"
            >
              Lançar via Solara WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PainelView;
