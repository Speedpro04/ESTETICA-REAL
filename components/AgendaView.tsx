import React, { useState } from 'react';
import { Appointment } from '../types';
import { Clock, User, Plus, Search, ChevronDown, Filter, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface AgendaViewProps {
  appointments: Appointment[];
}

const AgendaView: React.FC<AgendaViewProps> = ({ appointments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ patient: '', time: '', procedure: '', doctor: '', price: '' });

  const [consultations, setConsultations] = useState([
    { id: 1, patient: 'Marina Rodriguez', time: '08:00', procedure: 'Limpeza', status: 'confirmado', doctor: 'Dr. Carlos Mendes', price: 'R$ 180,00' },
    { id: 2, patient: 'Rafael Costa', time: '09:00', procedure: 'Canal', status: 'aguardando', doctor: 'Dra. Ana Paula', price: 'R$ 850,00' },
    { id: 3, patient: 'Juliana Santos', time: '10:00', procedure: 'Restauração', status: 'confirmado', doctor: 'Dr. Carlos Mendes', price: 'R$ 320,00' },
  ]);

  const availableSlots = [
    { time: '09:30', doctor: 'Dr. Carlos Mendes', duration: '30min' },
    { time: '13:00', doctor: 'Dra. Ana Paula', duration: '1h' },
    { time: '15:30', doctor: 'Dr. Carlos Mendes', duration: '30min' },
  ];

  const handleSave = () => {
    if (!form.patient.trim() || !form.time.trim()) {
      toast.error('Preencha paciente e horário.');
      return;
    }
    const newConsultation = {
      id: Date.now(),
      patient: form.patient,
      time: form.time,
      procedure: form.procedure || 'Consulta Geral',
      status: 'aguardando',
      doctor: form.doctor || 'A definir',
      price: form.price || 'A combinar',
    };
    setConsultations(prev => [...prev, newConsultation]);
    setForm({ patient: '', time: '', procedure: '', doctor: '', price: '' });
    setIsModalOpen(false);
    toast.success('Consulta agendada com sucesso!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 font-inter">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#0a3d62] tracking-tight uppercase leading-none">Agenda</h2>
          <p className="text-[#57606f] text-xs font-black uppercase tracking-widest mt-2 opacity-70">Gerencie consultas e horários disponíveis</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0a3d62] text-white px-8 py-4 rounded-[13px] font-black flex items-center gap-3 hover:brightness-110 shadow-lg shadow-[#0a3d62]/10 uppercase text-[11px] tracking-widest transition-all active:scale-95"
          title="Agendar nova consulta"
        >
          <Plus size={20} /> Nova consulta
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-6 rounded-[13px] border border-slate-200 shadow-sm flex flex-wrap items-center gap-8">
        <div className="flex items-center gap-3 text-[#0a3d62] font-black text-[11px] uppercase tracking-widest">
          <Filter size={18} /> Filtros:
        </div>
        
        <div className="flex items-center gap-6 flex-1">
          <div className="relative flex-1 max-w-xs">
            <select id="dentist-select" title="Selecionar Dentista" className="w-full bg-slate-50 border border-slate-200 rounded-[13px] px-5 py-3 text-xs font-black text-[#0a3d62] appearance-none cursor-pointer outline-none focus:border-[#7ed6df] transition-all uppercase tracking-widest">
              <option>Todos os dentistas</option>
              <option>Dr. Ricardo</option>
              <option>Dra. Luana</option>
            </select>
            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative flex-1 max-w-xs">
            <select id="procedure-select" title="Selecionar Procedimento" className="w-full bg-slate-50 border border-slate-200 rounded-[13px] px-5 py-3 text-xs font-black text-[#0a3d62] appearance-none cursor-pointer outline-none focus:border-[#7ed6df] transition-all uppercase tracking-widest">
              <option>Todos os procedimentos</option>
              <option>Limpeza</option>
              <option>Canal</option>
              <option>Extração</option>
            </select>
            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <button className="p-4 bg-slate-50 text-slate-400 rounded-[13px] hover:bg-slate-100 hover:text-[#0a3d62] transition-all active:scale-95" title="Pesquisar">
          <Search size={22} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scheduled Consultations */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="text-xs font-black text-[#0a3d62] uppercase tracking-[0.1em] mb-4">Consultas agendadas</h3>
          
          <div className="space-y-4">
             {consultations.map((app) => (
                <div key={app.id} className="bg-white rounded-[13px] p-6 border border-slate-200 shadow-sm flex items-center gap-8 hover:shadow-md transition-all group">
                  <div className="flex flex-col gap-3 w-28 shrink-0">
                     <span className={`text-[10px] font-black px-3 py-1.5 rounded-md text-center uppercase tracking-widest ${
                       app.status === 'confirmado' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                     }`}>
                       {app.status}
                     </span>
                     <div className="flex items-center gap-2 text-[#0a3d62] font-black text-base">
                       <Clock size={18} className="text-slate-400" />
                       {app.time}
                     </div>
                  </div>

                  <div className="flex-1">
                     <h4 className="text-lg font-black text-[#0a3d62] tracking-tight group-hover:text-[#e55039] transition-colors">{app.patient}</h4>
                     <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">{app.procedure}</p>
                  </div>

                  <div className="flex items-center gap-3 text-slate-400 font-black text-[11px] uppercase tracking-widest w-48">
                     <User size={16} />
                     {app.doctor}
                  </div>

                  <div className="flex items-center gap-8">
                     <span className="text-base font-black text-[#0a3d62]">{app.price}</span>
                     <button 
                      className="bg-slate-50 text-slate-500 px-6 py-3 rounded-[13px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 hover:text-[#0a3d62] transition-all active:scale-95"
                      title={`Ver detalhes de ${app.patient}`}
                     >
                       Detalhes
                     </button>
                  </div>
                </div>
             ))}
          </div>
        </div>

        {/* Right Column: Available Slots */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-black text-[#0a3d62] uppercase tracking-[0.1em] mb-4">Horários disponíveis</h3>
          
          <div className="space-y-4">
            {availableSlots.map((slot, i) => (
              <div key={i} className="bg-white rounded-[13px] p-6 border border-slate-200 shadow-sm hover:border-[#7ed6df]/50 transition-all group">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black text-[#0a3d62] tracking-tight">{slot.time}</p>
                    <p className="text-[11px] font-black text-slate-400 mt-1 uppercase tracking-widest">{slot.doctor}</p>
                    <p className="text-[10px] font-black text-[#7ed6df] mt-1.5 uppercase tracking-widest">{slot.duration}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setForm({ ...form, time: slot.time, doctor: slot.doctor });
                      setIsModalOpen(true);
                    }}
                    className="bg-slate-50 text-slate-400 px-6 py-3 rounded-[13px] text-[10px] font-black uppercase tracking-widest hover:bg-[#0a3d62] hover:text-white transition-all shadow-sm active:scale-95"
                    title={`Reservar horário ${slot.time}`}
                  >
                    Preencher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Nova Consulta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6" onClick={() => setIsModalOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div 
            className="relative bg-white rounded-[13px] shadow-2xl w-full max-w-lg p-8 animate-in zoom-in-95 fade-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-600 transition-colors rounded-[13px] hover:bg-slate-50">
              <X size={20} />
            </button>

            <h3 className="text-2xl font-black text-[#0a3d62] tracking-tight mb-2">Nova Consulta</h3>
            <p className="text-sm font-black text-slate-400 mb-8">Agende uma nova consulta</p>

            <div className="space-y-6">
              <div>
                <label htmlFor="appointment-patient" className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Paciente *</label>
                <input
                  id="appointment-patient"
                  type="text"
                  placeholder="Nome do paciente"
                  className="w-full border border-slate-200 rounded-[13px] px-5 py-4 text-base font-black text-[#0a3d62] outline-none focus:border-[#7ed6df] transition-all placeholder:text-slate-300"
                  value={form.patient}
                  onChange={(e) => setForm({ ...form, patient: e.target.value })}
                  title="Nome do paciente"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="appointment-time" className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Horário *</label>
                  <input
                    id="appointment-time"
                    type="time"
                    className="w-full border border-slate-200 rounded-[13px] px-5 py-4 text-base font-black text-[#0a3d62] outline-none focus:border-[#7ed6df] transition-all"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    title="Horário da consulta"
                  />
                </div>
                <div>
                  <label htmlFor="appointment-procedure" className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Procedimento</label>
                  <input
                    id="appointment-procedure"
                    type="text"
                    placeholder="Ex: Limpeza, Canal..."
                    className="w-full border border-slate-200 rounded-[13px] px-5 py-4 text-base font-black text-[#0a3d62] outline-none focus:border-[#7ed6df] transition-all placeholder:text-slate-300"
                    value={form.procedure}
                    onChange={(e) => setForm({ ...form, procedure: e.target.value })}
                    title="Procedimento estético"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="appointment-doctor" className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Dentista</label>
                  <select
                    id="appointment-doctor"
                    title="Selecionar dentista"
                    className="w-full border border-slate-200 rounded-[13px] px-5 py-4 text-base font-black text-[#0a3d62] outline-none focus:border-[#7ed6df] transition-all bg-white"
                    value={form.doctor}
                    onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  >
                    <option value="">Selecionar...</option>
                    <option value="Dr. Carlos Mendes">Dr. Carlos Mendes</option>
                    <option value="Dra. Ana Paula">Dra. Ana Paula</option>
                    <option value="Dr. Ricardo Mendes">Dr. Ricardo Mendes</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="appointment-price" className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Valor</label>
                  <input
                    id="appointment-price"
                    type="text"
                    placeholder="R$ 0,00"
                    className="w-full border border-slate-200 rounded-[13px] px-5 py-4 text-base font-black text-[#0a3d62] outline-none focus:border-[#7ed6df] transition-all placeholder:text-slate-300"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    title="Valor da consulta"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-4 border border-slate-200 rounded-[13px] text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                title="Cancelar agendamento"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-4 bg-[#0a3d62] text-white rounded-[13px] text-[11px] font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all active:scale-95"
                title="Confirmar agendamento"
              >
                Agendar Consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendaView;
