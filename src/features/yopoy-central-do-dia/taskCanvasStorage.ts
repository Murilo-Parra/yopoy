import { TASK_CANVAS_STORAGE_KEY as TASK_CANVAS_STORAGE_KEY_FROM_SUMMARY } from '../yopoy-dashboard/taskCanvasSummary';

export const TASK_CANVAS_STORAGE_KEY = TASK_CANVAS_STORAGE_KEY_FROM_SUMMARY;

export interface TaskCanvasSnapshot {
  version: 1;
  items?: unknown;
  connections?: unknown;
  positions?: unknown;
  activeFilter?: unknown;
  updatedAt?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function createEmptyTaskCanvasSnapshot(): TaskCanvasSnapshot {
  return {
    version: 1,
    items: [],
    connections: [],
    positions: {},
    activeFilter: 'all',
    updatedAt: new Date().toISOString(),
  };
}

export function createDemoTaskCanvasSnapshot(): TaskCanvasSnapshot {
  return createEmptyTaskCanvasSnapshot();
}

export function readTaskCanvasSnapshot(): TaskCanvasSnapshot | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.version !== 1 || !Array.isArray(parsed.items)) return null;

    return parsed as unknown as TaskCanvasSnapshot;
  } catch {
    return null;
  }
}

export function writeTaskCanvasSnapshot(snapshot: TaskCanvasSnapshot) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify({
      ...snapshot,
      updatedAt: snapshot.updatedAt ?? new Date().toISOString(),
    }));
    notifyTaskCanvasUpdated();
  } catch {
    // O navegador pode bloquear o storage; as visões continuam funcionais na sessão atual.
  }
}

export function clearTaskCanvasSnapshot() {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(TASK_CANVAS_STORAGE_KEY);
    notifyTaskCanvasUpdated();
  } catch {
    // Sem storage disponível, apenas limpamos a fonte em memória.
  }
}

export function notifyTaskCanvasUpdated() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('yopoy:task-canvas-updated'));
}

export function subscribeTaskCanvasUpdates(callback: () => void) {
  if (typeof window === 'undefined') return () => undefined;

  const handleStorage = (event: StorageEvent) => {
    if (event.key === TASK_CANVAS_STORAGE_KEY || event.key === null) callback();
  };
  const handleFocus = () => callback();
  const handleCustomEvent = () => callback();

  window.addEventListener('storage', handleStorage);
  window.addEventListener('focus', handleFocus);
  window.addEventListener('yopoy:task-canvas-updated', handleCustomEvent);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('focus', handleFocus);
    window.removeEventListener('yopoy:task-canvas-updated', handleCustomEvent);
  };
}
