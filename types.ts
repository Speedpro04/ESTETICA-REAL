export enum PatientStatus {
  SCHEDULED = 'Agendado',
  CONFIRMED = 'Confirmado',
  WAITING = 'Em espera',
  TRIAGE = 'Triagem',
  ATTENDING = 'Em atendimento',
  FINISHED = 'Finalizado',
  CANCELLED = 'Cancelado',
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  phone: string;
  insurance: string;
  status: PatientStatus;
  risk: 'BAIXO' | 'MEDIO' | 'ALTO';
  alerts: string[];
  history: MedicalRecord[];
  lastVisit: string;
  arrivalTime: string;
  isUrgent?: boolean;
  isSyncing?: boolean;
  specialty?: string; // Especialidade do atendimento atual
}

export interface MedicalRecord {
  id: string;
  date: string;
  professional: string;
  notes: string;
  summary?: string;
  procedure?: string; // Procedimento ou serviço realizado
  category?: string; // Categoria: Estética, Odontológica, Terapia, etc.
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string; // YYYY-MM-DD
  time: string;
  professional: string;
  specialty: string; // Ex: Dermatologia, Estética, Nutrição
  type: string; // Ex: Consulta, Retorno, Procedimento
  isSpecialHour: boolean;
}
