import { useState, type PointerEvent as ReactPointerEvent } from 'react';
import {
  Boxes,
  Camera,
  CreditCard,
  FileClock,
  FileText,
  Folder,
  ListChecks,
  Link2,
  PackageCheck,
  Receipt,
  ShoppingBag,
  Sparkles,
  TriangleAlert,
} from 'lucide-react';
import { SmartCardItem, SmartCardKind } from './types';

interface SmartCardProps {
  item: SmartCardItem;
  theme: 'light' | 'dark';
  isSelected?: boolean;
  folderItemsCount?: number;
  onSelect?: (id: string) => void;
  onDragPointerDown?: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
  onDragPointerMove?: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
  onDragPointerUp?: (event: ReactPointerEvent<HTMLElement>, id: string) => void;
  onConnectionStart?: (event: ReactPointerEvent<HTMLButtonElement>, id: string) => void;
  onConnectionEnd?: (event: ReactPointerEvent<HTMLButtonElement>, id: string) => void;
  isConnecting?: boolean;
  canReceiveConnection?: boolean;
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
  folder: 'Pasta',
  pending: 'Pendência',
  'ai-alert': 'Alerta de IA',
};

const STATUS_LABELS = {
  new: 'Novo',
  pending: 'Pendente',
  review: 'Em revisão',
  ready: 'Pronto',
  resolved: 'Resolvido',
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
    case 'folder': return <Folder className={iconClass} />;
    case 'pending': return <TriangleAlert className={iconClass} />;
    case 'ai-alert': return <Sparkles className={iconClass} />;
  }
}

