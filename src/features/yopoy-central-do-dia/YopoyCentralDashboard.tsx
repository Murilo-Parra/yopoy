import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Link2, MousePointer2, RotateCcw, Sparkles, Trash2 } from 'lucide-react';
import { MOCK_SMART_CARDS } from './mockData';
import { SmartCard } from './SmartCard';
import {
  SMART_CARD_STATUS_FLOW,
  type CanvasCardConnection,
  type CanvasCardPosition,
  type SmartCardKind,
  type SmartCardItem,
  type SmartCardStatus,
} from './types';

interface Props {
  theme: 'light' | 'dark';
}

type CanvasFilter = 'all' | SmartCardStatus | 'archived';

interface CanvasState {
  items: SmartCardItem[];
  positions: Record<string, CanvasCardPosition>;
  connections: CanvasCardConnection[];
  activeFilter: CanvasFilter;
}

interface PersistedCanvasSnapshot extends CanvasState {
  version: 1;
  updatedAt: string;
}

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
const TASK_CANVAS_STORAGE_KEY = 'yopoy:task-canvas:v1';
const TASK_CANVAS_STORAGE_VERSION = 1;

const FILTERS: ReadonlyArray<{ id: CanvasFilter; label: string }> = [
  { id: 'all', label: 'Todos' },
  { id: 'new', label: 'Novos' },
  { id: 'pending', label: 'Pendentes' },
  { id: 'review', label: 'Revisão' },
  { id: 'ready', label: 'Prontos' },
  { id: 'resolved', label: 'Resolvidos' },
  { id: 'archived', label: 'Arquivados' },
];

const SMART_CARD_KINDS: ReadonlyArray<SmartCardKind> = [
  'capture',
  'sale',
  'payment',
  'expense',
  'stock',
  'invoice-draft',
  'pre-invoice',
  'accountant-package',
  'pending',
  'ai-alert',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSmartCardKind(value: unknown): value is SmartCardKind {
  return typeof value === 'string' && SMART_CARD_KINDS.includes(value as SmartCardKind);
}

function isSmartCardStatus(value: unknown): value is SmartCardStatus {
  return typeof value === 'string' && SMART_CARD_STATUS_FLOW.includes(value as SmartCardStatus);
}

function isCanvasFilter(value: unknown): value is CanvasFilter {
  return value === 'all' || value === 'archived' || isSmartCardStatus(value);
}

function cloneMockItems() {
  return MOCK_SMART_CARDS.map((item) => ({ ...item, tags: [...item.tags] }));
}

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

function createDefaultCanvasState(): CanvasState {
  const items = cloneMockItems();
  return {
    items,
    positions: createInitialPositions(items),
    connections: [],
    activeFilter: 'all',
  };
}

function readString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

function readOptionalNumber(value: unknown, fallback: number | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function readBoolean(value: unknown, fallback: boolean) {
  return typeof value === 'boolean' ? value : fallback;
}

function readTags(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return [...fallback];
  const tags = value.filter((tag): tag is string => typeof tag === 'string' && tag.trim().length > 0);
  return tags.length > 0 ? tags : [...fallback];
}

function normalizeItem(value: unknown, fallback?: SmartCardItem): SmartCardItem | null {
  if (!isRecord(value)) return fallback ? { ...fallback, tags: [...fallback.tags] } : null;

  const id = readString(value.id, fallback?.id ?? '');
  if (!id) return null;

  return {
    id,
    kind: isSmartCardKind(value.kind) ? value.kind : fallback?.kind ?? 'pending',
    title: readString(value.title, fallback?.title ?? 'Card de demonstração'),
    description: readString(value.description, fallback?.description ?? 'Registro local de demonstração.'),
    amount: readOptionalNumber(value.amount, fallback?.amount),
    timeLabel: readString(value.timeLabel, fallback?.timeLabel ?? 'agora'),
    status: isSmartCardStatus(value.status) ? value.status : fallback?.status ?? 'pending',
    archived: readBoolean(value.archived, fallback?.archived ?? false),
    linked: readBoolean(value.linked, fallback?.linked ?? false),
    hasPreInvoice: readBoolean(value.hasPreInvoice, fallback?.hasPreInvoice ?? false),
    sentToAccountant: readBoolean(value.sentToAccountant, fallback?.sentToAccountant ?? false),
    tags: readTags(value.tags, fallback?.tags ?? ['Demonstração']),
  };
}

function normalizePosition(value: unknown, fallback: CanvasCardPosition): CanvasCardPosition {
  if (!isRecord(value)) return fallback;
  const x = typeof value.x === 'number' && Number.isFinite(value.x) ? value.x : fallback.x;
  const y = typeof value.y === 'number' && Number.isFinite(value.y) ? value.y : fallback.y;
  return {
    x: clamp(x, 16, CANVAS_WIDTH - CARD_WIDTH - 16),
    y: clamp(y, 16, CANVAS_HEIGHT - 220),
  };
}

function normalizeConnection(value: unknown, itemIds: Set<string>): CanvasCardConnection | null {
  if (!isRecord(value) || typeof value.fromId !== 'string' || typeof value.toId !== 'string') return null;
  if (value.fromId === value.toId || !itemIds.has(value.fromId) || !itemIds.has(value.toId)) return null;
  const id = typeof value.id === 'string' && value.id.trim().length > 0 ? value.id : `${value.fromId}->${value.toId}`;
  return {
    id,
    fromId: value.fromId,
    toId: value.toId,
    label: typeof value.label === 'string' ? value.label : undefined,
  };
}

function normalizeCanvasState(value: unknown): CanvasState | null {
  if (!isRecord(value) || value.version !== TASK_CANVAS_STORAGE_VERSION || !Array.isArray(value.items)) return null;

  const defaultState = createDefaultCanvasState();
  const fallbackById = new Map(defaultState.items.map((item) => [item.id, item]));
  const savedItemsById = new Map<string, SmartCardItem>();

  value.items.forEach((rawItem) => {
    const rawId = isRecord(rawItem) && typeof rawItem.id === 'string' ? rawItem.id : '';
    const item = normalizeItem(rawItem, fallbackById.get(rawId));
    if (item) savedItemsById.set(item.id, item);
  });

  const items = [
    ...savedItemsById.values(),
    ...defaultState.items.filter((item) => !savedItemsById.has(item.id)),
  ];
  const itemIds = new Set(items.map((item) => item.id));
  const rawPositions = isRecord(value.positions) ? value.positions : {};
  const positions = Object.fromEntries(items.map((item) => [
    item.id,
    normalizePosition(rawPositions[item.id], defaultState.positions[item.id] ?? { x: 44, y: 44 }),
  ]));
  const connections = Array.isArray(value.connections)
    ? value.connections
      .map((connection) => normalizeConnection(connection, itemIds))
      .filter((connection): connection is CanvasCardConnection => connection !== null)
    : [];

  return {
    items,
    positions,
    connections,
    activeFilter: isCanvasFilter(value.activeFilter) ? value.activeFilter : 'all',
  };
}

function loadCanvasState(): CanvasState {
  if (typeof window === 'undefined') return createDefaultCanvasState();

  try {
    const stored = window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY);
    if (!stored) return createDefaultCanvasState();
    return normalizeCanvasState(JSON.parse(stored)) ?? createDefaultCanvasState();
  } catch {
    return createDefaultCanvasState();
  }
}

function saveCanvasState(state: CanvasState) {
  if (typeof window === 'undefined') return;

  const snapshot: PersistedCanvasSnapshot = {
    version: TASK_CANVAS_STORAGE_VERSION,
    items: state.items,
    positions: state.positions,
    connections: state.connections,
    activeFilter: state.activeFilter,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // A Mesa continua funcional mesmo quando o navegador bloqueia storage.
  }
}

function clearCanvasState() {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(TASK_CANVAS_STORAGE_KEY);
  } catch {
    // Sem storage disponível, basta restaurar o estado em memória.
  }
}

