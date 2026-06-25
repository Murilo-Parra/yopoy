// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { YopoyCentralDashboard } from './YopoyCentralDashboard';
import { CanvasCardConnection, CanvasCardPosition, SmartCardItem } from './types';

const STORAGE_KEY = 'yopoy:task-canvas:v1';

interface StoredTaskCanvasSnapshot {
  version: 1;
  items: SmartCardItem[];
  positions: Record<string, CanvasCardPosition>;
  connections: CanvasCardConnection[];
  activeFilter: string;
  updatedAt: string;
}

function getCaptureCard() {
  return screen.getByRole('heading', { name: /foto de comprovante/i }).closest('article') as HTMLElement;
}

function readStoredSnapshot(): StoredTaskCanvasSnapshot {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  expect(stored).not.toBeNull();
  return JSON.parse(stored ?? '') as StoredTaskCanvasSnapshot;
}

describe('YopoyCentralDashboard', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', { configurable: true, value: vi.fn(() => true) });
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('renderiza um canvas livre com mocks quando não há snapshot e mantém botões como fallback', () => {
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /mesa de tarefas/i })).toBeTruthy();
    expect(screen.getByTestId('task-canvas')).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/ações alternativas/i)).toBeTruthy();
    expect(screen.getByText(/demonstração salva localmente/i)).toBeTruthy();
    expect(screen.getAllByText(/salvas neste navegador/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/sem sincronização externa/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/pré-notas são visuais, sem valor fiscal/i)).toBeTruthy();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();

    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /avançar etapa/i }));
    expect(within(getCaptureCard()).getByText(/^pendente$/i)).toBeTruthy();
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(screen.getByText(/no celular: arraste pelo corpo do card/i)).toBeTruthy();
  });

  it('move um card com Pointer Events e salva sua posição no localStorage', async () => {
    render(<YopoyCentralDashboard theme="light" />);
    const card = getCaptureCard();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    const initialLeft = node.style.left;
    const initialTop = node.style.top;

    fireEvent.pointerDown(card, { pointerId: 7, button: 0, clientX: 850, clientY: 100 });
    fireEvent.pointerMove(card, { pointerId: 7, clientX: 1030, clientY: 280 });
    fireEvent.pointerUp(card, { pointerId: 7, clientX: 1030, clientY: 280 });

    expect(node.style.left).not.toBe(initialLeft);
    expect(node.style.top).not.toBe(initialTop);
    expect(screen.getByText(/posição do card salva neste navegador/i)).toBeTruthy();

    await waitFor(() => {
      const snapshot = readStoredSnapshot();
      expect(snapshot.positions['mock-capture-01'].x).toBe(Number.parseFloat(node.style.left));
      expect(snapshot.positions['mock-capture-01'].y).toBe(Number.parseFloat(node.style.top));
    });

    const detailsButton = within(card).getByRole('button', { name: /abrir detalhes/i });
    const leftAfterDrag = node.style.left;
    const topAfterDrag = node.style.top;
    fireEvent.pointerDown(detailsButton, { pointerId: 8, button: 0, clientX: 1030, clientY: 280 });
    fireEvent.pointerMove(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    fireEvent.pointerUp(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    expect(node.style.left).toBe(leftAfterDrag);
    expect(node.style.top).toBe(topAfterDrag);
  });

  it('conecta dois cards pelos conectores, desenha uma linha SVG e salva a conexão', async () => {
    render(<YopoyCentralDashboard theme="dark" />);
    const source = screen.getByRole('button', { name: /iniciar conexão de foto de comprovante/i });
    const target = screen.getByRole('button', { name: /conectar em pix recebido/i });
    expect(source.className).toContain('h-11');
    expect(target.className).toContain('h-11');

    fireEvent.pointerDown(source, { pointerId: 9, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerMove(screen.getByTestId('task-canvas'), { pointerId: 9, clientX: 430, clientY: 700 });
    expect(screen.getByTestId('connection-preview')).toBeTruthy();
    fireEvent.pointerUp(target, { pointerId: 9, clientX: 434, clientY: 682 });

    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();
    expect(screen.getByText(/conexão visual criada e salva neste navegador/i)).toBeTruthy();
    expect(screen.getByText(/1 conexões/i)).toBeTruthy();
    await waitFor(() => {
      expect(readStoredSnapshot().connections).toEqual([
        { id: 'mock-capture-01->mock-payment-01', fromId: 'mock-capture-01', toId: 'mock-payment-01' },
      ]);
    });

    fireEvent.pointerDown(source, { pointerId: 10, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerUp(target, { pointerId: 10, clientX: 434, clientY: 682 });
    expect(document.querySelectorAll('[data-connection-id="mock-capture-01->mock-payment-01"]')).toHaveLength(1);
    expect(screen.getByText(/essa conexão já existe/i)).toBeTruthy();

    const path = document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]');
    const initialPath = path?.getAttribute('d');
    const sourceCard = getCaptureCard();
    fireEvent.pointerDown(sourceCard, { pointerId: 11, button: 0, clientX: 850, clientY: 100 });
    fireEvent.pointerMove(sourceCard, { pointerId: 11, clientX: 930, clientY: 180 });
    fireEvent.pointerUp(sourceCard, { pointerId: 11, clientX: 930, clientY: 180 });
    expect(path?.getAttribute('d')).not.toBe(initialPath);

    fireEvent.click(screen.getByRole('button', { name: /limpar conexões/i }));
    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeNull();
    expect(screen.getByText(/todas as conexões visuais foram removidas e a mesa local foi atualizada/i)).toBeTruthy();
    await waitFor(() => expect(readStoredSnapshot().connections).toHaveLength(0));
  });

  it('conclui conexão por coordenadas quando o toque fica capturado na origem', () => {
    render(<YopoyCentralDashboard theme="light" />);
    const source = screen.getByRole('button', { name: /iniciar conexão de foto de comprovante/i });
    const target = screen.getByRole('button', { name: /conectar em pix recebido/i });
    Object.defineProperty(document, 'elementFromPoint', { configurable: true, value: vi.fn(() => target) });

    fireEvent.pointerDown(source, { pointerId: 12, button: 0, clientX: 1144, clientY: 112 });
    fireEvent.pointerUp(source, { pointerId: 12, clientX: 434, clientY: 682 });

    expect(document.querySelector('[data-connection-id="mock-capture-01->mock-payment-01"]')).toBeTruthy();
  });

  it('leva o viewport ao primeiro card do filtro sem alterar sua posição', () => {
    render(<YopoyCentralDashboard theme="light" />);
    const viewport = screen.getByTestId('task-canvas-viewport');
    const scrollTo = vi.fn();
    Object.defineProperty(viewport, 'scrollTo', { configurable: true, value: scrollTo });
    const node = screen.getByTestId('canvas-node-mock-archived-01');
    const initialPosition = `${node.style.left}:${node.style.top}`;

    fireEvent.click(screen.getByRole('button', { name: /arquivados/i }));

    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(`${node.style.left}:${node.style.top}`).toBe(initialPosition);
  });

  it('salva estado do card e filtro ativo no localStorage', async () => {
    render(<YopoyCentralDashboard theme="light" />);
    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /avançar etapa/i }));

    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.status).toBe('pending');
    });

    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /resolver \/ pronto/i }));
    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.status).toBe('resolved');
    });

    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /^arquivar$/i }));
    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-capture-01');
      expect(savedCard?.archived).toBe(true);
    });

    fireEvent.click(screen.getByRole('button', { name: /arquivados/i }));
    await waitFor(() => expect(readStoredSnapshot().activeFilter).toBe('archived'));
  });

  it('restaura snapshot salvo ao renderizar novamente', () => {
    const storedSnapshot: StoredTaskCanvasSnapshot = {
      version: 1,
      items: [{
        id: 'mock-capture-01',
        kind: 'capture',
        title: 'Foto de comprovante salva',
        description: 'Estado salvo no navegador.',
        amount: 48.9,
        timeLabel: 'agora',
        status: 'ready',
        archived: false,
        linked: true,
        hasPreInvoice: true,
        sentToAccountant: true,
        tags: ['Salvo'],
      }],
      positions: { 'mock-capture-01': { x: 612, y: 344 } },
      connections: [],
      activeFilter: 'ready',
      updatedAt: '2026-06-25T12:00:00.000Z',
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedSnapshot));

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /foto de comprovante salva/i })).toBeTruthy();
    const savedCard = screen.getByRole('heading', { name: /foto de comprovante salva/i }).closest('article') as HTMLElement;
    expect(within(savedCard).getByText(/^pronto$/i)).toBeTruthy();
    expect(within(savedCard).getByText(/vínculo visual/i)).toBeTruthy();
    expect(within(savedCard).getByText(/pré-nota visual/i)).toBeTruthy();
    expect(within(savedCard).getByText(/separado para contador/i)).toBeTruthy();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    expect(node.style.left).toBe('612px');
    expect(node.style.top).toBe('344px');
    expect(screen.getByRole('button', { name: /prontos/i }).getAttribute('aria-pressed')).toBe('true');
  });

  it('ignora snapshot inválido e versão incompatível sem quebrar a tela', () => {
    window.localStorage.setItem(STORAGE_KEY, '{json inválido');
    const firstRender = render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();

    firstRender.unmount();
    cleanup();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, items: [] }));
    render(<YopoyCentralDashboard theme="light" />);
    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
  });

  it('normaliza card incompleto e remove conexões com pontas inexistentes', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: 1,
      items: [{ id: 'mock-capture-01', status: 'ready', linked: true }],
      positions: { 'mock-capture-01': { x: 999, y: 888 } },
      connections: [
        { id: 'mock-capture-01->missing-card', fromId: 'mock-capture-01', toId: 'missing-card' },
      ],
      activeFilter: 'ready',
      updatedAt: '2026-06-25T12:00:00.000Z',
    }));

    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /foto de comprovante/i })).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^pronto$/i)).toBeTruthy();
    expect(screen.getByText(/0 conexões/i)).toBeTruthy();
    const node = screen.getByTestId('canvas-node-mock-capture-01');
    expect(node.style.left).toBe('999px');
    expect(node.style.top).toBe('888px');
  });

  it('restaura demonstração, limpa só a chave da Mesa e volta aos mocks', async () => {
    window.localStorage.setItem('yopoy:outra-chave', 'preservar');
    render(<YopoyCentralDashboard theme="light" />);
    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /avançar etapa/i }));
    await waitFor(() => expect(window.localStorage.getItem(STORAGE_KEY)).not.toBeNull());

    fireEvent.click(screen.getByRole('button', { name: /restaurar demonstração/i }));

    expect(screen.getByText(/demonstração restaurada\. os dados locais da mesa foram limpos/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(window.localStorage.getItem('yopoy:outra-chave')).toBe('preservar');
  });

  it('não usa backend nem emite fiscal real ao preparar pré-nota visual', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    render(<YopoyCentralDashboard theme="light" />);
    const saleCard = screen.getByRole('heading', { name: /venda balcão #ex-104/i }).closest('article') as HTMLElement;

    fireEvent.click(within(saleCard).getByRole('button', { name: /preparar pré-nota/i }));

    expect(screen.getByText(/pré-nota visual adicionada sem valor fiscal/i)).toBeTruthy();
    expect(fetchSpy).not.toHaveBeenCalled();
    await waitFor(() => {
      const savedCard = readStoredSnapshot().items.find((item) => item.id === 'mock-sale-01');
      expect(savedCard?.hasPreInvoice).toBe(true);
      expect(savedCard?.status).toBe('review');
    });
  });
});
