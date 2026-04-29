
import React, { useState, useCallback } from 'react';
import {
  UserMinus, Send, Calendar, MessageCircle, TrendingUp, AlertCircle,
  DollarSign, Activity, Brain, Phone, Mail, RefreshCw,
  Zap, CheckCircle2, Clock
} from 'lucide-react';
import { useSolaraStore } from '../store';

// ──────────────────────────────────────────────────────────────────────────────
// Constantes e Tipos
// ──────────────────────────────────────────────────────────────────────────────

type RiskScore = 'CRITICO' | 'ALTO' | 'MODERADO' | 'BAIXO';
type ContactChannel = 'WhatsApp' | 'SMS' | 'Email' | '--';

const SCORE_STYLES: Record<string, { label: string; cls: string; dot: string }> = {
  CRITICO:  { label: 'Crítico',  cls: 'bg-rose-100 text-rose-700 border-rose-200',     dot: 'bg-rose-500' },
  ALTO:     { label: 'Alto',     cls: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  MODERADO: { label: 'Moderado', cls: 'bg-amber-100 text-amber-700 border-amber-200',   dot: 'bg-amber-500' },
  BAIXO:    { label: 'Baixo',    cls: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
};

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  WhatsApp: <MessageCircle size={13} className="text-emerald-500" />,
  SMS:      <Phone size={13} className="text-blue-500" />,
  Email:    <Mail size={13} className="text-slate-500" />,
  '--':     <span className="text-slate-300 text-xs">—</span>,
};

// ──────────────────────────────────────────────────────────────────────────────
// Motor de Score Local (executado no frontend para dados Mock)
// ──────────────────────────────────────────────────────────────────────────────

function calcularScoreRisco(lastVisitStr: string): RiskScore {
  if (!lastVisitStr || lastVisitStr === '--') return 'CRITICO';
  const [day, month, year] = lastVisitStr.split('/').map(Number);
  const lastVisit = new Date(year < 2000 ? year + 2000 : year, month - 1, day);
  const today = new Date();
  const diffDays = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays >= 90) return 'CRITICO';
  if (diffDays >= 60) return 'ALTO';
  if (diffDays >= 30) return 'MODERADO';
  return 'BAIXO';
}

function calcularFaturamentoPotencial(score: RiskScore): number {
  const map: Record<RiskScore, number> = { CRITICO: 850, ALTO: 620, MODERADO: 420, BAIXO: 200 };
  return map[score];
}

function gerarSugestao(score: RiskScore, status: string): string {
  if (score === 'CRITICO') return 'Enviar convite urgente com desconto exclusivo de retorno';
  if (score === 'ALTO')    return 'Campanha personalizada mencionando o último procedimento';
  if (score === 'MODERADO') return 'Lembrete de revisão preventiva programada';
  return 'Manter comunicação regular de rotina';
}

// ──────────────────────────────────────────────────────────────────────────────
// Dados base (enriquecidos pelo Motor de Score)
// ──────────────────────────────────────────────────────────────────────────────

