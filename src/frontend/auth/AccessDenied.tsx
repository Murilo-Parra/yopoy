import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface AccessDeniedProps {
  onBack?: () => void;
}

export default function AccessDenied({ onBack }: AccessDeniedProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fade-in">
      <div className="p-4 bg-red-500/10 text-red-500 rounded-full mb-4 border border-red-500/20">
        <ShieldAlert className="w-12 h-12" id="denied-icon" />
      </div>

      <h1 className="text-lg font-black text-slate-100 uppercase tracking-widest mb-2" id="denied-title">
        Acesso não autorizado
      </h1>

      <p className="text-xs font-medium text-gray-400 max-w-md leading-relaxed mb-6" id="denied-desc">
        Seu usuário não possui permissão para acessar este módulo. Solicite liberação ao administrador da empresa.
      </p>

      {onBack && (
        <button
          onClick={onBack}
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase rounded-xl border border-slate-700 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
          id="denied-back-btn"
        >
          Voltar ao Painel
        </button>
      )}
    </div>
  );
}
