// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { CanvasCardConnection, SmartCardItem } from '../yopoy-central-do-dia/types';
import {
  buildTaskCanvasSummary,
  formatCurrencyBRL,
  readTaskCanvasSummary,
  TASK_CANVAS_STORAGE_KEY,
} from './taskCanvasSummary';

function createItem(kind: SmartCardItem['kind'], overrides: Partial<SmartCardItem> = {}): SmartCardItem {
  return {
    id: `${kind}-1`,
    kind,
    title: 'Card',
    description: 'Card local de teste',
    amount: 0,
    timeLabel: 'agora',
    status: 'ready',
    archived: false,
    linked: false,
    hasPreInvoice: false,
    tags: ['Teste'],
    ...overrides,
  };
}

function createConnection(overrides: Partial<CanvasCardConnection> = {}): CanvasCardConnection {
  return {
    id: 'connection-1',
    fromId: 'sale-1',
    toId: 'payment-1',
    status: 'visual',
    ...overrides,
  };
}

describe('taskCanvasSummary', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('retorna resumo zerado para snapshot ausente, inválido ou incompatível', () => {
    expect(buildTaskCanvasSummary(null).internalSalesTotal).toBe(0);
    expect(buildTaskCanvasSummary({ version: 2, items: [] }).paymentsTotal).toBe(0);

    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, '{json inválido');
    expect(readTaskCanvasSummary().expensesTotal).toBe(0);
  });

  it('calcula totais, saldo visual e ignora cards arquivados nos totais principais', () => {
    const summary = buildTaskCanvasSummary({
      version: 1,
      items: [
        createItem('sale', { amount: 120 }),
        createItem('sale', { id: 'sale-archived', amount: 80, archived: true }),
        createItem('payment', { amount: 90 }),
        createItem('expense', { amount: 35 }),
        createItem('expense', { id: 'expense-archived', amount: 20, archived: true }),
      ],
      connections: [],
    });

    expect(summary.internalSalesTotal).toBe(120);
    expect(summary.paymentsTotal).toBe(90);
    expect(summary.expensesTotal).toBe(35);
    expect(summary.visualBalance).toBe(55);
  });

  it('conta pendências, vínculos conciliados, pré-notas, contador e cards locais', () => {
    const summary = buildTaskCanvasSummary({
      version: 1,
      items: [
        createItem('pending', { id: 'local-pending', status: 'pending' }),
        createItem('capture', { id: 'capture-review', status: 'review' }),
        createItem('capture', { id: 'capture-resolved', status: 'resolved' }),
        createItem('pre-invoice', { id: 'pre-invoice-1' }),
        createItem('invoice-draft', { id: 'invoice-draft-1', archived: true }),
        createItem('sale', { id: 'sale-with-pre-invoice', hasPreInvoice: true }),
        createItem('accountant-package', { id: 'accountant-package-1' }),
        createItem('expense', { id: 'expense-accountant', sentToAccountant: true }),
      ],
      connections: [
        createConnection({ id: 'connection-reconciled', status: 'reconciled' }),
        createConnection({ id: 'connection-visual', status: 'visual' }),
      ],
    });

    expect(summary.pendingCardsCount).toBe(2);
    expect(summary.reconciledConnectionsCount).toBe(1);
    expect(summary.internalPreInvoicesCount).toBe(3);
    expect(summary.accountantSeparatedCount).toBe(2);
    expect(summary.localCardsCount).toBe(1);
  });

  it('formata moeda em reais', () => {
    expect(formatCurrencyBRL(12.5)).toMatch(/R\$\s*12,50/);
  });
});
