export enum LeadStatus {
  LEAD = 'Novo Lead',
  QUALIFIED = 'Qualificado',
  SCHEDULED = 'Agendado',
  CONFIRMED = 'Confirmado',
  WAITING = 'Em espera',
  TRIAGE = 'Triagem',
  ATTENDING = 'Em atendimento',
  FINISHED = 'Finalizado',
  CANCELLED = 'Cancelado',
  RECOVERY = 'Recuperação',
}

export interface Lead {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  insurance?: string; // Convênio (menos comum na estética, mas mantido como opcional)
  status: LeadStatus;
  risk: 'BAIXO' | 'MEDIO' | 'ALTO';
  alerts: string[];
  history: MedicalRecord[];
  lastVisit: string;
  arrivalTime: string;
  isUrgent?: boolean;
  isSyncing?: boolean;
  specialty?: string; // Especialidade (Estética, Harmonização, etc.)
  interestArea?: string; // Área de interesse específico do lead
  leadSource?: string; // Origem (Instagram, WhatsApp, Facebook)
}

export interface MedicalRecord {
  id: string;
  date: string;
  professional: string;
  notes: string;
  summary?: string;
  procedure?: string; // Procedimento realizado
  category?: string; // Categoria: Facial, Corporal, etc.
}

export interface Appointment {
  id: string;
  leadId: string;
  leadName: string;
  date: string; // YYYY-MM-DD
  time: string;
  professional: string;
  specialty: string; 
  type: string; // Ex: Aplicação Botox, Bioestimulador
  isSpecialHour: boolean;
}
