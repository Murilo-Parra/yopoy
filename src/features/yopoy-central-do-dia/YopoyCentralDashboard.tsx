import { useMemo, useState } from 'react';
import { Archive, CircleDollarSign, ClipboardCheck, Inbox, Link2Off, Sparkles } from 'lucide-react';
import { MOCK_SMART_CARDS } from './mockData';
import { SmartCard } from './SmartCard';
import { SmartCardItem } from './types';

interface Props {
  theme: 'light' | 'dark';
}

interface CentralSection {
  id: CentralSectionId;
  title: string;
  description: string;
  emptyMessage: string;
  icon: typeof Sparkles;
  items: SmartCardItem[];
}

type CentralSectionId =
  | 'attention'
  | 'captures'
  | 'unlinked-payments'
  | 'unpaid-sales'
  | 'review'
  | 'ready'
  | 'pre-invoices'
  | 'archived';

function getSectionId(item: SmartCardItem): CentralSectionId {
  if (item.archived) return 'archived';
  if (
    item.kind === 'invoice-draft'
    || item.kind === 'pre-invoice'
    || item.kind === 'accountant-package'
    || item.hasPreInvoice
  ) return 'pre-invoices';
  if (item.status === 'review') return 'review';
  if (item.status === 'ready') return 'ready';
  if (item.kind === 'capture') return 'captures';
  if (item.kind === 'payment' && !item.linked) return 'unlinked-payments';
  if (item.kind === 'sale' && !item.linked) return 'unpaid-sales';
  return 'attention';
}

