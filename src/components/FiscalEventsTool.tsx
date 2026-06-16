import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileX, 
  FileEdit, 
  Slash, 
  Search, 
  Download, 
  History, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity, 
  SearchCode,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Customer {
  id: string;
  name: string;
  taxId: string;
  email: string;
  address: string;
  city: string;
  state: string;
}

interface FiscalEventsToolProps {
  products: any[];
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

interface FiscalEvent {
  id: string;
  document_id: string | null;
  event_type: "AUTHORIZATION" | "CORRECTION_LETTER" | "CANCELLATION" | "INVALIDATION" | "CONSULTATION" | "DOWNLOAD";
  event_sequence: number;
  protocol_number: string | null;
  status_code: string | null;
  status_message: string | null;
  event_xml?: string;
  response_xml?: string;
  created_by: string;
  created_at: string;
}

export default function FiscalEventsTool({ savedCustomers = [], theme }: FiscalEventsToolProps) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'cancel' | 'cce' | 'inutilizacao' | 'consulta'>('timeline');
  const [nfeList, setNfeList] = useState<NfeDocument[]>([]);
  const [eventsList, setEventsList] = useState<FiscalEvent[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Filtering for Timeline
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchText, setSearchText] = useState<string>('');

  // Cancellation state
  const [selectedNfeIdForCancel, setSelectedNfeIdForCancel] = useState<string>('');
  const [cancelReason, setCancelReason] = useState<string>('');
  const [cancelProtocol, setCancelProtocol] = useState<string>('');

  // CC-e state
  const [selectedNfeIdForCce, setSelectedNfeIdForCce] = useState<string>('');
  const [cceText, setCceText] = useState<string>('');
  const [cceSequence, setCceSequence] = useState<number>(1);

  // Invalidation Faixa state
  const [invalType, setInvalType] = useState<'NF-e' | 'NFC-e'>('NF-e');
  const [invalSeries, setInvalSeries] = useState<number>(1);
  const [invalNumberStart, setInvalNumberStart] = useState<string>('');
  const [invalNumberEnd, setInvalNumberEnd] = useState<string>('');
  const [invalReason, setInvalReason] = useState<string>('');

  // Sefaz Live Query state
  const [queryType, setQueryType] = useState<'key' | 'number' | 'protocol'>('key');
  const [queryParam, setQueryParam] = useState<string>('');
  const [queryResult, setQueryResult] = useState<any | null>(null);

  // Notification Banner
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Load standard NF-es and Fiscal Events
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch authorized/any notes
      const nfeRes = await fetch('/api/nfe');
      if (nfeRes.ok) {
        const data = await nfeRes.json();
        setNfeList(data.nfeList || []);
      }

