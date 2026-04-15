import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Lead, LeadStatus, MedicalRecord } from './types';
import { mockLeads } from './mockData';
import toast from 'react-hot-toast';

interface User {
  name: string;
  role: string;
  lastAccess: string;
  token?: string;
  tenant_id?: string;
}

interface SolaraState {
  leads: Lead[];
  isSidebarOpen: boolean;
  activeTab: 'dashboard' | 'agenda' | 'kanban' | 'leads' | 'conversations' | 'followups' | 'specialists' | 'finance' | 'recovery' | 'campanhas' | 'ai-assistant' | 'agenda-analysis' | 'settings' | 'whatsapp' | 'nps' | 'automations' | 'privacy' | 'second-brain';
  selectedLeadId: string | null;
  isLoading: boolean;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  currentUser: User | null;
  
  // Actions
  setSidebarOpen: (open: boolean) => void;
  setActiveTab: (tab: SolaraState['activeTab']) => void;
  setSelectedLeadId: (id: string | null) => void;
  setSyncStatus: (status: SolaraState['syncStatus']) => void;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  
  // Lead management
  updateLeadStatus: (id: string, status: LeadStatus) => Promise<void>;
  updateLead: (updatedLead: Lead) => Promise<void>;
  addMedicalRecord: (leadId: string, record: MedicalRecord) => Promise<void>;
  
  // Security/Privacy
  privacyMode: boolean;
  togglePrivacyMode: () => void;
  
  // n8n sync helper
  syncToN8N: (endpoint: string, data: any) => Promise<any>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'; 
const N8N_BASE_URL = ''; 

export const useSolaraStore = create<SolaraState>()(
  devtools(
    persist(
      (set, get) => ({
        leads: mockLeads,
        isSidebarOpen: true,
        activeTab: 'dashboard',
        selectedLeadId: null,
        isLoading: false,
        syncStatus: 'idle',
        currentUser: null,
        privacyMode: false,

        togglePrivacyMode: () => set(state => ({ privacyMode: !state.privacyMode })),

        setSidebarOpen: (open) => set({ isSidebarOpen: open }),
        setActiveTab: (tab) => set({ activeTab: tab, selectedLeadId: null }),
        setSelectedLeadId: (id) => set({ selectedLeadId: id }),
        setSyncStatus: (status) => set({ syncStatus: status }),
        
        login: async (email, password) => {
          set({ isLoading: true });
          try {
            const params = new URLSearchParams();
            params.append('username', email);
            if (password) params.append('password', password);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: params
            });

            if (!response.ok) {
              throw new Error('Credenciais inválidas');
            }
            
            const data = await response.json();
            
            set({ 
              currentUser: { 
                name: email.split('@')[0].toUpperCase(), 
                role: 'Super Admin', 
                lastAccess: new Date().toISOString(),
                token: data.access_token,
                tenant_id: data.tenant_id
              },
              isLoading: false
            });
            toast.success('Login realizado com sucesso!');
          } catch (error: any) {
            // Modo demo: se backend está offline, permite login local
            if (error?.message === 'Failed to fetch' || error?.name === 'TypeError') {
              set({ 
                currentUser: { 
                  name: email.split('@')[0].toUpperCase() || 'ADMIN', 
                  role: 'Super Admin (Demo)', 
                  lastAccess: new Date().toISOString()
                },
                isLoading: false
              });
              toast.success('Login em modo demonstração (backend offline)');
              return;
            }
            set({ isLoading: false });
            toast.error('Acesso negado: Verifique seu login/senha.');
            throw error;
          }
        },

        logout: () => {
          set({ currentUser: null, activeTab: 'dashboard', selectedLeadId: null });
          toast.success('Sessão encerrada com segurança');
        },

        updateLeadStatus: async (id, status) => {
          const previousLeads = get().leads;
          set({
            leads: previousLeads.map(l => 
              l.id === id ? { ...l, status, isSyncing: true } : l
            )
          });

          try {
            await get().syncToN8N('/update-status', { leadId: id, status });
            
            set({
              leads: get().leads.map(l => 
                l.id === id ? { ...l, isSyncing: false } : l
              )
            });
            toast.success(`Fluxo atualizado para ${status}`);
          } catch (error) {
            set({ leads: previousLeads });
            toast.error('Erro na sincronização de dados.');
          }
        },

        updateLead: async (updated) => {
          set(state => ({
            leads: state.leads.map(l => l.id === updated.id ? updated : l)
          }));
          
          get().syncToN8N('/update-lead', updated).catch(console.error);
        },

        addMedicalRecord: async (leadId, record) => {
          const lead = get().leads.find(l => l.id === leadId);
          if (!lead) return;

          const updatedLead = {
            ...lead,
            history: [record, ...lead.history]
          };

          set(state => ({
            leads: state.leads.map(l => l.id === leadId ? updatedLead : l)
          }));

          toast.success('Prontuário atualizado e assinado');
          get().syncToN8N('/new-record', { leadId, record }).catch(console.error);
        },

        syncToN8N: async (endpoint, data) => {
          set({ syncStatus: 'syncing' });
          
          if (!N8N_BASE_URL) {
            await new Promise(r => setTimeout(r, 1000));
            set({ syncStatus: 'success' });
            setTimeout(() => set({ syncStatus: 'idle' }), 2000);
            return;
          }
          
          try {
            const response = await fetch(`${N8N_BASE_URL}${endpoint}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                source: 'Painel Admin'
              })
            });

            if (!response.ok) throw new Error(`n8n sync failed: ${response.statusText}`);
            
            set({ syncStatus: 'success' });
            setTimeout(() => set({ syncStatus: 'idle' }), 2000);
            
            return response.json();
          } catch (error) {
            set({ syncStatus: 'error' });
            setTimeout(() => set({ syncStatus: 'idle' }), 3000);
            throw error;
          }
        }
      }),
      { name: 'solara-estetica-storage' }
    )
  )
);
