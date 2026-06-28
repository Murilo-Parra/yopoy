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
  linked: true,
  hasPreInvoice: true,
  sentToAccountant: true,
  tags: ['Teste', 'Balcão'],
};

function renderCard(overrides: Partial<React.ComponentProps<typeof SmartCard>> = {}) {
  const handlers = {
    onSelect: vi.fn(),
    onDragPointerDown: vi.fn(),
  };
  render(<SmartCard item={ITEM} theme="light" {...handlers} {...overrides} />);
  return handlers;
}

describe('SmartCard', () => {
  afterEach(cleanup);

  it('abre e fecha detalhes por toque simples', () => {
    renderCard();
    const openButton = screen.getByRole('button', { name: /abrir detalhes/i });
    fireEvent.click(openButton);
    expect(screen.getByText(/ações operacionais ficam no painel/i)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /fechar detalhes/i }));
    expect(screen.queryByText(/ações operacionais ficam no painel/i)).toBeNull();
  });

  it('mostra informações úteis de relance e mantém ações fora do card', () => {
    renderCard({ isSelected: true });

    expect(screen.getAllByText(/venda/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /venda de teste/i })).toBeTruthy();
    expect(screen.getByText(/venda local aguardando organização/i)).toBeTruthy();
    expect(screen.getByText(/R\$\s*120,00/i)).toBeTruthy();
    expect(screen.getByText(/em revisão/i)).toBeTruthy();
    expect(screen.getAllByText(/teste/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/balcão/i)).toBeTruthy();
    expect(screen.getByText(/pré-nota visual/i)).toBeTruthy();
    expect(screen.getByText(/separado para contador/i)).toBeTruthy();
    expect(screen.getByText(/vínculo visual/i)).toBeTruthy();
    expect(screen.getByText(/selecionado/i)).toBeTruthy();
    expect(screen.getByText(/comanda \/ venda/i)).toBeTruthy();
    expect(screen.queryByText(/ações alternativas/i)).toBeNull();
    expect(screen.queryByRole('button', { name: /preparar pré-nota/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /separar contador/i })).toBeNull();
    expect(screen.queryByRole('button', { name: /^arquivar$/i })).toBeNull();
  });

  it('mostra pasta como container visual com contagens e estado de drop', () => {
    renderCard({
      item: {
        ...ITEM,
        id: 'folder-test',
        kind: 'folder',
        title: 'Pedidos',
        description: 'Pasta local da Mesa Visual.',
        amount: undefined,
        tags: ['Pasta local'],
      },
      folderItemsCount: 2,
      folderFoldersCount: 1,
      isDropTarget: true,
    });

    expect(screen.getByText(/pasta \/ submesa/i)).toBeTruthy();
    expect(screen.getByRole('heading', { name: /pedidos/i })).toBeTruthy();
    expect(screen.getByText(/2 item\(ns\) e 1 subpasta\(s\)/i)).toBeTruthy();
    expect(screen.getAllByText(/container local/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/soltar aqui/i)).toBeTruthy();
    expect(screen.queryByText(/R\$/i)).toBeNull();
  });

  it('seleciona pelo corpo do card sem remover o fallback de drag', () => {
    const handlers = renderCard();
    const card = screen.getByLabelText(/card venda de teste/i);

    fireEvent.pointerDown(card, { pointerId: 1, button: 0, clientX: 10, clientY: 10 });

    expect(handlers.onSelect).toHaveBeenCalledWith(ITEM.id, expect.any(Object));
    expect(handlers.onDragPointerDown).toHaveBeenCalledWith(expect.any(Object), ITEM.id);
    expect(document.querySelector('[draggable="true"]')).toBeNull();
  });

  it('não seleciona pelo botão de detalhes e mantém o evento marcado para o guard de drag', () => {
    const handlers = renderCard();

    fireEvent.pointerDown(screen.getByRole('button', { name: /abrir detalhes/i }), { pointerId: 2, button: 0 });

    expect(handlers.onSelect).not.toHaveBeenCalled();
    expect(handlers.onDragPointerDown).toHaveBeenCalledWith(expect.any(Object), ITEM.id);
  });
});
