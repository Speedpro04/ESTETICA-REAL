
import React, { useState, useEffect } from 'react';
import { X, Sun, TrendingUp, DollarSign, Users, Award, FileText, Clock, Sparkles } from 'lucide-react';
import { generateStrategicReport } from '../geminiService';
import { AILoadingIndicator } from './LoadingStates';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface AIReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const AIReportModal: React.FC<AIReportModalProps> = ({ isOpen, onClose, data }) => {
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const loadReport = async () => {
        setIsLoading(true);
        const result = await generateStrategicReport(data);
        setReport(result);
        setIsLoading(false);
      };
      loadReport();
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-solara-primary/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 lg:p-12 animate-in fade-in duration-300 font-montserrat">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[13px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border-2 border-solara-border">
        {/* Header - Solara Premium */}
        <div className="p-8 bg-solara-primary text-white flex justify-between items-center shrink-0 border-b-2 border-solara-border/20">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-white/10 rounded-[13px] flex items-center justify-center border-2 border-white/20 backdrop-blur-sm">
              <Sun size={24} className="text-white fill-white" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tighter uppercase italic leading-none">Relatório Estratégico Solara</h2>
              <p className="text-[#2f3640] font-extrabold mt-2 uppercase tracking-[0.3em] opacity-90">IA Preditiva de Alto Desempenho</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-[13px] border-2 border-white/10 transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-10 space-y-10 custom-scrollbar bg-solara-bg/5">
          {/* Métricas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-[13px] border-2 border-solara-border/20 shadow-sm">
              <div className="flex items-center gap-3 text-solara-accent2 mb-3">
                <DollarSign size={18} />
                <span className="text-xs font-extrabold uppercase tracking-widest leading-none">Faturamento Previsto</span>
              </div>
              <p className="text-xl font-extrabold text-solara-primary tracking-tighter leading-none">R$ 142.500,00</p>
              <div className="mt-3 flex items-center gap-2">
                 <span className="text-solara-accent2 text-xs font-extrabold bg-solara-accent2/10 px-2 py-0.5 rounded-[13px]">+15% vs mês anterior</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[13px] border-2 border-solara-border/20 shadow-sm">
              <div className="flex items-center gap-3 text-solara-accent2 mb-3">
                <Users size={18} />
                <span className="text-xs font-extrabold uppercase tracking-widest leading-none">Ocupação Agenda</span>
              </div>
              <p className="text-xl font-extrabold text-solara-primary tracking-tighter leading-none">82%</p>
              <div className="mt-3">
                <p className="text-[#2f3640] font-extrabold uppercase tracking-widest opacity-90">Encaixe ativo: 18%</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[13px] border-2 border-solara-border/20 shadow-sm">
              <div className="flex items-center gap-3 text-solara-accent2 mb-3">
                <Award size={18} />
                <span className="text-xs font-extrabold uppercase tracking-widest leading-none">Satisfação (NPS)</span>
              </div>
              <p className="text-xl font-extrabold text-solara-primary tracking-tighter leading-none">9.8/10</p>
              <div className="mt-3 flex items-center gap-2">
                 <span className="text-solara-primary text-xs font-extrabold bg-solara-primary/10 px-2 py-0.5 rounded-[13px]">Padrão Ouro Solara</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-solara-text1 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                <Clock size={14} className="text-[#e55039]" /> Distribuição de Escala
              </h3>
              <div className="h-72 bg-white rounded-[13px] p-6 border-2 border-solara-border/10 shadow-sm flex flex-col justify-between">
                <div className="flex-1 min-h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Regular', v: (data.totalPatients || 0) * 0.7 },
                      { name: 'Plantão', v: data.specialHours || 0 }
                    ]}>
                      <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f2f6" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#57606f', fontWeight: 800}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{borderRadius: '7px', border: '2px solid #e55039', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 800, fontSize: '12px'}} />
                      <Bar dataKey="v" fill="#e55039" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="pt-4 border-t border-solara-bg/50">
                  <p className="text-xs font-bold text-solara-text1 uppercase tracking-widest text-center">
                    Carga de Plantão: <span className="text-[#e55039]">{Math.round(((data.specialHours || 0) / (data.totalPatients || 1)) * 100)}%</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-solara-text1 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                <TrendingUp size={14} className="text-solara-accent2" /> Fluxo de Conversão
              </h3>
              <div className="h-72 bg-white rounded-[13px] p-6 border-2 border-solara-border/10 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.performanceData}>
                    <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#f1f2f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#57606f', fontWeight: 800}} />
                    <YAxis hide />
                    <Tooltip contentStyle={{borderRadius: '7px', border: '2px solid #82ccdd', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 800, fontSize: '12px'}} />
                    <Bar dataKey="v" fill="#0a3d62" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-extrabold text-solara-text1 uppercase tracking-[0.2em] flex items-center gap-2 italic">
                <Sun size={14} className="text-solara-accent2" /> Insights IA
              </h3>
              <div className="bg-solara-primary rounded-[13px] p-8 border-2 border-solara-border shadow-md h-72 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full group-hover:bg-solara-accent2/10 transition-all"></div>
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AILoadingIndicator message="Solara está processando..." />
                  </div>
                ) : (
                  <div className="relative z-10 overflow-y-auto h-full pr-2 custom-scrollbar">
                    <p className="text-solara-text2 leading-relaxed font-bold italic text-xs border-l-4 border-solara-accent2 pl-5 whitespace-pre-wrap">
                      {report || "Analisando dados operacionais..."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-solara-primary rounded-[13px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-solara-border shadow-xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-solara-accent2 rounded-[13px] flex items-center justify-center shadow-lg shadow-orange-500/20 rotate-3 transition-transform hover:rotate-0">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-extrabold uppercase tracking-tighter leading-none italic">Baixar Plano Executivo?</p>
                <p className="text-[#ffffff] font-extrabold uppercase tracking-[0.2em] mt-2">Dossiê detalhado via IA generativa</p>
              </div>
            </div>
            <button className="bg-white text-solara-primary px-10 py-4 rounded-[13px] font-extrabold uppercase text-xs tracking-[0.2em] hover:bg-solara-accent2 hover:text-white transition-all shadow-xl active:scale-95 border-2 border-solara-border">
              Gerar PDF da Estratégia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReportModal;