const BASE_PATIENTS = [
  { id: '1', name: 'Marcos Vinícius', lastVisit: '15/07/2024', status: 'Orçamento Botox',    attempts: 2, lastContact: '12/03', channel: 'WhatsApp' as ContactChannel },
  { id: '2', name: 'Helena Costa',    lastVisit: '10/08/2024', status: 'Preenchimento Labial', attempts: 1, lastContact: '18/03', channel: 'SMS' as ContactChannel },
  { id: '3', name: 'Sérgio Ramos',    lastVisit: '22/06/2024', status: 'Limpeza de Pele',      attempts: 3, lastContact: '05/03', channel: 'WhatsApp' as ContactChannel },
  { id: '4', name: 'Larissa Manoela', lastVisit: '05/09/2024', status: 'Harmonização Facial', attempts: 0, lastContact: '--',    channel: '--' as ContactChannel },
  { id: '5', name: 'Ana Souza',       lastVisit: '01/08/2024', status: 'Bioestimulador',       attempts: 2, lastContact: '20/03', channel: 'Email' as ContactChannel },
  { id: '6', name: 'João Martins',    lastVisit: '15/06/2024', status: 'Peeling Químico',      attempts: 1, lastContact: '10/03', channel: 'WhatsApp' as ContactChannel },
  { id: '7', name: 'Fabiana Lima',    lastVisit: '12/09/2024', status: 'Lipo de Papada',       attempts: 1, lastContact: '22/03', channel: 'SMS' as ContactChannel },
  { id: '8', name: 'Rafael Pereira',  lastVisit: '04/05/2024', status: 'Ultraformer III',      attempts: 4, lastContact: '01/03', channel: 'WhatsApp' as ContactChannel },
  { id: '9', name: 'Camila Borges',   lastVisit: '30/10/2024', status: 'Criolipólise',         attempts: 0, lastContact: '--',    channel: 'Email' as ContactChannel },
];

