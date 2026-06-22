// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { YopoyCentralDashboard } from './YopoyCentralDashboard';

function getCaptureCard() {
  return screen.getByRole('heading', { name: /foto de comprovante/i }).closest('article') as HTMLElement;
}

describe('YopoyCentralDashboard', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'setPointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'releasePointerCapture', { configurable: true, value: vi.fn() });
    Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', { configurable: true, value: vi.fn(() => true) });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('renderiza um canvas livre e mantém botões como fallback', () => {
    render(<YopoyCentralDashboard theme="light" />);

    expect(screen.getByRole('heading', { name: /mesa de tarefas/i })).toBeTruthy();
    expect(screen.getByTestId('task-canvas')).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/^novo$/i)).toBeTruthy();
    expect(within(getCaptureCard()).getByText(/ações alternativas/i)).toBeTruthy();

    fireEvent.click(within(getCaptureCard()).getByRole('button', { name: /avançar etapa/i }));
    expect(within(getCaptureCard()).getByText(/^pendente$/i)).toBeTruthy();
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(screen.getByText(/no celular: arraste pelo corpo do card/i)).toBeTruthy();
  });

  it('move um card com Pointer Events e atualiza sua posição local', () => {
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
    expect(screen.getByText(/posição do card atualizada/i)).toBeTruthy();

    const detailsButton = within(card).getByRole('button', { name: /abrir detalhes/i });
    const leftAfterDrag = node.style.left;
    const topAfterDrag = node.style.top;
    fireEvent.pointerDown(detailsButton, { pointerId: 8, button: 0, clientX: 1030, clientY: 280 });
    fireEvent.pointerMove(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    fireEvent.pointerUp(card, { pointerId: 8, clientX: 1180, clientY: 430 });
    expect(node.style.left).toBe(leftAfterDrag);
    expect(node.style.top).toBe(topAfterDrag);
  });

  it('conecta dois cards pelos conectores e desenha uma linha SVG', () => {
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
    expect(screen.getByText(/conexão visual criada localmente/i)).toBeTruthy();
    expect(screen.getByText(/1 conexões/i)).toBeTruthy();

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
    expect(screen.getByText(/todas as conexões visuais foram removidas/i)).toBeTruthy();
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
});
