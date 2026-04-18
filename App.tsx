import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Kanban, 
  Menu, 
  LogOut,
  ShieldCheck,
  UserCircle2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  MessageSquare,
  Stethoscope,
  DollarSign,
  Sparkles,
  BarChart3,
  Zap
} from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useSolaraStore } from './store';
import DashboardView from './components/DashboardView';
import PainelView from './components/PainelView';
import LeadListView from './components/LeadListView';
import LeadDetailView from './components/LeadDetailView';
import AgendaView from './components/AgendaView';
import FinanceiroView from './components/FinanceiroView';
import RecoveryView from './components/RecoveryView';
import AgendaAnalysisView from './components/AgendaAnalysisView';
import SpecialistsView from './components/SpecialistsView';
import CampanhasView from './components/CampanhasView';
import WhatsAppView from './components/WhatsAppView';
import NPSView from './components/NPSView';
import AutomacoesView from './components/AutomacoesView';
import PrivacidadeView from './components/PrivacidadeView';
import { CommandPalette } from './components/CommandPalette';
import SolaraAssistant from './components/SolaraAssistant';
import LandingView from './components/LandingView';
import RegisterView from './components/RegisterView';
import ForgotPasswordView from './components/ForgotPasswordView';
import { mockAppointments } from './mockData';

// Componente de Badge de Status do Topbar
const TopStatusBadge: React.FC<{ active?: boolean, label: string, color?: string }> = ({ active, label, color = "bg-green-500" }) => (
  <div className="bg-white/80 backdrop-blur-md border border-black/5 px-4 py-2 rounded-[13px] flex items-center gap-2.5 shadow-sm">
    <div className={`w-2 h-2 rounded-full ${active ? color : 'bg-slate-300'} ${active ? 'animate-pulse' : ''}`}></div>
    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2f3640] font-bold">{label}</span>
  </div>
);

