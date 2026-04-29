import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MoreVertical, Plus, UserCheck, UserX, Clock, Calendar, X, Gem } from 'lucide-react';
import toast from 'react-hot-toast';

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  status: string;
  reg: string; // Registro Profissional (CRM, CRBM, etc.)
  phone: string;
  email?: string;
  color: string;
}

const SpecialistsView: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([
    { id: '1', name: 'Dra. Luana Rocha', specialty: 'Harmonização Facial', status: 'Ativo', reg: 'CRBM 12345', phone: '(11) 98888-1111', color: 'bg-emerald-500' },
    { id: '2', name: 'Dr. Ricardo Mendes', specialty: 'Estética Corporal', status: 'Ativo', reg: 'CRM 54321', phone: '(11) 98888-2222', color: 'bg-emerald-500' },
    { id: '3', name: 'Dra. Aline Souza', specialty: 'Dermatologia Estética', status: 'Férias', reg: 'CRM 67890', phone: '(11) 98888-3333', color: 'bg-amber-500' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', specialty: '', reg: '', phone: '', email: '', status: 'Ativo' });

  const handleSave = () => {
    if (!form.name.trim() || !form.specialty.trim()) {
      toast.error('Preencha nome e especialidade.');
      return;
    }
    const statusColors: Record<string, string> = {
      'Ativo': 'bg-emerald-500',
      'Inativo': 'bg-slate-400',
      'Férias': 'bg-amber-500',
    };
    const newSpec: Specialist = {
      id: Date.now().toString(),
      name: form.name,
      specialty: form.specialty,
      reg: form.reg,
      phone: form.phone,
      email: form.email,
      status: form.status,
      color: statusColors[form.status] || 'bg-emerald-500',
    };
    setSpecialists(prev => [...prev, newSpec]);
    setForm({ name: '', specialty: '', reg: '', phone: '', email: '', status: 'Ativo' });
    setIsModalOpen(false);
    toast.success('Especialista cadastrado no corpo clínico!');
  };

  const columns = [
    { title: 'Ativos hoje', status: 'Ativo', icon: UserCheck, color: 'text-emerald-500' },
    { title: 'Indisponíveis', status: 'Inativo', icon: UserX, color: 'text-slate-400' },
    { title: 'Ausente / Férias', status: 'Férias', icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold text-[#40407a] tracking-tight uppercase leading-none">Corpo Clínico Premium</h2>
          <p className="text-[#2f3640] text-xs font-extrabold uppercase tracking-[0.3em] mt-3 opacity-90">Gestão de Especialistas e Suítes de Atendimento</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#706fd3] text-white px-10 py-5 rounded-[13px] flex items-center gap-3 w-fit shadow-xl hover:scale-[1.02] active:scale-95 transition-all group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
          <span className="text-xs font-bold uppercase tracking-widest">Novo Especialista</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => {
          const colSpecialists = specialists.filter(s => s.status === col.status);
          return (
            <div key={col.title} className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-black/5 pb-5">
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-[13px] bg-white border border-black/5 shadow-sm ${col.color}`}>
                       <col.icon size={20} />
                    </div>
                    <h3 className="text-xs font-extrabold text-[#0a3d62] uppercase tracking-widest">{col.title}</h3>
                 </div>
                 <span className="text-xs font-extrabold text-[#2f3640] bg-white border border-black/5 px-3 py-1 rounded-[13px]">
                   {colSpecialists.length}
                 </span>
              </div>

              <div className="space-y-6">
                {colSpecialists.map((spec) => (
                  <div key={spec.id} className="bg-white/40 backdrop-blur-md p-8 rounded-[13px] border border-white/50 shadow-xl hover:shadow-2xl hover:border-[#7ed6df]/30 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7ed6df]/10 to-transparent blur-2xl"></div>
                    
                    <button className="absolute top-8 right-8 p-1.5 text-slate-300 hover:text-[#40407a] transition-all" title="Opções">
                       <MoreVertical size={20} />
                    </button>
                    
                    <div className="flex items-center gap-6 mb-8 relative z-10">
                       <div className={`w-16 h-16 rounded-[13px] flex items-center justify-center font-bold text-lg border-4 border-white shadow-xl ${spec.color} text-white`}>
                          {spec.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                       </div>
                       <div>
                          <h4 className="text-lg font-extrabold text-[#0a3d62] tracking-tight group-hover:text-[#706fd3] transition-colors">{spec.name}</h4>
                          <p className="text-xs font-extrabold text-[#7ed6df] uppercase tracking-widest mt-1.5">{spec.specialty}</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-8 relative z-10 border-l-2 border-[#40407a]/5 pl-6">
                       <div className="flex items-center gap-3 text-slate-500">
                          <Gem size={16} className="text-[#7ed6df]" />
                          <span className="text-xs font-extrabold text-[#2f3640] tracking-widest uppercase">{spec.reg}</span>
                       </div>
                       <div className="flex items-center gap-3 text-[#2f3640] mb-2">
                          <Phone size={16} className="text-[#7ed6df]" />
                          <span className="text-sm font-extrabold">{spec.phone}</span>
                       </div>
                    </div>

                    <div className="flex gap-3 relative z-10">
                       <button className="flex-1 bg-white border border-black/5 text-[#40407a] py-4 rounded-[13px] text-xs font-bold uppercase tracking-widest hover:bg-[#40407a] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm">
                          <Calendar size={16} /> Ver Agenda
                       </button>
                    </div>
                  </div>
                ))}

                {colSpecialists.length === 0 && (
                   <div className="py-20 border-2 border-dashed border-black/5 rounded-[13px] flex flex-col items-center justify-center opacity-20">
                      <Sparkles size={40} className="text-slate-300" />
                      <span className="text-xs font-bold uppercase tracking-widest mt-3">Sem registros</span>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-[#40407a]/40 backdrop-blur-md" />
          <div 
            className="relative bg-white rounded-[13px] shadow-2xl w-full max-w-lg p-12 animate-in zoom-in-95 duration-300 border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-2 text-slate-300 hover:text-red-500 transition-colors">
              <X size={24} />
            </button>

            <div className="mb-10">
              <h3 className="text-3xl font-bold text-[#40407a] tracking-tight uppercase">Novo Especialista</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Corpo Clínico Solara Estética</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Nome Completo</label>
                <input
                  type="text"
                  placeholder="Ex: Dra. Juliana Costa"
                  className="w-full bg-slate-50 border border-black/5 rounded-[13px] px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Especialidade</label>
                  <input
                    type="text"
                    placeholder="Ex: Harmonização"
                    className="w-full bg-slate-50 border border-black/5 rounded-[13px] px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all"
                    value={form.specialty}
                    onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Registro (CRM/BM)</label>
                  <input
                    type="text"
                    placeholder="CR0 00000"
                    className="w-full bg-slate-50 border border-black/5 rounded-[13px] px-6 py-5 text-base font-medium text-[#40407a] outline-none focus:border-[#706fd3] transition-all"
                    value={form.reg}
                    onChange={(e) => setForm({ ...form, reg: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-10 py-6 bg-[#40407a] text-white rounded-[13px] text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#474787] shadow-xl transition-all"
            >
              Cadastrar Especialista
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialistsView;
