import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function NfseTool() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-rose-500 gap-4 bg-rose-50 dark:bg-[#1f1013] rounded-2xl border border-rose-200 dark:border-rose-900 mx-6 mt-6">
      <AlertTriangle className="w-16 h-16 animate-pulse" />
      <h2 className="text-2xl font-bold">Módulo fiscal bloqueado.</h2>
      <p className="text-sm font-medium opacity-80 max-w-md">
        O Yopoy ainda não está autorizado para emissão fiscal real. Use apenas pré-nota ou envio ao contador quando o fluxo correto existir.
      </p>
    </div>
  );
}
