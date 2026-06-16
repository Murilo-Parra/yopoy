import React, { useEffect, useState } from 'react';
import { useYopoyClient } from '../../frontend-api';
import { LogOut, ArrowLeft, RefreshCw, AlertTriangle, Send } from 'lucide-react';
import { SaleResponse } from '../../backend/dtos/sales.dto';

interface Props {
  theme: 'light' | 'dark';
}

export function YopoyCentralDashboard({ theme }: Props) {
  const client = useYopoyClient();

  const [sales, setSales] = useState<SaleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Actions states
  const [isCreatingSale, setIsCreatingSale] = useState(false);
  const [isOpeningCash, setIsOpeningCash] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const [cashBalance, setCashBalance] = useState<number | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const cashRes = await client.getCurrentCashSession();
      if (cashRes.success && cashRes.data) {
        setCashBalance(cashRes.data.initialBalance);
      } else {
        setCashBalance(null);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleCreateSale = async () => {
    setIsCreatingSale(true);
    const res = await client.createSale({ });
    
    if (res.success) {
      const saleId = res.data.id;
      await client.addSaleItem(saleId, { qty: 1, unitValue: 100 });
      await client.markSaleAsPendingPayment(saleId);
      alert('Venda criada com sucesso: ' + saleId);
    } else {
      alert('Erro: ' + (res as any).error?.message);
    }
    setIsCreatingSale(false);
  };

  const handleRegisterPayment = async () => {
    const res = await client.registerPayment({ amount: 100, method: 'PIX' });
    if (res.success) {
      alert('Pagamento registrado: ' + res.data.id);
    } else {
      alert('Erro: ' + (res as any).error?.message);
    }
  };

  const handleOpenCash = async () => {
    setIsOpeningCash(true);
    const res = await client.openCashSession(0);
    if (res.success) {
      fetchDashboardData();
      alert('Caixa aberto com sucesso!');
    } else {
      alert('Erro: ' + (res as any).error?.message);
    }
    setIsOpeningCash(false);
  };

  const handleTestFiscalBlock = async () => {
    const res = await client.emitirNFeRealBlocked();
    if (!res.success) {
      alert((res as any).error?.message);
    }
  };

  const handleSmartCapture = async () => {
    setIsCapturing(true);
    const res = await client.createSmartCaptureDraft('1x Cafe 5.00');
    if (res.success) {
      await client.reviewSmartCaptureDraft(res.data.id);
      await client.convertSmartCaptureDraftToSale(res.data.id, 5.00);
      alert('Captura inteligente convertida em venda!');
    } else {
      alert('Erro: ' + (res as any).error?.message);
    }
    setIsCapturing(false);
  };

  return (
    <div className={`p-6 space-y-6 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Central do Dia (Backend-Boundary Edition)</h2>
          <p className="text-sm opacity-70">Painel conectado aos handlers em-memória (Módulo 47.D).</p>
        </div>
        <button onClick={fetchDashboardData} className="p-2 bg-indigo-600 rounded text-white flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Atualizar
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800">
          <h3 className="font-bold">Caixa Atual</h3>
          <p className="text-2xl mt-2 font-mono">
            {cashBalance !== null ? `R$ ${cashBalance.toFixed(2)}` : 'Fechado/Não aberto'}
          </p>
          {cashBalance === null && (
            <button onClick={handleOpenCash} disabled={isOpeningCash} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded font-bold text-sm w-full">
              Abrir Caixa
            </button>
          )}
        </div>
        
        <div className="col-span-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center">
          <button onClick={handleCreateSale} disabled={isCreatingSale} className="px-4 py-2 bg-emerald-600 text-white rounded font-bold text-sm">
            Simular Venda Completa
          </button>
          <button onClick={handleRegisterPayment} className="px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm">
            Registrar Pagamento PIX
          </button>
          <button onClick={handleSmartCapture} disabled={isCapturing} className="px-4 py-2 bg-purple-600 text-white rounded font-bold text-sm flex items-center gap-2">
            <Send className="w-4 h-4" /> Smart Capture (Test)
          </button>
          <button onClick={handleTestFiscalBlock} className="px-4 py-2 bg-rose-600 text-white rounded font-bold text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Emitir NF-e (Bloqueado)
          </button>
        </div>
      </div>
      
      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-900 text-rose-600">
        <div className="flex items-center gap-2 mb-2 font-bold">
          <AlertTriangle className="w-5 h-5" /> Regras do Módulo 47.D Aplicadas
        </div>
        <ul className="list-disc pl-5 opacity-80 text-sm space-y-1">
          <li>As actions acima não manipulam estado local React, chamam diretamente a Backend Boundary (YopoyFrontendClient).</li>
          <li>Os handlers interagem com os InMemory Repositories via AppContainer.</li>
          <li>Qualquer interação fiscal está estritamente bloqueada.</li>
        </ul>
      </div>
    </div>
  );
}
