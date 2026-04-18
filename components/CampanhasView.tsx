import React, { useState } from 'react';
import { Megaphone, Brain, Play, CheckCircle2, BarChart2, Users, Send, Clock, TrendingUp, Zap, MessageCircle, Sparkles, ChevronRight, AlertTriangle, DollarSign } from 'lucide-react';

type CampanhaStatus = 'sugerida' | 'ativa' | 'concluida';

interface Campanha {
  id: string;
  tipo: string;
  descricao: string;
  pacientes: number;
  status: CampanhaStatus;
  canal: string;
  taxa?: string;
  recuperados?: number;
  iniciada?: string;
}

const CANAL_COLOR: Record<string, string> = {
  WhatsApp: 'text-emerald-500 bg-emerald-50',
  SMS:      'text-blue-500 bg-blue-50',
  Email:    'text-slate-500 bg-slate-50',
};

const CampanhasView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'sugeridas' | 'ativas' | 'resultados'>('sugeridas');

  const campanhasSugeridas: Campanha[] = [
    {
      id: 'c1', tipo: 'Avaliação Estética', pacientes: 12, status: 'sugerida', canal: 'WhatsApp',
      descricao: '12 pacientes estão há mais de 6 meses sem retorno. Alta probabilidade de reengajamento.',
    },
    {
      id: 'c2', tipo: 'Limpeza Preventiva', pacientes: 8, status: 'sugerida', canal: 'SMS',
      descricao: '8 pacientes com limpeza atrasada. Ideal para início de trimestre.',
    },
    {
      id: 'c3', tipo: 'Clareamento / Estética', pacientes: 5, status: 'sugerida', canal: 'WhatsApp',
      descricao: '5 pacientes que demonstraram interesse em procedimentos estéticos anteriormente.',
    },
    {
      id: 'c4', tipo: 'Reativação Pós-Tratamento', pacientes: 18, status: 'sugerida', canal: 'WhatsApp',
      descricao: '18 pacientes com tratamento incompleto ou sem consulta de acompanhamento.',
    },
    {
      id: 'c5', tipo: 'Implante — Revisão Urgente', pacientes: 6, status: 'sugerida', canal: 'WhatsApp',
      descricao: '6 pacientes com implante realizado há mais de 7 meses sem revisão.',
    },
  ];

  // Score e faturamento sugerido por campanha
  const CAMPANHA_META: Record<string, { score: string; scoreCls: string; faturamento: number }> = {
    c1: { score: 'ALTO',     scoreCls: 'bg-orange-100 text-orange-700 border-orange-200', faturamento: 7440 },
    c2: { score: 'MÉDIO',    scoreCls: 'bg-amber-100 text-amber-700 border-amber-200',    faturamento: 3360 },
    c3: { score: 'BAIXO',    scoreCls: 'bg-emerald-100 text-emerald-700 border-emerald-200', faturamento: 2250 },
    c4: { score: 'CRÍTICO',  scoreCls: 'bg-rose-100 text-rose-700 border-rose-200',       faturamento: 15300 },
    c5: { score: 'CRÍTICO',  scoreCls: 'bg-rose-100 text-rose-700 border-rose-200',       faturamento: 5100 },
  };

  const [activatedIds, setActivatedIds] = useState<Set<string>>(new Set());
  const handleActivate = (id: string) => setActivatedIds(prev => new Set(prev).add(id));

  const campanhasAtivas: Campanha[] = [
    {
      id: 'a1', tipo: 'Revisão de Rotina', pacientes: 32, status: 'ativa', canal: 'WhatsApp',
      descricao: 'Campanha iniciada em 28/03 com 32 pacientes inativos há 5+ meses.',
      iniciada: '28/03', taxa: '34%', recuperados: 11,
    },
    {
      id: 'a2', tipo: 'Campanha de Ortodontia', pacientes: 15, status: 'ativa', canal: 'SMS',
      descricao: 'Pacientes com aparelho fixo sem retorno há 4 meses.',
      iniciada: '01/04', taxa: '20%', recuperados: 3,
    },
  ];

  const campanhasConcluidas: Campanha[] = [
    {
      id: 'r1', tipo: 'Limpeza — Março', pacientes: 45, status: 'concluida', canal: 'WhatsApp',
      descricao: 'Campanha de limpeza preventiva encerrada com excelente resultado.',
      iniciada: '01/03', taxa: '42%', recuperados: 19,
    },
    {
      id: 'r2', tipo: 'Reativação — Fev', pacientes: 38, status: 'concluida', canal: 'Email',
      descricao: 'Campanha de reativação de pacientes com mais de 8 meses de ausência.',
      iniciada: '01/02', taxa: '18%', recuperados: 7,
    },
    {
      id: 'r3', tipo: 'Implante — Fev', pacientes: 10, status: 'concluida', canal: 'WhatsApp',
      descricao: 'Convites para revisão de implante com alto índice de resposta.',
      iniciada: '10/02', taxa: '60%', recuperados: 6,
    },
  ];

  const sections = [
    { id: 'sugeridas', label: 'Sugeridas pela IA', count: campanhasSugeridas.length, icon: Brain },
    { id: 'ativas',    label: 'Ativas',             count: campanhasAtivas.length,    icon: Play },
    { id: 'resultados',label: 'Resultados',          count: campanhasConcluidas.length,icon: BarChart2 },
  ] as const;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-light text-[#0a3d62] tracking-tight uppercase">Campanhas Inteligentes</h2>
        <p className="text-[#2f3640] text-xs font-black uppercase tracking-widest mt-1 opacity-90">
          IA identifica pacientes e dispara campanhas automaticamente
        </p>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Campanhas Ativas',     value: '2',      icon: Megaphone,    color: 'text-[#ff7675]', bg: 'bg-rose-50' },
          { label: 'Pacientes Alcançados', value: '47',     icon: Users,        color: 'text-blue-500',  bg: 'bg-blue-50' },
          { label: 'Taxa Média Retorno',   value: '28%',    icon: TrendingUp,   color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Faturamento Gerado',   value: 'R$ 12.480', icon: Zap,      color: 'text-violet-500', bg: 'bg-violet-50' },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-[13px] p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className={`inline-flex p-2 rounded-[13px] ${k.bg} mb-3`}>
              <kpi.icon size={18} className={k.color} />
            </div>
            <p className="text-[11px] font-black text-[#2f3640] uppercase tracking-widest mb-1 leading-tight">{k.label}</p>
            <h3 className={`text-3xl font-light ${k.color}`}>{k.value}</h3>
          </div>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex gap-3">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-2.5 px-6 py-4 rounded-[13px] text-xs font-light uppercase tracking-widest transition-all border ${
              activeSection === s.id
                ? 'bg-[#0a3d62] text-white border-[#0a3d62] shadow-lg'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
            }`}
          >
            <s.icon size={16} />
            {s.label}
            <span className={`w-6 h-6 rounded-full text-[10px] font-light flex items-center justify-center ${
              activeSection === s.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              {s.count}
            </span>
          </button>
        ))}
      </div>

      {/* Sugeridas */}
      {activeSection === 'sugeridas' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-[#ff7675]" />
            <p className="text-xs font-black text-[#2f3640] uppercase tracking-widest">
              IA analisou {campanhasSugeridas.reduce((a, c) => a + c.pacientes, 0)} pacientes e sugere as seguintes campanhas
            </p>
          </div>
          {campanhasSugeridas.map(c => {
            const meta = CAMPANHA_META[c.id];
            const isActivated = activatedIds.has(c.id);
            return (
              <div key={c.id} className="bg-white rounded-[13px] border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-md transition-all group">
                <div className="p-4 bg-[#ff7675]/10 rounded-[13px] border border-[#ff7675]/20 relative">
                  <Megaphone size={24} className="text-[#ff7675]" />
                  {meta?.score === 'CRÍTICO' && (
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                      <AlertTriangle size={11} className="text-white" />
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="text-lg font-light text-[#0a3d62] uppercase tracking-tight">{c.tipo}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest ${CANAL_COLOR[c.canal] ?? 'text-slate-500 bg-slate-50'}`}>
                      {c.canal}
                    </span>
                    {meta && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest border ${meta.scoreCls}`}>
                        Score: {meta.score}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-[#202020] leading-relaxed">{c.descricao}</p>
                  <div className="flex items-center gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-[11px] font-light text-slate-400 uppercase tracking-widest">{c.pacientes} pacientes selecionados pela IA</span>
                    </div>
                    {meta && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={14} className="text-violet-400" />
                        <span className="text-[11px] font-light text-violet-500 uppercase tracking-widest">
                          Potencial: R$ {meta.faturamento.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {isActivated ? (
                  <div className="shrink-0 flex items-center gap-3 bg-emerald-50 text-emerald-600 border border-emerald-200 px-6 py-3 rounded-[13px] text-[11px] font-light uppercase tracking-widest">
                    <CheckCircle2 size={16} />
                    Executando...
                  </div>
                ) : (
                  <button
                    onClick={() => handleActivate(c.id)}
                    className="shrink-0 flex items-center gap-3 bg-[#0a3d62] text-white px-7 py-4 rounded-[13px] text-[11px] font-light uppercase tracking-widest hover:bg-[#ff7675] transition-all shadow-sm active:scale-95"
                  >
                    <Sparkles size={16} />
                    Executar com IA
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Ativas */}
      {activeSection === 'ativas' && (
        <div className="space-y-4">
          {campanhasAtivas.map(c => (
            <div key={c.id} className="bg-white rounded-[13px] border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 bg-emerald-50 rounded-[13px] border border-emerald-100">
                  <Play size={24} className="text-emerald-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="text-lg font-light text-[#0a3d62] uppercase tracking-tight">{c.tipo}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest ${CANAL_COLOR[c.canal] ?? 'text-slate-500 bg-slate-50'}`}>
                      {c.canal}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest bg-emerald-100 text-emerald-700">
                      Em andamento
                    </span>
                  </div>
                  <p className="text-sm font-light text-slate-500">{c.descricao}</p>
                </div>
                <div className="flex gap-8 shrink-0 text-center">
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Pacientes</p>
                    <p className="text-2xl font-light text-[#0a3d62]">{c.pacientes}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Retornaram</p>
                    <p className="text-2xl font-light text-emerald-500">{c.recuperados}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Taxa</p>
                    <p className="text-2xl font-light text-[#ff7675]">{c.taxa}</p>
                  </div>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Progresso da campanha</span>
                  <span className="text-[11px] font-light text-emerald-500">{c.taxa}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
                    style={{ width: c.taxa }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Iniciada em {c.iniciada}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Resultados */}
      {activeSection === 'resultados' && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="bg-gradient-to-r from-[#0a3d62] to-[#0c4f7d] rounded-[13px] p-8 text-white flex flex-wrap gap-12 border-2 border-[#82ccdd]/20">
            {[
              { label: 'Campanhas concluídas', value: campanhasConcluidas.length.toString() },
              { label: 'Total de pacientes', value: campanhasConcluidas.reduce((a,c)=>a+c.pacientes,0).toString() },
              { label: 'Pacientes recuperados', value: campanhasConcluidas.reduce((a,c)=>a+(c.recuperados||0),0).toString() },
              { label: 'Faturamento estimado', value: 'R$ 18.200' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-[11px] font-light text-[#82ccdd] uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-3xl font-light text-white">{s.value}</p>
              </div>
            ))}
          </div>

          {campanhasConcluidas.map(c => (
            <div key={c.id} className="bg-white rounded-[13px] border border-slate-200 shadow-sm p-8 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 bg-slate-50 rounded-[13px] border border-slate-100">
                  <CheckCircle2 size={24} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h4 className="text-lg font-light text-[#0a3d62] uppercase tracking-tight">{c.tipo}</h4>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest ${CANAL_COLOR[c.canal] ?? 'text-slate-500 bg-slate-50'}`}>
                      {c.canal}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] font-light uppercase tracking-widest bg-slate-100 text-slate-500">
                      Concluída
                    </span>
                  </div>
                  <p className="text-sm font-light text-slate-500">{c.descricao}</p>
                </div>
                <div className="flex gap-8 shrink-0 text-center">
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Pacientes</p>
                    <p className="text-2xl font-light text-[#0a3d62]">{c.pacientes}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Recuperados</p>
                    <p className="text-2xl font-light text-emerald-500">{c.recuperados}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Taxa</p>
                    <p className="text-2xl font-light text-[#ff7675]">{c.taxa}</p>
                  </div>
                </div>
              </div>
              {/* Completed bar */}
              <div className="mt-6">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full transition-all"
                    style={{ width: c.taxa }}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-[11px] font-light text-slate-400 uppercase tracking-widest">Iniciada em {c.iniciada}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampanhasView;
