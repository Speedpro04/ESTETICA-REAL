import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { Search, ChevronRight, Plus, Filter, User, X, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface LeadListViewProps {
  leads: Lead[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenLead: (id: string) => void;
}

const getStatusStyles = (status: LeadStatus) => {
  switch (status) {
    case LeadStatus.LEAD:
      return { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' };
    case LeadStatus.QUALIFIED:
      return { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' };
    case LeadStatus.SCHEDULED:
      return { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100' };
    case LeadStatus.CONFIRMED:
      return { bg: 'bg-[#7ed6df]/10', text: 'text-[#40407a]', border: 'border-[#7ed6df]/20' };
    case LeadStatus.FINISHED:
      return { bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-100' };
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-400', border: 'border-slate-100' };
  }
};

const LeadListView: React.FC<LeadListViewProps> = ({ leads, searchQuery, setSearchQuery, onOpenLead }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', interestArea: '', leadSource: 'Manual' });

  const handleSave = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Preencha nome e telefone.');
      return;
    }
    toast.success(`Lead "${form.name}" captado com sucesso!`);
    setIsModalOpen(false);
    setForm({ name: '', phone: '', interestArea: '', leadSource: 'Manual' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 font-inter">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#40407a] tracking-tight uppercase leading-none">Base de Leads e Clientes</h1>
          <p className="text-slate-400 font-bold mt-3 text-[10px] uppercase tracking-[0.3em]">Gestão Inteligente Solara Estética</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#706fd3] text-white px-10 py-5 rounded-3xl flex items-center gap-3 w-fit shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          <span className="text-[11px] font-bold uppercase tracking-widest leading-none">Novo Lead Manual</span>
        </button>
      </div>

      <div className="bg-white/40 backdrop-blur-md rounded-[40px] border border-white/50 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-black/5 flex flex-col md:flex-row gap-6 items-center justify-between bg-white/50">
          <div className="relative w-full md:w-[500px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              className="w-full pl-16 pr-8 py-5 bg-white border border-black/5 rounded-2xl outline-none focus:border-[#706fd3]/50 text-base font-medium text-[#40407a] transition-all shadow-sm placeholder:text-slate-300"
              placeholder="Buscar por nome, telefone ou área..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-3 text-[#40407a] font-bold text-[10px] uppercase tracking-widest bg-white border border-black/5 px-8 py-5 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <Filter size={18} className="text-[#706fd3]" /> Filtrar Canais
            </button>
            <button className="flex items-center gap-3 text-white font-bold text-[10px] uppercase tracking-widest bg-[#40407a] px-8 py-5 rounded-2xl hover:bg-[#474787] transition-all shadow-xl">
              <Sparkles size={18} /> IA Sorter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#40407a] text-white text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="px-10 py-6">Lead / Cliente</th>
                <th className="px-10 py-6">Interesse Principal</th>
                <th className="px-10 py-6">Origem</th>
                <th className="px-10 py-6">Status Comercial</th>
                <th className="px-10 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {leads.map((l) => {
                const styles = getStatusStyles(l.status);
                return (
                  <tr 
                    key={l.id} 
                    className="hover:bg-white/60 transition-colors cursor-pointer group"
                    onClick={() => onOpenLead(l.id)}
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#40407a]/5 text-[#40407a] flex items-center justify-center font-bold text-xl shadow-inner group-hover:bg-[#706fd3] group-hover:text-white transition-all">
                          {l.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-[#40407a] leading-none mb-2">{l.name}</p>
                          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{l.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                       <span className="text-[11px] font-bold text-[#706fd3] uppercase tracking-widest bg-[#706fd3]/5 px-4 py-2 rounded-xl">
                         {l.interestArea || 'Procedimento'}
                       </span>
                    </td>
                    <td className="px-10 py-8">
                       <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.15em]">{l.leadSource || 'Orgânico'}</p>
                    </td>
                    <td className="px-10 py-8">
                      <span className={`text-[10px] font-bold px-5 py-2.5 rounded-2xl border-2 uppercase tracking-tight shadow-sm ${styles.bg} ${styles.text} ${styles.border}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <button className="p-3 text-slate-200 group-hover:text-[#706fd3] transition-all bg-white border border-black/5 shadow-sm rounded-xl">
                        <ChevronRight size={22} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-[#40407a]/40 backdrop-blur-md" />
          <div 
            className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-lg p-12 animate-in zoom-in-95 fade-in duration-300 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-3 text-slate-300 hover:text-[#ff7675] transition-colors rounded-2xl hover:bg-red-50">
              <X size={24} />
            </button>

            <div className="mb-10">
              <h3 className="text-3xl font-bold text-[#40407a] tracking-tight uppercase mb-2">Novo Lead Manual</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entrada direta no funil comercial</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Maria Oliveira"
                  className="w-full bg-slate-50 border border-black/5 rounded-2xl px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">WhatsApp / Telefone</label>
                <input
                  type="text"
                  placeholder="(00) 00000-0000"
                  className="w-full bg-slate-50 border border-black/5 rounded-2xl px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Área de Interesse</label>
                <select
                  className="w-full bg-slate-50 border border-black/5 rounded-2xl px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all appearance-none cursor-pointer"
                  value={form.interestArea}
                  onChange={(e) => setForm({ ...form, interestArea: e.target.value })}
                >
                  <option value="">Selecione um serviço</option>
                  <option value="Botox">Botox</option>
                  <option value="Preenchimento">Preenchimento</option>
                  <option value="Bioestimulador">Bioestimulador</option>
                  <option value="Harmonização">Harmonização Facial</option>
                  <option value="Corporal">Estética Corporal</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-10 py-6 bg-[#40407a] text-white rounded-[24px] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#474787] shadow-2xl transition-all active:scale-95"
            >
              Confirmar Entrada
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadListView;
