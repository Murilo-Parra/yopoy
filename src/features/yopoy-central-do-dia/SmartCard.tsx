import {
  Archive,
  ArchiveRestore,
  Boxes,
  Camera,
  Check,
  CreditCard,
  FileClock,
  FileText,
  FolderCheck,
  Link2,
  PackageCheck,
  PencilLine,
  Receipt,
  ShoppingBag,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { SmartCardItem, SmartCardKind } from './types';

interface SmartCardProps {
  item: SmartCardItem;
  theme: 'light' | 'dark';
  onReview: (id: string) => void;
  onReady: (id: string) => void;
  onArchiveToggle: (id: string) => void;
  onLink: (id: string) => void;
  onCreatePreInvoice: (id: string) => void;
}

const KIND_LABELS: Record<SmartCardKind, string> = {
  capture: 'Captura',
  sale: 'Venda',
  payment: 'Pagamento',
  expense: 'Despesa',
  stock: 'Produto / estoque',
  'invoice-draft': 'Rascunho sem valor fiscal',
  'pre-invoice': 'Pré-nota visual',
  'accountant-package': 'Pacote do contador',
  pending: 'Pendência',
  'ai-alert': 'Alerta de IA',
};

const STATUS_LABELS = {
  new: 'Novo',
  pending: 'Pendente',
  review: 'Em revisão',
  ready: 'Pronto',
} as const;

function KindIcon({ kind }: { kind: SmartCardKind }) {
  const iconClass = 'h-4 w-4';
  switch (kind) {
    case 'capture': return <Camera className={iconClass} />;
    case 'sale': return <ShoppingBag className={iconClass} />;
    case 'payment': return <CreditCard className={iconClass} />;
    case 'expense': return <Receipt className={iconClass} />;
    case 'stock': return <Boxes className={iconClass} />;
    case 'invoice-draft': return <FileText className={iconClass} />;
    case 'pre-invoice': return <FileClock className={iconClass} />;
    case 'accountant-package': return <PackageCheck className={iconClass} />;
    case 'pending': return <TriangleAlert className={iconClass} />;
    case 'ai-alert': return <Sparkles className={iconClass} />;
  }
}

export function SmartCard({
  item,
  theme,
  onReview,
  onReady,
  onArchiveToggle,
  onLink,
  onCreatePreInvoice,
}: SmartCardProps) {
  const dark = theme === 'dark';
  const canLink = (item.kind === 'payment' || item.kind === 'sale') && !item.linked;
  const canCreatePreInvoice = (item.kind === 'sale' || item.kind === 'invoice-draft') && !item.hasPreInvoice;
  const actionClass = `inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-center text-xs font-bold transition-colors sm:min-h-9 sm:w-auto sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-[11px] ${
    dark
      ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-indigo-500 hover:text-white'
      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700'
  }`;

  return (
    <article className={`rounded-2xl border p-4 shadow-sm ${
      dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'
    } ${item.archived ? 'opacity-70' : ''}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
              item.kind === 'ai-alert'
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300'
                : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
            }`}>
              <KindIcon kind={item.kind} />
              {KIND_LABELS[item.kind]}
            </span>
            <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item.archived ? 'Arquivado' : STATUS_LABELS[item.status]}
            </span>
          </div>
          <h3 className={`text-sm font-extrabold leading-snug ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
            {item.title}
          </h3>
        </div>
        {item.amount !== undefined && (
          <strong className={`shrink-0 text-base sm:text-sm ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        )}
      </div>

      <p className={`mt-2 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {item.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {item.tags.map((tag) => (
          <span key={tag} className={`rounded-md px-2 py-1 text-[10px] ${dark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
            {tag}
          </span>
        ))}
        {item.linked && <span className="rounded-md bg-sky-100 px-2 py-1 text-[10px] text-sky-700 dark:bg-sky-950 dark:text-sky-300">Vínculo visual</span>}
        {item.hasPreInvoice && <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Pré-nota visual</span>}
        <span className={`basis-full pt-1 text-[10px] sm:ml-auto sm:basis-auto sm:pt-0 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{item.timeLabel}</span>
      </div>

      <p className={`mt-3 text-[10px] font-semibold ${dark ? 'text-amber-300/80' : 'text-amber-700'}`}>
        Exemplo fictício · ações locais, sem persistência ou operação externa
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 min-[420px]:grid-cols-2 sm:flex sm:flex-wrap">
        {!item.archived && item.status !== 'review' && (
          <button type="button" className={actionClass} onClick={() => onReview(item.id)}>
            <PencilLine className="h-3.5 w-3.5" /> Revisar
          </button>
        )}
        {!item.archived && item.status !== 'ready' && (
          <button type="button" className={actionClass} onClick={() => onReady(item.id)}>
            <Check className="h-3.5 w-3.5" /> Marcar pronto
          </button>
        )}
        {!item.archived && canLink && (
          <button type="button" className={actionClass} onClick={() => onLink(item.id)}>
            <Link2 className="h-3.5 w-3.5" /> Simular vínculo
          </button>
        )}
        {!item.archived && canCreatePreInvoice && (
          <button type="button" className={actionClass} onClick={() => onCreatePreInvoice(item.id)}>
            <FolderCheck className="h-3.5 w-3.5" /> Preparar pré-nota visual
          </button>
        )}
        <button type="button" className={actionClass} onClick={() => onArchiveToggle(item.id)}>
          {item.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
          {item.archived ? 'Desarquivar' : 'Arquivar'}
        </button>
      </div>
    </article>
  );
}
