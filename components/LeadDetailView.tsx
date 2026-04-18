import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  User, 
  Calendar, 
  Phone, 
  Plus, 
  Sun,
  Clock,
  ExternalLink,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Sparkles,
  Zap,
  Gem
} from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { Lead, MedicalRecord } from '../types';
import { useSolaraStore } from '../store';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import toast from 'react-hot-toast';

interface LeadDetailViewProps {
  patient: Lead; // Mantido como patient prop para compatibilidade com App.tsx por enquanto
  onBack: () => void;
  onUpdate: (lead: Lead) => Promise<void>;
}

const LeadDetailView: React.FC<LeadDetailViewProps> = ({ patient: lead, onBack, onUpdate }) => {
  const { addMedicalRecord, syncStatus } = useSolaraStore();
  const { runSymptomAnalysis, runMedicalSummary, isProcessing } = useAIAnalysis();
  
  const [activeTab, setActiveTab] = useState<'procedures' | 'history' | 'insights'>('procedures');
  const [newNote, setNewNote] = useState('');
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSaveNote = async () => {
    if (!newNote) return;
    const record: MedicalRecord = {
      id: crypto.randomUUID(),
      date: new Date().toLocaleDateString('pt-BR'),
      professional: 'Especialista Solara',
      notes: newNote,
      category: 'Atendimento'
    };
    await addMedicalRecord(lead.id, record);
    setNewNote('');
    toast.success('Registro de atendimento salvo!');
  };

  return (
    <div className="animate-in slide-in-from-right-4 duration-500 pb-12 font-inter">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-[#40407a]/40 hover:text-[#40407a] transition-all group font-bold uppercase text-[10px] tracking-widest">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar para Clientes</span>
        </button>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#40407a] text-white px-5 py-2.5 rounded-[13px] shadow-xl shadow-[#40407a]/20">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Solara Intelligence</span>
          </div>
          {syncStatus === 'syncing' && (
            <div className="flex items-center gap-2 bg-blue-50 text-blue-500 px-3 py-2 rounded-xl border border-blue-100">
              <Loader2 className="animate-spin h-3 w-3" />
              <span className="text-[9px] font-bold uppercase tracking-tighter">Sync Cloud</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Perfil Lateral */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
            <div className="bg-[#40407a] p-12 text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full"></div>
              <div className="w-24 h-24 bg-white/10 rounded-[13px] mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white backdrop-blur-md border border-white/20 shadow-2xl">
                {lead.name.charAt(0)}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{lead.name}</h2>
              <p className="text-[#7ed6df] text-[10px] mt-2 font-black uppercase tracking-[0.2em]">{lead.interestArea || 'Lead Qualificado'}</p>
            </div>
            
            <div className="p-8 space-y-8 flex-1">
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#40407a]/5 rounded-[13px] flex items-center justify-center text-[#40407a]">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[#2f3640] font-black uppercase tracking-widest mb-1">WhatsApp</p>
                    <p className="text-sm font-bold text-[#40407a]">{lead.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-[#40407a]/5 rounded-[13px] flex items-center justify-center text-[#40407a]">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-[#2f3640] font-black uppercase tracking-widest mb-1">Origem do Lead</p>
                    <p className="text-sm font-bold text-[#40407a] uppercase tracking-tighter">{lead.leadSource || 'Instagram'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5">
                <div className="bg-[#40407a]/5 p-6 rounded-[13px] border border-[#40407a]/10">
                  <h4 className="text-[10px] font-bold text-[#40407a] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Gem size={14} className="text-[#706fd3]" /> Perfil Estético
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-[#2f3640] font-black uppercase tracking-wider">Score Premium</span>
                      <span className="text-[10px] text-[#22a6b3] font-black uppercase">AA+</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-gradient-to-r from-[#706fd3] to-[#7ed6df]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {lead.status === 'RECOVERY' && (
            <div className="bg-amber-50 border border-amber-200 rounded-[13px] p-8 animate-pulse shadow-lg shadow-amber-500/5">
              <h3 className="text-amber-700 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlertTriangle size={16} /> Alerta de Recuperação
              </h3>
              <p className="text-amber-800 text-xs font-medium leading-relaxed">
                Este lead está inativo há mais de 60 dias. Solara recomenda envio de campanha "Pele Renovada".
              </p>
            </div>
          )}
        </div>

        {/* Conteúdo Principal */}
        <div className="lg:col-span-3 space-y-8">
          <nav className="flex gap-12 border-b border-black/5">
            {[
              { id: 'procedures', label: 'Procedimentos', icon: Zap },
              { id: 'history', label: 'Evolução', icon: Activity },
              { id: 'insights', label: 'Solara Insights', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 pb-6 text-[10px] font-bold transition-all relative tracking-[0.2em] uppercase ${
                  activeTab === tab.id ? 'text-[#706fd3]' : 'text-slate-300 hover:text-[#40407a]'
                }`}
              >
                <tab.icon size={16} className={activeTab === tab.id ? 'animate-bounce' : ''} />
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#706fd3] rounded-t-full shadow-[0_-4px_10px_rgba(112,111,211,0.3)]"></div>}
              </button>
            ))}
          </nav>

          {activeTab === 'procedures' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               {/* Card Solara AI Analysis */}
               <div className="bg-gradient-to-br from-[#40407a] to-[#706fd3] p-10 rounded-[13px] shadow-2xl relative overflow-hidden border border-white/10 group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
                  
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-[13px] flex items-center justify-center shadow-2xl">
                        <Sparkles size={28} className="text-[#706fd3] fill-[#706fd3]/20" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white tracking-tight text-2xl uppercase">Recuperação Solara</h3>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mt-1.5">Inteligência Estratégica</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <textarea 
                      className="w-full h-32 p-7 bg-white/10 border border-white/20 rounded-[13px] outline-none focus:border-white/40 focus:bg-white/15 text-white transition-all font-medium text-lg placeholder:text-white/30 resize-none shadow-inner"
                      placeholder="Alguma observação estratégica para a Solara analisar?"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    />
                    <div className="flex justify-between items-center mt-6">
                       <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest leading-relaxed max-w-[60%]">
                         A Solara analisa o histórico de compras e procedimentos para sugerir a próxima grande venda.
                       </p>
                       <button 
                        onClick={handleSaveNote}
                        disabled={!newNote}
                        className="bg-white text-[#40407a] px-10 py-5 rounded-[24px] font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-30"
                      >
                        Treinar IA / Salvar
                      </button>
                    </div>
                  </div>
               </div>

               {/* Histórico Temporal */}
               <div className="space-y-6">
                  {lead.history.length === 0 ? (
                    <div className="p-20 text-center bg-white/40 rounded-[13px] border border-white/50 border-dashed">
                      <Zap size={48} className="text-slate-200 mx-auto mb-6" />
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Nenhum procedimento registrado ainda.</p>
                    </div>
                  ) : (
                    lead.history.map((record, i) => (
                      <div key={record.id} className="bg-white/80 p-8 rounded-[13px] border border-white shadow-xl flex items-start gap-8 hover:translate-x-2 transition-all">
                        <div className="w-1 bg-[#7ed6df] self-stretch rounded-full opacity-30"></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-black text-[#706fd3] uppercase tracking-widest">{record.date}</span>
                            <span className="text-[9px] font-black text-[#2f3640] uppercase tracking-[0.15em]">{record.professional}</span>
                          </div>
                          <p className="text-[#0a3d62] text-lg font-black leading-relaxed mb-6">{record.notes}</p>
                          {record.summary && (
                            <div className="bg-[#7ed6df]/5 p-4 rounded-[13px] border border-[#7ed6df]/10 italic text-[#22a6b3] text-sm">
                              Solara: {record.summary}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailView;
