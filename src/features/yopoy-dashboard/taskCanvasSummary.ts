import type { CanvasCardConnection, SmartCardItem } from '../yopoy-central-do-dia/types';

export const TASK_CANVAS_STORAGE_KEY = 'yopoy:task-canvas:v1';

const TASK_CANVAS_STORAGE_VERSION = 1;
const PENDING_STATUSES = new Set(['new', 'pending', 'review']);

interface TaskCanvasSnapshot {
  version: 1;
  items?: unknown;
  connections?: unknown;
}

export interface TaskCanvasSummary {
  internalSalesTotal: number;
  paymentsTotal: number;
  expensesTotal: number;
  visualBalance: number;
  pendingCardsCount: number;
  reconciledConnectionsCount: number;
  internalPreInvoicesCount: number;
  accountantSeparatedCount: number;
  localCardsCount: number;
}

const EMPTY_SUMMARY: TaskCanvasSummary = {
  internalSalesTotal: 0,
  paymentsTotal: 0,
  expensesTotal: 0,
  visualBalance: 0,
  pendingCardsCount: 0,
  reconciledConnectionsCount: 0,
  internalPreInvoicesCount: 0,
  accountantSeparatedCount: 0,
  localCardsCount: 0,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSnapshot(value: unknown): value is TaskCanvasSnapshot {
  return isRecord(value) && value.version === TASK_CANVAS_STORAGE_VERSION;
}

function readAmount(item: SmartCardItem) {
  return typeof item.amount === 'number' && Number.isFinite(item.amount) ? item.amount : 0;
}

function isActiveItem(item: SmartCardItem) {
  return item.archived !== true;
}

function isSmartCardItem(value: unknown): value is SmartCardItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string'
    && typeof value.kind === 'string'
    && typeof value.status === 'string'
  );
}

function isCanvasCardConnection(value: unknown): value is CanvasCardConnection {
  return isRecord(value) && typeof value.status === 'string';
}

export function buildTaskCanvasSummary(snapshot: unknown): TaskCanvasSummary {
  if (!isSnapshot(snapshot)) return { ...EMPTY_SUMMARY };

  const items = Array.isArray(snapshot.items)
    ? snapshot.items.filter(isSmartCardItem)
    : [];
  const connections = Array.isArray(snapshot.connections)
    ? snapshot.connections.filter(isCanvasCardConnection)
    : [];
  const reconciledConnectionsCount = connections.filter((connection) => connection.status === 'reconciled').length;

  const summary = items.reduce<TaskCanvasSummary>((currentSummary, item) => {
    const active = isActiveItem(item);

    if (active && item.kind === 'sale') {
      currentSummary.internalSalesTotal += readAmount(item);
    }

    if (active && item.kind === 'payment') {
      currentSummary.paymentsTotal += readAmount(item);
    }

    if (active && item.kind === 'expense') {
      currentSummary.expensesTotal += readAmount(item);
    }

    if (active && PENDING_STATUSES.has(item.status)) {
      currentSummary.pendingCardsCount += 1;
    }

    if (item.kind === 'pre-invoice' || item.kind === 'invoice-draft' || item.hasPreInvoice === true) {
      currentSummary.internalPreInvoicesCount += 1;
    }

    if (item.sentToAccountant === true || item.kind === 'accountant-package') {
      currentSummary.accountantSeparatedCount += 1;
    }

    if (item.id.startsWith('local-')) {
      currentSummary.localCardsCount += 1;
    }

    return currentSummary;
  }, { ...EMPTY_SUMMARY });

  return {
    ...summary,
    reconciledConnectionsCount,
    visualBalance: summary.paymentsTotal - summary.expensesTotal,
  };
}

export function readTaskCanvasSummary(): TaskCanvasSummary {
  if (typeof window === 'undefined') return { ...EMPTY_SUMMARY };

  try {
    const stored = window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY);
    if (!stored) return { ...EMPTY_SUMMARY };

    return buildTaskCanvasSummary(JSON.parse(stored));
  } catch {
    return { ...EMPTY_SUMMARY };
  }
}

export function formatCurrencyBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
