import { Lead, LeadStatus, Appointment } from './types';

const now = new Date();
const getRecentTime = (minsAgo: number) => new Date(now.getTime() - minsAgo * 60000).toISOString();

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Mariana Silva',
    cpf: '123.456.789-01',
    birthDate: '1990-05-12',
    phone: '(11) 98888-0001',
    status: LeadStatus.LEAD,
    risk: 'ALTO',
    arrivalTime: '',
    alerts: [],
    lastVisit: '2024-12-10',
    specialty: 'Estética Facial',
    interestArea: 'Botox',
    leadSource: 'Instagram Ads',
    history: []
  },
  {
    id: '2',
    name: 'Carlos Eduardo',
    cpf: '123.456.789-02',
    birthDate: '1985-08-15',
    phone: '(11) 98888-0002',
    status: LeadStatus.QUALIFIED,
    risk: 'MEDIO',
    arrivalTime: '',
    alerts: [],
    lastVisit: '2024-11-20',
    specialty: 'Harmonização',
    interestArea: 'Preenchimento Labial',
    leadSource: 'WhatsApp',
    history: []
  },
  {
    id: '3',
    name: 'Ana Paula',
    cpf: '123.456.789-03',
    birthDate: '1982-03-25',
    phone: '(11) 98888-0003',
    status: LeadStatus.SCHEDULED,
    risk: 'ALTO',
    arrivalTime: '',
    alerts: ['Alergia a Iodo'],
    lastVisit: '2025-01-05',
    specialty: 'Bioestimulador',
    interestArea: 'Radiesse',
    leadSource: 'Indicação',
    history: []
  },
  {
    id: '4',
    name: 'Roberto Alves',
    cpf: '123.456.789-04',
    birthDate: '1975-06-10',
    phone: '(11) 98888-0004',
    status: LeadStatus.CONFIRMED,
    risk: 'ALTO',
    arrivalTime: '2025-02-15T14:00:00Z',
    alerts: [],
    lastVisit: '2024-10-15',
    specialty: 'Estética Corporal',
    interestArea: 'Criofrequência',
    leadSource: 'Facebook',
    history: []
  },
  {
    id: '5',
    name: 'Juliana Costa',
    cpf: '123.456.789-05',
    birthDate: '1995-12-01',
    phone: '(11) 98888-0005',
    status: LeadStatus.FINISHED,
    risk: 'BAIXO',
    arrivalTime: '2025-02-15T16:30:00Z',
    alerts: [],
    lastVisit: '2025-01-20',
    specialty: 'Limpeza de Pele',
    interestArea: 'Peeling Diamante',
    leadSource: 'Google',
    history: []
  }
];

export const mockAppointments: Appointment[] = [
  { id: 'a1', leadId: '1', leadName: 'Mariana Silva', date: '2025-02-15', time: '09:00', professional: 'Dra. Luana', specialty: 'Estética Facial', type: 'Aplicação Botox', isSpecialHour: false },
  { id: 'a2', leadId: '2', leadName: 'Carlos Eduardo', date: '2025-02-15', time: '11:30', professional: 'Dr. Ricardo', specialty: 'Harmonização', type: 'Preenchimento Labial', isSpecialHour: false },
  { id: 'a3', leadId: '3', leadName: 'Ana Paula', date: '2025-02-16', time: '10:00', professional: 'Dra. Luana', specialty: 'Bioestimulador', type: 'Avaliação', isSpecialHour: true },
];