      // 2. Fetch fiscal events
      const eventsRes = await fetch('/api/sefaz/events');
      if (eventsRes.ok) {
        const data = await eventsRes.json();
        setEventsList(data.events || []);
      }
    } catch (err: any) {
      console.error(err);
      triggerFeedback("Erro ao carregar dados do microsserviço fiscal.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const triggerFeedback = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 6000);
  };

  // 1. Submit Cancellation
  const handleCancelNfe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNfeIdForCancel) {
      triggerFeedback("Favor selecionar o documento NF-e para cancelamento.", "error");
      return;
    }
    if (cancelReason.length < 15) {
      triggerFeedback("A justificativa de cancelamento legal perante a SEFAZ deve ter no mínimo 15 caracteres.", "error");
      return;
    }
    if (!cancelProtocol) {
      triggerFeedback("O número do protocolo de autorização original é obrigatório.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/sefaz/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId: selectedNfeIdForCancel,
          reason: cancelReason,
          protocol: cancelProtocol
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerFeedback(`Cancelamento Homologado! Protocolo SEFAZ: ${data.eventProtocol}`, "success");
        setCancelReason('');
        setSelectedNfeIdForCancel('');
        setCancelProtocol('');
        fetchData();
      } else {
        triggerFeedback(data.error || `Erro de homologação SEFAZ: ${data.statusMessage || 'Rejeitado'}`, "error");
      }
    } catch (err: any) {
      triggerFeedback(`Erro de rede ou permissão insuficiente: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // 2. Submit CC-e Letter of Correction
  const handleCceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNfeIdForCce) {
      triggerFeedback("Favor selecionar o documento NF-e para vincular a Carta de Correção.", "error");
      return;
    }
    if (cceText.length < 15) {
      triggerFeedback("O texto de correção legal deve conter no mínimo 15 caracteres.", "error");
      return;
    }
    if (cceText.length > 1000) {
      triggerFeedback("O texto não pode exceder o limite regulatório de 1000 caracteres.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/sefaz/cce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId: selectedNfeIdForCce,
          sequence: cceSequence,
          correctionText: cceText
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerFeedback(`Carta de Correção Registrada e Vinculada à Nota! Protocolo: ${data.protocolNumber}`, "success");
        setCceText('');
        setSelectedNfeIdForCce('');
        setCceSequence(prev => prev + 1);
        fetchData();
      } else {
        triggerFeedback(data.error || `Rejeição SEFAZ: ${data.statusMessage || 'Erro'}`, "error");
      }
    } catch (err: any) {
      triggerFeedback(`Erro de processamento: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // 3. Submit Invalidation
  const handleInvalidation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invalNumberStart) {
      triggerFeedback("Informe o número inicial da faixa fiscal a inutilizar.", "error");
      return;
    }
    if (invalReason.length < 15) {
      triggerFeedback("A justificativa legal deve conter no mínimo 15 caracteres.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/sefaz/invalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: invalType,
          series: Number(invalSeries),
          number: Number(invalNumberStart),
          numberEnd: invalNumberEnd ? Number(invalNumberEnd) : undefined,
          reason: invalReason
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerFeedback(`Numeração Inutilizada! Protocolo homologado: ${data.protocol}`, "success");
        setInvalNumberStart('');
        setInvalNumberEnd('');
        setInvalReason('');
        fetchData();
      } else {
        triggerFeedback(data.error || `Rejeição SEFAZ: ${data.statusMessage || 'Erro'}`, "error");
      }
    } catch (err: any) {
      triggerFeedback(`Falha técnica ao transmitir: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // 4. Submit Live Query
  const handleLiveQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryParam) {
      triggerFeedback("Por favor, digite o parâmetro para pesquisa na SEFAZ.", "error");
      return;
    }

    setQueryResult(null);
    setLoading(true);
    try {
      const res = await fetch('/api/sefaz/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryParam,
          queryType
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setQueryResult(data);
        triggerFeedback("Situação do documento e eventos sincronizada!", "success");
      } else {
        triggerFeedback(data.error || `Erro de retorno na consulta: ${data.statusMessage || 'Não Localizado'}`, "error");
      }
    } catch (err: any) {
      triggerFeedback(`Erro ao estabelecer conexão: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Download Action for Phases
  const downloadXmlPhase = (docId: string, type: string) => {
    const url = `/api/sefaz/download-document/${docId}?type=${type}`;
    // Criar tag temporária de Download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `NFe_${type}_${docId}.xml`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return eventsList.filter(evt => {
      if (filterType !== 'ALL' && evt.event_type !== filterType) return false;
      if (filterStatus !== 'ALL') {
        const isSuccess = evt.status_code === '101' || evt.status_code === '135' || evt.status_code === '102' || evt.status_code === '100';
        if (filterStatus === 'SUCCESS' && !isSuccess) return false;
        if (filterStatus === 'REJECTED' && isSuccess) return false;
      }
      if (searchText.trim() !== '') {
        const matchText = searchText.toLowerCase();
        const matchesDoc = evt.document_id?.toLowerCase().includes(matchText);
        const matchesProto = evt.protocol_number?.toLowerCase().includes(matchText);
        const matchesMsg = evt.status_message?.toLowerCase().includes(matchText);
        const matchesType = evt.event_type.toLowerCase().includes(matchText);
        return matchesDoc || matchesProto || matchesMsg || matchesType;
      }
      return true;
    });
  }, [eventsList, filterType, filterStatus, searchText]);

  // NF-es available for Cancellation
  const authorizedNfes = useMemo(() => {
    return nfeList.filter(n => n.status === 'AUTHORIZED');
  }, [nfeList]);

  // Set default cancellation fields when note changes
  const handleCancelNfeSelection = (id: string) => {
    setSelectedNfeIdForCancel(id);
    const selected = nfeList.find(n => n.id === id);
    if (selected && selected.protocol_number) {
      setCancelProtocol(selected.protocol_number);
    } else {
      setCancelProtocol('');
    }
  };

  return (
    <div id="fiscal-events-tool-root" className={`p-6 bg-white rounded-xl shadow-md border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-950 text-white' : 'border-zinc-200 text-zinc-900'} transition-all`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-200 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-bold tracking-tight">Eventos Fiscais de Documentos Autorizados</h1>
          </div>
          <p className="text-zinc-500 text-xs mt-1">
            Gerenciamento completo do ciclo de vida regulatório de NF-e e NFC-e pós-autorização (Cancelamento, CC-e, Inutilização, Consultas e Downloads).
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="mt-3 md:mt-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300 font-medium transition"
        >
          <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
          Sincronizar Eventos
        </button>
      </div>

      {/* Feedback Banner */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-lg mb-4 flex items-start gap-2.5 text-xs font-medium border ${
              feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300' :
              feedback.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-300' :
              'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-300'
            }`}
          >
            {feedback.type === 'success' ? <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 shrink-0 text-rose-500" />}
            <div>{feedback.message}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-200 dark:border-zinc-800 mb-6">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition -mb-px ${
            activeTab === 'timeline'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <History className="h-3.5 w-3.5" />
          Histórico e Timeline
        </button>
        <button
          onClick={() => setActiveTab('cancel')}
          className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition -mb-px ${
            activeTab === 'cancel'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <FileX className="h-3.5 w-3.5" />
          Cancelamento de Nota
        </button>
        <button
          onClick={() => setActiveTab('cce')}
          className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition -mb-px ${
            activeTab === 'cce'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <FileEdit className="h-3.5 w-3.5" />
          Carta de Correção (CC-e)
        </button>
        <button
          onClick={() => setActiveTab('inutilizacao')}
          className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition -mb-px ${
            activeTab === 'inutilizacao'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <Slash className="h-3.5 w-3.5 text-zinc-400" />
          Inutilização de Faixa
        </button>
        <button
          onClick={() => setActiveTab('consulta')}
          className={`px-4 py-2 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition -mb-px ${
            activeTab === 'consulta'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-zinc-300'
          }`}
        >
          <SearchCode className="h-3.5 w-3.5" />
          Consulta de Situação Live
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {/* Filters Control Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">Filtro por Tipo</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full text-xs p-2 rounded bg-white hover:bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700"
              >
                <option value="ALL">Qualquer Tipo</option>
                <option value="CANCELLATION">Cancelamento</option>
                <option value="CORRECTION_LETTER">Carta de Correção (CC-e)</option>
                <option value="INVALIDATION">Inutilização de Faixa</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">Status Sefaz</label>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="w-full text-xs p-2 rounded bg-white hover:bg-zinc-100 dark:bg-zinc-800 border dark:border-zinc-700"
              >
                <option value="ALL">Qualquer Status</option>
                <option value="SUCCESS">Homologados / Registrados</option>
                <option value="REJECTED">Rejeitados pelo Servidor</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-400 mb-1">Texto de Pesquisa</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Pesquise por chave, protocolo ou ocorrência..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  className="w-full text-xs p-2 pl-8.5 rounded bg-white dark:bg-zinc-800 border dark:border-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Timeline Display Card */}
          <div className="overflow-x-auto border rounded-xl dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-[10px] uppercase tracking-wider font-semibold text-zinc-500">
                  <th className="p-3">Evento / Data</th>
                  <th className="p-3">ID do Documento</th>
                  <th className="p-3">Seq</th>
                  <th className="p-3">Protocolo Homologado</th>
                  <th className="p-3">Código / Retorno SEFAZ</th>
                  <th className="p-3 text-right">Ação de Downloads</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-zinc-400">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Activity className="h-8 w-8 text-zinc-300" />
                        <span className="font-semibold">Nenhum evento registrado</span>
                        <span className="text-[10px]">Realize cancelamentos, envie cartas de correção ou faça inutilizações de números para visualizar o histórico de eventos da SEFAZ neste ambiente.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map(evt => {
                    const isSuccess = evt.status_code === '135' || evt.status_code === '101' || evt.status_code === '102' || evt.status_code === '100';
                    return (
                      <tr key={evt.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition">
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {evt.event_type === 'CANCELLATION' && <FileX className="h-4 w-4 text-rose-500" />}
                            {evt.event_type === 'CORRECTION_LETTER' && <FileEdit className="h-4 w-4 text-sky-500" />}
                            {evt.event_type === 'INVALIDATION' && <Slash className="h-4 w-4 text-purple-500" />}
                            <div>
                              <div className="font-bold">
                                {evt.event_type === 'CANCELLATION' && 'Cancelamento'}
                                {evt.event_type === 'CORRECTION_LETTER' && 'Carta de Correção'}
                                {evt.event_type === 'INVALIDATION' && 'Inutilização'}
                              </div>
                              <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(evt.created_at).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-mono text-[10px]">
                          {evt.document_id ? (
                            <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{evt.document_id}</span>
                          ) : (
                            <span className="text-zinc-400 italic">Global / Faixa</span>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold text-zinc-500">{evt.event_sequence}</td>
                        <td className="p-3 font-mono text-zinc-600 dark:text-zinc-300">{evt.protocol_number || <span className="text-zinc-400">N/A</span>}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`inline-block w-2 h-2 rounded-full ${isSuccess ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            <div>
                              <div className="font-bold">{evt.status_code}</div>
                              <div className="text-[10px] text-zinc-400 line-clamp-1 max-w-xs">{evt.status_message}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-right space-x-1 whitespace-nowrap">
                          {evt.document_id && (
                            <>
                              <button
                                onClick={() => downloadXmlPhase(evt.document_id!, 'original')}
                                title="Download XML Original"
                                className="p-1 rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition"
                              >
                                <Download className="h-3 w-3 inline" /> <span className="text-[10px]">Orig</span>
                              </button>
                              <button
                                onClick={() => downloadXmlPhase(evt.document_id!, 'authorized')}
                                title="Download XML Autorizado"
                                className="p-1 rounded bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 transition"
                              >
                                <Download className="h-3 w-3 inline" /> <span className="text-[10px]">Aut</span>
                              </button>
                            </>
                          )}
                          {evt.event_type === 'CANCELLATION' && evt.document_id && (
                            <button
                              onClick={() => downloadXmlPhase(evt.document_id!, 'cancellation')}
                              title="Download XML de Cancelamento"
                              className="p-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-900/30 text-rose-700 dark:text-rose-400 transition"
                            >
                              <Download className="h-3 w-3 inline" /> <span className="text-[10px]">Canc</span>
                            </button>
                          )}
                          {evt.event_type === 'CORRECTION_LETTER' && evt.document_id && (
                            <button
                              onClick={() => downloadXmlPhase(evt.document_id!, 'cce')}
                              title="Download XML de CC-e"
                              className="p-1 rounded bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/20 dark:hover:bg-sky-900/30 text-sky-700 dark:text-sky-400 transition"
                            >
                              <Download className="h-3 w-3 inline" /> <span className="text-[10px]">CCe</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cancelamento Tab */}
      {activeTab === 'cancel' && (
        <form onSubmit={handleCancelNfe} className="space-y-4 max-w-2xl">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex gap-3 text-xs text-amber-800 dark:text-amber-300">
            <Info className="h-5 w-5 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold">Regulamento de Cancelamento perante a SEFAZ:</span>
              <p className="mt-1">
                Uma NF-e autorizada somente pode ser cancelada dentro do prazo legal máximo especificado pela fazenda estadual (geralmente de 24 horas no modelo comercial). O cancelamento homologado gera um evento formal que invalida fiscalmente o documento mercantil.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5 U">Selecionar Nota Fiscal (Autorizada)</label>
            <select
              value={selectedNfeIdForCancel}
              onChange={e => handleCancelNfeSelection(e.target.value)}
              className="w-full text-xs p-2.5 rounded bg-white hover:bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Selecione uma nota fiscal homologada autorizada...</option>
              {authorizedNfes.map(n => (
                <option key={n.id} value={n.id}>
                  NF-e Nº {n.invoice_number} | Série: {n.series} | ID/Chave: {n.id.slice(0, 16)}... | Valor: R$ {Number(n.total_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">Protocolo de Autorização Original</label>
              <input
                type="text"
                placeholder="Obtido automaticamente da nota selecionada..."
                value={cancelProtocol}
                onChange={e => setCancelProtocol(e.target.value)}
                className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-450 mb-1.5 text-zinc-500">Mínimo de Caracteres Exigidos</label>
              <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded inline-block">15 caracteres (Regulamento SEFAZ)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">Justificativa Legal para Cancelamento</label>
            <textarea
              rows={3}
              placeholder="Digite detalhadamente a justificativa fiscal de cancelamento da nota (mínimo de 15 caracteres)..."
              value={cancelReason}
              onChange={e => setCancelReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-zinc-400 italic">
              {cancelReason.length} de no mínimo 15 caracteres digitados.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedNfeIdForCancel}
            className="w-full md:w-auto flex items-center justify-center gap-1.5 text-xs px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition disabled:opacity-50"
          >
            <FileX className="h-4 w-4" />
            Sinalizar Transmissão de Cancelamento para a SEFAZ
          </button>
        </form>
      )}

      {/* CC-e Tab */}
      {activeTab === 'cce' && (
        <form onSubmit={handleCceSubmit} className="space-y-4 max-w-2xl">
          <div className="bg-sky-50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-850 p-4 rounded-xl flex gap-3 text-xs text-sky-800 dark:text-sky-300">
            <Info className="h-5 w-5 text-sky-600 shrink-0" />
            <div>
              <span className="font-bold">Carta de Correção Eletrônica (CC-e) - Regras Restritas / Vedações:</span>
              <p className="mt-1">
                Conforme a legislação nacional, a CC-e <span className="font-bold underline">não</span> pode corrigir variáveis que modifiquem os valores totais dos tributos/impostos, o CPF do destinatário, as alíquotas de ICMS, valores monetários cruciais, ou a data de emissão do documento fiscal eletrônico.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5">Selecionar Nota Fiscal (Autorizada)</label>
            <select
              value={selectedNfeIdForCce}
              onChange={e => setSelectedNfeIdForCce(e.target.value)}
              className="w-full text-xs p-2.5 rounded bg-white hover:bg-zinc-50 dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">Selecione uma nota fiscal homologada autorizada...</option>
              {authorizedNfes.map(n => (
                <option key={n.id} value={n.id}>
                  NF-e Nº {n.invoice_number} | Série: {n.series} | Chave: {n.id.slice(0, 16)}... | Emitida em: {new Date(n.issue_date).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">Sequencial do Evento CC-e</label>
            <input
              type="number"
              min={1}
              value={cceSequence}
              onChange={e => setCceSequence(Number(e.target.value))}
              className="w-24 text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
            />
            <span className="text-[10px] text-zinc-400 block mt-1">Geralmente incrementado automaticamente caso envie múltiplas correções para a mesma nota fiscal.</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">Texto de Correção Regulamentar</label>
            <textarea
              rows={4}
              placeholder="Digite o texto explanativo discriminando a retificação na nota fiscal eletrônica corporativa..."
              value={cceText}
              onChange={e => setCceText(e.target.value)}
              className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-zinc-400 italic block mt-1">
              {cceText.length} de máx 1000 caracteres (mínimo de 15 caracteres exigidos).
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !selectedNfeIdForCce}
            className="w-full md:w-auto flex items-center justify-center gap-1.5 text-xs px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition disabled:opacity-50"
          >
            <FileEdit className="h-4 w-4" />
            Legalizar e Transmitir Carta CC-e para a SEFAZ
          </button>
        </form>
      )}

      {/* Inutilizacao Tab */}
      {activeTab === 'inutilizacao' && (
        <form onSubmit={handleInvalidation} className="space-y-4 max-w-2xl">
          <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-4 rounded-xl flex gap-3 text-xs text-purple-800 dark:text-purple-300">
            <Info className="h-5 w-5 text-purple-600 shrink-0" />
            <div>
              <span className="font-bold">Norma Geral de Inutilização Fiscal:</span>
              <p className="mt-1">
                A inutilização de numeração destina-se a sinalizar quebras na sequência cronológica de numeração fiscal decorrentes de erros de sistema ou pulos não faturados antes que tal número seja transmitido. <span className="font-bold underline">Não</span> é permitido inutilizar números que já constam faturados ou associados a notas em processamento.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5">Modelo Fiscal</label>
              <select
                value={invalType}
                onChange={e => setInvalType(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="NF-e">NF-e (Modelo 55)</option>
                <option value="NFC-e">NFC-e (Modelo 65)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 mb-1.5">Série Fiscal</label>
              <input
                type="number"
                min={1}
                value={invalSeries}
                onChange={e => setInvalSeries(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">De Nº</label>
                <input
                  type="number"
                  placeholder="Início"
                  value={invalNumberStart}
                  onChange={e => setInvalNumberStart(e.target.value)}
                  className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">Até Nº</label>
                <input
                  type="number"
                  placeholder="Fim (Opcional)"
                  value={invalNumberEnd}
                  onChange={e => setInvalNumberEnd(e.target.value)}
                  className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-400 mb-1.5 uppercase">Motivo técnico / Justificativa legal</label>
            <textarea
              rows={3}
              placeholder="Descreva minuciosamente o erro técnico motivador de saltar esta numeração fiscal (mínimo de 15 caracteres)..."
              value={invalReason}
              onChange={e => setInvalReason(e.target.value)}
              className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-zinc-400 italic">
              {invalReason.length} de mínimo 15 caracteres digitados.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading || !invalNumberStart}
            className="w-full md:w-auto flex items-center justify-center gap-1.5 text-xs px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-50"
          >
            <Slash className="h-4 w-4" />
            Inutilizar Faixa Sequencial na SEFAZ
          </button>
        </form>
      )}

      {/* Consulta Live Tab */}
      {activeTab === 'consulta' && (
        <div className="space-y-4">
          <form onSubmit={handleLiveQuery} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border dark:border-zinc-800 space-y-4">
            <h2 className="text-xs font-bold uppercase text-zinc-400 tracking-wider">Metodologia de Consulta da Situação da NF-e</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">Formato de Pesquisa</label>
                <select
                  value={queryType}
                  onChange={e => setQueryType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="key">Pela Chave de Acesso (44 dígitos)</option>
                  <option value="protocol">Pelo Número do Protocolo</option>
                  <option value="number">Pelo Número do Documento</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-zinc-400 mb-1.5">Código / Chave ou Protocolo</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Cole a chave de faturamento, protocolo correspondente ou número da nota fiscal..."
                    value={queryParam}
                    onChange={e => setQueryParam(e.target.value)}
                    className="w-full text-xs p-2.5 rounded bg-white dark:bg-zinc-900 border dark:border-zinc-800 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1.5 text-xs px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition disabled:opacity-50"
                  >
                    <Search className="h-4 w-4" />
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          </form>

          {/* Results Display */}
          <AnimatePresence>
            {queryResult && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="border rounded-xl p-5 space-y-4 dark:border-zinc-800 bg-white dark:bg-zinc-950"
              >
                <div className="flex justify-between items-center border-b pb-3 border-zinc-150 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-emerald-600" />
                    <h3 className="text-sm font-bold">Retorno Oficial do Webservice SEFAZ</h3>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-bold">
                    Código {queryResult.statusCode}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Mensagem da Receita</span>
                    <p className="font-bold text-zinc-800 dark:text-zinc-200 mt-0.5">{queryResult.statusMessage}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Data e Hora do Processamento</span>
                    <p className="font-bold mt-0.5 text-zinc-800 dark:text-zinc-200">
                      {new Date(queryResult.details.date).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400">Status Geral do Documento</span>
                    <p className="font-bold text-emerald-600 mt-0.5">{queryResult.details.status}</p>
                  </div>
                </div>

                {/* Local Event List */}
                <div className="space-y-2 mt-4">
                  <h4 className="text-xs font-bold tracking-tight text-zinc-400 uppercase flex items-center gap-1">
                    <Activity className="h-3.5 w-3.5 text-emerald-600" />
                    Seqüência de Eventos Fiscais Homologados Vinculados a esta Nota
                  </h4>
                  {queryResult.details.events.length === 0 ? (
                    <p className="text-zinc-400 text-xs italic">Nenhum evento fiscal de cancelamento ou CC-e registrado para este parâmetro.</p>
                  ) : (
                    <div className="space-y-2">
                      {queryResult.details.events.map((e: any) => (
                        <div key={e.id} className="p-3 bg-zinc-50 dark:bg-zinc-905 rounded border dark:border-zinc-800 flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold uppercase text-[10px] bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 px-1.5 py-0.5 rounded">
                              {e.type === 'CANCELLATION' ? 'Cancelamento de Nota' : 'Carta de Correção (CC-e)'}
                            </span>
                            <div className="text-[10px] text-zinc-400 mt-1">Registrado em: {new Date(e.created_at).toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="font-mono text-[10px]">Seq: {e.seq} | Prot: {e.protocol}</div>
                            <div className="text-zinc-400 text-[10px] text-right mt-1">{e.msg}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