export function YopoyCentralDashboard({ theme }: Props) {
  const initialCanvasState = useMemo(() => loadCanvasState(), []);
  const [items, setItems] = useState<SmartCardItem[]>(() => initialCanvasState.items);
  const [positions, setPositions] = useState<Record<string, CanvasCardPosition>>(() => initialCanvasState.positions);
  const [connections, setConnections] = useState<CanvasCardConnection[]>(() => initialCanvasState.connections);
  const [activeFilter, setActiveFilter] = useState<CanvasFilter>(() => initialCanvasState.activeFilter);
  const [connectionSourceId, setConnectionSourceId] = useState<string | null>(null);
  const [connectionPointer, setConnectionPointer] = useState<CanvasCardPosition | null>(null);
  const [feedback, setFeedback] = useState('Mesa local pronta: arraste os cards e conecte os pontos laterais. As alterações ficam salvas neste navegador, sem sincronização externa.');
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const connectionSourceRef = useRef<string | null>(null);
  const hasHydratedRef = useRef(false);
  const skipNextSaveRef = useRef(false);
  const dark = theme === 'dark';

  useEffect(() => () => {
    document.body.style.userSelect = '';
  }, []);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      hasHydratedRef.current = true;
      return;
    }
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    saveCanvasState({ items, positions, connections, activeFilter });
  }, [activeFilter, connections, items, positions]);

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
    setFeedback('Posição do card salva neste navegador.');
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
      setFeedback('Conexão visual criada e salva neste navegador.');
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

  const restoreDemonstration = () => {
    const defaultState = createDefaultCanvasState();
    clearCanvasState();
    skipNextSaveRef.current = true;
    setItems(defaultState.items);
    setPositions(defaultState.positions);
    setConnections(defaultState.connections);
    setActiveFilter(defaultState.activeFilter);
    setFeedback('Demonstração restaurada. Os dados locais da Mesa foram limpos.');
  };

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
            <strong className="block">Demonstração salva localmente</strong>
            Posições, conexões e ações ficam salvas neste navegador, sem sincronização externa. Pré-notas são visuais, sem valor fiscal.
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
            <button
              type="button"
              onClick={restoreDemonstration}
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${
                dark ? 'border-slate-700 text-slate-300 hover:border-indigo-500' : 'border-slate-200 text-slate-600 hover:border-indigo-300'
              }`}
            >
              <RotateCcw className="h-3 w-3" /> Restaurar demonstração
            </button>
            {connections.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setConnections([]);
                  setFeedback('Todas as conexões visuais foram removidas e a Mesa local foi atualizada.');
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
                  onCreatePreInvoice={(id) => updateItem(id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Pré-nota visual adicionada sem valor fiscal. Nenhum documento fiscal foi criado ou emitido.')}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
