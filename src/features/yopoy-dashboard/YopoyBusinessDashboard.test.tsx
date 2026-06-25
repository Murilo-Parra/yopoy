// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { YopoyBusinessDashboard } from './YopoyBusinessDashboard';
import { TASK_CANVAS_STORAGE_KEY } from './taskCanvasSummary';

describe('YopoyBusinessDashboard', () => {
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('renderiza resumo local da Mesa sem snapshot salvo', () => {
    render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />);

    expect(screen.getByRole('heading', { name: /painel de controle/i })).toBeTruthy();
    expect(screen.getByRole('heading', { name: /resumo local da mesa/i })).toBeTruthy();
    expect(screen.getByText(/vendas internas/i)).toBeTruthy();
    expect(screen.getByText(/próximas ações/i)).toBeTruthy();
    expect(screen.getByText(/visão demonstrativa da mesa/i)).toBeTruthy();
    expect(screen.getByText(/dados demonstrativos salvos neste navegador/i)).toBeTruthy();
    expect(screen.getByText(/sem sincronização externa/i)).toBeTruthy();
    expect(screen.getByText(/não é financeiro real/i)).toBeTruthy();
    expect(screen.getByText(/não tem valor fiscal/i)).toBeTruthy();
    expect(screen.queryByText(/faturamento hoje/i)).toBeNull();
    expect(screen.queryByText(/faturamento no mês/i)).toBeNull();
    expect(screen.queryByText(/central visual do yopoy/i)).toBeNull();
  });

  it('não quebra com JSON inválido ou versão incompatível', () => {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, '{json inválido');
    expect(() => render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />)).not.toThrow();
    cleanup();

    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify({ version: 2, items: [] }));
    expect(() => render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />)).not.toThrow();
  });

  it('exibe indicadores derivados do snapshot da Mesa', () => {
    window.localStorage.setItem(TASK_CANVAS_STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [
        {
          id: 'local-sale',
          kind: 'sale',
          title: 'Venda local',
          description: 'Venda interna',
          amount: 150,
          timeLabel: 'agora',
          status: 'new',
          archived: false,
          linked: false,
          hasPreInvoice: true,
          tags: ['Venda'],
        },
        {
          id: 'payment-1',
          kind: 'payment',
          title: 'Recebimento local',
          description: 'Recebimento',
          amount: 90,
          timeLabel: 'agora',
          status: 'pending',
          archived: false,
          linked: false,
          hasPreInvoice: false,
          tags: ['Recebimento'],
        },
        {
          id: 'expense-1',
          kind: 'expense',
          title: 'Despesa local',
          description: 'Despesa',
          amount: 40,
          timeLabel: 'agora',
          status: 'review',
          archived: false,
          linked: false,
          hasPreInvoice: false,
          sentToAccountant: true,
          tags: ['Despesa'],
        },
        {
          id: 'sale-archived',
          kind: 'sale',
          title: 'Venda arquivada',
          description: 'Arquivada',
          amount: 500,
          timeLabel: 'ontem',
          status: 'ready',
          archived: true,
          linked: false,
          hasPreInvoice: false,
          tags: ['Venda'],
        },
        {
          id: 'pre-invoice-1',
          kind: 'pre-invoice',
          title: 'Pré-nota interna',
          description: 'Sem valor fiscal',
          timeLabel: 'agora',
          status: 'ready',
          archived: false,
          linked: false,
          hasPreInvoice: false,
          tags: ['Pré-nota'],
        },
      ],
      positions: {},
      connections: [
        { id: 'connection-1', fromId: 'local-sale', toId: 'payment-1', status: 'reconciled' },
      ],
      activeFilter: 'all',
      updatedAt: '2026-06-25T10:00:00.000Z',
    }));

    render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />);

    expect(screen.getByText(/R\$\s*150,00/)).toBeTruthy();
    expect(screen.getByText(/R\$\s*90,00/)).toBeTruthy();
    expect(screen.getByText(/R\$\s*40,00/)).toBeTruthy();
    expect(screen.getByText(/R\$\s*50,00/)).toBeTruthy();
    expect(screen.getByText(/3 pendências/i)).toBeTruthy();
    expect(screen.getAllByText('1', { selector: 'strong' }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('2', { selector: 'strong' })).toBeTruthy();
    expect(screen.getByText(/vínculos conciliados/i)).toBeTruthy();
    expect(screen.getByText(/pré-notas internas/i)).toBeTruthy();
    expect(screen.getByText(/separados para contador/i)).toBeTruthy();
    expect(screen.getByText(/1 cards locais criados pelo usuário/i)).toBeTruthy();
    expect(screen.queryByText(/R\$\s*500,00/)).toBeNull();
  });

  it('não chama fetch nem promete fiscal real', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    render(<YopoyBusinessDashboard theme="light" onOpenTaskBoard={vi.fn()} />);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.queryByText(/faturamento fiscal/i)).toBeNull();
    expect(screen.queryByText(/caixa real/i)).toBeNull();
    expect(screen.queryByText(/dre real/i)).toBeNull();
    expect(screen.queryByText(/emissão de nota real/i)).toBeNull();
  });

  it('oferece atalho explícito para a Mesa Visual', () => {
    const onOpenTaskBoard = vi.fn();
    render(<YopoyBusinessDashboard theme="dark" onOpenTaskBoard={onOpenTaskBoard} />);

    expect(screen.getByText(/roteiro da demo/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /abrir mesa visual/i }));
    expect(onOpenTaskBoard).toHaveBeenCalledTimes(1);
  });
});
