
import React, { useState } from 'react';
import { Mail, ShieldCheck, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

interface ForgotPasswordViewProps {
  onBack: () => void;
}

const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Informe seu email.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      await res.json();
      setSent(true);
    } catch (err) {
      setSent(true); // Não revelamos se o email existe ou não
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen premium-gradient flex items-center justify-center p-6 font-inter relative">
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/50 hover:text-white text-xs font-bold uppercase tracking-widest transition-all group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        Voltar ao Login
      </button>

      <div className="w-full max-w-[440px] bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
        {sent ? (
          // Tela de sucesso
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle size={40} className="text-green-400" />
            </div>
            <h2 className="text-white text-2xl font-normal uppercase tracking-tight mb-4">Email Enviado!</h2>
            <p className="text-slate-400 text-sm font-normal leading-relaxed mb-8">
              Se o email <strong className="text-white">{email}</strong> estiver cadastrado, você receberá um link para redefinir sua senha. Verifique também a pasta de spam.
            </p>
            <button
              onClick={onBack}
              className="w-full py-5 bg-[#7ed6df] text-[#0f172a] rounded-[20px] font-bold uppercase tracking-[0.2em] text-xs shadow-lg hover:brightness-110 transition-all"
            >
              Voltar ao Login
            </button>
          </div>
        ) : (
          // Formulário
          <>
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-[#f6851e]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={28} className="text-[#f6851e]" />
              </div>
              <h1 className="text-white text-2xl font-normal tracking-tight uppercase mb-3">Esqueceu a Senha?</h1>
              <p className="text-slate-400 text-xs font-normal leading-relaxed">
                Informe seu email cadastrado e enviaremos um link seguro para redefinir sua senha.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email da conta</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#7ed6df] transition-colors" size={20} />
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    autoFocus
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white text-base focus:border-[#7ed6df]/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600 font-normal"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl px-5 py-3 text-red-400 text-xs font-bold uppercase tracking-widest text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-[#f6851e] text-white rounded-[24px] font-bold uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_-10px_rgba(246,133,30,0.3)] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <><Loader2 size={16} className="animate-spin" /> Enviando...</> : 'Enviar Link de Recuperação'}
              </button>
            </form>
          </>
        )}

        <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-[#7ed6df]" />
          <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">Proteção LGPD</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
