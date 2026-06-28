import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  FileClock,
  Printer,
  Sparkles,
  X,
} from 'lucide-react';
import { formatCurrencyBRL } from '../features/yopoy-dashboard/taskCanvasSummary';
import {
  readTaskCanvasSnapshot,
  subscribeTaskCanvasUpdates,
  writeTaskCanvasSnapshot,
  type TaskCanvasSnapshot,
} from '../features/yopoy-central-do-dia/taskCanvasStorage';
import type { SmartCardItem } from '../features/yopoy-central-do-dia/types';

interface InvoiceToolProps {
  theme?: 'light' | 'dark';
  products?: unknown;
  transactions?: unknown;
  setTransactions?: unknown;
  selectedPlan?: unknown;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSmartCardItem(value: unknown): value is SmartCardItem {
  return isRecord(value)
    && typeof value.id === 'string'
    && typeof value.kind === 'string'
    && typeof value.title === 'string'
    && typeof value.description === 'string'
    && typeof value.timeLabel === 'string'
    && typeof value.status === 'string'
    && typeof value.archived === 'boolean'
    && typeof value.linked === 'boolean'
    && typeof value.hasPreInvoice === 'boolean';
}

function readWorkspaceName() {
  if (typeof window === 'undefined') return 'Dados não informados';
  return window.localStorage.getItem('cfg_trade_name')
    ?? window.localStorage.getItem('cfg_corporate_name')
    ?? 'Dados não informados';
}

function readPreInvoiceItems(snapshot: TaskCanvasSnapshot | null) {
  if (!snapshot || !Array.isArray(snapshot.items)) return [];
  return snapshot.items.filter(isSmartCardItem).filter((item) => item.kind === 'pre-invoice' || item.kind === 'invoice-draft');
}

function getDisplayAmount(item: SmartCardItem) {
  if (typeof item.preInvoiceSummary?.totalAmount === 'number' && Number.isFinite(item.preInvoiceSummary.totalAmount)) {
    return item.preInvoiceSummary.totalAmount;
  }
  if (typeof item.amount === 'number' && Number.isFinite(item.amount)) return item.amount;
  return 0;
}

function formatGeneratedAt(item: SmartCardItem) {
  if (item.preInvoiceSummary?.generatedAt) {
    return new Date(item.preInvoiceSummary.generatedAt).toLocaleString('pt-BR');
  }
  return item.timeLabel;
}

export default function InvoiceTool({ theme = 'dark' }: InvoiceToolProps) {
  const dark = theme === 'dark';
  const [snapshot, setSnapshot] = useState<TaskCanvasSnapshot | null>(() => readTaskCanvasSnapshot());
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const preInvoiceItems = useMemo(() => readPreInvoiceItems(snapshot), [snapshot]);
  const selectedPreInvoice = preInvoiceItems.find((item) => item.id === previewId) ?? preInvoiceItems[0] ?? null;

  useEffect(() => {
    if (previewId && !preInvoiceItems.some((item) => item.id === previewId)) {
      setPreviewId(null);
    }
  }, [preInvoiceItems, previewId]);

  useEffect(() => {
    const refresh = () => setSnapshot(readTaskCanvasSnapshot());
    refresh();
    return subscribeTaskCanvasUpdates(refresh);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePreview();
      }
    };

    if (!selectedPreInvoice) return undefined;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPreInvoice]);

  const toggleAccountantFlag = (itemId: string) => {
    const currentSnapshot = readTaskCanvasSnapshot();
    if (!currentSnapshot || !Array.isArray(currentSnapshot.items)) return;

    const nextItems = currentSnapshot.items.map((item) => {
      if (!isSmartCardItem(item) || item.id !== itemId) return item;
      return { ...item, sentToAccountant: !item.sentToAccountant };
    });

    writeTaskCanvasSnapshot({ ...currentSnapshot, items: nextItems, updatedAt: new Date().toISOString() });
    setSnapshot(readTaskCanvasSnapshot());
    setFeedback('Pré-nota marcada localmente para o contador. Nenhum dado foi enviado.');
  };

  const openPreview = (itemId: string) => {
    setPreviewId(itemId);
    setFeedback('Pré-nota visual interna aberta para conferência local.');
  };

  const closePreview = () => {
    setPreviewId(null);
  };

  const printPreview = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
      setFeedback('Use Salvar como PDF do navegador para guardar a cópia local.');
    }
  };

  const previewSourceRows = useMemo(() => {
    if (!selectedPreInvoice) return [];
    const copiedLines = selectedPreInvoice.preInvoiceLines ?? [];
    const sourceIds = selectedPreInvoice.sourceCardIds ?? [];
    const sourceTitles = selectedPreInvoice.preInvoiceSummary?.sourceTitles ?? [];

    if (copiedLines.length > 0) {
      return copiedLines.map((line, index) => ({
        code: line.sourceCardId ?? `LINE-${index + 1}`,
        title: line.title,
        origin: `Card ${line.kind}`,
        quantity: 1,
        unitValue: typeof line.amount === 'number' && Number.isFinite(line.amount) ? line.amount : undefined,
        totalValue: typeof line.amount === 'number' && Number.isFinite(line.amount) ? line.amount : undefined,
        description: line.description ?? 'Linha copiada da Mesa.',
      }));
    }

    if (sourceIds.length === 0 && sourceTitles.length === 0) {
      return [{
        code: 'ITEM-01',
        title: selectedPreInvoice.title,
        origin: 'Pré-nota gerada localmente',
        quantity: 1,
        unitValue: getDisplayAmount(selectedPreInvoice) || undefined,
        totalValue: getDisplayAmount(selectedPreInvoice) || undefined,
        description: selectedPreInvoice.description,
      }];
    }

    return (sourceIds.length > 0 ? sourceIds : sourceTitles.map((_, index) => `removed-${index + 1}`)).map((sourceId, index) => {
      const sourceItem = snapshot?.items && Array.isArray(snapshot.items)
        ? snapshot.items.find((item) => isSmartCardItem(item) && item.id === sourceId)
        : undefined;
      const readableSource = isSmartCardItem(sourceItem)
        ? sourceItem
        : null;
      const fallbackTitle = sourceTitles[index] ?? 'Card removido localmente';
      const amount = readableSource ? (typeof readableSource.amount === 'number' && Number.isFinite(readableSource.amount) ? readableSource.amount : 0) : 0;
      return {
        code: readableSource?.id ?? `REM-${index + 1}`,
        title: readableSource?.title ?? fallbackTitle,
        origin: readableSource ? `Card ${readableSource.kind}` : 'Card removido localmente',
        quantity: 1,
        unitValue: amount > 0 ? amount : undefined,
        totalValue: amount > 0 ? amount : undefined,
        description: readableSource?.description ?? 'Card removido localmente da Mesa.',
      };
    });
  }, [selectedPreInvoice, snapshot]);

  const previewTotal = selectedPreInvoice
    ? previewSourceRows.reduce((total, row) => total + (typeof row.totalValue === 'number' ? row.totalValue : 0), 0)
      || getDisplayAmount(selectedPreInvoice)
    : 0;

  if (preInvoiceItems.length === 0) {
    return (
      <div className={`mx-6 mt-6 flex flex-col items-center justify-center gap-4 rounded-2xl border p-8 text-center ${
        dark ? 'border-rose-900 bg-[#1f1013] text-rose-300' : 'border-rose-200 bg-rose-50 text-rose-500'
      }`}>
        <AlertTriangle className="h-16 w-16 animate-pulse" />
        <h2 className="text-2xl font-bold">Pré-nota interna</h2>
        <p className="max-w-md text-sm font-medium opacity-80">
          Área demonstrativa para rascunhos sem valor fiscal e preparação para o contador. A emissão fiscal real está bloqueada e não está disponível no MVP.
        </p>
      </div>
    );
  }

  return (
    <div className={`mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
      <header className={`overflow-hidden rounded-3xl border p-4 sm:p-7 ${
        dark
          ? 'border-amber-700/40 bg-gradient-to-br from-amber-950/30 via-[#121218] to-purple-950/20'
          : 'border-amber-100 bg-gradient-to-br from-amber-50 via-white to-purple-50'
      }`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" /> Pré-nota visual
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Pré-nota visual interna</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              Visão derivada da Mesa para conferência interna, sem valor fiscal e sem emissão real.
            </p>
            <p className={`mt-2 max-w-2xl text-xs leading-relaxed ${dark ? 'text-indigo-200' : 'text-indigo-700'}`}>
              Origem local: {preInvoiceItems.length} pré-nota(s) criada(s) na Mesa Visual.
            </p>
          </div>
          <div className={`rounded-2xl border p-3 text-xs leading-relaxed md:max-w-sm ${
            dark ? 'border-amber-700/40 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}>
            <strong className="block">SEM VALOR FISCAL</strong>
            Não é NF-e, NFC-e ou NFS-e. Use Salvar como PDF do navegador se quiser guardar uma cópia local.
          </div>
        </div>
      </header>

      <section aria-labelledby="invoice-list-title" className={`rounded-2xl border p-4 sm:p-5 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 id="invoice-list-title" className="text-base font-black">Pré-notas da Mesa</h2>
            <p className={`mt-1 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Lista automática dos documentos internos criados na Mesa.
            </p>
          </div>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-black text-purple-700 dark:bg-purple-950 dark:text-purple-300">
            {preInvoiceItems.length} documentos
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {preInvoiceItems.map((item) => {
            const amount = getDisplayAmount(item);
            const sourceCount = item.preInvoiceLines?.length ?? item.preInvoiceSummary?.itemCount ?? item.sourceCardIds?.length ?? 0;
            return (
              <article
                key={item.id}
                className={`rounded-2xl border p-4 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'}`}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                      dark ? 'bg-purple-950 text-purple-200' : 'bg-purple-100 text-purple-800'
                    }`}>
                      <FileClock className="h-3.5 w-3.5" /> PRÉ-NOTA VISUAL
                    </span>
                    <h3 className="mt-2 break-words text-sm font-extrabold">{item.title}</h3>
                    <p className={`mt-1 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {sourceCount} card(s) de origem · {formatGeneratedAt(item)}
                    </p>
                    <p className={`mt-1 text-[11px] font-bold ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {item.sentToAccountant ? 'Separada para contador' : 'Sem envio automático'}
                    </p>
                  </div>
                  <strong className={`text-sm ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>{formatCurrencyBRL(amount)}</strong>
                </div>
                <p className={`mt-3 text-xs leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Sem valor fiscal</span>
                  {item.sentToAccountant && (
                    <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                      Separada para contador
                    </span>
                  )}
                  {item.sentToPreInvoices && (
                    <span className="rounded-md bg-fuchsia-100 px-2 py-1 text-[10px] text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300">
                      Na aba Pré-notas
                    </span>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                  <button
                    type="button"
                    onClick={() => openPreview(item.id)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-purple-700"
                  >
                    <ClipboardList className="h-4 w-4" /> Abrir pré-nota
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAccountantFlag(item.id)}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-violet-500' : 'border-slate-200 text-slate-600 hover:border-violet-300'
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    {item.sentToAccountant ? 'Separada para contador' : 'Marcar para contador'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openPreview(item.id);
                      printPreview();
                    }}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-purple-500' : 'border-slate-200 text-slate-600 hover:border-purple-300'
                    }`}
                  >
                    <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="invoice-summary-title" className={`rounded-2xl border p-5 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}>
        <h2 id="invoice-summary-title" className="text-base font-black">Resumo local da visão</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
          <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <Sparkles className="h-4 w-4 text-purple-500" />
            <strong className="mt-2 block text-lg">{preInvoiceItems.length}</strong>
            <span className="text-[11px] text-slate-500">Pré-notas internas</span>
          </div>
          <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <ClipboardList className="h-4 w-4 text-emerald-500" />
            <strong className="mt-2 block text-lg">{preInvoiceItems.filter((item) => item.sentToAccountant).length}</strong>
            <span className="text-[11px] text-slate-500">Separadas para contador</span>
          </div>
          <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <ArrowRight className="h-4 w-4 text-indigo-500" />
            <strong className="mt-2 block text-lg">{formatCurrencyBRL(preInvoiceItems.reduce((total, item) => total + getDisplayAmount(item), 0))}</strong>
            <span className="text-[11px] text-slate-500">Total visual</span>
          </div>
        </div>
        <p className={`mt-4 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Pré-notas derivadas da Mesa. Sem transmissão, sem autorização fiscal e sem valor fiscal.
        </p>
      </section>

      {feedback && (
        <p role="status" className={`rounded-xl border px-4 py-3 text-xs font-bold ${
          dark ? 'border-slate-800 bg-slate-950/50 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}>
          {feedback}
        </p>
      )}

      {selectedPreInvoice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pré-nota visual interna"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3"
          onClick={closePreview}
        >
          <section
            className={`max-h-[88vh] w-full max-w-5xl overflow-auto rounded-2xl border p-4 shadow-2xl ${
              dark ? 'border-purple-800 bg-[#121218] text-slate-100' : 'border-purple-200 bg-white text-slate-900'
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-3 border-b border-dashed pb-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                  dark ? 'bg-purple-950 text-purple-200' : 'bg-purple-100 text-purple-800'
                }`}>
                  <FileClock className="h-3.5 w-3.5" /> PRÉ-NOTA VISUAL INTERNA
                </span>
                <h2 className="mt-2 text-2xl font-black">Pré-nota visual interna</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    SEM VALOR FISCAL
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    NÃO É NF-e, NFC-e OU NFS-e
                  </span>
                </div>
                <p className={`mt-2 text-xs ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Documento interno de organização. Não substitui nota fiscal.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={printPreview}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-purple-700"
                >
                  <Printer className="h-4 w-4" /> Imprimir / Salvar PDF
                </button>
                <button
                  type="button"
                  onClick={closePreview}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                    dark ? 'border-slate-700 text-slate-300 hover:border-purple-500' : 'border-slate-200 text-slate-600 hover:border-purple-300'
                  }`}
                >
                  <X className="h-4 w-4" /> Fechar
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-3">
                <section className={`rounded-xl border p-4 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'}`}>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Cabeçalho</p>
                      <p className="mt-1 text-sm font-black">Yopoy</p>
                      <p className="text-xs">{selectedPreInvoice.title}</p>
                      <p className="mt-1 text-xs text-slate-500">Número interno local: {selectedPreInvoice.id}</p>
                      <p className="mt-1 text-xs text-slate-500">Gerado em: {formatGeneratedAt(selectedPreInvoice)}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Emitente</p>
                      <p className="mt-1 text-sm font-bold">{readWorkspaceName()}</p>
                      <p className="mt-1 text-xs text-slate-500">Dados não informados quando não houver cadastro local.</p>
                    </div>
                  </div>
                </section>

                <section className={`rounded-xl border p-4 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'}`}>
                  <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Destinatário</p>
                  <p className="mt-1 text-sm font-bold">Cliente não informado</p>
                  <p className="mt-1 text-xs text-slate-500">Nenhum dado de cliente foi associado a esta pré-nota.</p>
                </section>

                <section className={`rounded-xl border p-4 ${dark ? 'border-slate-800 bg-[#171720]' : 'border-slate-100 bg-white'}`}>
                  <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Itens</p>
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={dark ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-600'}>
                        <tr>
                          <th className="px-3 py-2">Código</th>
                          <th className="px-3 py-2">Descrição</th>
                          <th className="px-3 py-2">Origem</th>
                          <th className="px-3 py-2 text-right">Qtd.</th>
                          <th className="px-3 py-2 text-right">Unit.</th>
                          <th className="px-3 py-2 text-right">Total visual</th>
                        </tr>
                      </thead>
                      <tbody className={dark ? 'bg-[#121218] text-slate-200' : 'bg-white text-slate-700'}>
                        {previewSourceRows.map((row) => (
                          <tr key={row.code} className="border-t border-slate-200/80 dark:border-slate-800">
                            <td className="px-3 py-2 font-mono text-[10px]">{row.code}</td>
                            <td className="px-3 py-2">
                              <div className="font-bold">{row.title}</div>
                              <div className="mt-1 text-[10px] text-slate-500">{row.description}</div>
                            </td>
                            <td className="px-3 py-2 text-[10px] text-slate-500">{row.origin}</td>
                            <td className="px-3 py-2 text-right">{row.quantity}</td>
                            <td className="px-3 py-2 text-right">{typeof row.unitValue === 'number' ? formatCurrencyBRL(row.unitValue) : '-'}</td>
                            <td className="px-3 py-2 text-right font-black">{typeof row.totalValue === 'number' ? formatCurrencyBRL(row.totalValue) : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className={`rounded-xl border p-4 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'}`}>
                  <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Observações</p>
                  <ul className="mt-2 space-y-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    <li>Documento interno de organização.</li>
                    <li>Não substitui nota fiscal.</li>
                    <li>Não foi transmitido à SEFAZ.</li>
                    <li>Não possui chave de acesso.</li>
                    <li>Não possui protocolo fiscal.</li>
                    <li>Use Salvar como PDF do navegador, se quiser guardar uma cópia.</li>
                  </ul>
                </section>
              </div>

              <aside className={`rounded-xl border p-4 ${dark ? 'border-purple-800 bg-purple-950/20' : 'border-purple-200 bg-purple-50'}`}>
                <p className="text-[10px] font-black uppercase tracking-wide text-purple-500">Totais</p>
                <p className="mt-2 text-2xl font-black">{formatCurrencyBRL(previewTotal)}</p>
                <p className="mt-1 text-sm font-bold">{previewSourceRows.length} item(ns) de origem</p>
                <p className={`mt-3 text-xs leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Total visual derivado localmente da Mesa Visual.
                </p>
              </aside>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
