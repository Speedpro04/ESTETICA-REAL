
import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface AILoadingIndicatorProps {
  message?: string;
  variant?: 'default' | 'compact' | 'inline';
}

export const AILoadingIndicator: React.FC<AILoadingIndicatorProps> = ({ 
  message = 'Processando...', 
  variant = 'default' 
}) => {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-[#7ed6df] text-xs font-inter">
        <Loader2 size={14} className="animate-spin" />
        <span className="font-bold">{message}</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="inline-flex items-center gap-2 text-[#7ed6df] text-xs font-bold uppercase tracking-wider font-inter">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 border-2 border-[#7ed6df]/20 rounded-full"></div>
          <div className="absolute inset-0 border-2 border-[#7ed6df] rounded-full border-t-transparent animate-spin"></div>
        </div>
        {message}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-[#7ed6df]/5 px-4 py-2.5 rounded-xl border border-[#7ed6df]/20 animate-pulse-glow font-inter">
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 border-2 border-[#7ed6df]/20 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-[#7ed6df] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <div className="flex items-center gap-2">
        <Sparkles size={14} className="fill-[#7ed6df] text-[#7ed6df]" />
        <span className="text-[#7ed6df] text-xs font-bold uppercase tracking-wider">{message}</span>
      </div>
    </div>
  );
};

export const ProgressIndicator: React.FC<{ progress: number; message?: string }> = ({ 
  progress, 
  message = 'Processando' 
}) => (
  <div className="w-full font-inter">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-bold text-[#130f40] uppercase tracking-wider">{message}</span>
      <span className="text-xs font-bold text-[#7ed6df]">{Math.round(progress)}%</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#130f40] to-[#7ed6df] transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);
