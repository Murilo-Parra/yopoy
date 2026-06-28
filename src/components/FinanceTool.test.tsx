// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import FinanceTool from './FinanceTool';
import { TASK_CANVAS_STORAGE_KEY, createEmptyTaskCanvasSnapshot } from '../features/yopoy-central-do-dia/taskCanvasStorage';
import type { SmartCardItem } from '../features/yopoy-central-do-dia/types';
import type { Transaction } from '../types';

const baseTransaction = (overrides: Partial<Transaction>): Transaction => ({
  id: 'legacy-1',
  establishmentName: 'Legacy fallback',
  amount: 999,
  date: '2026-06-25',
  category: 'Outros',
  status: 'Confirmado',
  type: 'Receita',
  ...overrides,
});

const deskCard = (overrides: Partial<SmartCardItem>): SmartCardItem => ({
  id: 'desk-1',
  kind: 'payment',
  title: 'Comprovante Pix',
  description: 'Recebimento vindo da Mesa',
  amount: 150,
  timeLabel: 'hoje, 10:42',
  status: 'ready',
  archived: false,
  linked: false,
  hasPreInvoice: false,
  tags: ['Mesa Visual'],
  sourceDate: '2026-06-25',
  ...overrides,
});

describe('FinanceTool', () => {
  beforeEach(() => {
    cleanup();
    window.localStorage.clear();
  });

  it('prioriza a Mesa para resumo e livro-caixa e não mostra a seção duplicada', () => {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify({
      ...createEmptyTaskCanvasSnapshot(),
      items: [
        deskCard({ id: 'desk-pay', kind: 'payment', title: 'Comprovante Pix', amount: 150 }),
        deskCard({ id: 'desk-exp', kind: 'expense', title: 'Despesa fornecedor', amount: 40, description: 'Compra local', sourceDate: '2026-06-24', tags: ['Mesa Visual', 'Despesa local'] }),
      ],
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));

    render(
      <FinanceTool
        transactions={[baseTransaction({ id: 'legacy-ignored', establishmentName: 'Legacy consulta', amount: 999 })]}
        setTransactions={vi.fn()}
        employees={[]}
        setEmployees={vi.fn()}
        cashBalance={0}
        setCashBalance={vi.fn()}
        products={[]}
        selectedPlan="media"
        theme="light"
      />,
    );

    expect(screen.queryByText(/dados locais da mesa/i)).toBeNull();
    expect(screen.getByText(/receita bruta/i)).toBeTruthy();
    expect(screen.getAllByText(/R\$\s*150,00/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/total de gastos/i)).toBeTruthy();
    expect(screen.getAllByText(/R\$\s*40,00/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/saldo líquido/i)).toBeTruthy();
    expect(screen.getAllByText(/R\$\s*110,00/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/legacy consulta/i)).toBeNull();
    expect(screen.getByText(/comprovante pix/i)).toBeTruthy();
    expect(screen.getByText(/despesa fornecedor/i)).toBeTruthy();
  });

  it('cria card local na Mesa ao registrar lançamento manual', async () => {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify(createEmptyTaskCanvasSnapshot()));

    render(
      <FinanceTool
        transactions={[]}
        setTransactions={vi.fn()}
        employees={[]}
        setEmployees={vi.fn()}
        cashBalance={0}
        setCashBalance={vi.fn()}
        products={[]}
        selectedPlan="media"
        theme="light"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /lançamento manual/i }));

    fireEvent.change(screen.getByPlaceholderText(/fornecedor de grãos ltda/i), {
      target: { value: 'Despesa local da Mesa' },
    });

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '72.4' },
    });

    fireEvent.click(screen.getByRole('button', { name: /registrar lançamento/i }));

    await waitFor(() => {
      const stored = JSON.parse(window.localStorage.getItem(TASK_CANVAS_STORAGE_KEY) ?? '{}') as { items?: Array<{ kind?: string; title?: string; sourceDate?: string }> };
      expect(stored.items).toHaveLength(1);
      expect(stored.items?.[0].kind).toBe('expense');
      expect(stored.items?.[0].title).toBe('Despesa local da Mesa');
      expect(stored.items?.[0].sourceDate).toBe('2026-05-31');
    });

    expect(screen.queryByText(/dados locais da mesa/i)).toBeNull();
  });
});
