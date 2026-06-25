// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SmartCard } from './SmartCard';
import { SmartCardItem } from './types';

const ITEM: SmartCardItem = {
  id: 'card-test',
  kind: 'sale',
  title: 'Venda de teste',
  description: 'Venda local aguardando organização.',
  amount: 120,
  timeLabel: 'agora',
  status: 'review',
  archived: false,
  linked: false,
  hasPreInvoice: false,
  tags: ['Teste'],
};

function renderCard() {
  const handlers = {
    onMoveNext: vi.fn(),
    onMovePrevious: vi.fn(),
    onMarkResolved: vi.fn(),
    onArchiveToggle: vi.fn(),
    onLink: vi.fn(),
    onSendToAccountant: vi.fn(),
    onCreatePreInvoice: vi.fn(),
  };
  render(<SmartCard item={ITEM} theme="light" {...handlers} />);
  return handlers;
}

describe('SmartCard', () => {
  afterEach(cleanup);

  it('abre e fecha detalhes por toque simples', () => {
    renderCard();
    const openButton = screen.getByRole('button', { name: /abrir detalhes/i });
    fireEvent.click(openButton);
    expect(screen.getByText(/arraste o card livremente/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /fechar detalhes/i }));
    expect(screen.queryByText(/arraste o card livremente/i)).toBeNull();
  });

  it('expõe ações completas sem drag and drop', () => {
    const handlers = renderCard();

    fireEvent.click(screen.getByRole('button', { name: /avançar etapa/i }));
    fireEvent.click(screen.getByRole('button', { name: /voltar etapa/i }));
    fireEvent.click(screen.getByRole('button', { name: /resolver \/ pronto/i }));
    fireEvent.click(screen.getByRole('button', { name: /^arquivar$/i }));
    fireEvent.click(screen.getByRole('button', { name: /separar contador/i }));
    fireEvent.click(screen.getByRole('button', { name: /preparar pré-nota/i }));

    expect(handlers.onMoveNext).toHaveBeenCalledWith(ITEM.id);
    expect(handlers.onMovePrevious).toHaveBeenCalledWith(ITEM.id);
    expect(handlers.onMarkResolved).toHaveBeenCalledWith(ITEM.id);
    expect(handlers.onArchiveToggle).toHaveBeenCalledWith(ITEM.id);
    expect(handlers.onSendToAccountant).toHaveBeenCalledWith(ITEM.id);
    expect(handlers.onCreatePreInvoice).toHaveBeenCalledWith(ITEM.id);
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(screen.getByText(/ações alternativas/i)).toBeTruthy();
  });
});
