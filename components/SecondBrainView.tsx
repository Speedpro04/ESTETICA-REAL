import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Share2, 
  Clock, 
  Settings, 
  BrainCircuit,
  Database,
  Link as LinkIcon,
  Zap,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SimpleMDE from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { AestheticsGraph } from './AestheticsGraph';

const MOCK_NOTES = [
  { id: '1', title: 'Protocolo: Botox Full Face', content: '# Protocolo Botox\n\n- [ ] Marcar pontos\n- [ ] Aplicar [[Toxina X]]\n- [ ] Recomendar pós-sessão', updated: '10 min ago', category: 'Facial' },
  { id: '2', title: 'Campanha: Verão Sem Flacidez', content: '# Estratégia de Vendas\n\nFocar em [[Bioestimuladores]] e pacotes de 3 sessões.', updated: '2h ago', category: 'Marketing' },
  { id: '3', title: 'Análise Polars: Conversão Março', content: '# Relatório Inteligente\n\nO motor **Polars** identificou que leads de [[Lábios]] convertem 40% mais rápido.', updated: 'Ontem', category: 'Analytics' },
];

const SecondBrainView: React.FC = () => {
  const [activeNoteId, setActiveNoteId] = useState('1');
  const activeNote = MOCK_NOTES.find(n => n.id === activeNoteId) || MOCK_NOTES[0];

  return (
    <div className="grid grid-cols-12 gap-8 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sidebar de Notas */}
      <div className="col-span-3 flex flex-col gap-6">
        <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-[32px] p-6 shadow-sm flex flex-col h-[calc(100vh-220px)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-[#E84118]" size={24} />
              <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">SECOND BRAIN</h2>
            </div>
            <button className="p-2 bg-[#E84118] text-white rounded-[13px] hover:scale-110 transition-transform">
              <Plus size={18} />
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Buscar no conhecimento..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-[13px] py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 ring-[#E84118]/20 transition-all font-medium"
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2">
            {MOCK_NOTES.map(note => (
              <button 
                key={note.id}
                onClick={() => setActiveNoteId(note.id)}
                className={`w-full text-left p-4 rounded-[13px] transition-all group ${
                  activeNoteId === note.id 
                    ? 'bg-[#E84118] text-white shadow-lg' 
                    : 'hover:bg-slate-50 text-slate-600 font-medium'
                }`}
              >
                <div className="flex items-center gap-3 mb-1">
                  <FileText size={16} className={activeNoteId === note.id ? 'text-white' : 'text-slate-500 font-medium'} />
                  <span className="font-bold text-xs uppercase tracking-widest truncate">{note.title}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-semibold ml-7">{note.category} • {note.updated}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-6 flex flex-col gap-6">
        <div className="bg-white border border-black/5 rounded-[13px] p-10 shadow-xl shadow-slate-200/50 flex flex-col h-[calc(100vh-220px)] overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <input 
              className="text-3xl font-bold text-slate-800 border-none outline-none w-full bg-transparent tracking-tighter"
              value={activeNote.title}
              onChange={() => {}}
            />
            <div className="flex items-center gap-3 shrink-0">
               <div className="bg-red-50 text-[#E84118] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-100 flex items-center gap-2">
                 <Database size={12} />
                 Polars Sync
               </div>
               <div className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-200">
                 Draft
               </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <SimpleMDE 
              value={activeNote.content}
              onChange={() => {}}
              options={{
                spellChecker: false,
                status: false,
                autofocus: true,
              }}
            />
          </div>
        </div>
      </div>

      {/* Panel de Conexões */}
      <div className="col-span-3 flex flex-col gap-6">
        <div className="bg-slate-900 border border-white/10 rounded-[32px] p-6 shadow-2xl flex flex-col gap-6 h-[calc(100vh-220px)]">
           <div className="flex items-center gap-3 text-white">
             <LinkIcon size={20} className="text-[#E84118]" />
             <h3 className="text-sm font-bold uppercase tracking-widest">MAPA DE CONEXÕES</h3>
           </div>

           <AestheticsGraph />

           <div className="space-y-4">
             <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] px-2">Sugestões da IA (RAG)</h4>
             <div className="bg-white/5 border border-white/5 rounded-[13px] p-4 hover:bg-white/10 transition-all cursor-pointer group">
               <div className="flex items-center gap-2 mb-2">
                 <Zap size={14} className="text-yellow-400" />
                 <span className="text-[11px] font-bold text-white uppercase tracking-widest">CONEXÃO DETECTADA</span>
               </div>
               <p className="text-xs text-white/80 font-medium leading-relaxed group-hover:text-white transition-colors">
                 O Polars sugere conectar esta nota ao protocolo de <strong>Recuperação Pós-Peeling</strong>.
               </p>
             </div>
           </div>

           <div className="mt-auto bg-[#E84118] rounded-[13px] p-6 text-white shadow-lg shadow-red-900/40">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Smart Insights</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                A IA analisou os prontuários e recomenda focar esta estratégia em pacientes acima de 40 anos para aumentar a conversão.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SecondBrainView;
