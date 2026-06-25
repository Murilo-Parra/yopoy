import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CircleDollarSign,
  ClipboardList,
  CreditCard,
  ShoppingBag,
  Sparkles,
  WalletCards,
} from 'lucide-react';
import {
  formatCurrencyBRL,
  readTaskCanvasSummary,
  TASK_CANVAS_STORAGE_KEY,
  type TaskCanvasSummary,
} from './taskCanvasSummary';

interface YopoyBusinessDashboardProps {
  theme: 'light' | 'dark';
  onOpenTaskBoard: () => void;
}

const TONE_CLASSES = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
  sky: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
} as const;

function createOverviewItems(summary: TaskCanvasSummary) {
  return [
    {
      label: 'Vendas internas',
      value: formatCurrencyBRL(summary.internalSalesTotal),
      helper: `${summary.localCardsCount} cards locais criados pelo usuário`,
      icon: CircleDollarSign,
      tone: 'emerald',
    },
    {
      label: 'Recebimentos registrados',
      value: formatCurrencyBRL(summary.paymentsTotal),
      helper: 'Controle visual salvo na Mesa',
      icon: WalletCards,
      tone: 'sky',
    },
    {
      label: 'Despesas registradas',
      value: formatCurrencyBRL(summary.expensesTotal),
      helper: 'Cards de despesa não arquivados',
      icon: ArrowDownRight,
      tone: 'amber',
    },
    {
      label: 'Saldo visual',
      value: formatCurrencyBRL(summary.visualBalance),
      helper: 'Recebimentos menos despesas',
      icon: ArrowUpRight,
      tone: 'indigo',
    },
  ] as const;
}

export function YopoyBusinessDashboard({ theme, onOpenTaskBoard }: YopoyBusinessDashboardProps) {
  const dark = theme === 'dark';
  const panelClass = dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white';
  const [summary, setSummary] = useState(() => readTaskCanvasSummary());
  const overviewItems = createOverviewItems(summary);

  useEffect(() => {
    const refreshSummary = () => setSummary(readTaskCanvasSummary());
    const handleStorage = (event: StorageEvent) => {
      if (event.key === TASK_CANVAS_STORAGE_KEY || event.key === null) refreshSummary();
    };

    refreshSummary();
    window.addEventListener('focus', refreshSummary);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('focus', refreshSummary);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <div className={`mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
      <header className={`overflow-hidden rounded-3xl border p-4 sm:p-7 ${
        dark
          ? 'border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-[#121218] to-emerald-950/30'
          : 'border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'
      }`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" /> Visão do dia
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Painel de Controle</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              Visão demonstrativa da Mesa para acompanhar registros locais, vínculos e pendências sem tratar como financeiro real.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenTaskBoard}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-extrabold text-white transition-colors hover:bg-indigo-700 md:w-auto"
          >
            <ClipboardList className="h-4 w-4" /> Abrir Mesa de Tarefas
          </button>
        </div>
      </header>

      <section aria-labelledby="business-overview-title">
        <div className="mb-3 px-1">
          <h2 id="business-overview-title" className="text-base font-black sm:text-lg">Resumo local da Mesa</h2>
          <p className={`mt-1 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Dados demonstrativos salvos neste navegador. Sem sincronização externa, não é financeiro real e não tem valor fiscal.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
          {overviewItems.map(({ label, value, helper, icon: Icon, tone }) => (
            <article key={label} className={`rounded-2xl border p-4 shadow-sm ${panelClass}`}>
              <span className={`inline-flex rounded-xl p-2 ${TONE_CLASSES[tone]}`}><Icon className="h-4 w-4" /></span>
              <p className={`mt-4 text-xs font-bold ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
              <strong className="mt-1 block text-xl font-black">{value}</strong>
              <span className={`mt-2 block text-[11px] ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{helper}</span>
            </article>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <section aria-labelledby="dashboard-pending-title" className={`rounded-2xl border p-5 ${panelClass}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 id="dashboard-pending-title" className="text-base font-black">Aguardando atenção</h2>
              <p className={`mt-1 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Resumo operacional dos itens que estão na Mesa.</p>
            </div>
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              {summary.pendingCardsCount} pendências
            </span>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
            <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <CreditCard className="h-4 w-4 text-sky-500" />
              <strong className="mt-2 block text-lg">{summary.reconciledConnectionsCount}</strong>
              <span className="text-[11px] text-slate-500">Vínculos conciliados</span>
            </div>
            <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <ShoppingBag className="h-4 w-4 text-emerald-500" />
              <strong className="mt-2 block text-lg">{summary.internalPreInvoicesCount}</strong>
              <span className="text-[11px] text-slate-500">Pré-notas internas</span>
            </div>
            <div className={`rounded-xl p-3 ${dark ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <ClipboardList className="h-4 w-4 text-indigo-500" />
              <strong className="mt-2 block text-lg">{summary.accountantSeparatedCount}</strong>
              <span className="text-[11px] text-slate-500">Separados para contador</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="next-actions-title" className={`rounded-2xl border p-5 ${panelClass}`}>
          <h2 id="next-actions-title" className="text-base font-black">Próximas ações</h2>
          <ul className="mt-4 space-y-2">
            <li className={`flex items-start gap-2 rounded-xl px-3 py-3 text-xs ${dark ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" /> Abrir a Mesa para revisar pendências locais.
            </li>
            <li className={`flex items-start gap-2 rounded-xl px-3 py-3 text-xs ${dark ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" /> Conferir vínculos visuais antes de usar os dados fora do navegador.
            </li>
            <li className={`flex items-start gap-2 rounded-xl px-3 py-3 text-xs ${dark ? 'bg-slate-900 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" /> Separar cards relevantes para organização do contador.
            </li>
          </ul>
        </section>
      </div>

      <p className={`text-center text-[10px] ${dark ? 'text-slate-600' : 'text-slate-400'}`}>
        Painel demonstrativo com dados locais da Mesa. Não emite nota, não executa operação fiscal e não sincroniza com serviços externos.
      </p>
    </div>
  );
}
