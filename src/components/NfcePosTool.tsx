import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function NfcePosTool() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center text-rose-500 gap-4 bg-rose-50 dark:bg-[#1f1013] rounded-2xl border border-rose-200 dark:border-rose-900 mx-6 mt-6">
      <AlertTriangle className="w-16 h-16 animate-pulse" />
      <h2 className="text-2xl font-bold">Venda interna no balcão</h2>
      <p className="text-sm font-medium opacity-80 max-w-md">
        Área demonstrativa para controle interno. A NFC-e real permanece bloqueada, não é emitida e não está disponível no MVP.
      </p>
    </div>
  );
}
