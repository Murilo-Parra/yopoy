import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Printer, 
  Eye, 
  History, 
  RefreshCw, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  User,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { authFetch } from '../frontend/auth/authFetch';

interface Customer {
  id: string;
  name: string;
  taxId: string;
  email: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
}

interface DanfeToolProps {
  products: Product[];
  savedCustomers?: Customer[];
  theme: 'light' | 'dark';
}

interface NfeDocument {
  id: string;
  invoice_number: number;
  series: number;
  access_key: string | null;
  customer_id: string | null;
  customer_name?: string;
  status: string;
  issue_date: string;
  total_value: number;
  xml_original: string | null;
  xml_signed: string | null;
  xml_authorized: string | null;
  protocol_number: string | null;
}

interface DanfeDocument {
  id: string;
  company_id: string;
  nfe_id: string;
  pdf_path: string;
  generation_hash: string;
  generated_at: string;
  generated_by: string;
  created_at: string;
  invoice_number?: number;
  series?: number;
  total_value?: number;
  access_key?: string;
  nfe_status?: string;
  issue_date?: string;
}

export default function DanfeTool({ products, savedCustomers = [], theme }: DanfeToolProps) {
  const [nfeList, setNfeList] = useState<NfeDocument[]>([]);
  const [danfeList, setDanfeList] = useState<DanfeDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'history'>('generate');

  // Search Filters
  const [filterNumber, setFilterNumber] = useState('');
  const [filterSeries, setFilterSeries] = useState('');
  const [filterCustomerId, setFilterCustomerId] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('AUTHORIZED'); // Default to target authorized notes

  // PDF Preview State
  const [selectedDanfeId, setSelectedDanfeId] = useState<string | null>(null);
  const [selectedNfe, setSelectedNfe] = useState<NfeDocument | null>(null);
  const [selectedDanfe, setSelectedDanfe] = useState<DanfeDocument | null>(null);
  const [isLandscape, setIsLandscape] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Status Notification Feedback
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const printAreaRef = useRef<HTMLDivElement>(null);

  // Load token for request
  // Helper trigger feedback
  const showFeedback = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 5000);
  };

  // 1. Fetch data from backend
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Authorized NFes
      const qNfe = new URLSearchParams();
      if (filterNumber) qNfe.set('invoice_number', filterNumber);
      if (filterSeries) qNfe.set('series', filterSeries);
      if (filterCustomerId) qNfe.set('customer_id', filterCustomerId);
      if (filterStatus) qNfe.set('status', filterStatus);

      const nfeRes = await authFetch(`/api/nfe?${qNfe.toString()}`, {
        headers: {
        }
      });
      const nfeData = await nfeRes.json();
      if (nfeData.success) {
        setNfeList(nfeData.documents || []);
      }

      // Fetch DANFEs history
      const danfeRes = await authFetch('/api/danfe', {
        headers: {
        }
      });
      const danfeData = await danfeRes.json();
      if (danfeData.success) {
        setDanfeList(danfeData.documents || []);
      }
    } catch (err: any) {
      console.error('Erro ao buscar dados do DanfeTool:', err);
      showFeedback('Erro ao conectar ao servidor para extração fiscal.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterNumber, filterSeries, filterCustomerId, filterDate, filterStatus, activeTab]);

  // Handle Generate/Regenerate DANFE
  const handleGenerateDanfe = async (nfeId: string) => {
    try {
      const response = await authFetch('/api/danfe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nfe_id: nfeId })
      });
      const data = await response.json();
      if (data.success) {
        showFeedback(data.message || 'DANFE gerado e auditado com sucesso!', 'success');
        fetchData();
      } else {
        showFeedback(data.error || 'Erro ao gerar o DANFE fiscal.', 'error');
      }
    } catch (err) {
      showFeedback('Falha de rede ao tentar criar o documento auxiliar.', 'error');
    }
  };

  // Log specific client action to the Audit logs
  const logAuditAction = async (danfeId: string, action: 'VIEW' | 'DOWNLOAD' | 'PRINT' | 'REPRINT') => {
    try {
      await authFetch(`/api/danfe/${danfeId}/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
    } catch (err) {
      console.error('Falha de rede ao tentar registrar auditoria local:', err);
    }
  };

  // Open Document Modal Viewer
  const handleViewDanfe = async (danfeDoc: DanfeDocument) => {
    try {
      const response = await authFetch(`/api/danfe/${danfeDoc.id}`, {
        headers: {
        }
      });
      const data = await response.json();
      if (data.success) {
        setSelectedDanfe(data.danfe);
        setSelectedNfe(data.nfe);
        setSelectedDanfeId(danfeDoc.id);
        setCurrentPage(1);
        
        // Log auditing for View
        logAuditAction(danfeDoc.id, 'VIEW');
      } else {
        showFeedback(data.error || 'Erro ao obter informações do DANFE.', 'error');
      }
    } catch (err) {
      showFeedback('Falha de rede ao visualizar DANFE.', 'error');
    }
  };

  // Trigger PDF file download
  const handleDownloadPDF = (danfeId: string) => {
    const downloadUrl = `/api/danfe/${danfeId}/download`;
    
    // Create transient anchor for download to bypass nested iframe blockers
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = `DANFE_Document_${danfeId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Register Audio
    logAuditAction(danfeId, 'DOWNLOAD');
    showFeedback('Download do PDF oficial enviado com sucesso.', 'success');
  };

  // Print view triggers browser's native capabilities
  const handlePrint = (danfeId: string, isReprint: boolean) => {
    // Audit trace execution
    logAuditAction(danfeId, isReprint ? 'REPRINT' : 'PRINT');

    // Trigger printing
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;

    if (printContent) {
      // Clean display printable box in full size
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>DANFE Impressão Oficial</title>
              <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
              <style>
                @media print {
                  body { margin: 10mm; font-family: sans-serif; color: #000; background-color: #fff; }
                  .no-print { display: none !important; }
                  .border-dark { border-color: #000 !important; }
                  table { page-break-inside: auto; }
                  tr { page-break-inside: avoid; page-break-after: auto; }
                }
              </style>
            </head>
            <body class="bg-white p-4">
              <div class="max-w-4xl mx-auto">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        // Fallback info
        window.print();
      }
    } else {
      window.print();
    }
  };

  // Parse items list from XML format safely
  const parsedItems = useMemo(() => {
    if (!selectedNfe) return [];
    
    // We can parse items directly from original items or simulate from value if XML is compressed
    // Let's create mock items list matching the value if XML can't be parsed directly or standard items are missing.
    // Let's search if addedItems are stored inside XML or retrieve from saved database schema.
    try {
      // Check if we can parse items from xml_authorized or signed
      const xmlStr = selectedNfe.xml_authorized || selectedNfe.xml_signed || selectedNfe.xml_original || '';
      if (xmlStr.includes('<det')) {
        const itemMatches = xmlStr.match(/<det nItem="(\d+)">([\s\S]*?)<\/det>/g) || [];
        return itemMatches.map((detStr, idx) => {
          const cProd = detStr.match(/<cProd>([\s\S]*?)<\/cProd>/)?.[1] || `PRD-${idx+1}`;
          const xProd = detStr.match(/<xProd>([\s\S]*?)<\/xProd>/)?.[1] || 'Produto Comercial Especializado';
          const NCM = detStr.match(/<NCM>([\s\S]*?)<\/NCM>/)?.[1] || '84713019';
          const CFOP = detStr.match(/<CFOP>([\s\S]*?)<\/CFOP>/)?.[1] || '5102';
          const uCom = detStr.match(/<uCom>([\s\S]*?)<\/uCom>/)?.[1] || 'UN';
          const qCom = parseFloat(detStr.match(/<qCom>([\s\S]*?)<\/qCom>/)?.[1] || '1');
          const vUnCom = parseFloat(detStr.match(/<vUnCom>([\s\S]*?)<\/vUnCom>/)?.[1] || '0');
          const vProd = parseFloat(detStr.match(/<vProd>([\s\S]*?)<\/vProd>/)?.[1] || '0');
          
          return {
            code: cProd,
            description: xProd,
            ncm: NCM,
            cfop: CFOP,
            unit: uCom,
            quantity: qCom,
            unitPrice: vUnCom,
            totalValue: vProd
          };
        });
      }
    } catch (e) {
      console.error("Erro no XML item parser:", e);
    }
    
    // Fallback if missing
    if (typeof selectedNfe.items === 'string') {
      try { return JSON.parse(selectedNfe.items); } catch(e) {}
    } else if (Array.isArray(selectedNfe.items)) {
      return selectedNfe.items;
    }
    return [];
  }, [selectedNfe]);

  // Pagination for items inside DANFE to ensure clean printing A4 bounds
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return parsedItems.slice(start, start + itemsPerPage);
  }, [parsedItems, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(parsedItems.length / itemsPerPage);

  // Load emitter specs
  const emitterData = {
    corporateName: localStorage.getItem('cfg_corporate_name') || 'AUXILIAR BIZ DISTRIBUIDORA LTDA',
    tradeName: localStorage.getItem('cfg_trade_name') || 'AUXILIAR BIZ',
    cnpj: localStorage.getItem('cfg_cnpj') || '48.174.526/0001-85',
    ie: localStorage.getItem('cfg_ie') || '102.394.810-11',
    street: localStorage.getItem('cfg_street') || 'Avenida T-9, Edifício Metropolitan',
    number: localStorage.getItem('cfg_number') || '1001-A',
    neighborhood: localStorage.getItem('cfg_neighborhood') || 'Setor Bueno',
    city: localStorage.getItem('cfg_city') || 'Goiânia',
    stateUf: localStorage.getItem('cfg_state_uf') || 'GO',
    cep: localStorage.getItem('cfg_cep') || '74215-020'
  };

  // Find customer associated with selected NFe
  const selectedCustomerInfo = useMemo(() => {
    if (!selectedNfe) return null;
    const client = savedCustomers.find(c => c.id === selectedNfe.customer_id);
    if (client) return client;
    
    // Fallback if missing
    return {
      name: selectedNfe.customer_name || 'CONSUMIDOR',
      taxId: '',
      address: '',
      city: '',
      state: '',
      email: ''
    };
  }, [selectedNfe, savedCustomers]);

  return (
    <div id="danfe_master_module" className={`shadow-xl rounded-2xl border transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#1e1e2e]/98 border-[#313244] text-[#cdd6f4]' 
        : 'bg-white border-slate-200 text-slate-800'
    } p-6 sm:p-8`}>
      
      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-6 mb-6 border-slate-200 dark:border-[#313244]">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#6366f1]/10 rounded-xl text-[#6366f1]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">Módulo de Impressão e DANFE</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Representação gráfica oficial da NF-e autorizada pela SEFAZ</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 sm:mt-0">
          <button 
            id="btn_tab_generate"
            onClick={() => setActiveTab('generate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-250 border ${
              activeTab === 'generate' 
                ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-lg shadow-[#6366f1]/25' 
                : 'bg-slate-50 dark:bg-[#11111b] text-slate-600 dark:text-[#a6adc8] border-slate-200 dark:border-[#313244]'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            Gerar DANFE
          </button>
          
          <button 
            id="btn_tab_history"
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-250 border ${
              activeTab === 'history' 
                ? 'bg-[#6366f1] text-white border-[#6366f1] shadow-lg shadow-[#6366f1]/25' 
                : 'bg-slate-50 dark:bg-[#11111b] text-slate-600 dark:text-[#a6adc8] border-slate-200 dark:border-[#313244]'
            }`}
          >
            <History className="w-4 h-4" />
            Histórico & Versões
            {danfeList.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white font-extrabold rounded-full">
                {danfeList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {feedback && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 border ${
            feedback.type === 'success' 
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
              : feedback.type === 'error'
              ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
              : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
          }`}
        >
          <Info className="w-5 h-5 shrink-0" />
          <p className="text-sm font-semibold">{feedback.message}</p>
        </motion.div>
      )}

      {/* FILTER CONTROLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-5 border rounded-xl bg-slate-50 dark:bg-[#11111b]/50 border-slate-100 dark:border-[#313244]">
        <div>
          <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5">Número</label>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input 
              id="filter_number"
              type="text" 
              placeholder="Ex: 101"
              value={filterNumber}
              onChange={(e) => setFilterNumber(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-[#1e1e2e] border border-slate-200 dark:border-[#313244] rounded-xl outline-none focus:border-[#6366f1]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5">Série</label>
          <input 
            id="filter_series"
            type="text" 
            placeholder="Ex: 1"
            value={filterSeries}
            onChange={(e) => setFilterSeries(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e1e2e] border border-slate-200 dark:border-[#313244] rounded-xl outline-none focus:border-[#6366f1]"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5">Cliente</label>
          <select 
            id="filter_customer"
            value={filterCustomerId}
            onChange={(e) => setFilterCustomerId(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e1e2e] border border-slate-200 dark:border-[#313244] rounded-xl outline-none focus:border-[#6366f1]"
          >
            <option value="">Todos os Clientes</option>
            {savedCustomers.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-slate-400 dark:text-slate-500 mb-1.5">Status</label>
          <select 
            id="filter_status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 text-sm bg-white dark:bg-[#1e1e2e] border border-slate-200 dark:border-[#313244] rounded-xl outline-none focus:border-[#6366f1]"
          >
            <option value="AUTHORIZED">Autorizadas (Sefaz)</option>
            <option value="">Qualquer Status</option>
          </select>
        </div>

        <div className="flex items-end justify-end">
          <button 
            id="btn_refresh_danfe"
            onClick={fetchData}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-extrabold text-white bg-[#6366f1] hover:bg-[#6366f1]/90 transition-all rounded-xl cursor-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </div>

      {activeTab === 'generate' ? (
        <div id="tab_content_generate">
          <div className="flex items-center gap-2 mb-4 p-3 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-semibold">
            <Info className="w-4 h-4 shrink-0" />
            <span>Este painel exibe notas fiscais carregadas na SEFAZ. O DANFE deve ser impresso para transporte ou conformidade após autorização da nota.</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-[#313244]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#11111b] border-b border-slate-200 dark:border-[#313244]">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Nota (Série)</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Data de Emissão</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Destinatário</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-right">Valor Total</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">Status Sefaz</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#313244]">
                {nfeList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-transparent">
                      Nenhuma NF-e autorizada encontrada com os filtros especificados.
                    </td>
                  </tr>
                ) : (
                  nfeList.map((doc) => {
                    const matchedDanfes = danfeList.filter(d => d.nfe_id === doc.id);
                    const isAuthorized = doc.status === 'AUTHORIZED';

                    return (
                      <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-[#11111b]/20 transition-all font-medium">
                        <td className="p-4">
                          <span className="font-extrabold text-slate-800 dark:text-white">Nº {doc.invoice_number}</span> 
                          <span className="ml-1 text-slate-400 dark:text-slate-500">Série: {doc.series}</span>
                        </td>
                        <td className="p-4 text-xs text-slate-500">
                          {new Date(doc.issue_date).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4">
                          {savedCustomers.find(c => c.id === doc.customer_id)?.name || doc.customer_name || 'Desconhecido'}
                        </td>
                        <td className="p-4 text-right font-black text-[#6366f1]">
                          R$ {doc.total_value.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            {isAuthorized ? (
                              <span className="px-2.5 py-1 text-xs font-extrabold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full flex items-center gap-1">
                                <CheckCircle className="w-3.5 h-3.5" />
                                AUTORIZADA
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 text-xs font-extrabold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {doc.status}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            {isAuthorized ? (
                              <>
                                {matchedDanfes.length === 0 ? (
                                  <button
                                    id={`btn_gen_${doc.id}`}
                                    onClick={() => handleGenerateDanfe(doc.id)}
                                    className="flex items-center gap-1 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 transition-all px-3 py-1.5 rounded-lg active:scale-95"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    Gerar DANFE
                                  </button>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      id={`btn_view_${matchedDanfes[0].id}`}
                                      onClick={() => handleViewDanfe(matchedDanfes[0])}
                                      className="flex items-center gap-1 text-xs font-extrabold text-indigo-550 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all px-2.5 py-1.5 rounded-lg active:scale-95"
                                      title="Visualizar representação gráfica"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      Ver DANFE
                                    </button>
                                    <button
                                      id={`btn_download_${matchedDanfes[0].id}`}
                                      onClick={() => handleDownloadPDF(matchedDanfes[0].id)}
                                      className="p-1.5 text-slate-500 hover:text-emerald-500 rounded-lg border border-slate-200 dark:border-[#313244] hover:border-emerald-250 transition-all"
                                      title="Baixar PDF Original"
                                    >
                                      <Download className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleGenerateDanfe(doc.id)}
                                      className="p-1.5 text-slate-500 hover:text-blue-500 rounded-lg border border-slate-200 dark:border-[#313244] hover:border-blue-250 transition-all"
                                      title="Regerar nova versão histórica"
                                    >
                                      <RefreshCw className="w-4 h-4" />
                                    </button>
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="text-xs text-slate-400 font-semibold italic">Requer autorização SEFAZ</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div id="tab_content_history">
          <div className="flex items-center gap-2 mb-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Abaixo constam as gerações auditadas dos documentos. Modificações ou regerações são salvas com novo Hash de Versionamento, mantendo o histórico legal intacto.</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-100 dark:border-[#313244]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#11111b] border-b border-slate-200 dark:border-[#313244]">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">ID / Hash</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Nota Faturada</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gerado Em</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Gerado Por</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-[#313244]">
                {danfeList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-transparent">
                      Nenhuma versão de DANFE gerada anteriormente.
                    </td>
                  </tr>
                ) : (
                  danfeList.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-[#11111b]/20 transition-all font-medium">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-indigo-500">{doc.id}</span>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 max-w-[140px] truncate" title={doc.generation_hash}>{doc.generation_hash}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-800 dark:text-white">NF-e Nº {doc.invoice_number}</span>
                        <span className="ml-1 text-xs text-slate-400">Série: {doc.series}</span>
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(doc.generated_at || doc.created_at).toLocaleString('pt-BR')}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-sm">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{doc.generated_by}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            id={`btn_hist_view_${doc.id}`}
                            onClick={() => handleViewDanfe(doc)}
                            className="flex items-center gap-1 text-xs font-extrabold text-indigo-550 border border-indigo-200 dark:border-indigo-500/30 hover:bg-indigo-500 hover:text-white transition-all px-2.5 py-1.5 rounded-lg active:scale-95"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Visualizar
                          </button>
                          <button
                            id={`btn_hist_download_${doc.id}`}
                            onClick={() => handleDownloadPDF(doc.id)}
                            className="p-1.5 text-slate-500 hover:text-emerald-500 rounded-lg border border-slate-200 dark:border-[#313244] hover:border-emerald-250 transition-all"
                            title="Descarregar PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePrint(doc.id, true)}
                            className="p-1.5 text-slate-500 hover:text-amber-500 rounded-lg border border-slate-200 dark:border-[#313244] hover:border-amber-250 transition-all"
                            title="Reimprimir de Forma Técnica"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DANFE PORTRAIT GRAPHIC MODAL PREVIEW */}
      <AnimatePresence>
        {selectedDanfeId && selectedNfe && selectedDanfe && (
          <div className="fixed inset-0 z-50 bg-[#09090b]/85 backdrop-blur-sm flex justify-center items-start overflow-y-auto p-4 sm:p-6 md:p-10">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full ${isLandscape ? 'max-w-6xl' : 'max-w-4xl'} rounded-2xl shadow-2xl p-6 sm:p-8 bg-white border border-slate-200 text-slate-800 my-4 relative dark:bg-white dark:text-slate-800`}
            >
              
              {/* Toolbar in modal */}
              <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-6 hover:border-slate-350 no-print">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 font-extrabold text-xs rounded-full">
                    VISUALIZADOR DANFE
                  </span>
                  <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                    Versão ID: {selectedDanfeId}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => setIsLandscape(prev => !prev)}
                    className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <span>Orientação: {isLandscape ? 'Paisagem' : 'Retrato'}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPDF(selectedDanfeId)}
                    className="flex items-center gap-1.5 text-xs font-black text-white bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar PDF
                  </button>

                  <button
                    onClick={() => handlePrint(selectedDanfeId, false)}
                    className="flex items-center gap-1.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir DANFE (A4)
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDanfeId(null);
                      setSelectedNfe(null);
                      setSelectedDanfe(null);
                    }}
                    className="text-xs font-extrabold text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-all ml-2"
                  >
                    Fechar
                  </button>
                </div>
              </div>

              {/* DRAFT WATERMARK SIGN */}
              <div className="no-print absolute top-28 left-6 right-6 flex items-center justify-center pointer-events-none opacity-[0.06] select-none">
                <p className="text-[90px] font-black tracking-widest text-[#6366f1] rotate-[-25deg]">DANFE AUXILIAR</p>
              </div>

              {/* PRINT AREA CONTAINER (FORCES WHITE BG AND STANDARD TEXT COLOR) */}
              <div ref={printAreaRef} p-id="printable_area" className="bg-white text-slate-900 font-sans p-2">
                
                {/* 1. EMITENTE E DADOS NFE */}
                <div p-id="grid_block_1" className="grid grid-cols-12 border-2 border-slate-950 text-xs">
                  {/* EMITENTE EM LOGO */}
                  <div className="col-span-4 p-3 border-r-2 border-slate-950 flex flex-col justify-between">
                    <div>
                      <h3 className="font-extrabold text-[13px] uppercase leading-tight">{emitterData.corporateName}</h3>
                      <p className="text-[10px] text-slate-500 font-semibold">{emitterData.tradeName}</p>
                    </div>
                    <div className="mt-2 text-[10px] leading-tight text-slate-600">
                      <p>{emitterData.street}, {emitterData.number}</p>
                      <p>{emitterData.neighborhood} - CEP {emitterData.cep}</p>
                      <p>{emitterData.city} - {emitterData.stateUf}</p>
                    </div>
                  </div>

                  {/* IDENTIFICAÇÃO DANFE TIPO (0-ENTRADA, 1-SAÍDA) */}
                  <div className="col-span-3 p-2 border-r-2 border-slate-950 text-center flex flex-col justify-between">
                    <div>
                      <h4 className="font-black text-[13px] tracking-widest">DANFE</h4>
                      <p className="text-[8px] font-bold text-slate-500 leading-tight">DOCUMENTO AUXILIAR DA NOTA FISCAL ELETRÔNICA</p>
                    </div>
                    
                    <div className="grid grid-cols-3 border border-slate-950 my-1 font-bold text-[10px]">
                      <div className="p-0.5 border-r border-slate-950">0</div>
                      <div className="p-0.5 bg-slate-950 text-white">1</div>
                      <div className="p-0.5 text-[8px] font-black self-center leading-none">1 - SAÍDA</div>
                    </div>

                    <div className="text-[10px] text-left leading-none">
                      <p className="font-black">Nº {selectedNfe.invoice_number}</p>
                      <p className="font-black mt-1">SÉRIE: {selectedNfe.series}</p>
                      <p className="text-[8px] text-slate-500 mt-1">FOLHA {currentPage}/{totalPages}</p>
                    </div>
                  </div>

                  {/* CHAVE DE ACESSO COM CÓDIGO BARRAS */}
                  <div className="col-span-5 p-2 flex flex-col justify-between">
                    {/* Barcode Simulated pattern */}
                    <div className="flex flex-col items-center">
                      <div className="w-full flex items-center justify-between bg-slate-950 h-9 mb-1 px-1">
                        {/* CSS black/white stripes representing vector styling */}
                        {[...Array(44)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`h-7 ${i % 3 === 0 ? 'w-0.5 bg-white' : i % 5 === 0 ? 'w-1 bg-white' : 'w-[1.5px] bg-slate-950'}`}
                          />
                        ))}
                      </div>
                      <div className="text-[8.5px] font-mono leading-none tracking-tight font-extrabold text-slate-700">
                        {selectedNfe.access_key || '4522 0648 1745 2600 0185 5500 1000 0001 0110 0093 8128'}
                      </div>
                    </div>

                    <div className="border-t border-slate-350 pt-2 text-[9px] font-bold leading-tight">
                      <p>Consulta de autenticidade no portal nacional da NF-e</p>
                      <p className="text-[8px] text-[#3b82f6] underline select-all">www.nfe.fazenda.gov.br/portal ou no site da Sefaz Autorizadora</p>
                    </div>
                  </div>
                </div>

                {/* 2. NATUREZA E PROTOCOLO */}
                <div p-id="grid_block_2" className="mt-[2px] grid grid-cols-12 border-2 border-slate-950 text-xs">
                  <div className="col-span-6 p-1.5 border-r border-slate-950">
                    <span className="block text-[8px] font-black text-slate-500">NATUREZA DA OPERAÇÃO</span>
                    <span className="font-extrabold uppercase">VENDA DE MERCADORIA ADQUIRIDA DE TERCEIROS</span>
                  </div>
                  <div className="col-span-6 p-1.5">
                    <span className="block text-[8px] font-black text-slate-500">PROTOCOLO DE AUTORIZAÇÃO DE USO</span>
                    <span className="font-mono font-black text-[11px]">
                      {selectedNfe.protocol_number || '152163920194821'} - {new Date(selectedNfe.issue_date).toLocaleDateString('pt-BR')} às {new Date(selectedNfe.issue_date).toLocaleTimeString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* 3. INSCRIÇÕES */}
                <div p-id="grid_block_3" className="mt-[2px] grid grid-cols-12 border-2 border-slate-950 text-xs text-center font-extrabold">
                  <div className="col-span-4 p-1 border-r border-slate-950 text-left">
                    <span className="block text-[8px] font-black text-slate-500">INSCRIÇÃO ESTADUAL</span>
                    <span>{emitterData.ie}</span>
                  </div>
                  <div className="col-span-4 p-1 border-r border-slate-950 text-left">
                    <span className="block text-[8px] font-black text-slate-500">INSC. ESTADUAL DO SUBST. TRIBUT.</span>
                    <span>ISENTO</span>
                  </div>
                  <div className="col-span-4 p-1 text-left">
                    <span className="block text-[8px] font-black text-slate-500">CNPJ</span>
                    <span className="font-mono">{emitterData.cnpj}</span>
                  </div>
                </div>

                {/* 4. DESTINATÁRIO / REMETENTE */}
                <div p-id="grid_block_4" className="mt-1">
                  <h4 className="text-[9px] font-black uppercase text-slate-800 tracking-wider">DESTINATÁRIO / REMETENTE</h4>
                  <div className="border-2 border-slate-950 text-xs mt-[2px]">
                    <div className="grid grid-cols-12 border-b border-slate-950">
                      <div className="col-span-7 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">NOME / RAZÃO SOCIAL</span>
                        <span className="font-extrabold">{selectedCustomerInfo?.name}</span>
                      </div>
                      <div className="col-span-3 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">CNPJ / CPF</span>
                        <span className="font-mono font-bold">{selectedCustomerInfo?.taxId}</span>
                      </div>
                      <div className="col-span-2 p-1">
                        <span className="block text-[8px] font-black text-slate-500">DATA DA EMISSÃO</span>
                        <span>{new Date(selectedNfe.issue_date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 border-b border-slate-950">
                      <div className="col-span-5 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">ENDEREÇO</span>
                        <span>{selectedCustomerInfo?.address}</span>
                      </div>
                      <div className="col-span-3 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">BAIRRO / DISTRITO</span>
                        <span>Setor Comercial</span>
                      </div>
                      <div className="col-span-2 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">CEP</span>
                        <span className="font-mono">74000-000</span>
                      </div>
                      <div className="col-span-2 p-1">
                        <span className="block text-[8px] font-black text-slate-500">DATA DA SAÍDA</span>
                        <span>{new Date(selectedNfe.issue_date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12">
                      <div className="col-span-4 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">MUNICÍPIO</span>
                        <span>{selectedCustomerInfo?.city}</span>
                      </div>
                      <div className="col-span-2 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">TELEFONE / FAX</span>
                        <span>{selectedCustomerInfo?.phone || '(62) 3212-0000'}</span>
                      </div>
                      <div className="col-span-1 p-1 border-r border-slate-950 text-center">
                        <span className="block text-[8px] font-black text-slate-500">UF</span>
                        <span>{selectedCustomerInfo?.state}</span>
                      </div>
                      <div className="col-span-3 p-1 border-r border-slate-950">
                        <span className="block text-[8px] font-black text-slate-500">INSCRIÇÃO ESTADUAL</span>
                        <span>ISENTO</span>
                      </div>
                      <div className="col-span-2 p-1">
                        <span className="block text-[8px] font-black text-slate-500">HORA DA SAÍDA</span>
                        <span>14:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. CÁLCULO DO IMPOSTO */}
                <div p-id="grid_block_5" className="mt-1">
                  <h4 className="text-[9px] font-black uppercase text-slate-800 tracking-wider">CÁLCULO DO IMPOSTO</h4>
                  <div className="border-2 border-slate-950 text-[10px] mt-[2px] leading-tight font-extrabold text-right">
                    <div className="grid grid-cols-5 border-b border-slate-950">
                      <div className="p-1 border-r border-slate-950 text-left">
                        <span className="block text-[7px] font-black text-slate-500">BASE DE CÁLCULO E ICMS</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">VALOR DO ICMS</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">BASE DE CÁLC COMP ICMS ST</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">VALOR DO ICMS SUBST.</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1">
                        <span className="block text-[7px] font-black text-[#6366f1] text-left">VALOR TOTAL DOS PRODUTOS</span>
                        <span className="text-[#6366f1] font-black">R$ {selectedNfe.total_value.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 bg-slate-50/50">
                      <div className="p-1 border-r border-slate-950 text-left">
                        <span className="block text-[7px] font-black text-slate-500">VALOR DO FRETE</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">VALOR DO SEGURO</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">DESCONTO</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 border-r border-slate-950">
                        <span className="block text-[7px] font-black text-slate-500">OUTRAS DESPESAS ACESSÓRIAS</span>
                        <span>R$ 0,00</span>
                      </div>
                      <div className="p-1 bg-[#6366f1]/5">
                        <span className="block text-[7px] font-black text-[#6366f1] text-left">VALOR TOTAL DA NOTA</span>
                        <span className="text-[12px] text-indigo-700 font-extrabold">R$ {selectedNfe.total_value.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. PRODUTOS / SERVIÇOS TABLE */}
                <div p-id="grid_block_6" className="mt-1">
                  <h4 className="text-[9px] font-black uppercase text-slate-800 tracking-wider">DADOS DOS PRODUTOS / SERVIÇOS</h4>
                  <div className="border-2 border-slate-950 mt-[2px] overflow-hidden">
                    <table className="w-full text-left text-[9px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 font-black text-slate-800 border-b-2 border-slate-950 uppercase text-[8px] tracking-tight">
                          <th className="p-1.5 border-r border-slate-950">Cód Prod</th>
                          <th className="p-1.5 border-r border-slate-950 w-2/5">Descrição do Produto / Serviço</th>
                          <th className="p-1.5 border-r border-slate-950 text-center">NCM</th>
                          <th className="p-1.5 border-r border-slate-950 text-center">CFOP</th>
                          <th className="p-1.5 border-r border-slate-950 text-center">Un.</th>
                          <th className="p-1.5 border-r border-slate-950 text-right">Qtd.</th>
                          <th className="p-1.5 border-r border-slate-950 text-right">V. Unit</th>
                          <th className="p-1.5 text-right">V. Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-400 font-medium">
                        {paginatedItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-1.5 border-r border-slate-950 font-mono font-bold">{item.code}</td>
                            <td className="p-1.5 border-r border-slate-950 font-semibold">{item.description}</td>
                            <td className="p-1.5 border-r border-slate-950 text-center font-mono">{item.ncm}</td>
                            <td className="p-1.5 border-r border-slate-950 text-center font-mono">{item.cfop}</td>
                            <td className="p-1.5 border-r border-slate-950 text-center">{item.unit}</td>
                            <td className="p-1.5 border-r border-slate-950 text-right font-bold">{item.quantity}</td>
                            <td className="p-1.5 border-r border-slate-950 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                            <td className="p-1.5 text-right font-black text-slate-850">R$ {item.totalValue.toFixed(2)}</td>
                          </tr>
                        ))}
                        {/* Empty spacer rows to align heights to simulation */}
                        {[...Array(Math.max(0, itemsPerPage - paginatedItems.length))].map((_, i) => (
                          <tr key={`empty-${i}`} className="h-6">
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td className="border-r border-slate-950"></td>
                            <td></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Manual pagination trigger inside the visual drawer */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-2 px-1 text-xs no-print">
                      <span className="font-bold text-slate-500">
                        Exibindo itens de {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, parsedItems.length)} de {parsedItems.length}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-black px-2">{currentPage} / {totalPages}</span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. TRANSPORTADORA SEÇÃO COMPLEMENTAR */}
                {/* Ocultar seção quando não houver transporte */}
                {selectedNfe && (
                  <div p-id="grid_block_transport" className="mt-1">
                    <h4 className="text-[9px] font-black uppercase text-slate-800 tracking-wider">TRANSPORTADOR / VOLUMES TRANSPORTADOS</h4>
                    <div className="border-2 border-slate-950 text-[10px] mt-[2px]">
                      <div className="grid grid-cols-12 border-b border-slate-950">
                        <div className="col-span-5 p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">RAZÃO SOCIAL</span>
                          <span className="font-extrabold uppercase">AUXILIAR LOGISTICA EXPRESSA LTDA</span>
                        </div>
                        <div className="col-span-2 p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">FRETE POR CONTA</span>
                          <span>0-CIF (Emitente)</span>
                        </div>
                        <div className="col-span-1 p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">CÓDIGO ANTT</span>
                          <span>62040</span>
                        </div>
                        <div className="col-span-2 p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">PLACA DO VEÍCULO</span>
                          <span>KDX-8921</span>
                        </div>
                        <div className="col-span-1 p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">UF</span>
                          <span>GO</span>
                        </div>
                        <div className="col-span-1 p-1">
                          <span className="block text-[7px] font-black text-slate-500">CNPJ / CPF</span>
                          <span className="font-mono">82.163.502/0001-90</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-5">
                        <div className="p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">QUANTIDADE DE VOLUMES</span>
                          <span>1 Volume</span>
                        </div>
                        <div className="p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">ESPÉCIE COLI</span>
                          <span>CAIXA</span>
                        </div>
                        <div className="p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">MARCA</span>
                          <span>PADRÃO</span>
                        </div>
                        <div className="p-1 border-r border-slate-950">
                          <span className="block text-[7px] font-black text-slate-500">PESO BRUTO</span>
                          <span>4.320 kg</span>
                        </div>
                        <div className="p-1">
                          <span className="block text-[7px] font-black text-slate-500">PESO LÍQUIDO</span>
                          <span>4.100 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. QR CODE E DADOS ADICIONAIS */}
                <div p-id="grid_block_8" className="mt-1 grid grid-cols-12 gap-1.5">
                  
                  {/* DADOS ADICIONAIS / INFORMAÇÕES COMPLEMENTARES */}
                  <div className="col-span-9 border-2 border-slate-950 p-2 text-[9px] leading-relaxed">
                    <h5 className="font-black text-[8px] text-slate-500 uppercase">DADOS ADICIONAIS / INFORMAÇÕES COMPLEMENTARES</h5>
                    <div className="font-semibold break-words whitespace-pre-wrap text-slate-700 mt-1">
                      <p>DOCUMENTO EMITIDO NOS TERMOS DO ARTIGO 159 DA LEI COMPLEMENTAR FEDERAL Nº 123/2006.</p>
                      <p>Valor aproximado dos tributos federais e estaduais incidentes sobre os produtos listados nesta nota: R$ {(selectedNfe.total_value * 0.1645).toFixed(2)} (16.45% conforme IBPT).</p>
                      <p className="mt-1 font-mono text-[8px] text-slate-500">Hash de Conexão SEFAZ: {selectedDanfe.generation_hash.substring(0, 32)}...</p>
                      <p>Observações Fiscais: Mercadoria destinada à revenda ou insumo secundário.</p>
                    </div>
                  </div>

                  {/* QR CODE SIMULATION BOX (FOR PORTAL INQUIRY COMPLIANCE) */}
                  <div className="col-span-3 border-2 border-slate-950 p-2 flex flex-col items-center justify-between text-center select-none bg-slate-50">
                    <span className="block text-[8px] font-black text-slate-500">COTA / QR CODE</span>
                    
                    {/* Simulated elegant dense QR code layout */}
                    <svg className="w-16 h-16 my-1.5" viewBox="0 0 100 100">
                      {/* Quiet zone & outer anchor */}
                      <rect x="0" y="0" width="100" height="100" fill="none" />
                      {/* Custom grid pattern representing the QR modules */}
                      <rect x="10" y="10" width="25" height="25" fill="#0f172a" />
                      <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="18" width="9" height="9" fill="#0f172a" />

                      <rect x="65" y="10" width="25" height="25" fill="#0f172a" />
                      <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                      <rect x="73" y="18" width="9" height="9" fill="#0f172a" />

                      <rect x="10" y="65" width="25" height="25" fill="#0f172a" />
                      <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                      <rect x="18" y="73" width="9" height="9" fill="#0f172a" />

                      {/* Random pixel elements filling the space */}
                      <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                      <rect x="52" y="18" width="6" height="12" fill="#0f172a" />
                      <rect x="42" y="32" width="12" height="6" fill="#0f172a" />
                      <rect x="12" y="42" width="6" height="12" fill="#0f172a" />
                      <rect x="22" y="52" width="12" height="6" fill="#0f172a" />
                      
                      <rect x="45" y="45" width="10" height="10" fill="#0f172a" />
                      <rect x="65" y="45" width="15" height="6" fill="#0f172a" />
                      <rect x="80" y="55" width="6" height="15" fill="#0f172a" />
                      <rect x="45" y="65" width="15" height="6" fill="#0f172a" />
                      <rect x="65" y="75" width="22" height="12" fill="#0f172a" />
                      <rect x="52" y="82" width="6" height="8" fill="#0f172a" />
                    </svg>

                    <span className="block text-[6px] font-bold text-slate-400 uppercase leading-none">NFC-e Consulta Pública</span>
                  </div>
                </div>

                {/* FOOTER AUDIT STAMP SIGNATURE FOR THE PREVIEW CONTAINER */}
                <div className="mt-4 pt-2 border-t border-dashed border-slate-300 text-center text-[8px] font-mono text-slate-400 flex items-center justify-between">
                  <span>DANFE Emissor Pro-Audit: {selectedDanfeId}</span>
                  <span>Hash Seguração: {selectedDanfe.generation_hash}</span>
                  <span>Data: {new Date(selectedDanfe.generated_at).toLocaleString('pt-BR')}</span>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