export function SmartCard({
  item,
  theme,
  isSelected = false,
  folderItemsCount,
  onSelect,
  onDragPointerDown,
  onDragPointerMove,
  onDragPointerUp,
  onConnectionStart,
  onConnectionEnd,
  isConnecting = false,
  canReceiveConnection = false,
}: SmartCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dark = theme === 'dark';
  const isFolder = item.kind === 'folder';
  const actionClass = `inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-center text-xs font-bold transition-colors sm:min-h-9 sm:w-auto sm:rounded-lg sm:px-2.5 sm:py-1.5 sm:text-[11px] ${
    dark
      ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-indigo-500 hover:text-white'
      : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-700'
  }`;
  const selectCard = (event: ReactPointerEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('[data-no-card-drag]')) return;
    onSelect?.(item.id);
  };

  return (
    <article
      data-card-id={item.id}
      tabIndex={0}
      aria-label={`Card ${item.title}`}
      aria-current={isSelected ? 'true' : undefined}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget || (event.key !== 'Enter' && event.key !== ' ')) return;
        event.preventDefault();
        onSelect?.(item.id);
      }}
      onPointerDown={(event) => {
        selectCard(event);
        onDragPointerDown?.(event, item.id);
      }}
      onPointerMove={(event) => onDragPointerMove?.(event, item.id)}
      onPointerUp={(event) => onDragPointerUp?.(event, item.id)}
      onPointerCancel={(event) => onDragPointerUp?.(event, item.id)}
      className={`relative h-full select-none rounded-2xl border p-4 shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
      isSelected
        ? dark ? 'border-indigo-400 bg-[#151522] ring-2 ring-indigo-500/60' : 'border-indigo-500 bg-indigo-50/70 ring-2 ring-indigo-200'
        : isFolder
          ? dark ? 'border-amber-700/50 bg-amber-950/20' : 'border-amber-200 bg-amber-50/70'
          : dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'
    } ${item.archived ? 'opacity-70' : ''} ${onDragPointerDown ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {onConnectionEnd && (
        <button
          type="button"
          data-no-card-drag
          data-connector="input"
          data-connector-card-id={item.id}
          aria-label={`Conectar em ${item.title}`}
          title="Solte uma conexão aqui"
          onPointerDown={(event) => event.stopPropagation()}
          onPointerUp={(event) => {
            event.stopPropagation();
            onConnectionEnd(event, item.id);
          }}
          className="group absolute -left-[22px] top-[46px] z-20 flex h-11 w-11 touch-none items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <span className={`h-6 w-6 rounded-full border-4 shadow-sm transition-all ${
              canReceiveConnection
                ? 'scale-125 border-emerald-300 bg-emerald-500'
                : dark
                  ? 'border-[#121218] bg-slate-500 group-hover:bg-emerald-400'
                  : 'border-white bg-slate-400 group-hover:bg-emerald-500'
            }`}
          />
        </button>
      )}

      {onConnectionStart && (
        <button
          type="button"
          data-no-card-drag
          data-connector="output"
          aria-label={`Iniciar conexão de ${item.title}`}
          title="Arraste para o conector de outro card"
          onPointerDown={(event) => {
            event.stopPropagation();
            onConnectionStart(event, item.id);
          }}
          className="group absolute -right-[22px] top-[46px] z-20 flex h-11 w-11 touch-none items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <span className={`flex h-6 w-6 items-center justify-center rounded-full border-4 shadow-sm transition-all ${
              isConnecting
                ? 'scale-125 border-indigo-300 bg-indigo-500'
                : dark
                  ? 'border-[#121218] bg-indigo-500 group-hover:bg-indigo-400'
                  : 'border-white bg-indigo-600 group-hover:bg-indigo-500'
            }`}
          >
            <Link2 className="h-2.5 w-2.5 text-white" />
          </span>
        </button>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {isSelected && (
              <span className="rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                Selecionado
              </span>
            )}
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
              item.kind === 'folder'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                : item.kind === 'ai-alert'
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
          <p className={`mt-1 text-[11px] font-semibold ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
            {isFolder ? 'Submesa local' : 'Ficha operacional'} · {item.timeLabel}
          </p>
        </div>
        {!isFolder && item.amount !== undefined && (
          <strong className={`shrink-0 text-base sm:text-sm ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>
            {item.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </strong>
        )}
      </div>

      <p className={`mt-2 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {isFolder ? `${folderItemsCount ?? 0} card(s) nesta pasta. Abrir pasta pelo painel contextual.` : item.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {item.tags.map((tag) => (
          <span key={tag} className={`rounded-md px-2 py-1 text-[10px] ${dark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
            {tag}
          </span>
        ))}
        {item.linked && <span className="rounded-md bg-sky-100 px-2 py-1 text-[10px] text-sky-700 dark:bg-sky-950 dark:text-sky-300">Vínculo visual</span>}
        {item.hasPreInvoice && <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Pré-nota visual</span>}
        {item.sentToAccountant && <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] text-violet-700 dark:bg-violet-950 dark:text-violet-300">Separado para contador</span>}
        {item.linked && <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Conciliável</span>}
        {isFolder && <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Submesa local</span>}
        <span className={`basis-full pt-1 text-[10px] sm:ml-auto sm:basis-auto sm:pt-0 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{item.timeLabel}</span>
      </div>

      <button
        type="button"
        data-no-card-drag
        aria-expanded={detailsOpen}
        aria-controls={`smart-card-details-${item.id}`}
        className={`${actionClass} mt-3`}
        onClick={() => setDetailsOpen((current) => !current)}
      >
        <ListChecks className="h-3.5 w-3.5" /> {detailsOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
      </button>

      {detailsOpen && (
        <div
          id={`smart-card-details-${item.id}`}
          className={`mt-3 rounded-xl border p-3 text-xs leading-relaxed ${
            dark ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          <dl className="grid grid-cols-1 gap-2 min-[420px]:grid-cols-2">
            <div><dt className="font-bold">Etapa atual</dt><dd>{item.archived ? 'Arquivado' : STATUS_LABELS[item.status]}</dd></div>
            <div><dt className="font-bold">Origem</dt><dd>{KIND_LABELS[item.kind]}</dd></div>
          </dl>
          <p className="mt-2">Arraste o card livremente pela mesa. As ações operacionais ficam no painel do card selecionado.</p>
        </div>
      )}

      <p className={`mt-3 text-[10px] font-semibold ${dark ? 'text-amber-300/80' : 'text-amber-700'}`}>
        Exemplo fictício · ações locais, sem operação externa
      </p>
    </article>
  );
}
