
import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  UserCheck, 
  FileLock2, 
  Database,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const PrivacidadeView: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div>
        <h2 className="text-4xl font-light text-[#0a3d62] tracking-tighter uppercase leading-none italic">Segurança & Privacidade</h2>
        <p className="text-[#2f3640] font-black mt-3 text-[10px] uppercase tracking-[0.3em] opacity-90">Conformidade LGPD e Proteção de Dados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-[13px] bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/20">
               <ShieldCheck size={32} />
            </div>
            <div>
               <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest leading-none mb-2">Status LGPD</p>
               <h3 className="text-xl font-light text-[#0a3d62]">Conforme</h3>
               <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Certificado Ativo</span>
               </div>
            </div>
         </div>

         <div className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white shadow-xl flex items-center gap-6">
            <div className="w-16 h-16 rounded-[13px] bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/20">
               <Lock size={32} />
            </div>
            <div>
               <p className="text-[10px] font-black text-[#2f3640] uppercase tracking-widest leading-none mb-2">Criptografia</p>
               <h3 className="text-xl font-light text-[#0a3d62]">AES-256 bits</h3>
               <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#0a3d62] opacity-40">Dados Ponta-a-Ponta</span>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-[#0a3d62] to-[#0c4f7d] p-8 rounded-[13px] text-white shadow-2xl relative overflow-hidden flex items-center gap-6">
            <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 blur-[40px] rounded-full"></div>
            <div className="relative z-10 w-16 h-16 rounded-[13px] bg-white/10 flex items-center justify-center text-[#7ed6df] border border-white/20">
               <Database size={32} />
            </div>
            <div className="relative z-10">
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-none mb-2">Backups</p>
               <h3 className="text-xl font-light">Automático</h3>
               <p className="text-[9px] font-bold uppercase tracking-widest mt-2 opacity-60">Sincronizado há 4h</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-xl overflow-hidden min-h-[400px]">
           <div className="p-8 border-b border-black/5 bg-white/50">
              <h3 className="text-sm font-bold text-[#0a3d62] uppercase tracking-[0.15em]">Geração de Documentos</h3>
           </div>
           <div className="p-8 space-y-4">
              {[
                { title: 'Termo de Consentimento de Dados', desc: 'Para novos pacientes assinarem digitalmente.' },
                { title: 'Relatório de Atividades de Tratamento', desc: 'Histórico completo de quem acessou cada dado.' },
                { title: 'Política de Privacidade Interna', desc: 'Manual de conduta para recepcionistas e dentistas.' },
              ].map((doc, i) => (
                <div key={i} className="bg-white/80 p-6 rounded-[13px] border border-white shadow-sm flex items-center justify-between group hover:translate-x-2 transition-all cursor-pointer hover:bg-white">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-[13px] flex items-center justify-center text-slate-400 group-hover:text-[#0a3d62] transition-colors">
                         <FileLock2 size={24} />
                      </div>
                      <div>
                         <h4 className="text-[11px] font-black text-[#2f3640] uppercase tracking-widest mb-1">{doc.title}</h4>
                         <p className="text-[10px] font-black text-[#2f3640]">{doc.desc}</p>
                      </div>
                   </div>
                   <button className="bg-[#0a3d62] text-white p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all" title="Gerar documento">
                      <CheckCircle2 size={16} />
                   </button>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-5 bg-white/40 backdrop-blur-md rounded-[13px] border border-white/50 shadow-xl overflow-hidden flex flex-col">
           <div className="p-8 border-b border-black/5 bg-white/50">
              <h3 className="text-sm font-bold text-[#0a3d62] uppercase tracking-[0.15em]">Log de Acessos Recentes</h3>
           </div>
           <div className="p-8 space-y-6">
              {[
                { user: 'Admin', action: 'Visualizou CPF', patient: 'Ricardo M.', time: '14:20' },
                { user: 'Solara AI', action: 'Atualizou Prontuário', patient: 'Juliana S.', time: '13:45' },
                { user: 'Recepcionista', action: 'Gerou Lembrete', patient: 'Carlos F.', time: '11:10' },
              ].map((log, i) => (
                <div key={i} className="flex items-center gap-4 text-xs">
                   <div className="w-2 h-2 rounded-full bg-[#7ed6df]"></div>
                   <div className="flex-1">
                      <span className="font-bold text-[#0a3d62]">{log.user}</span>
                      <span className="text-slate-400 mx-2">●</span>
                      <span className="font-medium text-slate-500">{log.action}</span>
                      <span className="text-slate-400 mx-2">→</span>
                      <span className="text-[10px] font-bold text-[#0a3d62] opacity-40 uppercase tracking-widest">{log.patient}</span>
                   </div>
                   <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{log.time}</span>
                </div>
              ))}
              <button className="w-full py-4 mt-4 border-2 border-slate-100 text-slate-400 rounded-[13px] text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all">
                Ver Logs Completos
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacidadeView;