// Módulo de Identificação do Usuário na Sidebar
const UserAccessModule: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => {
  const { currentUser } = useSolaraStore();
  if (!currentUser) return null;

  return (
    <div className={`mx-4 mt-2 mb-4 p-4 rounded-[13px] bg-white/5 border border-white/10 transition-all hover:bg-white/10 group ${collapsed ? 'px-2 items-center text-center' : ''} flex flex-col gap-3 backdrop-blur-md`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-[13px] bg-gradient-to-br from-[#7ed6df] to-[#00A3FF] flex items-center justify-center text-[#0f172a] shadow-lg shrink-0">
          <UserCircle2 size={collapsed ? 24 : 22} />
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden text-left">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest truncate leading-tight">
              {currentUser.name}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <ShieldCheck size={10} className="text-[#8d939e]" />
              <span className="text-[8px] font-black text-[#8d939e] uppercase tracking-[0.2em] whitespace-nowrap">
                UNIDADE SOLARA
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SolaraLogo: React.FC<{ collapsed?: boolean }> = ({ collapsed }) => (
  <div className={`flex items-center gap-4 transition-all duration-300 ${collapsed ? 'justify-center w-full' : ''}`}>
    <img 
      src="/sol_com_risco_em_baixo-removebg-preview.png" 
      alt="Solara Logo" 
      className={`${collapsed ? 'w-[63px] h-[63px]' : 'w-[79px] h-[79px]'} object-contain brightness-110`}
    />
    {!collapsed && (
      <div className="flex flex-col">
        <span className="text-xl font-black text-white tracking-widest uppercase leading-none">Solara</span>
        <span className="text-[9px] font-black text-[#7ed6df] uppercase tracking-[0.2em] mt-1">Estética</span>
      </div>
    )}
  </div>
);

const App: React.FC = () => {
  const { 
    activeTab, setActiveTab, 
    isSidebarOpen, setSidebarOpen, 
    leads, 
    selectedLeadId, setSelectedLeadId,
    updateLeadStatus, updateLead,
    currentUser, login, logout,
    privacyMode, togglePrivacyMode
  } = useSolaraStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSolaraOpen, setIsSolaraOpen] = useState(false);
  
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showLanding, setShowLanding] = useState(!currentUser);
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        setIsSolaraOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!userEmail.trim()) {
      setLoginError('Informe seu e-mail ou ID.');
      return;
    }
    if (!password.trim()) {
      setLoginError('Informe sua senha.');
      return;
    }
    setIsLoggingIn(true);
    try {
      await login(userEmail, password);
      setUserEmail('');
      setPassword('');
      setLoginError('');
    } catch (err) {
      setLoginError('E-mail ou senha incorretos.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLanding(true);
  };

  if (showLanding && !currentUser) {
    return <LandingView onEnterApp={() => { setShowLanding(false); setAuthScreen('login'); }} />;
  }

  if (!currentUser && authScreen === 'register') {
    return <RegisterView onBack={() => setAuthScreen('login')} onSuccess={() => setAuthScreen('login')} />;
  }

  if (!currentUser && authScreen === 'forgot') {
    return <ForgotPasswordView onBack={() => setAuthScreen('login')} />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#40407a] flex items-center justify-center p-6 font-inter relative">
        <Toaster position="top-right" />
        <button
          onClick={() => setShowLanding(true)}
          className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Voltar ao início
        </button>
        <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-2xl rounded-[13px] border border-white/10 p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500">
          <div className="flex justify-center mb-12">
            <SolaraLogo />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl font-black tracking-tight mb-4 uppercase leading-none">Solara Estética</h1>
            <p className="text-[#7ed6df] text-[9px] font-black uppercase tracking-[0.4em] opacity-90">Gestão Inteligente para Centros de Estética Avançada</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-3">
              <label htmlFor="login-email" className="text-[10px] font-bold text-[#2f3640] font-bold uppercase tracking-[0.2em] ml-1">E-mail ou usuário</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#7ed6df] transition-colors" size={20} />
                <input 
                  id="login-email"
                  type="text"
                  placeholder="E-mail ou ID"
                  className="w-full bg-white/5 border border-white/10 rounded-[13px] py-5 pl-[72px] pr-8 text-white text-base focus:border-[#7ed6df]/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 font-light"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="login-password" className="text-[10px] font-bold text-[#2f3640] font-bold uppercase tracking-[0.2em] ml-1">Senha</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#7ed6df] transition-colors" size={20} />
                <input 
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-[13px] py-5 pl-[72px] pr-16 text-white text-base focus:border-[#7ed6df]/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 font-light tracking-widest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-[13px] px-5 py-3 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                  {loginError}
                </div>
              )}
              <button 
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-6 bg-white text-[#0f172a] rounded-[13px] font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingIn ? 'Validando...' : 'Autenticar'}
              </button>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAuthScreen('register')}
                  className="w-full text-center text-[9px] text-white/30 font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Não tem conta? <span className="text-[#82ccdd]">Registrar Unidade</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthScreen('forgot')}
                  className="w-full text-center text-[9px] text-white/30 font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Recuperar acesso
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const renderView = () => {
    if (selectedLeadId && selectedLead) {
      return (
        <LeadDetailView 
          patient={selectedLead} 
          onBack={() => setSelectedLeadId(null)} 
          onUpdate={updateLead}
        />
      );
    }
    switch (activeTab) {
      case 'dashboard': return <DashboardView leads={leads} appointments={mockAppointments} onOpenLead={setSelectedLeadId} />;
      case 'agenda': return <AgendaView appointments={mockAppointments} />;
      case 'kanban': return <PainelView leads={leads} onUpdateStatus={updateLeadStatus} onOpenLead={setSelectedLeadId} />;
      case 'leads': return (
        <LeadListView 
          leads={leads.filter(l => l.name.toLowerCase().includes(debouncedQuery.toLowerCase()) || l.phone?.includes(debouncedQuery))} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          onOpenLead={setSelectedLeadId} 
        />
      );
      case 'whatsapp': return <WhatsAppView />;
      case 'specialists': return <SpecialistsView />;
      case 'finance': return <FinanceiroView />;
      case 'nps': return <NPSView />;
      case 'automations': return <AutomacoesView />;
      case 'privacy': return <PrivacidadeView />;
      case 'recovery': return <RecoveryView />;
      case 'campanhas': return <CampanhasView />;
      case 'agenda-analysis': return <AgendaAnalysisView />;
      default: return <DashboardView leads={leads} appointments={mockAppointments} onOpenLead={setSelectedLeadId} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-inter">
      <Toaster position="top-right" />
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
        leads={leads}
        onSelectLead={setSelectedLeadId}
      />
      
      <SolaraAssistant 
        isOpen={isSolaraOpen} 
        onClose={() => setIsSolaraOpen(false)} 
        context={{ activeTab, leadsCount: leads.length, currentUser }}
      />
      
      <aside 
        className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-[#40407a] text-white transition-all duration-300 flex flex-col z-50 shadow-[20px_0_60px_-15px_rgba(64,64,122,0.3)] relative`}
      >
        <div className="px-8 h-28 flex items-center mb-8 shrink-0">
          <SolaraLogo collapsed={!isSidebarOpen} />
        </div>
        
        <nav className="flex-1 pl-5 pr-[46px] space-y-2.5 overflow-y-auto custom-scrollbar">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'DASHBOARD' },
            { id: 'agenda', icon: Calendar, label: 'Agenda' },
            { id: 'kanban', icon: Kanban, label: 'Central Kanban' },
            { id: 'leads', icon: Users, label: 'Clientes / Leads' },
            { id: 'specialists', icon: Stethoscope, label: 'Especialistas' },
            { id: 'recovery', icon: Sparkles, label: 'IA de Recuperação' },
            { id: 'whatsapp', icon: MessageSquare, label: 'WhatsApp Live' },
            { id: 'nps', icon: BarChart3, label: 'NPS' },
            { id: 'automations', icon: Zap, label: 'Automações' },
            { id: 'privacy', icon: ShieldCheck, label: 'Privacidade' },
            { id: 'finance', icon: DollarSign, label: 'Cobranças' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-2.5 rounded-[13px] transition-all duration-300 group relative ${
                activeTab === item.id 
                  ? 'bg-white/20 text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] border border-white/10' 
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
              title={item.label}
            >
              <item.icon size={22} className={activeTab === item.id ? 'text-white' : 'text-white/30 group-hover:text-white'} />
              {isSidebarOpen && <span className="text-[11px] font-black uppercase tracking-[0.25em] leading-none text-left">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-8 border-t border-white/5">
          <UserAccessModule collapsed={!isSidebarOpen} />
          <button 
            onClick={handleLogout}
            className={`w-full flex items-center gap-5 p-4 text-white/30 hover:text-[#ff7675] transition-all font-bold uppercase text-[12px] tracking-widest group ${!isSidebarOpen ? 'justify-center' : ''}`}
            title="Encerrar Sessão"
          >
            <LogOut size={23} />
            {isSidebarOpen && <span>Sair do Sistema</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[#F0F2F5]">
        <header className="h-28 px-10 flex items-center justify-between z-40 shrink-0 relative bg-[#40407a] backdrop-blur-xl border-b border-white/5 shadow-2xl">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)} 
              className="p-3.5 bg-white border border-black/5 rounded-[13px] text-[#706fd3] hover:bg-slate-50 transition-all shadow-sm"
            >
              <Menu size={20} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Solara Estética Dashboard</h1>
              <p className="text-[9px] font-black text-[#7ed6df] uppercase tracking-[0.3em] mt-2 italic shadow-sm">SaaS especializado para clínicas de estética avançada</p>
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-4">
             <TopStatusBadge active label="Solara AI atendendo" />
             <TopStatusBadge label="Solicitar humano" active={false} />
             <TopStatusBadge label="Configurar clínica" active={false} />
             <div className="bg-[#706fd3] px-6 py-2.5 rounded-[13px] text-white font-mono text-sm tracking-widest shadow-lg shadow-[#706fd3]/20">
               01:36:52
             </div>
          </div>

          <div className="flex items-center justify-end gap-6">
            <button 
              onClick={togglePrivacyMode}
              className={`p-3.5 rounded-[13px] transition-all shadow-xl active:scale-95 flex items-center justify-center ${
                privacyMode ? 'bg-[#706fd3] text-white' : 'bg-white text-[#40407a]'
              }`}
              title={privacyMode ? "Mostrar valores" : "Ocultar valores"}
            >
              {privacyMode ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>

            <button 
              onClick={() => setIsSolaraOpen(true)}
              className="bg-[#7ed6df] text-[#40407a] px-8 py-3.5 rounded-[13px] text-[10px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#7ed6df]/20 flex items-center gap-2.5"
            >
              <Sparkles size={16} /> Solara AI
            </button>
            
            <div className="w-12 h-12 bg-[#7ed6df] rounded-[13px] flex items-center justify-center text-[#706fd3] font-black text-sm uppercase shadow-lg border border-white">
              {currentUser?.name.charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1140px] mx-auto p-12">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
