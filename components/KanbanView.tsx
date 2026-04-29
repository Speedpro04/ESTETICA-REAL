
import React, { useState, useEffect } from 'react';
import { Patient, PatientStatus } from '../types';
import { Clock, ArrowRight, MessageSquare, CheckCircle2, User, Activity, AlertCircle, GripVertical } from 'lucide-react';

interface KanbanViewProps {
  patients: Patient[];
  onUpdateStatus: (id: string, newStatus: PatientStatus) => void;
  onOpenPatient: (id: string) => void;
}

const getStatusStyles = (status: PatientStatus) => {
  switch (status) {
    case PatientStatus.WAITING:
      return { border: 'border-solara-border', text: 'text-solara-primary', dot: '#82ccdd' };
    case PatientStatus.CONFIRMED:
      return { border: 'border-solara-accent2', text: 'text-solara-accent2', dot: '#78e08f' };
    case PatientStatus.ATTENDING:
      return { border: 'border-solara-primary', text: 'text-solara-primary', dot: '#0a3d62' };
    case PatientStatus.FINISHED:
      return { border: 'border-slate-400', text: 'text-slate-500', dot: '#94a3b8' };
    case PatientStatus.CANCELLED:
      return { border: 'border-solara-accent1', text: 'text-solara-accent1', dot: '#e55039' };
    default:
      return { border: 'border-slate-200', text: 'text-slate-600', dot: '#64748b' };
  }
};

const RealTimeClock: React.FC<{ arrivalTime: string }> = ({ arrivalTime }) => {
  const [mins, setMins] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const start = new Date(arrivalTime).getTime();
      const now = new Date().getTime();
      setMins(Math.max(0, Math.floor((now - start) / 60000)));
    };
    calculate();
    const timer = setInterval(calculate, 30000); 
    return () => clearInterval(timer);
  }, [arrivalTime]);

  return (
    <div className="flex items-center gap-1.5 font-extrabold text-solara-primary/50 text-xs uppercase tracking-widest">
      <Clock size={12} className="text-solara-accent2" />
      <span>Há {mins} min</span>
    </div>
  );
};

const KanbanView: React.FC<KanbanViewProps> = ({ patients, onUpdateStatus, onOpenPatient }) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [targetCol, setTargetCol] = useState<PatientStatus | null>(null);

  const columns: { title: string; status: PatientStatus }[] = [
    { title: 'Aguardando', status: PatientStatus.WAITING },
    { title: 'Confirmado', status: PatientStatus.CONFIRMED },
    { title: 'Em atendimento', status: PatientStatus.ATTENDING },
    { title: 'Finalizado', status: PatientStatus.FINISHED },
    { title: 'Cancelado', status: PatientStatus.CANCELLED },
  ];

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('patientId', id);
  };

  const onDrop = (e: React.DragEvent, status: PatientStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('patientId');
    if (id) onUpdateStatus(id, status);
    setDraggedId(null);
    setTargetCol(null);
  };

  return (
    <div className="h-full flex flex-col space-y-8 font-montserrat select-none animate-in fade-in duration-500">
      <div className="px-4">
        <h1 className="text-2xl font-extrabold text-solara-primary tracking-tighter uppercase leading-none">
          Agenda Kanban
        </h1>
        <p className="text-solara-text1 font-bold mt-2 text-xs uppercase tracking-[0.3em]">Gestão Operacional de Fluxo</p>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-10 flex-1 px-2 snap-x scrollbar-hide">
        {columns.map((col) => {
          const styles = getStatusStyles(col.status);
          const colPatients = patients.filter(p => p.status === col.status);
          return (
            <div 
              key={col.status} 
              className={`flex-1 min-w-[340px] flex flex-col rounded-solara transition-all duration-300 border-2 snap-center overflow-hidden ${
                targetCol === col.status ? 'bg-solara-accent2/10 border-dashed border-solara-accent2' : 'bg-solara-bg/20 border-transparent'
              }`}
              onDragOver={(e) => { e.preventDefault(); setTargetCol(col.status); }}
              onDrop={(e) => onDrop(e, col.status)}
              onDragLeave={() => setTargetCol(null)}
            >
              <div className="p-5 flex items-center justify-between bg-white border-b-2 border-solara-border/20 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: styles.dot }}></div>
                  <h3 className="font-extrabold text-solara-primary tracking-tighter text-xs uppercase italic">{col.title}</h3>
                </div>
                <span className="bg-solara-primary text-white text-xs font-extrabold px-3 py-1 rounded-solara border-2 border-solara-border">
                  {colPatients.length}
                </span>
              </div>

              <div className="p-4 flex-1 space-y-4 overflow-y-auto custom-scrollbar">
                {colPatients.map((patient) => {
                  return (
                    <div 
                      key={patient.id} 
                      className={`solara-card p-5 cursor-grab active:cursor-grabbing group relative transition-all ${
                        draggedId === patient.id ? 'opacity-20 translate-y-2' : 'opacity-100'
                      }`}
                      draggable
                      onDragStart={(e) => onDragStart(e, patient.id)}
                    >
                      {patient.isUrgent && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-solara-accent1 rounded-t-[5px]"></div>
                      )}

                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <GripVertical size={16} className="text-solara-border group-hover:text-solara-primary" />
                          <span className="text-xs font-extrabold text-solara-text1 uppercase tracking-widest">{patient.insurance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <RealTimeClock arrivalTime={patient.arrivalTime} />
                        </div>
                      </div>

                      <h4 className="font-normal text-solara-primary text-base mb-1 tracking-tighter uppercase leading-tight group-hover:text-solara-accent1 transition-colors">{patient.name}</h4>
                      <p className="text-xs font-bold text-solara-text1 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                        <Activity size={12} className="text-solara-accent2" />
                        {patient.specialty || 'Procedimento Geral'}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t-2 border-solara-border/10">
                         <button 
                           className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 rounded-solara hover:brightness-110 transition-all shadow-md active:scale-95"
                           title="WhatsApp"
                         >
                           <MessageSquare size={14} fill="currentColor" />
                           <span className="text-xs font-extrabold uppercase tracking-tighter">WhatsApp</span>
                         </button>
                         <button 
                           className="flex items-center justify-center gap-2 solara-button-secondary py-2 shadow-md active:scale-95"
                           onClick={() => onOpenPatient(patient.id)}
                         >
                           <CheckCircle2 size={14} />
                           <span className="text-xs font-extrabold uppercase tracking-tighter">Confirmar</span>
                         </button>
                      </div>
                    </div>
                  );
                })}

                {colPatients.length === 0 && (
                   <div className="h-48 flex flex-col items-center justify-center text-solara-border opacity-40 space-y-4 border-2 border-dashed border-solara-border rounded-solara bg-white/30 backdrop-blur-sm">
                     <CheckCircle2 size={32} />
                     <p className="text-xs font-extrabold uppercase tracking-[0.3em]">Fila Vazia</p>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanView;