export function YopoyCentralDashboard({ theme }: Props) {
  const [items, setItems] = useState<SmartCardItem[]>(() => MOCK_SMART_CARDS.map((item) => ({ ...item, tags: [...item.tags] })));
  const [feedback, setFeedback] = useState('Modo demonstração: exemplos fictícios carregados. Qualquer alteração acontece apenas nesta tela e será perdida ao sair ou recarregar.');
  const dark = theme === 'dark';

  const updateItem = (id: string, change: (item: SmartCardItem) => SmartCardItem, message: string) => {
    setItems((current) => current.map((item) => item.id === id ? change(item) : item));
    setFeedback(message);
  };

  const sections = useMemo<CentralSection[]>(() => {
    const itemsBySection = new Map<CentralSectionId, SmartCardItem[]>();
    items.forEach((item) => {
      const sectionId = getSectionId(item);
      itemsBySection.set(sectionId, [...(itemsBySection.get(sectionId) ?? []), item]);
    });

    const inSection = (id: CentralSectionId) => itemsBySection.get(id) ?? [];
    return [
      {
        id: 'attention',
        title: 'Atenção agora',
        description: 'O que precisa de uma decisão ou conferência manual primeiro.',
        emptyMessage: 'Tudo certo por aqui. Nenhuma pendência fictícia exige atenção agora.',
        icon: Sparkles,
        items: inSection('attention'),
      },
      {
        id: 'captures',
        title: 'Novas capturas',
        description: 'Registre rapidamente e organize quando fizer sentido para sua rotina.',
        emptyMessage: 'Nenhuma captura fictícia aguardando organização.',
        icon: Inbox,
        items: inSection('captures'),
      },
      {
        id: 'unlinked-payments',
        title: 'Pagamentos sem vínculo',
        description: 'Recebimentos de exemplo que ainda não foram ligados a uma venda.',
        emptyMessage: 'Nenhum pagamento fictício está sem vínculo.',
        icon: Link2Off,
        items: inSection('unlinked-payments'),
      },
      {
        id: 'unpaid-sales',
        title: 'Vendas sem pagamento',
        description: 'Vendas de exemplo que ainda não têm um recebimento associado.',
        emptyMessage: 'Nenhuma venda fictícia aguarda associação de pagamento.',
        icon: CircleDollarSign,
        items: inSection('unpaid-sales'),
      },
      {
        id: 'review',
        title: 'Em revisão',
        description: 'Registros que você começou a organizar e ainda quer conferir.',
        emptyMessage: 'Nenhum registro fictício está em revisão.',
        icon: ClipboardCheck,
        items: inSection('review'),
      },
      {
        id: 'ready',
        title: 'Prontos',
        description: 'Registros conferidos e organizados para o próximo passo manual.',
        emptyMessage: 'Nenhum registro fictício foi marcado como pronto ainda.',
        icon: ClipboardCheck,
        items: inSection('ready'),
      },
      {
        id: 'pre-invoices',
        title: 'Pré-notas e contador',
        description: 'Resumos visuais para conferência: sem valor fiscal, emissão ou envio externo.',
        emptyMessage: 'Nenhuma preparação fictícia para conferência ou contador.',
        icon: ClipboardCheck,
        items: inSection('pre-invoices'),
      },
      {
        id: 'archived',
        title: 'Arquivados',
        description: 'Itens retirados da mesa; você pode restaurá-los apenas nesta demonstração.',
        emptyMessage: 'Nenhum item fictício foi arquivado.',
        icon: Archive,
        items: inSection('archived'),
      },
    ];
  }, [items]);

  return (
    <div className={`mx-auto w-full max-w-7xl space-y-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
      <header className={`overflow-hidden rounded-3xl border p-5 sm:p-7 ${
        dark
          ? 'border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-[#121218] to-emerald-950/30'
          : 'border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'
      }`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" /> Demonstração manual
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Central Visual do Yopoy</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              Sua mesa única para registrar o movimento da empresa, organizar pendências e preparar informações para conferência.
            </p>
          </div>
          <div className={`rounded-2xl border p-3 text-xs leading-relaxed md:max-w-sm ${
            dark ? 'border-amber-700/40 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}>
            <strong className="block">Ambiente demonstrativo: nada aqui é real</strong>
            Empresas, pessoas, valores e documentos são fictícios. As ações são locais, não ficam salvas, não enviam dados e nunca emitem nota fiscal.
          </div>
        </div>
      </header>

      <div aria-live="polite" className={`rounded-xl border px-4 py-3 text-xs ${
        dark ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        {feedback}
      </div>

      <div className="space-y-7">
        {sections.map((section) => {
          const SectionIcon = section.icon;
          return (
            <section key={section.id} aria-labelledby={`central-section-${section.id}`}>
              <div className="mb-3 flex items-start justify-between gap-3 px-1">
                <div className="flex min-w-0 items-start gap-2.5">
                  <span className={`mt-0.5 rounded-xl p-2 ${dark ? 'bg-slate-800 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    <SectionIcon className="h-4 w-4" />
                  </span>
                  <div>
                    <h2 id={`central-section-${section.id}`} className="text-sm font-black sm:text-base">{section.title}</h2>
                    <p className={`mt-0.5 text-[11px] sm:text-xs ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{section.description}</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                  {section.items.length}
                </span>
              </div>

              {section.items.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {section.items.map((item) => (
                    <div key={item.id}>
                      <SmartCard
                        item={item}
                        theme={theme}
                        onReview={(id) => updateItem(id, (current) => ({ ...current, status: 'review' }), 'Item movido para revisão nesta demonstração.')}
                        onReady={(id) => updateItem(id, (current) => ({ ...current, status: 'ready' }), 'Item marcado como pronto nesta demonstração.')}
                        onArchiveToggle={(id) => updateItem(id, (current) => ({ ...current, archived: !current.archived }), item.archived ? 'Item desarquivado nesta demonstração.' : 'Item arquivado nesta demonstração.')}
                        onLink={(id) => updateItem(id, (current) => ({ ...current, linked: true, status: 'review' }), 'Vínculo visual criado. Nenhuma conciliação real foi executada.')}
                        onCreatePreInvoice={(id) => updateItem(id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Preparação visual adicionada somente nesta tela. Nenhum documento fiscal foi criado ou emitido.')}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`rounded-2xl border border-dashed px-4 py-7 text-center text-xs leading-relaxed ${
                  dark ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-slate-50/70 text-slate-500'
                }`}>
                  {section.emptyMessage}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
