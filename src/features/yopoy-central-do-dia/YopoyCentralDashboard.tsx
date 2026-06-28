import {
  useId,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  Archive,
  ArchiveRestore,
  ArrowRight,
  Check,
  ChevronRight,
  Clipboard,
  FolderCheck,
  Folder,
  Link2,
  Maximize2,
  Minus,
  MousePointer2,
  MoreHorizontal,
  PackageCheck,
  PackageOpen,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
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
type QuickRegistrationType = 'sale' | 'expense' | 'payment' | 'capture' | 'pending' | 'pre-invoice';

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

interface ContextMenuState {
  type: 'canvas' | 'card' | 'folder';
  x: number;
  y: number;
  canvasPosition: CanvasCardPosition;
  itemId?: string;
}

interface QuickRegistrationOption {
  id: QuickRegistrationType;
  label: string;
  kind: SmartCardKind;
  defaultDescription: string;
  tags: string[];
  note: string;
}

const CARD_WIDTH = 320;
const CARD_APPROX_HEIGHT = 260;
const CONNECTOR_Y = 68;
const MIN_CANVAS_WIDTH = 1640;
const MIN_CANVAS_HEIGHT = 1900;
const CANVAS_EXPANSION_PADDING = 480;
const MIN_CANVAS_ZOOM = 0.5;
const MAX_CANVAS_ZOOM = 1.75;
const CANVAS_ZOOM_STEP = 0.25;
const TASK_CANVAS_STORAGE_KEY = 'yopoy:task-canvas:v1';
const TASK_CANVAS_STORAGE_VERSION = 1;
const CONNECTION_STATUS_LABELS = {
  visual: 'visual',
  reconciled: 'conciliado',
} as const;

const PACKAGE_KIND_LABELS: Record<SmartCardKind, string> = {
  capture: 'Captura',
  sale: 'Venda interna',
  payment: 'Recebimento',
  expense: 'Despesa',
  stock: 'Produto / estoque',
  'invoice-draft': 'Rascunho sem valor fiscal',
  'pre-invoice': 'Pré-nota interna',
  'accountant-package': 'Pacote do contador',
  folder: 'Pasta local',
  pending: 'Pendência',
  'ai-alert': 'Alerta de IA',
};

const PACKAGE_STATUS_LABELS: Record<SmartCardStatus, string> = {
  new: 'Novo',
  pending: 'Pendente',
  review: 'Em revisão',
  ready: 'Pronto',
  resolved: 'Resolvido',
};

const CARD_KIND_LABELS: Record<SmartCardKind, string> = {
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

const CARD_STATUS_LABELS: Record<SmartCardStatus, string> = {
  new: 'Novo',
  pending: 'Pendente',
  review: 'Em revisão',
  ready: 'Pronto',
  resolved: 'Resolvido',
};

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
  'folder',
  'pending',
  'ai-alert',
];

const QUICK_REGISTRATION_OPTIONS: ReadonlyArray<QuickRegistrationOption> = [
  {
    id: 'sale',
    label: 'Venda interna',
    kind: 'sale',
    defaultDescription: 'Venda registrada como controle interno para organizar depois.',
    tags: ['Venda interna', 'Controle interno'],
    note: 'Controle interno, sem emissão fiscal.',
  },
  {
    id: 'expense',
    label: 'Despesa',
    kind: 'expense',
    defaultDescription: 'Despesa registrada rapidamente para classificar depois.',
    tags: ['Despesa', 'Organizar depois'],
    note: 'Registre agora e categorize depois.',
  },
  {
    id: 'payment',
    label: 'Recebimento',
    kind: 'payment',
    defaultDescription: 'Recebimento registrado para conciliar quando possível.',
    tags: ['Recebimento', 'Conciliar depois'],
    note: 'Recebimento local aguardando vínculo.',
  },
  {
    id: 'capture',
    label: 'Captura / anotação',
    kind: 'capture',
    defaultDescription: 'Anotação capturada rapidamente para organizar depois.',
    tags: ['Captura manual', 'Anotação'],
    note: 'Use para lembrar agora e classificar depois.',
  },
  {
    id: 'pending',
    label: 'Pendência',
    kind: 'pending',
    defaultDescription: 'Pendência registrada para revisão manual.',
    tags: ['Pendência', 'Revisar'],
    note: 'Pendência local para resolver depois.',
  },
  {
    id: 'pre-invoice',
    label: 'Pré-nota interna',
    kind: 'pre-invoice',
    defaultDescription: 'Pré-nota interna para conferência. Sem valor fiscal.',
    tags: ['Pré-nota interna', 'Sem valor fiscal'],
    note: 'Pré-nota interna não tem valor fiscal.',
  },
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

function isCanvasConnectionStatus(value: unknown): value is NonNullable<CanvasCardConnection['status']> {
  return value === 'visual' || value === 'reconciled';
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

function readParentFolderId(value: unknown, fallback?: string | null) {
  if (value === null) return null;
  if (typeof value === 'string' && value.trim().length > 0) return value;
  return fallback ?? null;
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
    parentFolderId: readParentFolderId(value.parentFolderId, fallback?.parentFolderId),
    tags: readTags(value.tags, fallback?.tags ?? ['Demonstração']),
  };
}

function normalizePosition(value: unknown, fallback: CanvasCardPosition): CanvasCardPosition {
  if (!isRecord(value)) return fallback;
  const x = typeof value.x === 'number' && Number.isFinite(value.x) ? value.x : fallback.x;
  const y = typeof value.y === 'number' && Number.isFinite(value.y) ? value.y : fallback.y;
  return {
    x: Math.max(x, 16),
    y: Math.max(y, 16),
  };
}

function normalizeConnection(value: unknown, itemIds: Set<string>): CanvasCardConnection | null {
  if (!isRecord(value) || typeof value.fromId !== 'string' || typeof value.toId !== 'string') return null;
  if (value.fromId === value.toId || !itemIds.has(value.fromId) || !itemIds.has(value.toId)) return null;
  const id = typeof value.id === 'string' && value.id.trim().length > 0 ? value.id : `${value.fromId}->${value.toId}`;
  const status = isCanvasConnectionStatus(value.status) ? value.status : 'visual';
  const reconciledAt = status === 'reconciled' && typeof value.reconciledAt === 'string' && value.reconciledAt.trim().length > 0
    ? value.reconciledAt
    : undefined;
  const note = typeof value.note === 'string' && value.note.trim().length > 0 ? value.note.trim().slice(0, 120) : undefined;
  return {
    id,
    fromId: value.fromId,
    toId: value.toId,
    label: typeof value.label === 'string' ? value.label : undefined,
    status,
    reconciledAt,
    note,
  };
}

function getReconciledCardIds(connections: CanvasCardConnection[]) {
  const reconciledIds = new Set<string>();
  connections.forEach((connection) => {
    if (connection.status !== 'reconciled') return;
    reconciledIds.add(connection.fromId);
    reconciledIds.add(connection.toId);
  });
  return reconciledIds;
}

function syncLinkedCards(items: SmartCardItem[], connections: CanvasCardConnection[]) {
  const reconciledIds = getReconciledCardIds(connections);
  return items.map((item) => ({ ...item, linked: reconciledIds.has(item.id) }));
}

function getItemScopeId(item: SmartCardItem) {
  return item.parentFolderId ?? null;
}

function areItemsInSameScope(first?: SmartCardItem, second?: SmartCardItem) {
  if (!first || !second) return false;
  if (first.kind === 'folder' || second.kind === 'folder') return false;
  return getItemScopeId(first) === getItemScopeId(second);
}

function keepScopedConnections(items: SmartCardItem[], connections: CanvasCardConnection[]) {
  const itemById = new Map(items.map((item) => [item.id, item]));
  return connections.filter((connection) => areItemsInSameScope(itemById.get(connection.fromId), itemById.get(connection.toId)));
}

function getFolderChildCounts(items: SmartCardItem[], folderId: string) {
  return items.reduce((current, item) => {
    if (item.parentFolderId !== folderId) return current;
    if (item.kind === 'folder') return { ...current, folders: current.folders + 1 };
    return { ...current, cards: current.cards + 1 };
  }, { cards: 0, folders: 0 });
}

function getFolderPath(folderId: string | null, itemsById: Map<string, SmartCardItem>) {
  const path: SmartCardItem[] = [];
  const visited = new Set<string>();
  let currentId = folderId;

  while (currentId && !visited.has(currentId)) {
    visited.add(currentId);
    const item = itemsById.get(currentId);
    if (!item || item.kind !== 'folder') break;
    path.unshift(item);
    currentId = item.parentFolderId ?? null;
  }

  return path;
}

function isDescendantFolder(folderId: string, possibleAncestorId: string, itemsById: Map<string, SmartCardItem>) {
  const visited = new Set<string>();
  let currentId = itemsById.get(folderId)?.parentFolderId ?? null;

  while (currentId && !visited.has(currentId)) {
    if (currentId === possibleAncestorId) return true;
    visited.add(currentId);
    currentId = itemsById.get(currentId)?.parentFolderId ?? null;
  }

  return false;
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
  const scopedConnections = keepScopedConnections(items, connections);
  const reconciledIds = getReconciledCardIds(scopedConnections);
  const itemsWithReconciledLinks = items.map((item) => reconciledIds.has(item.id) ? { ...item, linked: true } : item);

  return {
    items: itemsWithReconciledLinks,
    positions,
    connections: scopedConnections,
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

function getQuickRegistrationOption(type: QuickRegistrationType) {
  return QUICK_REGISTRATION_OPTIONS.find((option) => option.id === type) ?? QUICK_REGISTRATION_OPTIONS[0];
}

function createLocalCardId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createLocalFolderId() {
  return `folder-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function parseQuickTags(value: string, fallback: string[]) {
  const tags = value
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);
  return tags.length > 0 ? tags : fallback;
}

function formatCurrencyBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function getAccountantPackageItems(items: SmartCardItem[]) {
  return items.filter((item) => item.sentToAccountant === true || item.kind === 'accountant-package');
}

function getPackageConnectionLabel(item: SmartCardItem, connections: CanvasCardConnection[]) {
  const itemConnections = connections.filter((connection) => connection.fromId === item.id || connection.toId === item.id);
  if (itemConnections.some((connection) => connection.status === 'reconciled')) return 'Vínculo visual conciliado';
  if (itemConnections.length > 0 || item.linked) return 'Vínculo visual';
  return 'Sem vínculo visual';
}

function formatAccountantPackageText(items: SmartCardItem[], connections: CanvasCardConnection[]) {
  const packageItems = getAccountantPackageItems(items);
  const totals = packageItems.reduce((current, item) => ({
    sales: current.sales + (item.kind === 'sale' ? 1 : 0),
    expenses: current.expenses + (item.kind === 'expense' ? 1 : 0),
    payments: current.payments + (item.kind === 'payment' ? 1 : 0),
    preInvoices: current.preInvoices + (item.kind === 'pre-invoice' || item.kind === 'invoice-draft' || item.hasPreInvoice ? 1 : 0),
    amount: current.amount + (typeof item.amount === 'number' && Number.isFinite(item.amount) ? item.amount : 0),
  }), { sales: 0, expenses: 0, payments: 0, preInvoices: 0, amount: 0 });

  const lines = [
    'Pacote local para contador',
    'Separado neste navegador. Sem envio automático. Sem valor fiscal.',
    'Revise antes de compartilhar manualmente com o contador.',
    '',
    `Total de cards separados: ${packageItems.length}`,
    `Vendas internas separadas: ${totals.sales}`,
    `Despesas separadas: ${totals.expenses}`,
    `Recebimentos separados: ${totals.payments}`,
    `Pré-notas internas separadas: ${totals.preInvoices}`,
    `Total visual de valores: ${formatCurrencyBRL(totals.amount)}`,
    '',
    'Cards:',
  ];

  if (packageItems.length === 0) {
    return [...lines, '- Nenhum card separado para contador ainda.'].join('\n');
  }

  return [
    ...lines,
    ...packageItems.map((item) => {
      const amount = typeof item.amount === 'number' && Number.isFinite(item.amount)
        ? ` | Valor: ${formatCurrencyBRL(item.amount)}`
        : '';
      const preInvoice = item.hasPreInvoice || item.kind === 'pre-invoice' || item.kind === 'invoice-draft'
        ? 'Tem pré-nota visual'
        : 'Sem pré-nota visual';
      const tags = item.tags.length > 0 ? item.tags.join(', ') : 'Sem tags';
      return `- ${item.title} | Tipo: ${PACKAGE_KIND_LABELS[item.kind]}${amount} | Status: ${PACKAGE_STATUS_LABELS[item.status]} | ${preInvoice} | ${getPackageConnectionLabel(item, connections)} | Tags: ${tags}`;
    }),
  ].join('\n');
}

function getNextStatus(status: SmartCardStatus) {
  const currentIndex = SMART_CARD_STATUS_FLOW.indexOf(status);
  return SMART_CARD_STATUS_FLOW[Math.min(currentIndex + 1, SMART_CARD_STATUS_FLOW.length - 1)];
}

function getCardConnections(cardId: string, connections: CanvasCardConnection[]) {
  return connections.filter((connection) => connection.fromId === cardId || connection.toId === cardId);
}

function getCanvasSize(positions: Record<string, CanvasCardPosition>) {
  const positionValues = Object.values(positions);
  const maxX = positionValues.reduce((current, position) => Math.max(current, position.x), 0);
  const maxY = positionValues.reduce((current, position) => Math.max(current, position.y), 0);
  return {
    width: Math.max(MIN_CANVAS_WIDTH, maxX + CARD_WIDTH + CANVAS_EXPANSION_PADDING),
    height: Math.max(MIN_CANVAS_HEIGHT, maxY + CARD_APPROX_HEIGHT + CANVAS_EXPANSION_PADDING),
  };
}

function formatCanvasZoom(zoom: number) {
  return `${Math.round(zoom * 100)}%`;
}

export function YopoyCentralDashboard({ theme }: Props) {
  const quickRegistrationTitleId = useId();
  const initialCanvasState = useMemo(() => loadCanvasState(), []);
  const [items, setItems] = useState<SmartCardItem[]>(() => initialCanvasState.items);
  const [positions, setPositions] = useState<Record<string, CanvasCardPosition>>(() => initialCanvasState.positions);
  const [connections, setConnections] = useState<CanvasCardConnection[]>(() => initialCanvasState.connections);
  const [activeFilter, setActiveFilter] = useState<CanvasFilter>(() => initialCanvasState.activeFilter);
  const [quickRegistrationOpen, setQuickRegistrationOpen] = useState(false);
  const [quickRegistrationType, setQuickRegistrationType] = useState<QuickRegistrationType>('sale');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickDescription, setQuickDescription] = useState('');
  const [quickAmount, setQuickAmount] = useState('');
  const [quickTags, setQuickTags] = useState('');
  const [quickFormError, setQuickFormError] = useState('');
  const [connectionSourceId, setConnectionSourceId] = useState<string | null>(null);
  const [connectionPointer, setConnectionPointer] = useState<CanvasCardPosition | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [selectedMoveFolderId, setSelectedMoveFolderId] = useState('');
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [dropTargetFolderId, setDropTargetFolderId] = useState<string | null>(null);
  const [renamingFolderId, setRenamingFolderId] = useState<string | null>(null);
  const [folderRenameValue, setFolderRenameValue] = useState('');
  const [canvasZoom, setCanvasZoom] = useState(1);
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
    if (!contextMenu) return undefined;
    const closeMenu = () => setContextMenu(null);
    const closeMenuWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeMenu();
    };
    window.addEventListener('click', closeMenu);
    window.addEventListener('keydown', closeMenuWithEscape);
    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('keydown', closeMenuWithEscape);
    };
  }, [contextMenu]);

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

  useEffect(() => {
    if (!activeFolderId || items.some((item) => item.id === activeFolderId && item.kind === 'folder')) return;
    setActiveFolderId(null);
    setSelectedCardId(null);
  }, [activeFolderId, items]);

  const updateItem = (id: string, change: (item: SmartCardItem) => SmartCardItem, message: string) => {
    setItems((current) => current.map((item) => item.id === id ? change(item) : item));
    setFeedback(message);
  };

  const moveNext = (id: string) => updateItem(id, (item) => {
    return { ...item, status: getNextStatus(item.status) };
  }, 'Card avançou uma etapa nesta demonstração.');

  const movePrevious = (id: string) => updateItem(id, (item) => {
    const currentIndex = SMART_CARD_STATUS_FLOW.indexOf(item.status);
    const previousStatus = SMART_CARD_STATUS_FLOW[Math.max(currentIndex - 1, 0)];
    return { ...item, status: previousStatus };
  }, 'Card voltou uma etapa nesta demonstração.');

  const closeQuickRegistration = () => {
    setQuickRegistrationOpen(false);
    setQuickFormError('');
  };

  const resetQuickRegistrationForm = () => {
    setQuickTitle('');
    setQuickDescription('');
    setQuickAmount('');
    setQuickTags('');
    setQuickFormError('');
  };

  const createCardPosition = () => {
    const viewport = viewportRef.current;
    const localCardsCount = items.filter((item) => item.id.startsWith('local-')).length;
    const baseX = viewport ? viewport.scrollLeft / canvasZoom + 24 : 44;
    const baseY = viewport ? viewport.scrollTop / canvasZoom + 24 : 44;
    return {
      x: Math.max(baseX + (localCardsCount % 3) * 28, 16),
      y: Math.max(baseY + (localCardsCount % 3) * 36, 16),
    };
  };

  const handleQuickRegistrationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = quickTitle.trim();
    const amountText = quickAmount.trim();
    const amount = amountText ? Number(amountText.replace(',', '.')) : undefined;

    if (!title) {
      setQuickFormError('Informe um título para criar o card.');
      return;
    }

    if (amount !== undefined && (!Number.isFinite(amount) || amount <= 0)) {
      setQuickFormError('Use um valor positivo ou deixe o campo em branco.');
      return;
    }

    const option = getQuickRegistrationOption(quickRegistrationType);
    const item: SmartCardItem = {
      id: createLocalCardId(),
      kind: option.kind,
      title,
      description: quickDescription.trim() || option.defaultDescription,
      amount,
      timeLabel: 'agora',
      status: 'new',
      archived: false,
      linked: false,
      hasPreInvoice: option.id === 'pre-invoice',
      sentToAccountant: false,
      parentFolderId: activeFolderId,
      tags: parseQuickTags(quickTags, option.tags),
    };

    const position = createCardPosition();
    setItems((current) => [item, ...current]);
    setPositions((current) => ({ ...current, [item.id]: position }));
    setActiveFilter('all');
    setSelectedCardId(item.id);
    resetQuickRegistrationForm();
    setQuickRegistrationOpen(false);
    setFeedback(activeFolderId ? 'Card criado dentro desta pasta local.' : 'Card criado e salvo neste navegador.');
  };

  const createFolderAt = (position: CanvasCardPosition, title = 'Nova pasta') => {
    const item: SmartCardItem = {
      id: createLocalFolderId(),
      kind: 'folder',
      title,
      description: 'Pasta local da Mesa Visual.',
      timeLabel: 'agora',
      status: 'ready',
      archived: false,
      linked: false,
      hasPreInvoice: false,
      sentToAccountant: false,
      parentFolderId: activeFolderId,
      tags: ['Pasta local'],
    };
    setItems((current) => [item, ...current]);
    setPositions((current) => ({
      ...current,
      [item.id]: {
        x: Math.max(position.x, 16),
        y: Math.max(position.y, 16),
      },
    }));
    setActiveFilter('all');
    setSelectedCardId(item.id);
    setFeedback('Pasta criada localmente nesta posição.');
  };

  const enterFolder = (folderId: string) => {
    const folder = itemsById.get(folderId);
    if (!folder || folder.kind !== 'folder') return;
    setActiveFolderId(folderId);
    setSelectedCardId(null);
    setCanvasZoom(1);
    if (typeof viewportRef.current?.scrollTo === 'function') {
      viewportRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
    setFeedback('Submesa local aberta. Você está organizando apenas os cards desta pasta.');
  };

  const leaveOneFolderLevel = () => {
    const parentFolderId = activeFolder?.parentFolderId ?? null;
    setActiveFolderId(parentFolderId);
    setSelectedCardId(null);
    setCanvasZoom(1);
    if (typeof viewportRef.current?.scrollTo === 'function') {
      viewportRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
    setFeedback(parentFolderId ? 'Você voltou um nível na hierarquia de pastas.' : 'Você voltou para a Mesa principal.');
  };

  const leaveFolder = () => {
    setActiveFolderId(null);
    setSelectedCardId(null);
    setCanvasZoom(1);
    if (typeof viewportRef.current?.scrollTo === 'function') {
      viewportRef.current.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
    }
    setFeedback('Você voltou para a Mesa principal.');
  };

  const canMoveItemToScope = (itemId: string, parentFolderId: string | null) => {
    const item = itemsById.get(itemId);
    if (!item) return false;
    if (!parentFolderId) return true;
    const target = itemsById.get(parentFolderId);
    if (!target || target.kind !== 'folder' || target.archived) return false;
    if (item.kind !== 'folder') return true;
    if (item.id === parentFolderId) return false;
    return !isDescendantFolder(parentFolderId, item.id, itemsById);
  };

  const moveItemToScope = (itemId: string, parentFolderId: string | null) => {
    const item = itemsById.get(itemId);
    if (!item) return;
    if (!canMoveItemToScope(itemId, parentFolderId)) {
      setFeedback('Não é possível mover uma pasta para dentro dela mesma ou de uma subpasta.');
      return;
    }

    setItems((currentItems) => {
      const updatedItems = currentItems.map((item) => {
        if (item.id !== itemId) return item;
        return { ...item, parentFolderId };
      });
      setConnections((currentConnections) => {
        const scopedConnections = keepScopedConnections(updatedItems, currentConnections);
        if (scopedConnections.length === currentConnections.length) return currentConnections;
        return scopedConnections;
      });
      return syncLinkedCards(updatedItems, keepScopedConnections(updatedItems, connections));
    });
    setSelectedCardId(null);
    if (!parentFolderId) {
      setFeedback(item.kind === 'folder' ? 'Pasta voltou para a Mesa principal.' : 'Card voltou para a Mesa principal.');
      return;
    }
    setFeedback(item.kind === 'folder' ? 'Pasta movida para dentro de outra pasta local.' : 'Card movido para a pasta local.');
  };

  const renameFolder = (folderId: string) => {
    const title = folderRenameValue.trim();
    if (!title) {
      setFeedback('Informe um nome para renomear a pasta.');
      return;
    }
    updateItem(folderId, (item) => item.kind === 'folder' ? { ...item, title } : item, 'Pasta renomeada localmente nesta Mesa.');
    setRenamingFolderId(null);
    setFolderRenameValue('');
  };

  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);
  const activeFolder = activeFolderId ? itemsById.get(activeFolderId) ?? null : null;
  const folderPath = useMemo(() => getFolderPath(activeFolderId, itemsById), [activeFolderId, itemsById]);
  const availableFoldersInScope = useMemo(
    () => items.filter((item) => item.kind === 'folder' && (item.parentFolderId ?? null) === activeFolderId && !item.archived),
    [activeFolderId, items],
  );
  const visibleItems = useMemo(() => items.filter((item) => {
    const inActiveScope = (item.parentFolderId ?? null) === activeFolderId;
    if (!inActiveScope) return false;
    if (activeFilter === 'all') return true;
    if (activeFilter === 'archived') return item.archived;
    return !item.archived && item.status === activeFilter;
  }), [activeFilter, activeFolderId, items]);
  const visibleItemIds = useMemo(() => new Set(visibleItems.map((item) => item.id)), [visibleItems]);
  const selectedCard = selectedCardId ? itemsById.get(selectedCardId) ?? null : null;
  const selectedCardConnections = useMemo(
    () => selectedCardId ? getCardConnections(selectedCardId, connections) : [],
    [connections, selectedCardId],
  );
  const canvasSize = useMemo(() => getCanvasSize(positions), [positions]);
  const scaledCanvasSize = useMemo(() => ({
    width: canvasSize.width * canvasZoom,
    height: canvasSize.height * canvasZoom,
  }), [canvasSize.height, canvasSize.width, canvasZoom]);
  const accountantPackageItems = useMemo(() => getAccountantPackageItems(items), [items]);
  const accountantPackageSummaryText = useMemo(
    () => formatAccountantPackageText(items, connections),
    [connections, items],
  );
  const accountantPackageTotals = useMemo(() => accountantPackageItems.reduce((current, item) => ({
    sales: current.sales + (item.kind === 'sale' ? 1 : 0),
    expenses: current.expenses + (item.kind === 'expense' ? 1 : 0),
    payments: current.payments + (item.kind === 'payment' ? 1 : 0),
    preInvoices: current.preInvoices + (item.kind === 'pre-invoice' || item.kind === 'invoice-draft' || item.hasPreInvoice ? 1 : 0),
    amount: current.amount + (typeof item.amount === 'number' && Number.isFinite(item.amount) ? item.amount : 0),
  }), { sales: 0, expenses: 0, payments: 0, preInvoices: 0, amount: 0 }), [accountantPackageItems]);

  useEffect(() => {
    const firstVisibleItem = visibleItems[0];
    const firstPosition = firstVisibleItem ? positions[firstVisibleItem.id] : undefined;
    const viewport = viewportRef.current;
    if (!firstPosition || !viewport || typeof viewport.scrollTo !== 'function') return;

    viewport.scrollTo({
      left: Math.max((firstPosition.x - 16) * canvasZoom, 0),
      top: Math.max((firstPosition.y - 16) * canvasZoom, 0),
      behavior: 'smooth',
    });
  }, [activeFilter]);

  const canvasPoint = (clientX: number, clientY: number): CanvasCardPosition => {
    const canvasRect = canvasRef.current?.getBoundingClientRect();
    return {
      x: (clientX - (canvasRect?.left ?? 0)) / canvasZoom,
      y: (clientY - (canvasRect?.top ?? 0)) / canvasZoom,
    };
  };

  const getFolderAtPoint = (point: CanvasCardPosition, draggedItemId?: string) => {
    return visibleItems.find((item) => {
      if (item.kind !== 'folder' || item.archived || item.id === draggedItemId) return false;
      if (draggedItemId && !canMoveItemToScope(draggedItemId, item.id)) return false;
      const position = positions[item.id];
      if (!position) return false;
      return point.x >= position.x
        && point.x <= position.x + CARD_WIDTH
        && point.y >= position.y
        && point.y <= position.y + CARD_APPROX_HEIGHT;
    }) ?? null;
  };

  const openCanvasContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('[data-card-id]')) return;
    event.preventDefault();
    setContextMenu({
      type: 'canvas',
      x: event.clientX,
      y: event.clientY,
      canvasPosition: canvasPoint(event.clientX, event.clientY),
    });
  };

  const openCanvasOptionsMenu = () => {
    const viewport = viewportRef.current;
    const left = viewport ? viewport.getBoundingClientRect().left + 16 : 24;
    const top = viewport ? viewport.getBoundingClientRect().top + 16 : 24;
    setContextMenu({
      type: 'canvas',
      x: left,
      y: top,
      canvasPosition: createCardPosition(),
    });
  };

  const openItemContextMenu = (event: ReactMouseEvent<HTMLElement>, itemId: string) => {
    event.preventDefault();
    event.stopPropagation();
    const item = itemsById.get(itemId);
    setSelectedCardId(itemId);
    setContextMenu({
      type: item?.kind === 'folder' ? 'folder' : 'card',
      x: event.clientX,
      y: event.clientY,
      canvasPosition: canvasPoint(event.clientX, event.clientY),
      itemId,
    });
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
    const targetFolder = getFolderAtPoint(point, cardId);
    setDropTargetFolderId(targetFolder?.id ?? null);
    setPositions((current) => ({
      ...current,
      [cardId]: {
        x: Math.max(point.x - drag.offsetX, 16),
        y: Math.max(point.y - drag.offsetY, 16),
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
    const targetFolderId = dropTargetFolderId;
    setDropTargetFolderId(null);
    if (targetFolderId) {
      moveItemToScope(cardId, targetFolderId);
      return;
    }
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
      return [...current, { id: `${fromId}->${targetId}`, fromId, toId: targetId, status: 'visual' }];
    });
    cancelConnection();
  };

  const markConnectionReconciled = (connectionId: string) => {
    setConnections((currentConnections) => {
      const updatedConnections = currentConnections.map((connection) => connection.id === connectionId
        ? { ...connection, status: 'reconciled' as const, reconciledAt: new Date().toISOString() }
        : connection);
      setItems((currentItems) => syncLinkedCards(currentItems, updatedConnections));
      setFeedback('Vínculo conciliado visualmente e salvo neste navegador.');
      return updatedConnections;
    });
  };

  const undoConnectionReconciliation = (connectionId: string) => {
    setConnections((currentConnections) => {
      const updatedConnections = currentConnections.map((connection) => {
        if (connection.id !== connectionId) return connection;
        return {
          id: connection.id,
          fromId: connection.fromId,
          toId: connection.toId,
          label: connection.label,
          note: connection.note,
          status: 'visual' as const,
        };
      });
      setItems((currentItems) => syncLinkedCards(currentItems, updatedConnections));
      setFeedback('Conciliação visual desfeita. Os vínculos dos cards foram recalculados neste navegador.');
      return updatedConnections;
    });
  };

  const removeConnection = (connectionId: string) => {
    setConnections((currentConnections) => {
      const updatedConnections = currentConnections.filter((connection) => connection.id !== connectionId);
      setItems((currentItems) => syncLinkedCards(currentItems, updatedConnections));
      setFeedback('Vínculo removido e marcações visuais recalculadas neste navegador.');
      return updatedConnections;
    });
  };

  const clearConnections = () => {
    setConnections([]);
    setItems((currentItems) => syncLinkedCards(currentItems, []));
    setFeedback('Todas as conexões visuais foram removidas e os vínculos dos cards foram recalculados neste navegador.');
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
    setSelectedCardId(null);
    setActiveFolderId(null);
    setSelectedMoveFolderId('');
    setContextMenu(null);
    setDropTargetFolderId(null);
    setRenamingFolderId(null);
    setFolderRenameValue('');
    setCanvasZoom(1);
    setFeedback('Demonstração restaurada. Os dados locais da Mesa foram limpos.');
  };

  const copyAccountantPackageSummary = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      setFeedback('Não foi possível copiar automaticamente. O resumo está visível para seleção manual.');
      return;
    }

    try {
      await navigator.clipboard.writeText(accountantPackageSummaryText);
      setFeedback('Resumo local copiado. Revise antes de compartilhar manualmente com o contador.');
    } catch {
      setFeedback('Não foi possível copiar automaticamente. O resumo está visível para seleção manual.');
    }
  };

  const clearAccountantPackage = () => {
    setItems((currentItems) => currentItems.map((item) => {
      if (item.kind === 'accountant-package') return item;
      return item.sentToAccountant ? { ...item, sentToAccountant: false } : item;
    }));
    setFeedback('Pacote local limpo. Os cards continuam na Mesa.');
  };

  const changeCanvasZoom = (nextZoom: number) => {
    setCanvasZoom(clamp(nextZoom, MIN_CANVAS_ZOOM, MAX_CANVAS_ZOOM));
  };

  const fitCanvasToContent = () => {
    const viewport = viewportRef.current;
    if (!viewport) {
      changeCanvasZoom(1);
      return;
    }

    const positionsToFit = visibleItems
      .map((item) => positions[item.id])
      .filter((position): position is CanvasCardPosition => position !== undefined);

    if (positionsToFit.length === 0) {
      changeCanvasZoom(1);
      return;
    }

    const minX = positionsToFit.reduce((current, position) => Math.min(current, position.x), Number.POSITIVE_INFINITY);
    const minY = positionsToFit.reduce((current, position) => Math.min(current, position.y), Number.POSITIVE_INFINITY);
    const maxX = positionsToFit.reduce((current, position) => Math.max(current, position.x + CARD_WIDTH), 0);
    const maxY = positionsToFit.reduce((current, position) => Math.max(current, position.y + CARD_APPROX_HEIGHT), 0);
    const contentWidth = Math.max(maxX - minX + 64, CARD_WIDTH);
    const contentHeight = Math.max(maxY - minY + 64, CARD_APPROX_HEIGHT);
    const widthZoom = viewport.clientWidth > 0 ? viewport.clientWidth / contentWidth : 1;
    const heightZoom = viewport.clientHeight > 0 ? viewport.clientHeight / contentHeight : 1;
    const fittedZoom = clamp(Math.min(widthZoom, heightZoom, 1), MIN_CANVAS_ZOOM, MAX_CANVAS_ZOOM);
    const steppedZoom = Math.round(fittedZoom / CANVAS_ZOOM_STEP) * CANVAS_ZOOM_STEP;
    const nextZoom = clamp(steppedZoom, MIN_CANVAS_ZOOM, MAX_CANVAS_ZOOM);

    setCanvasZoom(nextZoom);
    const scrollToContent = () => {
      viewport.scrollTo({
        left: Math.max((minX - 32) * nextZoom, 0),
        top: Math.max((minY - 32) * nextZoom, 0),
        behavior: 'smooth',
      });
    };
    if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
      window.requestAnimationFrame(scrollToContent);
    } else {
      scrollToContent();
    }
    setFeedback('Visão ajustada ao conteúdo visível da Mesa.');
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
            <nav aria-label="Caminho da Mesa" className={`mt-4 flex flex-wrap items-center gap-1 text-xs font-bold ${dark ? 'text-indigo-200' : 'text-indigo-700'}`}>
              <button
                type="button"
                onClick={leaveFolder}
                className="rounded-md px-1 py-0.5 hover:underline"
              >
                Mesa principal
              </button>
              {folderPath.map((folder) => (
                <span key={folder.id} className="inline-flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  <button
                    type="button"
                    onClick={() => enterFolder(folder.id)}
                    className="rounded-md px-1 py-0.5 hover:underline"
                  >
                    {folder.title}
                  </button>
                </span>
              ))}
            </nav>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              {activeFolder ? `Submesa: ${activeFolder.title}` : 'Mesa Visual'}
            </h1>
            <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
              {activeFolder ? 'Você está organizando apenas os itens desta pasta.' : 'Clique com o botão direito na Mesa para criar pastas, ajustar zoom e organizar a área.'}
            </p>
            <p className={`mt-2 max-w-2xl text-xs leading-relaxed ${dark ? 'text-indigo-200' : 'text-indigo-700'}`}>
              No celular, use Opções da Mesa ou toque nos cards para selecionar. Registre primeiro, organize depois.
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
          <details className="group max-w-full">
            <summary className={`flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black [&::-webkit-details-marker]:hidden ${
              dark ? 'border-slate-700 bg-slate-950 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
            }`}>
              Filtros da Mesa
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] text-white">{FILTERS.find((filter) => filter.id === activeFilter)?.label}</span>
            </summary>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1" aria-label="Filtros dos cards">
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
          </details>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <MousePointer2 className="h-3.5 w-3.5" /> Arraste pelo corpo do card
            </span>
            <span className={`inline-flex items-center gap-1.5 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              <Link2 className="h-3.5 w-3.5" /> {connections.length} conexões
            </span>
            {activeFolder && (
              <>
                <button
                  type="button"
                  onClick={leaveOneFolderLevel}
                  className={`inline-flex min-h-10 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${
                    dark ? 'border-slate-700 text-slate-300 hover:border-amber-500' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                  }`}
                >
                  Voltar um nível
                </button>
                <button
                  type="button"
                  onClick={leaveFolder}
                  className={`inline-flex min-h-10 items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${
                    dark ? 'border-slate-700 text-slate-300 hover:border-amber-500' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                  }`}
                >
                  Voltar para Mesa principal
                </button>
              </>
            )}
            {connections.length > 0 && (
              <button
                type="button"
                onClick={clearConnections}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold ${
                  dark ? 'border-slate-700 text-slate-300 hover:border-red-500' : 'border-slate-200 text-slate-600 hover:border-red-300'
                }`}
              >
                <Trash2 className="h-3 w-3" /> Limpar conexões
              </button>
            )}
          </div>
        </div>
        {connections.length > 0 && (
          <details
            aria-label="Vínculos visuais"
            className={`group mt-3 rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}
          >
            <summary className="flex cursor-pointer list-none flex-col gap-2 rounded-lg sm:flex-row sm:items-start sm:justify-between [&::-webkit-details-marker]:hidden">
              <div>
                <h2 className={`text-sm font-extrabold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Vínculos visuais</h2>
                <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {connections.length} vínculo(s). Conciliação visual local: não altera financeiro real, não envia dados e fica salvo somente neste navegador.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                  dark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  Salvo neste navegador
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                  dark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'
                }`}>
                  <span className="group-open:hidden">Ver vínculos</span>
                  <span className="hidden group-open:inline">Ocultar vínculos</span>
                </span>
              </div>
            </summary>
            <div className="mt-3 grid grid-cols-1 gap-2 lg:grid-cols-2">
              {connections.map((connection) => {
                const from = itemsById.get(connection.fromId);
                const to = itemsById.get(connection.toId);
                const status = connection.status === 'reconciled' ? 'reconciled' : 'visual';
                return (
                  <article
                    key={connection.id}
                    data-testid={`connection-summary-${connection.id}`}
                    className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <p className={`break-words text-xs font-extrabold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {from?.title ?? connection.fromId} -&gt; {to?.title ?? connection.toId}
                        </p>
                        <p className={`mt-1 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Status: <strong>{CONNECTION_STATUS_LABELS[status]}</strong>
                          {connection.reconciledAt && (
                            <span> · {new Date(connection.reconciledAt).toLocaleString('pt-BR')}</span>
                          )}
                        </p>
                      </div>
                      <span className={`w-fit rounded-full px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                        status === 'reconciled'
                          ? dark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-700'
                          : dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {CONNECTION_STATUS_LABELS[status]}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                      {status === 'reconciled' ? (
                        <button
                          type="button"
                          onClick={() => undoConnectionReconciliation(connection.id)}
                          className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold ${
                            dark ? 'border-slate-700 text-slate-300 hover:border-amber-400' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                          }`}
                        >
                          Desfazer conciliação
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => markConnectionReconciled(connection.id)}
                          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-emerald-700"
                        >
                          Marcar conciliado
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeConnection(connection.id)}
                        className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold ${
                          dark ? 'border-slate-700 text-slate-300 hover:border-red-500' : 'border-slate-200 text-slate-600 hover:border-red-300'
                        }`}
                      >
                        Remover vínculo
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </details>
        )}
        <div className={`mt-3 rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm font-extrabold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Registre agora, organize depois.</p>
              <p className={`mt-1 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Este card fica salvo neste navegador.</p>
            </div>
            <button
              type="button"
              aria-expanded={quickRegistrationOpen}
              aria-controls={quickRegistrationTitleId}
              onClick={() => {
                setQuickRegistrationOpen((current) => !current);
                setQuickFormError('');
              }}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
            >
              {quickRegistrationOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              {quickRegistrationOpen ? 'Fechar' : 'Registro rápido'}
            </button>
          </div>

          {quickRegistrationOpen && (
            <form
              aria-labelledby={quickRegistrationTitleId}
              onSubmit={handleQuickRegistrationSubmit}
              className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(160px,220px)_1fr_1fr_minmax(120px,160px)]"
            >
              <h2 id={quickRegistrationTitleId} className="sr-only">Registro rápido</h2>
              <label className={`text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tipo
                <select
                  value={quickRegistrationType}
                  onChange={(event) => setQuickRegistrationType(event.target.value as QuickRegistrationType)}
                  className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                    dark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
                  }`}
                >
                  {QUICK_REGISTRATION_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </label>
              <label className={`text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Título
                <input
                  value={quickTitle}
                  onChange={(event) => setQuickTitle(event.target.value)}
                  aria-required="true"
                  className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                    dark ? 'border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                  placeholder="Ex.: venda no balcão"
                />
              </label>
              <label className={`text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Descrição
                <input
                  value={quickDescription}
                  onChange={(event) => setQuickDescription(event.target.value)}
                  className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                    dark ? 'border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                  placeholder="Opcional"
                />
              </label>
              <label className={`text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Valor
                <input
                  value={quickAmount}
                  onChange={(event) => setQuickAmount(event.target.value)}
                  inputMode="decimal"
                  className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                    dark ? 'border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                  placeholder="Opcional"
                />
              </label>
              <label className={`lg:col-span-3 text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tags
                <input
                  value={quickTags}
                  onChange={(event) => setQuickTags(event.target.value)}
                  className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                    dark ? 'border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400'
                  }`}
                  placeholder="Opcional, separadas por vírgula"
                />
              </label>
              <div className="flex flex-col gap-2 lg:justify-end">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-black text-white transition-colors hover:bg-emerald-700"
                >
                  Criar card
                </button>
                <button
                  type="button"
                  onClick={closeQuickRegistration}
                  className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-2 text-sm font-bold ${
                    dark ? 'border-slate-700 text-slate-300' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Cancelar
                </button>
              </div>
              <p className={`lg:col-span-4 text-[11px] leading-relaxed ${dark ? 'text-amber-300' : 'text-amber-700'}`}>
                {getQuickRegistrationOption(quickRegistrationType).note} Salvo apenas neste navegador.
              </p>
              {quickFormError && (
                <p role="alert" className="lg:col-span-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                  {quickFormError}
                </p>
              )}
            </form>
          )}
        </div>
        <p className={`mt-2 rounded-lg px-3 py-2 text-[11px] leading-relaxed sm:hidden ${dark ? 'bg-slate-950/50 text-slate-400' : 'bg-white text-slate-500'}`}>
          No celular: arraste pelo corpo do card, conecte pelos pontos laterais e deslize pela área vazia para navegar no canvas.
        </p>
      </section>

      <section
        aria-label="Painel contextual do card"
        className={`rounded-2xl border p-3 sm:p-4 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}
      >
        {selectedCard ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(320px,460px)]">
            <div className="min-w-0">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                    dark ? 'bg-indigo-950 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {CARD_KIND_LABELS[selectedCard.kind]}
                  </span>
                  <h2 className={`mt-2 break-words text-lg font-black ${dark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {selectedCard.title}
                  </h2>
                  <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {selectedCard.description}
                  </p>
                </div>
                {selectedCard.kind !== 'folder' && typeof selectedCard.amount === 'number' && Number.isFinite(selectedCard.amount) && (
                  <strong className={`text-base ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    {formatCurrencyBRL(selectedCard.amount)}
                  </strong>
                )}
              </div>

              <dl className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <dt className={dark ? 'text-slate-400' : 'text-slate-500'}>Status</dt>
                  <dd className="mt-1 font-extrabold">{selectedCard.archived ? 'Arquivado' : CARD_STATUS_LABELS[selectedCard.status]}</dd>
                </div>
                <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <dt className={dark ? 'text-slate-400' : 'text-slate-500'}>Pré-nota</dt>
                  <dd className="mt-1 font-extrabold">{selectedCard.hasPreInvoice ? 'Preparada' : 'Não preparada'}</dd>
                </div>
                <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <dt className={dark ? 'text-slate-400' : 'text-slate-500'}>Contador</dt>
                  <dd className="mt-1 font-extrabold">{selectedCard.sentToAccountant ? 'Separado' : 'Não separado'}</dd>
                </div>
                <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                  <dt className={dark ? 'text-slate-400' : 'text-slate-500'}>Vínculos</dt>
                  <dd className="mt-1 font-extrabold">{selectedCardConnections.length}</dd>
                </div>
              </dl>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {selectedCard.tags.map((tag) => (
                  <span key={tag} className={`rounded-md px-2 py-1 text-[10px] ${dark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                    {tag}
                  </span>
                ))}
                {selectedCard.hasPreInvoice && (
                  <>
                    <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Pré-nota visual preparada</span>
                    <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">Sem valor fiscal</span>
                  </>
                )}
                {selectedCard.sentToAccountant && (
                  <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] text-violet-700 dark:bg-violet-950 dark:text-violet-300">Separado para contador</span>
                )}
                {selectedCard.linked && (
                  <span className="rounded-md bg-sky-100 px-2 py-1 text-[10px] text-sky-700 dark:bg-sky-950 dark:text-sky-300">Vínculo visual</span>
                )}
                {selectedCard.kind === 'folder' && (
                  <span className="rounded-md bg-amber-100 px-2 py-1 text-[10px] text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    {getFolderChildCounts(items, selectedCard.id).cards} item(ns) e {getFolderChildCounts(items, selectedCard.id).folders} subpasta(s)
                  </span>
                )}
              </div>

              <div className={`mt-3 rounded-xl border p-3 text-xs ${dark ? 'border-slate-800 bg-slate-950/50 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
                <p className="font-extrabold">Vínculos relacionados</p>
                {selectedCardConnections.length === 0 ? (
                  <p className="mt-1">Nenhum vínculo visual ligado a este card.</p>
                ) : (
                  <ul className="mt-2 space-y-1">
                    {selectedCardConnections.map((connection) => {
                      const otherId = connection.fromId === selectedCard.id ? connection.toId : connection.fromId;
                      const other = itemsById.get(otherId);
                      const status = connection.status === 'reconciled' ? 'conciliado' : 'visual';
                      return (
                        <li key={connection.id}>
                          {other?.title ?? otherId} · {status}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div data-no-card-drag className={`rounded-xl border border-dashed p-3 ${dark ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
              <p className={`text-[10px] font-black uppercase tracking-wider ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
                Ações do card selecionado
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
                {selectedCard.kind === 'folder' && (
                  <button
                    type="button"
                    onClick={() => enterFolder(selectedCard.id)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-amber-700"
                  >
                    <Folder className="h-3.5 w-3.5" /> Abrir pasta
                  </button>
                )}
                {selectedCard.kind === 'folder' && (
                  <div className={`rounded-lg border p-3 sm:col-span-2 xl:col-span-1 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-wide ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Renomear pasta</p>
                    {renamingFolderId === selectedCard.id ? (
                      <>
                        <label className={`mt-2 block text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Nome da pasta
                          <input
                            value={folderRenameValue}
                            onChange={(event) => setFolderRenameValue(event.target.value)}
                            className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                              dark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
                            }`}
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => renameFolder(selectedCard.id)}
                          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-amber-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-amber-700"
                        >
                          Salvar nome da pasta
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setRenamingFolderId(selectedCard.id);
                          setFolderRenameValue(selectedCard.title);
                        }}
                        className={`mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold ${
                          dark ? 'border-slate-700 text-slate-300 hover:border-amber-500' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                        }`}
                      >
                        Renomear pasta
                      </button>
                    )}
                  </div>
                )}
                {selectedCard.kind !== 'folder' && !selectedCard.archived && selectedCard.status !== 'resolved' && (
                  <button
                    type="button"
                    onClick={() => moveNext(selectedCard.id)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-indigo-700"
                  >
                    <ArrowRight className="h-3.5 w-3.5" /> Avançar para {CARD_STATUS_LABELS[getNextStatus(selectedCard.status)]}
                  </button>
                )}
                {selectedCard.kind !== 'folder' && !selectedCard.archived && selectedCard.status !== 'resolved' && (
                  <button
                    type="button"
                    onClick={() => updateItem(selectedCard.id, (current) => ({ ...current, status: 'resolved' }), 'Card marcado como resolvido nesta demonstração.')}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-emerald-500' : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" /> Resolver / Pronto
                  </button>
                )}
                {selectedCard.kind !== 'folder' && !selectedCard.archived && (selectedCard.kind === 'sale' || selectedCard.kind === 'invoice-draft') && !selectedCard.hasPreInvoice && (
                  <button
                    type="button"
                    onClick={() => updateItem(selectedCard.id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Pré-nota visual adicionada sem valor fiscal. Nenhum documento fiscal foi criado ou emitido.')}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-amber-400' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                    }`}
                  >
                    <FolderCheck className="h-3.5 w-3.5" /> Preparar pré-nota visual
                  </button>
                )}
                {selectedCard.kind !== 'folder' && !selectedCard.archived && ['sale', 'expense', 'invoice-draft', 'pre-invoice', 'accountant-package'].includes(selectedCard.kind) && !selectedCard.sentToAccountant && (
                  <button
                    type="button"
                    onClick={() => updateItem(selectedCard.id, (current) => ({ ...current, sentToAccountant: true }), 'Card separado localmente para o contador. Nenhum dado saiu do navegador.')}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-violet-500' : 'border-slate-200 text-slate-600 hover:border-violet-300'
                    }`}
                  >
                    <PackageOpen className="h-3.5 w-3.5" /> Separar para contador
                  </button>
                )}
                {selectedCard.kind !== 'folder' && !selectedCard.archived && (selectedCard.kind === 'payment' || selectedCard.kind === 'sale') && !selectedCard.linked && (
                  <button
                    type="button"
                    onClick={() => updateItem(selectedCard.id, (current) => ({ ...current, linked: true, status: 'review' }), 'Vínculo de fallback registrado apenas neste card.')}
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                      dark ? 'border-slate-700 text-slate-300 hover:border-sky-500' : 'border-slate-200 text-slate-600 hover:border-sky-300'
                    }`}
                  >
                    <Link2 className="h-3.5 w-3.5" /> Simular vínculo visual
                  </button>
                )}
                {!selectedCard.archived && (
                  <div className={`rounded-lg border p-3 sm:col-span-2 xl:col-span-1 ${dark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white'}`}>
                    <p className={`text-[10px] font-black uppercase tracking-wide ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Mover para pasta</p>
                    {selectedCard.parentFolderId ? (
                      <>
                        <p className={`mt-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Este item está em: <strong>{itemsById.get(selectedCard.parentFolderId)?.title ?? 'Pasta local'}</strong>
                        </p>
                        <button
                          type="button"
                          onClick={() => moveItemToScope(selectedCard.id, null)}
                          className={`mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold ${
                            dark ? 'border-slate-700 text-slate-300 hover:border-amber-500' : 'border-slate-200 text-slate-600 hover:border-amber-300'
                          }`}
                        >
                          Mover para Mesa principal
                        </button>
                      </>
                    ) : availableFoldersInScope.filter((folder) => folder.id !== selectedCard.id && canMoveItemToScope(selectedCard.id, folder.id)).length > 0 ? (
                      <>
                        <label className={`mt-2 block text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                          Pasta
                          <select
                            value={selectedMoveFolderId || availableFoldersInScope.find((folder) => folder.id !== selectedCard.id && canMoveItemToScope(selectedCard.id, folder.id))?.id}
                            onChange={(event) => setSelectedMoveFolderId(event.target.value)}
                            className={`mt-1 h-11 w-full rounded-lg border px-3 text-sm ${
                              dark ? 'border-slate-700 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
                            }`}
                          >
                            {availableFoldersInScope.filter((folder) => folder.id !== selectedCard.id && canMoveItemToScope(selectedCard.id, folder.id)).map((folder) => (
                              <option key={folder.id} value={folder.id}>{folder.title}</option>
                            ))}
                          </select>
                        </label>
                        <button
                          type="button"
                          onClick={() => moveItemToScope(selectedCard.id, selectedMoveFolderId || availableFoldersInScope.find((folder) => folder.id !== selectedCard.id && canMoveItemToScope(selectedCard.id, folder.id))?.id || null)}
                          className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-amber-600 px-3 py-2 text-xs font-black text-white transition-colors hover:bg-amber-700"
                        >
                          Mover para pasta
                        </button>
                      </>
                    ) : (
                      <p className={`mt-2 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Crie uma pasta na Mesa principal para mover este card.</p>
                    )}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => updateItem(selectedCard.id, (current) => ({ ...current, archived: !current.archived }), selectedCard.archived ? 'Item desarquivado nesta demonstração.' : 'Item arquivado nesta demonstração.')}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                    dark ? 'border-slate-700 text-slate-300 hover:border-red-500' : 'border-slate-200 text-slate-600 hover:border-red-300'
                  }`}
                >
                  {selectedCard.archived ? <ArchiveRestore className="h-3.5 w-3.5" /> : <Archive className="h-3.5 w-3.5" />}
                  {selectedCard.archived ? 'Desarquivar' : 'Arquivar'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCardId(null)}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold ${
                    dark ? 'border-slate-700 text-slate-300 hover:border-indigo-500' : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  <X className="h-3.5 w-3.5" /> Limpar seleção
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className={`text-sm font-black ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Nenhum card selecionado</h2>
              <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                Toque em um card da Mesa para ver detalhes, vínculos e ações locais.
              </p>
            </div>
            <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
              dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              Seleção temporária
            </span>
          </div>
        )}
      </section>

      <div aria-live="polite" className={`rounded-xl border px-4 py-3 text-xs ${
        dark ? 'border-slate-800 bg-slate-900/60 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
      }`}>
        {feedback}
      </div>

      <section
        aria-label="Pacote local para contador"
        className={`rounded-2xl border p-3 sm:p-4 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
              dark ? 'bg-violet-950 text-violet-300' : 'bg-violet-100 text-violet-700'
            }`}>
              <PackageCheck className="h-3.5 w-3.5" /> Separado neste navegador
            </span>
            <h2 className={`mt-2 text-base font-black ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Pacote local para contador</h2>
            <p className={`mt-1 text-xs leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sem envio automático. Sem valor fiscal. Revise antes de compartilhar manualmente com o contador.
              <span className="hidden sm:inline"> Organização interna local: não substitui contador, não é documento fiscal, não emite nota, não valida tributo e não sincroniza fora do navegador.</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:min-w-[360px]">
            <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
              <span className={dark ? 'text-slate-400' : 'text-slate-500'}>Cards</span>
              <strong className="block text-lg">{accountantPackageItems.length}</strong>
            </div>
            <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
              <span className={dark ? 'text-slate-400' : 'text-slate-500'}>Vendas</span>
              <strong className="block text-lg">{accountantPackageTotals.sales}</strong>
            </div>
            <div className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
              <span className={dark ? 'text-slate-400' : 'text-slate-500'}>Visual</span>
              <strong className="block text-sm">{formatCurrencyBRL(accountantPackageTotals.amount)}</strong>
            </div>
          </div>
        </div>

        {accountantPackageItems.length === 0 ? (
          <div className={`mt-3 rounded-xl border border-dashed p-4 text-sm ${dark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
            <p className="font-bold">Nenhum card separado para contador ainda.</p>
            <p className="mt-1 text-xs">Use a ação ‘Separar contador’ em um card da Mesa.</p>
          </div>
        ) : (
          <details className={`group mt-3 rounded-xl border p-3 ${dark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
            <summary className="flex cursor-pointer list-none flex-col gap-2 rounded-lg sm:flex-row sm:items-center sm:justify-between [&::-webkit-details-marker]:hidden">
              <span className={`text-sm font-extrabold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Resumo local visível e cards separados</span>
              <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide ${
                dark ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600'
              }`}>
                <span className="group-open:hidden">Expandir pacote</span>
                <span className="hidden group-open:inline">Recolher pacote</span>
              </span>
            </summary>
            <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {accountantPackageItems.map((item) => (
                  <article
                    key={item.id}
                    data-testid={`accountant-package-item-${item.id}`}
                    className={`rounded-xl border p-3 ${dark ? 'border-slate-800 bg-[#121218]' : 'border-slate-200 bg-white'}`}
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <h3 className={`break-words text-sm font-extrabold ${dark ? 'text-slate-100' : 'text-slate-900'}`}>{item.title}</h3>
                        <p className={`mt-1 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {PACKAGE_KIND_LABELS[item.kind]} · {PACKAGE_STATUS_LABELS[item.status]}
                        </p>
                      </div>
                      {typeof item.amount === 'number' && Number.isFinite(item.amount) && (
                        <strong className={`text-sm ${dark ? 'text-emerald-400' : 'text-emerald-700'}`}>{formatCurrencyBRL(item.amount)}</strong>
                      )}
                    </div>
                    <p className={`mt-2 text-[11px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {(item.hasPreInvoice || item.kind === 'pre-invoice' || item.kind === 'invoice-draft') ? 'Tem pré-nota visual' : 'Sem pré-nota visual'} · {getPackageConnectionLabel(item, connections)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag) => (
                        <span key={tag} className={`rounded-md px-2 py-1 text-[10px] ${dark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
              <label className={`text-xs font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                Resumo local visível
                <textarea
                  readOnly
                  value={accountantPackageSummaryText}
                  className={`mt-1 min-h-36 w-full resize-y rounded-xl border p-3 font-mono text-[11px] leading-relaxed sm:min-h-48 ${
                    dark ? 'border-slate-700 bg-slate-950 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                />
              </label>
            </div>
          </details>
        )}

        <div className="mt-3 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
          <button
            type="button"
            onClick={copyAccountantPackageSummary}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-indigo-700"
          >
            <Clipboard className="h-3.5 w-3.5" /> Copiar resumo
          </button>
          <button
            type="button"
            onClick={clearAccountantPackage}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-bold ${
              dark ? 'border-slate-700 text-slate-300 hover:border-violet-500' : 'border-slate-200 text-slate-600 hover:border-violet-300'
            }`}
          >
            <Trash2 className="h-3.5 w-3.5" /> Limpar pacote local
          </button>
        </div>
      </section>

      <div
        ref={viewportRef}
        data-testid="task-canvas-viewport"
        className={`relative h-[58svh] min-h-[360px] max-h-[640px] overflow-auto overscroll-contain rounded-2xl border shadow-inner sm:h-[70vh] sm:min-h-[560px] sm:max-h-[720px] sm:rounded-3xl ${
          dark ? 'border-slate-800 bg-[#0c0c11]' : 'border-slate-200 bg-slate-100'
        }`}
      >
        <button
          type="button"
          data-no-card-drag
          onClick={openCanvasOptionsMenu}
          className={`sticky left-3 top-3 z-40 inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black shadow-sm sm:hidden ${
            dark ? 'border-slate-700 bg-[#121218] text-slate-200' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <MoreHorizontal className="h-4 w-4" /> Opções da Mesa
        </button>
        {activeFolder && visibleItems.length === 0 && (
          <div className={`sticky left-4 top-4 z-30 w-[min(360px,calc(100vw-3rem))] rounded-xl border p-4 text-sm shadow-lg ${
            dark ? 'border-slate-800 bg-[#121218] text-slate-300' : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <p className={`font-black ${dark ? 'text-slate-100' : 'text-slate-900'}`}>Esta pasta ainda está vazia.</p>
            <p className="mt-1 text-xs">Volte para a Mesa principal e mova cards para cá pelo painel contextual.</p>
          </div>
        )}
        <div
          data-testid="task-canvas-scroll-surface"
          className="relative"
          style={{ width: scaledCanvasSize.width, height: scaledCanvasSize.height }}
        >
          <div
            ref={canvasRef}
            data-testid="task-canvas"
            onContextMenu={openCanvasContextMenu}
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
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              transform: `scale(${canvasZoom})`,
              transformOrigin: 'top left',
            }}
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
                    stroke={connection.status === 'reconciled' ? '#059669' : dark ? '#818cf8' : '#4f46e5'}
                    strokeWidth={connection.status === 'reconciled' ? '4' : '3'}
                    strokeLinecap="round"
                    strokeDasharray={connection.status === 'reconciled' ? undefined : '10 8'}
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
                    folderItemsCount={item.kind === 'folder' ? getFolderChildCounts(items, item.id).cards : undefined}
                    folderFoldersCount={item.kind === 'folder' ? getFolderChildCounts(items, item.id).folders : undefined}
                    isSelected={selectedCardId === item.id}
                    isDropTarget={dropTargetFolderId === item.id}
                    onSelect={setSelectedCardId}
                    onContextMenu={openItemContextMenu}
                    onDragPointerDown={handleCardPointerDown}
                    onDragPointerMove={handleCardPointerMove}
                    onDragPointerUp={finishCardDrag}
                    onConnectionStart={item.kind === 'folder' ? undefined : beginConnection}
                    onConnectionEnd={item.kind === 'folder' ? undefined : (_, targetId) => finishConnection(targetId)}
                    isConnecting={connectionSourceId === item.id}
                    canReceiveConnection={item.kind !== 'folder' && connectionSourceId !== null && connectionSourceId !== item.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {contextMenu && (
        <div
          role="menu"
          aria-label={
            contextMenu.type === 'canvas'
              ? 'Menu contextual da Mesa'
              : contextMenu.type === 'folder'
                ? 'Menu contextual da pasta'
                : 'Menu contextual do card'
          }
          onClick={(event) => event.stopPropagation()}
          className={`fixed z-50 w-64 rounded-xl border p-2 text-xs shadow-2xl ${
            dark ? 'border-slate-700 bg-[#121218] text-slate-100' : 'border-slate-200 bg-white text-slate-800'
          }`}
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenu.type === 'canvas' && (
            <div className="grid gap-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  createFolderAt(contextMenu.canvasPosition);
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950"
              >
                <Folder className="h-4 w-4" /> Criar pasta aqui
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setQuickRegistrationOpen(true);
                  setQuickFormError('');
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-950"
              >
                <Plus className="h-4 w-4" /> Registro rápido
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  fitCanvasToContent();
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Maximize2 className="h-4 w-4" /> Ajustar visão
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  changeCanvasZoom(1);
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Zoom 100%
              </button>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  role="menuitem"
                  disabled={canvasZoom <= MIN_CANVAS_ZOOM}
                  onClick={() => {
                    changeCanvasZoom(canvasZoom - CANVAS_ZOOM_STEP);
                    setContextMenu(null);
                  }}
                  className="flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
                >
                  <Minus className="h-4 w-4" /> Diminuir zoom
                </button>
                <button
                  type="button"
                  role="menuitem"
                  disabled={canvasZoom >= MAX_CANVAS_ZOOM}
                  onClick={() => {
                    changeCanvasZoom(canvasZoom + CANVAS_ZOOM_STEP);
                    setContextMenu(null);
                  }}
                  className="flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 font-bold hover:bg-slate-100 disabled:opacity-50 dark:hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" /> Aumentar zoom
                </button>
              </div>
              <p className={`px-3 py-1 text-[11px] font-bold ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Zoom atual: {formatCanvasZoom(canvasZoom)}</p>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  restoreDemonstration();
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-950"
              >
                <RotateCcw className="h-4 w-4" /> Restaurar demonstração
              </button>
            </div>
          )}

          {contextMenu.type === 'card' && contextMenu.itemId && itemsById.get(contextMenu.itemId) && (
            <div className="grid gap-1">
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setSelectedCardId(contextMenu.itemId ?? null);
                  setContextMenu(null);
                }}
                className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-indigo-100 hover:text-indigo-800 dark:hover:bg-indigo-950"
              >
                Selecionar card
              </button>
              {(() => {
                const item = itemsById.get(contextMenu.itemId);
                if (!item) return null;
                return (
                  <>
                    {!item.archived && (item.kind === 'sale' || item.kind === 'invoice-draft') && !item.hasPreInvoice && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          updateItem(item.id, (current) => ({ ...current, hasPreInvoice: true, status: 'review' }), 'Pré-nota visual adicionada sem valor fiscal. Nenhum documento fiscal foi criado ou emitido.');
                          setContextMenu(null);
                        }}
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950"
                      >
                        Preparar pré-nota visual
                      </button>
                    )}
                    {!item.archived && ['sale', 'expense', 'invoice-draft', 'pre-invoice', 'accountant-package'].includes(item.kind) && !item.sentToAccountant && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          updateItem(item.id, (current) => ({ ...current, sentToAccountant: true }), 'Card separado localmente para o contador. Nenhum dado saiu do navegador.');
                          setContextMenu(null);
                        }}
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-violet-100 hover:text-violet-800 dark:hover:bg-violet-950"
                      >
                        Separar para contador
                      </button>
                    )}
                    {item.parentFolderId && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          moveItemToScope(item.id, null);
                          setContextMenu(null);
                        }}
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950"
                      >
                        Mover para Mesa principal
                      </button>
                    )}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        updateItem(item.id, (current) => ({ ...current, archived: !current.archived }), item.archived ? 'Item desarquivado nesta demonstração.' : 'Item arquivado nesta demonstração.');
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-950"
                    >
                      {item.archived ? 'Desarquivar' : 'Arquivar'}
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedCardId(item.id);
                        setFeedback('Painel do card aberto para ações locais.');
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Abrir painel do card
                    </button>
                  </>
                );
              })()}
            </div>
          )}

          {contextMenu.type === 'folder' && contextMenu.itemId && itemsById.get(contextMenu.itemId) && (
            <div className="grid gap-1">
              {(() => {
                const item = itemsById.get(contextMenu.itemId);
                if (!item || item.kind !== 'folder') return null;
                return (
                  <>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        enterFolder(item.id);
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950"
                    >
                      <Folder className="h-4 w-4" /> Abrir pasta
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedCardId(item.id);
                        setRenamingFolderId(item.id);
                        setFolderRenameValue(item.title);
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Renomear pasta
                    </button>
                    {item.parentFolderId && (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          moveItemToScope(item.id, null);
                          setContextMenu(null);
                        }}
                        className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-amber-100 hover:text-amber-800 dark:hover:bg-amber-950"
                      >
                        Mover para Mesa principal
                      </button>
                    )}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        updateItem(item.id, (current) => ({ ...current, archived: !current.archived }), item.archived ? 'Item desarquivado nesta demonstração.' : 'Item arquivado nesta demonstração.');
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-red-100 hover:text-red-800 dark:hover:bg-red-950"
                    >
                      {item.archived ? 'Desarquivar pasta' : 'Arquivar pasta'}
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setSelectedCardId(item.id);
                        setFeedback('Painel da pasta aberto para ações locais.');
                        setContextMenu(null);
                      }}
                      className="flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-left font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Ver painel da pasta
                    </button>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