function enriquecerPacientes() {
  return BASE_PATIENTS.map(p => {
    const score = calcularScoreRisco(p.lastVisit);
    return { ...p, score, sugestao: gerarSugestao(score, p.status), faturamento: calcularFaturamentoPotencial(score) };
  }).sort((a, b) => {
    const ordem = { CRITICO: 0, ALTO: 1, MODERADO: 2, BAIXO: 3 };
    return (ordem[a.score] ?? 3) - (ordem[b.score] ?? 3);
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Componente Principal
// ──────────────────────────────────────────────────────────────────────────────

const RecoveryView: React.FC = () => {
  const { currentUser } = useSolaraStore();

  const [recoveryList, setRecoveryList] = useState(enriquecerPacientes());
  const [filterScore, setFilterScore] = useState<RiskScore | 'TODOS'>('TODOS');
  const [sentIds, setSentIds] = useState<Set<string>>(new Set());
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const handleRecalculate = useCallback(() => {
    setIsRecalculating(true);
    setTimeout(() => {
      setRecoveryList(enriquecerPacientes());
      setLastUpdate(new Date());
      setIsRecalculating(false);
    }, 1200);
  }, []);

  const handleSend = (id: string) => {
    setSentIds(prev => new Set(prev).add(id));
  };

  const filteredList = filterScore === 'TODOS'
    ? recoveryList
    : recoveryList.filter(p => p.score === filterScore);

  // KPIs calculados dinamicamente
  const criticos = recoveryList.filter(p => p.score === 'CRITICO').length;
  const altos     = recoveryList.filter(p => p.score === 'ALTO').length;
  const faturamentoPotencial = recoveryList.reduce((acc, p) => acc + p.faturamento, 0);
  const recuperados = Math.round(recoveryList.length * 0.28);
  const taxaAbandono = ((recoveryList.length / (recoveryList.length + 42)) * 100).toFixed(1);

  const kpis = [
    { label: 'TAXA DE ABANDONO',       value: `${taxaAbandono}%`,                  sub: '-2.1% vs mês anterior',      icon: UserMinus,    color: 'text-amber-500',   bg: 'bg-amber-50' },
    { label: 'PACIENTES EM RISCO',     value: String(criticos + altos),             sub: `${criticos} críticos urgentes`, icon: AlertCircle, color: 'text-rose-500',   bg: 'bg-rose-50' },
    { label: 'PACIENTES RECUPERADOS',  value: String(recuperados),                  sub: 'Retornaram este mês',         icon: TrendingUp,   color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'FATURAMENTO POTENCIAL',  value: `R$ ${faturamentoPotencial.toLocaleString('pt-BR')}`, sub: 'Receita recuperável',   icon: DollarSign,   color: 'text-violet-500', bg: 'bg-violet-50' },
    { label: 'TAXA DE RECUPERAÇÃO',    value: '28%',                                sub: 'Dos pacientes pós-campanha', icon: Activity,     color: 'text-[#ff7675]', bg: 'bg-rose-50' },
    { label: 'CONVITES ENVIADOS',      value: '142',                                sub: '85% entrega via WhatsApp',   icon: MessageCircle, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-inter">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-[#706fd3] tracking-tight uppercase">
            IA de Recuperação de Orçamentos
          </h2>
          <p className="text-[#57606f] text-xs font-extrabold uppercase tracking-widest mt-3 opacity-70">
            Inteligência Preditiva · Identificação de abandonos em orçamentos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Atualizado: {lastUpdate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="flex items-center gap-3 px-6 py-3 bg-[#706fd3] text-white rounded-[13px] text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-[#706fd3]/10"
            title="Recalcular pontuação de risco agora"
          >
            <RefreshCw size={16} className={isRecalculating ? 'animate-spin' : ''} />
            Sincronizar Orçamentos
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-[13px] border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className={`inline-flex p-3 rounded-[13px] ${kpi.bg} mb-4`}>
              <kpi.icon size={20} className={kpi.color} />
            </div>
            <p className="text-xs font-extrabold text-[#2f3640] uppercase tracking-widest mb-2 leading-tight">{kpi.label}</p>
            <h3 className={`text-3xl font-bold ${kpi.color} leading-none`}>{kpi.value}</h3>
            <p className="text-xs font-extrabold text-[#2f3640] mt-2 uppercase tracking-tight opacity-90 leading-tight">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Score Breakdown Bar */}
      <div className="bg-white rounded-[13px] border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div>
          <h3 className="text-sm font-bold text-[#706fd3] uppercase tracking-[0.1em]">Distribuição por Score de Risco</h3>
          <p className="text-xs font-extrabold text-[#2f3640] tracking-widest mt-1">Motor IA recalcula automaticamente</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['TODOS', 'CRITICO', 'ALTO', 'MODERADO', 'BAIXO'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterScore(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border transition-all ${
                filterScore === s
                  ? 'bg-[#706fd3] text-white border-[#706fd3]'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 shadow-sm'
              } active:scale-95`}
              title={`Filtrar por ${s === 'TODOS' ? 'todos os pacientes' : 'score ' + s}`}
            >
              {s === 'TODOS' ? 'Todos' : (SCORE_STYLES[s]?.label ?? s)}
              {s !== 'TODOS' && (
                <span className="ml-1.5 opacity-80">
                  ({recoveryList.filter(p => p.score === s).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Score visual bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {(['CRITICO', 'ALTO', 'MODERADO', 'BAIXO'] as const).map(score => {
          const count = recoveryList.filter(p => p.score === score).length;
          const pct = (count / recoveryList.length) * 100;
          const colors = { CRITICO: 'bg-rose-400', ALTO: 'bg-orange-400', MODERADO: 'bg-amber-400', BAIXO: 'bg-emerald-400' };
          return pct > 0 ? (
            <div
              key={score}
              title={`${SCORE_STYLES[score].label}: ${count}`}
              className={`${colors[score]} rounded-sm transition-all`}
              style={{ width: `${pct}%` }}
            />
          ) : null;
        })}
      </div>

      <div className="flex gap-8 mt-4">
        {(['CRITICO', 'ALTO', 'MODERADO', 'BAIXO'] as const).map(score => {
          const count = recoveryList.filter(p => p.score === score).length;
          const s = SCORE_STYLES[score];
          return (
            <div key={score} className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
              <span className="text-xs font-bold text-[#202020] uppercase tracking-widest">{s.label}: {count}</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Recovery Table */}
    <div className="bg-white rounded-[13px] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
        <div>
          <h3 className="text-sm font-bold text-[#706fd3] uppercase tracking-[0.1em]">
            Clientes Prioritários para Recuperação
          </h3>
          <p className="text-xs font-bold text-[#2f3640] tracking-widest mt-2">
            {filteredList.length} cliente{filteredList.length !== 1 ? 's' : ''} · Score IA identifica urgência automaticamente
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              {['Paciente', 'Última Visita', 'Motivo', 'Score IA', 'Último Contato', 'Canal', 'Sugestão IA', 'Faturamento', 'Ações'].map(h => (
                <th key={h} className="px-6 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredList.map((p) => {
              const score = SCORE_STYLES[p.score] ?? SCORE_STYLES['BAIXO'];
              const isSent = sentIds.has(p.id);
              return (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-[#706fd3]">{p.name}</span>
                      <span className="text-xs font-extrabold text-slate-500 uppercase mt-1">
                        {p.attempts} contato{p.attempts !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-bold text-slate-600 whitespace-nowrap">{p.lastVisit}</td>
                  <td className="px-6 py-6 text-xs font-extrabold uppercase tracking-wide text-[#706fd3] opacity-90 whitespace-nowrap">{p.status}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${score.dot}`} />
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border ${score.cls}`}>
                        {score.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-bold text-slate-600 whitespace-nowrap">{p.lastContact}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {CHANNEL_ICONS[p.channel]}
                      <span className="text-sm font-bold text-slate-600">{p.channel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 max-w-[180px]">
                    <div className="flex items-start gap-2">
                      <Brain size={14} className="text-[#ff7675] shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-700 leading-tight">{p.sugestao}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-bold text-violet-600 whitespace-nowrap">
                    R$ {p.faturamento.toLocaleString('pt-BR')}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex gap-3">
                      {isSent ? (
                        <button className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg cursor-default" title="Convite Enviado">
                          <CheckCircle2 size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSend(p.id)}
                          className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all group-hover:scale-105 shadow-sm active:scale-95"
                          title="Enviar Convite de Recuperação"
                        >
                          <Send size={16} />
                        </button>
                      )}
                      <button
                        className="p-2.5 bg-slate-50 text-slate-500 rounded-lg hover:bg-slate-100 transition-all shadow-sm active:scale-95"
                        title="Agendar Manual no Calendário"
                      >
                        <Calendar size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* AI Suggestion Card */}
    <div className="bg-[#40407a] rounded-[13px] p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-2 border-[#706fd3]/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#706fd3]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="p-4 bg-white/10 rounded-[13px] border border-white/10 backdrop-blur-sm">
        <Brain size={32} className="text-[#706fd3]" />
      </div>
      <div className="flex-1 space-y-3">
        <h4 className="text-sm font-bold text-[#706fd3] uppercase tracking-[0.2em]">Recomendação da Solara AI</h4>
        <p className="text-base font-bold text-slate-100 leading-relaxed">
          "Clientes com orçamentos de <strong className="text-white font-bold">ESTÉTICA FACIAL</strong> têm{' '}
          <strong className="text-white font-bold">52% mais chance</strong> de fechar quando o
          contato é feito em até 48h após a avaliação. Temos{' '}
          <strong className="text-[#706fd3] font-bold">{criticos} orçamentos</strong> prioritários aguardando você."
        </p>
        <div className="flex items-center gap-6 pt-2">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-violet-300" />
            <span className="text-xs font-bold text-violet-300 uppercase tracking-widest">
              Retorno Estimado: R$ {faturamentoPotencial.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-slate-300" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
              Foco: Follow-up 48h
            </span>
          </div>
        </div>
      </div>
        <button
          onClick={() => alert('Campanha de Recuperação de Orçamentos iniciada!')}
          className="bg-[#706fd3] text-white px-10 py-4 rounded-[13px] text-xs font-bold uppercase tracking-widest hover:brightness-110 shadow-lg shadow-[#706fd3]/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-3 active:scale-95"
          title="Iniciar campanha de recuperação automática"
        >
          <Zap size={18} />
          Recuperar Todos agora
        </button>
      </div>
    </div>
  );
};

export default RecoveryView;
