import { useMemo, useState } from 'react';
import { Archive, CircleDollarSign, ClipboardCheck, Inbox, Link2Off, Sparkles } from 'lucide-react';
import { MOCK_SMART_CARDS } from './mockData';
import { SmartCard } from './SmartCard';
import { SmartCardItem } from './types';

interface Props {
  theme: 'light' | 'dark';
}

interface CentralSection {
  id: string;
  title: string;
  description: string;
  icon: typeof Sparkles;
  items: SmartCardItem[];
}

export function YopoyCentralDashboard({ theme }: Props) {
  const [items, setItems] = useState<SmartCardItem[]>(() => MOCK_SMART_CARDS.map((item) => ({ ...item, tags: [...item.tags] })));
  const [feedback, setFeedback] = useState('Dados fictícios carregados somente nesta tela.');
  const dark = theme === 'dark';

  const updateItem = (id: string, change: (item: SmartCardItem) => SmartCardItem, message: string) => {
    setItems((current) => current.map((item) => item.id === id ? change(item) : item));
    setFeedback(message);
  };

  const sections = useMemo<CentralSection[]>(() => {
    const active = items.filter((item) => !item.archived);
    return [
      {
        id: 'attention',
        title: 'Atenção agora',
        description: 'Pendências e sugestões que merecem conferência humana.',
        icon: Sparkles,
        items: active.filter((item) =>
          (item.kind === 'ai-alert' || item.kind === 'pending') && (item.status === 'new' || item.status === 'pending')
        ),
      },
      {
        id: 'captures',
        title: 'Novas capturas',
        description: 'Registre primeiro; classifique quando tiver tempo.',
        icon: Inbox,
        items: active.filter((item) => item.kind === 'capture' && item.status === 'new'),
      },
      {
        id: 'unlinked-payments',
        title: 'Pagamentos sem vínculo',
        description: 'Recebimentos fictícios aguardando conciliação visual.',
        icon: Link2Off,
        items: active.filter((item) => item.kind === 'payment' && !item.linked && (item.status === 'new' || item.status === 'pending')),
      },
      {
        id: 'unpaid-sales',
        title: 'Vendas sem pagamento',
        description: 'Vendas fictícias que ainda não possuem pagamento associado.',
        icon: CircleDollarSign,
        items: active.filter((item) => item.kind === 'sale' && !item.linked && !item.hasPreInvoice && (item.status === 'new' || item.status === 'pending')),
      },
      {
        id: 'review',
        title: 'Em revisão',
        description: 'Itens organizados parcialmente e ainda não concluídos.',
        icon: ClipboardCheck,
        items: active.filter((item) => item.status === 'review' && item.kind !== 'invoice-draft' && !item.hasPreInvoice),
      },
      {
        id: 'ready',
        title: 'Prontos',
        description: 'Registros conferidos para o próximo passo manual.',
        icon: ClipboardCheck,
        items: active.filter((item) => item.status === 'ready' && item.kind !== 'pre-invoice' && item.kind !== 'accountant-package'),
      },
      {
        id: 'pre-invoices',
        title: 'Pré-notas / contador',
        description: 'Preparação visual sem emissão fiscal e sem envio externo.',
        icon: ClipboardCheck,
        items: active.filter((item) => item.kind === 'invoice-draft' || item.kind === 'pre-invoice' || item.kind === 'accountant-package' || item.hasPreInvoice),
      },
      {
        id: 'archived',
        title: 'Arquivados',
        description: 'Itens removidos da mesa, com restauração local disponível.',
        icon: Archive,
        items: items.filter((item) => item.archived),
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
              <Sparkles className="h-3.5 w-3.5" /> MVP manual
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Central Visual do Yopoy</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              Registre primeiro, organize depois, concilie quando possível e prepare o que quiser compartilhar com o contador.
            </p>
          </div>
          <div className={`rounded-2xl border p-3 text-xs leading-relaxed md:max-w-sm ${
            dark ? 'border-amber-700/40 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}>
            <strong className="block">Demonstração com dados fictícios</strong>
            As ações são apenas visuais, não persistem e não emitem nota fiscal. Uma emissão real só existirá futuramente, com função fiscal própria e confirmação do usuário.
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
              <div className="mb-3 flex items-start justify-between gap-3">
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
                        onCreatePreInvoice={(id) => updateItem(id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Pré-nota visual criada. Nenhum documento fiscal foi emitido.')}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`rounded-2xl border border-dashed px-4 py-6 text-center text-xs ${
                  dark ? 'border-slate-800 text-slate-600' : 'border-slate-200 text-slate-400'
                }`}>
                  Nenhum item fictício nesta seção.
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
