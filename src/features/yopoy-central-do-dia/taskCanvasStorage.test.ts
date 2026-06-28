// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  TASK_CANVAS_STORAGE_KEY,
  clearTaskCanvasSnapshot,
  createEmptyTaskCanvasSnapshot,
  notifyTaskCanvasUpdated,
  readTaskCanvasSnapshot,
  subscribeTaskCanvasUpdates,
  writeTaskCanvasSnapshot,
} from './taskCanvasStorage';

describe('taskCanvasStorage', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('salva, lê e limpa o snapshot local da Mesa', () => {
    const snapshot = createEmptyTaskCanvasSnapshot();
    snapshot.items = [];

    expect(readTaskCanvasSnapshot()).toBeNull();

    writeTaskCanvasSnapshot(snapshot);
    expect(window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY)).not.toBeNull();
    expect(readTaskCanvasSnapshot()?.version).toBe(1);
    expect(readTaskCanvasSnapshot()?.items).toEqual([]);

    clearTaskCanvasSnapshot();
    expect(window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY)).toBeNull();
    expect(readTaskCanvasSnapshot()).toBeNull();
  });

  it('notifica assinantes quando a Mesa muda localmente', () => {
    const callback = vi.fn();
    const unsubscribe = subscribeTaskCanvasUpdates(callback);

    notifyTaskCanvasUpdated();
    expect(callback).toHaveBeenCalledTimes(1);

    window.dispatchEvent(new StorageEvent('storage', { key: TASK_CANVAS_STORAGE_KEY }));
    expect(callback).toHaveBeenCalledTimes(2);

    window.dispatchEvent(new Event('focus'));
    expect(callback).toHaveBeenCalledTimes(3);

    unsubscribe();
    notifyTaskCanvasUpdated();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
