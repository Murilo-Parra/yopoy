import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link2, MousePointer2, Sparkles, Trash2 } from 'lucide-react';
import { MOCK_SMART_CARDS } from './mockData';
import { SmartCard } from './SmartCard';
import {
  SMART_CARD_STATUS_FLOW,
  type CanvasCardConnection,
  type CanvasCardPosition,
  type SmartCardItem,
  type SmartCardStatus,
} from './types';

interface Props {
  theme: 'light' | 'dark';
}

type CanvasFilter = 'all' | SmartCardStatus | 'archived';

interface DragState {
  cardId: string;
  pointerId: number;
  offsetX: number;
  offsetY: number;
}

const CARD_WIDTH = 320;
const CONNECTOR_Y = 68;
const CANVAS_WIDTH = 1640;
const CANVAS_HEIGHT = 1900;

const FILTERS: ReadonlyArray<{ id: CanvasFilter; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'new', label: 'Novos' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'review', label: 'Revisão' },
  { id: 'ready', label: 'Prontos' },
  { id: 'resolved', label: 'Resolvidos' },
  { id: 'archived', label: 'Arquivados' },
];

function createInitialPositions(items: SmartCardItem[]): Record<string, CanvasCardPosition> {
  return Object.fromEntries(items.map((item, index) => [
    item.id,
    {
      x: 44 + (index % 4) * 390,
      y: 44 + Math.floor(index / 4) * 570,
    },
  ]));
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function YopoyCentralDashboard({ theme }: Props) {
  const [items, setItems] = useState<SmartCardItem[]>(() => MOCK_SMART_CARDS.map((item) => ({ ...item, tags: [...item.tags] })));
  const [positions, setPositions] = useState<Record<string, CanvasCardPosition>>(() => createInitialPositions(MOCK_SMART_CARDS));
  const [connections, setConnections] = useState<CanvasCardConnection[]>([]);
  const [activeFilter, setActiveFilter] = useState<CanvasFilter>('all');
  const [connectionSourceId, setConnectionSourceId] = useState<string | null>(null);
  const [connectionPointer, setConnectionPointer] = useState<CanvasCardPosition | null>(null);
  const [feedback, setFeedback] = useState('Mesa local pronta: arraste os cards e conecte os pontos laterais. As alterações serão perdidas ao sair ou recarregar.');
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const connectionSourceRef = useRef<string | null>(null);
  const dark = theme === 'dark';

  useEffect(() => () => {
    document.body.style.userSelect = '';
  }, []);

  const updateItem = (id: string, change: (item: SmartCardItem) => SmartCardItem, message: string) => {
    setItems((current) => current.map((item) => item.id === id ? change(item) : item));
    setFeedback(message);
  };

  const moveNext = (id: string) => updateItem(id, (item) => {
    const currentIndex = SMART_CARD_STATUS_FLOW.indexOf(item.status);
    const nextStatus = SMART_CARD_STATUS_FLOW[Math.min(currentIndex + 1, SMART_CARD_STATUS_FLOW.length - 1)];
    return { ...item, status: nextStatus };
  }, 'Card avançou uma etapa nesta demonstração.');

  const movePrevious = (id: string) => updateItem(id, (item) => {
    const currentIndex = SMART_CARD_STATUS_FLOW.indexOf(item.status);
    const previousStatus = SMART_CARD_STATUS_FLOW[Math.max(currentIndex - 1, 0)];
    return { ...item, status: previousStatus };
  }, 'Card voltou uma etapa nesta demonstração.');

  const visibleItems = useMemo(() => items.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'archived') return item.archived;
    return !item.archived && item.status === activeFilter;
  }), [activeFilter, items]);

  const visibleItemIds = useMemo(() => new Set(visibleItems.map((item) => item.id)), [visibleItems]);

  useEffect(() => {
    const firstVisibleItem = visibleItems[0];
    const firstPosition = firstVisibleItem ? positions[firstVisibleItem.id] : undefined;
    const viewport = viewportRef.current;
    if (!firstPosition || !viewport || typeof viewport.scrollTo !== 'function') return;

    viewport.scrollTo({
      left: Math.max(firstPosition.x - 16, 0),
      top: Math.max(firstPosition.y - 16, 0),
      behavior: 'smooth',
    });
  }, [activeFilter]);

  const canvasPoint = (clientX: number, clientY: number): CanvasCardPosition => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    return {
      x: clientX - (canvasRect?.left ?? 0),
      y: clientY - (canvasRect?.top ?? 0),
    };
  };

  const handleCardPointerDown = (event: ReactPointerEvent<HTMLElement>, cardId: string) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('[data-no-card-drag]')) return;
    const point = canvasPoint(event.clientX, event.clientY);
    const position = positions[cardId];
    if (!position) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      cardId,
      pointerId: event.pointerId,
      offsetX: point.x - position.x,
      offsetY: point.y - position.y,
    };
    document.body.style.userSelect = 'none';
    setFeedback('Movendo card livremente pela Mesa.');
  };

  const handleCardPointerMove = (event: ReactPointerEvent<HTMLElement>, cardId: string) => {
    const drag = dragRef.current;
    if (!drag || drag.cardId !== cardId || drag.pointerId !== event.pointerId) return;
    const point = canvasPoint(event.clientX, event.clientY);
    setPositions((current) => ({
      ...current,
      [cardId]: {
        x: clamp(point.x - drag.offsetX, 16, CANVAS_WIDTH - CARD_WIDTH - 16),
        y: clamp(point.y - drag.offsetY, 16, CANVAS_HEIGHT - 220),
      },
    }));
  };

  const finishCardDrag = (event: ReactPointerEvent<HTMLElement>, cardId: string) => {
    const drag = dragRef.current;
    if (!drag || drag.cardId !== cardId || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    document.body.style.userSelect = '';
    setFeedback('Posição do card atualizada somente nesta Mesa local.');
  };

  const beginConnection = (event: ReactPointerEvent<HTMLButtonElement>, cardId: string) => {
    connectionSourceRef.current = cardId;
    setConnectionSourceId(cardId);
    setConnectionPointer(canvasPoint(event.clientX, event.clientY));
    document.body.style.userSelect = 'none';
    setFeedback('Arraste a conexão até o ponto esquerdo de outro card.');
  };

  const cancelConnection = () => {
    connectionSourceRef.current = null;
    setConnectionSourceId(null);
    setConnectionPointer(null);
    document.body.style.userSelect = '';
  };

  const finishConnection = (targetId: string) => {
    const fromId = connectionSourceRef.current;
    if (!fromId || fromId === targetId) {
      cancelConnection();
      return;
    }

    setConnections((current) => {
      if (current.some((connection) => connection.fromId === fromId && connection.toId === targetId)) {
        setFeedback('Essa conexão já existe na Mesa.');
        return current;
      }
      setFeedback('Conexão visual criada localmente entre os cards.');
      return [...current, { id: `${fromId}->${targetId}`, fromId, toId: targetId }];
    });
    cancelConnection();
  };

  const finishConnectionAtPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!connectionSourceRef.current) return;
    const targetConnector = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('[data-connector="input"]');
    const targetId = targetConnector?.dataset.connectorCardId;

    if (targetId) {
      finishConnection(targetId);
      return;
    }

    setFeedback('Conexão cancelada. Solte sobre o ponto esquerdo de outro card.');
    cancelConnection();
  };

  const sourcePosition = connectionSourceId ? positions[connectionSourceId] : undefined;

  return (
    <div className={`mx-auto w-full max-w-[1800px] space-y-5 ${dark ? 'text-white' : 'text-slate-900'}`}>
      <header className={`overflow-hidden rounded-3xl border p-4 sm:p-7 ${
        dark
          ? 'border-indigo-500/20 bg-gradient-to-br from-indigo-950/60 via-[#121218] to-emerald-950/30'
          : 'border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-emerald-50'
      }`}>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-600 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white">
              <Sparkles className="h-3.5 w-3.5" /> Canvas local
            </span>
            <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">Mesa de Tarefas</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              Organize livremente: arraste os cards pela área e ligue o ponto direito de um card ao ponto esquerdo de outro.
            </p>
          </div>
          <div className={`rounded-2xl border p-3 text-xs leading-relaxed md:max-w-sm ${
            dark ? 'border-amber-700/40 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-800'
          }`}>
            <strong className="block">Demonstração sem persistência</strong>
            Posições, conexões e ações existem apenas nesta tela. Nenhum dado é enviado e nenhum documento fiscal é emitido.
          </div>
        </div>
      </header>

      <section aria-label="Controles da Mesa" className={`rounded-2xl border p-3 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}>
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filtros dos cards">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-full px-3 py-2 text-xs font-bold transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-indigo-600 text-white'
                    : dark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-600 hover:text-indigo-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <MousePointer2 className="h-3.5 w-3.5" /> Arraste pelo corpo do card
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Link2 className="h-3.5 w-3.5" /> {connections.length} conexões
            </span>
            {connections.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setConnections([]);
                  setFeedback('Todas as conexões visuais foram removidas.');
                }}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${
                  dark ? 'border-slate-700 text-slate-300 hover:border-red-500' : 'border-slate-200 text-slate-600 hover:border-red-300'
                }`}
              >
                <Trash2 className="h-3 w-3" /> Limpar conexões
              </button>
            )}
          </div>
        </div>
        <p className={`mt-2 text-[11px] leading-relaxed sm:hidden ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          No celular: arraste pelo corpo do card, use os pontos laterais para conectar e deslize pela área vazia para navegar no canvas.
        </p>
      </section>

      <div aria-live="polite" className={`rounded-xl border px-4 py-3 text-xs ${
        dark ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        {feedback}
      </div>

      <div
        ref={viewportRef}
        data-testid="task-canvas-viewport"
        className={`h-[62svh] min-h-[420px] max-h-[720px] overflow-auto rounded-3xl border shadow-inner sm:h-[70vh] sm:min-h-[560px] ${
          dark ? 'border-slate-800 bg-[#0c0c11]' : 'border-slate-200 bg-slate-100'
        }`}
      >
        <div
          ref={canvasRef}
          data-testid="task-canvas"
          onPointerMove={(event) => {
            if (connectionSourceRef.current) setConnectionPointer(canvasPoint(event.clientX, event.clientY));
          }}
          onPointerUp={finishConnectionAtPointer}
          onPointerCancel={() => {
            if (connectionSourceRef.current) {
              setFeedback('Conexão cancelada. Tente novamente a partir do ponto direito do card.');
              cancelConnection();
            }
          }}
          className={`relative touch-pan-x touch-pan-y ${
            dark
              ? 'bg-[radial-gradient(circle,_#30303a_1px,_transparent_1px)]'
              : 'bg-[radial-gradient(circle,_#cbd5e1_1px,_transparent_1px)]'
          } bg-size-[24px_24px]`}
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          <svg
            data-testid="task-connections"
            aria-label="Conexões entre cards"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
          >
            {connections.filter((connection) => visibleItemIds.has(connection.fromId) && visibleItemIds.has(connection.toId)).map((connection) => {
              const from = positions[connection.fromId];
              const to = positions[connection.toId];
              if (!from || !to) return null;
              const startX = from.x + CARD_WIDTH;
              const startY = from.y + CONNECTOR_Y;
              const endX = to.x;
              const endY = to.y + CONNECTOR_Y;
              const curve = Math.max(80, Math.abs(endX - startX) / 2);
              return (
                <path
                  key={connection.id}
                  data-connection-id={connection.id}
                  d={`M ${startX} ${startY} C ${startX + curve} ${startY}, ${endX - curve} ${endY}, ${endX} ${endY}`}
                  fill="none"
                  stroke={dark ? '#818cf8' : '#4f46e5'}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
            {sourcePosition && connectionPointer && (
              <line
                data-testid="connection-preview"
                x1={sourcePosition.x + CARD_WIDTH}
                y1={sourcePosition.y + CONNECTOR_Y}
                x2={connectionPointer.x}
                y2={connectionPointer.y}
                stroke={dark ? '#a5b4fc' : '#6366f1'}
                strokeWidth="3"
                strokeDasharray="8 6"
              />
            )}
          </svg>

          {visibleItems.map((item) => {
            const position = positions[item.id];
            return (
              <div
                key={item.id}
                data-testid={`canvas-node-${item.id}`}
                className="absolute z-10"
                style={{ left: position.x, top: position.y, width: CARD_WIDTH, touchAction: 'none' }}
              >
                <SmartCard
                  item={item}
                  theme={theme}
                  onDragPointerDown={handleCardPointerDown}
                  onDragPointerMove={handleCardPointerMove}
                  onDragPointerUp={finishCardDrag}
                  onConnectionStart={beginConnection}
                  onConnectionEnd={(_, targetId) => finishConnection(targetId)}
                  isConnecting={connectionSourceId === item.id}
                  canReceiveConnection={connectionSourceId !== null && connectionSourceId !== item.id}
                  onMoveNext={moveNext}
                  onMovePrevious={movePrevious}
                  onMarkResolved={(id) => updateItem(id, (current) => ({ ...current, status: 'resolved' }), 'Card marcado como resolvido nesta demonstração.')}
                  onArchiveToggle={(id) => updateItem(id, (current) => ({ ...current, archived: !current.archived }), item.archived ? 'Item desarquivado nesta demonstração.' : 'Item arquivado nesta demonstração.')}
                  onLink={(id) => updateItem(id, (current) => ({ ...current, linked: true, status: 'review' }), 'Vínculo de fallback registrado apenas neste card.')}
                  onSendToAccountant={(id) => updateItem(id, (current) => ({ ...current, sentToAccountant: true }), 'Card separado localmente para o contador. Nenhum dado foi enviado.')}
                  onCreatePreInvoice={(id) => updateItem(id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Preparação visual adicionada. Nenhum documento fiscal foi criado ou emitido.')}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
