
import React, { useState } from 'react';
import { UserCircle2, Building2, CreditCard, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';

interface RegisterViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

const PLANS = [
  { id: 'essencial', name: 'Essencial', price: 'R$ 149', dentists: '1-2 dentistas', color: '#82ccdd' },
  { id: 'profissional', name: 'Profissional', price: 'R$ 299', dentists: '3-5 dentistas', color: '#f6851e', popular: true },
  { id: 'clinica', name: 'Clínica', price: 'R$ 499', dentists: '6-10 dentistas', color: '#7ed6df' },
];

const RegisterView: React.FC<RegisterViewProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('profissional');
  const [formData, setFormData] = useState({
    clinic_name: '',
    cnpj: '',
    admin_name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/clinics/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinic_name: formData.clinic_name,
          cnpj: formData.cnpj,
          email: formData.email,
          phone: formData.phone,
          admin_name: formData.admin_name,
          admin_password: formData.password,
          plan_type: selectedPlan,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Erro ao cadastrar.');
      }

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen premium-gradient flex items-center justify-center p-6 font-inter">
        <div className="w-full max-w-[480px] bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} className="text-green-400" />
          </div>
          <h2 className="text-white text-2xl font-normal uppercase tracking-tight mb-4">Cadastro Realizado!</h2>
          <p className="text-slate-400 text-sm font-normal leading-relaxed mb-8">
            Verifique seu email para confirmar sua conta. Depois, volte aqui e faça login para acessar o sistema.
          </p>
          <button
            onClick={onBack}
            className="w-full py-5 bg-[#7ed6df] text-[#0f172a] rounded-[20px] font-bold uppercase tracking-[0.2em] text-xs shadow-lg hover:brightness-110 transition-all"
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center p-6 font-inter relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-all group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Voltar ao Login
      </button>

      <div className="w-full max-w-[520px] bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-normal tracking-tight uppercase mb-2">Criar Conta</h1>
          <p className="text-[#82ccdd] text-xs font-bold uppercase tracking-[0.3em]">Assistente Solara</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8 px-4">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= s ? 'bg-[#f6851e] text-white' : 'bg-white/10 text-white/30'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-[2px] ${step > s ? 'bg-[#f6851e]' : 'bg-white/10'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 mb-8">
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Plano</span>
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Clínica</span>
          <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Conta</span>
        </div>

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Plano */}
          {step === 1 && (
            <div className="space-y-3">
              {PLANS.map(plan => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                    selectedPlan === plan.id
                      ? 'border-[#f6851e] bg-[#f6851e]/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-normal uppercase tracking-wider">{plan.name}</span>
                      {plan.popular && (
                        <span className="px-2 py-0.5 bg-[#f6851e] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-white/40 text-xs font-normal uppercase tracking-widest">{plan.dentists}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-lg font-normal">{plan.price}</span>
                    <span className="text-white/40 text-xs">/mês</span>
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-5 mt-4 bg-[#7ed6df] text-[#0f172a] rounded-[20px] font-bold uppercase tracking-[0.2em] text-xs shadow-lg hover:brightness-110 transition-all"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* STEP 2: Dados da Clínica */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Nome da Clínica</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Ex: Estética Premium BR"
                    value={formData.clinic_name}
                    onChange={e => updateField('clinic_name', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">CNPJ</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={formData.cnpj}
                    onChange={e => updateField('cnpj', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Telefone</label>
                <input
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={e => updateField('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-4 border border-white/10 text-white/50 rounded-[20px] font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.clinic_name || !formData.cnpj) {
                      setError('Preencha o nome da clínica e o CNPJ.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex-1 py-4 bg-[#7ed6df] text-[#0f172a] rounded-[20px] font-bold uppercase tracking-widest text-xs shadow-lg hover:brightness-110 transition-all"
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Conta do Admin */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Nome completo</label>
                <div className="relative">
                  <UserCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.admin_name}
                    onChange={e => updateField('admin_name', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={e => updateField('email', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={e => updateField('password', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Confirmar Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="password"
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={e => updateField('confirmPassword', e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm focus:border-[#7ed6df]/50 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-4 py-3 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-4 border border-white/10 text-white/50 rounded-[20px] font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                  ← Voltar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 bg-[#f6851e] text-white rounded-[20px] font-bold uppercase tracking-widest text-xs shadow-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? <><Loader2 size={14} className="animate-spin" /> Criando...</> : 'Criar Conta'}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2">
          <ShieldCheck size={12} className="text-[#7ed6df]" />
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Dados protegidos · LGPD</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
